<?php

namespace App\Models;

use App\Enums\EtatCommandeEnum;
use App\Enums\EtatLivraisonEnum;
use App\Enums\ModeLivraisonEnum;
use App\Models\Users\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommandeLivraison extends Model
{
    use HasFactory;

    protected $table = 'commandes_livraisons'; // Correction du nom de la table
    protected $primaryKey = 'commande_id';

    protected $fillable = [
        'commande_id', // Ajout de la référence de la commande
        'dateLivraison',
        'etatLivraison',
        'livreur_id'
    ];

    protected $casts = [
        'etatLivraison' => EtatLivraisonEnum::class,
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
