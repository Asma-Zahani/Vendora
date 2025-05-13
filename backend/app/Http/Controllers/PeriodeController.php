<?php

namespace App\Http\Controllers;

use App\Models\Horaire;
use App\Models\Periode;
use App\Models\PeriodeHoraire;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class PeriodeController extends Controller implements HasMiddleware
{
    // Appliquer le middleware auth, sauf pour 'index' et 'show'
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show'])
        ];
    }

    // Retourne toutes les périodes horaires
    public function index()
    {
        return response()->json(Periode::get());
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'heureDebut' => 'required|date_format:H:i',
            'heureFin' => 'required|date_format:H:i',
            'horaire_id' => 'required|exists:horaires,horaire_id',
        ]);

        $periode = Periode::firstOrCreate([
            'heureDebut' => $validatedData['heureDebut'],
            'heureFin' => $validatedData['heureFin'],
        ]);

        $relationExiste = PeriodeHoraire::where('horaire_id', $validatedData['horaire_id'])
            ->where('periode_id', $periode->periode_id)
            ->exists();

        if (!$relationExiste) {
            PeriodeHoraire::create([
                'horaire_id' => $validatedData['horaire_id'],
                'periode_id' => $periode->periode_id,
            ]);
        }

        return response()->json([
            'message' => 'Période horaire ajouter avec succès',
            'data' => $periode
        ], 201);
    }

    public function show($id)
    {
        return response()->json(Periode::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $anciennePeriode = Periode::findOrFail($id);

        $validatedData = $request->validate([
            'heureDebut' => 'required|date_format:H:i',
            'heureFin' => 'required|date_format:H:i',
            'horaire_id' => 'required|exists:horaires,horaire_id',
        ]);

        $nouvellePeriode = Periode::firstOrCreate([
            'heureDebut' => $validatedData['heureDebut'],
            'heureFin' => $validatedData['heureFin'],
        ]);

        PeriodeHoraire::where('horaire_id', $validatedData['horaire_id'])
            ->where('periode_id', $anciennePeriode->periode_id)
            ->update(['periode_id' => $nouvellePeriode->periode_id]);

        return response()->json([
            'message' => 'Période horaire mise à jour avec succès',
            'data' => $nouvellePeriode
        ], 200);
    }

    public function destroy(Request $request, $id)
    {   
        $periode = Periode::findOrFail($id);

        $validatedData = $request->validate([
            'horaire_id' => 'required|exists:horaires,horaire_id',
        ]);

        PeriodeHoraire::where('horaire_id', $validatedData['horaire_id'])
            ->where('periode_id', $periode->periode_id)
            ->delete();

        return response()->json([
            'message' => 'Période horaire supprimée avec succès'
        ], 200);    
    }
}
