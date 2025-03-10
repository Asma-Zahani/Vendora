<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);

Route::post('/createClient', [AuthController::class, 'createClient'])->middleware('auth:sanctum');

Route::post('/createLivreur', [AuthController::class, 'createLivreur'])->middleware('auth:sanctum');

Route::post('login', [AuthController::class,'login']);

Route::post('logout', [AuthController::class,'logout'])->middleware('auth:sanctum');

Route::put('/updatePassword/{id}', [AuthController::class, 'updatePassword'])->middleware('auth:sanctum');
