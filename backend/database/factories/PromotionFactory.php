<?php

namespace Database\Factories;

use App\Models\Promotion;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PromotionFactory extends Factory
{
    protected $model = Promotion::class;

    public function definition()
    {
        return [
            'nom' => $this->faker->word() . ' Promo', // Nom de la promotion
            'reduction' => $this->faker->numberBetween(5, 50), // Réduction entre 5 et 50 %
            'dateDebut' => $this->faker->dateTimeThisYear(), // Date de début de la promo dans l'année en cours
            'dateFin' => $this->faker->dateTimeBetween('now', '+1 month'), // Date de fin dans le mois suivant
        ];
    }
}
