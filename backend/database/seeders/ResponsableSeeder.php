<?php

namespace Database\Seeders;

use App\Models\UserPreference;
use Database\Factories\ResponsableFactory;
use Illuminate\Database\Seeder;

class ResponsableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ResponsableFactory::new()->count(5)->create()->each(function ($user) {
            UserPreference::factory()->create([
                'user_id' => $user->id,
            ]);
        });
    }
}
