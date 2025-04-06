import tensorflow as tf
from tensorflow.keras import layers, models # type: ignore
import numpy as np
import pandas as pd
import requests

url = "http://localhost:8000/api"
response_produits = requests.get(url + "/produits")
response_interactions = requests.get(url + "/interactions")

if response_produits.status_code == 200:
    df_products = pd.DataFrame(response_produits.json())

if response_interactions.status_code == 200:
    df_interactions = pd.DataFrame(response_interactions.json())

# Extraire les IDs uniques des utilisateurs et des produits
user_ids = df_interactions["user_id"].unique()
product_ids = df_interactions["produit_id"].unique()

# Mapper les IDs vers des indices
df_interactions["user_index"] = df_interactions["user_id"].map({user_id: idx for idx, user_id in enumerate(user_ids)})
df_interactions["produit_index"] = df_interactions["produit_id"].map({product_id: idx for idx, product_id in enumerate(product_ids)})

# Définir les tailles et l'embedding
num_users, num_products, embedding_dim = len(user_ids), len(product_ids), 16

# Définition du modèle
user_input = layers.Input(shape=(1,), dtype=tf.int32, name="user_input")
product_input = layers.Input(shape=(1,), dtype=tf.int32, name="product_input")

user_embedding = layers.Embedding(input_dim=num_users, output_dim=embedding_dim)(user_input)
product_embedding = layers.Embedding(input_dim=num_products, output_dim=embedding_dim)(product_input)

dot_product = layers.Dot(axes=2)([user_embedding, product_embedding])
output = layers.Flatten()(dot_product)
output = layers.Dense(1, activation="sigmoid")(output)

model = models.Model(inputs=[user_input, product_input], outputs=output)

# Préparation des données d'entraînement
x_train = np.column_stack((df_interactions["user_index"].values, df_interactions["produit_index"].values))
y_train = df_interactions["rating"].values

# Compilation du modèle
model.compile(optimizer="adam", loss="binary_crossentropy", metrics=["accuracy"])

# Entraînement du modèle
model.fit(x=[x_train[:, 0], x_train[:, 1]], y=y_train, epochs=10, batch_size=4, verbose=1)

# Sauvegarde du modèle
model.save("mon_modele.h5")
print("Modèle sauvegardé avec succès !")