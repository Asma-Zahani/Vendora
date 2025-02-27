<?php

namespace App\Enums;

enum EtatLivraisonEnum: string
{
    case NonLivree = 'Non livrée';
    case EnCoursDeLivraison = 'En cours de livraison';
    case Livree = 'Livrée';
    case LivraisonEchouee = 'Livraison échouée';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
