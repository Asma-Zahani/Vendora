<?php

use App\Http\Controllers\AuthController;
use App\Mail\LoginSuccessEmail;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;

Route::post('/register', [AuthController::class, 'register']);

Route::post('/clients', [AuthController::class, 'createClient'])->middleware('auth:sanctum');

Route::post('/livreurs', [AuthController::class, 'createLivreur'])->middleware('auth:sanctum');

Route::post('/responsables', [AuthController::class, 'createResponsable'])->middleware('auth:sanctum');

Route::post('login', [AuthController::class,'login']);

Route::post('autoLogin', [AuthController::class,'autoLogin']);

Route::post('/email/resend', [AuthController::class,'resend']);

Route::post('logout', [AuthController::class,'logout'])->middleware('auth:sanctum');

Route::put('/updatePassword/{id}', [AuthController::class, 'updatePassword'])->middleware('auth:sanctum');

Route::post('/auth/verify-email', [AuthController::class, 'verifyEmail']);

Route::post('/forgot-password', [AuthController::class, 'sendResetLink']);

Route::post('/forgot-password/resend', [AuthController::class, 'resendResetLink']);

Route::post('/reset-password', [AuthController::class, 'reset']);
