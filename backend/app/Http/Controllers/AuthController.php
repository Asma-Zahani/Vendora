<?php

namespace App\Http\Controllers;

use App\Enums\RoleEnum;
use App\Http\Controllers\Controller;
use App\Models\RoleUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        return $this->createUser($request);
    }

    public function createClient(Request $request)
    {
        return $this->createUser($request, "client");
    }

    public function createLivreur(Request $request)
    {
        return $this->createUser($request, "livreur");
    }

    private function createUser(Request $request, string $role = "client")
    {
        
        $validatedData = $request->validate([
            'nom' => 'required|max:255',
            'prenom' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
            'telephone' => 'required|string|max:20',
            'genre' => 'required|string|max:20',
            'date_naissance' => 'required|date',
            'emploi' => 'required|string|max:500',
            'typeLogement' => 'required|string|max:100',
            'statusLogement' => 'required|string|max:50',
            'region' => 'required|string|max:100',
            'ville' => 'required|string|max:100',
            'adresse' => 'required|string|max:255',
        ]);

        $validatedData['password'] = Hash::make($validatedData['password']);

        $user = User::create($validatedData);
        
        if ($role === "client") {
            RoleUser::create([
                'user_id' => $user->id,
                'role' => RoleEnum::CLIENT->value,
            ]);
        } else if ($role === "livreur") {
            RoleUser::create([
                'user_id' => $user->id,
                'role' => RoleEnum::LIVREUR->value,
            ]);
            RoleUser::create([
                'user_id' => $user->id,
                'role' => RoleEnum::CLIENT->value,
            ]);
        }
        

        $token = $user->createToken($user->nom.' '.$user->prenom);

        return [
            'user' => $user,
            'token' => $token->plainTextToken
        ];
    }

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

    public function login(Request $request){
        $request->validate([
            'email' => 'required|email|exists:users',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if(!$user || !Hash::check($request->password, $user->password)){
            return ['errors' => [
                'email' => ["The provided credentials are incorrect."]
            ]];
        }

        $token = $user->createToken($user->first_name.' '.$user->last_name);

        return [
            'user' => $user,
            'token' => $token->plainTextToken
        ];
    }

    public function logout(Request $request){
        $request->user()->tokens()->delete();

        return "You are logged out";
    }
}
