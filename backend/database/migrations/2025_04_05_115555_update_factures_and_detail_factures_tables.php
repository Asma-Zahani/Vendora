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
        // Modification de la colonne TVA dans factures
        Schema::table('factures', function (Blueprint $table) {
            $table->decimal('tva', 5, 2)->default(19.00)->change();
        });

        // Ajout de la colonne produit_id et modification tvaLigne dans detail_factures
        Schema::table('detail_factures', function (Blueprint $table) {
            $table->decimal('tvaLigne', 10, 2)->default(19.00)->change();
            $table->foreignId('produit_id')->nullable()->after('facture_id')->constrained('produits', 'produit_id')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Annuler les changements
        Schema::table('factures', function (Blueprint $table) {
            $table->decimal('tva', 5, 2)->change();
        });

        Schema::table('detail_factures', function (Blueprint $table) {
            $table->decimal('tvaLigne', 10, 2)->change();
            $table->dropForeign(['produit_id']);
            $table->dropColumn('produit_id');
        });
    }
};
