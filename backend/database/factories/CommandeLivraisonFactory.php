<?php

namespace Database\Factories;

use App\Models\CommandeLivraison;
use App\Models\Commande;
use Illuminate\Database\Eloquent\Factories\Factory;
use Database\Factories\LivreurFactory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CommandeLivraison>
 */
class CommandeLivraisonFactory extends Factory
{
    protected $model = CommandeLivraison::class;

    public function definition(): array
    {
        $commande = Commande::factory()->create();

        $dateLivraison = $this->faker->optional()->dateTimeBetween('now', '+1 month');

        return [
            'commande_id' => $commande->commande_id, // Associer la livraison à une commande existante
            'dateLivraison' => $dateLivraison ? $dateLivraison->format('Y-m-d') : null,
            'livreur_id' => rand(0, 1) ? LivreurFactory::new()->create()->id : null,
        ];        
    }
}
