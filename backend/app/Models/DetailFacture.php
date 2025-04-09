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
        'prix_unitaire',
        'totalLigneHT',
        'totalLigneTTC',
    ];

    protected static function booted()
    {
        static::creating(function ($detail) {
            $detail->tvaLigne = 19.00;
        });

        static::updating(function ($detail) {
            $detail->tvaLigne = 19.00;
        });
    }

    public function factureCommande()
    {
        return $this->belongsTo(FactureCommande::class, 'facture_id');
    }
}