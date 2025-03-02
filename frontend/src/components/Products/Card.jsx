/* eslint-disable react/prop-types */
import { Eye, ShoppingCart, StarIcon } from "lucide-react";
import { useState } from "react";
import defaultImg from "@/assets/default/image.png";
import ViewProduit from "@/components/Modals/ViewProduit";

const Card = ({ produit, ajouterAuPanier, setFormData }) => {
  const [ratingHover, setRatingHover] = useState(0);
  const [selectedRating, setSelectedRating] = useState(produit.rating);
  const [imageSrc, setImageSrc] = useState(`/produits/${produit.image}`);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleImageError = () => {
    setImageSrc(defaultImg); 
  };

  return (
    <>
    <div className="bg-customLight dark:bg-customDark rounded-md shadow-md flex flex-col items-center">
      <div className="relative w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden group">
        <img
          src={imageSrc}
          alt={produit.nom}
          onError={handleImageError} 
          className="w-full h-full object-cover brightness-110 transition-all duration-300 group-hover:scale-110 rounded-t-xl"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 rounded-t-xl bg-customDark/75 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ShoppingCart 
            className="text-white hover:text-purpleLight w-6 h-6 mx-2" 
            onClick={() => {
              if (produit.status === "Disponible") {
                ajouterAuPanier(produit.produit_id);
              } else {
                alert("Ce produit n'est pas disponible pour l'ajout au panier");
              }
            }} 
          />
          <Eye className="text-white hover:text-purpleLight w-6 h-6 mx-2" onClick={() => setIsModalOpen(true)} />
        </div>

        <div className={`absolute top-5 left-0 text-white px-4 py-1 rounded-r-md 
          ${ produit.status === 'Disponible'
              ? 'bg-green-500'
              : produit.status === 'Rupture de stock'
              ? 'bg-red-500'
              : produit.status === 'En promotion'
              ? 'bg-yellow-500'
              : produit.status === 'Hors vente'
              ? 'bg-gray-500'
              : ''
          }`}> {produit.status} </div>

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
                color={i < (ratingHover || selectedRating) ? "yellow" : "gray"} 
              />
            </span>
          ))}
        </div>
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
    <ViewProduit produit={produit} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} setFormData={setFormData} />
    </>
  );
};

export default Card;
