/* eslint-disable react/prop-types */
import { Link } from "react-router";
import { useState } from "react";
import EmptyCardState from "./EmptyCardState";
import img from "@/assets/default/image.png";
import { useNavigate } from "react-router-dom";

const CartTable = ({ formData, setFormData, codePromotion, handleCodePromotion, codePromotionError }) => {
    const navigate = useNavigate();
    const [promoCode, setPromoCode] = useState("");

    const getTotalPrices = () => {
        if (!formData?.produits) return { original: 0, discounted: 0 };
    
        let originalTotal = formData.produits.reduce((sum, produit) => sum + produit.prix * produit.quantite, 0);
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
        const updatedProduits = [...formData.produits];
        const produit = updatedProduits[index];
        
        if (action === "increment") {
            produit.quantite += 1;
        } else if (action === "decrement" && produit.quantite > 1) {
            produit.quantite -= 1;
        }

        setFormData({
            ...formData,
            produits: updatedProduits,
        });
    };

    const handleCheckout = () => {
        if (!formData?.produits || formData.produits.length === 0) {
            alert("Votre panier est vide !");
            return;
        }
    
        const checkoutData = {
            produits: formData.produits,
            total: getTotalPrices().discounted,
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
                        {formData?.produits && formData.produits.length > 0 ? (
                            <table className="min-w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200 dark:bg-gray-700">
                                        <th className="border border-gray-300 px-4 py-2">Produit</th>
                                        <th className="border border-gray-300 px-4 py-2">Nom</th>
                                        <th className="border border-gray-300 px-4 py-2">Prix</th>
                                        <th className="border border-gray-300 px-4 py-2">Quantité</th>
                                        <th className="border border-gray-300 px-4 py-2">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formData.produits.map((produit, index) => (
                                        <tr key={index} className="text-center">
                                            <td className="border border-gray-300 px-4 py-2">
                                                <img src={produit.image} alt={produit.nom} onError={(e) => e.target.src = img} className="w-16 h-16 object-cover mx-auto" />
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">{produit.nom}</td>
                                            <td className="border border-gray-300 px-4 py-2">${produit.prix}</td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                <button className="px-2 py-1 bg-gray-300 rounded" onClick={() => handleQuantityChange(index, "decrement")}>-</button>
                                                <span className="mx-2">{produit.quantite}</span>
                                                <button className="px-2 py-1 bg-gray-300 rounded" onClick={() => handleQuantityChange(index, "increment")}>+</button>
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">${(produit.prix * produit.quantite).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                    <tr className="text-center">
                                        <td colSpan="3" className="py-2 px-4 border border-gray-300 text-start">
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-row">
                                                    <input type="text" placeholder="Entrez le coupon" value={promoCode} 
                                                        className="py-1.5 px-4 rounded-l-lg border border-r-0" onChange={(e) => setPromoCode(e.target.value)} />
                                                    <button onClick={() => handleCodePromotion(promoCode)} className="bg-blue-600 py-[7px] px-4 rounded-r-lg text-white" >
                                                        Appliquer
                                                    </button>
                                                </div>
                                                {codePromotionError && (
                                                    <p className="text-red-600 text-sm mt-1">{codePromotionError}</p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="border border-gray-300 py-2 font-semibold text-xl">Prix Total: </td>
                                        <td className="border border-gray-300 py-2 font-semibold">
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
                                    <tr className="py-2 text-center">
                                        <td colSpan="4" className="py-3 px-4 border border-gray-300 text-end">
                                            <Link to={"/shop"} className="bg-orange-600 py-2 px-4 rounded-lg text-white">Continuer vos achats</Link>
                                        </td>
                                        <td className="py-3">
                                            <button onClick={handleCheckout} className="bg-green-600 py-2 px-4 rounded-lg text-white">Passer à la caisse</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        ) : (
                            <EmptyCardState />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CartTable;

