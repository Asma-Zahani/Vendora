<?php

namespace Database\Factories;

use App\Models\CommandeLivraison;
use App\Models\Panier;
use App\Models\CodePromotion;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Enums\EtatCommandeEnum;
use App\Enums\EtatLivraisonEnum;
use App\Enums\ModeLivraisonEnum;
use App\Models\Users\User;
use Database\Factories\Users\LivreurFactory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CommandeLivraison>
 */
class CommandeLivraisonFactory extends Factory
{
    protected $model = CommandeLivraison::class;

    public function definition(): array
    {
        return [
            'panier_id' => Panier::factory(),
            'code_promotion_id' => rand(0, 1) ? CodePromotion::factory() : null,
            'total' => $this->faker->randomFloat(2, 10, 500),
            'etatCommande' => $this->faker->randomElement(EtatCommandeEnum::values()),
            'dateLivraison' => optional($this->faker->dateTimeBetween('now', '+1 month'))->format('Y-m-d'),
            'etatLivraison' => $this->faker->randomElement(EtatLivraisonEnum::values()),
            'livreur_id' => rand(0, 1) ? LivreurFactory::new()->create()->id : null,
            'modeLivraison' => ModeLivraisonEnum::CommandeLivraison->value,
        ];        
    }
}
