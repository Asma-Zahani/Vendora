from flask import Flask
from flask_cors import CORS
from recommend_produits import (recommend_produits)
from recommend_similar_produits import (recommend_similar_produits)

app = Flask(__name__)
CORS(app)

@app.route("/recommend_produits", methods=["POST"])
def route_recommend_produits():
    return recommend_produits()

@app.route("/recommend_similar_produits", methods=["POST"])
def route_recommend_similar_produits():
    return recommend_similar_produits()

@app.route("/")
def home():
    return "Hello from Flask!"

if __name__ == '__main__':
    app.run(debug=True)