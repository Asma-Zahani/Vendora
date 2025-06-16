<?php

namespace App\Http\Controllers;

use App\Models\UserPreference;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class UserPreferencesController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show', 'userPreference']),
        ];
    }

    /**
     * Affiche la liste des préférences (admin ou debug)
     */
    public function index()
    {
        return UserPreference::with('user')->get();
    }

    /**
     * Enregistre ou met à jour les préférences de l'utilisateur connecté.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'preferred_categorie_ids' => 'nullable|array',
            'preferred_marque_ids' => 'nullable|array',
        ]);

        $user = Auth::user();

        $preference = UserPreference::updateOrCreate(
            ['user_id' => $user->id],
            [
                'preferred_categorie_ids' => $validated['preferred_categorie_ids'] ?? [],
                'preferred_marque_ids' => $validated['preferred_marque_ids'] ?? [],
            ]
        );

        return response()->json([
            'message' => 'Préférence ajouter avec succès',
            'data' => $preference
        ], 200);

    }

    public function userPreference($id)
    {
        $userPreference = UserPreference::where('user_id', $id)->first();
        return response()->json($userPreference);
    }

    /**
     * Affiche les préférences d’un utilisateur donné (par ID).
     */
    public function show(UserPreference $userPreference)
    {
        return response()->json($userPreference);
    }

    /**
     * Met à jour les préférences d’un utilisateur (admin ou profil utilisateur).
     */
    public function update(Request $request, UserPreference $userPreference)
    {
        $validated = $request->validate([
            'preferred_categorie_ids' => 'nullable|array',
            'preferred_marque_ids' => 'nullable|array',
        ]);

        $userPreference->update([
            'preferred_categorie_ids' => $validated['preferred_categorie_ids'] ?? [],
            'preferred_marque_ids' => $validated['preferred_marque_ids'] ?? [],
        ]);

        return response()->json($userPreference);
    }

    /**
     * Supprime les préférences (si nécessaire).
     */
    public function destroy(UserPreference $userPreference)
    {
        $userPreference->delete();

        return response()->json(['message' => 'Préférences supprimées.']);
    }
}
