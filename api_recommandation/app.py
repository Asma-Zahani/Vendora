from flask import Flask, request, jsonify
from flask_cors import CORS
from utils import (filtrer_produits_preferes, load_user_by_id, load_produits, load_interactions, get_preferences_model, get_interactions_model)
from tensorflow.keras.models import load_model
from utils import get_user_id_mapping, get_produit_id_mapping

app = Flask(__name__)
CORS(app)

@app.route("/recommander-produits", methods=["POST"])
def recommander_produits():
    modele_interactions = load_model('modele_recommandation.h5')
    user_id_mapping = get_user_id_mapping()
    produit_id_mapping = get_produit_id_mapping()
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
        
        user_encoded = user_id_mapping.get(user_id)

        produits['produit_id_encoded'] = produits['produit_id'].map(produit_id_mapping)
        produits = produits.dropna(subset=['produit_id_encoded'])  # Supprime les produits inconnus

        # On crée les interactions fictives pour tous les produits (si pas d'interaction passée)
        produits['user_id'] = user_id
        produits['user_id_encoded'] = user_encoded
        produits['vue_produit'] = 0
        produits['favori'] = 0
        produits['ajout_panier'] = 0
        produits['achat'] = 0

        # Puis on remplace avec les vraies interactions de l'utilisateur
        interactions_user = interactions[interactions['user_id'] == user_id]
        produits = produits.merge(
            interactions_user[['produit_id', 'vue_produit', 'favori', 'ajout_panier', 'achat']],
            on='produit_id', how='left', suffixes=('', '_inter'))
        
        for col in ['vue_produit', 'favori', 'ajout_panier', 'achat']:
            produits[col] = produits[f"{col}_inter"].fillna(produits[col])
            produits.drop(columns=[f"{col}_inter"], inplace=True)

        # Préparer les données pour le modèle
        X_input = {
            'user_id': produits['user_id_encoded'].astype('int32'),
            'produit_id': produits['produit_id_encoded'].astype('int32'),
            'vue_produit': produits['vue_produit'].astype('float32'),
            'favori': produits['favori'].astype('float32'),
            'ajout_panier': produits['ajout_panier'].astype('float32'),
            'achat': produits['achat'].astype('float32')
        }

        # Prédire les scores
        predictions = modele_interactions.predict(X_input, verbose=0).flatten()
        produits['score'] = predictions

        top_produits = produits.sort_values(by='score', ascending=False).head(8)

        return jsonify({
            "message": "Produits recommandés basés sur le modèle d'interactions.",
            "data": top_produits.drop(columns=['user_id_encoded', 'produit_id_encoded', 'user_id', 'score']).to_dict(orient="records")
        }), 200



@app.route("/")
def home():
    return "Hello from Flask on Railway!"

if __name__ == '__main__':
    app.run(debug=True)