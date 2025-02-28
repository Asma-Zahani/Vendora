import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { CgClose } from "react-icons/cg";
import defaultImg from "@/assets/default/image.png";
import axios from "axios";

const ViewProduit = ({ produit, isOpen, onClose  }) => {
  const [imageSrc, setImageSrc] = useState(`/produits/${produit.image}`);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Gestion des erreurs d'image
  const handleImageError = () => {
    setImageSrc(defaultImg);
  };

  const handleColorSelect = (color) => {
    //console.log(color.pivot.quantite); // Vérifiez si vous obtenez bien la quantité dans `color.pivot.quantite`
    setSelectedColor(color);
    setQuantity(1);
  };

  useEffect(() => {
    axios.get('http://localhost:8000/api/produits/' + produit.produit_id)
      .then(response => {
        const produit = response.data;
        produit.couleurs.forEach(color => {
          console.log("Quantité :", color.pivot.quantite); // Assurez-vous d'avoir accès à `pivot.quantite`
        });
      })
      .catch(error => console.log("Error fetching produit:", error));
  }, []);
  
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
  
    if (!selectedColor) return; 
  
    const quantityAvailable = selectedColor?.pivot?.quantite || 0;  // Accéder à `quantite` dans `pivot`
    if (value > quantityAvailable) {
      setQuantity(quantityAvailable);  // Limiter la quantité au stock disponible
    } else if (value < 1 || isNaN(value)) {
      setQuantity(1);  // Réinitialiser la quantité à 1 si l'utilisateur entre une valeur invalide
    } else {
      setQuantity(value);  // Mettre à jour la quantité
    }
  };
  
  

  useEffect(() => {
    AOS.init({ duration: 500, once: true });
    AOS.refresh();
  }, []);

  return (
    isOpen && (
      <div className="fixed z-50 w-full h-full inset-0 flex items-center justify-center">
        <div className="fixed inset-0 bg-contentLight/75 dark:bg-customDark/75 transition-opacity" aria-hidden="true"></div>
        <div className="relative p-4 w-full max-w-4xl max-h-full" data-aos="fade-down" data-aos-duration="500">
          <div className="relative bg-customLight dark:bg-customDark rounded-md shadow-md p-5 flex flex-col">
            {/* Bouton Fermer */}
            <button
              onClick={onClose}
              type="button"
              className="absolute top-3 right-3 text-gray-500 dark:text-gray-200 hover:bg-bgLight hover:dark:bg-bgDark hover:text-purpleLight dark:hover:text-purpleLight rounded-md w-8 h-8 inline-flex justify-center items-center"
            >
              <CgClose size={20} />
            </button>

            <div className="flex space-x-8 p-4 flex-1 overflow-y-auto">
              {/* Section Image */}
              <div className="w-1/2">
                <img
                  src={imageSrc}
                  alt={produit.nom}
                  onError={handleImageError}
                  className="w-full h-auto rounded-md"
                />
              </div>

              {/* Section Infos */}
              <div className="w-1/2 flex flex-col">
                <p className="text-gray-600 dark:text-gray-300">{produit.description}</p>

                {/* Prix */}
                <div className="flex items-center space-x-2 mt-4">
                  <span className="text-lg font-bold text-purpleLight">${produit.prix_apres_promo}</span>
                  {produit.promotion_id && <span className="text-gray-400 line-through">${produit.prix}</span>}
                </div>

                {/* Sélection des couleurs */}
                <div className="mt-4">
                  <h4 className="font-medium">Select Color:</h4>
                  <div className="flex space-x-2 mt-2">
                    {produit.couleurs.length > 0 ? (
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

                {/* Sélection de quantité */}
                <div className="mt-4">
                  <h4 className="font-medium">Quantity:</h4>
                  <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min={1}
                    max={selectedColor ? selectedColor.pivot?.quantite : 1}  
                    className="w-16 p-1 border rounded-md"
                    disabled={!selectedColor}
                  />
                  {selectedColor && (
                    <p className="text-sm text-gray-500">Max: {selectedColor.pivot?.quantite}</p> 
                  )}
                </div>

                {/* Boutons */}
                <div className="mt-auto flex justify-end gap-3 pt-4">
                  <button onClick={onClose} className="border border-purpleLight text-purpleLight py-2 px-6 rounded-md">
                    Close
                  </button>
                  <button className="bg-purpleLight text-white py-2 px-6 rounded-md">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ViewProduit;
