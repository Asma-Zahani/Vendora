from flask import Flask, request, jsonify
from utils import (
    users, produits, interactions,
    filtrer_produits_preferes, get_model , get_modelInteraction
)

app = Flask(__name__)

@app.route("/recommander-produits", methods=["POST"])
def recommander_produits():
    data = request.get_json()

    if not isinstance(data, dict) or "user_id" not in data:
        produits_populaires = interactions.groupby("produit_id")["achat"].sum().sort_values(ascending=False)
        top_ids = produits_populaires.head(8).index.tolist()
        produits_recommandes = produits[produits["produit_id"].isin(top_ids)]

        return jsonify({"message": "user_id is required", "data": produits_recommandes.to_dict(orient="records")}), 200

    user_id = data["user_id"]

    user_interactions = interactions[interactions["user_id"] == user_id]

    if user_interactions.empty:
        model = get_model()
        user = users[users['user_id'] == user_id].iloc[0]

        produits_filtres = filtrer_produits_preferes(user, produits)
        produits_filtres['user_id'] = user_id

        produits_filtres = produits_filtres.merge(user.to_frame().T, on='user_id', how='left')
        X = produits_filtres[['user_id', 'produit_id', 'genre', 'age', 'categorie_id', 'marque_id', 'prix']]
        X['label'] = model.predict_proba(X)[:, 1]
        top_reco = X.sort_values(by='label', ascending=False).head(8)

        recommended_ids = top_reco["produit_id"].tolist()
        produits_recommandes = produits[produits["produit_id"].isin(recommended_ids)]

        return jsonify({"message": "Cet utilisateur n'existe pas dans les interactions.", "data": produits_recommandes.to_dict(orient="records")}), 200

    if len(user_interactions) < 10:
        produits_populaires = interactions.groupby("produit_id")["achat"].sum().sort_values(ascending=False)
        top_ids = produits_populaires.head(10).index.tolist()
        produits_recommandes = produits[produits["produit_id"].isin(top_ids)]
        return jsonify({"message": "Pas assez d'interactions. Recommandation basée sur les produits populaires.", "data": produits_recommandes.to_dict(orient="records")}), 200
        
   # Charger le modèle d'interaction
    model_Interaction = get_modelInteraction()

    # Trouver tous les produits que l'utilisateur a déjà vus
    produits_vus_ids = interactions[interactions["user_id"] == user_id]["produit_id"].unique()

    # Filtrer les produits que l'utilisateur n’a PAS encore vus
    produits_a_predire = produits[~produits["produit_id"].isin(produits_vus_ids)].copy()

    # Ajouter les infos utilisateur
    user_info = users[users["user_id"] == user_id].iloc[0]  # Une seule ligne

    # Répéter les infos utilisateur pour tous les produits
    produits_a_predire["user_id"] = user_info["user_id"]
    produits_a_predire["genre"] = user_info["genre"]
    produits_a_predire["age"] = user_info["age"]

    # Vérifier les colonnes requises
    required_cols = ['user_id', 'produit_id', 'genre', 'age', 'categorie_id', 'marque_id', 'prix']
    if not all(col in produits_a_predire.columns for col in required_cols):
        return jsonify({'error': f"Colonnes manquantes pour prédiction: {required_cols}"}), 400

    # Prédire les scores
    X_pred = produits_a_predire[required_cols].copy()
    produits_a_predire["predicted_score"] = model_Interaction.predict(X_pred)

    # Trier par score
    top_reco = produits_a_predire.sort_values("predicted_score", ascending=False).head(10)

    # Retourner le résultat
    return jsonify({
        "message": "Recommandation basée sur les interactions de l'utilisateur.",
        "data": top_reco.to_dict(orient="records")
    }), 200


@app.route("/")
def home():
    return "Hello from Flask on Railway!"