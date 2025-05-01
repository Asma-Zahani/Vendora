from flask import Flask, request, jsonify
import pandas as pd
import requests

app = Flask(__name__)

url = "https://vendora-app.up.railway.app/api"
response_produits = requests.get(url + "/produits")
response_interactions = requests.get(url + "/interactions")

if response_produits.status_code == 200:
    produits = pd.DataFrame(response_produits.json())

if response_interactions.status_code == 200:
    interactions = pd.DataFrame(response_interactions.json())

@app.route("/recommander-produits", methods=["POST"])
def recommander_produits():
    data = request.get_json()
    user_id = data.get("user_id")

    if user_id is None:
        return jsonify({"error": "user_id is required"})

    # Filtrer les interactions pour cet utilisateur
    user_interactions = interactions[interactions["user_id"] == user_id]

    if user_interactions.empty:
        return jsonify({"message": "Cet utilisateur n'existe pas dans les interactions."}), 404

    if len(user_interactions) < 10:
        return jsonify({"message": "Pas assez d'interactions pour générer des recommandations (minimum 10)."}), 200

    # À remplacer par l'utilisation réelle du modèle
    return jsonify({"message": "Le modèle sera utilisé pour générer les recommandations."})

@app.route("/")
def home():
    return "Hello from Flask on Railway!"