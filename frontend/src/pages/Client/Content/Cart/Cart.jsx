import { useEffect, useState, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../../Footer/Footer";
import CartTable from "@/components/Tables/CartTable";
import { getPanier, updatePanier } from "@/service/PanierService";
import { getCodePromotionByCode } from "@/service/CodePromotionService";
import UserContext from '@/utils/UserContext';

const Cart = () => {
    const { user, setUser } = useContext(UserContext);
    const [formData, setFormData] = useState(null);
    const [produitsCount, setProduitsCount] = useState(null); 
    const [codePromotion, setCodePromotion] = useState(null);
    const [codePromotionError, setCodePromotionError] = useState(null);

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

    useEffect(() => {
        if (formData) {
            const timeout = setTimeout(async () => {
                try {
                    await updatePanier(formData.panier_id, formData);
                    console.log("Panier mis à jour");
                } catch (error) {
                    console.error("Erreur lors de la mise à jour du panier:", error);
                }
            }, 1000);
    
            return () => clearTimeout(timeout);
        }
    }, [formData]);    
    
    const handleCodePromotion = async (code) => {
        try {
            const codePromotion = await getCodePromotionByCode(code);
            setCodePromotion(codePromotion);
            setCodePromotionError(null);
        } catch (error) {
            console.error("Erreur lors de la récupération du code promotion:", error);
            setCodePromotionError(error.message);
            setCodePromotion(null);
        }
    };

    const supprimerProduit = async (produit_id) => {
        try {
            const newProduits = formData.produits.filter(produit => produit.produit_id !== produit_id);
            
            // Mise à jour du panier sans supprimer l'objet panier
            const newFormData = { ...formData, produits: newProduits };
            setFormData(newFormData);  
    
            // Mise à jour du panier dans la base de données
            await updatePanier(newFormData.panier_id, newFormData);
            setProduitsCount(newFormData.produits.reduce((total) => total + 1, 0));
        } catch (error) {
            console.error("Erreur lors de la suppression du produit:", error);
            alert("Une erreur est survenue lors de la suppression du produit");
        }
    };
     
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
        <div className="bg-contentLight dark:bg-contentDark duration-200">
            <CartTable formData={formData} setFormData={setFormData} codePromotion={codePromotion} handleCodePromotion={handleCodePromotion} codePromotionError={codePromotionError} supprimerProduit={supprimerProduit}/>
            <Footer />
        </div>
    );
};

export default Cart;
