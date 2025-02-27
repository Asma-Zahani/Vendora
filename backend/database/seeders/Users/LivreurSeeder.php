<?php

namespace Database\Seeders\Users;

use Database\Factories\Users\LivreurFactory;
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
