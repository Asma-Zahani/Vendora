<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Couleur;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Couleur>
 */
class CouleurFactory extends Factory
{
    protected $model = Couleur::class;

    public function definition(): array
    {
        return [
            'nom' => $this->faker->colorName(), // Nom aléatoire de couleur (ex: "Rouge", "Bleu")
            'code_hex' => $this->faker->hexColor(), // Code HEX aléatoire (ex: "#ff5733")
        ];
    }
}
