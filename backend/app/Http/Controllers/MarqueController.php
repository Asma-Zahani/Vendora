<?php

namespace App\Http\Controllers;

use App\Models\Marque;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Schema;

class MarqueController extends Controller implements HasMiddleware
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
            return response()->json(Marque::all());
        }

        $query = Marque::query();

        if ($request->has('search') && !empty($request->search)) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('nom', 'LIKE', "%{$searchTerm}%")
                  ->orWhere('created_at', 'LIKE', "%{$searchTerm}%");
            });
        }

        if (Schema::hasColumn('marques', $request->input('sort_by'))) {
            $query->orderBy($request->input('sort_by'), $request->input('sort_order'));
        }
        
        $marques = $query->paginate($request->input('per_page', 5));

        return response()->json($marques);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nom' => 'required|string|max:255',
            'image' => 'required|string|max:255'
        ]);
        
        $marque = Marque::create($validatedData);

        return response()->json([
            'message' => 'Marque ajouter avec succès',
            'data' => $marque
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $marque = Marque::findOrFail($id);
        return response()->json($marque);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $marque = Marque::findOrFail($id);

        $validatedData = $request->validate([
            'nom' => 'required|string|max:255',
            'image' => 'required|string|max:255'
        ]);
        
        $marque->update($validatedData);

        return response()->json([
            'message' => 'Marque mise à jour avec succès',
            'data' => $marque
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $marque = Marque::findOrFail($id);
        $marque->delete();

        return response()->json([
            'message' => 'Marque supprimée avec succès'
        ], 200);
    }
}
