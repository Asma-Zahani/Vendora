import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEntities } from "@/service/EntitesService";
import Card from '@/components/Products/Card';
import { useContext } from "react";
import { UserContext } from '@/utils/UserContext';
import usePanierWishlist from "../Protected/usePanierWishlist";

const ProductRecommendations = () => {
  const { user, wishlist} = useContext(UserContext);
  const [produits, setProduits] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      setProduits(await getEntities("recentProduits"));
    }; 
    fetchData();
  }, []);
  
  const { ajouterAuPanier, ajouterAuListeSouhait } = usePanierWishlist(produits);

  return (
    <div>
      {user && produits.length > 0 && (
        <>
          <div className="px-8 py-12">
            <div className="flex flex-col items-center text-center mb-5">
              <div className="flex items-center w-full justify-center">
                <div className="border-t-2 w-20 mr-5"></div>
                <h1 className="text-2xl font-semibold uppercase">Produits récemment vus</h1>
                <div className="border-t-2 w-20 ml-5"></div>
              </div>
              <p className="italic text-gray-500">Vos dernières consultations</p>
            </div>

            <div className="mt-10 gap-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {produits.map((produit, index) => {
                return <Card key={index} wishlist={wishlist} produit={produit} ajouterAuPanier={ajouterAuPanier} ajouterAuListeSouhait={ajouterAuListeSouhait} />;
              })}
            </div>

            <div className="flex justify-center">
              <Link to={"/shop"} className="mt-4 bg-purpleLight text-white text-[14px] py-2 px-6 rounded-md">
                Voir tous les produits
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductRecommendations;