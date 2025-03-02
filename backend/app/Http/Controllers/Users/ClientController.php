<?php

namespace App\Http\Controllers\Users;

use App\Enums\RoleEnum;
use App\Http\Controllers\Controller;
use App\Models\Panier;
use App\Models\Users\Client;
use App\Models\Users\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class ClientController extends Controller implements HasMiddleware
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
        return Client::where('role', 'client')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function register(Request $request){
        
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

        $user = Client::create($validatedData);
        
        $panier = Panier::create([
            'client_id' => $user->id
        ]);

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
        $client = Client::findOrFail($id);
        return response()->json($client);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Client $client)
    {
        $validatedData = $request->validate([
            'nom' => 'required|max:255',
            'prenom' => 'required|max:255',
            'email' => [
                'required',
                'email',
                Rule::unique('users')->ignore($client->id),
            ],
            'telephone' => 'required|string|max:20',
            'region' => 'required|string|max:100',
            'ville' => 'required|string|max:100',
            'adresse' => 'required|string|max:255',
        ]);

        $client->update($validatedData);
        
        return response()->json($client, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $client = Client::findOrFail($id);
        $client->delete();
        return response()->json(['message' => 'Client avec id ' . $client->id . ' effacer avec succés'], 200);
    }
}
