import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import defaultImg from "@/assets/default/image.png";
import { getEntity, getEntities, createEntity, getRecommandations } from "@/service/EntitesService";
import UserContext from '@/utils/UserContext';
import { useNavigate } from "react-router-dom";
import { Heart, Minus, Plus } from "lucide-react";
import usePanierWishlist from "../Protected/usePanierWishlist";
import ProduitsSlider from "@/components/Produits/ProduitsSlider";

const DetailProduit = () => {
  const { user, wishlist } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [produit, setProduit] = useState();
  const [produitsRecommandes, setProduitsRecommandes] = useState([]);
  const [derniersProduitsVus, setDerniersProduitsVus] = useState([]);
  const [imageSrc, setImageSrc] = useState();

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);

  const handleImageError = () => {
    setImageSrc(defaultImg); 
  };

  useEffect(() => {
    const fetchData = async () => {
      setProduit(await getEntity("produits", id));
      setProduitsRecommandes((await getRecommandations("recommend_similar_produits", { produit_id: id, interaction_type: "vue_produit" }))?.data ?? []);
      if (user) { setDerniersProduitsVus(await getEntities("derniersProduitsVus")) }
    }; 
    fetchData();
  }, [id, user]);
  
  useEffect(() => {
    if (produit) {
      setImageSrc(`/produits/${produit?.image}`);
      if (produit?.couleurs?.length > 0) {
        setSelectedColor(
          produit.couleurs.find((c) => c.selectionne) || produit.couleurs[0]
        );
      } else {
        setSelectedColor(null);
      }
    }
  }, [produit]);
  
  useEffect(() => {
    if (user) {
      const createInteraction = async () => {
        await createEntity("interactions", { user_id: user?.id, produit_id: id, vue_produit: 1 });
      };
      createInteraction();
    }
  }, [id, user]);

  const handleIncrease = () => {
    if (quantity < (selectedColor && produit.couleurs.length > 0 ? selectedColor.pivot.quantite : produit.quantite)) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const { ajouterAuPanier, ajouterAuListeSouhait } = usePanierWishlist([produit]);
  
  const handleAddToCart = () => {    
    if (quantity <= (selectedColor && produit.couleurs.length > 0 ? selectedColor.pivot.quantite : produit.quantite)) {
      ajouterAuPanier(produit.produit_id, quantity, selectedColor.nom, null);
    }
  };

  return (
    <section className="mx-0 lg:mx-26 py-6">
      {produit && 
        <div className="flex flex-col md:flex-row p-6 max-w-6xl mx-auto">
          <div className="relative md:w-1/3 py-2">
            <img src={imageSrc} alt={produit.nom} onError={handleImageError} className="w-full h-full object-cover brightness-110 transition-all duration-300 group-hover:scale-110"/>
            {produit.status != "Disponible" && (
              <div className={`absolute right-2 top-4 flex text-white text-xs sm:text-sm font-semibold py-1 px-2 sm:px-3 rounded-full items-center justify-center shadow-md ${
                produit.status === 'Rupture de stock' ? 'bg-red-600' :
                produit.status === 'En arrivage' ? 'bg-yellow-600' :
                produit.status === 'Hors vente' ? 'bg-gray-600' : '' }`}>
                {produit.status}
              </div>
            )}   
          </div>
          <div className="md:w-2/3 mt-6 md:mt-0 md:pl-10">
            <div className="flex justify-between">
              <div>
                <h2 className="text-2xl font-semibold">{produit.nom}</h2>
                <p className="text-xl text-gray-600 dark:text-grayDark mt-1">{produit.prix_apres_promo} DT</p>
              </div>

              <div className="flex items-center mt-2">
                <div className="text-yellow-400 text-xl mr-2">★★★★★</div>
                <span className="text-gray-500 dark:text-grayDark text-sm">(1 review)</span>
              </div>
            </div>

            <p className="text-gray-600 dark:text-grayDark mt-4">{produit.description}</p>

            <div className="mt-4">
              {produit.couleurs?.length > 0 && (
                <div className="mt-4">
                  <p className="font-semibold">couleur : {selectedColor?.nom}</p>
                  <div className="flex gap-2 mt-2">
                    {produit.couleurs.map((couleur) => (
                      <button
                        key={couleur.couleur_id}
                        onClick={() => {setSelectedColor(couleur);setQuantity(1)}}
                        className={`w-8 h-8 rounded-full border ${
                          selectedColor?.couleur_id === couleur.couleur_id ? "border-purpleLight" : "border-gray-300"
                        } ${couleur.pivot?.quantite === 0 ? "opacity-50 grayscale cursor-not-allowed" : ""}`}  
                        style={{ backgroundColor: couleur.code_hex }}
                        disabled={couleur.pivot?.quantite === 0} 
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 mt-4">
              <div onClick={handleDecrease} className="p-3 rounded-l-md border border-gray-200 dark:border-borderDark">
                <Minus size={16} />
              </div>
              <input className="-mx-3 py-2 w-10 text-center bg-transparent border-t border-b border-gray-200 dark:border-borderDark outline-none" type="text" value={quantity} onChange={() => {}} />
              <div onClick={handleIncrease} className="p-3 rounded-r-md border border-gray-200 dark:border-borderDark">
                <Plus size={16} />
              </div>
              {produit.status == "Disponible" ?
                <button onClick={() => handleAddToCart()} className="hidden sm:flex bg-purpleLight text-white py-2 px-8 rounded-md items-center gap-2">Ajouter Au panier</button>
                : <button className="hidden sm:flex bg-purpleLight text-white py-2 px-8 rounded-md items-center gap-2 opacity-50 cursor-not-allowed" disabled={true}>{produit.status}</button>
              }
              <div className="p-3 rounded-md border border-gray-200 dark:border-borderDark"
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
              <button onClick={() => handleAddToCart()} className="w-full mt-4 flex sm:hidden bg-purpleLight text-white py-2 px-8 rounded-md items-center justify-center gap-2">Ajouter Au panier</button>
              : <button className="w-full mt-4 flex sm:hidden bg-purpleLight text-white py-2 px-8 rounded-md items-center justify-center gap-2 opacity-50 cursor-not-allowed" disabled={true}>{produit.status}</button>
            }

            <div className="mt-4 text-sm text-gray-600 dark:text-grayDark">
              <p>Disponibilité: <span className="text-black dark:text-white font-medium">{produit.status}</span></p>
              <p>Catégorie: <span className="text-black dark:text-white font-medium">{produit.sous_categorie?.categorie?.titre} - {produit.sous_categorie?.titre}</span></p>
            </div>
          </div>
        </div>
      }
      <ProduitsSlider titre="Produits similaires" produits={produitsRecommandes} />
      {derniersProduitsVus?.length > 3 && <ProduitsSlider titre="Produits récemment consultés"produits={derniersProduitsVus} />}
    </section>
  );
};

export default DetailProduit;