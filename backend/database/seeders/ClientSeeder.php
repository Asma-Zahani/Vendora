<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserPreference;
use Database\Factories\ClientFactory;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ClientFactory::new()->count(1000)->create()->each(function ($user) {
            UserPreference::factory()->create([
                'user_id' => $user->id,
            ]);
        });

    }
}
