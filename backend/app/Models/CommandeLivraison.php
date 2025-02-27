<?php

namespace App\Models;

use App\Enums\EtatCommandeEnum;
use App\Enums\EtatLivraisonEnum;
use App\Enums\ModeLivraisonEnum;
use App\Models\Users\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommandeLivraison extends Model
{

    use HasFactory;

    protected $table = 'commandes';
    protected $primaryKey = 'commande_id';

    protected $fillable = [
        'panier_id',
        'code_promotion_id',
        'total',
        'etatCommande',
        'modeLivraison',
        'dateLivraison',
        'etatLivraison',
        'livreur_id'
    ];

    protected $casts = [
        'modeLivraison' => ModeLivraisonEnum::class,
        'etatCommande' => EtatCommandeEnum::class,
        'etatLivraison' => EtatLivraisonEnum::class,
    ];

    public function livreur()
    {
        return $this->belongsTo(User::class, 'id');
    }

    public function panier()
    {
        return $this->belongsTo(Panier::class, 'panier_id');
    }

    public function codePromotion()
    {
        return $this->belongsTo(CodePromotion::class, 'code_promotion_id');
    }

    public function factureCommande()
    {
        return $this->hasOne(FactureCommande::class, 'commande_id');
    }
}