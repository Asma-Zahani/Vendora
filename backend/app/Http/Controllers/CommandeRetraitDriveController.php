<?php

namespace App\Http\Controllers;

use App\Enums\EtatCommandeEnum;
use App\Enums\ModeLivraisonEnum;
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
        return CommandeRetraitDrive::where('modeLivraison', 'CommandeRetraitDrive')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'panier_id' => 'required|exists:paniers,panier_id',
            'code_promotion_id' => 'nullable|exists:code_promotions,code_promotion_id',
            'total' => 'required|numeric|min:0',
            'etatCommande' => [Rule::in(EtatCommandeEnum::values())],
            'horaireRetrait' => 'nullable|date_format:H:i',
        ]);

        $validatedData['modeLivraison'] = ModeLivraisonEnum::CommandeRetraitDrive->value;

        $commandeRetraitDrive = CommandeRetraitDrive::create($validatedData);

        return response()->json($commandeRetraitDrive, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $commandeRetraitDrive = CommandeRetraitDrive::where('commande_id', $id)
            ->where('modeLivraison', 'CommandeRetraitDrive')
            ->firstOrFail();
    
        return response()->json($commandeRetraitDrive);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $commandeRetraitDrive = CommandeRetraitDrive::where('commande_id', $id)
            ->where('modeLivraison', 'CommandeRetraitDrive')
            ->firstOrFail();
        
        $validatedData = $request->validate([
            'panier_id' => 'required|exists:paniers,panier_id',
            'code_promotion_id' => 'nullable|exists:code_promotions,code_promotion_id',
            'total' => 'required|numeric|min:0',
            'etatCommande' => [Rule::in(EtatCommandeEnum::values())],
            'horaireRetrait' => 'nullable|date_format:H:i',
        ]);

        $commandeRetraitDrive->update($validatedData);

        return response()->json($commandeRetraitDrive, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $commandeRetraitDrive = CommandeRetraitDrive::where('commande_id', $id)
            ->where('modeLivraison', 'CommandeRetraitDrive')
            ->firstOrFail();
        
        $commandeRetraitDrive->delete();
        return response()->json(['message' => 'Commande retrait drive avec id ' . $commandeRetraitDrive->commande_id . ' effacer avec succés'], 200);
    }
}
