<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Marque extends Model
{
    use HasFactory;

    protected $table = 'marques';
    protected $primaryKey = 'marque_id';

    protected $fillable = [
        'nom',
        'image',
    ];

    public function produits()
    {
        return $this->hasMany(Produit::class, 'marque_id');
    }
}
 