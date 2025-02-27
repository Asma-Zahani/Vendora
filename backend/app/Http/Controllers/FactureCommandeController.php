<?php

namespace App\Http\Controllers;

use App\Models\Facture;
use App\Models\FactureCommande;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class FactureCommandeController extends Controller implements HasMiddleware
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
        return FactureCommande::where('dtype', 'facture_commandes')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'commande_id' => 'required|exists:commandes,commande_id',
            'date' => 'required|date',
            'tva' => 'required|numeric|min:0|max:100',
            'totalHT' => 'required|numeric|min:0',
            'totalTTC' => 'required|numeric|min:0',
            'remise' => 'required|numeric|min:0'
        ]);

        $validatedData['dtype'] = 'facture_commandes';

        $factureCommande = FactureCommande::create($validatedData);

        return response()->json($factureCommande, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $factureCommande = FactureCommande::where('facture_id', $id)
            ->where('dtype', 'facture_commandes')
            ->firstOrFail();
    
        return response()->json($factureCommande);
    }    

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $factureCommande = FactureCommande::where('facture_id', $id)
            ->where('dtype', 'facture_commandes')
            ->firstOrFail();
        
        $validatedData = $request->validate([
            'commande_id' => 'required|exists:commandes,commande_id',
            'date' => 'required|date',
            'tva' => 'required|numeric|min:0|max:100',
            'totalHT' => 'required|numeric|min:0',
            'totalTTC' => 'required|numeric|min:0',
            'remise' => 'required|numeric|min:0'
        ]);

        $factureCommande->update($validatedData);

        return response()->json($factureCommande, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $factureCommande = FactureCommande::where('facture_id', $id)
            ->where('dtype', 'facture_commandes')
            ->firstOrFail();
        $factureCommande->delete();
        return response()->json(['message' => 'FactureCommande avec id ' . $factureCommande->facture_id . ' effacer avec succés'], 200);
    }
}
