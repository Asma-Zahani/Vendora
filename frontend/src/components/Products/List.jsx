/* eslint-disable react/prop-types */
import ImageActions from "./ImageActions";

const List = ({ wishlist, list, produit, ajouterAuPanier, ajouterAuListeSouhait, effacerDeListeSouhait }) => {

  return (
    <div className="flex items-center gap-6 p-4 border-b bg-customLight dark:bg-customDark">
      <div className="relative w-52 h-52 flex items-center justify-center rounded-lg overflow-hidden group">
        <ImageActions list={list} wishlist={wishlist} produit={produit} ajouterAuPanier={ajouterAuPanier} ajouterAuListeSouhait={ajouterAuListeSouhait} effacerDeListeSouhait={effacerDeListeSouhait} />
      </div>
      <div className="flex flex-col text-gray-800 dark:text-white">
        <h3 className="font-semibold text-lg">{produit.nom}</h3>
        <div className="mt-2 text-xl font-bold">${produit.prix}</div>
        <p className="text-sm text-gray-600 dark:text-gray-300">{produit.description}</p>
      </div>
    </div>
  );
};

export default List;
