<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CodePromotion extends Model
{
    
    use HasFactory;

    protected $table = 'code_promotions';
    protected $primaryKey = 'code_promotion_id';

    protected $fillable = [
        'code',
        'reduction',
        'dateExpiration',
        'nbUtilisationMax',
    ];

    public function commandes()
    {
        return $this->hasMany(Commande::class, 'code_promotion_id');
    }
}