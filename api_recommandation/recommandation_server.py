from flask import Flask, request, jsonify
import pandas as pd
import tensorflow as tf
from tensorflow.keras.models import load_model # type: ignore
import numpy as np
import requests
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)

# Charger le modèle de recommandation
model = load_model('modele_recommandation.h5')

# Récupérer les produits depuis l'API
response = requests.get('http://127.0.0.1:8000/api/produits')
produits_json = response.json()

produits = pd.DataFrame(produits_json)

# Initialiser les encodeurs LabelEncoder
user_encoder = LabelEncoder()
product_encoder = LabelEncoder()

# Encoder les produits et utilisateurs de manière dynamique
produits['produit_id_enc'] = product_encoder.fit_transform(produits['produit_id'])

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    user_id = data['user_id']

    # Vérifier si l'encodeur d'utilisateurs contient déjà l'ID de l'utilisateur
    #Cette vérification s'assure que l'encodeur user_encoder contient déjà les classes (les utilisateurs encodés). Si ce n’est pas le cas, on fait appel à fit() pour ajouter l'ID de l'utilisateur à l'encodeur.
    #Cela permet de gérer les nouveaux utilisateurs sans avoir besoin de réentraîner l'encodeur ou d’utiliser des fichiers externes.
    if not hasattr(user_encoder, 'classes_') or user_id not in user_encoder.classes_:
        # Si l'utilisateur n'existe pas encore, nous devons "fit" l'encodeur avec l'utilisateur
        user_encoder.fit([user_id] + list(user_encoder.classes_) if hasattr(user_encoder, 'classes_') else [user_id])
    
    # Encoder l'ID de l'utilisateur
    user_id_enc = user_encoder.transform([user_id])[0]

    # Préparer les prédictions
    produit_ids_enc = produits['produit_id_enc'].values
    user_ids_enc = np.full_like(produit_ids_enc, fill_value=user_id_enc)

    # Prédictions
    predictions = model.predict([user_ids_enc, produit_ids_enc], verbose=0).flatten()

    # Récupérer les meilleurs produits
    top_indices = predictions.argsort()[-10:][::-1]  # Top 10 produits
    top_product_ids = produits.iloc[top_indices]['produit_id'].tolist()

    return jsonify(top_product_ids)

if __name__ == '__main__':
    app.run(debug=True)
