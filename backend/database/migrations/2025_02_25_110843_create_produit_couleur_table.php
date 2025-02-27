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
        Schema::create('produit_couleur', function (Blueprint $table) {       
            $table->foreignId('produit_id')->constrained('produits', 'produit_id')->onDelete('cascade');
            $table->foreignId('couleur_id')->constrained('couleurs', 'couleur_id')->onDelete('cascade');
            $table->integer('quantite');
            $table->primary(['produit_id', 'couleur_id']);
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produit_couleur');
    }
};
