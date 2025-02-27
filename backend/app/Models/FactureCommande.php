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
        'date',
        'tva',
        'totalHT',
        'totalTTC',
        'dtype',
        'remise',
        'commande_id'
    ];

    public function totalApresRemise()
    {
        return $this->totalTTC - $this->remise;
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
