<?php

namespace Database\Seeders;

use App\Models\CommandeRetraitDrive;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CommandeRetraitDriveSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CommandeRetraitDrive::factory(5)->create();
    }
}
