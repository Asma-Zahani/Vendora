<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DashboardLivreurController;
use App\Http\Controllers\DashboardResponsableController;
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
    Route::get('/commandesLivreurEnCours', [DashboardLivreurController::class, 'commandesLivreurEnCours']);
    Route::get('/livraisonsParEtat', [DashboardLivreurController::class, 'livraisonsParEtat']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/retraitDrivesParEtat', [DashboardResponsableController::class, 'retraitDrivesParEtat']);
});