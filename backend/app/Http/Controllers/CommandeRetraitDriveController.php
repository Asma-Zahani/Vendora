<?php

namespace App\Http\Controllers;

use App\Enums\EtatCommandeEnum;
use App\Models\Commande;
use App\Models\CommandeProduit;
use App\Models\CommandeRetraitDrive;
use App\Models\PanierProduit;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Validation\Rule;

class CommandeRetraitDriveController extends Controller implements HasMiddleware
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
        return CommandeRetraitDrive::with('commande')->get();
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
        ]);

        $commande = Commande::create([
            'client_id' => $validatedData['client_id'],
            'code_promotion_id' => $validatedData['code_promotion_id'] ?? null,
            'total' => $validatedData['total'],
            'etatCommande' => $validatedData['etatCommande'] ?? EtatCommandeEnum::EnAttente->value,
        ]);
    
        $commandeRetraitDrive = CommandeRetraitDrive::create([
            'commande_id' => $commande->commande_id,
            'drive_id' => $validatedData['drive_id'],
            'dateRetrait' => $validatedData['dateRetrait'] ?? null,
        ]);

        foreach ($validatedData['produits'] as $produit) {
            CommandeProduit::create([
                'commande_id' => $commande->commande_id,
                'produit_id' => $produit['produit_id'],
                'quantite' => $produit['quantite'],
            ]);
        }

        PanierProduit::where('client_id', $validatedData['client_id'])->delete();

        return response()->json([
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
        return response()->json(['message' => 'Commande retrait drive avec id ' . $commandeRetraitDrive->commande_id . ' effacer avec succés'], 200);
    }
}
