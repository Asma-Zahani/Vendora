<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
{
    Schema::table('commandes_livraisons', function (Blueprint $table) {
        $table->string('adresse_livraison')->nullable();
        $table->string('region_livraison')->nullable();
        $table->string('ville_livraison')->nullable();
    });
}


public function down()
{
    Schema::table('commandes_livraisons', function (Blueprint $table) {
        $table->dropColumn(['adresse_livraison', 'region_livraison', 'ville_livraison']);
    });
}

};
