from flask import Flask, request, jsonify
import pandas as pd
from tensorflow.keras.models import load_model # type: ignore
import requests
import os

app = Flask(__name__)

# Chargement du modèle
try:
    model = load_model('modele_recommandation.h5')
    print("✅ Modèle chargé avec succès")
except Exception as e:
    print(f"❌ Erreur lors du chargement du modèle: {e}")

# Configuration de l'API externe via variable d'environnement
API_BASE_URL = os.getenv('API_BASE_URL', 'http://localhost:8000/api')

@app.route("/recommander-produits", methods=["POST"])
def recommander_produits():
    """Endpoint pour obtenir des recommandations"""
    data = request.get_json()
    user_id = data.get("user_id")
    
    if not user_id:
        return jsonify({"error": "Le paramètre user_id est requis"}), 400
    
    # Exemple de logique (à adapter)
    recommendations = [
        {"product_id": 1, "score": 0.95},
        {"product_id": 3, "score": 0.87}
    ]
    
    return jsonify({
        "user_id": user_id,
        "recommendations": recommendations
    })

@app.route("/", methods=["GET"])
def health_check():
    """Endpoint de vérification de santé"""
    return jsonify({
        "status": "OK",
        "message": "API de recommandation opérationnelle"
    })