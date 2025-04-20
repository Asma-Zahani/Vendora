<?php

use App\Enums\EtatCommandeEnum;
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
            $table->foreignId('client_id')->constrained('users', 'id')->onDelete('cascade');
            $table->foreignId('code_promotion_id')->nullable()->constrained('code_promotions', 'code_promotion_id')->onDelete('cascade');
            $table->decimal('total', 10, 2);
            $table->enum('etatCommande', EtatCommandeEnum::values())->default(EtatCommandeEnum::EnAttente->value);
            $table->string('transaction_id')->nullable();
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
