<?php

namespace App\Models\Users;

use App\Models\Produit;
use App\Models\ListeDeSouhait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Client extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory;

    protected $table = 'users';
    protected $primaryKey = 'id';

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'password',
        'telephone',
        'genre',
        'date_naissance',
        'role',
        'adresse',
        'region',
        'ville',
        'emploi',
        'typeLogement',
        'statusLogement'
    ];

    /**
     * Relation Many-to-Many avec les produits via le pivot panier
     * La table pivot peut contenir une colonne 'quantite'.
     */
    public function produits()
    {
        return $this->belongsToMany(Produit::class, 'panier_produits', 'client_id', 'produit_id')
            ->withPivot('quantite');
    }

    /**
     * Relation Many-to-Many avec la liste des souhaits
     */
    public function wishlist()
    {
        return $this->belongsToMany(Produit::class, 'liste_de_souhaits', 'client_id', 'produit_id');
    }

    /**
     * Gérer la suppression du panier lors de la suppression d'un client.
     */
    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($client) {
            // Suppression des produits du panier (table pivot)
            $client->produits()->detach();
            
            // Suppression des produits de la liste de souhaits
            $client->wishlist()->detach();
        });
    }
}
