import { useEffect, useState, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import img from "@/assets/default/image.png";
import Footer from "../../Footer/Footer";
import UserContext from '@/utils/UserContext';

const Wishlist = () => {
    const { user } = useContext(UserContext);
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

    return (
        <div>
            <section className="mx-6 py-6">
                <div className="flex flex-col">
                    <div className="inline-block min-w-full py-2">
                        <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm">
                            <h1 className="text-2xl font-semibold mb-4">Liste de souhait</h1>
                            {produits?.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 rounded-lg">
                                    {produits.map((produit, index) => (
                                        <div 
                                            key={index} 
                                            className="flex p-4 border border-borderGrayLight dark:border-borderDark rounded-lg"
                                        >
                                            <div className="flex items-center">
                                                <img 
                                                    src={produit.image ? `/produits/${produit.image}` : img} 
                                                    alt={produit.nom} 
                                                    onError={(e) => (e.target.src = img)} 
                                                    className="w-16 h-16 object-cover mx-auto rounded"
                                                />
                                            </div>
                                            
                                            <div className="flex flex-col flex-grow ml-4 ">
                                                <p className="text-gray-700 dark:text-gray-300">{produit.nom}</p>
                                                <p className="text-gray-700 dark:text-gray-300">Prix: ${produit.prix}</p>
                                                <p className="text-gray-500 dark:text-gray-400 text-sm">{produit.status}</p>
                                            </div>

                                            <div className="flex items-end justify-end">
                                                <button className="text-xs p-1 bg-purpleLight text-white rounded-lg hover:bg-purpleLightHover transition">
                                                    Déplacer au panier
                                                </button>
                                            </div>
                                        </div>
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
