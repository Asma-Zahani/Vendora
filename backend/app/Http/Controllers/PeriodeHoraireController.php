<?php

namespace App\Http\Controllers;

use App\Models\PeriodeHoraire;
use App\Models\Horaire;  // Assurez-vous d'importer le modèle Horaire
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Validation\Rule;

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
    public function index()
    {
        return PeriodeHoraire::all();
    }

    // Stocke une nouvelle période horaire avec validation des horaires
    public function store(Request $request)
    {
        // Validation des données d'entrée
        $validatedData = $request->validate([
            'heure_debut' => 'required|date_format:H:i',
            'heure_fin' => 'required|date_format:H:i',
            'horaire_id' => 'required|exists:horaires,horaire_id', // Vérifie si horaire_id existe dans la table horaires
        ]);

        
        // Création de la période horaire avec les données validées
        $periode = PeriodeHoraire::create($validatedData);

        // Retourne la réponse en JSON
        return response()->json($periode, 201);  // Code 201 pour la création
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
            'heure_debut' => 'required',
            'heure_fin' => 'required',
        ]);

        // Mise à jour des données de la période horaire
        $periode->update($validatedData);

        // Retourne la période horaire mise à jour en JSON
        return response()->json($periode, 200);
    }

    // Supprime une période horaire
    public function destroy($id)
    {
        // Trouve la période horaire par son ID ou échoue
        $periode = PeriodeHoraire::findOrFail($id);

        // Supprime la période horaire
        $periode->delete();

        // Retourne une réponse JSON avec un message de succès
        return response()->json(['message' => 'Période horaire supprimée avec succès'], 200);
    }
}
