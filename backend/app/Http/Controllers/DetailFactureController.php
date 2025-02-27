<?php

namespace App\Http\Controllers;

use App\Models\DetailFacture;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class DetailFactureController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except:['index','show'])
        ];
    }

    /**
     * Affiche la liste des détails de factures.
     */
    public function index()
    {
        return DetailFacture::all();
    }

    /**
     * Enregistre un nouveau détail de facture.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'facture_id' => 'required|exists:factures,facture_id',
            'quantite' => 'required|integer|min:1',
            'prix_unitaire' => 'required|numeric|min:0',
            'totalLigneHT' => 'required|numeric|min:0',
            'totalLigneTTC' => 'required|numeric|min:0',
            'tvaLigne' => 'required|numeric|min:0',
        ]);
        
        $detailFacture = DetailFacture::create($validatedData);

        return response()->json($detailFacture, 200);
    }

    /**
     * Affiche un détail de facture spécifique.
     */
    public function show($id)
    {
        $detailFacture = DetailFacture::findOrFail($id);
        return response()->json($detailFacture);
    }

    /**
     * Met à jour un détail de facture existant.
     */
    public function update(Request $request, $id)
    {
        $detailFacture = DetailFacture::findOrFail($id);

        $validatedData = $request->validate([
            'quantite' => 'required|integer|min:1',
            'prix_unitaire' => 'required|numeric|min:0',
            'totalLigneHT' => 'required|numeric|min:0',
            'totalLigneTTC' => 'required|numeric|min:0',
            'tvaLigne' => 'required|numeric|min:0',
        ]);
        
        $detailFacture->update($validatedData);

        return response()->json($detailFacture, 200);
    }

    /**
     * Supprime un détail de facture.
     */
    public function destroy($id)
    {
        $detailFacture = DetailFacture::findOrFail($id);
        $detailFacture->delete();
        return response()->json(['message' => 'Détail de facture supprimé avec succès'], 200);
    }
}
