<?php

namespace App\Http\Controllers;

use App\Enums\EtatCommandeEnum;
use App\Models\CodePromotion;
use App\Models\Commande;
use App\Models\CommandeLivraison;
use App\Models\CommandeProduit;
use App\Models\DetailFacture;
use App\Models\FactureCommande;
use App\Models\PanierProduit;
use App\Models\Produit;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Schema;
use Illuminate\Validation\Rule;

class CommandeLivraisonController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except:['index'])
        ];
    }

    public function index(Request $request)
    {
        if (!$request->hasAny(['search', 'sort_by', 'sort_order', 'per_page'])) {
            return response()->json(CommandeLivraison::with('commande')->get());
        }

        $query = CommandeLivraison::query();

        if ($request->has('search') && !empty($request->search)) {
            $searchTerm = $request->search;
            if (strpos($searchTerm, '#') === 0) {
                $searchTerm = substr($searchTerm, 1);
                $query->where('commande_id', 'LIKE', "%{$searchTerm}%"); 
            } else {
                $query->where(function ($q) use ($searchTerm) {
                    $q->whereHas('commande', function($q) use ($searchTerm) {
                        $q->where(function($q) use ($searchTerm) {
                            $searchParts = explode(' ', $searchTerm); 
    
                            $q->orWhereHas('client', function($q) use ($searchParts) {
                                if (isset($searchParts[0])) {
                                    $q->where('prenom', 'LIKE', "%{$searchParts[0]}%");
                                }
                                if (isset($searchParts[1])) {
                                    $q->orWhere('nom', 'LIKE', "%{$searchParts[1]}%");
                                }
                            });
                        })
                        ->orWhere('etatCommande', 'LIKE', "%{$searchTerm}%")
                        ->orWhere('total', 'LIKE', "%{$searchTerm}%");
                    });
                });
            }
        }
             

        if (Schema::hasColumn('commandes_livraisons', $request->input('sort_by'))) {
            $query->orderBy($request->input('sort_by'), $request->input('sort_order'));
        }
        
        $commandeLivraison = $query->with('commande')->paginate($request->input('per_page'));

        return response()->json($commandeLivraison);
    }

    /**
     * Store a newly created resource in storage.
     */

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'client_id' => 'required|exists:users,id',
            'code_promotion_id' => 'nullable|exists:code_promotions,code_promotion_id',
            'total' => 'required|numeric|min:0',
            'etatCommande' => ['nullable', Rule::in(EtatCommandeEnum::values())],
            'dateLivraison' => 'nullable|date',
            'livreur_id' => ['nullable', Rule::exists('users', 'id')->where('role', 'livreur')],
            'produits' => 'required|array',  // Valide que c'est un tableau de produits
            'produits.*.produit_id' => 'required|exists:produits,produit_id',
            'produits.*.quantite' => 'required|integer|min:1',
        ]);
        $produits = Produit::whereIn('produit_id', collect($validatedData['produits'])->pluck('produit_id'))->get();

        $commande = Commande::create([
            'client_id' => $validatedData['client_id'],
            'code_promotion_id' => $validatedData['code_promotion_id'] ?? null,
            'total' => $validatedData['total'],
            'etatCommande' => $validatedData['etatCommande'] ?? EtatCommandeEnum::EnAttente->value,
        ]);

        $commandeLivraison = CommandeLivraison::create([
            'commande_id' => $commande->commande_id,
            'dateLivraison' => $validatedData['dateLivraison'] ?? null,
            'livreur_id' => $validatedData['livreur_id'] ?? null,
        ]);

        PanierProduit::where('client_id', $validatedData['client_id'])->delete();

        $remise = 0;
        if (!empty($validatedData['code_promotion_id'])) {
            $codePromo = CodePromotion::find($validatedData['code_promotion_id']);
            if ($codePromo && $codePromo->reduction) {
                $remise = ($validatedData['total'] * $codePromo->reduction) / 100;
            }
        }

        $facture = FactureCommande::create([
            'totalTTC' => $validatedData['total'],
            'remise' => $remise,
            'commande_id' => $commande->commande_id
        ]);

        foreach ($validatedData['produits'] as $index => $item) {
            $produit = $produits[$index];
        
            DetailFacture::create([
                'facture_id' => $facture->facture_id,
                'produit_id' => $produit->produit_id,
                'quantite' => $item['quantite'],
                'prixUnitaireTTC' => $produit->prix_apres_promo,
                'remise' => $produit->promotion?->reduction ?? 0
            ]);
        }

        return response()->json([
            'message' => 'Commande livraison ajouter avec succès',
            'commande' => $commande,
            'livraison' => $commandeLivraison,
            'produits' => $commande->produits,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id)
    {
        $commandeLivraison = CommandeLivraison::where('commande_id', $id)->with('commande')
            ->firstOrFail();

        if ($request->user()->id == $commandeLivraison->commande->client_id) {
            return response()->json($commandeLivraison);
        }

        return response()->json();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Récupérer les deux entités
        $commandeLivraison = CommandeLivraison::where('commande_id', $id)->firstOrFail();
        $commande = Commande::where('commande_id', $id)->firstOrFail();

        // Validation des données
        $validatedData = $request->validate([
            'client_id' => 'exists:users,id',
            'code_promotion_id' => 'nullable|exists:code_promotions,code_promotion_id',
            'total' => 'numeric|min:0',
            'etatCommande' => [Rule::in(EtatCommandeEnum::values())],
            'dateLivraison' => 'nullable|date',
            'livreur_id' => ['nullable', Rule::exists('users', 'id')->where('role', 'livreur')],
        ]);

        // Mise à jour des données de la commande
        $commande->update([
            'client_id' => $validatedData['client_id'] ?? $commande->client_id,
            'code_promotion_id' => $validatedData['code_promotion_id'] ?? $commande->code_promotion_id,
            'total' => $validatedData['total'] ?? $commande->total,
            'etatCommande' => $validatedData['etatCommande'] ?? $commande->etatCommande,
        ]);

        // Mise à jour des données de la commande de livraison
        $commandeLivraison->update([
            'dateLivraison' => $validatedData['dateLivraison'] ?? $commandeLivraison->dateLivraison,
            'livreur_id' => $validatedData['livreur_id'] ?? $commandeLivraison->livreur_id,
        ]);

        return response()->json([
            'commande' => $commande,
            'livraison' => $commandeLivraison,
        ], 200);
        return response()->json([
            'message' => 'Commande livraison à jour avec succès',
            'commande' => $commande,
            'livraison' => $commandeLivraison,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $commandeLivraison = CommandeLivraison::where('commande_id', $id)
            ->firstOrFail();
        $commandeLivraison->delete();

        return response()->json([
            'message' => 'Commande livraison supprimée avec succès'
        ], 200);    
    }
}