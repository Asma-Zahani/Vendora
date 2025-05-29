<?php

use App\Http\Controllers\CommandeController;
use App\Http\Controllers\CommandeLivraisonController;
use App\Http\Controllers\CommandeRetraitDriveController;
use App\Http\Controllers\InteractionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserPreferencesController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::get('user', [UserController::class, 'getUserData'])->middleware('auth:sanctum');

Route::apiResource('userPreferences', UserPreferencesController::class); 
Route::apiResource('users', UserController::class);

Route::apiResource('interactions', InteractionController::class);
Route::middleware('auth:sanctum')->get('derniersProduitsVus', [InteractionController::class, 'derniersProduitsVus']);

Route::get('clients', [UserController::class, 'clients']);
Route::get('driveClients', [UserController::class, 'clientDrive']);
Route::get('livreurClients', [UserController::class, 'clientLivreur']);
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
Route::get('commandeLivreurs', [CommandeLivraisonController::class, 'commandeParLivreur']);
Route::get('commandeLivreurs/{id}', [CommandeLivraisonController::class, 'show']);
Route::put('commandeLivreurs/{id}', [CommandeLivraisonController::class, 'update']);
Route::get('commandeDrives', [CommandeRetraitDriveController::class, 'commandeParDrive']);
Route::get('commandeDrives/{id}', [CommandeRetraitDriveController::class, 'show']);
Route::put('commandeDrives/{id}', [CommandeRetraitDriveController::class, 'update']);
Route::apiResource('commandeRetraitDrives', CommandeRetraitDriveController::class);

Route::get('commandeDrive/{id}', [CommandeController::class, 'commandeDrive'])->middleware('auth:sanctum');
Route::get('commandeLivraison/{id}', [CommandeController::class, 'commandeLivraison'])->middleware('auth:sanctum');