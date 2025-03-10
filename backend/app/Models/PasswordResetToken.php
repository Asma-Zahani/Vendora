<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PasswordResetToken extends Model
{
    // La table associée au modèle
    protected $table = 'password_reset_tokens';

    // Indiquer les attributs que l'on peut remplir en masse (mass assignable)
    protected $fillable = ['email', 'token', 'created_at'];

    // Désactiver les timestamps si tu n'en as pas besoin
    public $timestamps = false;

    // Optionnel : ajouter des méthodes ou des scopes si nécessaire
}
