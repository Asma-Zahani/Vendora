<?php

namespace Database\Seeders;

use Database\Factories\LivreurFactory;
use Illuminate\Database\Seeder;

class LivreurSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        LivreurFactory::new()->count(5)->create();
    }
}
