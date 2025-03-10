/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { ShoppingCart, Minus, Plus } from "lucide-react"; // Import des icônes

const QuickShop = ({ produit, onClose, ajouterAuPanier }) => {
  const [quantity, setQuantity] = useState(1); // Initialiser la quantité à 1
  const [selectedColor, setSelectedColor] = useState(null); // Stocker la couleur sélectionnée

  useEffect(() => {
    if (produit.couleurs?.length > 0) {
      setSelectedColor(
        produit.couleurs.find((c) => c.selectionne) || produit.couleurs[0]
      );
    } else {
      setSelectedColor(null);
    }
  }, [produit]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setQuantity(1);
  };

  const maxQuantity = selectedColor && produit.couleurs.length > 0 ? selectedColor.pivot.quantite : produit.quantite;

  // Augmenter la quantité sans dépasser la quantité max disponible
  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    console.log(maxQuantity);
    
    if (quantity <= maxQuantity) {
      ajouterAuPanier(produit.produit_id, quantity, selectedColor.id);
    } else {
      alert("La quantité demandée dépasse le stock disponible !");
    }
  };

  return (
    <div className="fixed z-50 w-full h-full inset-0 flex items-center justify-center">
      <div className="fixed inset-0 bg-contentLight/75 dark:bg-customDark/75 transition-opacity" aria-hidden="true"></div>
      <div className="relative p-4 w-full max-w-lg max-h-full" data-aos="fade-down" data-aos-duration="500" data-aos-once="true">
        <div className="relative bg-customLight dark:bg-customDark rounded-md shadow-md p-5 flex flex-col">
          {/* Bouton de fermeture */}
          <button onClick={onClose} type="button" className="absolute top-3 right-3 text-gray-500 dark:text-gray-200 hover:bg-bgLight hover:dark:bg-bgDark hover:text-purpleLight dark:hover:text-purpleLight rounded-md w-8 h-8 inline-flex justify-center items-center">
            <CgClose size={20} />
          </button>

          {/* Détails du produit */}
          <div className="flex flex-col justify-center mt-4">
            <p className="text-3xl font-semibold">{produit.nom}</p>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-lg font-bold text-purpleLight">${produit.prix_apres_promo}</span>
              {produit.promotion_id && <span className="text-gray-400 line-through">${produit.prix}</span>}
            </div>
          </div>

          {/* Sélection des couleurs */}
          {produit.couleurs.length > 0 && (
            <div className="mt-4">
              <p className="font-semibold">couleur : {selectedColor?.nom}</p>
              <div className="flex gap-2 mt-2">
              {produit.couleurs?.length > 0 ? (
                      produit.couleurs.map((couleur) => (
                        <button
                          key={couleur.couleur_id}
                          onClick={() => handleColorSelect(couleur)}
                          className={`w-8 h-8 rounded-full border ${
                            selectedColor?.couleur_id === couleur.couleur_id ? "border-purpleLight" : "border-gray-300"
                          } ${couleur.pivot?.quantite === 0 ? "opacity-50 cursor-not-allowed" : ""}`}  
                          style={{ backgroundColor: couleur.code_hex }}
                          disabled={couleur.pivot?.quantite === 0} 
                        />
                      ))
                    ) : (
                      <p>No colors available</p>
                    )}
              </div>
            </div>
          )}

          {/* Sélection de la quantité */}
          <div className="flex items-center justify-center mt-4 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 w-fit gap-4 mx-auto">
            <button 
              onClick={handleDecrease} 
              className="w-8 h-8 flex items-center justify-center rounded-full dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            >
              <Minus size={18} />
            </button>
            
            <span className="text-lg font-semibold">{quantity}</span>
            
            <button 
              onClick={handleIncrease} 
              className="w-8 h-8 flex items-center justify-center rounded-full dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            >
              <Plus size={18} />
            </button>
          </div>


          {/* Bouton "Add to Cart" */}
          <div className="mt-auto flex justify-end gap-3 pt-4">
            <button
              onClick={handleAddToCart}
              className="bg-purpleLight text-white py-2 px-6 rounded-md flex items-center gap-2"
            >
              <ShoppingCart size={17} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickShop;
