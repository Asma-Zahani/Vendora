<?php

namespace App\Http\Controllers;

use App\Models\CommandeRetraitDrive;
use App\Models\User;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;

class DashboardResponsableController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum')
        ];
    }
    
    public function retraitDrivesParEtat()
    {
        $responsableId = Auth::id();

        $responsable = User::with('drive')->where('id', $responsableId)->first();
        $driveId = $responsable->drive->drive_id;

        $etats = ['En attente', 'Préparée', 'Retirée', 'Annulée'];

        $commandes = CommandeRetraitDrive::with(['commande.client'])
            ->where('drive_id', $driveId)
            ->whereHas('commande', function ($query) use ($etats) {
                $query->whereIn('etatCommande', $etats);
            })
            ->get();
        
        $commandesCount = $commandes->groupBy(function ($commandeRetraitDrive) {
            return $commandeRetraitDrive->commande->etatCommande;
        })->map(function ($group) {
            return $group->count();
        });

        return response()->json($commandesCount);
    }
}
