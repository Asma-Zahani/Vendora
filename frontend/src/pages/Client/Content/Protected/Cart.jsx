import { useEffect, useState, useContext } from "react";
import CartTable from "@/components/Tables/CartTable";
import UserContext from '@/utils/UserContext';
import { getEntityBy } from "@/service/EntitesService";
import usePanierWishlist from "./usePanierWishlist";

const Cart = () => {
    const { panier } = useContext(UserContext);
    const [produits, setProduits] = useState(null);
    const [codePromotion, setCodePromotion] = useState(null);

    useEffect(() => {
        setProduits(panier);
    }, [panier]);

    const handleCodePromotion = async (code) => {
        setCodePromotion(await getEntityBy("codePromotions", "code", code));
    };  

    const { ajouterAuPanier, modifierQuantitePanier, supprimerDePanier } = usePanierWishlist(produits);
    
    return (
        <CartTable 
            produits={produits}
            modifierQuantitePanier={modifierQuantitePanier}
            codePromotion={codePromotion} 
            handleCodePromotion={handleCodePromotion} 
            supprimerProduit={supprimerDePanier}
            ajouterAuPanier={ajouterAuPanier}
        />
    );
};

export default Cart;
