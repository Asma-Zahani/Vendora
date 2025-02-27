<?php

namespace App\Http\Controllers;

use App\Models\PeriodeHoraire;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Validation\Rule;

class PeriodeHoraireController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except:['index','show'])
        ];
    }

    public function index()
    {
        return PeriodeHoraire::all();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'heure_debut' => 'required|date_format:H:i',
            'heure_fin' => 'required|date_format:H:i|after:heure_debut',
            'horaires' => 'required|array',
            'horaires.*.horaire_id' => 'required|exists:horaires,horaire_id',
        ]);        
        
        $periode = PeriodeHoraire::create($validatedData);

        return response()->json($periode, 200);
    }

    public function show($id)
    {
        $periode = PeriodeHoraire::findOrFail($id);
        return response()->json($periode);
    }

    public function update(Request $request, $id)
    {
        $periode = PeriodeHoraire::findOrFail($id);

        $validatedData = $request->validate([
            'heure_debut' => 'required|date_format:H:i',
            'heure_fin' => 'required|date_format:H:i|after:heure_debut',
        ]);
        
        $periode->update($validatedData);

        return response()->json($periode, 200);
    }

    public function destroy($id)
    {
        $periode = PeriodeHoraire::findOrFail($id);
        $periode->delete();
        return response()->json(['message' => 'Période horaire supprimée avec succès'], 200);
    }
}
