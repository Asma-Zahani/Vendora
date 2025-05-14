<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use App\Models\User;
use Carbon\Carbon;

class DashboardResponsableController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum')
        ];
    }
    
    public function genreCount()
    {
        return response()->json([
            'Male' => User::where('genre', 'Male')->count(),
            'Femelle' => User::where('genre', 'Femelle')->count(),
        ]);
    }

    public function ageCount()
    {
        $now = Carbon::now();
        return response()->json([
            'Enfant' => User::whereDate('date_naissance', '>', $now->copy()->subYears(13))->count(),
            'Jeune' => User::whereDate('date_naissance', '<=', $now->copy()->subYears(13))
                        ->whereDate('date_naissance', '>', $now->copy()->subYears(25))
                        ->count(),
            'Adulte' => User::whereDate('date_naissance', '<=', $now->copy()->subYears(25))->count(),
        ]);
    }

    public function listAnnee()
    {
        return response()->json(
            Commande::selectRaw('YEAR(created_at) as annee')
                ->distinct()
                ->orderBy('annee', 'desc')
                ->pluck('annee')
        );
    }

    public function statistiquesVentes($annee)
    {
        $commandes = Commande::selectRaw('MONTH(created_at) as mois, COUNT(*) as nombre, SUM(total) as total')
            ->whereYear('created_at', $annee)
            ->where(function ($query) {
                $query->whereIn('etatCommande', ['Livrée', 'Retirée'])
                    ->orWhereNotNull('transaction_id');
            })
            ->groupByRaw('MONTH(created_at)')
            ->orderByRaw('MONTH(created_at)')
            ->get();

        $commandesAnneePrecedente = Commande::selectRaw('SUM(total) as total')
            ->whereYear('created_at', $annee - 1)
            ->where(function ($query) {
                $query->whereIn('etatCommande', ['Livrée', 'Retirée'])
                    ->orWhereNotNull('transaction_id');
            })
            ->get();

        $totalDesVentes = $commandes->sum('total');
        $totalDesVentesAnneePrecedente = $commandesAnneePrecedente->sum('total');

        $evolutionPourcentage = $totalDesVentesAnneePrecedente > 0
            ? round((($totalDesVentes - $totalDesVentesAnneePrecedente) / $totalDesVentesAnneePrecedente) * 100, 2)
            : 0;

        $nombreCommandes = $commandes->sum('nombre');
        $revenuParCommande = $nombreCommandes > 0 ? round($totalDesVentes / $nombreCommandes, 2) : 0;

        $ventesParMois = array_fill(1, 12, 0);
        foreach ($commandes as $commande) {
            $ventesParMois[$commande->mois] = (float) $commande->total;
        }

        return response()->json([
            'totalDesVentes' => round($totalDesVentes, 2),
            'evolutionPourcentage' => $evolutionPourcentage,
            'nombreCommandes' => $nombreCommandes,
            'revenuParCommande' => $revenuParCommande,
            'ventesParMois' => array_values($ventesParMois),
        ]);
    }

    public function statistiquesCommandes($annee)
    {
        $statuts = ['Retirée', 'Livrée', 'Annulée'];
        $resultat = [];
    
        foreach ($statuts as $statut) {
            $commandes = Commande::selectRaw('MONTH(created_at) as mois, COUNT(*) as total')
                ->whereYear('created_at', $annee)
                ->where('etatCommande', $statut)
                ->groupByRaw('MONTH(created_at)')
                ->pluck('total', 'mois')
                ->toArray();
    
            $data = [];
            for ($i = 1; $i <= 12; $i++) {
                $data[] = $commandes[$i] ?? 0;
            }
    
            $resultat[] = [
                'label' => $statut,
                'data' => $data,
            ];
        }
    
        return response()->json($resultat);
    }   

    public function commandesEnAttente()
    {
        return response()->json(Commande::with('client', 'commandeLivraison', 'commandeRetraitDrive')->where('etatCommande', 'En attente')->get());
    }
}
