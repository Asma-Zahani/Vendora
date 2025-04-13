import numpy as np
from tensorflow.keras.models import Model, load_model # type: ignore
from tensorflow.keras.layers import Flatten # type: ignore
from data.prepare_data import prepare_data

class Recommender:
    def __init__(self, model_path, encoders):
        self.model = load_model(model_path)
        self.categorie_encoder, self.genre_encoder, self.scaler = encoders
        _, self.user_df, self.produit_df, _ = prepare_data()
    
    def recommend_for_user(self, user_id, n=5):
        """Recommande des produits pour un utilisateur spécifique"""
        try:
            if user_id not in self.user_df['user_id'].values:
                print(f"Utilisateur {user_id} non trouvé.")
                return []

            user_data = self.user_df[self.user_df['user_id'] == user_id].iloc[0]
            user_age = user_data['age']
            user_genre = user_data['genre']
            
            # Préparation des données produits
            produit_ids = self.produit_df['produit_id'].values
            
            # VÉRIFICATION CRITIQUE: Ajustement des IDs produits
            max_produit_id = self.model.get_layer('produit_embedding').input_dim - 1
            valid_produits_mask = produit_ids <= max_produit_id
            valid_produit_ids = produit_ids[valid_produits_mask]
            
            if len(valid_produit_ids) == 0:
                print("Aucun produit valide trouvé pour la recommandation")
                return []
            
            # Création des inputs avec seulement les produits valides
            n_valid_produits = len(valid_produit_ids)
            inputs = {
                'user_input': np.full(n_valid_produits, user_id, dtype=np.int32),
                'produit_input': valid_produit_ids.astype(np.int32),
                'age_input': np.full(n_valid_produits, self.scaler.transform([[user_age]])[0, 0], dtype=np.float32),
                'genre_input': np.full(n_valid_produits, self.genre_encoder.transform([user_genre])[0], dtype=np.int32),
                'prix_input': self.scaler.transform(
                    self.produit_df.loc[valid_produits_mask, ['prix']]
                ).astype(np.float32).reshape(-1),
                'categorie_input': self.categorie_encoder.transform(
                    self.produit_df.loc[valid_produits_mask, 'categorie']
                )
            }
            
            # Prédiction
            predictions = self.model.predict(inputs, verbose=0).flatten()
            
            # Sélection des meilleures prédictions
            top_indices = np.argsort(predictions)[-min(n, len(predictions)):][::-1]
            recommended = valid_produit_ids[top_indices]

            recommended_products = self.produit_df[self.produit_df["produit_id"].isin(recommended)]
            
            print(f"\nRecommandations pour {user_id}:")
            for i, prod_id in enumerate(recommended, 1):
                prod_info = self.produit_df[self.produit_df['produit_id'] == prod_id].iloc[0]
                print(f"{i}. {prod_id} ({prod_info['categorie']}, {prod_info['prix']:.2f}€)")
                
            return recommended_products
            
        except Exception as e:
            print(f"Erreur lors de la recommandation : {str(e)}")
            return []
    
    def similar_products(self, produit_id, n=5):
        """Trouve des produits similaires"""
        try:
            if produit_id not in self.produit_df['produit_id'].values:
                print(f"Produit {produit_id} non trouvé.")
                return []

            # 1. Créer un sous-modèle pour extraire les embeddings produits
            produit_embedding_layer = self.model.get_layer('produit_embedding')
            produit_input = self.model.inputs[1]  # L'entrée produit est la 2ème entrée du modèle
            produit_vec = Flatten()(produit_embedding_layer.output)
            embedding_model = Model(inputs=produit_input, outputs=produit_vec)
            
            # 3. Calcul des similarités avec tous les produits
            all_produit_codes = np.arange(len(self.produit_df))
            all_embeddings = embedding_model.predict(all_produit_codes, verbose=0)
            
            target_embedding = embedding_model.predict(np.array([produit_id]), verbose=0)
            similarities = np.dot(all_embeddings, target_embedding.T).flatten()
            
            # 4. Sélection (exclure le produit lui-même)
            similar_indices = np.argsort(similarities)[-n-1:-1][::-1]
            similar_ids = self.produit_df['produit_id'].iloc[similar_indices].values
            
            similar_produits = self.produit_df[self.produit_df["produit_id"].isin(similar_ids)]

            print(f"\nProduits similaires à {produit_id}:")
            for i, prod_id in enumerate(similar_ids, 1):
                prod_info = self.produit_df[self.produit_df['produit_id'] == prod_id].iloc[0]
                print(f"{i}. {prod_id} ({prod_info['categorie']}, {prod_info['prix']:.2f}€)")
                
            return similar_produits
            
        except Exception as e:
            print(f"Erreur lors de la recherche de produits similaires : {str(e)}")
            return []