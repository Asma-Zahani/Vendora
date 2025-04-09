from flask import Flask
import pandas as pd
import requests
from model.train import train_model
from data.prepare_data import prepare_data
from services.recommender import Recommender

app = Flask(__name__)

def main():
    encoders = train_model()
    
    recommender = Recommender(
        model_path="model/ecommerce_recommender.keras",
        encoders=encoders
    )
    
    # Exemple d'utilisation
    recommender.recommend_for_user(20)
    # recommender.similar_products(11)

if __name__ == "__main__":
    main()
    # app.run(host="0.0.0.0", port=5000, debug=True)