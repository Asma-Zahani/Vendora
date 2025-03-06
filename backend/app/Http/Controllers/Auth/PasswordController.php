<?php

use App\Http\Controllers\Controller;
use App\Models\Users\Client;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class PasswordController extends Controller
{
    /**
     * Modifier le mot de passe de l'utilisateur.
     */
    public function updatePassword(Request $request, $id)
    {
        $client = Client::findOrFail($id);

        $validatedData = $request->validate([
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:8|confirmed'
        ]);

        if (!Hash::check($validatedData['current_password'], $client->password)) {
            return response()->json(['error' => 'L\'ancien mot de passe est incorrect.'], 400);
        }

        $client->password = Hash::make($validatedData['new_password']);
        $client->save();
        
        return response()->json(['message' => 'Mot de passe mis à jour avec succès.'], 200);
    }
}
