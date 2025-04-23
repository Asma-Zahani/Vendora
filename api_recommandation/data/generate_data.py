import csv
from datetime import datetime, timedelta
import random

def generate_users(output_file="data/users.csv", n_users=1000):
    def random_date(start_year=1960, end_year=2005):
        start = datetime(start_year, 1, 1)
        end = datetime(end_year, 12, 31)
        return start + timedelta(days=random.randint(0, (end - start).days))
    
    def random_gender():
        return random.choices(['Male', 'Femelle'], weights=[48, 52])[0]
    
    with open(output_file, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(['user_id', 'date_naissance', 'genre'])
        
        for i in range(1, n_users + 1):
            writer.writerow([
                i,
                random_date().strftime("%Y-%m-%d"),
                random_gender()
            ])
    
    print(f"{n_users} utilisateurs générés dans {output_file}")

def generate_produits(output_file="data/produits.csv", n_produits=500):
    n_categories = 20
    n_marques = 20

    # Listes fictives de catégories et marques (remplacez-les par vos vraies données)
    categories = [f'Catégorie_{i}' for i in range(1, n_categories + 1)]
    marques = [f'Marque_{i}' for i in range(1, n_marques + 1)]

    with open(output_file, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(['produit_id', 'categorie_name', 'marque_name', 'prix'])
        
        for i in range(1, n_produits + 1):
            writer.writerow([
                i,
                random.choice(categories),  # Choisir un nom de catégorie aléatoire
                random.choice(marques),  # Choisir un nom de marque aléatoire
                round(random.uniform(5, 500), 2)  # Prix aléatoire entre 5 et 500
            ])
    
    print(f"{n_produits} produits générés dans {output_file}")

def generate_interactions(output_file="data/interactions.csv", n_interactions=10000):
    n_users = 1000
    n_products = 500
    target_purchase_ratio = 0.15  # 15% d'achats
    
    with open(output_file, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(['user_id', 'produit_id', 'vue_produit', 'favori', 'ajout_panier', 'achat'])
        
        for _ in range(n_interactions):
            user_id = random.randint(1, n_users)
            product_id = random.randint(1, n_products)
            
            # Probabilité de base ajustée à la cible
            base_purchase_prob = target_purchase_ratio  
            
            # Modulateurs réalistes
            vue_produit = random.randint(1, 10)
            base_purchase_prob += vue_produit * 0.01  # +1% par vue
            
            # Favoris boostent l'achat
            favori = 1 if random.random() < 0.1 else 0
            if favori:
                base_purchase_prob += 0.2
            
            # Génération finale
            achat = 1 if random.random() < base_purchase_prob else 0
            ajout_panier = random.randint(1, 10) if achat else random.randint(0, 5)
            
            writer.writerow([user_id, product_id, vue_produit, favori, ajout_panier, achat])

    print(f"{n_interactions} interactions générées dans {output_file}")


import csv
import random

def generate_preferences(output_file="data/preferences.csv", n_users=1000):
    """ Génère un fichier CSV de préférences utilisateur avec des catégories et des marques (par nom) """
    n_categories = 20
    n_marques = 20

    # Listes fictives de catégories et marques (remplacez-les par vos vraies données)
    categories = [f'Catégorie_{i}' for i in range(1, n_categories + 1)]
    marques = [f'Marque_{i}' for i in range(1, n_marques + 1)]

    with open(output_file, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(['user_id', 'preferred_categorie_names', 'preferred_marque_names'])

        for i in range(1, n_users + 1):
            categorie_names = random.sample(categories, random.randint(3, 5))
            marque_names = random.sample(marques, random.randint(3, 5))

            writer.writerow([
                i,
                ",".join(categorie_names),  # Convertir en chaîne séparée par des virgules
                ",".join(marque_names)  # Convertir en chaîne séparée par des virgules
            ])

    print(f"{n_users} préférences générées dans {output_file}")

generate_users()
generate_produits()
generate_interactions()
generate_preferences()