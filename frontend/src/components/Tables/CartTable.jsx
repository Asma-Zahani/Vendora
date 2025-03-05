/* eslint-disable react/prop-types */
import { Link } from "react-router";
import { useState } from "react";
import EmptyCardState from "./EmptyCardState";
import img from "@/assets/default/image.png";
import { useNavigate } from "react-router-dom";
import DeleteModal from "@/components/Modals/DeleteModal";
import { CircleX, Minus, Plus } from "lucide-react";

const CartTable = ({ produits, modifierQuantitePanier, codePromotion, handleCodePromotion, codePromotionError, supprimerProduit }) => {
    const navigate = useNavigate();
    const [promoCode, setPromoCode] = useState("");

    const [selectedItem, setSelectedItem] = useState(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const getTotalPrices = () => {
        if (!produits) return { original: 0, discounted: 0 };
    
        let originalTotal = produits.reduce((sum, produit) => sum + produit.prix * (produit.pivot?.quantite ?? produit.quantite), 0);
        let discountedTotal = originalTotal;
    
        if (codePromotion) {
            const discount = (originalTotal * codePromotion.reduction) / 100;
            discountedTotal = originalTotal - discount;
        }
    
        return {
            original: originalTotal.toFixed(2),
            discounted: discountedTotal.toFixed(2),
        };
    };

    const handleQuantityChange = (index, action) => {
        const updatedProduits = [...produits];
        const produit = updatedProduits[index];
        
        if (action === "increment") {
            if (produit.pivot && produit.pivot.quantite) {
                produit.pivot.quantite += 1;
            } else if (produit.quantite) {
                produit.quantite += 1;
            } else {
                produit.quantite = 1;
            }
        } else if (action === "decrement" && (produit.pivot?.quantite > 1 || produit.quantite > 1)) {
            if (produit.pivot && produit.pivot.quantite > 1) {
                produit.pivot.quantite -= 1;
            } else if (produit.quantite > 1) {
                produit.quantite -= 1;
            }
        }

        
        modifierQuantitePanier(produit.produit_id, produit.pivot.quantite)
    };

    const handleCheckout = () => {
        if (!produits || produits.length === 0) {
            alert("Votre panier est vide !");
            return;
        }
    
        const checkoutData = {
            produits: produits,
            total: getTotalPrices().discounted,
            PromoId: codePromotion ? codePromotion.code_promotion_id : null,
            codePromo: codePromotion ? codePromotion.code : null,
        };
    
        navigate("/checkout", { state: checkoutData });
    };

    return (
        <section className="mx-6 py-6">
            <div className="flex flex-col">
                <div className="inline-block min-w-full py-2 align-middle">
                    <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm">
                        <h1 className="text-2xl font-semibold mb-4">Panier</h1>
                        {produits && produits.length > 0 ? (
                            <div className="space-y-10">
                                <div className="overflow-x-auto scrollbar">
                                    <table className="min-w-full border-collapse border border-borderGrayLight dark:border-borderDark">
                                        <thead>
                                            <tr className="bg-contentLight dark:bg-contentDark">
                                                <th className="border border-gray-200 dark:border-borderDark px-4 py-6">Produit</th>
                                                <th className="border border-gray-200 dark:border-borderDark px-4 py-2">Nom</th>
                                                <th className="border border-gray-200 dark:border-borderDark px-4 py-2">Prix</th>
                                                <th className="border border-gray-200 dark:border-borderDark px-4 py-2">Quantité</th>
                                                <th className="border border-gray-200 dark:border-borderDark px-4 py-2">Action</th>
                                                <th className="border border-gray-200 dark:border-borderDark px-4 py-2">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {produits.map((produit, index) => (
                                                <tr key={index} className="text-center">
                                                    <td className="border border-borderGrayLight dark:border-borderDark px-4 py-2">
                                                        <img src={produit.image ? (`/produits/${produit.image}`) : img} alt="image" onError={(e) => e.target.src = img} className="w-16 h-16 object-cover mx-auto" />
                                                    </td>
                                                    <td className="border border-borderGrayLight dark:border-borderDark px-4 py-2">{produit.nom}</td>
                                                    <td className="border border-borderGrayLight dark:border-borderDark px-4 py-2">${produit.prix}</td>
                                                    <td className="border border-borderGrayLight dark:border-borderDark px-4 py-2">
                                                        <div className="flex justify-center items-center gap-3">
                                                            <div className="p-2 dark:bg-contentDark rounded-l-md border dark:border-r-0 border-gray-200 dark:border-borderDark">
                                                                <Minus size={16} onClick={() => handleQuantityChange(index, "decrement")} />
                                                            </div>
                                                            <input className="-mx-3 py-1 w-10 text-center bg-transparent border-t border-b border-gray-200 dark:border-borderDark outline-none" type="text" value={produit.pivot?.quantite ? produit.pivot.quantite : produit.quantite} readOnly />
                                                            <div className="p-2 dark:bg-contentDark rounded-r-md border dark:border-l-0 border-gray-200 dark:border-borderDark">
                                                                <Plus size={16} onClick={() => handleQuantityChange(index, "increment")} />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="border border-gray-300 dark:border-borderDark  px-4 py-2">
                                                        <button onClick={() => {setIsDeleteOpen(true); setSelectedItem(produit);}} type="button" className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                                                            <CircleX size={20} />
                                                        </button>
                                                    </td>
                                                    <td className="border border-borderGrayLight dark:border-borderDark px-4 py-2">
                                                        ${(produit.prix * (produit.pivot?.quantite ?? produit.quantite)).toFixed(2)}
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr className="text-center">
                                                <td colSpan="4" className="py-2 px-4 border border-borderGrayLight dark:border-borderDark text-start">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex flex-row">
                                                            <input type="text" placeholder="Entrez le coupon" value={promoCode} 
                                                                className="py-1.5 px-4 rounded-l-lg dark:bg-contentDark border border-borderGrayLight dark:border-borderDark border-r-0 placeholder-gray-500 focus-visible:outline-0" onChange={(e) => setPromoCode(e.target.value)} />
                                                            <button onClick={() => handleCodePromotion(promoCode)} className="bg-purpleLight hover:bg-purpleLightHover py-[7px] px-4 rounded-r-lg text-white" >
                                                                Appliquer
                                                            </button>
                                                        </div>
                                                        {codePromotionError && (
                                                            <p className="text-red-600 text-sm mt-1">{codePromotionError}</p>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="border border-borderGrayLight dark:border-borderDark py-2 font-semibold text-xl">Prix Total: </td>
                                                <td className="border border-borderGrayLight dark:border-borderDark py-2 font-semibold">
                                                    {codePromotion ? (
                                                        <>
                                                            <span className="text-green-600 text-lg font-bold">${getTotalPrices().discounted}</span>
                                                            <span className="text-gray-500 text-sm line-through ml-2">${getTotalPrices().original}</span>
                                                        </>
                                                    ) : (
                                                        <span>${getTotalPrices().original}</span>
                                                    )}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex justify-between">
                                    <Link to={"/shop"} className="border border-purpleLight hover:border-purpleLightHover py-2 px-4 rounded-lg text-purpleLight hover:text-purpleLightHover">Continuer vos achats</Link>
                                    <button onClick={handleCheckout} className="bg-purpleLight hover:bg-purpleLightHover py-2 px-4 rounded-lg text-white">Passer à la caisse</button>
                                </div>
                            </div>
                        ) : (
                            <EmptyCardState />
                        )}
                    </div>
                </div>
            </div>
            {isDeleteOpen && <DeleteModal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} 
                message="Êtes-vous sûr de vouloir supprimer ce produit ?"
                onConfirm={() => { 
                    supprimerProduit(selectedItem.produit_id)
                    setIsDeleteOpen(false);
            }}/> }
        </section>
    );
};

export default CartTable;
