<?php

namespace App\Http\Controllers;

use App\Models\Produit;
use App\Models\UserPreference;
use App\Models\Interaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class RecommandationController extends Controller
{
    public function getRecommandations(Request $request)
    {
        try {
            $response = Http::post('https://vendora-recommandation.up.railway.app/recommander-produits',
                $request->has('user_id') ? ['user_id' => $request->input('user_id')] : []
            );

            // Récupérer le message de la réponse
            $message = $response->json('message');

            return response()->json([
                'message' => $message
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Une erreur est survenue',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function getRecommandation(Request $request)
    {
        try {
            $userId = $request->input('user_id');

            // Vérifie si l'ID utilisateur est fourni
            if (!$userId) {
                return response()->json([
                    'step' => 'id_manquant',
                    'produits_recommandes' => Produit::inRandomOrder()->take(10)->get()
                ]);
            }

            // Vérifie les interactions de l'utilisateur
            $hasInteractions = Interaction::where('user_id', $userId)->exists();
            if ($hasInteractions) {
                $recommandations = $this->getRecommendationsFromTensorFlow($userId);
                return response()->json([
                    'step' => 'avec_interactions',
                    'produits_recommandes' => $recommandations
                ]);
            }

            $recommandations = $this->getRecommendationsFromPreferences($userId);

            $step = count($recommandations) === 0 ? 'aucune_preference' : 'avec_preferences';
            if ($step === 'aucune_preference') {
                $recommandations = Produit::inRandomOrder()->take(10)->get();
            }

            return response()->json([
                'step' => $step,
                'produits_recommandes' => $recommandations
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Une erreur est survenue',
                'details' => $e->getMessage()
            ], 500);
        }
    }


        
    private function getRecommendationsFromPreferences($userId)
    {
        $preference = UserPreference::where('user_id', $userId)->first();

        if (!$preference) {
            return [];
        }

        $preferredCategories = (array) $preference->preferred_categorie_ids;
        $preferredMarques = (array) $preference->preferred_marque_ids;

        // Filtrer les produits en fonction des catégories et marques préférées
        return Produit::when(!empty($preferredCategories), function ($query) use ($preferredCategories) {
                        $query->whereHas('sousCategorie', function($query) use ($preferredCategories) {
                            $query->whereIn('categorie_id', $preferredCategories);
                        });
                    })
                    ->when(!empty($preferredMarques), function ($query) use ($preferredMarques) {
                        $query->whereIn('marque_id', $preferredMarques);
                    })
                    ->take(10)
                    ->get();
    }


    private function getRecommendationsFromTensorFlow($userId)
    {
        try {
            $response = Http::post('http://127.0.0.1:5000/recommander-produits', [
                'user_id' => $userId
            ]);

            if ($response->failed()) {
                return [];
            }

            if ($response->successful()) {
                $productIds = $response->json();

                if (empty($productIds)) {
                    return [];
                }

                return Produit::whereIn('produit_id', $productIds)->get();
            }
        } catch (\Exception $e) {
            return [];
        }

        return [];
    }

}
