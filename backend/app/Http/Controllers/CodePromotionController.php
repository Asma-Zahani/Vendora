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
            'dateExpiration' => 'required|date|after:today',
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
    $codePromo = CodePromotion::find($id);

    if (!$codePromo) {
        return response()->json(['message' => 'Code promotion non trouvé'], 404);
    }

    return response()->json($codePromo);
}


    public function getPromoByName($code)
    {
        // Chercher le code promo dans la base de données
        $codePromotion = CodePromotion::where('code', $code)->first();

        // Vérifier si le code promo existe
        if (!$codePromotion) {
            // Si non trouvé, renvoyer une réponse avec promoFound = false
            return response()->json([
                'promoFound' => false,
                'message' => "Code promotion '$code' non trouvé."
            ], 200); // Utilisez 200 pour éviter l'erreur 404
        }

        // Si trouvé, renvoyer les détails de la promotion
        return response()->json([
            'promoFound' => true,
            'promotion' => $codePromotion
        ], 200); // Code 200 pour indiquer que la requête a réussi
    }


    public function update(Request $request, $id)
    {
        $codePromotion = CodePromotion::findOrFail($id);

        $validatedData = $request->validate([
            'code' => ['required', 'string', 'max:120', Rule::unique('code_promotions')->ignore($codePromotion->code_promotion_id, 'code_promotion_id')],
            'reduction' => 'required|numeric|min:0|max:99.99',
            'dateExpiration' => 'required|date|after:today',
            'nbUtilisationMax' => 'required|integer|min:1',
            'nbUtilisation' => 'required|integer|min:0|lte:nbUtilisationMax'
        ]);

        if ($validatedData['nbUtilisation'] > $validatedData['nbUtilisationMax']) {
            return response()->json(['errors' => 'nbUtilisation ne peut pas dépasser nbUtilisationMax'], 404);
        }
        
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

    public function utiliserCodePromotionnel($codePromotionId)
    {
        $codePromotion = CodePromotion::findOrFail($codePromotionId);

        if ($codePromotion->nbUtilisation >= $codePromotion->nbUtilisationMax) {
            return response()->json(['message' => 'Le code promotionnel a atteint sa limite d\'utilisation.'], 400);
        }

        // Incrémenter nbUtilisation
        $codePromotion->nbUtilisation += 1;
        $codePromotion->save();

        return response()->json([
            'message' => 'Code promotionnel utilisé avec succès !',
            'data' => $codePromotion
        ]);
            }
}
