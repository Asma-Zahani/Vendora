from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
import requests
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

app = Flask(__name__)

url_api = "http://localhost:8000/api"
reponse_produits = requests.get(url_api + "/produits")
reponse_interactions = requests.get(url_api + "/interactions")

if reponse_produits.status_code == 200:
    df_produits = pd.DataFrame(reponse_produits.json())

if reponse_interactions.status_code == 200:
    df_interactions = pd.DataFrame(reponse_interactions.json())

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "API de recommandation opérationnelle"})

def obtenir_matrice_similarite_produits(type_interaction):
    if df_interactions.empty:
        # Extraire les données depuis le JSON imbriqué
        df_produits["categorie_titre"] = df_produits["sous_categorie"].apply(
            lambda sc: sc["categorie"]["titre"] if sc and "categorie" in sc else ""
        )
        df_produits["nom_marque"] = df_produits["marque"].apply(
            lambda m: m["nom"] if isinstance(m, dict) and "nom" in m else ""
        )

        df_produits["caracteristiques_texte"] = (
            df_produits["categorie_titre"] + " "
            + df_produits["nom_marque"]
            + " " + df_produits["prix"]
        )

        vecteur_tfidf = TfidfVectorizer()
        matrice_tfidf = vecteur_tfidf.fit_transform(df_produits["caracteristiques_texte"])
        similarite_produits = cosine_similarity(matrice_tfidf)
        matrice_similarite_produits = pd.DataFrame(
            similarite_produits,
            index=df_produits["produit_id"],
            columns=df_produits["produit_id"]
        )
    else:
        interactions_filtrees = df_interactions[
            df_interactions["interaction_type"] == type_interaction
        ]

        matrice_interaction = interactions_filtrees.pivot_table(
            index="user_id",
            columns="produit_id",
            aggfunc="size",
            fill_value=0
        )

        similarite_produits = cosine_similarity(matrice_interaction.T)
        matrice_similarite_produits = pd.DataFrame(
            similarite_produits,
            index=matrice_interaction.columns,
            columns=matrice_interaction.columns
        )

    return matrice_similarite_produits


########## Recommandation basée sur la similarité (filtrage collaboratif)
@app.route("/recommander_produits_similaires", methods=["POST"])
def recommander_produits_similaires():
    donnees = request.get_json()
    identifiant_produit = donnees.get("produit_id")
    type_interaction = donnees.get("interaction_type", "panier")

    if identifiant_produit is None:
        return jsonify({"erreur": "Le produit est requis"}), 400

    matrice_similarite_produits = obtenir_matrice_similarite_produits(type_interaction)

    if matrice_similarite_produits.empty:
        return jsonify({"erreur": "Pas assez de données pour générer des recommandations"}), 400

    if identifiant_produit not in matrice_similarite_produits.index:
        return jsonify({"erreur": "Produit inconnu"}), 400

    ids_produits_similaires = matrice_similarite_produits[identifiant_produit].sort_values(ascending=False).index[1:6]
    produits_similaires = df_produits[df_produits["produit_id"].isin(ids_produits_similaires)]

    return jsonify({"produits_similaires": produits_similaires.to_dict(orient="records")})


########## Recommandation basée sur la popularité
@app.route("/produits_populaires", methods=["GET"])
def produits_populaires():
    ids_produits_populaires = df_interactions["produit_id"].value_counts().index[:5]
    produits_populaires = df_produits[df_produits["produit_id"].isin(ids_produits_populaires)]

    return jsonify({"produits_populaires": produits_populaires.to_dict(orient="records")})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
