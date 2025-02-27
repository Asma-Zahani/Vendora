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
        Schema::create('code_promotions', function (Blueprint $table) {
            $table->id('code_promotion_id');
            $table->string('code', 120)->unique();
            $table->integer('reduction');
            $table->date('dateExpiration'); 
            $table->integer('nbUtilisation');
            $table->integer('nbUtilisationMax');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('code_promotions');
    }
};
