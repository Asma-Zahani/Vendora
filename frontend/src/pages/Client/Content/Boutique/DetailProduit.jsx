import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import defaultImg from "@/assets/default/image.png";
import { getEntity, createEntity } from "@/service/EntitesService";
import UserContext from '@/utils/UserContext';

const DetailProduit = () => {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [produit, setProduit] = useState([]);
  const [imageSrc, setImageSrc] = useState(`/produits/${produit.image}`);

  const handleImageError = () => {
    setImageSrc(defaultImg); 
  };

  useEffect(() => {
    const fetchData = async () => {
      const produitData = await getEntity("produits", id);
      setProduit(produitData);
      setImageSrc(`/produits/${produitData.image}`);
    }; 
    fetchData();
  }, [id]);
  
  useEffect(() => {
    if (user) {
      const createInteraction = async () => {
        await createEntity("interactions", { user_id: user?.id, produit_id: id, vue_produit: 1 });
      };
      createInteraction();
    }
  }, [id, user]);

  return (
    <section className="mx-6 py-6">
        <div className="flex gap-3">
            <div className="w-1/3 py-2">
                <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm">
                    <img
                        src={imageSrc}
                        alt={produit.nom}
                        onError={handleImageError} 
                        className="w-full h-full object-cover brightness-110 transition-all duration-300 group-hover:scale-110 rounded-xl"
                    />
                </div>
            </div>
            <div className="w-2/3 py-2">
                <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm">
                    <p>{produit.nom}</p>
                    <p>{produit.prix}</p>
                    <p>{produit.description}</p>
                </div>
            </div>
        </div>
    </section>
  );
};

export default DetailProduit;