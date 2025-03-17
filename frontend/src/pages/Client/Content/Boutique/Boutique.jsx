/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import { addToPanier } from "@/service/PanierService";
import { addToWishlist } from "@/service/WishlistService";
import FilteredProducts from '@/components/Products/FilteredProducts';
import UserContext from '@/utils/UserContext';
import { getEntities } from "@/service/EntitesService";

const Shop = () => {
  const { user, panier, wishlist, setPanier, setWishlist } = useContext(UserContext);

  const [gridCols, setGridCols] = useState(3);
  const [isGrid, setIsGrid] = useState(true);

  const [produits, setProduits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sousCategories, setSousCategories] = useState([]);
  const [marques, setMarques] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [couleurs, setCouleurs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setProduits(await getEntities("produits", 1, 50));
      setCategories(await getEntities("categories"));
      setSousCategories(await getEntities("sousCategories"));
      setMarques(await getEntities("marques"));
      setPromotions(await getEntities("promotions"));
      setCouleurs(await getEntities("couleurs"));
    };
    fetchData();
  }, []);

  const formattedProduits = (produits.data || []).map((item) => {
    const promotion = promotions.find(p => p.promotion_id === item.promotion_id);
    const remise = promotion?.reduction || 0;
    const prixApresPromo = remise 
      ? (Number(item.prix) - (Number(item.prix) * remise / 100)).toFixed(2) 
      : Number(item.prix).toFixed(2);

    const sousCategorie = sousCategories.find(s => s.sous_categorie_id === item.sous_categorie_id);
    const categorie = categories.find(c => c.categorie_id === sousCategorie?.categorie_id);

    return {
      ...item,
      categorie: categorie?.titre || "Non défini",
      categorie_id: categorie?.categorie_id || null,
      sous_categorie: sousCategorie?.titre || "Non défini",
      marque: marques.find(m => m.marque_id === item.marque_id)?.nom || "Non défini",
      promotion: promotion?.nom || "Non défini",
      prix_apres_promo: prixApresPromo,
    };
  });

  const filtres = { categories, marques, couleurs };
  const gridInfo = { isGrid, setIsGrid, gridCols, setGridCols };

  const [formData, setFormData] = useState(null);
  const [panierAjoute, setPanierAjoute] = useState(false);

  const ajouterAuPanier = (produit_id, quantiteAjoutee) => {
    const produitExistant = panier?.find(item => item.produit_id === produit_id);
    
    const quantiteTotale = produitExistant 
      ? (produitExistant.pivot?.quantite 
          ? parseInt(produitExistant.pivot.quantite) + parseInt(quantiteAjoutee) 
          : parseInt(produitExistant.quantite) + parseInt(quantiteAjoutee)) 
      : parseInt(quantiteAjoutee);

    setFormData({
      client_id: user?.id,
      produit_id: produit_id,
      quantite: quantiteTotale,
    });

    setPanierAjoute(true);
  };

  const ajouterAuListeSouhait = async (produit_id) => {
    try {
      const produit = produits.find(item => item.produit_id === produit_id);
      
      const wishlistItem = { client_id: user?.id, produit_id };
      await addToWishlist(wishlistItem);
      setWishlist(prevWishlist => [...prevWishlist, produit]);
      console.log("Liste de souhaits mise à jour avec succès");
    } catch (error) {
      console.error("Erreur lors de l'ajout à la liste de souhaits:", error);
    }
  };

  useEffect(() => {
    if (panierAjoute && formData) {
      const timeout = setTimeout(async () => {
        try {
          await addToPanier(formData);
          setPanier(prevProduits => {
            const produitExistant = prevProduits.find(item => item.produit_id === formData.produit_id);
          
            if (produitExistant) {
              return prevProduits.map(item =>
                item.produit_id === formData.produit_id 
                  ? { ...item, pivot: { ...item.pivot, quantite: formData.quantite } } 
                  : item
              );
            } else {
              const produit = produits.find(item => item.produit_id === formData.produit_id);
              return produit ? [...prevProduits, { ...produit, pivot: { quantite: formData.quantite } }] : prevProduits;
            }
          });
          console.log("Panier mis à jour");
        } catch (error) {
          console.error("Erreur lors de la mise à jour du panier:", error);
        }
        setPanierAjoute(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [panierAjoute, formData]);

  return (
    <div className="px-8">
      <FilteredProducts 
        wishlist={wishlist} 
        datas={formattedProduits} 
        gridInfo={gridInfo} 
        filtres={filtres} 
        ajouterAuPanier={ajouterAuPanier} 
        ajouterAuListeSouhait={ajouterAuListeSouhait} 
      />
    </div>
  );
};

export default Shop;