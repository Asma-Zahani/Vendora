from sklearn.model_selection import train_test_split
from tensorflow.keras.optimizers import Adam # type: ignore
from tensorflow.keras.callbacks import EarlyStopping # type: ignore
from tensorflow.keras.models import Model # type: ignore
from tensorflow.keras.layers import Input, Embedding, Flatten, Dense, Concatenate, Dropout # type: ignore
from data.prepare_data import load_data, preprocess_data
from pathlib import Path
from sklearn.metrics import classification_report
from sklearn.metrics import roc_auc_score

def build_model(n_users, n_produits, embedding_size=64):
    """Construit l'architecture du modèle hybride"""
    # Définition des couches d'entrée
    user_input = Input(shape=(1,), name='user_input')
    produit_input = Input(shape=(1,), name='produit_input')
    age_input = Input(shape=(1,), name='age_input')
    genre_input = Input(shape=(1,), name='genre_input')
    prix_input = Input(shape=(1,), name='prix_input')

    # Couches d'embedding
    user_embedding = Embedding(n_users, embedding_size, name='user_embedding')(user_input)
    produit_embedding = Embedding(n_produits, embedding_size, name='produit_embedding')(produit_input)

    # Représentations vectorielles
    user_vec = Flatten()(user_embedding)
    produit_vec = Flatten()(produit_embedding)
    genre_vec = Dense(8, activation='relu')(genre_input)

    # Concaténation et couches denses
    concat = Concatenate()([user_vec, produit_vec, age_input, genre_vec, prix_input])
    dense = Dense(128, activation='relu')(concat)
    dense = Dropout(0.2)(dense)
    dense = Dense(64, activation='relu')(dense)
    dense = Dropout(0.2)(dense)
    output = Dense(1, activation='sigmoid')(dense)

    return Model(inputs=[user_input, produit_input, age_input, genre_input, prix_input],outputs=output)

def train_model():
    users, products, interactions, preferences = load_data()
    data, encoders = preprocess_data(users, products, interactions, preferences)

    train, test = train_test_split(data, test_size=0.2, random_state=42)

    if not Path("model/ecommerce_recommender.keras").exists():
        model = build_model(
            n_users=data['user_id_norm'].nunique() + 1,
            n_produits=data['produit_id_norm'].nunique() + 1
        )

        model.compile(optimizer=Adam(learning_rate=0.001),loss='binary_crossentropy', metrics=['accuracy', 'AUC'])

        model.fit(
        x=[
            train['user_id'],
            train['produit_id'],
            train['age_norm'],
            train['genre_code'],
            train['prix_norm']
        ],
        y=train['achat'],
        batch_size=64,
        epochs=20,
        validation_data=(
            [
                test['user_id'],
                test['produit_id'],
                test['age_norm'],
                test['genre_code'],
                test['prix_norm']
            ],
            test['achat']
        ),
        callbacks=[EarlyStopping(patience=3, restore_best_weights=True)],
        verbose=1
    )

        model.save("model/ecommerce_recommender.keras")

        y_pred = model.predict([
            test['user_id_norm'],
            test['produit_id_norm'],
            test['age_norm'],
            test['genre_code'],
            test['prix_norm']
        ])

        # convertir en 0 ou 1 (achat ou pas)
        y_pred_classes = (y_pred > 0.3).astype(int)

        # afficher un rapport de performance
        print(classification_report(test['achat'], y_pred_classes))

        print("AUC Score:", roc_auc_score(test['achat'], y_pred))

    return encoders