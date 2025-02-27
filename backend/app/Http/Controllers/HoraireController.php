<?php

namespace App\Http\Controllers;

use App\Enums\JourEnum;
use App\Models\Horaire;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Validation\Rule;

class HoraireController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except:['index','show'])
        ];
    }

    public function index()
    {
        return Horaire::all();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'jour' => [
                'required',
                'string',
                'unique:horaires,jour',
                Rule::in(JourEnum::cases()),
            ],
            'ouvert' => 'required|boolean',
        ]);
        
        $horaire = Horaire::create($validatedData);

        return response()->json($horaire, 200);
    }

    public function show($id)
    {
        $horaire = Horaire::findOrFail($id);
        return response()->json($horaire);
    }

    public function update(Request $request, $id)
    {
        $horaire = Horaire::findOrFail($id);

        $validatedData = $request->validate([
            'jour' => [
                'required',
                'string',
                'unique:horaires,jour',
                Rule::in(JourEnum::cases()),
            ],
            'ouvert' => 'required|boolean',
        ]);
        
        $horaire->update($validatedData);

        return response()->json($horaire, 200);
    }

    public function destroy($id)
    {
        $horaire = Horaire::findOrFail($id);
        $horaire->delete();
        return response()->json(['message' => 'Horaire supprimé avec succès'], 200);
    }
}