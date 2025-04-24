import { useEffect, useState, useContext } from "react";
import CartTable from "@/components/Tables/CartTable";
import UserContext from '@/utils/UserContext';
import { getEntityBy } from "@/service/EntitesService";
import usePanierWishlist from "./usePanierWishlist";

const Cart = () => {
    const { panier } = useContext(UserContext);
    const [produits, setProduits] = useState(null);
    const [codePromotion, setCodePromotion] = useState(null);
    const [Error, setPromoError] = useState('');

    useEffect(() => {
        setProduits(panier);
    }, [panier]);

    const handleCodePromotion = async (code) => {
        if (!code) {
            setPromoError('Le code promo est vide.');
            console.log('Le code promo est vide.');
            return;
        }
    
        try {
            // Appel à l'API pour vérifier le code promo
            const response = await getEntityBy("codePromotions", "code", code);
            console.log(response);
            
            // Vérification si le code promo a été trouvé ou non
            if (response.promoFound === false) {
                setPromoError(response.message); // Afficher le message d'erreur du backend
                setCodePromotion(null);
            } else {
                setPromoError(''); // Réinitialiser l'erreur si promo trouvée
                setCodePromotion(response.promotion); // Afficher les détails de la promo
            }
        } catch (error) {
            setPromoError('Une erreur est survenue. Veuillez réessayer.');
            setCodePromotion(null);
        }
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
            Error={Error}  // Passage du promoError ici
        />

    );
};

export default Cart;
