<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use App\Models\CommandeLivraison;
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

        $commandes = CommandeLivraison::with(['commande.client','commande.facture.detailsFacture.produit'])
            ->whereDate('dateLivraison', $aujourdHui)
            ->where('livreur_id', $livreurId)
            ->whereHas('commande', function ($query) {
                $query->where('etatCommande', 'Préparée');
            })
            ->get();

        return response()->json($commandes);
    }

    public function commandesLivreurEnCours()
    {
        $aujourdHui = now()->toDateString();
        $livreurId = Auth::id(); 

        $commandes = CommandeLivraison::with(['commande.client','commande.facture.detailsFacture.produit'])
            ->where('livreur_id', $livreurId)
            ->whereHas('commande', function ($query) {
                $query->where('etatCommande', 'En cours de livraison');
            })
            ->get();

        return response()->json($commandes);
    }

    public function livraisonsParEtat()
    {
        $livreurId = Auth::id();

        $etats = ['Livrée', 'Préparée', 'Annulée'];

        $commandes = CommandeLivraison::with(['commande.client'])
            ->where('livreur_id', $livreurId)
            ->whereHas('commande', function ($query) use ($etats) {
                $query->whereIn('etatCommande', $etats);
            })
            ->get();
        
        $commandesCount = $commandes->groupBy(function ($commandeLivraison) {
            return $commandeLivraison->commande->etatCommande;
        })->map(function ($group) {
            return $group->count();
        });

        return response()->json($commandesCount);
    }
}
