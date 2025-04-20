<?php

namespace Database\Factories;

use App\Models\Interaction;
use App\Models\Produit;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class InteractionFactory extends Factory
{
    protected $model = Interaction::class;

    public function definition(): array
    {
        $produit = Produit::inRandomOrder()->first();
        $user = User::inRandomOrder()->first();

        // S'assurer qu'on ne duplique pas une interaction déjà existante
        while (
            Interaction::where('user_id', $user->id)
                ->where('produit_id', $produit->produit_id)
                ->exists()
        ) {
            $produit = Produit::inRandomOrder()->first();
            $user = User::inRandomOrder()->first();
        }

        return [
            'user_id' => $user->id,
            'produit_id' => $produit->produit_id,
            'vue_produit' => $this->faker->numberBetween(0, 20),
            'favori' => $this->faker->boolean(50),
            'ajout_panier' => $this->faker->numberBetween(0, 5),
            'achat' => $this->faker->boolean(30),
        ];
    }
}