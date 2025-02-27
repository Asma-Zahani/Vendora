<?php

namespace Database\Seeders;

use App\Models\FactureFournisseur;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FactureFournisseurSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        FactureFournisseur::factory(20)->create();
    }
}
