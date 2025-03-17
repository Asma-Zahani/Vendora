<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Schema;

class CategorieController extends Controller implements HasMiddleware
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
            return response()->json(Categorie::all());
        }

        $query = Categorie::query();

        if ($request->has('search') && !empty($request->search)) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('titre', 'LIKE', "%{$searchTerm}%")
                  ->orWhere('created_at', 'LIKE', "%{$searchTerm}%");
            });
        }

        if (Schema::hasColumn('categories', $request->input('sort_by'))) {
            $query->orderBy($request->input('sort_by'), $request->input('sort_order'));
        }
        
        $categories = $query->paginate($request->input('per_page'));

        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'titre' => 'required|string|max:255',
            'image' => 'required|string|max:255',
        ]);

        $categorie = Categorie::create($validatedData);

        return response()->json([
            'message' => 'Catégorie ajouter avec succès',
            'data' => $categorie
        ], 200);
    }

    public function show($id)
    {
        return response()->json(Categorie::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $categorie = Categorie::findOrFail($id);

        $validatedData = $request->validate([
            'titre' => 'required|string|max:255',
            'image' => 'required|string|max:255',
        ]);

        $categorie->update($validatedData);

        return response()->json([
            'message' => 'Catégorie mise à jour avec succès',
            'data' => $categorie
        ], 200);
    }

    public function destroy($id)
    {
        Categorie::findOrFail($id)->delete();

        return response()->json([
            'message' => 'Catégorie supprimée avec succès'
        ], 200);
    }
}
