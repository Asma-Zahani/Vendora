<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use App\Models\Produit;
use App\Models\PanierProduit;
use App\Models\ListeDeSouhait;
use App\Models\User;
use Illuminate\Support\Facades\Schema;
use Illuminate\Validation\Rule;

class UserController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except:['index','clients','livreurs','responsables','show'])
        ];
    }

    public function index()
    {
        return User::all();
    }

    public function clientDrive(Request $request)
    {
        $responsable = User::with('drive')->where('id', intval($request->user()->id))->first();
        $driveId = $responsable->drive->drive_id;

        $query = User::whereHas('commandes.commandeRetraitDrive', function ($q) use ($driveId) {
                $q->where('drive_id', $driveId);
            })
            ->with(['commandes' => function ($q) use ($driveId) {
                $q->whereHas('commandeRetraitDrive', function ($qq) use ($driveId) {
                    $qq->where('drive_id', $driveId);
                });
            }]);

        // Recherche
        if ($request->has('search') && !empty($request->search)) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $searchParts = explode(' ', $searchTerm); 
                $q->where(function ($q) use ($searchParts) {
                    if (isset($searchParts[0])) {
                        $q->where('prenom', 'LIKE', "%{$searchParts[0]}%");
                    }
                    if (isset($searchParts[1])) {
                        $q->orWhere('nom', 'LIKE', "%{$searchParts[1]}%");
                    }
                })
                ->orWhere('telephone', 'LIKE', "%{$searchTerm}%")
                ->orWhere('email', 'LIKE', "%{$searchTerm}%");
            });
        }

        // Tri
        if ($request->filled('sort_by') && Schema::hasColumn('users', $request->input('sort_by'))) {
            $query->orderBy($request->input('sort_by'), $request->input('sort_order', 'asc'));
        }

        // Pagination
        $clients = $query->paginate($request->input('per_page', 10));

        return response()->json($clients);
    }

    public function clientLivreur(Request $request)
    {
        $livreurId = intval($request->user()->id);
    
        $query = User::whereHas('commandes.commandeLivraison', function ($q) use ($livreurId) {
                $q->where('livreur_id', $livreurId);
            })
            ->with(['commandes' => function ($q) use ($livreurId) {
                $q->whereHas('commandeLivraison', function ($qq) use ($livreurId) {
                    $qq->where('livreur_id', $livreurId);
                });
            }]);

        // Recherche
        if ($request->has('search') && !empty($request->search)) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $searchParts = explode(' ', $searchTerm); 
                $q->where(function ($q) use ($searchParts) {
                    if (isset($searchParts[0])) {
                        $q->where('prenom', 'LIKE', "%{$searchParts[0]}%");
                    }
                    if (isset($searchParts[1])) {
                        $q->orWhere('nom', 'LIKE', "%{$searchParts[1]}%");
                    }
                })
                ->orWhere('telephone', 'LIKE', "%{$searchTerm}%")
                ->orWhere('email', 'LIKE', "%{$searchTerm}%");
            });
        }

        // Tri
        if ($request->filled('sort_by') && Schema::hasColumn('users', $request->input('sort_by'))) {
            $query->orderBy($request->input('sort_by'), $request->input('sort_order', 'asc'));
        }

        // Pagination
        $clients = $query->paginate($request->input('per_page', 10));

        return response()->json($clients);
    }

    public function clients(Request $request)
    {
        return $this->getUser($request, "client");
    }
    
    public function livreurs(Request $request)
    {
        return $this->getUser($request, "livreur");
    }

    public function responsables(Request $request)
    {
        return $this->getUser($request, "responsable");
    }  

    public function getUser(Request $request, string $role)
    {   
        if($role === "responsable") {
            $query = User::with('drive')->where('role', $role);
        } else {
            $query = User::where('role', $role);
        }

        if ($request->hasAny(['search', 'sort_by', 'sort_order', 'per_page'])) {
            if ($request->has('search') && !empty($request->search)) {
                $searchTerm = $request->search;
                $query->where(function ($q) use ($searchTerm) {
                    $searchParts = explode(' ', $searchTerm); 
            
                    $q->where(function($q) use ($searchParts) {
                        if (isset($searchParts[0])) {
                            $q->where('prenom', 'LIKE', "%{$searchParts[0]}%");
                        }
                        if (isset($searchParts[1])) {
                            $q->orWhere('nom', 'LIKE', "%{$searchParts[1]}%");
                        }
                    })
                    ->orWhere('telephone', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('email', 'LIKE', "%{$searchTerm}%");
                });
            }            
            if (Schema::hasColumn('users', $request->input('sort_by'))) {
                $query->orderBy($request->input('sort_by'), $request->input('sort_order'));
            }
            $client = $query->paginate($request->input('per_page'));
        } else {
            $client = $query->get();
        }
        return response()->json($client);
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
            'emploi' => 'nullable|string|max:500',
            'typeLogement' => 'nullable|string|max:100',
            'statusLogement' => 'nullable|string|max:50',
            'region' => 'nullable|string|max:100',
            'ville' => 'nullable|string|max:100',
            'adresse' => 'nullable|string|max:255',
        ]);
        
        $user->update($validatedData);

        return response()->json([
            'message' => $user->role->value . ' mise à jour avec succès',
            'data' => $user
        ], 200);
    }

    public function destroy($id)
    {
        $user = User::where('id', $id)->firstOrFail();
        $user->delete();

        return response()->json([
            'message' => $user->role->value . ' supprimée avec succès'
        ], 200);
    }

    public function ajouterAuPanier(Request $request)
    {
        $validatedData = $request->validate([
            'client_id' => 'required|exists:users,id',
            'produit_id' => 'required|exists:produits,produit_id',
            'quantite' => 'required|integer|min:1',
            'couleur' => 'nullable|string|max:50',
            'ancienne_couleur' => 'nullable|string|max:50'
        ]);

        $client = User::findOrFail($validatedData['client_id']);
        $produit = Produit::with(['couleurs'])->findOrFail($validatedData['produit_id']);

        if ($validatedData['ancienne_couleur'] ?? null) {
            return $this->modifierCouleurPanier($request, $client, $produit);
        }

        $panierProduit = PanierProduit::where('client_id', $client->id)
            ->where('produit_id', $produit->produit_id)
            ->where('couleur', $validatedData['couleur'] ?? null)
            ->first();
        
        if ($panierProduit) {
            $couleur = $produit->couleurs->firstWhere('nom', $request->couleur);
            $stockDisponible = $produit->quantite ?? ($couleur->pivot->quantite ?? 0);
            if ($validatedData['quantite'] > $stockDisponible) {
                return response()->json(['message' => 'La quantité demandée dépasse le stock disponible !'], 200);
            }
            if ($validatedData['quantite'] == $stockDisponible && $panierProduit->quantite == $stockDisponible) {
                return response()->json(['message' => 'Vous avez atteint la quantité maximale disponible pour ce produit.'], 200);
            }
            $panierProduit->update(['quantite' => $validatedData['quantite']]);
            return response()->json(['message' => 'Quantité mise à jour avec succès'], 200);
        }

        PanierProduit::create([
            'client_id' => $client->id,
            'produit_id' => $produit->produit_id,
            'quantite' => $validatedData['quantite'],
            'couleur' => $validatedData['couleur'] ?? null
        ]);

        $data = [
            'user_id' => $validatedData['client_id'],
            'produit_id' => $validatedData['produit_id'],
            'ajout_panier' => 1
        ];

        $requestInteraction = new Request($data);

        $interactionController = new InteractionController();
        $interactionController->store($requestInteraction);

        return response()->json(['message' => 'Produit ajouté au panier avec succès'], 200);
    }

    public function modifierCouleurPanier(Request $request, $client, $produit){
        $couleur = $produit->couleurs->firstWhere('nom', $request->couleur);
        $panierProduit = PanierProduit::where('client_id', $client->id)
            ->where('produit_id', $produit->produit_id)
            ->where('couleur', $request->couleur)
            ->first();
        
        if ($request->quantite > ($couleur->pivot->quantite ?? 0)) {
            return response()->json(['message' => 'La quantité demandée dépasse le stock disponible !'], 200);
        }   
        if ($panierProduit) {
            if ($panierProduit->quantite == ($couleur->pivot->quantite ?? 0)) {
                return response()->json(['message' => 'Vous avez atteint la quantité maximale disponible pour ce produit.'], 200);
            }
            $panierProduit->update(['quantite' => $request->quantite]);
        } else {
            PanierProduit::create([
                'client_id' => $client->id,
                'produit_id' => $produit->produit_id,
                'quantite' => $request->quantite,
                'couleur' => $request->couleur
            ]);
        }
        PanierProduit::where('client_id', $client->id)
            ->where('produit_id', $produit->produit_id)
            ->where('couleur', $request->ancienne_couleur)
            ->delete();
    
        return response()->json(['message' => 'Couleur modifiée avec succès'], 200);
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
            'couleur' => 'nullable|string|max:50',
        ]);
        $client = User::findOrFail($validatedData['client_id']);
        $produit = Produit::findOrFail($validatedData['produit_id']);

        PanierProduit::where('client_id', $client->id)
                    ->where('produit_id', $produit->produit_id)
                    ->where('couleur', $validatedData['couleur'] ?? null)
                    ->delete();

        return response()->json(['message' => 'Produit supprimé du panier avec succès'], 200);
    }

    /**
     * Supprime un produit de la liste de souhaits.
     */
    public function supprimerDeListeSouhaits($user_id, $produit_id)
    {
        $client = User::findOrFail($user_id);
        $produit = Produit::findOrFail($produit_id);
        
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