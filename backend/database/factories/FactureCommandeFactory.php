<?php

namespace Database\Factories;

use App\Models\CommandeLivraison;
use App\Models\CommandeRetraitDrive;
use Illuminate\Database\Eloquent\Factories\Factory;

class FactureCommandeFactory extends Factory
{
    public function definition()
    {
        return [
            'commande_id' => $this->faker->boolean(50) 
                ? CommandeLivraison::factory() 
                : CommandeRetraitDrive::factory(),
            'date' => $this->faker->date(),
            'tva' => $this->faker->randomFloat(2, 0, 20),
            'totalHT' => $this->faker->randomFloat(2, 10, 1000),
            'totalTTC' => function (array $attributes) {
                return $attributes['totalHT'] * (1 + ($attributes['tva'] / 100));
            },
            'remise' => $this->faker->randomFloat(2, 0, 50),
            'dtype' => 'facture_commandes', // Fixe le type
        ];
    }
}
