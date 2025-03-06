<?php

namespace App\Models\Users;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\RoleEnum;
use App\Models\CommandeLivraison;
use App\Models\FactureFournisseur;
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
}