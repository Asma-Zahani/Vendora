<?php

namespace Database\Factories;

use App\Models\JourFerie;
use Illuminate\Database\Eloquent\Factories\Factory;

class JourFerieFactory extends Factory
{
    protected $model = JourFerie::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $startDate = $this->faker->dateTimeBetween('-1 year', '+1 year'); // Date aléatoire
        $endDate = (clone $startDate)->modify('+' . rand(0, 3) . ' days'); // Ajout de 0 à 3 jours max

        return [
            'title' => $this->faker->word(),
            'start' => $startDate->format('Y-m-d'),
            'end' => $endDate->format('Y-m-d'),
        ];
    }
}
