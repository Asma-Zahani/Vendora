import pandas as pd
from datetime import datetime
import os

def prepare_data():
    """Version corrigée avec gestion des chemins relatifs"""
    try:
        data_dir = os.path.dirname(os.path.abspath(__file__))
        
        users_path = os.path.join(data_dir, 'users.csv')
        produits_path = os.path.join(data_dir, 'produits.csv')
        interactions_path = os.path.join(data_dir, 'interactions.csv')
        
        user_df = pd.read_csv(users_path, parse_dates=['date_naissance'], encoding='latin1')
        produit_df = pd.read_csv(produits_path, encoding='latin1')
        interactions_df = pd.read_csv(interactions_path, encoding='latin1')

        def calculate_age(birth_date):
            today = datetime.now()
            return today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))
        
        user_df['age'] = user_df['date_naissance'].apply(calculate_age)
        
        df = interactions_df.merge(user_df, on='user_id').merge(produit_df, on='produit_id')
        
        return df, user_df, produit_df
        
    except Exception as e:
        print(f"\nERREUR CRITIQUE\n{'-'*50}")
        raise