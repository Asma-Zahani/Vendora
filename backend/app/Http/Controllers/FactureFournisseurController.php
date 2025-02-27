<?php

namespace App\Http\Controllers;

use App\Models\FactureFournisseur;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Validation\Rule;

class FactureFournisseurController extends Controller implements HasMiddleware
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
        return FactureFournisseur::where('dtype', 'facture_fournisseurs')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'fournisseur_id' => ['nullable', Rule::exists('users', 'id')->where('role', 'fournisseur') ],
            'date' => 'required|date',
            'tva' => 'required|numeric|min:0|max:100',
            'totalHT' => 'required|numeric|min:0',
            'totalTTC' => 'required|numeric|min:0'
        ]);

        $validatedData['dtype'] = 'facture_fournisseurs';

        $factureFournisseur = FactureFournisseur::create($validatedData);
        
        return response()->json($factureFournisseur, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $factureFournisseur = FactureFournisseur::where('facture_id', $id)
            ->where('dtype', 'facture_fournisseurs')
            ->firstOrFail();
    
        return response()->json($factureFournisseur);
    }    

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $factureFournisseur = FactureFournisseur::where('facture_id', $id)
            ->where('dtype', 'facture_fournisseurs')
            ->firstOrFail();

        $validatedData = $request->validate([
            'fournisseur_id' => ['nullable', Rule::exists('users', 'id')->where('role', 'fournisseur') ],
            'date' => 'required|date',
            'tva' => 'required|numeric|min:0|max:100',
            'totalHT' => 'required|numeric|min:0',
            'totalTTC' => 'required|numeric|min:0'
        ]);

        $factureFournisseur->update($validatedData);

        return response()->json($factureFournisseur, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $factureFournisseur = FactureFournisseur::where('facture_id', $id)
            ->where('dtype', 'facture_fournisseurs')
            ->firstOrFail();
        $factureFournisseur->delete();
        return response()->json(['message' => 'FactureFournisseur avec id ' . $factureFournisseur->facture_id . ' effacer avec succés'], 200);
    }
}
