<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommandeLivraison extends Model
{
    use HasFactory;

    protected $table = 'commandes_livraisons'; // Correction du nom de la table
    protected $primaryKey = 'commande_id';

    protected $fillable = [
        'commande_id',
        'dateLivraison',
        'livreur_id'
    ];

    // Relation avec le livreur
    public function livreur()
    {
        return $this->belongsTo(User::class, 'livreur_id'); // Correction de la clé étrangère
    }

    // Relation avec la Commande (une CommandeLivraison appartient à une Commande)
    public function commande()
    {
        return $this->belongsTo(Commande::class, 'commande_id', 'commande_id'); 
    }
}
