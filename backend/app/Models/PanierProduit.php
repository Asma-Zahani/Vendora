<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PanierProduit extends Model
{
    protected $table = 'panier_produits'; // Nom de la table pivot
    public $timestamps = false;
    
    protected $fillable = ['client_id', 'produit_id', 'quantite', 'couleur'];
}
