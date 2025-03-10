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
        'etatCommande'
    ];

    protected $casts = [
        'etatCommande' => EtatCommandeEnum::class,
    ];

    // Relation avec le client
    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    // Relation avec le code de promotion (si applicable)
    public function codePromotion()
    {
        return $this->belongsTo(CodePromotion::class, 'code_promotion_id');
    }

    // Relation avec les produits de la commande (table de jointure)
    public function produits()
    {
        return $this->belongsToMany(Produit::class, 'commande_produits', 'commande_id', 'produit_id')
                    ->withPivot('quantite'); 
    }

    // Une commande peut avoir une facture associée
    public function facture()
    {
        return $this->hasOne(FactureCommande::class, 'commande_id');
    }

    // Optionnel: Un lien avec le statut de livraison (si la commande concerne la livraison)
    public function commandeLivraison()
    {
        return $this->hasOne(CommandeLivraison::class, 'commande_id');
    }

    // Optionnel: Un lien avec le retrait drive (si la commande concerne un retrait drive)
    public function commandeRetraitDrive()
    {
        return $this->hasOne(CommandeRetraitDrive::class, 'commande_id');
    }
}
