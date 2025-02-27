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
            $table->decimal('prix_unitaire', 10, 2);
            $table->decimal('totalLigneHT', 10, 2);
            $table->decimal('tvaLigne', 10, 2);
            $table->decimal('totalLigneTTC', 10, 2);
            $table->foreignId('facture_id')->constrained('factures', 'facture_id')->onDelete('cascade')->unique();
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
