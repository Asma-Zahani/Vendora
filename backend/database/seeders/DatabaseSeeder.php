<?php

namespace Database\Seeders;

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
            ProduitSeeder::class,
            CodePromotionSeeder::class,
            DriveSeeder::class,
            ClientSeeder::class,
            //JourFerieSeeder::class,
            //PanierSeeder::class,
            CommandeLivraisonSeeder::class,
            CommandeRetraitDriveSeeder::class,
            //DetailFactureSeeder::class,
            //FactureCommandeSeeder::class,
            //FactureFournisseurSeeder::class,
            //HoraireSeeder::class,
            //CategorieSeeder::class,
            //MarqueSeeder::class,
            //PeriodeHoraireSeeder::class,
            //PromotionSeeder::class,
            //SousCategorieSeeder::class,
            //FournisseurSeeder::class,
            //LivreurSeeder::class,
            //AdminSeeder::class
        ]);
    }
}
