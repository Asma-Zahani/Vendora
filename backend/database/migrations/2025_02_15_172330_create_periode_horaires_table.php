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
            $table->foreignId('horaire_id')->constrained('horaires', 'horaire_id')->onDelete('cascade');
            $table->foreignId('periode_id')->constrained('periodes', 'periode_id')->onDelete('cascade');
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
