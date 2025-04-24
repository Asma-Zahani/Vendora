<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProduitCouleur extends Model
{
    protected $table = 'produit_couleur';
    public $timestamps = false;
    
    protected $fillable = ['produit_id', 'couleur_id', 'quantite'];
}
