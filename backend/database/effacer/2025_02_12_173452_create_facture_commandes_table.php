<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('facture_commandes', function (Blueprint $table) {
            $table->id('facturecommande_id');
            $table->foreignId('commande_id')->constrained('commandes', 'commande_id')->onDelete('cascade');
            $table->foreignId('facture_id')->constrained('factures', 'facture_id')->onDelete('cascade');
            $table->string('remise');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('facture_commandes');
    }
};
