from flask import  request, jsonify
from utils_data import (load_produits, load_interactions)
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

def get_content_similarity_matrix(produits):
    produits["categorie_titre"] = produits["sous_categorie"].apply(lambda sc: sc["categorie"]["titre"] if sc and "categorie" in sc else "")
    produits["marque_nom"] = produits["marque"].apply(lambda m: m["nom"] if isinstance(m, dict) and "nom" in m else "")

    produits["text_features"] = produits["categorie_titre"] + " " + produits["marque_nom"] + " " + produits["prix"]
    tfidf = TfidfVectorizer()
    tfidf_matrix = tfidf.fit_transform(produits["text_features"])
    product_similarity = cosine_similarity(tfidf_matrix)
    return pd.DataFrame(product_similarity, index=produits["produit_id"], columns=produits["produit_id"])

def get_filtered_interaction_matrix(interactions, produits, interaction_type, produit_id):
    if not interactions.empty:
        df_interaction = interactions[interactions[interaction_type] > 0]
        if not df_interaction.empty:
            interaction_matrix = df_interaction.pivot_table(index="user_id", columns="produit_id",values=interaction_type, aggfunc="sum", fill_value=0)
            product_similarity = cosine_similarity(interaction_matrix.T)  # Calculer la similarité entre les produits (Transposer pour comparer les produits)
            product_similarity_df =  pd.DataFrame(product_similarity, index=interaction_matrix.columns, columns=interaction_matrix.columns)
            if produit_id in product_similarity_df.index:
                return product_similarity_df
    
    return get_content_similarity_matrix(produits)

def recommend_similar_produits():
    data = request.get_json()
    produit_id = data.get("produit_id")
    produit_ids = data.get("produit_ids")
    interaction_type = data.get("interaction_type")

    produits = load_produits()
    interactions = load_interactions()

    if produit_id is not None:
        produit_id = int(produit_id)

    if not ((produit_id and interaction_type) or (produit_ids and interaction_type)):
        return jsonify({"error": "Data manquante"}), 400
    
    produit_similaire = get_filtered_interaction_matrix(interactions, produits, interaction_type, produit_id)
    
    if produit_id is not None:
        produit_similaire_ids = produit_similaire[produit_id].sort_values(ascending=False).index[1:9]
        produits_similaires = produits[produits["produit_id"].isin(produit_similaire_ids)]
    else :
        produit_ids = [int(pid) for pid in produit_ids]
        similarity_scores = produit_similaire.loc[produit_ids].mean(axis=0).sort_values(ascending=False)
        similarity_scores = similarity_scores.drop(produit_ids, errors="ignore")
        produit_similaire_ids = similarity_scores.head(8).index.tolist()
        produits_similaires = produits[produits["produit_id"].isin(produit_similaire_ids)]

    return jsonify({"data": produits_similaires.to_dict(orient="records")})