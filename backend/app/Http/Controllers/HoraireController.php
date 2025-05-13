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
            new Middleware('auth:sanctum')
        ];
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
}