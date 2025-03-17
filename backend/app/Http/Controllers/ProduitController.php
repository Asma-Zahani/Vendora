<?php

namespace App\Http\Controllers;

use App\Enums\StatusProduitEnum;
use App\Models\Produit;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Schema;
use Illuminate\Validation\Rule;

class ProduitController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except:['index','latestProducts','show'])
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Produit::with('couleurs');

        if ($request->has('filtre')) {
            $filtre = $request->input('filtre');
            if ($filtre != 'Tous') {
                $query->where('status', $filtre);
            }
        }
        
        if ($request->has('search') && !empty($request->search)) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('nom', 'LIKE', "%{$searchTerm}%")
                ->orWhereHas('sousCategorie', function($q) use ($searchTerm) {
                    $q->where('titre', 'LIKE', "%{$searchTerm}%");
                })
                ->orWhere('prix', 'LIKE', "%{$searchTerm}%")
                ->orWhere('status', 'LIKE', "%{$searchTerm}%");
            });
        }

        if ($request->has('sort_by') && $request->has('sort_order')) {
            $sortBy = $request->input('sort_by');
            $sortOrder = $request->input('sort_order');
            
            if (Schema::hasColumn('produits', $sortBy)) {
                $query->orderBy($sortBy, $sortOrder);
            }
        }

        $produits = $query->paginate($request->input('per_page', 5));

        return response()->json($produits);
    }

    public function latestProducts()
    {
        $produits = Produit::with('couleurs')->latest('created_at')->take(6)->get();
        return response()->json($produits);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'marque_id' => 'required|exists:marques,marque_id',
            'sous_categorie_id' => 'required|exists:sous_categories,sous_categorie_id',
            'promotion_id' => 'nullable|exists:promotions,promotion_id',
            'couleurs' => 'array', // Couleurs peuvent être null ou une array
            'couleurs.*.couleur_id' => [
                Rule::exists('couleurs', 'couleur_id')
            ],
            'couleurs.*.quantite' => 'nullable|numeric|min:0', // Quantité est obligatoire si couleur est présente
            'nom' => 'required|string|max:255',
            'status' => [Rule::in(StatusProduitEnum::values())],
            'description' => 'required|string|max:255',
            'prix' => 'required|numeric|min:0',
            'quantite' => 'nullable|numeric',
            'image' => 'required|string|max:255',
        ]);
        
        // Création du produit
        $produit = Produit::create($validatedData);

        // Si des couleurs sont envoyées, lier les couleurs avec les quantités
        if ($request->has('couleurs')) {
            $couleursData = collect($request->couleurs)->mapWithKeys(function($item) {
                return [$item['couleur_id'] => ['quantite' => $item['quantite'] ?? 0]]; // Utilise 0 si quantité est vide
            });

            // Lier les couleurs avec la quantité dans la table pivot
            $produit->couleurs()->sync($couleursData);
        }

        return response()->json([
            'message' => 'Produit ajouter avec succès',
            'data' => $produit
        ], 200);
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $produit = Produit::with(['couleurs' => function ($query) {
            $query->select('couleurs.*', 'produit_couleur.quantite');  // Assurez-vous d'inclure 'quantite'
        }])->find($id);

        return response()->json($produit);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $produit = Produit::findOrFail($id);

        // Validation des données
        $validatedData = $request->validate([
            'marque_id' => 'required|exists:marques,marque_id',
            'sous_categorie_id' => 'required|exists:sous_categories,sous_categorie_id',
            'promotion_id' => 'nullable|exists:promotions,promotion_id',
            'couleurs' => 'array', // Couleurs peuvent être null ou une array
            'couleurs.*.couleur_id' => [
                Rule::exists('couleurs', 'couleur_id')
            ],
            'couleurs.*.quantite' => 'nullable|numeric|min:0', // Quantité est obligatoire si couleur est présente
            'nom' => 'required|string|max:255',
            'status' => [Rule::in(StatusProduitEnum::values())],
            'description' => 'required|string|max:255',
            'prix' => 'required|numeric|min:0',
            'quantite' => 'nullable|numeric',
            'image' => 'required|string|max:255',

        ]);

        // Mise à jour des informations du produit
        $produit->update($validatedData);

        if ($request->has('couleurs')) {
            $couleursData = [];

            foreach ($request->couleurs as $couleur) {
                // On associe chaque couleur au produit avec la quantité correspondante
                if (isset($couleur['couleur_id'])) {
                    $couleursData[$couleur['couleur_id']] = [
                        'quantite' => $couleur['quantite'] ?? 0, // Utilisation de 0 si aucune quantité n'est spécifiée
                    ];
                }
            }

            // Mise à jour de la relation produit-couleur avec les quantités dans la table pivot
            $produit->couleurs()->sync($couleursData);
        }

        return response()->json([
            'message' => 'Produit mise à jour avec succès',
            'data' => $produit->load('couleurs')
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $produit = Produit::findOrFail($id);
        $produit->delete();
        
        return response()->json([
            'message' => 'Produit supprimée avec succès'
        ], 200);    
    }
}
