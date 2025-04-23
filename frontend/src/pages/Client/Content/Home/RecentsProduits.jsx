import { useState, useEffect, useContext } from "react";
import UserContext from '@/utils/UserContext';
import Card from '@/components/Products/Card';
import { Link } from "react-router";
import { getEntities } from "@/service/EntitesService";
import usePanierWishlist from "../Protected/usePanierWishlist";
import { useMediaQuery } from "react-responsive";

const RecentsProduits = () => {
  const { wishlist} = useContext(UserContext);
  const [produits, setProduits] = useState([]);
  const isMd = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  const produitsAffiches = isMd ? produits.slice(0, 9) : produits;

  useEffect(() => {
    const fetchData = async () => {
      setProduits(await getEntities("recentProduits"));
    }; 
    fetchData();
  }, []);

  const { ajouterAuPanier, ajouterAuListeSouhait } = usePanierWishlist(produits);

  return (
    <div className="px-8 py-12">
      {produits.length > 0 && 
        <>
          <div className="flex flex-col items-center text-center mb-5">
            <div className="flex items-center w-full justify-center">
              <div className="border-t-2 w-20 mr-5"></div> 
              <h1 className="text-2xl font-semibold uppercase">Produits récents</h1>
              <div className="border-t-2 w-20 ml-5"></div> 
            </div>
            <p className="italic text-gray-500">Nouveautés cette semaine</p>
          </div>
          <div className="mt-10 gap-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {
              produitsAffiches.map((produit, index) => {
                return <Card key={index} wishlist={wishlist} produit={produit} ajouterAuPanier={ajouterAuPanier} ajouterAuListeSouhait={ajouterAuListeSouhait} />;
              })
            }
          </div>

          <div className="flex justify-center">
            <Link to={"/boutique"} className="mt-8 border-2 text-purpleLight text-lg py-2 px-6 rounded-lg">
              Voir tous les produits
            </Link>
          </div>
        </>
      }
    </div>

  );
};

export default RecentsProduits;
