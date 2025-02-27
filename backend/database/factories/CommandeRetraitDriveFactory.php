<?php

namespace Database\Factories;

use App\Models\CommandeRetraitDrive;
use App\Models\Panier;
use App\Models\CodePromotion;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Enums\EtatCommandeEnum;
use App\Enums\ModeLivraisonEnum;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CommandeRetraitDrive>
 */
class CommandeRetraitDriveFactory extends Factory
{
    protected $model = CommandeRetraitDrive::class;

    public function definition(): array
    {
        return [
            'panier_id' => Panier::factory(),
            'code_promotion_id' => rand(0, 1) ? CodePromotion::factory() : null,
            'total' => $this->faker->randomFloat(2, 10, 500),
            'etatCommande' => $this->faker->randomElement(EtatCommandeEnum::values()),
            'horaireRetrait' => $this->faker->optional()->time('H:i'),
            'modeLivraison' => ModeLivraisonEnum::CommandeRetraitDrive->value,
        ];
    }
}
