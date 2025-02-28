/* eslint-disable react/prop-types */
import { Eye, ShoppingCart, StarIcon } from "lucide-react";
import { useState } from "react";
import defaultImg from "@/assets/default/image.png"; // Assurez-vous d'importer l'image par défaut

const Card = ({ produit }) => {
  const [ratingHover, setRatingHover] = useState(0);
  const [selectedRating, setSelectedRating] = useState(produit.rating);
  const [imageSrc, setImageSrc] = useState(`/produits/${produit.image}`);

  // Fonction pour gérer l'erreur de chargement de l'image
  const handleImageError = () => {
    setImageSrc(defaultImg); // Utiliser l'image par défaut en cas d'erreur
  };

  return (
    <div className=" bg-customLight dark:bg-customDark rounded-md shadow-md flex flex-col items-center">
      <div className="relative w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden group">
        <img
          src={imageSrc}
          alt={produit.nom}
          onError={handleImageError} // Ajouter l'événement onError pour gérer les erreurs de chargement
          className="w-full h-full object-cover brightness-110 transition-all duration-300 group-hover:scale-110 rounded-t-xl"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-customDark/75 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ShoppingCart className="text-white w-6 h-6 mx-2" />
          <Eye className="text-white w-6 h-6 mx-2" />
        </div>
      </div>
      <div className="w-full p-4 text-center">
        <div
          className="flex justify-center mb-2"
          onMouseLeave={() => setRatingHover(0)} 
        >
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className="cursor-pointer"
              onMouseEnter={() => setRatingHover(i + 1)} 
              onClick={() => setSelectedRating(i + 1)} 
            >
              <StarIcon
                size={20}
                color={i < (ratingHover || selectedRating) ? "yellow" : "gray"} // Appliquer la couleur en fonction du survol ou de la note sélectionnée
              />
            </span>
          ))}
        </div>
        {/*console.log(produit)*/}
        <h2 className="text-lg font-semibold">{produit.nom}</h2>
        <p className="text-gray-500 text-sm">{produit.description.length > 40 ? produit.description.substring(0, 40) + '...' : produit.description}</p>
        
        <div className="flex mt-2 gap-3">
          <span className="text-lg font-bold text-purpleLight">${produit.prix_apres_promo}</span>
          {produit.promotion_id ? 
            <span className="text-lg font-bold text-gray-300">
              <del>${produit.prix}</del>
            </span> : ''}
        </div>
      </div>
    </div>
  );
};

export default Card;
