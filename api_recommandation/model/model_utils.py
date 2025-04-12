from tensorflow.keras.models import Model # type: ignore
from tensorflow.keras.layers import Input, Embedding, Flatten, Dense, Concatenate, Dropout # type: ignore

def build_model(n_users, n_products, n_categories, embedding_size=32):
    """Construit l'architecture du modèle hybride"""
    # Définition des couches d'entrée
    user_input = Input(shape=(1,), name='user_input')
    produit_input = Input(shape=(1,), name='produit_input')
    age_input = Input(shape=(1,), name='age_input')
    genre_input = Input(shape=(1,), name='genre_input')
    prix_input = Input(shape=(1,), name='prix_input')
    categorie_input = Input(shape=(1,), name='categorie_input')

    # Couches d'embedding
    user_embedding = Embedding(n_users, embedding_size, name='user_embedding')(user_input)
    produit_embedding = Embedding(n_products, embedding_size, name='produit_embedding')(produit_input)
    categorie_embedding = Embedding(n_categories, embedding_size//2, name='categorie_embedding')(categorie_input)

    # Représentations vectorielles
    user_vec = Flatten()(user_embedding)
    produit_vec = Flatten()(produit_embedding)
    categorie_vec = Flatten()(categorie_embedding)
    genre_vec = Dense(8, activation='relu')(genre_input)

    # Concaténation et couches denses
    concat = Concatenate()([user_vec, produit_vec, categorie_vec, age_input, genre_vec, prix_input])
    dense = Dense(128, activation='relu')(concat)
    dense = Dropout(0.2)(dense)
    dense = Dense(64, activation='relu')(dense)
    dense = Dropout(0.2)(dense)
    output = Dense(1, activation='sigmoid')(dense)

    return Model(
        inputs=[user_input, produit_input, age_input, genre_input, prix_input, categorie_input],
        outputs=output
    )