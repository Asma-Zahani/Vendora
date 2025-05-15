from flask import Flask, request, jsonify
from flask_cors import CORS
from recommandation_routes import (recommander_produits)
from similarity import (recommend_similar_produits)

app = Flask(__name__)
CORS(app)

@app.route("/recommander_produits", methods=["POST"])
def route_recommander_produits():
    return recommander_produits()

@app.route("/recommend_similar_produits", methods=["POST"])
def route_recommend_similar_produits():
    return recommend_similar_produits()

@app.route("/")
def home():
    return "Hello from Flask!"

if __name__ == '__main__':
    app.run(debug=True)