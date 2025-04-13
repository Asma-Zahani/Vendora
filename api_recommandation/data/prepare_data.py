import pandas as pd
from datetime import datetime
import os
from sklearn.preprocessing import MultiLabelBinarizer

def prepare_data():
    """Version corrigée avec gestion des chemins relatifs"""
    try:
        data_dir = os.path.dirname(os.path.abspath(__file__))
        
        users_path = os.path.join(data_dir, 'users.csv')
        produits_path = os.path.join(data_dir, 'produits.csv')
        interactions_path = os.path.join(data_dir, 'interactions.csv')
        preferences_path = os.path.join(data_dir, 'preferences.csv')
        
        user_df = pd.read_csv(users_path, parse_dates=['date_naissance'], encoding='latin1')
        produit_df = pd.read_csv(produits_path, encoding='latin1')
        interactions_df = pd.read_csv(interactions_path, encoding='latin1')
        preferences_df = pd.read_csv(preferences_path, encoding='latin1')

        def calculate_age(birth_date):
            today = datetime.now()
            return today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))
        
        user_df['age'] = user_df['date_naissance'].apply(calculate_age)
        
        df = interactions_df.merge(user_df, on='user_id').merge(produit_df, on='produit_id')

        return df, user_df, produit_df, preferences_df
        
    except Exception as e:
        print(f"\nERREUR CRITIQUE\n{'-'*50}")
        raise

def prepare_preferences(preferences_df):
    # Utilisation de MultiLabelBinarizer pour gérer plusieurs catégories ou marques
    mlb_categorie = MultiLabelBinarizer()
    mlb_marque = MultiLabelBinarizer()
    
    # Transformation des listes en vecteurs binaires
    categorie_binarized = mlb_categorie.fit_transform(preferences_df['preferred_categorie_ids'].apply(lambda x: list(map(int, x.split(',')))))
    marque_binarized = mlb_marque.fit_transform(preferences_df['preferred_marque_ids'].apply(lambda x: list(map(int, x.split(',')))))

    # Création de nouvelles colonnes binaires pour les catégories et les marques
    categorie_columns = [f'categorie_{i}' for i in range(categorie_binarized.shape[1])]
    marque_columns = [f'marque_{i}' for i in range(marque_binarized.shape[1])]
    
    preferences_df[categorie_columns] = categorie_binarized
    preferences_df[marque_columns] = marque_binarized

    return preferences_df, categorie_columns, marque_columns
