/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { Heart, Minus, Plus } from "lucide-react";
import defaultImg from "@/assets/default/image.png";

const QuickView = ({ produit, onClose , ajouterAuPanier, wishlist, ajouterAuListeSouhait}) => {
  const [imageSrc, setImageSrc] = useState(`/produits/${produit.image}`);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

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
    <div className={`fixed z-[9999] w-full h-full inset-0 flex items-center justify-center`}>
      <div className={`fixed inset-0 bg-contentLight/75 dark:bg-customDark/75 transition-opacity`} aria-hidden="true"></div>
      <div className="relative p-4 w-full max-w-4xl max-h-full" data-aos="fade-down" data-aos-duration="500" data-aos-once="true">
        <div className="relative bg-customLight dark:bg-customDark rounded-md shadow-[0px_0px_6px_0px] shadow-gray-200 dark:shadow-borderGrayDark">
          <button onClick={onClose} className="absolute top-3 end-2.5 text-gray-500 dark:text-gray-200 hover:bg-bgLight hover:dark:bg-bgDark hover:text-purpleLight dark:hover:text-purpleLight rounded-md w-8 h-8 inline-flex justify-center items-center no-print">
            <CgClose size={20} />
          </button>
          <div className="block sm:flex space-x-8 p-4 flex-1 max-h-[70vh] overflow-y-auto scrollbar">
            <div className="sm:w-1/2">
              <img src={imageSrc} alt={produit.nom} onError={handleImageError} className="w-full h-auto rounded-md"/>
            </div>

            <div className="sm:w-1/2 flex flex-col">
              <div className="flex flex-col justify-center mt-4">
                <p className="text-3xl font-semibold">{produit.nom}</p>

                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-lg font-bold text-purpleLight">{produit.prix_apres_promo} DT</span>
                  {produit.promotion_id && <span className="text-gray-400 line-through">{produit.prix} DT</span>}
                </div>

                <div className="mt-4">
                  <p className="text-gray-600 dark:text-gray-300">{produit.description}</p>
                </div>

                <div className="mt-4">
                  {produit.couleurs?.length > 0 && (
                    <>
                      <p className="font-semibold">couleur : {selectedColor?.nom}</p>
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

                <div className="flex items-center gap-3 mt-4">
                  <div onClick={handleDecrease} className="p-2 rounded-l-md border border-gray-200 dark:border-borderDark">
                      <Minus size={16} />
                  </div>
                  <input className="-mx-3 py-1 w-10 text-center bg-transparent border-t border-b border-gray-200 dark:border-borderDark outline-none" type="text" value={quantity} />
                  <div onClick={handleIncrease} className="p-2 rounded-r-md border border-gray-200 dark:border-borderDark">
                      <Plus size={16} />
                  </div>
                  {produit.status == "Disponible" ?
                    <button onClick={() => handleAddToCart()} className="hidden sm:flex bg-purpleLight text-white py-2 px-8 rounded-md items-center gap-2">Add to Cart</button>
                    : <button className="hidden sm:flex bg-purpleLight text-white py-2 px-8 rounded-md items-center gap-2 opacity-50 cursor-not-allowed" disabled={true}>{produit.status}</button>
                  }
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

                {produit.status == "Disponible" ?
                  <button onClick={() => handleAddToCart()} className="w-full mt-4 flex sm:hidden bg-purpleLight text-white py-2 px-8 rounded-md items-center justify-center gap-2">Add to Cart</button>
                  : <button className="w-full mt-4 flex sm:hidden bg-purpleLight text-white py-2 px-8 rounded-md items-center justify-center gap-2 opacity-50 cursor-not-allowed" disabled={true}>{produit.status}</button>
                }

                <div className="mt-4 text-sm text-gray-600 dark:text-grayDark">
                  <p>Disponibilité: <span className="text-black dark:text-white font-medium">{produit.status}</span></p>
                  <p>Catégorie: <span className="text-black dark:text-white font-medium">{produit.sous_categorie?.categorie?.titre} - {produit.sous_categorie?.titre}</span></p>
                </div>    
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
