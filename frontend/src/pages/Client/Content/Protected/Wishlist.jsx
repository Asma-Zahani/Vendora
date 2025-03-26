import { useEffect, useState, useContext } from "react";
import UserContext from '@/utils/UserContext';
import Card from "@/components/Products/Card";
import { HeartOff } from "lucide-react";
import usePanierWishlist from "./usePanierWishlist";

const Wishlist = () => {
    const { user, panier, wishlist, setPanier, setWishlist } = useContext(UserContext);
    const [produits, setProduits] = useState(null);
    useEffect(() => {setProduits(wishlist)}, [wishlist]);
    const { ajouterAuPanier, supprimerDeListeSouhait } = usePanierWishlist(user, panier, setPanier, produits, wishlist, setWishlist);

    return (
      <section className="mx-6 py-6">
        <div className="flex flex-col">
            <div className="inline-block min-w-full py-2">
                <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm">
                    {produits?.length > 0 && <h1 className="text-2xl font-semibold mb-4">Liste de souhait</h1>}
                    {produits?.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 rounded-lg">
                            {produits.map((produit, index) => (
                                <Card key={index} wishlist={wishlist} produit={produit} ajouterAuPanier={ajouterAuPanier} effacerDeListeSouhait={supprimerDeListeSouhait} />
                            ))}
                        </div>
                    ) : (
                      <div className="flex items-center justify-center text-center h-100">
                        <div className="flex flex-col max-w-lg">
                            <div className="p-3 mx-auto text-purpleLight">
                                <HeartOff size={80} />
                            </div>
                            <h1 className="mt-3 text-2xl font-semibold uppercase text-gray-800 dark:text-white">votre liste de souhait est vide</h1>
                            <div className="pt-2 text-sm">
                              <p>Vous n&apos;avez pas encore de produits dans votre liste de souhaits.</p>
                              <p>Vous trouverez de nombreux produits intéressants sur notre page &quot;Boutique&quot;.</p>
                            </div>
                        </div>
                      </div>
                    )}
                </div>
            </div>
        </div>
      </section>
    );
};

export default Wishlist;
