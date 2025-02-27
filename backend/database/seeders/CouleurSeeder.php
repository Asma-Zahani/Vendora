<?php

namespace Database\Seeders;

use App\Models\Couleur;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CouleurSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Couleur::factory(20)->create();
    }
}
