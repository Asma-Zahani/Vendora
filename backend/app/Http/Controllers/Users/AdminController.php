<?php

namespace App\Http\Controllers\Users;

use App\Enums\RoleEnum;
use App\Http\Controllers\Controller;
use App\Models\Users\Admin;
use App\Models\Users\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller implements HasMiddleware
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
        return User::where('role', 'admin')->get();
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
            'password' => 'required|confirmed',
            'telephone' => 'string',
            'genre' => 'string',
            'date_naissance' => 'string'
        ]);

        $validatedData['role'] = RoleEnum::ADMIN->value;

        $validatedData['password'] = Hash::make($validatedData['password']);

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
        $admin = User::where('id', $id)
            ->where('role', 'admin')
            ->firstOrFail();
        return response()->json($admin);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $admin = User::where('id', $id)
            ->where('role', 'admin')
            ->firstOrFail();
        
        $validatedData = $request->validate([
            'nom' => 'required|max:255',
            'prenom' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
            'telephone' => 'string',
            'genre' => 'string',
            'date_naissance' => 'string'
        ]);

        $validatedData['password'] = Hash::make($validatedData['password']);
        
        $admin->update($validatedData);

        return response()->json($admin, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $admin = User::where('id', $id)
            ->where('role', 'admin')
            ->firstOrFail();
        $admin->delete();
        return response()->json(['message' => 'Admin avec id ' . $admin->id . ' effacer avec succés'], 200);
    }
}
