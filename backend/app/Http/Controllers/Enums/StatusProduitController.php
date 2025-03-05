<?php

namespace App\Http\Controllers\Enums;

use App\Enums\StatusProduitEnum;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class StatusProduitController extends Controller
{
    public function getStatusProduits(): JsonResponse
    {
        $etatCommandes = array_map(fn($etat) => [
            'value' => $etat->value,
            'label' => $etat->value
        ], StatusProduitEnum::cases());

        return response()->json($etatCommandes);
    }
}
