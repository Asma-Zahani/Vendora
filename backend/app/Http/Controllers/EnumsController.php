<?php

namespace App\Http\Controllers;

use App\Enums\EtatCommandeEnum;
use App\Enums\StatusDriveEnum;
use App\Enums\StatusProduitEnum;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class EnumsController extends Controller
{
    public function getEtatCommandes(): JsonResponse
    {
        $etatCommandes = array_map(fn($etat) => [
            'value' => $etat->value,
            'label' => $etat->value
        ], EtatCommandeEnum::cases());

        return response()->json($etatCommandes);
    }

    public function getStatusDrives(): JsonResponse
    {
        $etatCommandes = array_map(fn($etat) => [
            'value' => $etat->value,
            'label' => $etat->value
        ], StatusDriveEnum::cases());

        return response()->json($etatCommandes);
    }

    public function getStatusProduits(): JsonResponse
    {
        $etatCommandes = array_map(fn($etat) => [
            'value' => $etat->value,
            'label' => $etat->value
        ], StatusProduitEnum::cases());

        return response()->json($etatCommandes);
    }
}
