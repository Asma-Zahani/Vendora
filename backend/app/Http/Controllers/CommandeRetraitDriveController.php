<?php

namespace App\Http\Controllers;

use App\Enums\EtatCommandeEnum;
use App\Models\CodePromotion;
use App\Models\Commande;
use App\Models\CommandeRetraitDrive;
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

class CommandeRetraitDriveController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except:['index','show'])
        ];
    }

    public function index(Request $request)
    {
        if (!$request->hasAny(['search', 'sort_by', 'sort_order', 'per_page'])) {
            return response()->json(CommandeRetraitDrive::with('commande.client','commande.facture.detailsFacture.produit')->get());
        }

        $query = CommandeRetraitDrive::query();

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

        if (Schema::hasColumn('commandes_retrait_drives', $request->input('sort_by'))) {
            $query->orderBy($request->input('sort_by'), $request->input('sort_order'));
        }
        
        $commandeRetraitDrive = $query->with('commande.client','commande.facture.detailsFacture.produit')->paginate($request->input('per_page'));

        return response()->json($commandeRetraitDrive);
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
            'etatCommande' => [Rule::in(EtatCommandeEnum::values())],
            'dateRetrait' => 'nullable|date',
            'drive_id' => 'required|exists:drives,drive_id',
            'produits' => 'required|array',
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
    
        $commandeRetraitDrive = CommandeRetraitDrive::create([
            'commande_id' => $commande->commande_id,
            'drive_id' => $validatedData['drive_id'],
            'dateRetrait' => $validatedData['dateRetrait'] ?? null,
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
            } else {
                $produit->decrement('quantite', $item['quantite']);
            }
        }

        return response()->json([
            'message' => 'Commande retraitDrive ajouter avec succès',
            'commande' => $commande,
            'retraiDrive' => $commandeRetraitDrive,
            'produits' => $commande->produits,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $commandeRetraitDrive = CommandeRetraitDrive::where('commande_id', $id)->with('commande')
            ->firstOrFail();
    
        return response()->json($commandeRetraitDrive);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Récupérer les deux entités
        $commandeRetraitDrive = CommandeRetraitDrive::where('commande_id', $id)->firstOrFail();
        $commande = Commande::where('commande_id', $id)->firstOrFail();

        // Validation des données
        $validatedData = $request->validate([
            'client_id' => 'exists:users,id',
            'code_promotion_id' => 'nullable|exists:code_promotions,code_promotion_id',
            'total' => 'numeric|min:0',
            'etatCommande' => [Rule::in(EtatCommandeEnum::values())],
            'dateRetrait' => 'nullable|date',
            'drive_id' => 'nullable|exists:drives,drive_id',
        ]);

        // Mise à jour des données de la commande
        $commande->update([
            'client_id' => $validatedData['client_id'] ?? $commande->client_id,
            'code_promotion_id' => $validatedData['code_promotion_id'] ?? $commande->code_promotion_id,
            'total' => $validatedData['total'] ?? $commande->total,
            'etatCommande' => $validatedData['etatCommande'] ?? $commande->etatCommande,
        ]);

        // Mise à jour des données de la commande de livraison
        $commandeRetraitDrive->update([
            'dateRetrait' => $validatedData['dateRetrait'] ?? $commandeRetraitDrive->dateRetrait,
            'drive_id' => $validatedData['drive_id'] ?? $commandeRetraitDrive->drive_id,
        ]);

        return response()->json([
            'message' => 'Commande Retrait Drive mise à jour avec succès',
            'commande' => $commande,
            'retraiDrive' => $commandeRetraitDrive,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $commandeRetraitDrive = CommandeRetraitDrive::where('commande_id', $id)
            ->firstOrFail();

        $commandeRetraitDrive->delete();
        
        return response()->json([
            'message' => 'Commande retraitDrive supprimée avec succès'
        ], 200);    
    }
}
