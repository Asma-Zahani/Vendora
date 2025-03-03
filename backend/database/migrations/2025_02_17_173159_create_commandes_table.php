<?php

use App\Enums\EtatCommandeEnum;
use App\Enums\EtatLivraisonEnum;
use App\Enums\ModeLivraisonEnum;
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
        Schema::create('commandes', function (Blueprint $table) {
            $table->id('commande_id'); 
            $table->foreignId('produit_id')->constrained('produits', 'produit_id')->onDelete('cascade');
            $table->foreignId('code_promotion_id')->nullable()->constrained('code_promotions', 'code_promotion_id')->onDelete('cascade');
            $table->decimal('total', 10, 2);
            $table->enum('etatCommande', EtatCommandeEnum::values())->default(EtatCommandeEnum::EnAttente->value);
            $table->enum('modeLivraison', ModeLivraisonEnum::values());
            $table->string('horaireRetrait')->nullable();
            $table->foreignId('livreur_id')->nullable()->constrained('users', 'id')->onDelete('cascade');
            $table->date('dateLivraison')->nullable();
            $table->enum('etatLivraison', EtatLivraisonEnum::values())->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commandes');
    }
};
