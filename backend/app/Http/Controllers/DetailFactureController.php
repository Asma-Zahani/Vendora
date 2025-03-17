<?php

namespace App\Http\Controllers;

use App\Models\DetailFacture;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Schema;

class DetailFactureController extends Controller implements HasMiddleware
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
            return response()->json(DetailFacture::all());
        }

        $query = DetailFacture::query();

        if ($request->has('search') && !empty($request->search)) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('titre', 'LIKE', "%{$searchTerm}%")
                  ->orWhere('created_at', 'LIKE', "%{$searchTerm}%");
            });
        }

        if (Schema::hasColumn('detail_factures', $request->input('sort_by'))) {
            $query->orderBy($request->input('sort_by'), $request->input('sort_order'));
        }
        
        $categories = $query->paginate($request->input('per_page'));

        return response()->json($categories);
    }

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

        return response()->json([
            'message' => 'Détail facture ajouter avec succès',
            'data' => $detailFacture
        ], 201);
    }

    public function show($id)
    {
        $detailFacture = DetailFacture::findOrFail($id);
        return response()->json($detailFacture);
    }

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

        return response()->json([
            'message' => 'Détail facture mise à jour avec succès',
            'data' => $detailFacture
        ], 200);
    }

    public function destroy($id)
    {
        $detailFacture = DetailFacture::findOrFail($id);
        $detailFacture->delete();

        return response()->json([
            'message' => 'Détail facture supprimée avec succès'
        ], 200);    
    }
}
