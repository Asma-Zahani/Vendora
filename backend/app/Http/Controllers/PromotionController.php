<?php

namespace App\Http\Controllers;

use App\Models\Promotion;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Schema;

class PromotionController extends Controller implements HasMiddleware
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
    public function index(Request $request)
    {
        if (!$request->hasAny(['search', 'sort_by', 'sort_order', 'per_page'])) {
            return response()->json(Promotion::all());
        }

        $query = Promotion::query();

        if ($request->has('search') && !empty($request->search)) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('nom', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('reduction', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('dateDebut', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('dateFin', 'LIKE', "%{$searchTerm}%");
            });
        }

        if (Schema::hasColumn('promotions', $request->input('sort_by'))) {
            $query->orderBy($request->input('sort_by'), $request->input('sort_order'));
        }

        $promotion = $query->paginate($request->input('per_page', 5));

        return response()->json($promotion);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nom' => 'required|string|max:255',
            'reduction' => 'required|numeric|min:0|max:100',
            'dateDebut' => 'required|date',
            'dateFin' => 'required|date|after:dateDebut',
        ]);
        
        $promotion = Promotion::create($validatedData);

        return response()->json([
            'message' => 'Promotion ajouter avec succès',
            'data' => $promotion
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $promotion = Promotion::findOrFail($id);
        return response()->json($promotion);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $promotion = Promotion::findOrFail($id);

        $validatedData = $request->validate([
            'nom' => 'required|string|max:255',
            'reduction' => 'required|numeric|min:0|max:100',
            'dateDebut' => 'required|date',
            'dateFin' => 'required|date|after:dateDebut',
        ]);
        
        $promotion->update($validatedData);

        return response()->json([
            'message' => 'Promotion mise à jour avec succès',
            'data' => $promotion
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $promotion = Promotion::findOrFail($id);
        $promotion->delete();

        return response()->json([
            'message' => 'Promotion supprimée avec succès'
        ], 200);    
    }
}
