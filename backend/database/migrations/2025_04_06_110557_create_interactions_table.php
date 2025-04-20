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
        Schema::create('interactions', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained('users', 'id')->onDelete('cascade');
            $table->foreignId('produit_id')->constrained('produits', 'produit_id')->onDelete('cascade');
            $table->integer('vue_produit')->default(0);
            $table->boolean('favori')->default(false);
            $table->integer('ajout_panier')->default(0);
            $table->boolean('achat')->default(false);
            $table->primary(['user_id', 'produit_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('interactions');
    }
};
