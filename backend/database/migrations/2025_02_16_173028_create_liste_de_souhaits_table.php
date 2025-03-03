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
        Schema::create('liste_de_souhaits', function (Blueprint $table) {
            $table->foreignId('client_id')->constrained('users', 'id')->onDelete('cascade');
            $table->foreignId('produit_id')->constrained('produits', 'produit_id')->onDelete('cascade');
            $table->primary(['client_id', 'produit_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('liste_de_souhaits');
    }
};
