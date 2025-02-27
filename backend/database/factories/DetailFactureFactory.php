<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\DetailFacture;
use App\Models\FactureCommande;
use App\Models\FactureFournisseur;

class DetailFactureFactory extends Factory
{
    protected $model = DetailFacture::class;

    public function definition(): array
    {
        $prixUnitaire = $this->faker->randomFloat(2, 1, 500);
        $quantite = $this->faker->numberBetween(1, 10);
        $totalHT = $prixUnitaire * $quantite;
        $tva = $totalHT * 0.2; // TVA de 20%
        $totalTTC = $totalHT + $tva;

        // Sélection aléatoire du type de facture
        $factureType = $this->faker->randomElement(['commande', 'fournisseur']);

        return [
            'facture_id' => $factureType === 'commande'
                ? FactureCommande::factory()
                : FactureFournisseur::factory(),
            'quantite' => $quantite,
            'prix_unitaire' => $prixUnitaire,
            'totalLigneHT' => $totalHT,
            'totalLigneTTC' => $totalTTC,
            'tvaLigne' => $tva,
        ];
    }
}
