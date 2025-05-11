/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import Card from '@/components/Produits/Card';
import UserContext from '@/utils/UserContext';
import usePanierWishlist from "@/pages/Client/Protected/usePanierWishlist";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Bot } from "lucide-react";
import { createEntity } from "@/service/EntitesService"
const Chatbot = ({step, setStep}) => {
  const { wishlist } = useContext(UserContext);
  const [produits, setProduits] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({categorie: '', montant: '', marque: ''}); 

  const { ajouterAuPanier, ajouterAuListeSouhait } = usePanierWishlist(produits);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setProduits(await createEntity("recommendations", formData));
      setLoading(false);
    };
    if (step === 6) {fetchData()}
  }, [formData, step]);

  const renderStep = () => {
    switch (step) {
      case 3:
        return (
          <div className="space-y-4">
            <p className="text-lg font-semibold mb-2 text-gray-700 dark:text-grayDark">🛍️ Quel type de produit cherchez-vous ?</p>          
            <Input type="text" value={formData.categorie} onChange={(e) => setFormData({ ...formData, categorie: e.target.value })} placeholder="ex : chaussures, PC..."/>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <p className="text-lg font-semibold mb-2 text-gray-700 dark:text-grayDark">💰 Quel est votre budget maximum ?</p>
            <Input type="number" value={formData.montant} onChange={(e) => setFormData({ ...formData, montant: e.target.value })} placeholder="ex : 100"/>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <p className="text-lg font-semibold mb-2 text-gray-700 dark:text-grayDark">🏷️ Une marque en particulier ?</p>
            <Input type="text" value={formData.marque} onChange={(e) => setFormData({ ...formData, marque: e.target.value })} placeholder="ex : Adidas, HP..."/>
          </div>
        );
      case 6:
        return loading ? (
          <p className="text-purpleLight text-center">⏳ Chargement...</p>
        ) : produits?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-4 rounded-lg">
              {produits.map((produit, index) => {
                return <Card key={index} wishlist={wishlist} produit={produit} ajouterAuPanier={ajouterAuPanier} ajouterAuListeSouhait={ajouterAuListeSouhait} />;
              })}
            </div>
        ) : (
          <p className="text-gray-500 text-center">❌ Aucune recommandation trouvée.</p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="min-h-[90vh] sm:min-h-[400px] flex flex-col justify-between">

              <div className="px-4 pt-6 space-y-3">
                <h2 className="flex flex-col justify-center items-center text-2xl font-semibold mb-6 text-center space-y-2">
                  <Bot size={30} /> 
                  <p className="max-w-[15rem]">Assistant Recommandation</p>
                </h2>
                {renderStep()}
              </div>
              {step !== 6 && 
              <div className="p-4">
                <Button onClick={() => setStep(step + 1)} isValid={true} text="Valider" />
              </div>}
          </div>
    </div>
  );
};

export default Chatbot;
