<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Mail\ContactEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function contact(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'email' => 'required|email',
            'message' => 'required|string',
        ]);

        Mail::to('vendora.shop.contact@gmail.com')->send(new ContactEmail($validated['nom'], $validated['email'], $validated['message']));

        return response()->json(['message' => 'Votre message a été envoyé avec succès.'], 201);
    }

}
