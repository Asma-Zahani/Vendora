from flask import Flask, request, jsonify
from flask_cors import CORS
from utils import (filtrer_produits_preferes, load_user_by_id, load_produits, load_interactions, get_preferences_model, get_interactions_model)

app = Flask(__name__)
CORS(app)

@app.route("/recommander-produits", methods=["POST"])
def recommander_produits():
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
    
    if user_interactions.empty:
        produits_filtres = filtrer_produits_preferes(user, produits)
        produits_filtres['user_id'] = user["user_id"]

        produits_filtres = produits_filtres.merge(user.to_frame().T, on='user_id', how='left')
        X = produits_filtres[['user_id', 'produit_id', 'genre', 'age', 'categorie_id', 'marque_id', 'prix']]

        X['label'] = get_preferences_model().predict_proba(X)[:, 1]
        top_reco = X.sort_values(by='label', ascending=False).head(8)

        recommended_ids = top_reco["produit_id"].tolist()
        produits_recommandes = produits[produits["produit_id"].isin(recommended_ids)]

        return jsonify({"message": "Cet utilisateur n'existe pas dans les interactions.", "data": produits_recommandes.to_dict(orient="records")}), 200
    
    # # Trouver tous les produits que l'utilisateur a déjà vus
    # produits_vus_ids = interactions[interactions["user_id"] == user_id]["produit_id"].unique()

    # # Filtrer les produits que l'utilisateur n’a PAS encore vus
    # produits_a_predire = produits[~produits["produit_id"].isin(produits_vus_ids)].copy()

    # # Répéter les infos utilisateur pour tous les produits
    # produits_a_predire["user_id"] = user["user_id"]
    # produits_a_predire = produits_filtres.merge(user.to_frame().T, on='user_id', how='left')

    # # Vérifier les colonnes requises
    # required_cols = ['user_id', 'produit_id', 'genre', 'age', 'categorie_id', 'marque_id', 'prix']
    # if not all(col in produits_a_predire.columns for col in required_cols):
    #     return jsonify({'error': f"Colonnes manquantes pour prédiction: {required_cols}"}), 400

    # # Prédire les scores
    # X_pred = produits_a_predire[required_cols].copy()
    # produits_a_predire["predicted_score"] = get_interactions_model().predict(X_pred)

    # # Trier par score
    # top_reco = produits_a_predire.sort_values("predicted_score", ascending=False).head(10)

    # recommended_ids = top_reco["produit_id"].tolist()
    # produits_recommandes = produits[produits["produit_id"].isin(recommended_ids)]
    
    # return jsonify({"message": "Recommandation basée sur les interactions de l'utilisateur.", "data": produits_recommandes.to_dict(orient="records")}), 200
    return jsonify({"message": "Recommandation basée sur les interactions de l'utilisateur."}), 200


@app.route("/")
def home():
    return "Hello from Flask on Railway!"

if __name__ == '__main__':
    app.run(debug=True)