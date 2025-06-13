/* eslint-disable react/prop-types */
import { useContext } from "react";
import UserContext from '@/utils/UserContext';
import Card from '@/components/Produits/Card';
import { Link } from "react-router";
import usePanierWishlist from "@/pages/Client/Protected/usePanierWishlist";

const ProduitsSection = ({titre, sousTitre, produits, button}) => {
  const { wishlist } = useContext(UserContext);
  const { ajouterAuPanier, ajouterAuListeSouhait } = usePanierWishlist(produits);
  
  return (
    produits.length > 0 && 
    <div className="px-4 sm:px-8 py-4 sm:py-12">
      <div className="flex flex-col items-center text-center mb-5">
        <div className="flex items-center w-full justify-center">
          <div className="border-t-2 w-10 sm:w-20 mr-5"></div> 
          <h1 className="text-md sm:text-2xl font-semibold uppercase">{titre}</h1>
          <div className="border-t-2 w-10 sm:w-20 ml-5"></div> 
        </div>
        <p className="italic font-greatvibes text-gray-500">{sousTitre}</p>
      </div>
      <div className="mt-10 mx-0 lg:mx-20 gap-2 sm:gap-6 grid grid-cols-2 md:grid-cols-4">
        {
          produits.map((produit, index) => {
            return <Card key={index} wishlist={wishlist} produit={produit} ajouterAuPanier={ajouterAuPanier} ajouterAuListeSouhait={ajouterAuListeSouhait} />;
          })
        }
      </div>

      {button && 
        <div className="flex justify-center">
          <Link to={"/boutique"} className="mt-8 border-2 text-purpleLight text-lg py-2 px-6 rounded-lg">
            Voir tous les produits
          </Link>
        </div>
      }
    </div>
    
  );
};

export default ProduitsSection;