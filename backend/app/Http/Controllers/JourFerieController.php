<?php

namespace App\Http\Controllers;

use App\Models\Drive;
use App\Models\JourFerie;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Schema;

class JourFerieController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except:['index','show'])
        ];
    }

    /**
     * Affiche la liste des jours fériés.
     */
    public function index(Request $request)
    {
        return response()->json(JourFerie::all());
    }

    /**
     * Enregistre un nouveau jour férié.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'drive_id' => ['required', 'exists:drives,drive_id'],
            'title' => 'required|string|max:255',
            'start' => 'required|date',
            'end' => 'required|date',
            'all' => 'boolean',
        ]);
        
        if ($validatedData["all"] === true) {
            $drives = Drive::all();
            foreach ($drives as $drive) {
                JourFerie::create([
                    'drive_id' => $drive->drive_id,
                    'title' => $validatedData['title'],
                    'start' => $validatedData['start'],
                    'end' => $validatedData['end'],
                ]);
            }
        } else {
            $jourFerie = JourFerie::create($validatedData);
        }

        return response()->json([
            'message' => 'Jour férié ajouter avec succès',
            'data' => $jourFerie
        ], 201);
    }

    public function show($id)
    {
        $jourFerie = JourFerie::findOrFail($id);
        return response()->json($jourFerie);
    }
    
    public function getJourFerieByDrive($id) {
        $joursFeries = JourFerie::where('drive_id', $id)->get();    
        return response()->json($joursFeries);
    }    

    public function update(Request $request, $id)
    {
        $jourFerie = JourFerie::findOrFail($id);

        $validatedData = $request->validate([
            'drive_id' => ['required', 'exists:drives,drive_id'],
            'title' => 'required|string|max:255',
            'start' => 'required|date',
            'end' => 'required|date',
        ]);
        
        $jourFerie->update($validatedData);

        return response()->json([
            'message' => 'Jour férié mise à jour avec succès',
            'data' => $jourFerie
        ], 200);
    }

    /**
     * Supprime un jour férié.
     */
    public function destroy($id)
    {
        $jourFerie = JourFerie::findOrFail($id);
        $jourFerie->delete();
        
        return response()->json([
            'message' => 'Jour férié supprimée avec succès'
        ], 200);    
    }
}
