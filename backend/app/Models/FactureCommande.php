<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FactureCommande extends Model
{
    use HasFactory;

    protected $primaryKey = 'facture_id';
    protected $table = 'factures';

    protected $fillable = [
        'totalHT',
        'totalTTC',
        'remise',
        'commande_id',
        'tva'
    ];

    protected static function booted()
    {
        static::creating(function ($facture) {
            $facture->tva = 19.00;
            if ($facture->totalTTC && !$facture->totalHT) {
                $totalTTCAvantRemise = $facture->totalTTC / (1 - $facture->remise / 100);
                $facture->totalHT = $totalTTCAvantRemise / (1 + $facture->tva / 100);
            }
        });

        static::updating(function ($facture) {
            $facture->tva = 19.00;
            if ($facture->totalTTC && !$facture->totalHT) {
                $totalTTCAvantRemise = $facture->totalTTC / (1 - $facture->remise / 100);
                $facture->totalHT = $totalTTCAvantRemise / (1 + $facture->tva / 100);
            }
        });
    }

    public function totalApresRemise()
    {
        $totalApresRemise = $this->totalTTC - $this->remise;
    
        return number_format($totalApresRemise, 2, '.', '');
    }

    public function calculTTC()
    {
        return $this->totalHT + ($this->totalHT * $this->tva / 100);
    }

    public function detailsFacture()
    {
        return $this->hasMany(DetailFacture::class, 'facture_id');
    }
}