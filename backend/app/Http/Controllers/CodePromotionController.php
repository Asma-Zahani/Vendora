<?php

namespace App\Http\Controllers;

use App\Models\CodePromotion;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Validation\Rule;

class CodePromotionController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except:['index','show'])
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return CodePromotion::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'code' => 'required|string|max:120|unique:code_promotions,code',
            'reduction' => 'required|numeric|min:0|max:99.99',
            'dateExpiration' => 'required|date',
            'nbUtilisationMax' => 'required|integer|min:1'
        ]);
        
        $codePromotion = CodePromotion::create($validatedData);

        return response()->json($codePromotion, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $codePromotion = CodePromotion::findOrFail($id);
        return response()->json($codePromotion);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $codePromotion = CodePromotion::findOrFail($id);

        $validatedData = $request->validate([
            'code' => [
                'required',
                'string',
                'max:120',
                Rule::unique('code_promotions')->ignore($codePromotion->code_promotion_id, 'code_promotion_id'),
            ],
            'reduction' => 'required|numeric|min:0|max:99.99',
            'dateExpiration' => 'required|date',
            'nbUtilisationMax' => 'required|integer|min:1'
        ]);

        $codePromotion->update($validatedData);

        return response()->json($codePromotion, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $codePromotion = CodePromotion::findOrFail($id);
        $codePromotion->delete();
        return response()->json(['message' => 'CodePromotion avec id ' . $codePromotion->code_promotion_id . ' effacer avec succés'], 200);
    }
}
