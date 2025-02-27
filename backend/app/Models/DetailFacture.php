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
        'quantite',
        'prix_unitaire',
        'totalLigneHT',
        'tvaLigne',
        'totalLigneTTC',
    ];

    public function factureCommande()
    {
        return $this->belongsTo(FactureCommande::class, 'facture_id');
    }

    public function factureFournisseur()
    {
        return $this->belongsTo(FactureFournisseur::class, 'facture_id');
    }
}