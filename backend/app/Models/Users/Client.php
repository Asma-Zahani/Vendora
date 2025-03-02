<?php

namespace App\Models\Users;

use App\Models\Panier;
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

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function panier()
    {
        return $this->hasOne(Panier::class, 'id');
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($client) {
            $client->panier()->delete();
        });
    }
}