<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailFacture extends Model
{
    use HasFactory;

    protected $table = 'detail_factures';
    protected $primaryKey = 'detail_facture_id';

    protected $fillable = [
        'facture_id',
        'produit_id',
        'quantite',
        'prixUnitaireTTC',
        'totalLigneTTC',
        'totalLigneHT',
        'tvaLigne',
        'remise',
    ];

    protected static function booted()
    {
        static::creating(function ($detail) {
            $detail->calculMontants();
        });

        static::updating(function ($detail) {
            $detail->calculMontants();
        });
    }

    public function factureCommande()
    {
        return $this->belongsTo(FactureCommande::class, 'facture_id');
    }

    public function calculMontants()
    {
        $tva = $this->factureCommande?->tva;

        $this->totalLigneTTC = $this->prixUnitaireTTC * $this->quantite;
        $this->totalLigneHT = $this->totalLigneTTC / (1 + $tva / 100);
        $this->tvaLigne = $this->totalLigneTTC - $this->totalLigneHT;
    }
}