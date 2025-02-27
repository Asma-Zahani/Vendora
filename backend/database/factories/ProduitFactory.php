<?php

namespace Database\Factories;

use App\Models\Produit;
use App\Models\Marque;
use App\Models\SousCategorie;
use App\Models\Promotion;
use App\Models\Couleur;
use App\Enums\StatusProduitEnum;
use Database\Factories\Users\FournisseurFactory;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProduitFactory extends Factory
{
    protected $model = Produit::class;

    public function definition()
    {
        return [
            'marque_id' => Marque::factory(),
            'sous_categorie_id' => SousCategorie::factory(),
            'promotion_id' => Promotion::factory(),
            'fournisseur_id' => FournisseurFactory::new()->create()->id,
            'nom' => $this->faker->word(),
            'status' => $this->faker->randomElement(StatusProduitEnum::values()),
            'description' => $this->faker->sentence(),
            'prix' => $this->faker->randomFloat(2, 10, 1000),
            'image' => $this->faker->imageUrl(),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Produit $produit) {
            $couleurs = Couleur::inRandomOrder()->limit(rand(1, 3))->get();
            
            $couleursToAttach = $couleurs->mapWithKeys(function ($couleur) {
                return [
                    $couleur->couleur_id => ['quantite' => rand(1, 20)]
                ];
            });

            $produit->couleurs()->attach($couleursToAttach);
        });
    }
}
