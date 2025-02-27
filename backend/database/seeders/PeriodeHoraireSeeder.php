<?php

namespace Database\Seeders;

use App\Models\PeriodeHoraire;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PeriodeHoraireSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PeriodeHoraire::factory(5)->withHoraires()->create();
    }
}
