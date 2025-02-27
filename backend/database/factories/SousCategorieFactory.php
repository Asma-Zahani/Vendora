<?php

namespace Database\Factories;

use App\Models\SousCategorie;
use App\Models\Categorie;
use Illuminate\Database\Eloquent\Factories\Factory;

class SousCategorieFactory extends Factory
{
    protected $model = SousCategorie::class;

    public function definition()
    {
        return [
            'categorie_id' => Categorie::factory(), // Utilise une catégorie existante ou crée une nouvelle avec la factory Categorie
            'titre' => $this->faker->word() . ' Sous-Categorie', // Nom aléatoire de la sous-catégorie
            'image' => $this->faker->imageUrl(640, 480, 'products'), // URL d'image aléatoire
        ];
    }
}
