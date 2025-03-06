<?php

namespace Database\Seeders;

use App\Models\CommandeLivraison;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CommandeLivraisonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CommandeLivraison::factory(5)->create();
    }
}
