<?php

namespace App\Http\Controllers;

use App\Models\Facture;
use App\Models\FactureCommande;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Schema;

class FactureCommandeController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except:['index','show'])
        ];
    }

    public function index(Request $request)
    {
        if (!$request->hasAny(['search', 'sort_by', 'sort_order', 'per_page'])) {
            return response()->json(FactureCommande::all());
        }

        $query = FactureCommande::query();

        if ($request->has('search') && !empty($request->search)) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('titre', 'LIKE', "%{$searchTerm}%")
                  ->orWhere('created_at', 'LIKE', "%{$searchTerm}%");
            });
        }

        if (Schema::hasColumn('factures', $request->input('sort_by'))) {
            $query->orderBy($request->input('sort_by'), $request->input('sort_order'));
        }
        
        $categories = $query->paginate($request->input('per_page'));

        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'commande_id' => 'required|exists:commandes,commande_id',
            'tva' => 'const:19.00',
            'totalHT' => 'required|numeric|min:0',
            'totalTTC' => 'required|numeric|min:0',
            'remise' => 'required|numeric|min:0'
        ]);

        $factureCommande = FactureCommande::create($validatedData);

        return response()->json([
            'message' => 'Facture commande ajouter avec succès',
            'data' => $factureCommande
        ], 201);
    }

    public function show($id)
{
    $facture = FactureCommande::find($id);
    if ($facture) {
        return response()->json($facture);
    } else {
        return response()->json(['message' => 'Facture non trouvée'], 404);
    }
}
    

    public function update(Request $request, $id)
    {
        $factureCommande = FactureCommande::where('facture_id', $id)
            ->firstOrFail();
        
        $validatedData = $request->validate([
            'commande_id' => 'required|exists:commandes,commande_id',
            'tva' => 'const:19.00',
            'totalHT' => 'required|numeric|min:0',
            'totalTTC' => 'required|numeric|min:0',
            'remise' => 'required|numeric|min:0'
        ]);

        $factureCommande->update($validatedData);

        return response()->json([
            'message' => 'Facture commande mise à jour avec succès',
            'data' => $factureCommande
        ], 200);
    }


public function destroy($id)
    {
        $factureCommande = FactureCommande::where('facture_id', $id)
            ->firstOrFail();
        $factureCommande->delete();
        
        return response()->json([
            'message' => 'Facture commande supprimée avec succès'
        ], 200);    
    }
}
