import { FaArrowUp } from 'react-icons/fa';
import { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import Card from "@/components/Products/Card";
import List from "@/components/Products/List";
import "aos/dist/aos.css";
import Filtre from "@/components/Products/FiltreAsma";
import FiltreHeader from "@/components/Products/FiltreHeader";
import { getProduits } from "@/service/ProduitService";
import { getCategories } from "@/service/CategorieService";
import { getSousCategories } from "@/service/SousCategorieService";
import { getMarques } from "@/service/MarqueService";
import { getPromotions } from "@/service/PromotionService";
import { getCouleurs } from "@/service/CouleurService";

const Shop = () => {
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

    return {
      ...item,
      categorie: categorie ? categorie.titre : "Non défini",
      sous_categorie: sousCategorie ? sousCategorie.titre : "Non défini",
      marque: marques.find(m => m.marque_id === item.marque_id)?.nom || "Non défini",
      promotion: promotion ? promotion.nom : "Non défini",
      prix_apres_promo: prixApresPromo,
      couleurs: item.couleurs && Array.isArray(item.couleurs) ? 
                item.couleurs.map(couleur => couleur.nom).join(", ") : "Aucune couleur", 
    };
  });


  return (
    <div className="px-8 dark:bg-customDark">
      <FiltreHeader onChange={setGridCols} onToggleView={setIsGrid} isGrid={isGrid} gridCols={gridCols} produits={produits} setProduits={setProduits} />
      <Filtre categories={categories} marques={marques} couleurs={couleurs} /> {/* onApplyFilters={setFilters} */}
      <div className={`mt-10 ${isGrid ? `grid grid-cols-${gridCols} gap-6` : "flex flex-col gap-4"}`}>
        {formattedProduits.map((produit,index) => (
          isGrid ? (
            <Card key={index} produit={produit} />
          ) : (
            <List key={index} produit={produit} />
          )
        ))}
      </div>

      {isVisible && ( <button onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" })}}
        className="fixed bottom-16 right-4 bg-purpleLight text-white p-4 rounded-full shadow-lg hover:bg-purpleLight transition-all transform hover:scale-110 z-10">
          <FaArrowUp />
      </button>)}

      <Footer />
    </div>
  );
};

export default Shop;
