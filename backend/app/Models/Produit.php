<?php

namespace App\Models;

use App\Enums\StatusProduitEnum;
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
        'couleur_id',
        'nom',
        'status',
        'description',
        'prix',
        'quantite',
        'image',
    ];
    
    protected $appends = ['prix_apres_promo', 'nom_marque'];
    protected $hidden = ['promotion'];

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
        return $this->belongsToMany(User::class, 'panier_produits', 'produit_id', 'client_id')
                    ->withPivot(['quantite', 'couleur']); 
    }

    /**
     * Relation many-to-many avec les clients pour la liste de souhaits.
     */
    public function clientsDansWishlist()
    {
        return $this->belongsToMany(User::class, 'liste_de_souhaits', 'produit_id', 'client_id');
    }

    public function couleurs(){
        return $this->belongsToMany(Couleur::class, 'produit_couleur', 'produit_id', 'couleur_id')
        ->withPivot('quantite');
    }

    public function interactions()
    {
        return $this->hasMany(Interaction::class, 'produit_id', 'produit_id');
    }

    public function getPrixApresPromoAttribute()
    {
        $reduction = $this->promotion ? $this->promotion->reduction : 0;
        $prixApresPromo = $this->prix - ($this->prix * $reduction / 100);
    
        return number_format($prixApresPromo, 2, '.', '');
    }

    public function getNomMarqueAttribute()
    {
        return $this->marque()->first()?->nom;
    }

}