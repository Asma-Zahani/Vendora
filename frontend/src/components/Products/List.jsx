/* eslint-disable react/prop-types */
import { Eye, ShoppingCart } from "lucide-react";
import { useState } from "react";
import defaultImg from "@/assets/default/image.png";
import ViewProduit from "@/components/Modals/ViewProduit";

const List = ({ produit, setFormData }) => {
  const [imageSrc, setImageSrc] = useState(`/produits/${produit.image}`);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleImageError = () => {
    setImageSrc(defaultImg);
  };

  return (
    <div className="flex items-center gap-6 p-4 border-b bg-customLight dark:bg-customDark">
      <div className="relative w-32 h-32 bg-gray-100 dark:bg-gray-700 flex items-center justify-center rounded-lg overflow-hidden group">
        <img
          src={imageSrc}
          alt={produit.nom}
          onError={handleImageError}
          className="w-full h-full object-cover brightness-110 transition-all duration-300 group-hover:scale-110"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-customDark/75 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ShoppingCart className="text-white w-6 h-6 mx-2" />
          <Eye className="text-white w-6 h-6 mx-2" onClick={() => setIsModalOpen(true)} />
        </div>
      </div>
      <div className="flex flex-col text-gray-800 dark:text-white">
        <h3 className="font-semibold text-lg">{produit.nom}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{produit.description}</p>
        <div className="mt-2 text-xl font-bold">${produit.prix}</div>
      </div>
      <ViewProduit produit={produit} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} setFormData={setFormData} />
    </div>
  );
};

export default List;
