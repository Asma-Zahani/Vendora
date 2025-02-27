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
        Schema::create('panier_produit', function (Blueprint $table) {
            $table->foreignId('panier_id')->constrained('paniers', 'panier_id')->onDelete('cascade');
            $table->foreignId('produit_id')->constrained('produits', 'produit_id')->onDelete('cascade');
            $table->integer('quantite')->default(1);
            $table->primary(['panier_id', 'produit_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('panier_produit');
    }
};
