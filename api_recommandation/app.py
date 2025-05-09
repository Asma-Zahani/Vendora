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
    
    # Cas où l'utilisateur a des interactions
    nb_interactions = user_interactions.shape[0]

    if nb_interactions < 10:  # Si l'utilisateur a moins de 10 interactions
        print(f"Utilisateur {user_id} a {nb_interactions} interactions. Recommandation basée sur les produits populaires.")
        
        # Produits populaires basés sur les achats
        produit_populaire = interactions.groupby("produit_id")["achat"].sum().sort_values(ascending=False)
        top_ids = produit_populaire.head(8).index.tolist()
        produits_recommandes = produits[produits["produit_id"].isin(top_ids)]

        return jsonify({
            "message": "Produits recommandés basés sur la popularité.",
            "data": produits_recommandes.to_dict(orient="records")
        }), 200

    else:
        print(f"Utilisateur {user_id} a {nb_interactions} interactions. Recommandation basée sur ses interactions.")
        
        # Ajouter les informations utilisateur et produit
        user_df = user.to_frame().T
        user_interactions = user_interactions.merge(user_df, on='user_id', how='left')
        user_interactions = user_interactions.merge(produits, on='produit_id', how='left')

        colonnes_requises = ["user_id", "produit_id", "age", "genre", "categorie_id", "marque_id", "prix"]
        if not all(col in user_interactions.columns for col in colonnes_requises):
            return jsonify({"message": "Colonnes manquantes dans les données pour la recommandation."}), 500

        # Prédiction des scores
        X_user = user_interactions[colonnes_requises]
        X_user['score'] = get_interactions_model().predict(X_user)

        # Produits avec les meilleurs scores
        top_scores = X_user.sort_values(by='score', ascending=False).head(1)
        top_categories = top_scores["categorie_id"].unique().tolist()

        # Recommander d'autres produits dans les mêmes catégories
        candidats = produits[produits["categorie_id"].isin(top_categories)]

        # Éviter les doublons déjà vus par l'utilisateur
        deja_interaction = user_interactions["produit_id"].tolist()
        candidats = candidats[~candidats["produit_id"].isin(deja_interaction)]

        # Préparer les features pour prédire le score sur les nouveaux candidats
        candidats = candidats.copy()
        for col in ["user_id", "age", "genre"]:
            candidats[col] = user_df.iloc[0][col]

        X_candidats = candidats[["user_id", "produit_id", "age", "genre", "categorie_id", "marque_id", "prix"]]
        candidats["score"] = get_interactions_model().predict(X_candidats)

        # Trier et sélectionner les meilleurs produits
        produits_recommandes = candidats.sort_values(by='score', ascending=False).head(8)

        return jsonify({
            "message": "Recommandation basée sur les interactions et catégories similaires.",
            "data": produits_recommandes.to_dict(orient="records")
        }), 200


@app.route("/")
def home():
    return "Hello from Flask on Railway!"

if __name__ == '__main__':
    app.run(debug=True)