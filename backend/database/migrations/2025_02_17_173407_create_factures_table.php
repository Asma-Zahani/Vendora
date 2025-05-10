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
            $table->decimal('tva', 5, 2)->default(19.00);
            $table->decimal('totalHT', 10, 2);
            $table->decimal('totalTTC', 10, 2);
            $table->foreignId('commande_id')->constrained('commandes', 'commande_id')->onDelete('cascade');
            $table->integer('remise')->default(0);
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
