<?php

namespace App\Http\Controllers;

use App\Models\Couleur;
use Illuminate\Http\Request;

class CouleurController extends Controller
{
    public function index()
    {
        return Couleur::all();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nom' => 'required|string|max:255',
            'code_hex' => 'string|max:255',
        ]);
        
        $couleur = Couleur::create($validatedData);

        return response()->json([
            'message' => 'Couleur ajouter avec succès',
            'data' => $couleur
        ], 200);
    }

    public function show($id)
    {
        $couleur = Couleur::findOrFail($id);
        return response()->json($couleur);
    }

    public function update(Request $request, $id)
    {
        $couleur = Couleur::findOrFail($id);

        $validatedData = $request->validate([
            'nom' => 'required|string|max:255',
            'code_hex' => 'string|max:255',
        ]);
        
        $couleur->update($validatedData);

        return response()->json([
            'message' => 'Couleur mise à jour avec succès',
            'data' => $couleur
        ], 200);
    }

    public function destroy($id)
    {
        $couleur = Couleur::findOrFail($id);
        $couleur->delete();
        
        return response()->json([
            'message' => 'Couleur supprimée avec succès'
        ], 200);    
    }
}
