<?php

namespace Database\Factories\Users;

use App\Models\Users\Client;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClientFactory extends Factory
{
    protected $model = Client::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nom' => $this->faker->firstName(),
            'prenom' => $this->faker->lastName(),
            'email' => $this->faker->unique()->safeEmail(),
            'password' => Hash::make('client'), // Mot de passe par défaut 'client'
            'telephone' => $this->faker->phoneNumber(),
            'genre' => $this->faker->randomElement(['male', 'female']),
            'date_naissance' => $this->faker->date(),
            'role' => 'client',
            'adresse' => $this->faker->address(),
            'region' => $this->faker->state(),
            'ville' => $this->faker->city(),
            'emploi' => $this->faker->sentence(),
            'typeLogement' => $this->faker->word(),
            'statusLogement' => $this->faker->randomElement(['loué', 'propriétaire', 'colocation']),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
