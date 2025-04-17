import pandas as pd
from datetime import datetime
from sklearn.preprocessing import MultiLabelBinarizer, LabelEncoder, MinMaxScaler
from ast import literal_eval

def load_data():
    users = pd.read_csv('data/users.csv', parse_dates=['date_naissance'])
    produits = pd.read_csv('data/produits.csv')
    interactions = pd.read_csv('data/interactions.csv')
    preferences = pd.read_csv('data/preferences.csv')
    
    preferences['preferred_categorie_ids'] = preferences['preferred_categorie_ids'].apply(literal_eval)
    preferences['preferred_marque_ids'] = preferences['preferred_marque_ids'].apply(literal_eval)
    
    def calculate_age(birth_date):
        today = datetime.now()
        return today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))
        
    users['age'] = users['date_naissance'].apply(calculate_age)
    
    return users, produits, interactions, preferences

def preprocess_data(users, produits, interactions, preferences):
    data = interactions.merge(users, on='user_id').merge(produits, on='produit_id')
    
    # Encodage du genre
    genre_encoder = LabelEncoder()
    data['genre_code'] = genre_encoder.fit_transform(data['genre'])
    
    # Normalisation des IDs
    data['user_id_norm'] = data['user_id'] - data['user_id'].min()
    data['produit_id_norm'] = data['produit_id'] - data['produit_id'].min()
    
    # Score composite
    data['interaction_score'] = (data['achat'] * 10 + data['ajout_panier'] * 3 + data['favori'] * 2 + data['vue_produit'] * 0.5)
    
    # Normalisation des features
    scaler_age = MinMaxScaler()
    data['age_norm'] = scaler_age.fit_transform(data[['age']])

    scaler_prix = MinMaxScaler()
    data['prix_norm'] = scaler_prix.fit_transform(data[['prix']])
    
    # Préparation des préférences
    mlb_cat = MultiLabelBinarizer()
    mlb_marque = MultiLabelBinarizer()
    cat_df = pd.DataFrame(
        mlb_cat.fit_transform(preferences['preferred_categorie_ids']),
        columns=[f'pref_cat_{i}' for i in mlb_cat.classes_]
    )
    marque_df = pd.DataFrame(
        mlb_marque.fit_transform(preferences['preferred_marque_ids']),
        columns=[f'pref_marque_{i}' for i in mlb_marque.classes_]
    )
    prefs_encoded = pd.concat([preferences[['user_id']], cat_df, marque_df], axis=1)

    # Fusion des préférences avec les données principales
    data = data.merge(prefs_encoded, on='user_id', how='left')
    
    return data, (genre_encoder, scaler_age, scaler_prix, mlb_cat, mlb_marque)