<?php

namespace Database\Factories;

use App\Models\CommandeRetraitDrive;
use App\Models\Drive;
use App\Models\Commande;
use App\Models\Produit;
use App\Models\User;
use App\Models\CodePromotion;
use App\Models\FactureCommande;
use App\Models\DetailFacture;
use App\Enums\EtatCommandeEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CommandeRetraitDrive>
 */
class CommandeRetraitDriveFactory extends Factory
{
    protected $model = CommandeRetraitDrive::class;

    public function definition(): array
    {
        $client = User::inRandomOrder()->where('role', '!=', 'admin')->first();

        $produits = Produit::inRandomOrder()->take(rand(1, 4))->get();

        $produitsAvecQuantite = $produits->map(function ($produit) {
            $quantite = rand(1, 3);
            $produit->quantite_selectionnee = $quantite;
            return $produit;
        });

        $total = $produitsAvecQuantite->sum(function ($produit) {
            return $produit->prix_apres_promo * $produit->quantite_selectionnee;
        });

        $codePromo = rand(0, 1) ? CodePromotion::inRandomOrder()->first() : null;
        $reductionPourcentage = $codePromo?->reduction ?? 0;
        $remise = $reductionPourcentage > 0 ? ($total * $reductionPourcentage) / 100 : 0;

        $commande = Commande::create([
            'client_id' => $client->id,
            'code_promotion_id' => $codePromo?->code_promotion_id,
            'total' => $total,
            'etatCommande' => EtatCommandeEnum::EnAttente->value,
        ]);

        $drive = Drive::inRandomOrder()->first();
        $dateRetrait = $this->faker->optional()->dateTimeBetween('now', '+1 month');
        $commandeLivraison = CommandeRetraitDrive::create([
            'commande_id' => $commande->commande_id,
            'drive_id' => $drive ? $drive->drive_id : null,
            'dateRetrait' => $dateRetrait ? $dateRetrait->format('Y-m-d') : null,
        ]);

        $facture = FactureCommande::create([
            'totalTTC' => $total,
            'remise' => $remise,
            'commande_id' => $commande->commande_id,
        ]);

        foreach ($produitsAvecQuantite as $produit) {
            DetailFacture::create([
                'facture_id' => $facture->facture_id,
                'produit_id' => $produit->produit_id,
                'quantite' => $produit->quantite_selectionnee,
                'couleur' => $this->faker->optional()->safeColorName(),
                'prixUnitaireTTC' => $produit->prix_apres_promo,
                'remise' => $produit->promotion?->reduction ?? 0,
            ]);
        }

        return $commandeLivraison->toArray();
    }
}
