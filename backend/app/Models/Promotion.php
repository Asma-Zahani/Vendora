<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    
    use HasFactory;

    protected $table = 'promotions';
    protected $primaryKey = 'promotion_id';

    protected $fillable = [
        'nom',
        'reduction',
        'dateDebut',
        'dateFin',
    ];

    public function produits()
    {
        return $this->hasMany(Produit::class, 'promotion_id');
    }
}