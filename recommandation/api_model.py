from flask import Flask, request, jsonify
import tensorflow as tf
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

model = tf.keras.models.load_model("mon_modele.h5")

user_ids = df_interactions["user_id"].unique()
product_ids = df_interactions["produit_id"].unique()
user_to_index = {int(user_id): idx for idx, user_id in enumerate(user_ids)}

########## Recommandation personnalisée avec le modèle TensorFlow
@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    user_id = data.get("user_id")

    if user_id not in user_to_index:
        return jsonify({"error": "Utilisateur inconnu"}), 400

    user_idx = np.array([user_to_index[user_id]] * len(product_ids))
    product_idx = np.array(range(len(product_ids)))

    scores = model.predict([user_idx, product_idx]).flatten()
    top_products = np.argsort(-scores)[:5]
    recommended_ids = [product_ids[idx] for idx in top_products]

    recommended_products = df_products[df_products["produit_id"].isin(recommended_ids)]

    return jsonify({"recommended_products": recommended_products.to_dict(orient="records")})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)