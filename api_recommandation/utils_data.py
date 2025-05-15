import pandas as pd
import requests
import ast
import joblib
from datetime import datetime
from sklearn import preprocessing


# url = "https://vendora-app.up.railway.app/api"
url = "http://127.0.0.1:8000/api"

le = preprocessing.LabelEncoder()

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

def get_preferences_model():
    return joblib.load("preferences_model.pkl")

# def get_interactions_model():
#     return joblib.load("interactions_model.pkl")