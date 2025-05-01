<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class RecommandationsController extends Controller
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
}