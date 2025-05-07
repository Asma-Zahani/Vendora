import pandas as pd
import requests
import ast
import joblib
from datetime import datetime
from sklearn import preprocessing

# url = "https://vendora-app.up.railway.app/api"
url = "http://127.0.0.1:8000/api"

def load_user_by_id(user_id):
    user = requests.get(f"{url}/users/{user_id}").json()
    preferences = requests.get(f"{url}/userPreferences/{user_id}").json()

    # Convertir en DataFrame
    user_df = pd.DataFrame([user])
    preferences_df = pd.DataFrame([preferences])

    # Traitement des préférences
    preferences_df["preferred_categorie_ids"] = preferences_df["preferred_categorie_ids"].apply(safe_literal_eval)
    preferences_df["preferred_marque_ids"] = preferences_df["preferred_marque_ids"].apply(safe_literal_eval)

    # Renommer et fusionner
    user_df = user_df.rename(columns={"id": "user_id"})
    user_df = user_df.merge(preferences_df, on='user_id', how='left')

    # Encodage et transformation
    le = preprocessing.LabelEncoder()
    le.fit(user_df.genre)
    user_df.genre = le.transform(user_df.genre)

    user_df["date_naissance"] = pd.to_datetime(user_df["date_naissance"])
    user_df['age'] = user_df['date_naissance'].apply(calculate_age)
    user_df["age"] = user_df["age"].astype("int8")

    return user_df.iloc[0]

def load_produits():
    response = requests.get(url + "/produits")
    produits = pd.DataFrame(response.json())

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

def safe_literal_eval(val):
    if isinstance(val, list):
        return val
    if isinstance(val, str) and val.strip() == "[]":
        return []
    try:
        return ast.literal_eval(val)
    except Exception:
        return []

def get_model():
    return joblib.load("preferences_model.pkl")

def get_modelInteraction():
    return joblib.load("preferences_model.pkl")