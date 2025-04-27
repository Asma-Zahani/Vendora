import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Input from "@/components/ui/Input";
import ShowPassword from "@/components/ui/ShowPassword";
import FormContainer from "./Form";
import Label from "@/components/ui/Label";
import Dropdown from "@/components/ui/Dropdown";
import { regions, villes, emplois, housingTypes, occupancyStatuses } from '@/service/UserInfos';
import { handleRegister } from "@/service/AuthService";
import { SuccessMessageContext } from "@/utils/SuccessMessageContext"

const Register = () => {
  const [inputType, setInputType] = useState("password");
  const [inputType1, setInputType1] = useState("password");
  const [step, setStep] = useState(1);
  const [text, setText] = useState("Suivant");
  const [isEmploiOpen, setIsEmploiOpen] = useState(false);
  const [isHousingTypeOpen, setIsHousingTypeOpen] = useState(false);
  const [isOccupancyStatusOpen, setIsOccupancyStatusOpen] = useState(false);
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [isVilleOpen, setIsVilleOpen] = useState(false);
  
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({ nom: "", prenom: "", telephone: "", email: "", password: "",
    password_confirmation: "", date_naissance: "", genre: "", emploi: "", typeLogement: "", statusLogement: "", region: "", ville: "", adresse: "" });

  const nextStep = () => { if (step < 4 && isValid) { setStep(step + 1); } };
  const prevStep = () => { if (step > 1) { setStep(step - 1); } };

  const [errors, setErrors] = useState({});
  const { setSuccessMessage } = useContext(SuccessMessageContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'emploi') {
      setIsEmploiOpen(false);
    } else if (name === 'typeLogement') {
      setIsHousingTypeOpen(false);
    } else if (name === 'statusLogement') {
      setIsOccupancyStatusOpen(false);
    } else if (name === 'region') {
      setFormData((prev) => ({ ...prev, ville: "" }));
      setIsRegionOpen(false);
    } else if (name === 'ville') {
      setIsVilleOpen(false);
    }
  };

  useEffect(() => {
    let valid = false;
    if (step === 4) { setText("Créer un compte"); } else { setText("Suivant"); }
    switch (step) {
        case 1: valid = formData.nom.trim() !== "" && formData.prenom.trim() !== "" && formData.telephone.trim() !== ""; break;
        case 2: { const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          valid = emailRegex.test(formData.email.trim()) && formData.password.trim() !== "" && formData.password_confirmation.trim() !== "" && formData.password === formData.password_confirmation; break; }
        case 3: valid = formData.date_naissance.trim() !== "" && formData.genre.trim() !== "" && formData.emploi.trim() !== "" && formData.typeLogement.trim() !== "" && formData.statusLogement.trim() !== ""; break;
        case 4: valid = formData.region.trim() !== "" && formData.ville.trim() !== "" && formData.adresse.trim() !== ""; break;
        default: valid = false;
    }
    setIsValid(valid);
  }, [formData, step]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    const data = await handleRegister(formData);

    if (data.errors) { 
      setErrors(data.errors); 
    } else if (data.message) {
      setSuccessMessage(data.message);
      
      navigate("/login");
  }
  };

  return (
    <FormContainer>
      <form>
        <div className="flex justify-center mb-4">
          <div className="flex items-center">
            <div className={`w-10 h-10 flex items-center justify-center rounded-full ${
                step >= 1 ? 'bg-purpleLight text-white' : 'bg-gray-300 text-gray-700 dark:bg-grayDark dark:text-black'}`}> 1
            </div>
            <div className={`h-1 w-10 sm:w-16 ${step >= 2 ? 'bg-purpleLight' : 'bg-gray-300 dark:bg-grayDark'}`}></div>
          </div>
          <div className="flex items-center">
            <div className={`w-10 h-10 flex items-center justify-center rounded-full ${
                step >= 2 ? 'bg-purpleLight text-white' : 'bg-gray-300 text-gray-700 dark:bg-grayDark dark:text-black'}`}> 2
            </div>
            <div className={`h-1 w-10 sm:w-16 ${step >= 3 ? 'bg-purpleLight' : 'bg-gray-300 dark:bg-grayDark'}`}></div>
          </div>
          <div className="flex items-center">
            <div className={`w-10 h-10 flex items-center justify-center rounded-full ${
                step >= 3 ? 'bg-purpleLight text-white' : 'bg-gray-300 text-gray-700 dark:bg-grayDark dark:text-black'}`}> 3
            </div>
            <div className={`h-1 w-10 sm:w-16 ${step >= 4 ? 'bg-purpleLight' : 'bg-gray-300 dark:bg-grayDark'}`}></div>
          </div>
          <div>
            <div className={`w-10 h-10 flex items-center justify-center rounded-full ${
                step === 4 ? 'bg-purpleLight text-white' : 'bg-gray-300 text-gray-700 dark:bg-grayDark dark:text-black'}`}> 4
            </div>
          </div>
        </div>
        <h4 className="text-2xl font-semibold mb-2 dark:text-white">Créez votre compte</h4>
        <p className="text-sm text-gray-600 mb-6 dark:text-grayDark">Entrez vos informations personnelles pour créer un compte</p>
        {step === 1 && ( <>
          <div className="mb-4">
              <Label label="Nom"/>
              <Input type="text" name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom" required />
              {errors.nom && <p className="error">{errors.nom}</p>}
          </div>
          <div className="mb-4">
              <Label label="Prenom"/>
              <Input type="text" name="prenom" value={formData.prenom} onChange={handleChange} placeholder="Prénom" required />
              {errors.prenom && <p className="error">{errors.prenom}</p>}
          </div>
          <div className="mb-4">
              <Label label="Telephone"/>
              <div className="flex gap-2">
                <Input type="text" value="+216" required readOnly width="w-1/4"/>
                <Input type="number"name="telephone" value={formData.telephone} onChange={handleChange} placeholder="12 345 678" width="w-3/4"/>
              </div>
          </div>
        </> )}
        {step === 2 && ( <>
          <div className="mb-4">
            <Label label="Adresse Email"/>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Test@gmail.com" required />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <Label label="Mot de passe"/>
            <div className="relative">
                <Input type={inputType} name="password" value={formData.password} onChange={handleChange} placeholder="*********" required />
                <ShowPassword onToggle={setInputType} />
            </div>
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="mb-4">
              <Label label="Confirmer le mot de passe"/>
              <div className="relative">
                  <Input type={inputType1} name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} placeholder="*********" required />
                  <ShowPassword onToggle={setInputType1} />
              </div>
          </div>
        </> )}
        {step === 3 && ( <>
          <div className="mb-4">
              <Label label="Date de naissance"/>
              <Input type="date" name="date_naissance" value={formData.date_naissance} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <Label label="Genre" />
            <div className="flex justify-center space-x-6">
              <label className="flex items-center cursor-pointer">
                <input type="radio" value="Male" checked={formData.genre === "Male"} onChange={handleChange} name="genre" className="hidden" />
                <div className="w-4 h-4 border-2 border-gray-300 dark:border-purpleLight rounded-full flex items-center justify-center">
                  {formData.genre === "Male" && ( <div className="w-2 h-2 bg-gray-300 dark:bg-purpleLight rounded-full"></div> )}
                </div>
                <span className="ml-2 text-gray-700 dark:text-grayDark">Male</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input type="radio" value="Femelle" checked={formData.genre === "Femelle"} onChange={handleChange} name="genre" className="hidden" />
                <div className="w-4 h-4 border-2 border-gray-300 dark:border-purpleLight rounded-full flex items-center justify-center">
                  {formData.genre === "Femelle" && ( <div className="w-2 h-2 bg-gray-300 dark:bg-purpleLight rounded-full"></div> )}
                </div>
                <span className="ml-2 text-gray-700 dark:text-grayDark">Femelle</span>
              </label>
            </div>
          </div>
          <Dropdown label="Emploi" name="emploi" options={emplois.map(emploi => ({ value: emploi, label: emploi }))} selectedValue={formData.emploi} onSelect={handleChange} isOpen={isEmploiOpen} target={true}
            toggleOpen={() => {
              setIsEmploiOpen(!isEmploiOpen);
              setIsHousingTypeOpen(false);
              setIsOccupancyStatusOpen(false);
            }} />
          <Dropdown label="Type de logement" name="typeLogement" options={housingTypes.map(housingType => ({ value: housingType, label: housingType }))} selectedValue={formData.typeLogement} onSelect={handleChange} isOpen={isHousingTypeOpen} target={true}
            toggleOpen={() => {
              setIsHousingTypeOpen(!isHousingTypeOpen);
              setIsEmploiOpen(false);
              setIsOccupancyStatusOpen(false);
            }} />
          <Dropdown label="Statut d'occupation" name="statusLogement" options={occupancyStatuses.map(occupancyStatus => ({ value: occupancyStatus, label: occupancyStatus }))} selectedValue={formData.statusLogement} onSelect={handleChange} isOpen={isOccupancyStatusOpen} target={true}
            toggleOpen={() => {
              setIsOccupancyStatusOpen(!isOccupancyStatusOpen);
              setIsEmploiOpen(false);
              setIsHousingTypeOpen(false);
            }} />
        </> )}
        {step === 4 && ( <>
          <Dropdown label="Région" name="region" options={regions.map(region => ({ value: region, label: region }))} selectedValue={formData.region} onSelect={handleChange} isOpen={isRegionOpen} target={true}
            toggleOpen={() => {
              setIsRegionOpen(!isRegionOpen);
              setIsVilleOpen(false);
            }} />
          <Dropdown label="Ville" name="ville" options={villes[formData.region]?.map(ville => ({ value: ville, label: ville })) || []} selectedValue={formData.ville} onSelect={handleChange} isOpen={isVilleOpen} target={true}
            toggleOpen={() => {
              setIsVilleOpen(!isVilleOpen);
              setIsRegionOpen(false);
            }} />
          <div className="mb-4">
              <Label label="Adresse"/>
              <Input type="text" name="adresse" value={formData.adresse} onChange={handleChange} placeholder="Adresse" required />            
          </div>
        </> )}
        <div className="flex justify-between">
          <button type="button" onClick={prevStep} disabled={step === 1} 
            className={`bg-purpleLight text-white px-4 py-2 rounded ${step === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}> Précédent </button>
          <button type={step === 4 ? "submit" : "button"} onClick={step === 4 ? handleSubmit : nextStep} disabled={!isValid}
            className={`bg-purpleLight text-white px-4 py-2 rounded ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}> {text} </button>
        </div>
        <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-grayDark">Vous avez déjà un compte ?{" "}
                <Link className="text-purpleLight hover:underline" to="/login">Connectez-vous</Link>
            </p>
        </div>
      </form>
    </FormContainer>
  );
};

export default Register;