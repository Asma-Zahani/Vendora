<?php

namespace App\Models;

use App\Enums\StatusProduitEnum;
use App\Models\Users\Client;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    
    use HasFactory;

    protected $table = 'produits';
    protected $primaryKey = 'produit_id';

    protected $fillable = [
        'marque_id',
        'sous_categorie_id',
        'promotion_id',
        'fournisseur_id',
        'couleur_id',
        'nom',
        'status',
        'description',
        'prix',
        'image',
    ];

    protected $casts = [
        'status' => StatusProduitEnum::class,
    ];

    public function sousCategorie()
    {
        return $this->belongsTo(SousCategorie::class, 'sous_categorie_id');
    }

    public function marque()
    {
        return $this->belongsTo(Marque::class, 'marque_id');
    }

    public function promotion()
    {
        return $this->belongsTo(Promotion::class, 'promotion_id');
    }

    public function clientsDansPanier()
    {
        return $this->belongsToMany(Client::class, 'panier_produits', 'produit_id', 'client_id')
                    ->withPivot('quantite')
                    ->withTimestamps();
    }

    /**
     * Relation many-to-many avec les clients pour la liste de souhaits.
     */
    public function clientsDansWishlist()
    {
        return $this->belongsToMany(Client::class, 'liste_de_souhaits', 'produit_id', 'client_id');
    }

    public function couleurs(){
        return $this->belongsToMany(Couleur::class, 'produit_couleur', 'produit_id', 'couleur_id')
        ->withPivot('quantite');
    }

}