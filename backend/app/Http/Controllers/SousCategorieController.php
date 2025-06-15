<?php

namespace App\Http\Controllers;

use App\Models\SousCategorie;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Schema;

class SousCategorieController extends Controller implements HasMiddleware
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
        $query = SousCategorie::with(['categorie']);

        if (!$request->hasAny(['search', 'filtre', 'sort_by', 'sort_order', 'per_page'])) {
            return response()->json($query->get());
        }

        if ($request->has('search') && !empty($request->search)) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('titre', 'LIKE', "%{$searchTerm}%")
                  ->orWhereHas('categorie', function($q) use ($searchTerm) {
                      $q->where('titre', 'LIKE', "%{$searchTerm}%");
                  })
                  ->orWhere('created_at', 'LIKE', "%{$searchTerm}%");
            });
        }

        if ($request->has('sort_by') && $request->has('sort_order')) {
            $sortBy = $request->input('sort_by');
            $sortOrder = $request->input('sort_order', 'asc');
    
            if ($sortBy === 'categories.titre') {
                $query->join('categories', 'sous_categories.categorie_id', '=', 'categories.categorie_id')
                      ->orderBy('categories.titre', $sortOrder)
                      ->select('sous_categories.*');
            } elseif (Schema::hasColumn('sous_categories', $sortBy)) {
                $query->orderBy($sortBy, $sortOrder);
            }
        }

        $sousCategories = $query->paginate($request->input('per_page', 5));

        return response()->json($sousCategories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'categorie_id' => 'required|exists:categories,categorie_id',
            'titre' => 'required|string|max:255',
            'image' => 'required|string|max:255',
        ]);
        
        $sousCategorie = SousCategorie::create($validatedData);

        return response()->json([
            'message' => 'Sous catégorie ajouter avec succès',
            'data' => $sousCategorie
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $sousCategorie = SousCategorie::findOrFail($id);
        return response()->json($sousCategorie);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $sousCategorie = SousCategorie::findOrFail($id);

        $validatedData = $request->validate([
            'categorie_id' => 'required|exists:categories,categorie_id',
            'titre' => 'required|string|max:255',
            'image' => 'required|string|max:255',
        ]);
        
        $sousCategorie->update($validatedData);

        return response()->json([
            'message' => 'Sous catégorie mise à jour avec succès',
            'data' => $sousCategorie
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $sousCategorie = SousCategorie::findOrFail($id);
        $sousCategorie->delete();

        return response()->json([
            'message' => 'Sous catégorie supprimée avec succès'
        ], 200);    
    }
}
