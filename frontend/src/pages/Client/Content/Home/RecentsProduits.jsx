import { useState, useEffect, useContext } from "react";
import UserContext from "@/utils/UserContext";
import Card from "@/components/Products/Card";
import { Link } from "react-router-dom";
import { getEntities } from "@/service/EntitesService";
import usePanierWishlist from "../Protected/usePanierWishlist";
import { useMediaQuery } from "react-responsive";
import { createEntity } from "@//service/EntitesService";

const RecommandationsProduits = () => {
  const { wishlist , user} = useContext(UserContext); // Assure-toi d'inclure l'ID utilisateur dans UserContext
  const [produits, setProduits] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  const isMd = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const produitsAffiches = isMd ? produits.slice(0, 9) : produits;
  useEffect(() => {
    setError(null); // Réinitialiser l'erreur
  
    const fetchRecommendations = async () => {
      try {
        let data;
        if (user && user.id) {
          data = await createEntity("getRecommendations", { user_id: user.id });
        } else {
          data = await getEntities("getRecommendations");
          setError("Utilisateur non connecté.");
        }
  
        console.log("Produits recommandés:", data.produits_recommandes);
        setProduits(data.produits_recommandes || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des recommandations", error);
        setError("Une erreur est survenue lors de la récupération des recommandations.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchRecommendations();
  }, [user]);
  
  
  

  const { ajouterAuPanier, ajouterAuListeSouhait } = usePanierWishlist(produits);

  return (
    <div className="px-8 py-12">
      {produits.length > 0 && (
        <>
          <div className="flex flex-col items-center text-center mb-5">
            <div className="flex items-center w-full justify-center">
              <div className="border-t-2 w-20 mr-5"></div>
              <h1 className="text-2xl font-semibold uppercase">Produits recommandés</h1>
              <div className="border-t-2 w-20 ml-5"></div>
            </div>
            <p className="italic text-gray-500">Produits basés sur vos préférences et interactions</p>
          </div>

          <div className="mt-10 gap-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {produitsAffiches.map((produit, index) => (
            <Card
              key={`${produit.id}-${index}`} // Utiliser un index en cas de doute
              wishlist={wishlist}
              produit={produit}
              ajouterAuPanier={ajouterAuPanier}
              ajouterAuListeSouhait={ajouterAuListeSouhait}
            />
          ))}
          </div>


          <div className="flex justify-center">
            <Link to={"/boutique"} className="mt-8 border-2 text-purpleLight text-lg py-2 px-6 rounded-lg">
              Voir tous les produits
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default RecommandationsProduits;
