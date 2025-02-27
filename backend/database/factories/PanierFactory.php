<?php

namespace Database\Factories;

use App\Models\Panier;
use App\Models\Produit;
use App\Models\Users\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

class PanierFactory extends Factory
{
    protected $model = Panier::class;

    public function definition()
    {
        return [
            'client_id' => Client::factory()->state(['role' => 'client']),
        ];
    }

    /**
     * Ajoute des produits au panier.
     *
     * @param  int  $count
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function withProduits($count = 3)
    {
        return $this->afterCreating(function (Panier $panier) use ($count) {
            $produits = Produit::inRandomOrder()->limit($count)->get();

            $panier->produits()->attach(
                $produits->pluck('produit_id')->toArray(),
                ['quantite' => rand(1, 5)]
            );
        });
    }
}
