<?php

namespace App\Enums;

enum ModeLivraisonEnum : string
{
    case CommandeLivraison = 'CommandeLivraison';
    case CommandeRetraitDrive = 'CommandeRetraitDrive';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
