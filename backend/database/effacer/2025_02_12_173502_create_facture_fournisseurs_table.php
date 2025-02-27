<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('facture_fournisseurs', function (Blueprint $table) {
            $table->id('facture_fournisseur_id');
            $table->foreignId('fournisseur_id')->constrained('fournisseurs', 'fournisseur_id')->onDelete('cascade');
            $table->foreignId('facture_id')->constrained('factures', 'facture_id')->onDelete('cascade');
            $table->date('datePaiement');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('facture_fournisseurs');
    }
};
