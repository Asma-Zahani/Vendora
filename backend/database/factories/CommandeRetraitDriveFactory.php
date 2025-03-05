<?php

namespace Database\Factories;

use App\Models\CommandeRetraitDrive;
use App\Models\Panier;
use App\Models\CodePromotion;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Enums\EtatCommandeEnum;
use App\Enums\ModeLivraisonEnum;
use App\Models\Commande;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CommandeRetraitDrive>
 */
class CommandeRetraitDriveFactory extends Factory
{
    protected $model = CommandeRetraitDrive::class;

    public function definition(): array
    {
        $commande = Commande::factory()->create();
        
        return [
            'commande_id' => $commande->commande_id,
            'horaireRetrait' => $this->faker->optional()->time('H:i'),
        ];   
    }
}
