<?php

namespace Database\Seeders;

use App\Models\CodePromotion;
use Database\Seeders\ClientSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            LivreurSeeder::class,
            CouleurSeeder::class,
            CategorieSeeder::class,
            SousCategorieSeeder::class,
            MarqueSeeder::class,
            PromotionSeeder::class,
            ProduitSeeder::class,
            DriveSeeder::class,
            ClientSeeder::class,
            CodePromotionSeeder::class,
            CommandeLivraisonSeeder::class,
            CommandeRetraitDriveSeeder::class,
            InteractionSeeder::class
        ]);
    }
}
