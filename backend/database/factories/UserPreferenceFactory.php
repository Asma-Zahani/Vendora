<?php

namespace Database\Factories;

use App\Models\Categorie;
use App\Models\Marque;
use App\Models\UserPreference;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserPreferences>
 */
class UserPreferenceFactory extends Factory
{
    protected $model = UserPreference::class;

    public function definition(): array
    {
        $marqueIds = Marque::inRandomOrder()->limit(5)->pluck('marque_id')->toArray();
        $categorieIds = Categorie::inRandomOrder()->limit(5)->pluck('categorie_id')->toArray();

        return [
            'preferred_categorie_ids' => $categorieIds,
            'preferred_marque_ids' => $marqueIds,
        ];
    }
}
