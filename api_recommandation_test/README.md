# API de recommandation de produits

POST /recommander-produits
Body JSON:
{
  "user_id": 1
}

Réponses possibles :
- Message si l'utilisateur n'existe pas
- Message si interactions < 10
- Sinon, recommandations à venir