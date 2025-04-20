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
        Schema::create('commandes_livraisons', function (Blueprint $table) {
            $table->foreignId('commande_id')->constrained('commandes', 'commande_id')->onDelete('cascade');
            $table->foreignId('livreur_id')->nullable()->constrained('users', 'id')->onDelete('cascade');
            $table->date('dateLivraison')->nullable();
            $table->string('adresse_livraison')->nullable();
            $table->string('region_livraison')->nullable();
            $table->string('ville_livraison')->nullable();
            $table->timestamps();
        }); 
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commandes_livraisons');
    }
};
