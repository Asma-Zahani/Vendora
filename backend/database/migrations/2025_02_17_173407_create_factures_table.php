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
        Schema::create('factures', function (Blueprint $table) {
            $table->id('facture_id');
            $table->date('date');
            $table->decimal('tva', 5, 2);
            $table->decimal('totalHT', 10, 2);
            $table->decimal('totalTTC', 10, 2);
            $table->enum('dtype', ['facture_commandes', 'facture_fournisseurs']);
            $table->foreignId('commande_id')->nullable()->constrained('commandes', 'commande_id')->onDelete('cascade');
            $table->foreignId('fournisseur_id')->nullable()->constrained('users', 'id')->onDelete('cascade');
            $table->decimal('remise', 8, 2)->nullable(); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('factures');
    }
};
