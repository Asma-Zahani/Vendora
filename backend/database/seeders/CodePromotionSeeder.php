<?php

namespace Database\Seeders;

use App\Models\CodePromotion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CodePromotionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CodePromotion::factory(10)->create();
    }
}
