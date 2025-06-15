import requests
import joblib
from datetime import datetime
from sklearn import preprocessing
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

url = "https://vendora-production.up.railway.app/api"
# url = "http://127.0.0.1:8000/api"

le = preprocessing.LabelEncoder()

def load_users():
    users = pd.DataFrame(requests.get(f"{url}/users").json())
    users = users.rename(columns={"id": "user_id"})

    le.fit(users["genre"])
    users["genre"] = le.transform(users["genre"])

    users["date_naissance"] = pd.to_datetime(users["date_naissance"])
    users['age'] = (users['date_naissance'].apply(calculate_age)).astype("int8")

    return users

def load_user_by_id(user_id):
    user = pd.DataFrame([requests.get(f"{url}/users/{user_id}").json()])
    preferences = pd.DataFrame([requests.get(f"{url}/userPreferences/{user_id}").json()])

    user = user.rename(columns={"id": "user_id"}).merge(preferences, on='user_id', how='left')

    # Encodage et transformation
    le.fit(user.genre)
    user.genre = le.transform(user.genre)

    user["date_naissance"] = pd.to_datetime(user["date_naissance"])
    user['age'] = (user['date_naissance'].apply(calculate_age)).astype("int8")

    return user.iloc[0]

def load_produits():
    produits = pd.DataFrame((requests.get(url + "/produits")).json())

    produits["categorie_id"] = produits["sous_categorie"].apply(lambda x: x["categorie_id"] if isinstance(x, dict) and "categorie_id" in x else None)
    produits["categorie_id"] = produits["categorie_id"].astype("int32")

    produits["prix"] = pd.to_numeric(produits["prix"], errors="coerce").fillna(0.0).astype(float)

    return produits

def load_interactions():
    interactions = pd.DataFrame(requests.get(url + "/interactions").json())
    return interactions

def calculate_age(birth_date):
    today = datetime.now()
    return today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))

def verif_number(lst, number):
    return number in lst

def filtrer_produits_preferes(user, produits):
    return produits[
        produits.apply(
            lambda row: verif_number(user['preferred_categorie_ids'], row['categorie_id']) or
                        verif_number(user['preferred_marque_ids'], row['marque_id']),
            axis=1
        )
    ]

def produits_populaires(interactions):
    produits = load_produits()
    
    produits_populaires = interactions.groupby("produit_id")["achat"].sum().sort_values(ascending=False)
    top_ids = produits_populaires.head(8).index.tolist()
    produits_populaires = produits[produits["produit_id"].isin(top_ids)]
    return produits_populaires.to_dict(orient="records")

def generer_recommandations_par_preferences(user):
    produits = load_produits()

    produits_filtres = filtrer_produits_preferes(user, produits)
    produits_filtres['user_id'] = user["user_id"]

    produits_filtres = produits_filtres.merge(user.to_frame().T, on='user_id', how='left')
    X = produits_filtres[['user_id', 'produit_id', 'genre', 'age', 'categorie_id', 'marque_id', 'prix']]
    
    X['label'] = get_preferences_model().predict_proba(X)[:, 1]
    top_reco = X.sort_values(by='label', ascending=False).head(8)

    recommended_ids = top_reco["produit_id"].tolist()
    produits_recommandes = produits[produits["produit_id"].isin(recommended_ids)]
    return produits_recommandes.to_dict(orient="records")

def generer_recommandations_par_interactions(interactions):
    produits = load_produits()
    users = load_users()

    interactions_user = interactions.copy()
    interactions_user = interactions_user.merge(users, on='user_id', how='left').merge(produits, on='produit_id', how='left')
    X = interactions_user[['user_id', 'produit_id', 'genre', 'age', 'categorie_id', 'marque_id', 'prix', 'vue_produit', 'favori', 'ajout_panier', 'achat']]

    X['label'] = get_interactions_model().predict(X)
    top_reco = X.sort_values(by='label', ascending=False).head(8)

    recommended_ids = top_reco["produit_id"].tolist()
    produits_recommandes = produits[produits["produit_id"].isin(recommended_ids)]
    return produits_recommandes.to_dict(orient="records")

def get_content_similarity_matrix(produits):
    produits["categorie_titre"] = produits["sous_categorie"].apply(lambda sc: sc["categorie"]["titre"] if sc and "categorie" in sc else "")
    produits["marque_nom"] = produits["marque"].apply(lambda m: m["nom"] if isinstance(m, dict) and "nom" in m else "")

    produits["features"] = produits["categorie_titre"] + " " + produits["marque_nom"] + " " + produits["prix"].astype(str)
    tfidf = TfidfVectorizer()
    tfidf_matrix = tfidf.fit_transform(produits["features"])
    similarite_produits = cosine_similarity(tfidf_matrix)
    return pd.DataFrame(similarite_produits, index=produits["produit_id"], columns=produits["produit_id"])

def generer_similarite_produits(interactions, produits, interaction_type, produit_id):
    if not interactions.empty:
        df_interaction = interactions[interactions[interaction_type] > 0]
        if not df_interaction.empty:
            interaction_matrix = df_interaction.pivot_table(index="user_id", columns="produit_id", values=interaction_type, aggfunc="sum", fill_value=0)
            similarite_produits = cosine_similarity(interaction_matrix.T)
            similarite_produits_df =  pd.DataFrame(similarite_produits, index=interaction_matrix.columns, columns=interaction_matrix.columns)
            if produit_id in similarite_produits_df.index:
                return similarite_produits_df
    
    return get_content_similarity_matrix(produits)

def get_preferences_model():
    return joblib.load("preferences_model.pkl")

def get_interactions_model():
    return joblib.load("interactions_model.pkl")