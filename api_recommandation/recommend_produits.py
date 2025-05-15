from flask import request, jsonify
from utils import (filtrer_produits_preferes, load_user_by_id, load_produits, load_interactions, get_preferences_model, get_interactions_model)

def recommend_produits():
    data = request.get_json()
    user_id = data.get('user_id')

    produits = load_produits()
    interactions = load_interactions()
    
    if not isinstance(data, dict) or "user_id" not in data:
        produits_populaires = interactions.groupby("produit_id")["achat"].sum().sort_values(ascending=False)
        top_ids = produits_populaires.head(8).index.tolist()
        produits_recommandes = produits[produits["produit_id"].isin(top_ids)]

        return jsonify({"message": "user_id is required", "data": produits_recommandes.to_dict(orient="records")}), 200

    user = load_user_by_id(user_id)
    user_interactions = interactions[interactions["user_id"] == user_id]
    
    if not user_interactions.empty:
        nb_interactions = user_interactions.shape[0]
        if nb_interactions > 10:
            return jsonify({"message": "Recommandation basée sur les interactions et catégories similaires."}), 200

    produits_filtres = filtrer_produits_preferes(user, produits)
    produits_filtres['user_id'] = user["user_id"]

    produits_filtres = produits_filtres.merge(user.to_frame().T, on='user_id', how='left')
    X = produits_filtres[['user_id', 'produit_id', 'genre', 'age', 'categorie_id', 'marque_id', 'prix']]

    X['label'] = get_preferences_model().predict_proba(X)[:, 1]
    top_reco = X.sort_values(by='label', ascending=False).head(8)

    recommended_ids = top_reco["produit_id"].tolist()
    produits_recommandes = produits[produits["produit_id"].isin(recommended_ids)]

    return jsonify({"message": "Cet utilisateur n'existe pas dans les interactions ou nombre d'interactions insuffisant", "data": produits_recommandes.to_dict(orient="records")}), 200