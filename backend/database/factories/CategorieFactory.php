<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CategorieFactory extends Factory
{
    protected $model = \App\Models\Categorie::class;

    public function definition(): array
    {
        return [
            'titre' => $this->faker->word(),
            'image' => $this->faker->imageUrl(),
            'rang' => $this->faker->numberBetween(1, 100)
        ];
    }
}
