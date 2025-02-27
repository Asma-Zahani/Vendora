<?php

namespace App\Models;

use App\Enums\EtatCommandeEnum;
use App\Enums\ModeLivraisonEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommandeRetraitDrive extends Model
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
        'horaireRetrait',
    ];

    protected $casts = [
        'modeLivraison' => ModeLivraisonEnum::class,
        'etatCommande' => EtatCommandeEnum::class,
    ];
    
    public function JourFerier()
    {
        return $this->hasMany(JourFerie::class, 'jour_ferie_id');
    }

    public function Horaire()
    {
        return $this->hasMany(Horaire::class, 'horaire_id');
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
