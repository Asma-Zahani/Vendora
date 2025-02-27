<?php

namespace App\Http\Controllers;

use App\Models\Marque;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class MarqueController extends Controller implements HasMiddleware
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
        return Marque::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nom' => 'required|string|max:255',
            'image' => 'required|string|max:255'
        ]);
        
        $marque = Marque::create($validatedData);

        return response()->json($marque, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $marque = Marque::findOrFail($id);
        return response()->json($marque);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $marque = Marque::findOrFail($id);

        $validatedData = $request->validate([
            'nom' => 'required|string|max:255',
            'image' => 'required|string|max:255'
        ]);
        
        $marque->update($validatedData);

        return response()->json($marque, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $marque = Marque::findOrFail($id);
        $marque->delete();
        return response()->json(['message' => 'Marque avec id ' . $marque->marque_id . ' effacer avec succés'], 200);
    }
}
