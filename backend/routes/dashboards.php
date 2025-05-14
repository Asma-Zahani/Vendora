<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DashboardLivreurController;
use App\Http\Controllers\EnumsController;
use Illuminate\Support\Facades\Route;

Route::get('/etatCommandes', [EnumsController::class, 'getEtatCommandes']);
Route::get('/statusDrives', [EnumsController::class, 'getStatusDrives']);
Route::get('/statusProduits', [EnumsController::class, 'getStatusProduits']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/genreCount', [DashboardController::class, 'genreCount']);
    Route::get('/ageCount', [DashboardController::class, 'ageCount']);
    Route::get('/listAnnee', [DashboardController::class, 'listAnnee']);
    Route::get('/statistiquesVentes/{annee}', [DashboardController::class, 'statistiquesVentes']);
    Route::get('/statistiquesCommandes/{annee}', [DashboardController::class, 'statistiquesCommandes']);
    Route::get('/commandesEnAttente', [DashboardController::class, 'commandesEnAttente']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/commandesLivreurJour', [DashboardLivreurController::class, 'commandesLivreurJour']);
    Route::get('/livraisonsEffectuees', [DashboardLivreurController::class, 'livraisonsEffectuees']);
    Route::get('/livraisonsEnCours', [DashboardLivreurController::class, 'livraisonsEnCours']);
    Route::get('/livraisonsAnnulees', [DashboardLivreurController::class, 'livraisonsAnnulees']);
    Route::get('/livraisonsParEtat', [DashboardLivreurController::class, 'livraisonsParEtat']);
});