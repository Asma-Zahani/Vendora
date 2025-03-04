<?php

namespace App\Enums;

enum StatusPanierEnum: string
{
    case EnCours = 'En cours';
    case Valide = 'Validé';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
