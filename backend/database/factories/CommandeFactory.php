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
        $client = User::inRandomOrder()->where('role', '!=', 'admin')->first();

        return [
            'client_id' => $client ? $client->id : null,
            'code_promotion_id' => rand(0, 1) ? CodePromotion::inRandomOrder()->first()->code_promotion_id : null,
            'total' => $this->faker->randomFloat(2, 10, 500),
            'etatCommande' => $this->faker->randomElement(EtatCommandeEnum::values()),
        ];
    }
}
