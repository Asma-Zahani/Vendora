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

    const ajouterAuPanier = (produit_id, quantiteAjoutee, couleur, ancienne_couleur) => {
        if (!user) { navigate("/login"); return; }

        const produitExistant = panier?.find(item => 
            item.produit_id === produit_id && item.pivot?.couleur === couleur
        );
    
        let quantiteTotale = parseInt(quantiteAjoutee);
    
        if (produitExistant) {
            const quantiteActuelle = produitExistant.pivot?.quantite
                ? parseInt(produitExistant.pivot.quantite)
                : parseInt(produitExistant.quantite);
            quantiteTotale = quantiteActuelle + parseInt(quantiteAjoutee);
        }
    
        setFormData({
            client_id: user?.id,
            produit_id: produit_id,
            quantite: quantiteTotale,
            couleur: couleur,
            ancienne_couleur: ancienne_couleur
        });
    
        setPanierAjoute(true);
    };
    

    const modifierQuantitePanier = async (produit_id, nouvelleQuantite, couleur) => {        
        const produitExistant = produits.find(item => {
            const sameId = item.produit_id == produit_id;            
            const sameColor = couleur ? item.pivot?.couleur === couleur : true;            
            return sameId && sameColor;
        });
        if (produitExistant) {
            setFormData({
                client_id: user?.id,
                produit_id: produit_id,
                quantite: nouvelleQuantite,
                couleur: couleur
            });
            setPanierAjoute(true);
        }
    };
    

    const supprimerDePanier = async (produit_id, couleur) => {
        const data = await deleteEntity("supprimerDuPanier", null, {
            client_id: user?.id,
            produit_id,
            couleur,
        });

        const produitExistant = panier?.find(item => 
            item.produit_id === produit_id && item.pivot?.couleur === couleur
        );
        
        if (data.message) {
          setSuccessMessage(data.message);
          setPanier((prevProduits) => prevProduits.filter(item => item !== produitExistant));
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
                        let updatedPanier = [...prevProduits];
    
                        // Étape 1 : Supprimer l'ancien produit si ancienne_couleur existe
                        if (formData.ancienne_couleur) {
                            updatedPanier = updatedPanier.filter(item =>
                                !(item.produit_id === formData.produit_id && item.pivot?.couleur === formData.ancienne_couleur)
                            );
                        }
    
                        // Étape 2 : Vérifier si un produit avec la nouvelle couleur existe
                        const produitExistant = updatedPanier.find(item =>
                            item.produit_id === formData.produit_id &&
                            item.pivot?.couleur === formData.couleur
                        );
    
                        if (produitExistant) {
                            // Mise à jour de la quantité
                            return updatedPanier.map(item =>
                                item.produit_id === formData.produit_id && item.pivot?.couleur === formData.couleur
                                    ? {
                                        ...item,
                                        pivot: {
                                            ...item.pivot,
                                            quantite: formData.quantite,
                                            couleur: formData.couleur
                                        }
                                    }
                                    : item
                            );
                        } else {
                            // Ajout d'un nouveau produit
                            const produit = produits.find(item => item.produit_id === formData.produit_id);
                            if (produit) {
                                return [
                                    ...updatedPanier,
                                    {
                                        ...produit,
                                        pivot: {
                                            quantite: formData.quantite,
                                            couleur: formData.couleur
                                        }
                                    }
                                ];
                            }
                            return updatedPanier;
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