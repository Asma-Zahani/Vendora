/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../../Footer/Footer";
import UserContext from '@/utils/UserContext';
import Card from "@/components/Products/Card";
import { addToPanier, deleteFromWishlist } from "@/service/ClientService";

const Wishlist = () => {
    const { user, setUser } = useContext(UserContext);
    const [produits, setProduits] = useState(null);

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
        setProduits(user.wishlist);
    }, [user]); 

    const [formData, setFormData] = useState({ client_id: '', produit_id: '', quantite: '' });
    const [panierAjoute, setPanierAjoute] = useState(false);

    const ajouterAuPanier = (produit_id, quantiteAjoutee) => {
        const produitExistant = user?.produits?.find(item => item.produit_id === produit_id);
        
        console.log(quantiteAjoutee);
    
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
          console.log(formData);
          const timeout = setTimeout(async () => {
            try {
              await addToPanier(formData);
              setUser((prevUser) => {
                const produitExistant = prevUser.produits.find(item => item.produit_id === formData.produit_id);
      
                if (produitExistant) {
                  return {
                    ...prevUser,
                    produits: prevUser.produits.map(item =>
                      item.produit_id === formData.produit_id
                        ? {
                            ...item,
                            pivot: {
                              ...item.pivot,
                              quantite: (formData.quantite),
                            },
                          }
                        : item
                    ),
                  };
                } else {
                  const produit = produits.find(item => item.produit_id === formData.produit_id);
                  return {
                    ...prevUser,
                    produits: [
                      ...prevUser.produits,
                      { ...produit, quantite: formData.quantite },
                    ],
                  };
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
    
            setUser((prevUser) => ({
                ...prevUser,
                wishlist: prevUser.wishlist.filter(item => item.produit_id !== produit_id),
            }));
    
            console.log("Produit supprimé de la liste de souhaits avec succès");
        } catch (error) {
            console.error("Erreur lors de la suppression de la liste de souhaits:", error);
        }
    };    

    return (
        <div>
            <section className="mx-6 py-6">
                <div className="flex flex-col">
                    <div className="inline-block min-w-full py-2">
                        <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm">
                            <h1 className="text-2xl font-semibold mb-4">Liste de souhait</h1>
                            {produits?.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 rounded-lg">
                                    {produits.map((produit, index) => (
                                        <Card key={index} user={user} produit={produit} ajouterAuPanier={ajouterAuPanier} wishlist={true} effacerDeListeSouhait={effacerDeListeSouhait} />
                                    ))}
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Wishlist;
