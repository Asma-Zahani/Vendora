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
        Schema::create('horaire_periode_horaire', function (Blueprint $table) {
            $table->foreignId('horaire_id')->constrained('horaires', 'horaire_id')->onDelete('cascade');
            $table->foreignId('periode_horaire_id')->constrained('periode_horaires', 'periode_horaire_id')->onDelete('cascade');
            $table->primary(['horaire_id', 'periode_horaire_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('horaire_periode_horaire');
    }
};
