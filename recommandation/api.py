from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
import requests
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

app = Flask(__name__)

url = "http://localhost:8000/api"
response_produits = requests.get(url + "/produits")
response_interactions = requests.get(url + "/interactions")

if response_produits.status_code == 200:
    df_products = pd.DataFrame(response_produits.json())

if response_interactions.status_code == 200:
    df_interactions = pd.DataFrame(response_interactions.json())

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "API de recommandation opérationnelle"})

if df_interactions.empty:
    # Extraire les donnée depuis le JSON imbriqué
    df_products["categorie_titre"] = df_products["sous_categorie"].apply(lambda sc: sc["categorie"]["titre"] if sc and "categorie" in sc else "")
    df_products["marque_nom"] = df_products["marque"].apply(lambda m: m["nom"] if isinstance(m, dict) and "nom" in m else "")

    df_products["text_features"] = df_products["categorie_titre"] + " " + df_products["marque_nom"] + " " + df_products["prix"]
    tfidf = TfidfVectorizer()
    tfidf_matrix = tfidf.fit_transform(df_products["text_features"])
    product_similarity = cosine_similarity(tfidf_matrix)
    product_similarity_df = pd.DataFrame(product_similarity, index=df_products["produit_id"], columns=df_products["produit_id"])
else :
    interaction_matrix = df_interactions.pivot_table(index="user_id", columns="produit_id", aggfunc="size", fill_value=0)
    product_similarity = cosine_similarity(interaction_matrix.T)  # Calculer la similarité entre les produits (Transposer pour comparer les produits)
    product_similarity_df = pd.DataFrame(product_similarity, index=interaction_matrix.columns, columns=interaction_matrix.columns)

########## Recommandation Basée sur les Achats Similaires (Collaborative Filtering)
@app.route("/recommend_similar_products", methods=["POST"])
def recommend_similar_products():
    data = request.get_json()
    product_id = data.get("product_id")

    if product_similarity_df.empty:
        return jsonify({"error": "Pas assez de données pour générer des recommandations"}), 400

    if product_id not in product_similarity_df.index:
        return jsonify({"error": "Produit inconnu"}), 400

    similar_product_ids = product_similarity_df[product_id].sort_values(ascending=False).index[1:6]
    similar_products = df_products[df_products["produit_id"].isin(similar_product_ids)]

    return jsonify({"similar_products": similar_products.to_dict(orient="records")})

########## Recommandation Basée sur la Popularité
@app.route("/popular_products", methods=["GET"])
def popular_products():
    popular_product_ids = df_interactions["produit_id"].value_counts().index[:5]
    popular_products = df_products[df_products["produit_id"].isin(popular_product_ids)]
    
    return jsonify({"popular_products": popular_products.to_dict(orient="records")})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)