<?php

namespace App\Enums;

enum EtatCommandeEnum: string
{
    case EnAttente = 'En attente';                  // Commande enregistrée
    case EnPreparation = 'En préparation';          // Admin prépare
    case Preparee = 'Préparée';                     // La commande est prête
    case EnCoursLivraison = 'En cours de livraison';// Affectée à un livreur
    case Livree = 'Livrée';                         // Livraison terminée
    case PretPourRetrait = 'Prête pour retrait';    // Prête à être récupérée
    case Retiree = 'Retirée';                       // Client est venu au drive
    case Annulee = 'Annulée';                       // Commande annulée

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
