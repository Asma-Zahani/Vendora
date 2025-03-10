/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import AOS from "aos";
import UserContext from '@/utils/UserContext';
import Card from "@/components/Products/Card";
import { addToPanier } from "@/service/PanierService";
import { deleteFromWishlist } from "@/service/WishlistService";
import { getCategories } from "@/service/CategorieService";
import { getSousCategories } from "@/service/SousCategorieService";
import { getMarques } from "@/service/MarqueService";
import { getPromotions } from "@/service/PromotionService";
import { HeartOff } from "lucide-react";

const Wishlist = () => {
    const { user, panier, wishlist, setPanier, setWishlist } = useContext(UserContext);
    const [produits, setProduits] = useState(null);
    
    const [categories, setCategories] = useState([]);
    const [sousCategories, setSousCategories] = useState([]);
    const [marques, setMarques] = useState([]);
    const [promotions, setPromotions] = useState([]);

    useEffect(() => {
        AOS.init({ 
            offset: 100,
            duration: 800,
            easing: "ease-in-sine",
            delay: 100,
        });
        AOS.refresh();
    }, []);

    useEffect(() => {
        setProduits(wishlist);
    }, [wishlist]); 

    useEffect(() => {
      const fetchCategories = async () => {
        try {
          setCategories(await getCategories());
          setSousCategories(await getSousCategories());
          setMarques(await getMarques());
          setPromotions(await getPromotions());
        } catch (error) {
          console.error("Erreur lors de la récupération des données :", error);
        }
      };
      fetchCategories();
    }, []);

    const formattedProduits = produits?.map((item) => {
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
    
    const effacerDeListeSouhait = async (produit_id) => {
        try {
            await deleteFromWishlist({ client_id: user?.id, produit_id });
            setWishlist((prevWishlist) => prevWishlist.filter(item => item.produit_id !== produit_id));
            console.log("Produit supprimé de la liste de souhaits avec succès");
        } catch (error) {
            console.error("Erreur lors de la suppression de la liste de souhaits:", error);
        }
    };    

    return (
      <section className="mx-6 py-6">
        <div className="flex flex-col">
            <div className="inline-block min-w-full py-2">
                <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm">
                    {produits?.length > 0 && <h1 className="text-2xl font-semibold mb-4">Liste de souhait</h1>}
                    {produits?.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 rounded-lg">
                            {formattedProduits.map((produit, index) => (
                                <Card key={index} wishlist={wishlist} produit={produit} ajouterAuPanier={ajouterAuPanier} effacerDeListeSouhait={effacerDeListeSouhait} />
                            ))}
                        </div>
                    ) : (
                      <div className="flex items-center justify-center text-center h-100">
                        <div className="flex flex-col max-w-lg">
                            <div className="p-3 mx-auto text-purpleLight">
                                <HeartOff size={80} />
                            </div>
                            <h1 className="mt-3 text-2xl font-semibold uppercase text-gray-800 dark:text-white">votre liste de souhait est vide</h1>
                            <div className="pt-2 text-sm">
                              <p>Vous n&apos;avez pas encore de produits dans votre liste de souhaits.</p>
                              <p>Vous trouverez de nombreux produits intéressants sur notre page &quot;Boutique&quot;.</p>
                            </div>
                        </div>
                      </div>
                    )}
                </div>
            </div>
        </div>
      </section>
    );
};

export default Wishlist;
