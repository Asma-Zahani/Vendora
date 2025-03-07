/* eslint-disable react/prop-types */
import { Eye, Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import defaultImg from "@/assets/default/image.png";
import QuickView from "@/components/Modals/QuickView";
import QuickShop from "@/components/Modals/QuickShop";

const Card = ({ produit, ajouterAuPanier }) => {
  const [imageSrc, setImageSrc] = useState(`/produits/${produit.image}`);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false); 
  const [isShopModalOpen, setIsShopModalOpen] = useState(false); 
  const [isViewHovered, setIsViewHovered] = useState(false);
  const [isShopHovered, setIsShopHovered] = useState(false);

  const handleImageError = () => {
    setImageSrc(defaultImg); 
  };

  useEffect(() => {
    AOS.init({ duration: 500, once: true });
    AOS.refresh();
  }, []);

  const [quantity, setQuantity] = useState(1);

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    }
  };

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <>
    <div className="bg-customLight dark:bg-customDark rounded-xl shadow-md flex flex-col items-center">
      <div className="relative w-full h-full rounded-t-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden group">
        <img
          src={imageSrc}
          alt={produit.nom}
          onError={handleImageError} 
          className="w-full h-full object-cover brightness-110 transition-all duration-300 group-hover:scale-110 rounded-t-xl"
        />
        <div className="absolute top-0 left-0 sm:top-0 sm:left-0 right-0 bottom-0 rounded-t-xl bg-customDark/25 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex flex-col space-y-1 md:space-y-2">
            <div onClick={() => setIsViewModalOpen(true)} className={`hidden md:hidden lg:flex bg-contentLight hover:bg-contentDark dark:text-black py-2 rounded-full items-center justify-center w-36 cursor-pointer transition-all duration-300
                ${produit.couleurs && produit.couleurs.length > 0 ? "" : "relative left-7"}`}
                onMouseEnter={() => setIsViewHovered(true)} onMouseLeave={() => setIsViewHovered(false)} >
                {isViewHovered ? <span className="truncate"><Eye data-aos="fade-up" data-aos-duration="300" className="text-white" /></span> : <span>Vue rapide</span>}
            </div>
            <div className="absolute right-2 bottom-[42px]">
              <div onClick={() => setIsViewModalOpen(true)} className="flex md:flex lg:hidden bg-contentLight hover:bg-contentDark text-black hover:text-white p-2 w-[34px] rounded-full items-center justify-center cursor-pointer transition-all duration-300">
              <Eye size={17}/>
              </div>
            </div> 
            {produit.couleurs && produit.couleurs.length > 0 ?
              <>
                <div onClick={() => setIsShopModalOpen(true)} className="hidden md:hidden lg:flex bg-purpleLight py-2 rounded-full items-center justify-center w-36 cursor-pointer transition-all duration-300"
                  onMouseEnter={() => setIsShopHovered(true)} onMouseLeave={() => setIsShopHovered(false)} >
                  {isShopHovered ? <span className="truncate"><ShoppingCart data-aos="fade-up" data-aos-duration="300" className="text-white" /></span> : <span>Achat rapide</span>}
                </div>
                <div className="absolute right-2 bottom-2">
                  <div onClick={() => setIsShopModalOpen(true)} className="flex md:flex lg:hidden bg-purpleLight py-2 rounded-full items-center justify-center p-2 cursor-pointer transition-all duration-300">
                    <ShoppingCart size={18}/>
                  </div>
                </div> 
              </> 
            :
            <div className="absolute right-2 bottom-2 sm:absolute md:absolute lg:static sm:right-2 sm:bottom-2 sm:flex md:right-2 md:bottom-2 flex items-center bg-contentLight rounded-full max-w-[130px] sm:max-w-[200px] overflow-hidden">
              <button onClick={handleDecrease} className="p-1 py-2 md:py-3 dark:text-black rounded-l-full hover:bg-gray-300">
                <Minus size={16} />
              </button>
              <input type="number" value={quantity} min={1} onChange={handleChange} className="w-6 md:w-7 py-1 md:py-2 text-center dark:text-black hover:bg-gray-300 bg-transparent outline-none appearance-none 
                          [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
              <button onClick={handleIncrease} className="p-1 py-2 md:py-3 dark:text-black hover:bg-gray-300">
                <Plus size={16} />
              </button>
              <button onMouseEnter={() => setIsShopHovered(true)} onMouseLeave={() => setIsShopHovered(false)} className="hidden md:hidden lg:flex px-4 py-2 bg-purpleLight text-white rounded-r-full items-center space-x-2 truncate">
                {isShopHovered ? <span 
                  onClick={() => {
                    if (produit.status === "Disponible") {
                      ajouterAuPanier(produit.produit_id, quantity);
                    } else {
                      alert("Ce produit n'est pas disponible pour l'ajout au panier");
                    }
                  }} 
                className="truncate w-full block px-9"><ShoppingCart data-aos="fade-up" data-aos-duration="300" className="text-white" /></span> : <span className="truncate w-full block">Ajouter Au panier</span>}
              </button>
              <button className="flex md:flex lg:hidden px-3 sm:px-4 py-2 bg-purpleLight text-white rounded-r-full items-center space-x-2 truncate">
                <ShoppingCart size={17} data-aos="fade-up" data-aos-duration="300" className="text-white" />
              </button>
            </div>
            }
          </div>
          <Heart size={20} className="absolute left-4 top-4 text-white hover:text-purpleLight" />
        </div>
      </div>

      <div className="w-full p-4 text-left">
        <h2 className="text-lg font-semibold">{produit.nom}</h2>
        <div className="flex mt-2 gap-3 text-md font-semibold">
          <span className="text-purpleLight">${produit.prix_apres_promo}</span>
          {produit.promotion_id ? 
            <span className="text-gray-300">
              <del>${produit.prix}</del>
            </span> : ''}
        </div>
      </div>
    </div>
    {isViewModalOpen && <QuickView produit={produit} onClose={() => setIsViewModalOpen(false)} />}
    {isShopModalOpen && <QuickShop produit={produit} onClose={() => setIsShopModalOpen(false)} />}
    </>
  );
};

export default Card;
