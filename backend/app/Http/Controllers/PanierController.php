<?php

namespace App\Http\Controllers;

use App\Enums\StatusProduitEnum;
use App\Models\Panier;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Validation\Rule;

class PanierController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except:['index','show'])
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Panier::with('produits')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'client_id' => [
                'required',
                Rule::exists('users', 'id')->where('role', 'client')
            ],
            'produits' => 'nullable|array',
            'produits.*.produit_id' => [
                'nullable',
                Rule::exists('produits', 'produit_id')->where('status', StatusProduitEnum::Disponible->value)
            ],
            'produits.*.quantite' => 'nullable|integer|min:1',
        ]);

        $panier = Panier::create([
            'client_id' => $validatedData['client_id']
        ]);

        foreach ($validatedData['produits'] as $produit) {
            $panier->produits()->attach($produit['produit_id'], ['quantite' => $produit['quantite']]);
        }

        return response()->json($panier->load('produits'), 201);
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Charger le panier avec les produits
        $panier = Panier::with('produits')->findOrFail($id);
    
        $panier->produits = $panier->produits->map(function ($produit) {
            $produit->quantite = $produit->pivot->quantite;
            return $produit;
        });
    
        return response()->json($panier);
    }
    


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $panier = Panier::findOrFail($id);

        $validatedData = $request->validate([
            'client_id' => [
                'required',
                Rule::exists('users', 'id')->where('role', 'client')
            ],
            'produits' => 'nullable|array',
            'produits.*.produit_id' => [
                'nullable',
                Rule::exists('produits', 'produit_id')->where('status', StatusProduitEnum::Disponible->value)
            ],
            'produits.*.quantite' => 'nullable|integer|min:1',
        ]);

        if ($panier->client_id !== $validatedData['client_id']) {
            return response()->json(['message' => 'Ce panier n\'appartient pas au client spécifié.'], 403);
        }

        $panier->update([
            'client_id' => $validatedData['client_id']
        ]);

        $produitsSync = [];
        foreach ($validatedData['produits'] as $produit) {
            $produitsSync[$produit['produit_id']] = ['quantite' => $produit['quantite']];
        }
        $panier->produits()->sync($produitsSync);

        return response()->json([
            'message' => 'Panier mis à jour avec succès.',
            'panier' => $panier->load('produits')
        ], 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $panier = Panier::findOrFail($id);
        $panier->delete();
        return response()->json(['message' => 'Panier avec id ' . $panier->panier_id . ' effacer avec succés'], 200);
    }
}
