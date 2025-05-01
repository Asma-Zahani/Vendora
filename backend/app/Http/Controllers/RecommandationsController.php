<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class RecommandationsController extends Controller
{
    public function getRecommandations(Request $request)
    {
        try {
            // Requête à l'API Flask
            $response = Http::post('http://127.0.0.1:5000/recommander-produits',
                $request->has('user_id') ? ['user_id' => $request->input('user_id')] : []
            );

            if ($response->failed()) {
                return response()->json([
                    'error' => 'Échec de la récupération des recommandations'
                ], 500);
            }

            $productIds = $response->json();

            // Exemple d’obtention des produits depuis leur ID (si tu as un modèle Produit)
            // $produits = Produit::whereIn('id', $productIds)->get();

            return response()->json([
                'produits_recommandes' => $productIds
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Une erreur est survenue',
                'details' => $e->getMessage()
            ], 500);
        }
    }
}