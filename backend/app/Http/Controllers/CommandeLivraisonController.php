<?php

namespace App\Http\Controllers;

use App\Enums\EtatCommandeEnum;
use App\Enums\EtatLivraisonEnum;
use App\Enums\ModeLivraisonEnum;
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
        return CommandeLivraison::where('modeLivraison', 'CommandeLivraison')->get();
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
            'dateLivraison' => 'nullable|date',
            'etatLivraison' => [Rule::in(EtatLivraisonEnum::values())],
            'livreur_id' => ['nullable', Rule::exists('users', 'id')->where('role', 'livreur') ],
        ]);
        
        if (empty($validatedData['etatCommande'])) {
            $validatedData['etatCommande'] = EtatCommandeEnum::EnAttente->value;
        }

        $validatedData['modeLivraison'] = ModeLivraisonEnum::CommandeLivraison->value;

        $commande = CommandeLivraison::create($validatedData);

        return response()->json($commande, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $commandeLivraison = CommandeLivraison::where('commande_id', $id)
            ->where('modeLivraison', 'CommandeLivraison')
            ->firstOrFail();
    
        return response()->json($commandeLivraison);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $commandeLivraison = CommandeLivraison::where('commande_id', $id)
            ->where('modeLivraison', 'CommandeLivraison')
            ->firstOrFail();
        
        $validatedData = $request->validate([
            'panier_id' => 'required|exists:paniers,panier_id',
            'code_promotion_id' => 'nullable|exists:code_promotions,code_promotion_id',
            'total' => 'required|numeric|min:0',
            'etatCommande' => [Rule::in(EtatCommandeEnum::values())],
            'dateLivraison' => 'nullable|date',
            'etatLivraison' => [Rule::in(EtatLivraisonEnum::values())],
            'livreur_id' => ['nullable', Rule::exists('users', 'id')->where('role', 'livreur') ],
        ]);

        $commandeLivraison->update($validatedData);

        return response()->json($commandeLivraison, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $commandeLivraison = CommandeLivraison::where('commande_id', $id)
            ->where('modeLivraison', 'CommandeLivraison')
            ->firstOrFail();
        
        $commandeLivraison->delete();
        return response()->json(['message' => 'Livraison avec id ' . $commandeLivraison->commande_id . ' effacer avec succés'], 200);
    }
}
