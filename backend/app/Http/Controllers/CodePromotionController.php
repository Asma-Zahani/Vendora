<?php

namespace App\Http\Controllers;

use App\Models\CodePromotion;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Schema;
use Illuminate\Validation\Rule;

class CodePromotionController extends Controller implements HasMiddleware
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
            return response()->json(CodePromotion::all());
        }

        $query = CodePromotion::query();

        if ($request->has('search') && !empty($request->search)) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('code', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('reduction', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('dateExpiration', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('nbUtilisationMax', 'LIKE', "%{$searchTerm}%")
                  ->orWhere('created_at', 'LIKE', "%{$searchTerm}%");
            });
        }

        if (Schema::hasColumn('code_promotions', $request->input('sort_by'))) {
            $query->orderBy($request->input('sort_by'), $request->input('sort_order'));
        }
        
        $categories = $query->paginate($request->input('per_page'));

        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'code' => 'required|string|max:120|unique:code_promotions,code',
            'reduction' => 'required|numeric|min:0|max:99.99',
            'dateExpiration' => 'required|date',
            'nbUtilisationMax' => 'required|integer|min:1'
        ]);
        
        $codePromotion = CodePromotion::create($validatedData);

        return response()->json([
            'message' => 'Code Promotion ajouter avec succès',
            'data' => $codePromotion
        ], 201);
    }

    public function show($id)
    {
        return response()->json(CodePromotion::findOrFail($id));
    }

    public function getPromoByName($code)
    {
        $codePromotion = CodePromotion::where('code', $code)->first();

        if (!$codePromotion) {
            return response()->json(['message' => 'Code promotion non trouvé'], 404);
        }

        return response()->json($codePromotion);
    }

    public function update(Request $request, $id)
    {
        $codePromotion = CodePromotion::findOrFail($id);

        $validatedData = $request->validate([
            'code' => ['required', 'string', 'max:120', Rule::unique('code_promotions')->ignore($codePromotion->code_promotion_id, 'code_promotion_id')],
            'reduction' => 'required|numeric|min:0|max:99.99',
            'dateExpiration' => 'required|date',
            'nbUtilisationMax' => 'required|integer|min:1'
        ]);

        $codePromotion->update($validatedData);

        return response()->json([
            'message' => 'Code Promotion mise à jour avec succès',
            'data' => $codePromotion
        ], 200);
    }

    public function destroy($id)
    {
        CodePromotion::findOrFail($id)->delete();
        
        return response()->json([
            'message' => 'Code Promotion supprimée avec succès'
        ], 200);    
    }
}
