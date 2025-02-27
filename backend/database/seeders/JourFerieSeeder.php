<?php

namespace Database\Seeders;

use App\Models\JourFerie;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JourFerieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        JourFerie::factory(20)->create();
    }
}
