from flask import Flask, request, jsonify
from model.train import train_model
from services.recommender import Recommender
import os
from pathlib import Path
import subprocess

app = Flask(__name__)

data_dir = os.path.dirname(os.path.abspath(__file__))
data_folder = os.path.join(data_dir, 'data')

required_files = [
    os.path.join(data_folder, 'interactions.csv'),
    os.path.join(data_folder, 'users.csv'),
    os.path.join(data_folder, 'produits.csv')
]

if not all(Path(file).exists() for file in required_files):
    generate_script = os.path.join(data_folder, 'generate_data.py')
    subprocess.run(['python', generate_script])

encoders = train_model()

recommender = Recommender(
    model_path="model/ecommerce_recommender.keras",
    encoders=encoders
)

@app.route("/recommend/user", methods=["POST"])
def recommend_for_user():
    data = request.get_json()
    user_id = data.get("user_id")
    
    if user_id is None:
        return jsonify({"error": "user_id est requis"}), 400
    
    recommended_produits = recommender.recommend_for_user(user_id)
    return jsonify(recommended_produits.to_dict(orient="records"))

@app.route("/recommend/produit", methods=["POST"])
def recommend_similar_products():
    data = request.get_json()
    produit_id = data.get("produit_id")
    
    if produit_id is None:
        return jsonify({"error": "produit_id est requis"}), 400

    recommended_produits = recommender.similar_products(produit_id)
    return jsonify(recommended_produits.to_dict(orient="records"))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
