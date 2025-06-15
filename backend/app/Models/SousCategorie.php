<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SousCategorie extends Model
{
    
    use HasFactory;

    protected $table = 'sous_categories';
    protected $primaryKey = 'sous_categorie_id';

    protected $appends = ['titre_categorie'];
    protected $fillable = [
        'categorie_id',
        'titre',
        'image',
    ];

    protected $casts = [
        'categorie_id' => 'integer',
    ];

    public function categorie()
    {
        return $this->belongsTo(Categorie::class, 'categorie_id');
    }

    public function produits()
    {
        return $this->hasMany(Produit::class, 'sous_categorie_id');
    }

    public function getTitreCategorieAttribute()
    {
        return $this->categorie()->first()?->titre;
    }

}
