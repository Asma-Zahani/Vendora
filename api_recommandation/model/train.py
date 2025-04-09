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
    # Préparation des données
    df, _, _ = prepare_data()
    
    # Encodage des autres caractéristiques (sauf user_id et product_id)
    category_encoder = LabelEncoder()
    gender_encoder = LabelEncoder()
    scaler = MinMaxScaler()
    
    # Encodage catégoriel (si nécessaire)
    df['category_code'] = category_encoder.fit_transform(df['category'])
    df['gender_code'] = gender_encoder.fit_transform(df['genre'])

    # Conversion des user_id et product_id en numériques (si ce sont des strings)
    if not np.issubdtype(df['user_id'].dtype, np.number):
        df['user_id'] = df['user_id'].str.extract('(\\d+)').astype(int)  # "user_1" → 1
    if not np.issubdtype(df['product_id'].dtype, np.number):
        df['product_id'] = df['product_id'].str.extract('(\\d+)').astype(int)  # "prod_42" → 42

    # Normalisation des IDs pour qu'ils commencent à 0 (requis pour les embeddings)
    df['user_id'] = df['user_id'] - df['user_id'].min()  # Ex: 1 → 0, 2 → 1, etc.
    df['product_id'] = df['product_id'] - df['product_id'].min()

    # Score d'interaction composite
    df['interaction_score'] = (
        df['purchased'] * 5 +
        df['add_to_cart'] * 2 +
        df['clicks'] * 0.3
    )

    # Normalisation des autres caractéristiques
    df['age_norm'] = scaler.fit_transform(df[['age']])
    df['price_norm'] = scaler.fit_transform(df[['price']])

    # Séparation en train/test
    train, test = train_test_split(df, test_size=0.2, random_state=42)

    data_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(data_dir, 'ecommerce_recommender.keras')

    if not Path(model_path).exists():
        model = build_model(
            n_users=df['user_id'].nunique(),
            n_products=df['product_id'].nunique(),
            n_categories=df['category_code'].nunique()
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
            train['product_id'],
            train['age_norm'],
            train['gender_code'],
            train['price_norm'],
            train['category_code']
        ],
        y=train['purchased'],
        batch_size=64,
        epochs=20,
        validation_data=(
            [
                test['user_id'],
                test['product_id'],
                test['age_norm'],
                test['gender_code'],
                test['price_norm'],
                test['category_code']
            ],
            test['purchased']
        ),
        callbacks=[early_stopping],
        verbose=1
    )

        model.save("model/ecommerce_recommender.keras")

    return (category_encoder, gender_encoder, scaler)