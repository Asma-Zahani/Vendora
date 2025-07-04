<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ListeDeSouhait extends Model
{
    protected $table = 'liste_de_souhaits'; // Nom de la table pivot
    public $timestamps = false;
    
    protected $fillable = ['client_id', 'produit_id'];
}
