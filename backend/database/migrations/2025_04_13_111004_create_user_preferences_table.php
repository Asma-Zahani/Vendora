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
        Schema::create('user_preferences', function (Blueprint $table) {
            $table->id('preference_id');
            $table->foreignId('user_id')->unique()->constrained('users', 'id')->onDelete('cascade');
            $table->json('preferred_categorie_ids')->nullable();
            $table->json('preferred_marque_ids')->nullable();
        });

        DB::table('user_preferences')->insert([
            'user_id' => 1,
            'preferred_categorie_ids' => json_encode([]),
            'preferred_marque_ids' => json_encode([])
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_preferences');
    }
};
