<?php

namespace Database\Factories;

use App\Enums\RoleEnum;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Factories\Factory;

class LivreurFactory extends Factory
{
    protected $model = User::class; 
    
    public function definition(): array
    {
        return [
            'nom' => $this->faker->firstName(),
            'prenom' => $this->faker->lastName(),
            'email' => $this->faker->unique()->safeEmail(),
            'password' => Hash::make('livreur'),
            'telephone' => $this->faker->phoneNumber(),
            'genre' => $this->faker->randomElement(['Male', 'Femelle']),
            'date_naissance' => $this->faker->date(),
            'adresse' => $this->faker->address(),
            'region' => $this->faker->state(),
            'ville' => $this->faker->city(),
            'role' => RoleEnum::LIVREUR->value,
        ];
    }
}
