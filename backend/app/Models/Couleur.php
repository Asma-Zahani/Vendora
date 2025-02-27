<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Couleur extends Model
{
    use HasFactory;

    protected $primaryKey = 'couleur_id';
    protected $fillable = ['nom', 'code_hex'];
    public $timestamps = false;

    public function produits()
    {
        return $this->belongsToMany(Produit::class, 'produit_couleur', 'couleur_id', 'produit_id');
    }
}
