/* eslint-disable react/prop-types */
import { Link } from "react-router";
import { useState } from "react";
import img from "@/assets/default/image.png";
import { useNavigate } from "react-router-dom";
import { Edit2, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import QuickShop from "@/components/Modals/QuickShop";

const CartTable = ({ produits, modifierQuantitePanier, codePromotion, handleCodePromotion, supprimerProduit, ajouterAuPanier }) => {
    const navigate = useNavigate();
    const [promoCode, setPromoCode] = useState("");
    
    const [isShopModalOpen, setIsShopModalOpen] = useState(false); 
    const [selectedProduit, setSelectedProduit] = useState(null); 

    const getTotalPrices = () => {
        if (!produits) return { original: 0, discounted: 0 };
    
        let originalTotal = produits.reduce((sum, produit) => sum + produit.prix_apres_promo * (produit.pivot?.quantite ?? produit.quantite), 0);
        let discountedTotal = originalTotal;
    
        // Vérifier si le code promo existe et si le nombre maximal d'utilisations est atteint
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
            let maxQuantite = 0;
        
            if (produit.pivot && produit.pivot.couleur) {
                const couleur = produit.couleurs.find(c => c.nom === produit.pivot.couleur);
        
                if (couleur && couleur.pivot && couleur.pivot.quantite !== undefined) {
                    maxQuantite = couleur.pivot.quantite;
        
                    if (produit.pivot.quantite < maxQuantite) {
                        produit.pivot.quantite += 1;
                    }
                }
            } else {
                maxQuantite = produit.quantite ?? 0;
        
                if (produit.pivot.quantite < maxQuantite) {
                    produit.pivot.quantite += 1;
                }
            }
                 
        } else if (action === "decrement" && (produit.pivot?.quantite > 1 || produit.quantite > 1)) {
            if (produit.pivot && produit.pivot.quantite > 1) {
                produit.pivot.quantite -= 1;
            }
        }
        
        modifierQuantitePanier(produit.produit_id, produit.pivot.quantite, produit.pivot?.couleur);
        
    };

    const handleCheckout = () => {
        if (!produits || produits.length === 0) {
            alert("Votre panier est vide !");
            return;
        }
    
        const checkoutData = {
            produits: produits,
            original: getTotalPrices().original,
            discounted: getTotalPrices().discounted,
            remise: codePromotion ? codePromotion.reduction : null,
            PromoId: codePromotion ? codePromotion.code_promotion_id : null,
        };
        
    
        navigate("/checkout", { state: checkoutData });
    };
    
    return (
        <section className="mx-6 py-6">
            <div className="flex flex-col">
                <div className="inline-block min-w-full py-2 align-middle">
                    <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm">
                        {produits?.length > 0 && <h1 className="text-2xl font-semibold mb-4">Panier</h1> }
                        {produits?.length > 0 ? (
                            <div className="space-y-10">
                                <div className="overflow-x-auto scrollbar hidden sm:block">
                                    <table className="min-w-full border-collapse border border-borderGrayLight dark:border-borderDark">
                                        <thead>
                                            <tr className="bg-contentLight dark:bg-contentDark">
                                                <th className="border border-gray-200 dark:border-borderDark px-4 py-6">Produit</th>
                                                <th className="border border-gray-200 dark:border-borderDark px-4 py-2">Prix</th>
                                                <th className="border border-gray-200 dark:border-borderDark px-4 py-2">Quantité</th>
                                                <th className="border border-gray-200 dark:border-borderDark px-4 py-2">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {produits.map((produit, index) => (
                                                <tr key={index} className="text-center">
                                                    <td className="border border-borderGrayLight dark:border-borderDark px-4 py-2">
                                                        <div className="flex items-center justify-start pl-2 space-x-4">
                                                            <img src={produit.image ? (`/produits/${produit.image}`) : img} alt="image" onError={(e) => e.target.src = img} className="w-20 h-25 object-cover" />
                                                            <div className="flex flex-col text-start text-sm text-gray-700 dark:text-gray-300">
                                                                <span className="font-bold text-lg">{produit.nom}</span>
                                                                {produit.pivot?.couleur && <span>Couleur : <span className="font-semibold">{produit.pivot?.couleur}</span></span>}
                                                                <div className="flex gap-2 mt-2">
                                                                    {produit.pivot?.couleur && produit.couleurs.length > 1 && 
                                                                        <button onClick={() => {setIsShopModalOpen(true); setSelectedProduit(produit)}} className="text-gray-500 transition-colors duration-200 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
                                                                                <Edit2 size={17}/> 
                                                                        </button>
                                                                    }
                                                                    <button onClick={() => {supprimerProduit(produit.produit_id, produit.pivot?.couleur)}} className="text-gray-500 transition-colors duration-200 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                                                                            <Trash2 size={17}/> 
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>                                                    
                                                    <td className="border border-borderGrayLight dark:border-borderDark text-sm px-4 py-2 text-gray-700 dark:text-gray-300">
                                                        {produit.promotion && <span className="line-through">${produit.prix}</span> }
                                                        <span className={`${produit.promotion ? "text-red-500" : ""} ml-1`}>${produit.prix_apres_promo}</span>
                                                    </td>
                                                    <td className="border border-borderGrayLight dark:border-borderDark px-4 py-2">
                                                        <div className="flex justify-center items-center gap-3">
                                                            <div onClick={() => handleQuantityChange(index, "decrement")} className="p-2 dark:bg-contentDark rounded-l-md border dark:border-r-0 border-gray-200 dark:border-borderDark">
                                                                <Minus size={16} />
                                                            </div>
                                                            <input className="-mx-3 py-1 w-10 text-center bg-transparent border-t border-b border-gray-200 dark:border-borderDark outline-none" type="text" value={produit.pivot?.quantite ? produit.pivot.quantite : produit.quantite} readOnly />
                                                            <div onClick={() => handleQuantityChange(index, "increment")} className="p-2 dark:bg-contentDark rounded-r-md border dark:border-l-0 border-gray-200 dark:border-borderDark">
                                                                <Plus size={16} />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="border border-borderGrayLight dark:border-borderDark px-4 py-2">
                                                        ${(produit.prix_apres_promo * (produit.pivot?.quantite ?? produit.quantite)).toFixed(2)}
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr className="text-center">
                                                <td colSpan="2" className="py-2 px-4 text-start">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex flex-row">
                                                            <input type="text" placeholder="Entrez le coupon" value={promoCode} 
                                                                className="py-1.5 px-4 rounded-l-lg dark:bg-contentDark border border-borderGrayLight dark:border-borderDark border-r-0 placeholder-gray-500 focus-visible:outline-0" onChange={(e) => setPromoCode(e.target.value)} />
                                                            <button onClick={() => handleCodePromotion(promoCode)} className="bg-purpleLight hover:bg-purpleLightHover py-[7px] px-4 rounded-r-lg text-white" >
                                                                Appliquer
                                                            </button>
                                                        </div>
                                                        {codePromotion?.message && (
                                                             <p className="text-red-600 text-sm mt-1">{codePromotion?.message}</p>
                                                         )} 
                                                    </div>
                                                </td>
                                                <td colSpan="2" className="py-2">
                                                    <div className="flex gap-3 justify-end items-center font-semibold mr-4">
                                                        <p className="text-xl">Sous-Total:</p>
                                                        {codePromotion && !codePromotion.message ? (
                                                            <>
                                                                <span className="text-green-600 text-lg font-bold">${getTotalPrices().discounted}</span>
                                                                <span className="text-gray-500 text-sm line-through ml-2">${getTotalPrices().original}</span>
                                                            </>
                                                        ) : (
                                                            <span>${getTotalPrices().original}</span>
                                                        )}
                                                    </div>
                                                    <p className="flex justify-end text-sm text-gray-500 mr-4">Les taxes et la livraison seront calculées à l’étape de paiement.</p>
                                                </td>

                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex flex-col gap-6 sm:hidden">
                                    {produits.map((produit, index) => (
                                        <div key={index} className="flex flex-col p-4 border border-borderGrayLight dark:border-borderDark rounded-lg">
                                        
                                        <div className="flex gap-4">
                                            <img 
                                            src={produit.image ? (`/produits/${produit.image}`) : img} 
                                            alt="Produit" 
                                            onError={(e) => e.target.src = img} 
                                            className="w-24 h-24 object-cover rounded-md"
                                            />
                                            <div className="flex flex-col justify-between">
                                                <h2 className="font-semibold">{produit.nom}</h2>
                                                {produit.pivot?.couleur && <p className="text-sm">Couleur: {produit.pivot?.couleur}</p>}
                                                <div className="flex gap-2 mt-2">
                                                    {produit.pivot?.couleur && produit.couleurs.length > 1 && 
                                                        <button onClick={() => {setIsShopModalOpen(true); setSelectedProduit(produit)}} className="text-gray-500 transition-colors duration-200 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
                                                                <Edit2 size={17}/> 
                                                        </button>
                                                    }
                                                    <button onClick={() => {supprimerProduit(produit.produit_id, produit.pivot?.couleur)}} className="text-gray-500 transition-colors duration-200 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                                                            <Trash2 size={17}/> 
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between mt-4">
                                            <div>
                                            {produit.promotion && <span className="line-through text-sm">${produit.prix}</span>}
                                            <span className={`ml-2 ${produit.promotion ? "text-red-500" : ""}`}>${produit.prix_apres_promo}</span>
                                            </div>

                                            <div className="flex justify-center items-center gap-3">
                                                <div onClick={() => handleQuantityChange(index, "decrement")} className="p-2 dark:bg-contentDark rounded-l-md border dark:border-r-0 border-gray-200 dark:border-borderDark">
                                                    <Minus size={16} />
                                                </div>
                                                <input className="-mx-3 py-1 w-10 text-center bg-transparent border-t border-b border-gray-200 dark:border-borderDark outline-none" type="text" value={produit.pivot?.quantite ? produit.pivot.quantite : produit.quantite} readOnly />
                                                <div onClick={() => handleQuantityChange(index, "increment")} className="p-2 dark:bg-contentDark rounded-r-md border dark:border-l-0 border-gray-200 dark:border-borderDark">
                                                    <Plus size={16} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between mt-2 font-semibold">
                                            <span>Total:</span>
                                            <span>${(produit.prix_apres_promo * (produit.pivot?.quantite ?? produit.quantite)).toFixed(2)}</span>
                                        </div>
                                        
                                        </div>
                                    ))}
                                    <div className="flex flex-col gap-6 w-full">
                                        <div className="flex flex-col items-center gap-3 w-full">
                                            <div className="flex flex-row w-full">
                                                <input type="text" placeholder="Entrez le coupon" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} className="py-2 px-4 rounded-l-lg dark:bg-contentDark border border-borderGrayLight dark:border-borderDark border-r-0 placeholder-gray-500 focus-visible:outline-0 w-full" />
                                                <button onClick={() => handleCodePromotion(promoCode)} className="bg-purpleLight hover:bg-purpleLightHover py-2 px-4 rounded-r-lg text-white">
                                                    Appliquer
                                                </button>
                                            </div>
                                            {codePromotion?.message && (
                                                <p className="text-red-600 text-sm">{codePromotion?.message}</p>
                                            )}
                                        </div>

                                        <div className="flex flex-col text-center font-semibold w-full">
                                            <div className="flex flex-row gap-2 justify-center items-center">
                                                <p className="text-lg sm:text-xl">Sous-Total :</p>

                                                {codePromotion && !codePromotion.message ? (
                                                <>
                                                    <span className="text-green-600 text-lg font-bold">${getTotalPrices().discounted}</span>
                                                    <span className="text-gray-500 text-sm line-through ml-1">${getTotalPrices().original}</span>
                                                </>
                                                ) : (
                                                <span className="text-lg">${getTotalPrices().original}</span>
                                                )}
                                            </div>

                                            <p className="text-sm text-gray-500 mt-1">Les taxes et la livraison seront calculées à l’étape de paiement.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                                    <Link to="/boutique" className="border border-purpleLight hover:border-purpleLightHover py-2 px-4 rounded-lg text-purpleLight hover:text-purpleLightHover text-center">
                                        Continuer vos achats
                                    </Link>
                                    
                                    <button onClick={handleCheckout} className="bg-purpleLight hover:bg-purpleLightHover py-2 px-4 rounded-lg text-white">
                                        Passer à la caisse
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center text-center h-100">
                                <div className="flex flex-col max-w-lg">
                                    <div className="p-3 mx-auto text-purpleLight">
                                        <ShoppingCart size={80} />
                                    </div>
                                    <h1 className="mt-3 text-2xl font-semibold uppercase text-gray-800 dark:text-white">votre panier est vide</h1>
                                    <div className="pt-2 text-sm">
                                        <p>Avant de passer à la caisse, vous devez ajouter des produits à votre panier.</p>
                                        <p>Vous trouverez de nombreux produits intéressants sur notre page &quot;Boutique&quot;.</p>
                                    </div>
                                    <div className="flex items-center justify-center mt-4 gap-x-3">
                                        <Link to={"/boutique"} className="flex items-center px-4 py-2 text-sm text-white bg-purpleLight rounded-md gap-x-2">
                                            <span className="text-lg">Acheter maintenant</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {isShopModalOpen && <QuickShop produit={selectedProduit} onClose={() => setIsShopModalOpen(false)} ajouterAuPanier={ajouterAuPanier} />}  
        </section>
    );
};

export default CartTable;