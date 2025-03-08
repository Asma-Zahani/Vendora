/* eslint-disable react/prop-types */
import { Eye, Heart, Link2, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import defaultImg from "@/assets/default/image.png";
import QuickView from "@/components/Modals/QuickView";
import QuickShop from "@/components/Modals/QuickShop";

const ImageActions = ({ wishlist, list, produit, ajouterAuPanier, ajouterAuListeSouhait, effacerDeListeSouhait }) => {
  const navigate = useNavigate();

  const [imageSrc, setImageSrc] = useState(`/produits/${produit.image}`);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false); 
  const [isShopModalOpen, setIsShopModalOpen] = useState(false); 
  const [isHeartHovered, setIsHeartHovered] = useState(false);
  const [isDeleteHovered, setIsDeleteHovered] = useState(false);
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
      <img src={imageSrc} alt={produit.nom} onError={handleImageError} 
        className="w-full h-full object-cover brightness-110 transition-all duration-300 group-hover:scale-110 rounded-t-xl"/>
      <div className="absolute top-0 left-0 sm:top-0 sm:left-0 right-0 bottom-0 rounded-t-xl bg-customDark/25 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        { !list &&
        <div className="flex flex-col space-y-1 md:space-y-2">
          <div onClick={() => setIsViewModalOpen(true)} className={`hidden md:hidden lg:flex bg-contentLight hover:bg-contentDark dark:text-black py-2 rounded-full items-center justify-center w-36 cursor-pointer transition-all duration-300
                ${produit.status === "Disponible" ? produit.couleurs && produit.couleurs.length > 0 ? "" : "relative left-7" : ""}`}
              onMouseEnter={() => setIsViewHovered(true)} onMouseLeave={() => setIsViewHovered(false)} >
              {isViewHovered ? <span className="truncate"><Eye data-aos="fade-up" data-aos-duration="300" className="text-white" /></span> : <span>Vue rapide</span>}
          </div>
          <div className="absolute right-2 bottom-[42px]">
            <div onClick={() => setIsViewModalOpen(true)} className="flex md:flex lg:hidden bg-contentLight hover:bg-contentDark text-black hover:text-white p-2 w-[34px] rounded-full items-center justify-center cursor-pointer transition-all duration-300">
            <Eye size={17}/>
            </div>
          </div>
          {produit.status === "Disponible" ? produit.couleurs && produit.couleurs.length > 0 ? 
            <>
              <div onClick={() => setIsShopModalOpen(true)} className="hidden md:hidden lg:flex bg-purpleLight py-2 rounded-full items-center justify-center w-36 cursor-pointer transition-all duration-300"
                onMouseEnter={() => setIsShopHovered(true)} onMouseLeave={() => setIsShopHovered(false)} >
                {isShopHovered ? <span className="truncate"><ShoppingCart data-aos="fade-up" data-aos-duration="300" className="text-white" /></span> : <span className="text-white">Achat rapide</span>}
              </div>
              <div className="absolute right-2 bottom-2">
                <div onClick={() => setIsShopModalOpen(true)} className="flex md:flex lg:hidden bg-purpleLight text-white py-2 rounded-full items-center justify-center p-2 cursor-pointer transition-all duration-300">
                  <ShoppingCart size={18}/>
                </div>
              </div>
            </> : 
            <div className="absolute right-2 bottom-2 sm:absolute md:absolute lg:static sm:right-2 sm:bottom-2 sm:flex md:right-2 md:bottom-2 flex items-center bg-contentLight rounded-full max-w-[130px] sm:max-w-[200px] overflow-hidden">
              <button onClick={handleDecrease} className="p-1 py-2 lg:py-3 dark:text-black rounded-l-full hover:bg-gray-300">
                <Minus size={16} />
              </button>
              <input type="number" value={quantity} min={1} onChange={handleChange} className="w-6 lg:w-7 py-1 lg:py-2 text-center dark:text-black hover:bg-gray-300 bg-transparent outline-none appearance-none 
                          [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
              <button onClick={handleIncrease} className="p-1 py-2 lg:py-3 dark:text-black hover:bg-gray-300">
                <Plus size={16} />
              </button>
              <button onMouseEnter={() => setIsShopHovered(true)} onMouseLeave={() => setIsShopHovered(false)} className="hidden md:hidden lg:flex px-4 py-2 bg-purpleLight text-white rounded-r-full items-center space-x-2 truncate">
                {isShopHovered ? <span onClick={() => ajouterAuPanier(produit.produit_id, quantity)} className="truncate w-full block px-9"><ShoppingCart data-aos="fade-up" data-aos-duration="300" className="text-white" /></span> : <span className="truncate w-full block">Ajouter Au panier</span>}
              </button>
              <button onClick={() => ajouterAuPanier(produit.produit_id, quantity)} className="flex md:flex lg:hidden px-3 sm:px-4 py-2 bg-purpleLight text-white rounded-r-full items-center space-x-2 truncate">
                <ShoppingCart size={17} data-aos="fade-up" data-aos-duration="300" className="text-white" />
              </button>
            </div> : 
            <> 
              <div onClick={() => navigate(`/shop/${produit.produit_id}`)} className="hidden md:hidden lg:flex bg-purpleLight py-2 rounded-full items-center justify-center w-36 cursor-pointer transition-all duration-300"
                onMouseEnter={() => setIsShopHovered(true)} onMouseLeave={() => setIsShopHovered(false)} >
                {isShopHovered ? <span className="truncate"><Link2 data-aos="fade-up" data-aos-duration="300" className="text-white" /></span> : <span className="text-white">Lire Plus</span>}
              </div>
              <div className="absolute right-2 bottom-2">
                <div onClick={() => navigate(`/shop/${produit.produit_id}`)} className="flex md:flex lg:hidden bg-purpleLight text-white py-2 rounded-full items-center justify-center p-2 cursor-pointer transition-all duration-300">
                  <Link2 size={18}/>
                </div>
              </div> 
            </> 
          }
        </div>
        }
        {!effacerDeListeSouhait && wishlist && 
          <Heart size={20} fill={`${wishlist.some(item => item.produit_id === produit.produit_id) ? 'red' : 'none'}`}
            onClick={() => {
              const isProductInWishlist = wishlist.some(item => item.produit_id === produit.produit_id);

              if (!isProductInWishlist) {
                ajouterAuListeSouhait(produit.produit_id);
              }
              else {
                navigate("/wishlist");
              }
            }}
            className={`absolute left-4 top-4 ${wishlist.some(item => item.produit_id === produit.produit_id) ? 'text-transparent' : 'text-white hover:text-customDark'}`}
            onMouseEnter={() => setIsHeartHovered(true)}
            onMouseLeave={() => setIsHeartHovered(false)}
          />
        }
        
        {isHeartHovered && (
          <div className="absolute left-11 top-[26px] -translate-y-1/2 bg-customLight dark:bg-customDark text-xs px-3 py-1 mr-2 mt-1 rounded-md shadow-lg">
            {wishlist.some(item => item.produit_id === produit.produit_id) ? 'Parcourir la liste de souhaits' : 'Ajouter à la liste de souhaits'}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 border-4 border-transparent border-r-customLight dark:border-r-customDark"></div>
          </div>
        )}

        {effacerDeListeSouhait && wishlist && 
          <button onClick={() => effacerDeListeSouhait(produit.produit_id)} onMouseEnter={() => setIsDeleteHovered(true)} onMouseLeave={() => setIsDeleteHovered(false)}
              className="absolute left-4 top-4 bg-contentLight hover:bg-contentDark text-black hover:text-white rounded-full p-2">
            <Trash2 size={17}/> 
          </button>
        }
        {isDeleteHovered && (
          <div className="absolute left-14 top-[34px] -translate-y-1/2 bg-customLight dark:bg-customDark text-xs px-3 py-1 mr-2 rounded-md shadow-lg">
            Effacer de la liste de souhaits
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 border-4 border-transparent border-r-customLight dark:border-r-customDark"></div>
          </div>
        )}

      </div>
      {isViewModalOpen && <QuickView produit={produit} onClose={() => setIsViewModalOpen(false)} />}
      {isShopModalOpen && <QuickShop produit={produit} onClose={() => setIsShopModalOpen(false)} />}
    </>
  );
};

export default ImageActions;
