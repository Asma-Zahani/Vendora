import { useEffect, useState, useContext } from "react";
import CartTable from "@/components/Tables/CartTable";
import UserContext from '@/utils/UserContext';
import { getEntityBy } from "@/service/EntitesService";
import usePanierWishlist from "./usePanierWishlist";

const Cart = () => {
    const { panier } = useContext(UserContext);
    const [produits, setProduits] = useState(null);
    const [codePromotion, setCodePromotion] = useState(null);
    const [codePromotionError, setCodePromotionError] = useState(null);

    useEffect(() => {
        setProduits(panier);
    }, [panier]);

    const handleCodePromotion = async (code) => {
        try {
            setCodePromotion(await getEntityBy("codePromotions", "code", code));
            setCodePromotionError(null);
        } catch (error) {
            console.error("Erreur lors de la récupération du code promotion:", error);
            setCodePromotionError(error.message);
            setCodePromotion(null);
        }
    };  

    const { modifierQuantitePanier, supprimerDePanier } = usePanierWishlist(produits);
    
    return (
        <CartTable 
            produits={produits}
            modifierQuantitePanier={modifierQuantitePanier}
            codePromotion={codePromotion} 
            handleCodePromotion={handleCodePromotion} 
            codePromotionError={codePromotionError}
            supprimerProduit={supprimerDePanier}
        />
    );
};

export default Cart;
