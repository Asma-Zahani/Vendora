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
        Schema::create('commande_produits', function (Blueprint $table) {
            $table->foreignId('commande_id')->constrained('commandes', 'commande_id')->onDelete('cascade');
            $table->foreignId('produit_id')->constrained('produits', 'produit_id')->onDelete('cascade');
            $table->integer('quantite');
            $table->primary(['commande_id', 'produit_id']);
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commande_produits');
    }
};
