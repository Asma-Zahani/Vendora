<?php

namespace App\Http\Controllers;

use App\Enums\EtatCommandeEnum;
use App\Enums\ModeLivraisonEnum;
use App\Models\Commande;
use App\Models\CommandeRetraitDrive;
use App\Models\RetraitDrive;
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
            'horaireRetrait' => 'nullable|date_format:H:i',
        ]);
        
        $commande = Commande::create([
            'client_id' => $validatedData['client_id'],
            'code_promotion_id' => $validatedData['code_promotion_id'] ?? null,
            'total' => $validatedData['total'],
            'etatCommande' => $validatedData['etatCommande'] ?? EtatCommandeEnum::EnAttente->value,
        ]);
    
        $commandeRetraitDrive = CommandeRetraitDrive::create([
            'commande_id' => $commande->commande_id,
            'horaireRetrait' => $validatedData['horaireRetrait'] ?? null,
        ]);
    
        return response()->json([
            'commande' => $commande,
            'retraiDrive' => $commandeRetraitDrive,
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
            'horaireRetrait' => 'nullable|date_format:H:i',
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
            'horaireRetrait' => $validatedData['horaireRetrait'] ?? $commandeRetraitDrive->horaireRetrait
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
