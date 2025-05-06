import pandas as pd
import requests
import ast
import joblib
from datetime import datetime
from sklearn import preprocessing

url = "https://vendora-app.up.railway.app/api"
users = pd.DataFrame(requests.get(url + "/users").json())
produits = pd.DataFrame(requests.get(url + "/produits").json())
interactions = pd.DataFrame(requests.get(url + "/interactions").json())
preferences = pd.DataFrame(requests.get(url + "/userPreferences").json())

model = None  # Variable globale
modelInteraction = None

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

produits["categorie_id"] = produits["sous_categorie"].apply(lambda x: x["categorie_id"] if isinstance(x, dict) and "categorie_id" in x else None)
preferences["preferred_categorie_ids"] = preferences["preferred_categorie_ids"].apply(safe_literal_eval)
preferences["preferred_marque_ids"] = preferences["preferred_marque_ids"].apply(safe_literal_eval)

users = users.rename(columns={"id": "user_id"})
users = users.merge(preferences, on='user_id', how='left')

le = preprocessing.LabelEncoder()
le.fit(users.genre)
users.genre = le.transform(users.genre)

users["date_naissance"] = pd.to_datetime(users["date_naissance"])
users['age'] = users['date_naissance'].apply(calculate_age)

def get_model():
    global model
    if model is None:
        model = joblib.load("preferences_model.pkl")
    return model

def get_modelInteraction():
    global modelInteraction
    if modelInteraction is None:
        modelInteraction = joblib.load("preferences_model.pkl")
    return modelInteraction