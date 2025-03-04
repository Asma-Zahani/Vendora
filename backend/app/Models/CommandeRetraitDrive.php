<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommandeRetraitDrive extends Model
{
    use HasFactory;

    // Spécifie le nom de la table dans la base de données
    protected $table = 'commandes_retrait_drives'; // Nom de la table corrigé

    // Spécifie la clé primaire de la table
    protected $primaryKey = 'commande_id';

    // Les champs qui peuvent être remplis en masse
    protected $fillable = [
        'commande_id',
        'horaireRetrait',
    ];

    /**
     * Relation avec le modèle Commande
     * Une commande de retrait drive appartient à une commande.
     */
    public function commande()
    {
        return $this->belongsTo(Commande::class, 'commande_id', 'commande_id');
    }
}
