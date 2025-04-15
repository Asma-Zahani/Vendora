<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use App\Models\Commande;

class StripePaymentController extends Controller
{

    public function createPaymentIntent(Request $request)
{
    Stripe::setApiKey(env('STRIPE_SECRET'));

    $amount = intval($request->amount * 100);
    $paymentIntent = \Stripe\PaymentIntent::create([
        'amount' => $amount, 
        'currency' => 'eur',
        'metadata' => [
            'user_id' => $request->user_id,
        ],
    ]);    

    return response()->json([
        'clientSecret' => $paymentIntent->client_secret,
    ]);
}

// Méthode pour enregistrer le transaction_id dans la commande
public function saveTransactionId(Request $request)
{
    // Valider les données de la requête
    $validatedData = $request->validate([
        'transaction_id' => 'required|string',
        'user_id' => 'required|exists:users,id', // Assurer que l'utilisateur existe
    ]);

    // Trouver la dernière commande de l'utilisateur
    $commande = Commande::where('client_id', $validatedData['user_id'])->latest()->first();

    // Si une commande existe, mettre à jour avec le transaction_id
    if ($commande) {
        $commande->transaction_id = $validatedData['transaction_id'];
        $commande->save();

        return response()->json(['message' => 'Transaction ID enregistré avec succès']);
    }

    return response()->json(['error' => 'Commande non trouvée'], 404);
}

}
