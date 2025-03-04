<?php

namespace Database\Factories;

use App\Models\Commande;
use App\Models\CodePromotion;
use App\Enums\EtatCommandeEnum;
use App\Models\Users\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Commande>
 */
class CommandeFactory extends Factory
{
    protected $model = Commande::class;

    public function definition(): array
    {
        return [
            'client_id' => Client::factory(), // Génère un client aléatoire
            'code_promotion_id' => rand(0, 1) ? CodePromotion::factory() : null, // 50% de chance d'avoir un code promo
            'total' => $this->faker->randomFloat(2, 10, 500), // Prix total entre 10 et 500
            'etatCommande' => $this->faker->randomElement(EtatCommandeEnum::values()), // État de la commande aléatoire
        ];
    }
}
