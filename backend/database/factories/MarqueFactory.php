<?php

namespace Database\Factories;

use App\Models\Marque;
use Illuminate\Database\Eloquent\Factories\Factory;

class MarqueFactory extends Factory
{
    protected $model = Marque::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nom' => $this->faker->company(), // Génère un nom aléatoire d'entreprise
            'image' => $this->faker->imageUrl(), // Génère une URL d'image aléatoire
        ];
    }
}
