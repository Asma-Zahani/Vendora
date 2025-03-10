<?php

namespace App\Http\Controllers;

use App\Enums\RoleEnum;
use App\Http\Controllers\Controller;
use App\Models\RoleUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\LoginSuccessEmail;
use App\Mail\PasswordResetEmail;
use Illuminate\Support\Str;
use App\Mail\VerifyEmail;
use App\Models\PasswordResetToken;
use Illuminate\Support\Facades\Cache;

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
        
        $token = Str::random(60);

        // Stocker temporairement dans le cache (ex: Redis) avec une expiration de 1 heure
        Cache::put("email_verification_{$token}", $user->id, now()->addHour());

        Mail::to($user->email)->send(new VerifyEmail($user, $token));

        return response()->json(['message' => 'Compte créé. Veuillez vérifier votre email.'], 201);  
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

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['errors' => ['email' => ['Les identifiants sont incorrects.']]], 401);
        }

        if (!$user->email_verified_at) {
            return response()->json(['errors' => ['email' => ['Veuillez vérifier votre adresse email avant de vous connecter.']]], 403);
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

    public function verifyEmail(Request $request)
    {
        $token = $request->query('token');
        
        if (!$token) {
            return response()->json(['message' => 'Token invalide.'], 400);
        }
    
        $userId = Cache::get("email_verification_{$token}");

    if (!$userId) {
        return response()->json(['message' => 'Token expiré ou invalide.'], 400);
    }

        // Récupérer l'utilisateur et vérifier l'email
        $user = User::find($userId);
        if (!$user) {
            return response()->json(['message' => 'Utilisateur introuvable.'], 404);
        }

        // Marquer l'email comme vérifié
        $user->email_verified_at = now();
        $user->save();

        // Supprimer le token du cache
        Cache::forget("email_verification_{$token}");

        return response()->json(['message' => 'Email vérifié avec succès. Vous pouvez maintenant vous connecter.'], 200);
    }

    public function sendResetLink(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        // Générer un token unique
        $token = bin2hex(random_bytes(32));

        // Enregistrer le token dans la base de données
        PasswordResetToken::create([
            'email' => $request->email,
            'token' => $token,
            'created_at' => now(),
        ]);

        // Envoyer l'email avec le lien de réinitialisation
        Mail::to($request->email)->send(new PasswordResetEmail($token));

        return response()->json(['message' => 'Un email a été envoyé pour réinitialiser votre mot de passe.']);
    }

    public function reset(Request $request)
    {
        // Valider la demande
        $request->validate([
            'password' => 'required|confirmed|min:8',
            'token' => 'required|exists:password_reset_tokens,token',
        ]);

        // Vérifier le token
        $resetToken = PasswordResetToken::where('token', $request->token)->first();

        if (!$resetToken) {
            return response()->json(['message' => 'Le token est invalide ou expiré.'], 400);
        }

        // Mettre à jour le mot de passe de l'utilisateur
        $user = User::where('email', $resetToken->email)->first();
        $user->password = Hash::make($request->password);
        $user->save();

        // Supprimer le token après utilisation
        PasswordResetToken::where('token', $request->token)
            ->delete();

        return response()->json(['message' => 'Votre mot de passe a été réinitialisé avec succès.']);
    }
}
