import { useEffect, useState, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CartTable from "@/components/Tables/CartTable";
import { getCodePromotionByCode } from "@/service/CodePromotionService";
import { addToPanier, deleteFromPanier } from "@/service/PanierService";
import UserContext from '@/utils/UserContext';

const Cart = () => {
    const { user, panier, setPanier } = useContext(UserContext);
    const [produits, setProduits] = useState(null);
    const [formData, setFormData] = useState(null);
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
        setProduits(panier);
    }, [panier]);

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

    const [panierUpdate, setPanierUpdate] = useState(false);
    const [panierDelete, setPanierDelete] = useState(false);

    const modifierQuantitePanier = (produit_id, nouvelleQuantite) => {
        const produitExistant = produits.find(item => item.produit_id === produit_id);
    
        if (produitExistant) {
            setFormData({
                client_id: user?.id,
                produit_id: produit_id,
                quantite: nouvelleQuantite,
            });
        }
        setPanierUpdate(true);
    };
    
    const supprimerProduit = (produit_id) => {
        const produitExistant = produits.find(item => item.produit_id === produit_id);
    
        if (produitExistant) {
            setFormData({
                client_id: user?.id,
                produit_id: produit_id
            });
        }
        setPanierDelete(true);
    };

    useEffect(() => {
        const handleDelete = async () => {
            if (panierDelete && formData) {
                try {
                    await deleteFromPanier(formData);
                    setPanier((prevProduits) => prevProduits.filter(item => item.produit_id !== formData.produit_id));
                    console.log("Element effacé du panier");
                } catch (error) {
                    console.error("Erreur lors de la mise à jour du panier:", error);
                }
                setPanierDelete(false);
            }
        };
    
        handleDelete();
    }, [panierDelete, formData, setPanier]);
    

    useEffect(() => {
        if (panierUpdate && formData) {
            const timeout = setTimeout(async () => {
                try {
                    await addToPanier(formData);
                    console.log("Panier mis à jour");
                } catch (error) {
                    console.error("Erreur lors de la mise à jour du panier:", error);
                }
                setPanierUpdate(false);
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [panierUpdate, formData]);

    return (
        <CartTable 
            produits={produits}
            modifierQuantitePanier={modifierQuantitePanier}
            codePromotion={codePromotion} 
            handleCodePromotion={handleCodePromotion} 
            codePromotionError={codePromotionError}
            supprimerProduit={supprimerProduit}
        />
    );
};

export default Cart;
