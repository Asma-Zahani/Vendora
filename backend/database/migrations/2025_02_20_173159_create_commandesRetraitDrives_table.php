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
        Schema::create('commandes_retrait_drives', function (Blueprint $table) {
            $table->foreignId('commande_id')->constrained('commandes', 'commande_id')->onDelete('cascade');
            $table->string('horaireRetrait')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commandes_retrait_drives');
    }
};
