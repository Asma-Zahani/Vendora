<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('periode_horaires', function (Blueprint $table) {
            $table->id('periode_horaire_id');
            $table->foreignId('horaire_id')->constrained('horaires', 'horaire_id')->onDelete('cascade');
            $table->time('heure_debut');
            $table->time('heure_fin');
            $table->unique(['horaire_id','heure_debut', 'heure_fin']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('periode_horaires');
    }
};
