<?php

namespace App\Http\Controllers;

use App\Enums\JourEnum;
use App\Enums\StatusDriveEnum;
use App\Models\Drive;
use App\Models\Horaire;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Validation\Rule;

class DriveController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except:['index','show'])
        ];
    }

    public function index(Request $request)
    {
        if (!$request->hasAny(['search', 'sort_by', 'sort_order', 'per_page'])) {
            return response()->json(Drive::with('horaires.periodesHoraires','jourFeries')->get());
        }

        $query = Drive::query();

        if ($request->has('search') && !empty($request->search)) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('nom', 'LIKE', "%{$searchTerm}%")
                  ->orWhere('region', 'LIKE', "%{$searchTerm}%")
                  ->orWhere('ville', 'LIKE', "%{$searchTerm}%")
                  ->orWhere('status', 'LIKE', "%{$searchTerm}%");
            });
        }

        if (Schema::hasColumn('drives', $request->input('sort_by'))) {
            $query->orderBy($request->input('sort_by'), $request->input('sort_order'));
        }
        
        $categories = $query->paginate($request->input('per_page'));

        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nom' => 'required|max:255',
            'adresse' => 'required|string|max:255',
            'region' => 'required|string|max:100',
            'ville' => 'required|string|max:100',
            'responsable_id' => ['nullable', Rule::exists('users', 'id')->where('role', 'responsable')],
            'status' => [Rule::in(StatusDriveEnum::values())],
        ]);
        
        if(!$validatedData['responsable_id']) {
            $validatedData['status'] = StatusDriveEnum::Inactif->value;
        }

        $drive = Drive::create($validatedData);

        foreach (JourEnum::values() as $jour) {
            DB::table('horaires')->insert([
                'drive_id' => $drive->id,
                'jour' => $jour,
                'ouvert' => $jour !== 'Dimanche' ? true : false ,
            ]);
        }

        return response()->json([
            'message' => 'Drive ajouter avec succès',
            'data' => $drive
        ], 201);
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
            'responsable_id' => ['nullable', Rule::exists('users', 'id')->where('role', 'responsable')],
            'status' => [Rule::in(StatusDriveEnum::values())],
        ]);
        
        if(!$validatedData['responsable_id']) {
            $validatedData['status'] = StatusDriveEnum::Inactif->value;
        }

        $drive->update($validatedData);

        return response()->json([
            'message' => 'Drive mise à jour avec succès',
            'data' => $drive
        ], 200);
    }

    public function destroy($id)
    {
        $drive = Drive::findOrFail($id);
        $drive->delete();
        
        return response()->json([
            'message' => 'Drive supprimée avec succès'
        ], 200);    
    }
}