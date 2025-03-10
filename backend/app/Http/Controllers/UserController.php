<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use App\Models\Produit;
use App\Models\PanierProduit;
use App\Models\ListeDeSouhait;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except:['clients','livreurs','show'])
        ];
    }

    public function clients()
    {
        return response()->json(User::whereHas('roles', function ($query) {
            $query->where('role', 'client');
        })->whereDoesntHave('roles', function ($query) {
            $query->where('role', '!=', 'client');
        })->get());
    }   

    public function livreurs()
    {
        return response()->json(User::whereHas('roles', function ($query) {
            $query->where('role', 'livreur');
        })->get());
    }  
    
    public function show($id)
    {
        $client = User::findOrFail($id);
        return response()->json($client);
    }
    
    public function update(Request $request, $id)
    {
        $user = User::where('id', $id)
            ->firstOrFail();
        
        $validatedData = $request->validate([
            'nom' => 'required|max:255',
            'prenom' => 'required|max:255',
            'email' => [
                'required',
                'email',
                Rule::unique('users')->ignore($user->id),
            ],
            'telephone' => 'required|string|max:20',
            'genre' => 'nullable|string|max:20',
            'date_naissance' => 'nullable|date',
            'emploi' => 'required|string|max:500',
            'typeLogement' => 'required|string|max:100',
            'statusLogement' => 'required|string|max:50',
            'region' => 'required|string|max:100',
            'ville' => 'required|string|max:100',
            'adresse' => 'required|string|max:255',
        ]);
        
        $user->update($validatedData);

        return response()->json($user, 200);
    }

    public function destroy($id)
    {
        $user = User::where('id', $id)
            ->firstOrFail();

        $user->delete();
        return response()->json(['message' => 'User avec id ' . $user->id . ' effacer avec succés'], 200);
    }

    public function ajouterAuPanier(Request $request)
    {
        $validatedData = $request->validate([
            'client_id' => 'required|exists:users,id',
            'produit_id' => 'required|exists:produits,produit_id',
            'quantite' => 'required|integer|min:1',
        ]);

        $client = User::findOrFail($validatedData['client_id']);
        $produit = Produit::findOrFail($validatedData['produit_id']);

        $panierProduit = PanierProduit::where('client_id', $client->id)
                                      ->where('produit_id', $produit->produit_id)
                                      ->first();

        if ($panierProduit) {
            PanierProduit::where('client_id', $client->id)
                        ->where('produit_id', $produit->produit_id)
                        ->update(['quantite' => $validatedData['quantite']]);
        } else {
            PanierProduit::create([
                'client_id' => $client->id,
                'produit_id' => $produit->produit_id,
                'quantite' => $validatedData['quantite'],
            ]);
        }        

        return response()->json(['message' => 'Produit ajouté au panier avec succès'], 200);
    }

    public function ajouterAListeDeSouhaits(Request $request)
    {
        $validatedData = $request->validate([
            'client_id' => 'required|exists:users,id',
            'produit_id' => 'required|exists:produits,produit_id',
        ]);

        $client = User::findOrFail($validatedData['client_id']);
        $produit = Produit::findOrFail($validatedData['produit_id']);

        $wishlistItem = ListeDeSouhait::where('client_id', $client->id)
                                      ->where('produit_id', $produit->produit_id)
                                      ->first();

        if (!$wishlistItem) {
            ListeDeSouhait::create([
                'client_id' => $client->id,
                'produit_id' => $produit->produit_id,
            ]);
        }

        return response()->json(['message' => 'Produit ajouté à la liste de souhaits avec succès'], 200);
    }

    /**
     * Supprime un produit du panier.
     */
    public function supprimerDuPanier(Request $request)
    {
        $validatedData = $request->validate([
            'client_id' => 'required|exists:users,id',
            'produit_id' => 'required|exists:produits,produit_id',
        ]);

        $client = User::findOrFail($validatedData['client_id']);
        $produit = Produit::findOrFail($validatedData['produit_id']);

        $panierProduit = PanierProduit::where('client_id', $client->id)
                                      ->where('produit_id', $produit->produit_id)
                                      ->first();

        if ($panierProduit) {
            PanierProduit::where('client_id', $client->id)
                 ->where('produit_id', $produit->produit_id)
                 ->delete();
            return response()->json(['message' => 'Produit supprimé du panier avec succès'], 200);
        } else {
            return response()->json(['message' => 'Produit non trouvé dans le panier'], 404);
        }
    }

    /**
     * Supprime un produit de la liste de souhaits.
     */
    public function supprimerDeListeSouhaits(Request $request)
    {
        // Validation des données
        $validatedData = $request->validate([
            'client_id' => 'required|exists:users,id',
            'produit_id' => 'required|exists:produits,produit_id',
        ]);

        // Récupérer le client et le produit
        $client = User::findOrFail($validatedData['client_id']);
        $produit = Produit::findOrFail($validatedData['produit_id']);

        // Trouver et supprimer le produit de la liste de souhaits
        $wishlistItem = ListeDeSouhait::where('client_id', $client->id)
                                      ->where('produit_id', $produit->produit_id)
                                      ->first();

        if ($wishlistItem) {
            ListeDeSouhait::where('client_id', $client->id)
                ->where('produit_id', $produit->produit_id)
                ->delete();
            return response()->json(['message' => 'Produit supprimé de la liste de souhaits avec succès'], 200);
        } else {
            return response()->json(['message' => 'Produit non trouvé dans la liste de souhaits'], 404);
        }
    }
}
