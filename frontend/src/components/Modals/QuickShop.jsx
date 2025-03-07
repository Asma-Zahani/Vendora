/* eslint-disable react/prop-types */
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { CgClose } from "react-icons/cg";

const QuickShop = ({ produit, onClose  }) => {
  useEffect(() => {
    AOS.init({ duration: 500, once: true });
    AOS.refresh();
  }, []);

  return (
    <div className="fixed z-50 w-full h-full inset-0 flex items-center justify-center">
      <div className="fixed inset-0 bg-contentLight/75 dark:bg-customDark/75 transition-opacity" aria-hidden="true"></div>
      <div className="relative p-4 w-full max-w-lg max-h-full" data-aos="fade-down" data-aos-duration="500">
        <div className="relative bg-customLight dark:bg-customDark rounded-md shadow-md p-5 flex flex-col">
          <button onClick={onClose} type="button" className="absolute top-3 right-3 text-gray-500 dark:text-gray-200 hover:bg-bgLight hover:dark:bg-bgDark hover:text-purpleLight dark:hover:text-purpleLight rounded-md w-8 h-8 inline-flex justify-center items-center">
            <CgClose size={20} />
          </button>

          <div className="flex flex-col justify-center mt-4">
            <p className="text-3xl font-semibold">{produit.nom}</p>

            <div className="flex items-center space-x-2 mt-2">
              <span className="text-lg font-bold text-purpleLight">${produit.prix_apres_promo}</span>
              {produit.promotion_id && <span className="text-gray-400 line-through">${produit.prix}</span>}
            </div>
          </div>
          <div className="mt-auto flex justify-end gap-3 pt-4">
            <button className="bg-purpleLight text-white py-2 px-6 rounded-md">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickShop;
