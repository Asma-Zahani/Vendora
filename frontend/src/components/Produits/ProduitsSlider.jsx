/* eslint-disable react/prop-types */
import { useContext, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // ou n'importe quelle icône
import Slider from "react-slick";
import UserContext from '@/utils/UserContext';
import Card from '@/components/Produits/Card';
import usePanierWishlist from "@/pages/Client/Content/Protected/usePanierWishlist";

const ProduitsSlider = ({ titre, produits }) => {
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
          <h1 className="text-center mb-5 text-md sm:text-2xl font-semibold">{titre}</h1>

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