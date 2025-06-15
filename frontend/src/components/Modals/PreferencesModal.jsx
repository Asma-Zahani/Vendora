import { useState, useContext, useEffect } from "react";
import UserContext from '@/utils/UserContext';
import { SuccessMessageContext } from "@/utils/SuccessMessageContext";
import ProfileMale from "@/assets/default/user_male.png";
import ProfileFemelle from "@/assets/default/user_femelle.png";
import { ArrowLeft } from "lucide-react";
import { getEntities, createEntity } from "@/service/EntitesService";
import Card from "../ui/Card";

const PreferencesModal = () => {
  const { user, setUser } = useContext(UserContext);
  const { setSuccessMessage } = useContext(SuccessMessageContext);
  const [step, setStep] = useState(1);
  const nextStep = () => {setStep((prevStep) => prevStep + 1)};
  const prevStep = () => {setStep((prevStep) => Math.max(prevStep - 1, 1))};

  const [categories, setCategories] = useState([]);
  const [marques, setMarques] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setCategories(await getEntities("categories"));
      setMarques(await getEntities("marques"));
    };
    fetchData();
  }, []);
  
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedMarques, setSelectedMarques] = useState([]);

  const toggleCategorieSelection = (index) => {
    if (selectedCategories.includes(index)) {
      setSelectedCategories(selectedCategories.filter((i) => i !== index));
    } else {
      setSelectedCategories([...selectedCategories, index]);
    }
  };

  const toggleMarqueSelection = (index) => {
    if (selectedMarques.includes(index)) {
      setSelectedMarques(selectedMarques.filter((i) => i !== index));
    } else {
      setSelectedMarques([...selectedMarques, index]);
    }
  };

  const onSubmit = async () => {
    const data = await createEntity("userPreferences",{
      preferred_categorie_ids: selectedCategories,
      preferred_marque_ids: selectedMarques
    });
    if (data.message) {
      setSuccessMessage(data.message);
      setUser(prev => ({
        ...prev,
        preferences: data.data
      }));      
    }
  }
  
  return (
    <div>
      <div className="fixed z-105 inset-0 flex items-center justify-center">
        <div className="fixed inset-0 bg-contentLight/75 dark:bg-customDark/75 transition-opacity" aria-hidden="true"></div>
          {step === 1 && (
            <div className="relative w-full max-w-lg p-6" data-aos="fade-down" data-aos-duration="500" data-aos-once="true">
              <div className="bg-customLight dark:bg-customDark rounded-md shadow-md p-6 text-center">
                <div className="flex justify-center">
                  <div className="w-30 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div className="bg-purpleLight h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
            
                <button type="button" className="transition-all duration-200 ease-linear rounded-full mt-12">
                  <div className="bg-bgDark rounded-full w-25 h-25">
                      {user?.genre === "Male" ? <img src={ProfileMale} alt="" className="w-full h-full rounded-full" /> : <img src={ProfileFemelle} alt="" className="w-full h-full rounded-full" />}
                  </div>
                </button>
                
                <p className="text-xs mt-3">{user?.email}</p>

                <h2 className="text-2xl font-semibold mt-2">Bienvenue sur Vendora</h2>
                <p className="text-2xl font-semibold my-2">{user?.prenom + ' ' + user?.nom} !</p>

                <div className="flex justify-center">
                  <p className=" text-sm text-gray-600 my-6 max-w-xs">
                    Vos réponses aux questions suivantes nous aideront à trouver des idées qui vous correspondent.
                  </p>
                </div>

                <button onClick={nextStep} className="w-full bg-purpleLight hover:bg-purpleLightHover text-white font-medium py-2 rounded-full">
                  Suivant
                </button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="relative w-full max-w-4xl p-6" data-aos="fade-down" data-aos-duration="500" data-aos-once="true">
              <div className="bg-customLight dark:bg-customDark rounded-md shadow-md p-6 text-center">
                <div className="flex justify-center">
                  <div className="w-30 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div className="bg-purpleLight h-2 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                </div>
                <div className="relative">
                  <button onClick={prevStep} type="button" className="absolute left-3 hover:bg-bgLight hover:dark:bg-bgDark hover:text-purpleLight dark:hover:text-purpleLight rounded-full w-9 h-9 inline-flex justify-center items-center">
                    <ArrowLeft size={20} />
                  </button>
                </div>

                <h2 className="text-2xl font-semibold mt-8">Quelles catégories préférez-vous ?</h2>
                <p className="text-sm my-2">Sélectionnez vos catégories préférées pour recevoir des recommandations de produits qui vous correspondent.</p>

                <div className="space-y-4 max-h-[50vh] overflow-y-auto scrollbar">
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 my-4 gap-3 mx-4">
                    {categories.map((categorie, index) => (
                      <Card key={index} data={categorie} nom={categorie.titre} path="/categories/" isSelected={selectedCategories.includes(index)} onClick={() => toggleCategorieSelection(index)} />
                    ))}
                  </div>
                </div>
                <div className="flex items-center pt-4">
                  <button onClick={nextStep} disabled={selectedCategories.length < 2} className={`w-full font-medium py-2 rounded-full transition 
                      ${selectedCategories.length >= 2 ? "bg-purpleLight hover:bg-purpleLightHover text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>
                    {selectedCategories.length >= 2 ? "Continuer" : `Choisissez-en ${2 - selectedCategories.length} de plus`}
                  </button>
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="relative w-full max-w-4xl p-6" data-aos="fade-down" data-aos-duration="500" data-aos-once="true">
              <div className="bg-customLight dark:bg-customDark rounded-md shadow-md p-6 text-center">
                <div className="flex justify-center">
                  <div className="w-30 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div className="bg-purpleLight h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div className="relative">
                  <button onClick={prevStep} type="button" className="absolute left-3 hover:bg-bgLight hover:dark:bg-bgDark hover:text-purpleLight dark:hover:text-purpleLight rounded-full w-9 h-9 inline-flex justify-center items-center">
                    <ArrowLeft size={20} />
                  </button>
                </div>

                <h2 className="text-2xl font-semibold mt-8">Quelles marques préférez-vous ?</h2>
                <p className="text-sm my-2">Ces informations serviront à personnaliser votre nouvelle page d&apos;accueil</p>

                <div className="space-y-4 max-h-[50vh] overflow-y-auto scrollbar">
                  <div className="grid grid-cols-5 my-4 gap-3 mx-4">
                    {marques.map((marque, index) => (
                      <Card key={index} data={marque} nom={marque.nom} path="/marques/" isSelected={selectedMarques.includes(index)} onClick={() => toggleMarqueSelection(index)} />
                    ))}
                  </div>
                </div>
                <div className="flex items-center pt-4">
                  <button onClick={onSubmit} disabled={selectedMarques.length < 2} className={`w-full font-medium py-2 rounded-full transition 
                      ${selectedMarques.length >= 2 ? "bg-purpleLight hover:bg-purpleLightHover text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>
                    {selectedMarques.length >= 2 ? "Découvrez votre page d'accueil" : `Choisissez-en ${2 - selectedMarques.length} de plus`}
                  </button>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default PreferencesModal;