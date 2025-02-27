<?php

namespace Database\Seeders\Users;

use App\Models\Users\Client;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Client::factory()->count(10)->create();
    }
}
