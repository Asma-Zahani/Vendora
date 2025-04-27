

/* eslint-disable react/prop-types */
import img from "@/assets/default/image.png";

const Recapitulatif = ({checkoutData}) => {
  return (
    <div className="flex-1 p-12 bg-contentLight dark:bg-contentDark border border-gray-300 dark:border-borderDark">
        <div className="border-b dark:border-borderDark pb-4 mb-4 space-y-2">
            {checkoutData.produits.map((produit, index) => {
                return (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="relative">
                                <img src={produit.image ? (`/produits/${produit.image}`) : img} alt="image" onError={(e) => e.target.src = img} className="w-15 h-15 object-cover rounded-md" />
                                <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-[20px] min-h-[20px] text-xs font-bold text-white bg-[#666666] rounded-full transition-transform duration-300 transform rotate-[360deg]">
                                    {produit.pivot?.quantite ?? produit.quantite}
                                </span>
                            </div>
                            <div className="flex flex-col text-start text-md ml-2">
                                <p className="font-semibold">{produit.nom}</p>
                                <span className="text-sm">{produit.pivot?.couleur}</span>
                            </div>
                        </div>
                        
                        <div>                              
                            <strong>{produit.prix_apres_promo * (produit.pivot?.quantite ?? produit.quantite)} DT</strong>
                        </div>
                    </div>
                );
            })}
        </div>
        <p className="text-sm font-normal flex justify-between">
            Sous-total · {checkoutData.produits?.length} produits <span>{checkoutData.original} DT</span>
        </p>
        {checkoutData.remise && <p className="text-sm font-normal flex justify-between">
            Remise <span>{checkoutData.remise}%</span>
        </p>}

        {checkoutData.fraisLivraison > 0 && (
        <p className="text-sm font-normal flex justify-between">
            Frais de livraison <span>{checkoutData.fraisLivraison} DT</span>
        </p>
        )}
        <p className="text-lg font-semibold flex justify-between">
            Total <strong>{checkoutData.totalAvecFrais} DT</strong>
        </p>
        {checkoutData.codePromo && <p><strong>Code Promo :</strong> {checkoutData.codePromo}</p>}
    </div>
  )
}

export default Recapitulatif