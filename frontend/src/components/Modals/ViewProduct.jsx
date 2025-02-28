/* eslint-disable react/prop-types */
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import defaultImg from "@/assets/default/image.png";

const ViewProduct = ({ produit, isOpen, onClose }) => {
  const [imageSrc, setImageSrc] = useState(`/produits/${produit.image}`);

  const handleImageError = () => {
    setImageSrc(defaultImg);
  };

  return (
    isOpen && (
      <div className="fixed z-50 w-full h-full inset-0 flex items-center justify-center">
        <div className="fixed inset-0 bg-contentLight/75 dark:bg-customDark/75 transition-opacity" aria-hidden="true"></div>
        <div className="relative p-4 w-full max-w-4xl max-h-full">
          <div className="relative bg-customLight dark:bg-customDark rounded-md shadow-md p-5 flex flex-col">
            <button
              onClick={onClose}
              type="button"
              className="absolute top-3 right-3 text-gray-500 dark:text-gray-200 hover:bg-bgLight hover:dark:bg-bgDark hover:text-purpleLight dark:hover:text-purpleLight rounded-md w-8 h-8 inline-flex justify-center items-center"
            >
              <CgClose size={20} />
            </button>
            <div className="flex space-x-8 p-4 flex-1 overflow-y-auto">
              {/* Image Section */}
              <div className="w-1/2">
                <img
                  src={imageSrc}
                  alt={produit.nom}
                  onError={handleImageError}
                  className="w-full h-auto rounded-md"
                />
              </div>
              {/* Info Section */}
              <div className="w-1/2 flex flex-col">
                <p className="text-gray-600 dark:text-gray-300">{produit.description}</p>
                <div className="flex items-center space-x-2 mt-4">
                  <span className="text-lg font-bold text-purpleLight">${produit.prix_apres_promo}</span>
                  {produit.promotion_id && <span className="text-gray-400 line-through">${produit.prix}</span>}
                </div>
                <div className="mt-4">
                  <h4 className="font-medium">Select Color:</h4>
                  <div className="flex space-x-2 mt-2">
                    {produit.couleurs.length > 0 ? (
                      produit.couleurs.map((couleur) => (
                        <button
                          key={couleur.couleur_id}
                          className="w-8 h-8 rounded-full border border-gray-300"
                          style={{ backgroundColor: couleur.code_hex }}
                        />
                      ))
                    ) : (
                      <p>No colors available or error fetching data</p>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-medium">Quantity:</h4>
                  <input type="number" defaultValue={1} min={1} className="w-16 p-1 border rounded-md" />
                </div>
                {/* Fixed Buttons Section */}
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

export default ViewProduct;
