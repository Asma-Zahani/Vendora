<?php

namespace App\Http\Controllers;

use App\Models\Interaction;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class InteractionController extends Controller implements HasMiddleware
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
        return response()->json(Interaction::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'produit_id' => 'required|exists:produits,produit_id',
            'vue_produit' => 'nullable|numeric|min:0',
            'favori' => 'nullable|boolean',
            'ajout_panier' => 'nullable|numeric|min:0',
            'achat' => 'nullable|boolean',
        ]);

        $interaction = Interaction::where('user_id', $validatedData['user_id'])
                                ->where('produit_id', $validatedData['produit_id'])
                                ->first();

        if ($interaction) {
            if ($validatedData["vue_produit"] ?? null) {
                Interaction::where('user_id', $validatedData['user_id'])
                        ->where('produit_id', $validatedData['produit_id'])
                        ->increment('vue_produit');
            } else if ($validatedData["ajout_panier"] ?? null) {
                Interaction::where('user_id', $validatedData['user_id'])
                        ->where('produit_id', $validatedData['produit_id'])
                        ->increment('ajout_panier');
            } else {
                $interaction->update([
                    'favori' => $validatedData['favori'] ?? 0,
                    'achat' => $validatedData['achat'] ?? 0,
                ]);
            }
        } else {
            $interaction = Interaction::create([
                'user_id' => $validatedData['user_id'],
                'produit_id' => $validatedData['produit_id'],
                'vue_produit' => $validatedData['vue_produit'] ?? 0,
                'favori' => $validatedData['favori'] ?? 0,
                'ajout_panier' => $validatedData['ajout_panier'] ?? 0,
                'achat' => $validatedData['achat'] ?? 0,
            ]);
        }

        return response()->json([
            'message' => 'Interaction ajouter avec succès',
            'data' => $interaction
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return response()->json(Interaction::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $interaction = Interaction::findOrFail($id);

        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'produit_id' => 'required|exists:produits,produit_id',
            'vue_produit' => 'nullable|numeric|min:0',
            'favori' => 'nullable|boolean',
            'ajout_panier' => 'nullable|numeric|min:0',
            'achat' => 'nullable|boolean',
        ]);
        
        $interaction->update($validatedData);

        return response()->json([
            'message' => 'Interaction mise à jour avec succès',
            'data' => $interaction
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $interaction = Interaction::findOrFail($id);
        $interaction->delete();
        
        return response()->json([
            'message' => 'Interaction supprimée avec succès'
        ], 200); 
    }
}
