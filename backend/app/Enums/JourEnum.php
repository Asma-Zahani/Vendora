<?php

namespace App\Enums;

enum JourEnum: string
{
    case Lundi = 'Lundi';
    case Mardi = 'Mardi';
    case Mercredi = 'Mercredi';
    case Jeudi = 'Jeudi';
    case Vendredi = 'Vendredi';
    case Samedi = 'Samedi';
    case Dimanche = 'Dimanche';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
