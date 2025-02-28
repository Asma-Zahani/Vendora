// Service pour récupérer la quantité d'un produit pour une couleur donnée
export const getQuantiteProduitCouleur = async (produitId, couleurId) => {
    try {
      // Appel à ton API pour récupérer la quantité pour un produit et une couleur donnés
      const response = await fetch(`/api/produits/${produitId}/couleurs/${couleurId}`);
      const data = await response.json();
      
      return data.quantite;  // On suppose que l'API renvoie un objet avec la quantité
    } catch (error) {
      console.error("Erreur lors de la récupération de la quantité:", error);
      return 0;  // Retourne 0 en cas d'erreur
    }
  };
  
  export default getQuantiteProduitCouleur;  