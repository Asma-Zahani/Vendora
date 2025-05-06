from flask import Flask, request, jsonify
from utils import (filtrer_produits_preferes, get_model, load_users, load_produits, load_interactions)

app = Flask(__name__)

@app.route("/recommander-produits", methods=["POST"])
def recommander_produits():
    data = request.get_json()

    produits = load_produits()
    interactions = load_interactions()
    
    if not isinstance(data, dict) or "user_id" not in data:
        produits_populaires = interactions.groupby("produit_id")["achat"].sum().sort_values(ascending=False)
        top_ids = produits_populaires.head(8).index.tolist()
        produits_recommandes = produits[produits["produit_id"].isin(top_ids)]

        return jsonify({"message": "user_id is required", "data": produits_recommandes.to_dict(orient="records")}), 200

    user_id = data["user_id"]

    user_interactions = interactions[interactions["user_id"] == user_id]

    if user_interactions.empty:
        users = load_users()

        user = users[users['user_id'] == user_id].iloc[0]

        produits_filtres = filtrer_produits_preferes(user, produits)
        produits_filtres['user_id'] = user_id

        produits_filtres = produits_filtres.merge(user.to_frame().T, on='user_id', how='left')
        X = produits_filtres[['user_id', 'produit_id', 'genre', 'age', 'categorie_id', 'marque_id', 'prix']]
        
        model = get_model()

        X['label'] = model.predict_proba(X)[:, 1]
        top_reco = X.sort_values(by='label', ascending=False).head(8)

        recommended_ids = top_reco["produit_id"].tolist()
        produits_recommandes = produits[produits["produit_id"].isin(recommended_ids)]

        return jsonify({"message": "Cet utilisateur n'existe pas dans les interactions.", "data": produits_recommandes.to_dict(orient="records")}), 200

    if len(user_interactions) < 10:
        return jsonify({"message": "Pas assez d'interactions. Recommandation basée sur les produits populaires."}), 200
        
    return jsonify({"message": "Recommandation basée sur les interactions de l'utilisateur."}), 200


@app.route("/")
def home():
    return "Hello from Flask on Railway!"

if __name__ == '__main__':
    app.run(debug=True)