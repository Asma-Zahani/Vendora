/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Minus, Plus, Heart } from "lucide-react";

const QuickShop = ({ produit, onClose, ajouterAuPanier, wishlist, ajouterAuListeSouhait }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (produit.couleurs?.length > 0) {
      setSelectedColor(
        produit.couleurs.find((c) => c.selectionne) || produit.couleurs[0]
      );
    } else {
      setSelectedColor(null);
    }
  }, [produit]);

  const handleIncrease = () => {
    if (quantity < (selectedColor && produit.couleurs.length > 0 ? selectedColor.pivot.quantite : produit.quantite)) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {    
    if (quantity <= (selectedColor && produit.couleurs.length > 0 ? selectedColor.pivot.quantite : produit.quantite)) {
      const ancienne_couleur = window.location.pathname === '/cart' ? produit.pivot?.couleur : null;
      
      ajouterAuPanier(produit.produit_id, quantity, selectedColor.nom, ancienne_couleur);
    }
  };

  return (
    <div className="fixed z-50 w-full h-full inset-0 flex items-center justify-center">
      <div className="fixed inset-0 bg-contentLight/75 dark:bg-customDark/75 transition-opacity" aria-hidden="true"></div>
      <div className="relative p-4 w-full max-w-md max-h-full" data-aos="fade-down" data-aos-duration="500" data-aos-once="true">
        <div className="relative bg-customLight dark:bg-customDark rounded-md shadow-md p-5 flex flex-col">
          <button onClick={onClose} type="button" className="absolute top-3 right-3 text-gray-500 dark:text-gray-200 hover:bg-bgLight hover:dark:bg-bgDark hover:text-purpleLight dark:hover:text-purpleLight rounded-md w-8 h-8 inline-flex justify-center items-center">
            <CgClose size={20} />
          </button>

          <div className="flex flex-col justify-center mt-4">
            <p className="text-3xl font-semibold">{produit.nom}</p>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-lg font-bold text-purpleLight">{produit.prix_apres_promo} DT</span>
              {produit.promotion_id && <span className="text-gray-400 line-through">{produit.prix} DT</span>}
            </div>
          </div>

          {produit.couleurs.length > 0 && (
            <div className="mt-4">
              <p className="font-semibold">couleur : {selectedColor?.nom}</p>
              <div className="flex gap-2 mt-2">
                {produit.couleurs.map((couleur) => (
                  <button
                    key={couleur.couleur_id}
                    onClick={() => {setSelectedColor(couleur);setQuantity(1)}}
                    className={`w-8 h-8 rounded-full border ${
                      selectedColor?.couleur_id === couleur.couleur_id ? "border-purpleLight" : "border-gray-300"
                    } ${couleur.pivot?.quantite === 0 ? "opacity-50 grayscale cursor-not-allowed" : ""}`}  
                    style={{ backgroundColor: couleur.code_hex }}
                    disabled={couleur.pivot?.quantite === 0} 
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 mt-4">
            <div onClick={handleDecrease} className="p-2 rounded-l-md border border-gray-200 dark:border-borderDark">
              <Minus size={16} />
            </div>
            <input className="-mx-3 py-1 w-10 text-center bg-transparent border-t border-b border-gray-200 dark:border-borderDark outline-none" type="text" value={quantity} onChange={() => {}} />
            <div onClick={handleIncrease} className="p-2 rounded-r-md border border-gray-200 dark:border-borderDark">
              <Plus size={16} />
            </div>

            <div className="p-2 rounded-md border border-gray-200 dark:border-borderDark"
              onClick={() => {
                const isProductInWishlist = wishlist && wishlist.some(item => item.produit_id === produit.produit_id);
  
                if (!isProductInWishlist) {
                  ajouterAuListeSouhait(produit.produit_id);
                }
                else {
                  navigate("/wishlist");
                }
              }}>
                <Heart size={16} fill={`${wishlist && wishlist.some(item => item.produit_id === produit.produit_id) ? 'red' : 'none'}`} className={`${wishlist && wishlist.some(item => item.produit_id === produit.produit_id) ? 'text-transparent' : ''}`}/>
            </div>
          </div>

          <div className="mt-auto flex justify-end gap-3 pt-4">
            <button onClick={() => {handleAddToCart(); onClose()}} className="bg-purpleLight text-white py-2 px-6 rounded-md flex items-center gap-2">
              <ShoppingCart size={17} />
              Ajouter Au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickShop;
