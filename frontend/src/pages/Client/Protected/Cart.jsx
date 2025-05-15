import { useEffect, useState, useContext } from "react";
import CartTable from "@/components/Tables/CartTable";
import UserContext from '@/utils/UserContext';
import { getEntityBy } from "@/service/EntitesService";
import usePanierWishlist from "./usePanierWishlist";
import ProduitsSection from "@/components/Produits/ProduitsSection";
import { getRecommandations } from "@/service/EntitesService";

const Cart = () => {
    const { panier } = useContext(UserContext);
    const [produits, setProduits] = useState(null);
    const [produitsRecommandes, setProduitsRecommandes] = useState([]);
    const [codePromotion, setCodePromotion] = useState(null);

    useEffect(() => {
        setProduits(panier);
    }, [panier]);

    useEffect(() => {
        const fetchData = async () => {
            setProduitsRecommandes((await getRecommandations("recommend_similar_produits", { produit_ids: produits.map(produit => (produit.produit_id)), interaction_type: "ajout_panier" }))?.data ?? []);
        }; 
        if (produits?.length > 0) {
            fetchData();
        }
      }, [produits]);

    const handleCodePromotion = async (code) => {
        setCodePromotion(await getEntityBy("codePromotions", "code", code));
    };

    const { ajouterAuPanier, modifierQuantitePanier, supprimerDePanier } = usePanierWishlist(produits);
    
    return (
        <>
            <CartTable produits={produits} modifierQuantitePanier={modifierQuantitePanier} codePromotion={codePromotion} 
                handleCodePromotion={handleCodePromotion} supprimerProduit={supprimerDePanier} ajouterAuPanier={ajouterAuPanier}/>
            <div className="bg-customLight dark:bg-customDark">
                <ProduitsSection titre="Suggestions pour vous" sousTitre="Découvrez notre sélection du moment" produits={produitsRecommandes} />
            </div>
        </>
    );
};

export default Cart;
