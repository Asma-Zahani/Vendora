<?php

use App\Http\Controllers\Users\AdminController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\Users\ClientController;
use App\Http\Controllers\CodePromotionController;
use App\Http\Controllers\CommandeLivraisonController;
use App\Http\Controllers\CommandeRetraitDriveController;
use App\Http\Controllers\JourFerieController;
use App\Http\Controllers\HoraireController;
use App\Http\Controllers\DetailFactureController;
use App\Http\Controllers\FactureCommandeController;
use App\Http\Controllers\Users\LivreurController;
use App\Http\Controllers\MarqueController;
use App\Http\Controllers\PanierController;
use App\Http\Controllers\PeriodeHoraireController;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\PromotionController;
use App\Http\Controllers\SousCategorieController;
use App\Http\Controllers\CouleurController;
use App\Http\Controllers\DriveController;
use App\Http\Controllers\Enums\EtatCommandeController;
use App\Http\Controllers\Enums\StatusDriveController;
use App\Http\Controllers\Enums\StatusProduitController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Users\Client;

Route::get('/user', function (Request $request) {
    $client = Client::where('id', $request->user()->id)->where('role', 'client')->first();

    if ($client) {
        // Charger les relations 'produits', 'wishlist', 'commandes'
        $client = $client->load('produits', 'wishlist', 'commandes');

        // Charger la relation conditionnelle 'commandeLivraison' ou 'commandeRetraitDrive'
        $client->commandes->each(function ($commande) {
            if ($commande->type === 'livraison') {
                $commande->load('commandeLivraison');
            } elseif ($commande->type === 'retraitDrive') {
                $commande->load('commandeRetraitDrive');
            }
        });

        return $client;
    }

    return $request->user();
})->middleware('auth:sanctum');


Route::middleware('auth:sanctum')->group(function () {
    Route::post('panier', [ClientController::class, 'ajouterAuPanier']);
    Route::post('souhait', [ClientController::class, 'ajouterAListeDeSouhait']);
    Route::delete('panier', [ClientController::class, 'supprimerDuPanier']);
    Route::delete('souhait', [ClientController::class, 'supprimerDeListeSouhaits']);
});

Route::apiResource('codePromotions', CodePromotionController::class); //tester
Route::get('codePromotions/code/{code}', [CodePromotionController::class, 'getPromoByName']);

Route::apiResource('categories', CategorieController::class); //tester
Route::apiResource('PeriodesHoraires', PeriodeHoraireController::class); //tester
Route::apiResource('joursFeries', JourFerieController::class); //tester
Route::apiResource('marques', MarqueController::class); //tester
Route::apiResource('promotions', PromotionController::class); //tester

Route::apiResource('horaires', HoraireController::class); //tester
Route::apiResource('sousCategories', SousCategorieController::class); //tester
Route::apiResource('detailFactures', DetailFactureController::class); //tester

Route::apiResource('factureCommandes', FactureCommandeController::class); //tester

Route::apiResource('produits', ProduitController::class); //tester
Route::apiResource('paniers', PanierController::class); //tester

Route::apiResource('commandeLivraisons', CommandeLivraisonController::class); //tester
Route::apiResource('commandeRetraitDrives', CommandeRetraitDriveController::class); //tester

Route::apiResource('admins', AdminController::class);
Route::apiResource('clients', ClientController::class);
Route::apiResource('livreurs', LivreurController::class);
Route::apiResource('couleurs', CouleurController::class);

Route::apiResource('drives', DriveController::class);

Route::get('/etatCommandes', [EtatCommandeController::class, 'getEtatCommandes']);
Route::get('/statusDrives', [StatusDriveController::class, 'getStatusDrives']);
Route::get('/statusProduits', [StatusProduitController::class, 'getStatusProduits']);

require __DIR__.'/auth.php';