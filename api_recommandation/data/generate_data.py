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
                # f"user_{i}",
                i,
                random_date().strftime("%Y-%m-%d"),
                random_gender()
            ])
    
    print(f"{n_users} utilisateurs générés dans {output_file}")

def generate_products(output_file="data/produits.csv", n_products=500):
    categories = ['Electronique', 'Livre', 'Vetement', 'Alimentation', 'Cosmetique']
    
    with open(output_file, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(['produit_id', 'categorie', 'prix'])
        
        for i in range(1, n_products + 1):
            writer.writerow([
                # f"prod_{i}",
                i,
                random.choice(categories),
                round(random.uniform(5, 500), 2)
            ])
    
    print(f"{n_products} produits générés dans {output_file}")

def generate_interactions(output_file="data/interactions.csv", n_interactions=10000):
    """ Génère un fichier CSV d'interactions """
    n_users = 1000
    n_products = 500
    
    with open(output_file, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(['user_id', 'produit_id', 'purchased', 'clicks', 'add_to_cart'])
        
        for _ in range(n_interactions):
            # user_id = f"user_{random.randint(1, n_users)}"
            # product_id = f"prod_{random.randint(1, n_products)}"
            user_id = random.randint(1, n_users)
            product_id = random.randint(1, n_products)
            
            # Logique pour des interactions réalistes :
            purchased = random.choices([0, 1], weights=[70, 30])[0]  # 30% de chance d'achat
            add_to_cart = random.randint(1, 10) if purchased else random.randint(0, 5)
            clicks = random.randint(1, 10) if purchased else random.randint(0, 5)
            
            writer.writerow([
                user_id,
                product_id,
                purchased,
                add_to_cart,
                clicks
            ])
    
    print(f"{n_interactions} interactions générées dans {output_file}")

generate_users()
generate_products()
generate_interactions()