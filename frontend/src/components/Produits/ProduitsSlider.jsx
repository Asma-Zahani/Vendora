/* eslint-disable react/prop-types */
import { useContext, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // ou n'importe quelle icône
import Slider from "react-slick";
import UserContext from '@/utils/UserContext';
import Card from '@/components/Produits/Card';
import usePanierWishlist from "@/pages/Client/Content/Protected/usePanierWishlist";

const ProduitsSlider = ({ titre, sousTitre, produits }) => {
  const sliderRef = useRef(null);
  const { wishlist } = useContext(UserContext);
  const { ajouterAuPanier, ajouterAuListeSouhait } = usePanierWishlist(produits);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };

  return (
    <div className="px-4 sm:px-0 relative py-4 sm:py-12">
      {produits.length > 0 && (
        <>
          <div className="flex flex-col items-center text-center mb-5">
            <div className="flex items-center w-full justify-center">
              <div className="border-t-2 w-10 sm:w-20 mr-5"></div> 
              <h1 className="text-md sm:text-2xl font-semibold uppercase">{titre}</h1>
              <div className="border-t-2 w-10 sm:w-20 ml-5"></div> 
            </div>
            <p className="italic font-greatvibes text-gray-500">{sousTitre}</p>
          </div>

          <button onClick={() => sliderRef.current?.slickPrev()} className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full border hover:bg-purpleLight hover:text-white">
            <ChevronLeft size={24} />
          </button>
          <button onClick={() => sliderRef.current?.slickNext()} className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full border hover:bg-purpleLight hover:text-white">
            <ChevronRight size={24} />
          </button>

          <Slider ref={sliderRef} {...settings}>
            {produits.map((produit, index) => (
              <div key={index} className="px-1 sm:px-3">
                <Card
                  wishlist={wishlist}
                  produit={produit}
                  ajouterAuPanier={ajouterAuPanier}
                  ajouterAuListeSouhait={ajouterAuListeSouhait}
                />
              </div>
            ))}
          </Slider>
        </>
      )}
    </div>
  );
};

export default ProduitsSlider;