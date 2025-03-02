<?php

namespace Database\Seeders;

use Database\Seeders\Users\AdminSeeder;
use Database\Seeders\Users\ClientSeeder;
use Database\Seeders\Users\FournisseurSeeder;
use Database\Seeders\Users\LivreurSeeder;
use Database\Seeders\Users\UserSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            CategorieSeeder::class,
            CodePromotionSeeder::class,
            CommandeLivraisonSeeder::class,
            CommandeRetraitDriveSeeder::class,
            CouleurSeeder::class,
            DetailFactureSeeder::class,
            FactureCommandeSeeder::class,
            FactureFournisseurSeeder::class,
            //HoraireSeeder::class,
            JourFerieSeeder::class,
            MarqueSeeder::class,
            PeriodeHoraireSeeder::class,
            ProduitSeeder::class,
            PanierSeeder::class,
            PromotionSeeder::class,
            SousCategorieSeeder::class,
            ClientSeeder::class,
            FournisseurSeeder::class,
            LivreurSeeder::class,
            //AdminSeeder::class
        ]);
    }
}
