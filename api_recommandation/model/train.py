import numpy as np
from sklearn.preprocessing import LabelEncoder, MinMaxScaler
from sklearn.model_selection import train_test_split
from tensorflow.keras.optimizers import Adam # type: ignore
from tensorflow.keras.callbacks import EarlyStopping # type: ignore
from .model_utils import build_model
from data.prepare_data import prepare_data
import tensorflow as tf
from pathlib import Path
import os

def train_model():
    df, _, _, _ = prepare_data()
    
    categorie_encoder = LabelEncoder()
    genre_encoder = LabelEncoder()
    scaler = MinMaxScaler()
    
    # Encodage catégoriel (si nécessaire)
    df['categorie_code'] = categorie_encoder.fit_transform(df['categorie'])
    df['genre_code'] = genre_encoder.fit_transform(df['genre'])

    # Normalisation des IDs pour qu'ils commencent à 0 (requis pour les embeddings)
    df['user_id'] = df['user_id'] - df['user_id'].min()  # Ex: 1 → 0, 2 → 1, etc.
    df['produit_id'] = df['produit_id'] - df['produit_id'].min()

    # Score d'interaction composite
    df['interaction_score'] = (
        df['purchased'] * 5 +
        df['add_to_cart'] * 2 +
        df['clicks'] * 0.3
    )

    # Normalisation des autres caractéristiques
    df['age_norm'] = scaler.fit_transform(df[['age']])
    df['prix_norm'] = scaler.fit_transform(df[['prix']])

    # Séparation en train/test
    train, test = train_test_split(df, test_size=0.2, random_state=42)

    data_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(data_dir, 'ecommerce_recommender.keras')

    if not Path(model_path).exists():
        model = build_model(
            n_users=df['user_id'].nunique(),
            n_products=df['produit_id'].nunique(),
            n_categories=df['categorie_code'].nunique()
        )

        # Compilation et entraînement (identique)
        model.compile(
            optimizer=Adam(learning_rate=0.001),
            loss='binary_crossentropy',
            metrics=['accuracy', 'AUC']
        )
        
        early_stopping = EarlyStopping(patience=3, restore_best_weights=True)

        model.fit(
        x=[
            train['user_id'],
            train['produit_id'],
            train['age_norm'],
            train['genre_code'],
            train['prix_norm'],
            train['categorie_code']
        ],
        y=train['purchased'],
        batch_size=64,
        epochs=20,
        validation_data=(
            [
                test['user_id'],
                test['produit_id'],
                test['age_norm'],
                test['genre_code'],
                test['prix_norm'],
                test['categorie_code']
            ],
            test['purchased']
        ),
        callbacks=[early_stopping],
        verbose=1
    )

        model.save("model/ecommerce_recommender.keras")

    return (categorie_encoder, genre_encoder, scaler)