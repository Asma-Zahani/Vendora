from flask import Flask, request, jsonify
from flask_cors import CORS
from utils import (load_user_by_id, load_produits, load_interactions, produits_populaires, generer_recommandations_par_preferences, generer_recommandations_par_interactions, generer_similarite_produits)

app = Flask(__name__)
CORS(app)

@app.route("/recommend_produits", methods=["POST"])
def recommend_produits():
    data = request.get_json()
    user_id = data.get('user_id')

    interactions = load_interactions()
    
    if not isinstance(data, dict) or "user_id" not in data:
        return jsonify({"message": "user_id is required", "data": produits_populaires(interactions)}), 200

    user = load_user_by_id(user_id)
    user_interactions = interactions[interactions["user_id"] == user_id]
    
    if not user_interactions.empty:
        nb_interactions = user_interactions.shape[0]
        if nb_interactions > 5:
            return jsonify({"message": "Recommandation basée sur les interactions.", "data": generer_recommandations_par_interactions(user_interactions)}), 200
    return jsonify({"message": "Cet utilisateur n'existe pas dans les interactions ou nombre d'interactions insuffisant", "data": generer_recommandations_par_preferences(user)}), 200

@app.route("/recommend_similar_produits", methods=["POST"])
def recommend_similar_produits():
    data = request.get_json()
    produit_id = data.get("produit_id")
    produit_ids = data.get("produit_ids")
    interaction_type = data.get("interaction_type")

    produits = load_produits()
    interactions = load_interactions()

    if produit_id is not None:
        produit_id = int(produit_id)

    if not ((produit_id and interaction_type) or (produit_ids and interaction_type)):
        return jsonify({"error": "Data manquante"}), 400
    
    produit_similaire = generer_similarite_produits(interactions, produits, interaction_type, produit_id)
    
    if produit_id is not None:
        produit_similaire_ids = produit_similaire[produit_id].sort_values(ascending=False).index[1:9]
        produits_similaires = produits[produits["produit_id"].isin(produit_similaire_ids)]
    else :
        produit_ids = [int(pid) for pid in produit_ids]
        similarity_scores = (produit_similaire.loc[produit_ids].mean(axis=0).sort_values(ascending=False)).drop(produit_ids, errors="ignore")
        produits_similaires = produits[produits["produit_id"].isin(similarity_scores.head(8).index.tolist())]

    return jsonify({"data": produits_similaires.to_dict(orient="records")})

@app.route("/")
def home():
    return "Hello from Flask!"

if __name__ == '__main__':
    app.run(debug=True)