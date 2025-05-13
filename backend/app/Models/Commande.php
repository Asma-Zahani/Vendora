<?php

namespace App\Models;

use App\Enums\EtatCommandeEnum;
use App\Models\User;
use App\Models\CodePromotion;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    use HasFactory;

    protected $table = 'commandes';
    protected $primaryKey = 'commande_id';

    protected $fillable = [
        'client_id',
        'code_promotion_id',
        'total',
        'etatCommande',
        'transaction_id',
    ];

    protected $casts = [
        'etatCommande' => EtatCommandeEnum::class,
    ];

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function codePromotion()
    {
        return $this->belongsTo(CodePromotion::class, 'code_promotion_id');
    }

    public function facture()
    {
        return $this->hasOne(FactureCommande::class, 'commande_id');
    }

    public function commandeLivraison()
    {
        return $this->hasOne(CommandeLivraison::class, 'commande_id');
    }

    public function commandeRetraitDrive()
    {
        return $this->hasOne(CommandeRetraitDrive::class, 'commande_id');
    }
}
