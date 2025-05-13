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
            CouleurSeeder::class,
            CategorieSeeder::class,
            SousCategorieSeeder::class,
            MarqueSeeder::class,
            PromotionSeeder::class,
            CodePromotionSeeder::class,
            ProduitSeeder::class,

            LivreurSeeder::class,
            ResponsableSeeder::class,
            ClientSeeder::class,

            DriveSeeder::class,
            // JourFerieSeeder::class,
            HoraireSeeder::class,

            CommandeLivraisonSeeder::class,
            CommandeRetraitDriveSeeder::class,
            
            InteractionSeeder::class
        ]);
    }
}
