/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SuccessMessageContext } from "@/utils/SuccessMessageContext";
import { createEntity, deleteEntity } from "@/service/EntitesService";
import UserContext from '@/utils/UserContext';
 
const usePanierWishlist = (produits) => {
    const { user, panier, setPanier, setWishlist } = useContext(UserContext);
    const navigate = useNavigate();

    const { setSuccessMessage } = useContext(SuccessMessageContext);

    const [formData, setFormData] = useState({ client_id: '', produit_id: '', quantite: '' });
    const [panierAjoute, setPanierAjoute] = useState(false);

    const ajouterAuPanier = (produit_id, quantiteAjoutee, couleur) => {
        if (!user) { navigate("/login"); return};
        const produitExistant = panier?.find(item => item.produit_id === produit_id); 

        let quantiteTotale = parseInt(quantiteAjoutee);
        let nouvelleCouleur = couleur;

        if (produitExistant) {
            const couleurExistante = produitExistant.couleur;
    
            if (couleurExistante === couleur) {
                const quantiteActuelle = produitExistant.pivot?.quantite
                    ? parseInt(produitExistant.pivot.quantite)
                    : parseInt(produitExistant.quantite);
                quantiteTotale = quantiteActuelle + parseInt(quantiteAjoutee);
            } else {
                quantiteTotale = parseInt(quantiteAjoutee);
                nouvelleCouleur = couleur;
            }
        }
        setFormData({client_id: user?.id, produit_id: produit_id, quantite: quantiteTotale, couleur: nouvelleCouleur});
        setPanierAjoute(true);
    };

    const modifierQuantitePanier = (produit_id, nouvelleQuantite) => {
        const produitExistant = produits.find(item => item.produit_id === produit_id);
        if (produitExistant) {
            setFormData({client_id: user?.id, produit_id: produit_id, quantite: nouvelleQuantite});
        }
        setPanierAjoute(true);
    };

    const supprimerDePanier = async (produit_id) => {
        const data = await deleteEntity("panier", user?.id+"/"+produit_id);
        if (data.message) {
          setSuccessMessage(data.message);
          setPanier((prevProduits) => prevProduits.filter(item => item.produit_id !== produit_id));
        }
    };

    const ajouterAuListeSouhait = async (produit_id) => {
        if (!user) { navigate("/login"); return;};
        const data = await createEntity("souhait", { client_id: user?.id, produit_id });
        if (data.message) {
            const produit = produits.find(item => item.produit_id === produit_id);
            setSuccessMessage(data.message);
            setWishlist(prevWishlist => [...prevWishlist, produit]);
        }
    };

    const supprimerDeListeSouhait = async (produit_id) => {
        const data = await deleteEntity("souhait", user?.id+"/"+produit_id);
        if (data.message) {
          setSuccessMessage(data.message);
          setWishlist((prevWishlist) => prevWishlist.filter(item => item.produit_id !== produit_id));
        }
    };
    
    useEffect(() => {
        if (panierAjoute && formData) {
        const timeout = setTimeout(async () => {
            const data = await createEntity("panier", formData);
            
            if (data.message) {
                setSuccessMessage(data.message);
                setPanier((prevProduits) => {
                    const produitExistant = prevProduits.find(item => item.produit_id === formData.produit_id);
                    
                    if (produitExistant) {
                    return prevProduits.map(item =>
                        item.produit_id === formData.produit_id ? 
                        { ...item, pivot: {
                            ...item.pivot,
                            quantite: formData.quantite,
                            couleur: formData.couleur ? formData.couleur : produitExistant.pivot.couleur,
                        }} : item
                    );
                    } else {
                    const produit = produits.find(item => item.produit_id === formData.produit_id);
                    if (produit) {
                        return [...prevProduits, { ...produit, pivot: { quantite: formData.quantite, couleur: formData.couleur } }];
                    }
                    return prevProduits;
                    }
                });
            }
            setPanierAjoute(false);
        }, 1000);
    
        return () => clearTimeout(timeout);
        }
    }, [panierAjoute, formData]);

    return { ajouterAuPanier, ajouterAuListeSouhait, modifierQuantitePanier, supprimerDePanier, supprimerDeListeSouhait };
};

export default usePanierWishlist;