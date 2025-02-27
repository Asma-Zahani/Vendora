<?php

namespace App\Http\Controllers\Users;

use App\Enums\RoleEnum;
use App\Http\Controllers\Controller;
use App\Models\Users\Livreur;
use App\Models\Users\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class LivreurController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except:['index','show'])
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return User::where('role', 'livreur')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nom' => 'required|max:255',
            'prenom' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'telephone' => 'string',
            'genre' => 'string',
            'date_naissance' => 'string'
        ]);

        $validatedData['role'] = RoleEnum::LIVREUR->value;

        $validatedData['password'] = Hash::make($validatedData['nom'].$validatedData['prenom']);

        $user = User::create($validatedData);
        
        $token = $user->createToken($user->nom.' '.$user->prenom);

        return [
            'user' => $user,
            'token' => $token->plainTextToken
        ];
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $livreur = User::where('id', $id)
            ->where('role', 'livreur')
            ->firstOrFail();
        return response()->json($livreur);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $livreur = User::where('id', $id)
            ->where('role', 'livreur')
            ->firstOrFail();
        
        $validatedData = $request->validate([
            'nom' => 'required|max:255',
            'prenom' => 'required|max:255',
            'email' => [
                'required',
                'email',
                Rule::unique('users')->ignore($livreur->id),
            ],
            'telephone' => 'string',
            'genre' => 'string',
            'date_naissance' => 'string'
        ]);

        $validatedData['password'] = Hash::make($validatedData['nom'].$validatedData['prenom']);
        
        $livreur->update($validatedData);

        return response()->json($livreur, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $livreur = User::where('id', $id)
            ->where('role', 'livreur')
            ->firstOrFail();

        $livreur->delete();
        return response()->json(['message' => 'Livreur avec id ' . $livreur->id . ' effacer avec succés'], 200);
    }
}
