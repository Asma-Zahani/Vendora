<?php

namespace Database\Factories;

use App\Models\CommandeRetraitDrive;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Commande;
use App\Models\Drive;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CommandeRetraitDrive>
 */
class CommandeRetraitDriveFactory extends Factory
{
    protected $model = CommandeRetraitDrive::class;

    public function definition(): array
    {
        $commande = Commande::factory()->create();
        $drive = Drive::inRandomOrder()->first();

        $dateRetrait = $this->faker->optional()->dateTimeBetween('now', '+1 month');

        return [
            'commande_id' => $commande->commande_id,
            'drive_id' => $drive ? $drive->drive_id : null,
            'dateRetrait' => $dateRetrait ? $dateRetrait->format('Y-m-d') : null,
        ];
    }
}
