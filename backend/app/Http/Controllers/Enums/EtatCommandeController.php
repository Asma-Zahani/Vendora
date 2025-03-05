<?php

namespace App\Http\Controllers\Enums;

use App\Enums\EtatCommandeEnum;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class EtatCommandeController extends Controller
{
    public function getEtatCommandes(): JsonResponse
    {
        $etatCommandes = array_map(fn($etat) => [
            'value' => $etat->value,
            'label' => $etat->value
        ], EtatCommandeEnum::cases());

        return response()->json($etatCommandes);
    }
}
