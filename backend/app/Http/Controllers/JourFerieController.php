<?php

namespace App\Http\Controllers;

use App\Models\JourFerie;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class JourFerieController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except:['index','show'])
        ];
    }

    /**
     * Affiche la liste des jours fériés.
     */
    public function index()
    {
        return JourFerie::all();
    }

    /**
     * Enregistre un nouveau jour férié.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'start' => 'required|date',
            'end' => 'required|date',
        ]);
        
        $jourFerie = JourFerie::create($validatedData);

        return response()->json($jourFerie, 200);
    }

    /**
     * Affiche un jour férié spécifique.
     */
    public function show($id)
    {
        $jourFerie = JourFerie::findOrFail($id);
        return response()->json($jourFerie);
    }

    /**
     * Met à jour un jour férié existant.
     */
    public function update(Request $request, $id)
    {
        $jourFerie = JourFerie::findOrFail($id);

        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'start' => 'required|date',
            'end' => 'required|date',
        ]);
        
        $jourFerie->update($validatedData);

        return response()->json($jourFerie, 200);
    }

    /**
     * Supprime un jour férié.
     */
    public function destroy($id)
    {
        $jourFerie = JourFerie::findOrFail($id);
        $jourFerie->delete();
        return response()->json(['message' => 'Jour férié avec id ' . $jourFerie->jour_ferie_id . ' supprimé avec succès'], 200);
    }
}
