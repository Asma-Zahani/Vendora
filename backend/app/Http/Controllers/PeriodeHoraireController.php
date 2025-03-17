<?php

namespace App\Http\Controllers;

use App\Models\PeriodeHoraire;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Schema;

class PeriodeHoraireController extends Controller implements HasMiddleware
{
    // Appliquer le middleware auth, sauf pour 'index' et 'show'
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show'])
        ];
    }

    // Retourne toutes les périodes horaires
    public function index(Request $request)
    {
        return response()->json(PeriodeHoraire::with('periodesHoraires')->get());
    }

    // Stocke une nouvelle période horaire avec validation des horaires
    public function store(Request $request)
    {
        // Validation des données d'entrée
        $validatedData = $request->validate([
            'heureDebut' => 'required|date_format:H:i',
            'heureFin' => 'required|date_format:H:i',
            'horaire_id' => 'required|exists:horaires,horaire_id', // Vérifie si horaire_id existe dans la table horaires
        ]);

        
        // Création de la période horaire avec les données validées
        $periode = PeriodeHoraire::create($validatedData);

        // Retourne la réponse en JSON
        return response()->json([
            'message' => 'Période horaire ajouter avec succès',
            'data' => $periode
        ], 201);
    }

    // Affiche une période horaire spécifique
    public function show($id)
    {
        // Trouve la période horaire par son ID ou échoue
        $periode = PeriodeHoraire::findOrFail($id);

        // Retourne la période horaire en JSON
        return response()->json($periode);
    }

    // Met à jour une période horaire spécifique
    public function update(Request $request, $id)
    {
        // Trouve la période horaire par son ID ou échoue
        $periode = PeriodeHoraire::findOrFail($id);

        // Validation des données d'entrée
        $validatedData = $request->validate([
            'heureDebut' => 'required',
            'heureFin' => 'required',
        ]);

        // Mise à jour des données de la période horaire
        $periode->update($validatedData);

        return response()->json([
            'message' => 'Période horaire mise à jour avec succès',
            'data' => $periode
        ], 200);
    }

    public function destroy($id)
    {
        PeriodeHoraire::findOrFail($id)->delete();

        return response()->json([
            'message' => 'Période horaire supprimée avec succès'
        ], 200);    
    }
}
