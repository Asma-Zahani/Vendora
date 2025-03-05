<?php

namespace App\Http\Controllers;

use App\Enums\StatusDriveEnum;
use App\Models\Drive;
use App\Models\Horaire;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Validation\Rule;

class DriveController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except:['index','show'])
        ];
    }

    public function index()
    {
        return Drive::all();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nom' => 'required|max:255',
            'adresse' => 'required|string|max:255',
            'region' => 'required|string|max:100',
            'ville' => 'required|string|max:100',
            'status' => [Rule::in(StatusDriveEnum::values())],
        ]);
        
        $drive = Drive::create($validatedData);

        return response()->json($drive, 200);
    }

    public function show($id)
    {
        $drive = Drive::findOrFail($id);
        return response()->json($drive);
    }

    public function update(Request $request, $id)
    {
        $drive = Drive::findOrFail($id);

        $validatedData = $request->validate([
            'nom' => 'required|max:255',
            'adresse' => 'required|string|max:255',
            'region' => 'required|string|max:100',
            'ville' => 'required|string|max:100',
            'status' => [Rule::in(StatusDriveEnum::values())],
        ]);
        
        $drive->update($validatedData);

        return response()->json($drive, 200);
    }

    public function destroy($id)
    {
        $drive = Drive::findOrFail($id);
        $drive->delete();
        return response()->json(['message' => 'Drive supprimé avec succès'], 200);
    }
}