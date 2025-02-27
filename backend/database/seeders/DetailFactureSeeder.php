<?php

namespace Database\Seeders;

use App\Models\DetailFacture;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DetailFactureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DetailFacture::factory(20)->create();
    }
}
