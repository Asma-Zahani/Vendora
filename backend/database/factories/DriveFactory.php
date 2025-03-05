<?php

namespace Database\Factories;

use App\Enums\StatusDriveEnum;
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
        ];
    }
}
