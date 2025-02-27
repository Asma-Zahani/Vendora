<?php

namespace App\Http\Controllers;

use App\Models\Couleur;
use Illuminate\Http\Request;

class CouleurController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Couleur::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nom' => 'required|string|max:255',
            'code_hex' => 'string|max:255',
        ]);
        
        $couleur = Couleur::create($validatedData);

        return response()->json($couleur, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $couleur = Couleur::findOrFail($id);
        return response()->json($couleur);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $couleur = Couleur::findOrFail($id);

        $validatedData = $request->validate([
            'nom' => 'required|string|max:255',
            'code_hex' => 'string|max:255',
        ]);
        
        $couleur->update($validatedData);

        return response()->json($couleur, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $couleur = Couleur::findOrFail($id);
        $couleur->delete();
        return response()->json(['message' => 'couleur avec id ' . $couleur->couleur_id . ' effacer avec succés'], 200);
    }
}
