/* eslint-disable react/prop-types */
import ImageActions from "./ImageActions";

const Card = ({ wishlist, produit, ajouterAuPanier, ajouterAuListeSouhait, effacerDeListeSouhait }) => {

  return (
    <>
    <div className="bg-customLight dark:bg-customDark rounded-xl shadow-md flex flex-col items-center">
      <div className="relative w-full h-full rounded-t-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden group">
        <ImageActions wishlist={wishlist} produit={produit} ajouterAuPanier={ajouterAuPanier} ajouterAuListeSouhait={ajouterAuListeSouhait} effacerDeListeSouhait={effacerDeListeSouhait} />
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
    </>
  );
};

export default Card;
