/* eslint-disable react/prop-types */
import { StarIcon } from "lucide-react";
import { useState } from "react";
const Card = ({ produit }) => {
  const [ratingHover, setRatingHover] = useState(0);
  const [selectedRating, setSelectedRating] = useState(produit.rating);

  return (
    <div className=" bg-white dark:bg-gray-800 rounded-md shadow-md flex flex-col items-center">
      <div className="relative w-full h-full">
        <img src={`/produits/${produit.image}`} alt={produit.nom} className="w-full h-full object-cover rounded-t-xl"/>
      </div>
      {/*
      <div className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden">
        <img 
          src={`/produits/${produit.image}`} 
          alt={produit.nom} 
          className="max-w-full max-h-full object-contain rounded-t-md border border-gray-300 dark:border-borderDark"
        />
      </div>
      */}
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
        {console.log(produit)}
        <h2 className="text-lg font-semibold">{produit.nom}</h2>
        <p className="text-gray-500 text-sm">{produit.description}</p>
        <p className="text-gray-500 text-sm">{produit.sous_categorie}</p>
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
