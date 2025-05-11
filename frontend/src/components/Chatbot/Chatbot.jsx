/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import Card from '@/components/Produits/Card';
import UserContext from '@/utils/UserContext';
import usePanierWishlist from "@/pages/Client/Protected/usePanierWishlist";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const Chatbot = ({step, setStep}) => {
  const { wishlist } = useContext(UserContext);
  const [answers, setAnswers] = useState({
    category: "",
    budget: "",
    brand: "",
  });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  
  const { ajouterAuPanier, ajouterAuListeSouhait } = usePanierWishlist(response);

  const handleNext = () => {
    if (step === 3) setAnswers({ ...answers, category: inputValue });
    if (step === 4) setAnswers({ ...answers, budget: inputValue });
    if (step === 5) setAnswers({ ...answers, brand: inputValue });
    setStep(step + 1);
    setInputValue("");
  };

  useEffect(() => {
    if (step === 6) {
      sendToApi();
    }
  }, [step, answers]);



  const sendToApi = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(answers),
      });

      const textResponse = await response.text();
      let data;
      try {
        data = JSON.parse(textResponse);
      } catch (error) {
        data = [];
        console.log(error);
        
      }

      const cleanedData = data.map((item) => {
        if (item.quantite === null || isNaN(item.quantite)) {
          item.quantite = 0;
        }
        return item;
      });

      if (response.ok && Array.isArray(cleanedData)) {
        setResponse(cleanedData);
      } else {
        setResponse([]);
      }
    } catch (error) {
      setResponse([]);
      console.log(error);
      
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 3:
        return (
          <div className="space-y-4">
            <p className="text-lg font-semibold mb-2 text-gray-700">🛍️ Quel type de produit cherchez-vous ?</p>          
            <Input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="ex : chaussures, PC..."/>
            <Button onClick={handleNext} isValid={true} text="Valider" />
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <p className="text-lg font-semibold mb-2 text-gray-700">💰 Quel est votre budget maximum ?</p>
            <Input type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="ex : 100"/>
            <Button onClick={handleNext} isValid={true} text="Valider" />
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <p className="text-lg font-semibold mb-2 text-gray-700">🏷️ Une marque en particulier ?</p>
            <Input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="ex : Adidas, HP..."/>
            <Button onClick={handleNext} isValid={true} text="Valider" />
          </div>
        );
      case 6:
        return loading ? (
          <p className="text-purpleLight text-center">⏳ Chargement...</p>
        ) : response && response.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4">
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-4 rounded-lg">
              {response.map((produit, index) => {
                return <Card key={index} wishlist={wishlist} produit={produit} ajouterAuPanier={ajouterAuPanier} ajouterAuListeSouhait={ajouterAuListeSouhait} />;
              })}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center">❌ Aucune recommandation trouvée.</p>
        );
      default:
        return null;
    }
  };

  return ( renderStep() );
};

export default Chatbot;
