<?php

namespace App\Http\Controllers\Users;

use App\Enums\RoleEnum;
use App\Http\Controllers\Controller;
use App\Models\Users\Fournisseur;
use App\Models\Users\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class FournisseurController extends Controller implements HasMiddleware
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
        return User::where('role', 'fournisseur')->get();
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

        $validatedData['role'] = RoleEnum::FOURNISSEUR->value;

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
        $fournisseur = User::where('id', $id)
            ->where('role', 'fournisseur')
            ->firstOrFail();
        return response()->json($fournisseur);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $fournisseur = User::where('id', $id)
            ->where('role', 'fournisseur')
            ->firstOrFail();

        $validatedData = $request->validate([
            'nom' => 'required|max:255',
            'prenom' => 'required|max:255',
            'email' => [
                'required',
                'email',
                Rule::unique('users')->ignore($fournisseur->id),
            ],
            'telephone' => 'string',
            'genre' => 'string',
            'date_naissance' => 'string'
        ]);

        $validatedData['password'] = Hash::make($validatedData['nom'].$validatedData['prenom']);
        
        $fournisseur->update($validatedData);

        return response()->json($fournisseur, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $fournisseur = User::where('id', $id)
            ->where('role', 'fournisseur')
            ->firstOrFail();

        $fournisseur->delete();
        return response()->json(['message' => 'Fournisseur avec id ' . $fournisseur->id . ' effacer avec succés'], 200);
    }
}
