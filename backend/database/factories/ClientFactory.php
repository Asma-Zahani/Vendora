<?php

namespace Database\Factories;

use App\Enums\RoleEnum;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

class ClientFactory extends Factory
{
    protected $model = User::class; 
    
    public function definition(): array
    {
        return [
            'nom' => $this->faker->firstName(),
            'prenom' => $this->faker->lastName(),
            'email' => $this->faker->unique()->safeEmail(),
            'password' => Hash::make('client'),
            'telephone' => $this->faker->phoneNumber(),
            'genre' => $this->faker->randomElement(['male', 'female']),
            'date_naissance' => $this->faker->date(),
            'adresse' => $this->faker->address(),
            'region' => $this->faker->state(),
            'ville' => $this->faker->city(),
            'emploi' => $this->faker->randomElement(["Employé", "Sans emploi", "Retraité", "Indépendant"]),
            'typeLogement' => $this->faker->randomElement(["Appartement", "Maison individuelle", "Hébergement"]),
            'statusLogement' => $this->faker->randomElement(["Propriétaire", "Locataire", "Hébergé à titre gratuit"]),
            'role' => RoleEnum::CLIENT->value,
        ];
    }
}
