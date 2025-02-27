<?php

namespace App\Http\Controllers\Users;

use App\Enums\RoleEnum;
use App\Http\Controllers\Controller;
use App\Models\Users\Client;
use App\Models\Users\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Hash;

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

        $validatedData['role'] = RoleEnum::CLIENT->value;

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
        $client = Client::findOrFail($id);
        return response()->json($client);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Client $client)
    {
        //
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
