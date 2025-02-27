<?php

namespace App\Enums;

enum EtatCommandeEnum: string
{
    case EnAttente = 'En attente';
    case Traitee = 'Traité';
    case Expediee = 'Expédiée';
    case Livree = 'Livrée';
    case Annulee = 'Annulée';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
