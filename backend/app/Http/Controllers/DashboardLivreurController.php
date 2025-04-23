<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;

class DashboardLivreurController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum')
        ];
    }

    public function commandesLivreurJour()
    {
        $aujourdHui = now()->toDateString();
        $livreurId = Auth::id(); 

        $commandes = Commande::with(['client', 'commandeLivraison'])
            ->whereHas('commandeLivraison', function ($query) use ($aujourdHui, $livreurId) {
                $query->whereDate('dateLivraison', $aujourdHui)
                      ->where('livreur_id', $livreurId);
            })
            ->get();

        return response()->json($commandes);
    }


    public function livraisonsEffectuees()
    {
        $livreurId = Auth::id();

        $commandes = Commande::with(['client', 'commandeLivraison'])
            ->where('etatCommande', 'Livrée')
            ->whereHas('commandeLivraison', function ($query) use ($livreurId) {
                $query->where('livreur_id', $livreurId);
            })
            ->get();

        return response()->json($commandes);
    }

    
    public function livraisonsEnCours()
    {
        $livreurId = Auth::id();

        $commandes = Commande::with(['client', 'commandeLivraison'])
            ->where('etatCommande', 'En attente')
            ->whereHas('commandeLivraison', function ($query) use ($livreurId) {
                $query->where('livreur_id', $livreurId);
            })
            ->get();

        return response()->json($commandes);
    }

    public function livraisonsAnnulees()
    {
        $livreurId = Auth::id();

        $commandes = Commande::with(['client', 'commandeLivraison'])
            ->where('etatCommande', 'Annulée')
            ->whereHas('commandeLivraison', function ($query) use ($livreurId) {
                $query->where('livreur_id', $livreurId);
            })
            ->get();

        return response()->json($commandes);
    }
}
