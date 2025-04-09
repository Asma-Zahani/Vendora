from tensorflow.keras.models import Model # type: ignore
from tensorflow.keras.layers import Input, Embedding, Flatten, Dense, Concatenate, Dropout # type: ignore

def build_model(n_users, n_products, n_categories, embedding_size=32):
    """Construit l'architecture du modèle hybride"""
    # Définition des couches d'entrée
    user_input = Input(shape=(1,), name='user_input')
    product_input = Input(shape=(1,), name='product_input')
    age_input = Input(shape=(1,), name='age_input')
    gender_input = Input(shape=(1,), name='gender_input')
    price_input = Input(shape=(1,), name='price_input')
    category_input = Input(shape=(1,), name='category_input')

    # Couches d'embedding
    user_embedding = Embedding(n_users, embedding_size, name='user_embedding')(user_input)
    product_embedding = Embedding(n_products, embedding_size, name='product_embedding')(product_input)
    category_embedding = Embedding(n_categories, embedding_size//2, name='category_embedding')(category_input)

    # Représentations vectorielles
    user_vec = Flatten()(user_embedding)
    product_vec = Flatten()(product_embedding)
    category_vec = Flatten()(category_embedding)
    gender_vec = Dense(8, activation='relu')(gender_input)

    # Concaténation et couches denses
    concat = Concatenate()([user_vec, product_vec, category_vec, age_input, gender_vec, price_input])
    dense = Dense(128, activation='relu')(concat)
    dense = Dropout(0.2)(dense)
    dense = Dense(64, activation='relu')(dense)
    dense = Dropout(0.2)(dense)
    output = Dense(1, activation='sigmoid')(dense)

    return Model(
        inputs=[user_input, product_input, age_input, gender_input, price_input, category_input],
        outputs=output
    )