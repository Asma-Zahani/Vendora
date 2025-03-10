<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Factories\ClientFactory;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ClientFactory::new()->count(5)->create();
    }
}
