<?php

namespace Database\Seeders;

use App\Models\FactureCommande;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FactureCommandeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        FactureCommande::factory(20)->create();
    }
}
