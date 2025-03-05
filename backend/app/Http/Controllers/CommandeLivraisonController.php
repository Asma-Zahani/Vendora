<?php

namespace App\Http\Controllers;

use App\Enums\EtatCommandeEnum;
use App\Enums\EtatLivraisonEnum;
use App\Models\Commande;
use App\Models\CommandeLivraison;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Validation\Rule;

class CommandeLivraisonController extends Controller implements HasMiddleware
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
        return CommandeLivraison::with('commande')->get();
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
            'dateLivraison' => 'nullable|date',
            'livreur_id' => ['nullable', Rule::exists('users', 'id')->where('role', 'livreur') ],
        ]);
        
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
    
        return response()->json([
            'commande' => $commande,
            'livraison' => $commandeLivraison,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
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
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $commandeLivraison = CommandeLivraison::where('commande_id', $id)
            ->firstOrFail();
        
        $commandeLivraison->delete();
        return response()->json(['message' => 'Livraison avec id ' . $commandeLivraison->commande_id . ' effacer avec succés'], 200);
    }
}
