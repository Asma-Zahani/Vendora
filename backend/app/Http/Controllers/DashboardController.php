<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use App\Models\User;
use Carbon\Carbon;

class DashboardController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum')
        ];
    }
    
    public function genreCount()
    {
        return response()->json([
            'Male' => User::where('genre', 'Male')->count(),
            'Femelle' => User::where('genre', 'Femelle')->count(),
        ]);
    }

    public function ageCount()
    {
        $now = Carbon::now();

        $enfant = User::whereDate('date_naissance', '>', $now->copy()->subYears(13))->count();

        $jeune = User::whereDate('date_naissance', '<=', $now->copy()->subYears(13))
                    ->whereDate('date_naissance', '>', $now->copy()->subYears(25))
                    ->count();

        $adulte = User::whereDate('date_naissance', '<=', $now->copy()->subYears(25))->count();

        return response()->json([
            'Enfant' => $enfant,
            'Jeune' => $jeune,
            'Adulte' => $adulte,
        ]);
    }
}
