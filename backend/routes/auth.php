<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\PasswordController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [RegisterController::class, 'register']);

Route::post('login', [LoginController::class,'login']);

Route::post('logout', [LoginController::class,'logout'])->middleware('auth:sanctum');

Route::put('/updatePassword/{id}', [PasswordController::class, 'updatePassword'])->middleware('auth:sanctum');
