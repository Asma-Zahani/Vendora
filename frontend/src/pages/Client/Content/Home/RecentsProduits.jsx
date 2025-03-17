/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import UserContext from '@/utils/UserContext';
import Card from '@/components/Products/Card';
import { addToPanier } from "@/service/PanierService";
import { addToWishlist } from "@/service/WishlistService";
import { Link } from "react-router";
import { getEntities, getRecentsEntities } from "@/service/EntitesService";

const RecentsProduits = () => {
  const { user, panier, wishlist, setPanier, setWishlist } = useContext(UserContext);

  const [produits, setProduits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sousCategories, setSousCategories] = useState([]);
  const [marques, setMarques] = useState([]);
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setProduits(await getRecentsEntities("recentProduits"));
    }; 
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setCategories(await getEntities("categories"));
      setSousCategories(await getEntities("sousCategories"));
      setMarques(await getEntities("marques"));
      setPromotions(await getEntities("promotions"));
    }; 
    fetchData();
  }, []);
  
  const formattedProduits = produits.map((item) => {
    const promotion = promotions.find(p => p.promotion_id === item.promotion_id);
    const remise = promotion ? promotion.reduction : 0;
    const prixApresPromo = remise ? (Number(item.prix) - (Number(item.prix) * remise / 100)).toFixed(2) : Number(item.prix).toFixed(2);
  
    const sousCategorie = sousCategories.find(s => s.sous_categorie_id === item.sous_categorie_id);  
    const categorie = sousCategorie ? categories.find(c => c.categorie_id === sousCategorie.categorie_id) : null;

    return {
      ...item,
      categorie: categorie ? categorie.titre : "Non défini",
      categorie_id: categorie ? categorie.categorie_id : null,
      sous_categorie: sousCategorie ? sousCategorie.titre : "Non défini",
      marque: marques.find(m => m.marque_id === item.marque_id)?.nom || "Non défini",
      promotion: promotion ? promotion.nom : "Non défini",
      prix_apres_promo: prixApresPromo
    };
  });
  
  const [formData, setFormData] = useState({ client_id: '', produit_id: '', quantite: '' });
  const [panierAjoute, setPanierAjoute] = useState(false);

  const ajouterAuPanier = (produit_id, quantiteAjoutee) => {
    const produitExistant = panier?.find(item => item.produit_id === produit_id);
    
    setFormData((prevData) => ({
      ...prevData,
      client_id: user?.id,
      produit_id: produit_id,
      quantite: produitExistant 
        ? (produitExistant.pivot?.quantite 
            ? parseInt(produitExistant.pivot.quantite) + parseInt(quantiteAjoutee) 
            : parseInt(produitExistant.quantite) + parseInt(quantiteAjoutee)) 
        : quantiteAjoutee,
    }));
  
    setPanierAjoute(true);
  };  

  const ajouterAuListeSouhait = async (produit_id) => {
    try {
      const produit = produits.find(item => item.produit_id === produit_id);
      
      const wishlistItem = { client_id: user?.id, produit_id };
      await addToWishlist(wishlistItem);
      setWishlist((prevWishlist) => {
        return [...prevWishlist, produit];
      });  
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
          setPanier((prevProduits) => {
            const produitExistant = prevProduits.find(item => item.produit_id === formData.produit_id);
          
            if (produitExistant) {
              return prevProduits.map(item =>
                item.produit_id === formData.produit_id ? 
                  { ...item, pivot: {
                    ...item.pivot,
                    quantite: formData.quantite,
                  }} : item
              );
            } else {
              const produit = produits.find(item => item.produit_id === formData.produit_id);
              if (produit) {
                return [...prevProduits, { ...produit, pivot: { quantite: formData.quantite } }];
              }
              return prevProduits;
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
    <div className="px-8 py-12">
      <div className="flex flex-col items-center text-center mb-5">
        <div className="flex items-center w-full justify-center">
          <div className="border-t-2 w-20 mr-5"></div> 
          <h1 className="text-2xl font-semibold uppercase">Produits récents</h1>
          <div className="border-t-2 w-20 ml-5"></div> 
        </div>
        <p className="italic text-gray-500">Nouveautés cette semaine</p>
      </div>
      <div className="mt-10 gap-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {produits.length > 0 &&
          formattedProduits.map((produit, index) => {
            return <Card key={index} wishlist={wishlist} produit={produit} ajouterAuPanier={ajouterAuPanier} ajouterAuListeSouhait={ajouterAuListeSouhait} />;
          })
        }
      </div>

      <div className="flex justify-center">
        <Link to={"/shop"} className="mt-4 bg-purpleLight text-white text-[14px] py-2 px-6 rounded-md">
          Voir tous les produits
        </Link>
      </div>
    </div>

  );
};

export default RecentsProduits;
