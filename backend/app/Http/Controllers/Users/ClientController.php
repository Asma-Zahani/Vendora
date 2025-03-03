<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Models\Panier;
use App\Models\Users\Client;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use App\Models\Produit;
use App\Models\PanierProduit;
use App\Models\ListeDeSouhait;

class ClientController extends Controller implements HasMiddleware
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
        return Client::where('role', 'client')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request){
        
        $validatedData = $request->validate([
            'nom' => 'required|max:255',
            'prenom' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
            'telephone' => 'required|string|max:20',
            'genre' => 'required|string|max:20',
            'date_naissance' => 'required|date',
            'emploi' => 'required|string|max:500',
            'typeLogement' => 'required|string|max:100',
            'statusLogement' => 'required|string|max:50',
            'region' => 'required|string|max:100',
            'ville' => 'required|string|max:100',
            'adresse' => 'required|string|max:255',
        ]);

        $validatedData['password'] = Hash::make($validatedData['password']);

        $user = Client::create($validatedData);
        
        $panier = Panier::create([
            'client_id' => $user->id
        ]);

        $token = $user->createToken($user->nom.' '.$user->prenom);

        return [
            'user' => $user,
            'token' => $token->plainTextToken
        ];
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $client = Client::findOrFail($id);
        return response()->json($client);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Client $client)
    {
        $validatedData = $request->validate([
            'nom' => 'required|max:255',
            'prenom' => 'required|max:255',
            'email' => [
                'required',
                'email',
                Rule::unique('users')->ignore($client->id),
            ],
            'telephone' => 'required|string|max:20',
            'region' => 'required|string|max:100',
            'ville' => 'required|string|max:100',
            'adresse' => 'required|string|max:255',
        ]);

        $client->update($validatedData);
        
        return response()->json($client, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $client = Client::findOrFail($id);
        $client->delete();
        return response()->json(['message' => 'Client avec id ' . $client->id . ' effacer avec succés'], 200);
    }

    public function ajouterAuPanier(Request $request)
    {
        $validatedData = $request->validate([
            'client_id' => 'required|exists:users,id',
            'produit_id' => 'required|exists:produits,produit_id',
            'quantite' => 'required|integer|min:1',
        ]);

        $client = Client::findOrFail($validatedData['client_id']);
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

        $client = Client::findOrFail($validatedData['client_id']);
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

        $client = Client::findOrFail($validatedData['client_id']);
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
        $client = Client::findOrFail($validatedData['client_id']);
        $produit = Produit::findOrFail($validatedData['produit_id']);

        // Trouver et supprimer le produit de la liste de souhaits
        $wishlistItem = ListeDeSouhait::where('client_id', $client->id)
                                      ->where('produit_id', $produit->produit_id)
                                      ->first();

        if ($wishlistItem) {
            $wishlistItem->delete();
            return response()->json(['message' => 'Produit supprimé de la liste de souhaits avec succès'], 200);
        } else {
            return response()->json(['message' => 'Produit non trouvé dans la liste de souhaits'], 404);
        }
    }
}
