<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\DetailFacture;
use App\Models\FactureCommande;

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

        return [
            'facture_id' => FactureCommande::factory(),
            'quantite' => $quantite,
            'prix_unitaire' => $prixUnitaire,
            'totalLigneHT' => $totalHT,
            'totalLigneTTC' => $totalTTC,
            'tvaLigne' => $tva,
        ];
    }
}
