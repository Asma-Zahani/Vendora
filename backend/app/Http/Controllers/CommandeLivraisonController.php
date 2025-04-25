<?php

namespace App\Http\Controllers;

use App\Enums\EtatCommandeEnum;
use App\Enums\StatusProduitEnum;
use App\Models\CodePromotion;
use App\Models\Commande;
use App\Models\CommandeLivraison;
use App\Models\CommandeProduit;
use App\Models\Couleur;
use App\Models\DetailFacture;
use App\Models\FactureCommande;
use App\Models\PanierProduit;
use App\Models\Produit;
use App\Models\ProduitCouleur;
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

        if ($request->has('filtre')) {
            $filtres = $request->input('filtre');
    
            foreach ($filtres as $value) {
                if (!empty($value) && $value !== 'Tous') {
                    $query->whereHas('commande', function ($q) use ($value) {
                        $q->whereIn('etatCommande', (array) $value);
                    });
                }
            }
        }
        
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
            'produits.*.couleur' => 'nullable|string|max:50',
            'transaction_id' => 'nullable|string|max:255',
        ]);
        $produits = Produit::whereIn('produit_id', collect($validatedData['produits'])->pluck('produit_id'))->get();

        $commande = Commande::create([
            'client_id' => $validatedData['client_id'],
            'code_promotion_id' => $validatedData['code_promotion_id'] ?? null,
            'total' => $validatedData['total'],
            'etatCommande' => $validatedData['etatCommande'] ?? EtatCommandeEnum::EnAttente->value,
            'transaction_id' =>$validatedData['transaction_id'] ?? null,
        ]);

        $commandeLivraison = CommandeLivraison::create([
            'commande_id' => $commande->commande_id,
            'dateLivraison' => $validatedData['dateLivraison'] ?? null,
            'livreur_id' => $validatedData['livreur_id'] ?? null
        ]);

        if ($validatedData['code_promotion_id'] ?? null) {
            CodePromotion::where('code_promotion_id', $validatedData['code_promotion_id'])->increment('nbUtilisation');
        }
    
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
                'couleur' => $item['couleur'] ?? null,
                'prixUnitaireTTC' => $produit->prix_apres_promo,
                'remise' => $produit->promotion?->reduction ?? 0
            ]);

            if ($item['couleur'] ?? null) {
                $couleur = Couleur::where('nom', $item['couleur'])->first();
            
                ProduitCouleur::where('produit_id', $produit->produit_id)
                              ->where('couleur_id', $couleur->couleur_id)
                              ->decrement('quantite', $item['quantite']);
            
                $reste = ProduitCouleur::where('produit_id', $produit->produit_id)
                                       ->where('quantite', '>', 0)
                                       ->exists();
            
                if (! $reste) {
                    $produit->update(['status' => StatusProduitEnum::RuptureDeStock->value]);
                }
            
            } else {
                $produit->decrement('quantite', $item['quantite']);
            
                if ($produit->quantite <= 0) {
                    $produit->update(['status' => StatusProduitEnum::RuptureDeStock->value]);
                }
            }            
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

        return response()->json($commandeLivraison);
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
            'adresse_livraison' => 'nullable|string|max:255',
            'region_livraison' => 'nullable|string|max:255',
            'ville_livraison' => 'nullable|string|max:255',
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
            'adresse_livraison' => $validatedData['adresse_livraison'] ?? $commandeLivraison->adresse_livraison,
            'region_livraison' => $validatedData['region_livraison'] ?? $commandeLivraison->region_livraison,
            'ville_livraison' => $validatedData['ville_livraison'] ?? $commandeLivraison->ville_livraison,
        ]);

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