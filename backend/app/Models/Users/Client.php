<?php

namespace App\Models\Users;

use App\Models\Panier;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

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
        'compositionFoyer',
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