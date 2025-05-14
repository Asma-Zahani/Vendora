<?php

use App\Http\Controllers\CommandeController;
use App\Http\Controllers\CommandeLivraisonController;
use App\Http\Controllers\CommandeRetraitDriveController;
use App\Http\Controllers\InteractionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserPreferencesController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::get('/user', function (Request $request) {
    return $request->user()->load('produits.couleurs', 'wishlist.couleurs', 'preferences');
})->middleware('auth:sanctum');

Route::apiResource('userPreferences', UserPreferencesController::class); 
Route::apiResource('users', UserController::class);

Route::apiResource('interactions', InteractionController::class);
Route::middleware('auth:sanctum')->get('derniersProduitsVus', [InteractionController::class, 'derniersProduitsVus']);

Route::get('clients', [UserController::class, 'clients']);
Route::get('livreurs', [UserController::class, 'livreurs']);
Route::get('responsables', [UserController::class, 'responsables']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('panier', [UserController::class, 'ajouterAuPanier']);
    Route::post('souhait', [UserController::class, 'ajouterAListeDeSouhaits']);
    Route::delete('supprimerDuPanier', [UserController::class, 'supprimerDuPanier']);
    Route::delete('souhait/{user_id}/{produit_id}', [UserController::class, 'supprimerDeListeSouhaits']);
});

Route::get('commande/user', [CommandeController::class, 'userCommande'])->middleware('auth:sanctum');
Route::post('trackCommande', [CommandeController::class, 'trackCommande']);
Route::apiResource('commandeLivraisons', CommandeLivraisonController::class);
Route::apiResource('commandeRetraitDrives', CommandeRetraitDriveController::class);