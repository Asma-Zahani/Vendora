<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CodePromotion extends Model
{
    
    use HasFactory;

    protected $table = 'code_promotions';
    protected $primaryKey = 'code_promotion_id';
    public $timestamps = false;

    protected $fillable = [
        'code',
        'reduction',
        'dateExpiration',
        'nbUtilisation',
        'nbUtilisationMax',
    ];

    public function commandes()
    {
        return $this->hasMany(Commande::class, 'code_promotion_id');
    }

    public static function boot()
    {
        parent::boot();

        static::saving(function ($codePromotion) {
            if ($codePromotion->dateExpiration <= now()->toDateString()) {
                throw new \Exception('La date d\'expiration doit être supérieure à la date actuelle.');
            }

            if ($codePromotion->nbUtilisation > $codePromotion->nbUtilisationMax) {
                throw new \Exception('nbUtilisation ne peut pas dépasser nbUtilisationMax.');
            }
        });
    }
}