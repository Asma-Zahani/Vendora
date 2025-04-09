<?php

namespace Database\Factories;

use App\Models\Interaction;
use App\Models\Produit;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Interaction>
 */
class InteractionFactory extends Factory
{
    protected $model = Interaction::class;

    public function definition(): array
    {
        // Choisir un type d'interaction au hasard
        $type = $this->faker->randomElement(['achat', 'vue', 'panier']);

        // On tente de générer une combinaison unique
        $produit = Produit::inRandomOrder()->first();
        $user = User::inRandomOrder()->first();

        // Vérification que cette combinaison n'existe pas déjà
        while (
            Interaction::where('user_id', $user->id)
                ->where('produit_id', $produit->produit_id)
                ->where('interaction_type', $type)
                ->exists()
        ) {
            $type = $this->faker->randomElement(['achat', 'vue', 'panier']);
            $produit = Produit::inRandomOrder()->first();
            $user = User::inRandomOrder()->first();
        }

        return [
            'user_id' => $user->id,
            'produit_id' => $produit->produit_id,
            'interaction_type' => $type,
        ];
    }
}