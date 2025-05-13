<?php

namespace Database\Factories;

use App\Enums\JourEnum;
use App\Enums\StatusDriveEnum;
use App\Models\Drive;
use App\Models\Horaire;
use Illuminate\Database\Eloquent\Factories\Factory;

class DriveFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nom' => $this->faker->firstName(),
            'adresse' => $this->faker->address(),
            'region' => $this->faker->state(),
            'ville' => $this->faker->city(),
            'status' => $this->faker->randomElement(StatusDriveEnum::values()),
            'responsable_id' => rand(0, 1) ? $this->faker->numberBetween(7, 12) : null,
        ];
    }

    // public function configure()
    // {
    //     return $this->afterCreating(function (Drive $drive) {
    //         foreach (JourEnum::values() as $jour) {
    //             Horaire::create([
    //                 'drive_id' => $drive->drive_id,
    //                 'jour' => $jour,
    //                 'ouvert' => $jour !== 'Dimanche' // Fermé le dimanche
    //             ]);
    //         }
    //     });
    // }
}
