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
        Schema::create('detail_factures', function (Blueprint $table) {
            $table->id('detail_facture_id');
            $table->integer('quantite');
            $table->string('couleur')->nullable();
            $table->decimal('prixUnitaireTTC', 10, 2);
            $table->decimal('totalLigneTTC', 10, 2);
            $table->decimal('totalLigneHT', 10, 2);
            $table->decimal('tvaLigne', 10, 2)->default(19.00);
            $table->integer('remise')->default(0);
            $table->foreignId('facture_id')->constrained('factures', 'facture_id')->onDelete('cascade');
            $table->foreignId('produit_id')->constrained('produits', 'produit_id')->onDelete('cascade'); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_factures');
    }
};
