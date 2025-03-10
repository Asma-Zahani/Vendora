<?php

namespace Database\Factories;

use App\Models\Commande;
use App\Models\CodePromotion;
use App\Enums\EtatCommandeEnum;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Commande>
 */
class CommandeFactory extends Factory
{
    public function definition(): array
    {
        $client = User::inRandomOrder()->first();

        return [
            'client_id' => $client ? $client->id : null, // Génère un client aléatoire
            'code_promotion_id' => rand(0, 1) ? CodePromotion::factory() : null, // 50% de chance d'avoir un code promo
            'total' => $this->faker->randomFloat(2, 10, 500), // Prix total entre 10 et 500
            'etatCommande' => $this->faker->randomElement(EtatCommandeEnum::values()), // État de la commande aléatoire
        ];
    }
}
