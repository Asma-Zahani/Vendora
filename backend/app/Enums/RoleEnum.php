<?php

namespace App\Enums;

enum RoleEnum : string
{
    case ADMIN = 'admin';
    case CLIENT = 'client';
    case LIVREUR = 'livreur';
    case RESPONSABLE = 'responsable';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}