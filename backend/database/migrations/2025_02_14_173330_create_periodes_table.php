<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('periodes', function (Blueprint $table) {
            $table->id('periode_id');
            $table->time('heureDebut');
            $table->time('heureFin');
            $table->unique(['heureDebut', 'heureFin']);
        });

        DB::table('periodes')->insert([
            'heureDebut' => "08:00",
            'heureFin' => "12:00"
        ]);

        DB::table('periodes')->insert([
            'heureDebut' => "14:00",
            'heureFin' => "18:00"
        ]);

        DB::table('periodes')->insert([
            'heureDebut' => "08:30",
            'heureFin' => "18:00"
        ]);

        DB::table('periodes')->insert([
            'heureDebut' => "09:00",
            'heureFin' => "13:00"
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('periodes');
    }
};
