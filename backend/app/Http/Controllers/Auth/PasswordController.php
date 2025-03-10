<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class PasswordController extends Controller
{
    /**
     * Modifier le mot de passe de l'utilisateur.
     */
    public function updatePassword(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validatedData = $request->validate([
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:8|confirmed'
        ]);

        if (!Hash::check($validatedData['current_password'], $user->password)) {
            return response()->json(['errors' => ['current_password' => 'L\'ancien mot de passe est incorrect.']], 400);
        }        

        $user->password = Hash::make($validatedData['new_password']);
        $user->save();
        
        return response()->json(['message' => 'Mot de passe mis à jour avec succès.'], 200);
    }
}
