import { FaArrowUp } from 'react-icons/fa';
import { useState, useEffect, useContext } from "react";
import Footer from "../../Footer/Footer";
import "aos/dist/aos.css";
import { getProduits } from "@/service/ProduitService";
import { getCategories } from "@/service/CategorieService";
import { getSousCategories } from "@/service/SousCategorieService";
import { getMarques } from "@/service/MarqueService";
import { getPromotions } from "@/service/PromotionService";
import { getCouleurs } from "@/service/CouleurService";
import FilteredProducts from '@/components/Products/FilteredProducts';
import { getPanier, updatePanier } from "@/service/PanierService";
import UserContext from '@/utils/UserContext';

const Shop = () => {
  const { user, setUser } = useContext(UserContext);

  const [gridCols, setGridCols] = useState(3);
  const [isGrid, setIsGrid] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const [produits, setProduits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sousCategories, setSousCategories] = useState([]);
  const [marques, setMarques] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [couleurs, setCouleurs] = useState([]); 

  useEffect(() => { 
    (async () => {
      setProduits(await getProduits()); 
    })(); 
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategories(await getCategories());
        setSousCategories(await getSousCategories());
        setMarques(await getMarques());
        setPromotions(await getPromotions());
        setCouleurs(await getCouleurs());
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {setIsVisible(window.scrollY > 200)});
    return () => window.removeEventListener("scroll", () => {setIsVisible(window.scrollY > 200)});
  }, []);

  const formattedProduits = produits.map((item) => {
    const promotion = promotions.find(p => p.promotion_id === item.promotion_id);
    const remise = promotion ? promotion.reduction : 0;
    const prixApresPromo = remise ? (Number(item.prix) - (Number(item.prix) * remise / 100)).toFixed(2) : Number(item.prix).toFixed(2);
  
    const sousCategorie = sousCategories.find(s => s.sous_categorie_id === item.sous_categorie_id);  
    const categorie = sousCategorie ? categories.find(c => c.categorie_id === sousCategorie.categorie_id) : null;
  
    const couleursList = item.couleurs ? item.couleurs.map(couleur => ({
      couleur_id: couleur.couleur_id,
      code_hex: couleur.code_hex,
      quantite: couleur.pivot.quantite
    })) : [{ couleur_id: null, code_hex: null, quantite: null }];
  
    return {
      ...item,
      categorie: categorie ? categorie.titre : "Non défini",
      categorie_id: categorie ? categorie.categorie_id : null,
      sous_categorie: sousCategorie ? sousCategorie.titre : "Non défini",
      marque: marques.find(m => m.marque_id === item.marque_id)?.nom || "Non défini",
      promotion: promotion ? promotion.nom : "Non défini",
      prix_apres_promo: prixApresPromo,
      couleurs: couleursList
    };
  });
  
  const filtres = {categories, marques, couleurs};
  const gridInfo = {isGrid, setIsGrid, gridCols, setGridCols}
  
  const [formData, setFormData] = useState(null);
  const [produitsCount, setProduitsCount] = useState(null); 

  useEffect(() => {
    const fetchPanier = async () => {
        if (user?.panier?.panier_id) {
            try {
                const panier = await getPanier(user.panier.panier_id);
                setFormData(panier);
            } catch (error) {
                console.error("Erreur lors de la récupération du panier:", error);
                alert('Une erreur est survenue lors de la récupération du panier');
            }
        }
    };
    fetchPanier();
  }, [user]);

  const ajouterAuPanier = (produit_id) => {
    setFormData((prevFormData) => {
      const produitExist = prevFormData.produits.some(
        (item) => item.produit_id === produit_id
      );
      
      if (produitExist) {
        return {
          ...prevFormData,
          produits: prevFormData.produits.map((item) =>
            item.produit_id === produit_id
              ? { ...item, quantite: item.quantite + 1 }
              : item
          ),
        };
      } else {
        return {
          ...prevFormData,
          produits: [
            ...prevFormData.produits,
            { produit_id: produit_id, quantite: 1 },
          ],
        };
      }
    });
  };
  
  useEffect(() => {
    if (formData) {
        const timeout = setTimeout(async () => {
            try {
                await updatePanier(formData.panier_id, formData);
                setProduitsCount(formData.produits.reduce((total) => total + 1, 0));
                console.log("Panier mis à jour");
            } catch (error) {
                console.error("Erreur lors de la mise à jour du panier:", error);
            }
        }, 1000);

        return () => clearTimeout(timeout);
    }
  }, [formData]);
  
  useEffect(() => {
    if (produitsCount) {
      setUser((prevUser) => ({
        ...prevUser,
        panier: {
            ...prevUser.panier,
            produits_count: produitsCount,
        }
      }));
    }
  }, [produitsCount, setUser]);

  return (
    <div className="px-8">
      <FilteredProducts datas={formattedProduits} gridInfo={gridInfo} filtres={filtres} ajouterAuPanier={ajouterAuPanier} setFormData={setFormData} />

      {isVisible && ( <button onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" })}}
        className="fixed bottom-16 right-4 bg-purpleLight text-white p-4 rounded-full shadow-lg hover:bg-purpleLight transition-all transform hover:scale-110 z-10">
          <FaArrowUp />
      </button>)}

      <Footer />
    </div>
  );
};

export default Shop;
