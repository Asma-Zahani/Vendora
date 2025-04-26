/* eslint-disable react/prop-types */
import ImageActions from "./ImageActions";

const Card = ({ wishlist, produit, ajouterAuPanier, ajouterAuListeSouhait, effacerDeListeSouhait }) => {

  return (
    <>
    <div className="flex flex-col items-center">
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden group">
        <ImageActions wishlist={wishlist} produit={produit} ajouterAuPanier={ajouterAuPanier} ajouterAuListeSouhait={ajouterAuListeSouhait} effacerDeListeSouhait={effacerDeListeSouhait} />
      </div>
      <div className="w-full px-1 pt-2 mb-4 text-left">
        <h2 className="text-md sm:text-lg">{produit.nom}</h2>
        <div className="flex gap-3 text-sm font-semibold">
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
