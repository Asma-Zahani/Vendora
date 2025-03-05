<?php

namespace App\Http\Controllers\Enums;

use App\Enums\StatusDriveEnum;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class StatusDriveController extends Controller
{
    public function getStatusDrives(): JsonResponse
    {
        $etatCommandes = array_map(fn($etat) => [
            'value' => $etat->value,
            'label' => $etat->value
        ], StatusDriveEnum::cases());

        return response()->json($etatCommandes);
    }
}
