/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { Minus, Plus } from "lucide-react";
import defaultImg from "@/assets/default/image.png";

const QuickView = ({ produit, onClose , ajouterAuPanier}) => {
  const [imageSrc, setImageSrc] = useState(`/produits/${produit.image}`);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleImageError = () => {
    setImageSrc(defaultImg);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setQuantity(1);
  };

  const maxQuantity = selectedColor && produit.couleurs.length > 0 ? selectedColor.pivot.quantite : produit.quantite;

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

  const isAvailable = produit.status === "Disponible";

  const handleAddToCart = () => {
    if (quantity <= maxQuantity) {
      ajouterAuPanier(produit.produit_id, quantity, selectedColor.nom);
    } else {
      alert("La quantité demandée dépasse le stock disponible !");
    }
  };

  useEffect(() => {
    if (produit.couleurs?.length > 0) {
      setSelectedColor(
        produit.couleurs.find((c) => c.selectionne) || produit.couleurs[0]
      );
    } else {
      setSelectedColor(null);
    }
  }, [produit]);


  return (
    <div className="fixed z-50 w-full h-full inset-0 flex items-center justify-center">
      <div className="fixed inset-0 bg-contentLight/75 dark:bg-customDark/75 transition-opacity" aria-hidden="true"></div>
      <div className="relative p-4 w-full max-w-4xl max-h-full" data-aos="fade-down" data-aos-duration="500" data-aos-once="true">
        <div className="relative bg-customLight dark:bg-customDark rounded-md shadow-md p-5 flex flex-col">
          
          <button
            onClick={onClose}
            type="button"
            className="absolute top-3 right-3 text-gray-500 dark:text-gray-200 hover:bg-bgLight hover:dark:bg-bgDark hover:text-purpleLight dark:hover:text-purpleLight rounded-md w-8 h-8 inline-flex justify-center items-center"
          >
            <CgClose size={20} />
          </button>

          <div className="flex space-x-8 p-4 flex-1 overflow-y-auto">
            
            <div className="w-1/2">
              <img
                src={imageSrc}
                alt={produit.nom}
                onError={handleImageError}
                className="w-full h-auto rounded-md"
              />
            </div>

            <div className="w-1/2 flex flex-col">
              <div className="flex flex-col justify-center mt-4">
                <p className="text-3xl font-semibold">{produit.nom}</p>

                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-lg font-bold text-purpleLight">${produit.prix_apres_promo}</span>
                  {produit.promotion_id && <span className="text-gray-400 line-through">${produit.prix}</span>}
                </div>

                <div className="mt-4">
                  <p className="text-gray-600 dark:text-gray-300">{produit.description}</p>
                </div>

                {isAvailable ? (
                  <>
                    <div className="mt-4">
                      {/* Si le produit a des couleurs, afficher la section "Select Color" */}
                      {produit.couleurs?.length > 0 && (
                        <>
                          <h4 className="font-medium">Select Color:</h4>
                          <div className="flex space-x-2 mt-2">
                            {produit.couleurs.map((couleur) => (
                              <button
                                key={couleur.couleur_id}
                                onClick={() => handleColorSelect(couleur)}
                                className={`w-8 h-8 rounded-full border ${
                                  selectedColor?.couleur_id === couleur.couleur_id ? "border-purpleLight" : "border-gray-300"
                                } ${couleur.pivot?.quantite === 0 ? "opacity-50 cursor-not-allowed" : ""}`}  
                                style={{ backgroundColor: couleur.code_hex }}
                                disabled={couleur.pivot?.quantite === 0} 
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>


                    <div className="flex items-center mt-4 border border-black rounded-full px-4 py-2 w-fit gap-4 bg-white">
                      <button 
                        onClick={handleDecrease} 
                        className="w-8 h-8 flex items-center justify-center rounded-full text-gray-700 dark:text-gray-200 hover:text-purpleLight transition"
                      >
                        <Minus size={22} weight="bold" />  
                      </button>
                      
                      <span className="text-lg font-semibold">{quantity}</span>
                      
                      <button 
                        onClick={handleIncrease} 
                        className="w-8 h-8 flex items-center justify-center rounded-full text-gray-700 dark:text-gray-200 hover:text-purpleLight transition"
                      >
                        <Plus size={22} weight="bold" />  
                      </button>
                    </div>



                    <div className="mt-auto flex justify-end gap-3 pt-4">
                      <button onClick={onClose} className="border border-purpleLight text-purpleLight py-2 px-6 rounded-md">
                        Close
                      </button>
                      <button  onClick={handleAddToCart} className="bg-purpleLight text-white py-2 px-6 rounded-md">Add to Cart</button>
                    </div>
                  </>
                ) : (
                  // Si le produit est en rupture de stock
                  <div className="mt-4 flex flex-col items-center">
                    <button onClick={onClose} className="border border-purpleLight text-purpleLight py-2 px-6 rounded-md">
                      Return
                    </button>
                    <button className="bg-gray-300 text-gray-600 py-2 px-6 rounded-md mt-4" disabled>
                      Sold Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
