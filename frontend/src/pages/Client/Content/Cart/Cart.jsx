/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../../Footer/Footer";
import CartTable from "@/components/Tables/CartTable";
import { getPanier, updatePanier } from "@/service/PanierService";
import UserContext from '@/utils/UserContext';

const Cart = () => {
    const { user } = useContext(UserContext);
    const [formData, setFormData] = useState(null);

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
    
    const modifierPanier = async () => {
        try {      
            if (!formData) {
                alert("Aucune donnée de panier à modifier");
                return;
            }
            await updatePanier(formData.panier_id, formData);
            alert(`Panier modifié avec succès`);
        } catch (error) {
            console.error("Erreur de modification:", error);
            alert("Une erreur est survenue lors de la modification du panier");
        }
    };
    
    return (
        <div className="bg-contentLight dark:bg-contentDark duration-200">
            <CartTable formData={formData} setFormData={setFormData} />
            <Footer />
        </div>
    );
};

export default Cart;
