<?php

use App\Http\Controllers\CategorieController;
use App\Http\Controllers\CodePromotionController;
use App\Http\Controllers\CommandeLivraisonController;
use App\Http\Controllers\CommandeRetraitDriveController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\JourFerieController;
use App\Http\Controllers\HoraireController;
use App\Http\Controllers\DetailFactureController;
use App\Http\Controllers\FactureCommandeController;
use App\Http\Controllers\MarqueController;
use App\Http\Controllers\PeriodeController;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\PromotionController;
use App\Http\Controllers\SousCategorieController;
use App\Http\Controllers\CouleurController;
use App\Http\Controllers\DriveController;
use App\Http\Controllers\InteractionController;
use App\Http\Controllers\UserPreferencesController;
use App\Http\Controllers\StripePaymentController;
use Illuminate\Support\Facades\Route;

Route::apiResource('periodes', PeriodeController::class);
Route::apiResource('joursFeries', JourFerieController::class);
Route::get('joursFeries/drive/{id}', [JourFerieController::class, 'getJourFerieByDrive']);
Route::put('horaires/{id}', [HoraireController::class, 'update'])->middleware('auth:sanctum');

Route::apiResource('couleurs', CouleurController::class);
Route::apiResource('categories', CategorieController::class);
Route::apiResource('sousCategories', SousCategorieController::class);
Route::apiResource('marques', MarqueController::class);

Route::apiResource('promotions', PromotionController::class);
Route::apiResource('codePromotions', CodePromotionController::class);
Route::get('codePromotions/code/{code}', [CodePromotionController::class, 'getPromoByName']);

Route::apiResource('factureCommandes', FactureCommandeController::class); 
Route::apiResource('detailFactures', DetailFactureController::class);

Route::apiResource('produits', ProduitController::class);
Route::post('/recommendations', [ProduitController::class, 'recommander']);
Route::get('/recentProduits', [ProduitController::class, 'recentProduits']);

Route::apiResource('drives', DriveController::class);
Route::post('/contact', [ContactController::class, 'contact']);

Route::post('/create-payment-intent', [StripePaymentController::class, 'createPaymentIntent']);
Route::post('/save-transaction-id', [StripePaymentController::class, 'saveTransactionId']);

require __DIR__.'/auth.php';
require __DIR__.'/dashboards.php';
require __DIR__.'/usersEtCommandes.php';