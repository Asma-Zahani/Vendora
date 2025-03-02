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
            CouleurSeeder::class,
            ProduitSeeder::class,
            CodePromotionSeeder::class,
            //JourFerieSeeder::class,
            //PanierSeeder::class,
            //CommandeLivraisonSeeder::class,
            //CommandeRetraitDriveSeeder::class,
            //DetailFactureSeeder::class,
            //FactureCommandeSeeder::class,
            //FactureFournisseurSeeder::class,
            //HoraireSeeder::class,
            //CategorieSeeder::class,
            //MarqueSeeder::class,
            //PeriodeHoraireSeeder::class,
            //PromotionSeeder::class,
            //SousCategorieSeeder::class,
            //ClientSeeder::class,
            //FournisseurSeeder::class,
            //LivreurSeeder::class,
            //AdminSeeder::class
        ]);
    }
}
