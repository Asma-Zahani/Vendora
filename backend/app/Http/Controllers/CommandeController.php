<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use Illuminate\Http\Request;

class CommandeController extends Controller
{
    public function userCommande(Request $request) {
        return $request->user()->commandes()->with('client','commandeLivraison', 'commandeRetraitDrive.drive', 'facture.detailsFacture.produit')->get();
    }

    public function trackCommande(Request $request) {
        $request->validate([
            'email' => 'required|email',
            'commande_id' => 'required|integer'
        ]);

        $commande = Commande::join('users', 'users.id', '=', 'commandes.client_id')
            ->where('commandes.commande_id', $request->commande_id)
            ->where('users.email', $request->email)
            ->select('commandes.*')
            ->first();

        if (!$commande) {
            return response()->json(['message' => 
                '<p>Malheureusement, nous n\'avons trouvé aucune commande correspondant au numéro de commande et à l\'adresse e-mail que vous avez fournis.</p><br><p>Vérifiez qu\'ils ne contiennent pas d\'erreur et que le numéro de la commande provient bien de notre boutique en ligne. Vous pouvez également nous adresser un message pour obtenir de l\'aide.</p>'
            ], 404);
        }

        return response()->json([
            'message' => "<p>Votre commande n°{$commande->commande_id} passée le {$commande->created_at->format('d/m/Y')} est actuellement : « {$commande->etatCommande->value} ».</p>",
            'commande' => $commande,
        ]);
    }

    public function show($id)
    {
        $commandeLivraison = Commande::where('commande_id', $id)->with('commandeLivraison', 'commandeRetraitDrive')
            ->firstOrFail();

        return response()->json($commandeLivraison);
    }
}