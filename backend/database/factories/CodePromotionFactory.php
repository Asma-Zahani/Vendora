<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CodePromotion>
 */
class CodePromotionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $nbUtilisationMax = $this->faker->numberBetween(2, 50);
        $nbUtilisation = $this->faker->numberBetween(1, $nbUtilisationMax - 1);

        return [
            'code' => strtoupper($this->faker->unique()->bothify('PROMO###')),
            'reduction' => $this->faker->randomFloat(2, 0, 99.99),
            'dateExpiration' => $this->faker->dateTimeBetween('now', '+1 year')->format('Y-m-d'),
            'nbUtilisation' => $nbUtilisation,
            'nbUtilisationMax' => $nbUtilisationMax,
        ];
    }

}
