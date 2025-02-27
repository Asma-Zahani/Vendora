<?php

namespace Database\Seeders\Users;

use App\Models\Users\User;
use Database\Factories\Users\FournisseurFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FournisseurSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        FournisseurFactory::new()->count(5)->create();
    }
}
