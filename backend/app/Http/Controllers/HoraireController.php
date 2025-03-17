<?php

namespace App\Http\Controllers;

use App\Enums\JourEnum;
use App\Models\Horaire;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Schema;
use Illuminate\Validation\Rule;

class HoraireController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except:['index','show'])
        ];
    }

    public function index(Request $request)
    {
        return response()->json(Horaire::with('periodesHoraires')->get());
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'drive_id' => ['required', 'exists:drives,drive_id'],
            'jour' => [
                'required',
                'string',
                'unique:horaires,jour,NULL,NULL,drive_id,' . $request->drive_id, // unique sur drive_id et jour
                Rule::in(JourEnum::cases()),
            ],
            'ouvert' => 'required|boolean',
        ]);
        
        $horaire = Horaire::create($validatedData);

        return response()->json([
            'message' => 'Horaire ajouter avec succès',
            'data' => $horaire
        ], 201);
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
            'drive_id' => ['required', 'exists:drives,drive_id'],
            'jour' => [
                'required',
                'string',
                Rule::in(JourEnum::cases()),
                Rule::unique('horaires')->where(function ($query) use ($request) {
                    return $query->where('drive_id', $request->drive_id);
                })->ignore($id, 'horaire_id'),
            ],
            'ouvert' => 'required|boolean',
        ]);
        
        $horaire->update($validatedData);

        return response()->json([
            'message' => 'Horaire mise à jour avec succès',
            'data' => $horaire
        ], 200);
    }

    public function destroy($id)
    {
        $horaire = Horaire::findOrFail($id);
        $horaire->delete();
        
        return response()->json([
            'message' => 'Horaire supprimée avec succès'
        ], 200);    
    }
}