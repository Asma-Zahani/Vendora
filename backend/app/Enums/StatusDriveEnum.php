<?php

namespace App\Enums;

enum StatusDriveEnum: string
{
    case Actif = 'Actif';
    case Inactif = 'Inactif';
    case Maintenance = 'Maintenance';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}

