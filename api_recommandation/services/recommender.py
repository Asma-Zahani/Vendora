import numpy as np
from tensorflow.keras.models import Model, load_model # type: ignore
from tensorflow.keras.layers import Flatten # type: ignore
from data.prepare_data import prepare_data

class Recommender:
    def __init__(self, model_path, encoders):
        self.model = load_model(model_path)
        self.category_encoder, self.gender_encoder, self.scaler = encoders
        _, self.user_df, self.product_df = prepare_data()
    
    def recommend_for_user(self, user_id, n=5):
        """Recommande des produits pour un utilisateur spécifique"""
        try:
            if user_id not in self.user_df['user_id'].values:
                print(f"Utilisateur {user_id} non trouvé.")
                return []

            user_data = self.user_df[self.user_df['user_id'] == user_id].iloc[0]
            user_age = user_data['age']
            user_gender = user_data['genre']
            
            # Préparation des données produits
            product_ids = self.product_df['product_id'].values
            
            # VÉRIFICATION CRITIQUE: Ajustement des IDs produits
            max_product_id = self.model.get_layer('product_embedding').input_dim - 1
            valid_products_mask = product_ids <= max_product_id
            valid_product_ids = product_ids[valid_products_mask]
            
            if len(valid_product_ids) == 0:
                print("Aucun produit valide trouvé pour la recommandation")
                return []
            
            # Création des inputs avec seulement les produits valides
            n_valid_products = len(valid_product_ids)
            inputs = {
                'user_input': np.full(n_valid_products, user_id, dtype=np.int32),
                'product_input': valid_product_ids.astype(np.int32),
                'age_input': np.full(n_valid_products, self.scaler.transform([[user_age]])[0, 0], dtype=np.float32),
                'gender_input': np.full(n_valid_products, self.gender_encoder.transform([user_gender])[0], dtype=np.int32),
                'price_input': self.scaler.transform(
                    self.product_df.loc[valid_products_mask, ['price']]
                ).astype(np.float32).reshape(-1),
                'category_input': self.category_encoder.transform(
                    self.product_df.loc[valid_products_mask, 'category']
                )
            }
            
            # Prédiction
            predictions = self.model.predict(inputs, verbose=0).flatten()
            
            # Sélection des meilleures prédictions
            top_indices = np.argsort(predictions)[-min(n, len(predictions)):][::-1]
            recommended = valid_product_ids[top_indices]

            recommended_products = self.product_df[self.product_df["product_id"].isin(recommended)]
            
            print(f"\nRecommandations pour {user_id}:")
            for i, prod_id in enumerate(recommended, 1):
                prod_info = self.product_df[self.product_df['product_id'] == prod_id].iloc[0]
                print(f"{i}. {prod_id} ({prod_info['category']}, {prod_info['price']:.2f}€)")
                
            return recommended_products
            
        except Exception as e:
            print(f"Erreur lors de la recommandation : {str(e)}")
            return []
    
    def similar_products(self, product_id, n=5):
        """Trouve des produits similaires"""
        try:
            if product_id not in self.product_df['product_id'].values:
                print(f"Produit {product_id} non trouvé.")
                return []

            # 1. Créer un sous-modèle pour extraire les embeddings produits
            product_embedding_layer = self.model.get_layer('product_embedding')
            product_input = self.model.inputs[1]  # L'entrée produit est la 2ème entrée du modèle
            product_vec = Flatten()(product_embedding_layer.output)
            embedding_model = Model(inputs=product_input, outputs=product_vec)
            
            # 3. Calcul des similarités avec tous les produits
            all_product_codes = np.arange(len(self.product_df))
            all_embeddings = embedding_model.predict(all_product_codes, verbose=0)
            
            target_embedding = embedding_model.predict(np.array([product_id]), verbose=0)
            similarities = np.dot(all_embeddings, target_embedding.T).flatten()
            
            # 4. Sélection (exclure le produit lui-même)
            similar_indices = np.argsort(similarities)[-n-1:-1][::-1]
            similar_ids = self.product_df['product_id'].iloc[similar_indices].values
            
            similar_products = self.product_df[self.product_df["product_id"].isin(similar_ids)]

            print(f"\nProduits similaires à {product_id}:")
            for i, prod_id in enumerate(similar_ids, 1):
                prod_info = self.product_df[self.product_df['product_id'] == prod_id].iloc[0]
                print(f"{i}. {prod_id} ({prod_info['category']}, {prod_info['price']:.2f}€)")
                
            return similar_products
            
        except Exception as e:
            print(f"Erreur lors de la recherche de produits similaires : {str(e)}")
            return []