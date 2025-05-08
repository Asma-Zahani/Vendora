<?php

use App\Http\Controllers\CategorieController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CodePromotionController;
use App\Http\Controllers\CommandeLivraisonController;
use App\Http\Controllers\CommandeRetraitDriveController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\JourFerieController;
use App\Http\Controllers\HoraireController;
use App\Http\Controllers\DetailFactureController;
use App\Http\Controllers\FactureCommandeController;
use App\Http\Controllers\LivreurController;
use App\Http\Controllers\MarqueController;
use App\Http\Controllers\PeriodeHoraireController;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\PromotionController;
use App\Http\Controllers\SousCategorieController;
use App\Http\Controllers\CouleurController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DriveController;
use App\Http\Controllers\EnumsController;
use App\Http\Controllers\InteractionController;
use App\Http\Controllers\UserPreferencesController;
use App\Http\Controllers\StripePaymentController;
use App\Http\Controllers\DashboardLivreurController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user()->load('produits.couleurs', 'wishlist.couleurs', 'preferences');
})->middleware('auth:sanctum');

Route::get('commande/user', function (Request $request) {
    return $request->user()->commandes()->with('commandeLivraison', 'commandeRetraitDrive.drive', 'facture.detailsFacture')->get();
})->middleware('auth:sanctum');

Route::apiResource('users', UserController::class);

Route::get('clients', [UserController::class, 'clients']);
Route::get('livreurs', [UserController::class, 'livreurs']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('panier', [UserController::class, 'ajouterAuPanier']);
    Route::post('souhait', [UserController::class, 'ajouterAListeDeSouhaits']);
    Route::delete('supprimerDuPanier', [UserController::class, 'supprimerDuPanier']);
    Route::delete('souhait/{user_id}/{produit_id}', [UserController::class, 'supprimerDeListeSouhaits']);
});

Route::apiResource('codePromotions', CodePromotionController::class);
Route::get('codePromotions/code/{code}', [CodePromotionController::class, 'getPromoByName']);

Route::apiResource('categories', CategorieController::class); //tester
Route::apiResource('PeriodesHoraires', PeriodeHoraireController::class); //tester

Route::apiResource('joursFeries', JourFerieController::class); //tester
Route::get('joursFeries/drive/{id}', [JourFerieController::class, 'getJourFerieByDrive']);

Route::apiResource('marques', MarqueController::class); //tester
Route::apiResource('promotions', PromotionController::class); //tester

Route::apiResource('horaires', HoraireController::class); //tester
Route::apiResource('sousCategories', SousCategorieController::class); //tester
Route::apiResource('detailFactures', DetailFactureController::class); //tester

Route::apiResource('factureCommandes', FactureCommandeController::class); //tester

Route::apiResource('produits', ProduitController::class);
Route::delete('panier/{user_id}/{produit_id}/{couleur}', [ProduitController::class, 'destroy']);
Route::get('/recentProduits', [ProduitController::class, 'latestProducts']);

Route::apiResource('commandeLivraisons', CommandeLivraisonController::class);
Route::apiResource('commandeRetraitDrives', CommandeRetraitDriveController::class);

Route::apiResource('couleurs', CouleurController::class);

Route::apiResource('drives', DriveController::class);

Route::apiResource('interactions', InteractionController::class);
Route::middleware('auth:sanctum')->get('derniersProduitsVus', [InteractionController::class, 'derniersProduitsVus']);
Route::apiResource('userPreferences', UserPreferencesController::class); 

Route::get('/etatCommandes', [EnumsController::class, 'getEtatCommandes']);
Route::get('/statusDrives', [EnumsController::class, 'getStatusDrives']);
Route::get('/statusProduits', [EnumsController::class, 'getStatusProduits']);

Route::post('/create-payment-intent', [StripePaymentController::class, 'createPaymentIntent']);
Route::post('/save-transaction-id', [StripePaymentController::class, 'saveTransactionId']);

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
});

Route::post('/contact', [ContactController::class, 'contact']);

require __DIR__.'/auth.php';