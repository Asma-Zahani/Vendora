import { useState, useEffect } from "react";
import QuickView from "@/components/Modals/QuickView";

const Chatbot = ({ wishlist, ajouterAuPanier, ajouterAuListeSouhait, effacerDeListeSouhait }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    category: "",
    budget: "",
    brand: "",
  });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleNext = () => {
    if (step === 0) setAnswers({ ...answers, category: inputValue });
    if (step === 1) setAnswers({ ...answers, budget: inputValue });
    if (step === 2) setAnswers({ ...answers, brand: inputValue });
    setStep(step + 1);
    setInputValue("");
  };

  useEffect(() => {
    if (step === 3) {
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
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (produit) => {
    setSelectedProduct(produit);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <p className="text-lg font-semibold mb-2 text-gray-700">🛍️ Quel type de produit cherchez-vous ?</p>
            <input
              className="input border rounded-lg p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="ex : chaussures, PC..."
            />
            <button
              className="bg-purpleLight text-white px-5 py-2 rounded-lg w-full hover:bg-purpleLight transition duration-300 ease-in-out"
              onClick={handleNext}
            >
              Valider
            </button>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <p className="text-lg font-semibold mb-2 text-gray-700">💰 Quel est votre budget maximum ?</p>
            <input
              className="input border rounded-lg p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="ex : 100"
            />
            <button
              className="bg-purpleLight text-white px-5 py-2 rounded-lg w-full hover:bg-purpleLight transition duration-300 ease-in-out"
              onClick={handleNext}
            >
              Valider
            </button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <p className="text-lg font-semibold mb-2 text-gray-700">🏷️ Une marque en particulier ?</p>
            <input
              className="input border rounded-lg p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="ex : Adidas, HP..."
            />
            <button
              className="bg-purpleLight text-white px-5 py-2 rounded-lg w-full hover:bg-purpleLight transition duration-300 ease-in-out"
              onClick={handleNext}
            >
              Valider
            </button>
          </div>
        );
      case 3:
        return loading ? (
          <p className="text-purpleLight text-center">⏳ Chargement...</p>
        ) : response && response.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4">
            {response.map((produit) => (
              <div key={produit.produit_id} className="border rounded-lg shadow-md p-4 hover:shadow-xl transition duration-300 ease-in-out">
                <div className="flex flex-col items-center">
                  <img src={`/produits/${produit.image}`} alt={produit.nom} className="w-32 h-32 object-cover mb-4" />
                  <h4 className="font-semibold text-lg text-center mb-2">{produit.nom}</h4>
                  <p className="text-sm text-gray-600 mb-4">{produit.prix_apres_promo} TND</p>
                  <button
                    className="bg-purpleLight text-white px-5 py-2 rounded-lg w-full transition duration-300 ease-in-out"
                    onClick={() => handleOpenModal(produit)} // Ouvre le modal QuickView
                  >
                    Voir plus
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">❌ Aucune recommandation trouvée.</p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">🤖 Assistant Recommandation</h2>
      {renderStep()}
      {isModalOpen && (
        <QuickView
          produit={selectedProduct}
          onClose={handleCloseModal}
          ajouterAuPanier={ajouterAuPanier}
          wishlist={wishlist}
          ajouterAuListeSouhait={ajouterAuListeSouhait}
          effacerDeListeSouhait={effacerDeListeSouhait}
        />
      )}
    </div>
  );
};

export default Chatbot;
