<?php

namespace Database\Factories;

use Database\Factories\Users\FournisseurFactory;
use Illuminate\Database\Eloquent\Factories\Factory;

class FactureFournisseurFactory extends Factory
{
    public function definition()
    {
        return [
            'fournisseur_id' => FournisseurFactory::new()->create()->id,
            'date' => $this->faker->date(),
            'tva' => $this->faker->randomFloat(2, 0, 20),
            'totalHT' => $this->faker->randomFloat(2, 10, 1000),
            'totalTTC' => function (array $attributes) {
                return $attributes['totalHT'] * (1 + ($attributes['tva'] / 100));
            },
            'dtype' => 'facture_fournisseurs',
        ];
    }
}
