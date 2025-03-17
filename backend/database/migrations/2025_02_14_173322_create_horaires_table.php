<?php

use App\Enums\JourEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB; 

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('horaires', function (Blueprint $table) {
            $table->id('horaire_id');
            $table->foreignId('drive_id')->constrained('drives', 'drive_id')->onDelete('cascade');
            $table->enum('jour', JourEnum::values());
            $table->boolean('ouvert');
            $table->unique(['drive_id', 'jour']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('horaires');
    }
};
