/* eslint-disable react/prop-types */
import { Eye, Link2, Minus, Plus, ShoppingCart } from "lucide-react";
import ImageActions from "./ImageActions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuickView from "@/components/Modals/QuickView";
import QuickShop from "@/components/Modals/QuickShop";

const List = ({ wishlist, list, produit, ajouterAuPanier, ajouterAuListeSouhait, effacerDeListeSouhait }) => {
  const navigate = useNavigate();
  
  const [isViewModalOpen, setIsViewModalOpen] = useState(false); 
  const [isShopModalOpen, setIsShopModalOpen] = useState(false);
  const [isViewHovered, setIsViewHovered] = useState(false);
  const [isShopHovered, setIsShopHovered] = useState(false);

  const [quantity, setQuantity] = useState(1);

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    }
  };

  const handleIncrease = () => {
    if (quantity < produit.quantite || produit.couleurs[0]?.pivot?.quantite) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex items-center gap-6 p-4 border border-borderGrayLight dark:border-borderDark">
      <div className="relative w-32 sm:w-52 sm:h-52 flex items-center justify-center rounded-lg overflow-hidden group">
        <ImageActions list={list} wishlist={wishlist} produit={produit} ajouterAuPanier={ajouterAuPanier} ajouterAuListeSouhait={ajouterAuListeSouhait} effacerDeListeSouhait={effacerDeListeSouhait} />
      </div>
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-col text-gray-800 dark:text-white">
          <h2 className="text-md sm:text-lg">{produit.nom}</h2>
          <div className="flex gap-3 text-sm font-semibold">
            <span className="text-purpleLight">{produit.prix_apres_promo} DT</span>
            {produit.promotion_id ? 
              <span className="text-gray-300">
                <del>{produit.prix} DT</del>
              </span> : ''}
          </div>
          <p className="text-sm max-w-3xl mt-2 text-gray-600 dark:text-gray-300">{produit.description}</p>
        </div>
        <div className="flex flex-col gap-3">
          <div onClick={() => {setIsViewModalOpen(true)}} className={`flex border border-purpleLight text-purpleLight hover:bg-contentDark py-2 rounded-full items-center justify-center w-50 cursor-pointer transition-all duration-300`}
              onMouseEnter={() => setIsViewHovered(true)} onMouseLeave={() => setIsViewHovered(false)} >
              {isViewHovered ? <span className="truncate">
                <Eye data-aos="fade-up" data-aos-duration="300" className="text-white" /></span> : <span>Vue rapide</span>
              }
          </div>
          {produit.status === "Disponible" ? produit.couleurs && produit.couleurs.length > 1 ? 
            <>
              <div onClick={(e) => {e.stopPropagation(); setIsShopModalOpen(true)}} className="flex bg-purpleLight py-2 rounded-full items-center justify-center w-50 cursor-pointer transition-all duration-300"
                onMouseEnter={() => setIsShopHovered(true)} onMouseLeave={() => setIsShopHovered(false)} >
                {isShopHovered ? <span className="truncate"><ShoppingCart data-aos="fade-up" data-aos-duration="300" className="text-white" /></span> : <span className="text-white">Achat rapide</span>}
              </div>
              <div className="absolute right-2 bottom-2">
                <div onClick={(e) => {e.stopPropagation(); setIsShopModalOpen(true)}} className="flex md:flex lg:hidden bg-purpleLight text-white py-2 rounded-full items-center justify-center p-2 cursor-pointer transition-all duration-300">
                  <ShoppingCart size={18}/>
                </div>
              </div>
            </> : 
            <div className="absolute right-2 bottom-2 sm:static flex items-center border border-purpleLight rounded-full max-w-[130px] sm:max-w-[200px] overflow-hidden">
              <button onClick={(e) => {e.stopPropagation(); handleDecrease()}} className="p-1 py-2 lg:py-3 text-purpleLight rounded-l-full border-r hover:bg-bgLight dark:hover:bg-bgDark">
                <Minus size={16} />
              </button>
              <input onClick={(e) => e.stopPropagation()} type="number" value={quantity} min={1} onChange={handleChange} className="w-6 lg:w-7 py-1 lg:py-2 text-center text-purpleLight hover:bg-bgLight dark:hover:bg-bgDark bg-transparent outline-none appearance-none 
                          [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
              <button onClick={(e) => {e.stopPropagation(); handleIncrease()}} className="p-1 py-2 lg:py-3 text-purpleLight border-l hover:bg-bgLight dark:hover:bg-bgDark">
                <Plus size={16} />
              </button>
              <button onMouseEnter={() => setIsShopHovered(true)} onMouseLeave={() => setIsShopHovered(false)} className="flex px-4 py-2 bg-purpleLight text-white rounded-r-full items-center space-x-2 truncate">
                {isShopHovered ? <span onClick={(e) => {e.stopPropagation(); ajouterAuPanier(produit.produit_id, quantity, produit.couleurs[0]?.nom)}} className="truncate w-full block px-9"><ShoppingCart data-aos="fade-up" data-aos-duration="300" className="text-white" /></span> : <span className="truncate w-full block">Ajouter Au panier</span>}
              </button>
            </div> : 
            <> 
              <div onClick={() => navigate(`/boutique/${produit.produit_id}`)} className="flex bg-purpleLight py-2 rounded-full items-center justify-center w-50 cursor-pointer transition-all duration-300"
                onMouseEnter={() => setIsShopHovered(true)} onMouseLeave={() => setIsShopHovered(false)} >
                {isShopHovered ? <span className="truncate"><Link2 data-aos="fade-up" data-aos-duration="300" className="text-white" /></span> : <span className="text-white">Lire Plus</span>}
              </div>
            </> 
          }
        </div>
      </div>
      {isViewModalOpen && <QuickView produit={produit} onClose={() => setIsViewModalOpen(false)} ajouterAuPanier={ajouterAuPanier} wishlist={wishlist} ajouterAuListeSouhait={ajouterAuListeSouhait} />}
      {isShopModalOpen && <QuickShop produit={produit} onClose={() => setIsShopModalOpen(false)} ajouterAuPanier={ajouterAuPanier} />}
    </div>
  );
};

export default List;
