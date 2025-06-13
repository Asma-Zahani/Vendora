<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\RoleEnum;
use App\Models\Commande;
use App\Models\Produit;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'password',
        'telephone',
        'genre',
        'date_naissance',
        'adresse',
        'region',
        'ville',
        'role'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'role' => RoleEnum::class,
    ];

    public function produits()
    {
        return $this->belongsToMany(Produit::class, 'panier_produits', 'client_id', 'produit_id')
            ->withPivot(['quantite', 'couleur']);
    }

    public function wishlist()
    {
        return $this->belongsToMany(Produit::class, 'liste_de_souhaits', 'client_id', 'produit_id');
    }

    public function commandes()
    {
        return $this->hasMany(Commande::class, 'client_id');
    }

    public function drive()
    {
        return $this->hasOne(Drive::class, 'responsable_id');
    }

    public function preferences()
    {
        return $this->hasOne(UserPreference::class, 'user_id');
    }

    public function interactions()
    {
        return $this->hasMany(Interaction::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($client) {
            $client->produits()->detach();
            $client->wishlist()->detach();
        });
    }
}