import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Input from "@/components/Forms/Input";
import ShowPassword from "@/components/Forms/ShowPassword";
import FormContainer from "./Form";
import Label from "@/components/Forms/Label";
import Dropdown from "@/components/Forms/Dropdown";
import { UserContext } from "@/utils/UserContext";

const Register = () => {
  const [inputType, setInputType] = useState("password");
  const [inputType1, setInputType1] = useState("password");
  const [step, setStep] = useState(1);
  const [text, setText] = useState("Next");
  const [isJobOpen, setIsJobOpen] = useState(false);
  const [isHousingTypeOpen, setIsHousingTypeOpen] = useState(false);
  const [isOccupancyStatusOpen, setIsOccupancyStatusOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const jobs = ["Employed", "Unemployed", "Retired", "Self-employed"];
  const housingTypes = ["Apartment", "Single-family house", "Hosted"];
  const occupancyStatuses = ["Owner", "Tenant", "Hosted free of charge"];
  const countries = ["United States", "Canada", "France", "Germany", "Japan"];
  const cities = ["New York", "Toronto", "Paris", "Berlin", "Tokyo"];
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({ nom: "", prenom: "", telephone: "", email: "", password: "",
    password_confirmation: "", date_naissance: "", genre: "", job: "", housing_type: "", occupancy_status: "", country: "", city: "", postal_code: "" });
  const [errors, setErrors] = useState({});
  const {setToken} = useContext(UserContext);
  const nextStep = () => { if (step < 4 && isValid) { setStep(step + 1); } };
  const prevStep = () => { if (step > 1) { setStep(step - 1); } };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'job') {
      setIsJobOpen(false);
    } else if (name === 'housing_type') {
      setIsHousingTypeOpen(false);
    } else if (name === 'occupancy_status') {
      setIsOccupancyStatusOpen(false);
    } else if (name === 'country') {
      setIsCountryOpen(false);
    } else if (name === 'city') {
      setIsCityOpen(false);
    }
  };

  useEffect(() => {
    let valid = false;
    if (step === 4) { setText("Create Account"); } else { setText("Next"); }
    switch (step) {
        case 1: valid = formData.nom.trim() !== "" && formData.prenom.trim() !== "" && formData.telephone.trim() !== ""; break;
        case 2: { const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          valid = emailRegex.test(formData.email.trim()) && formData.password.trim() !== "" && formData.password_confirmation.trim() !== "" && formData.password === formData.password_confirmation; break; }
        case 3: valid = formData.date_naissance.trim() !== "" && formData.genre.trim() !== "" && formData.job.trim() !== "" && formData.housing_type.trim() !== "" && formData.occupancy_status.trim() !== ""; break;
        case 4: valid = formData.country.trim() !== "" && formData.city.trim() !== "" && formData.postal_code.trim() !== ""; break;
        default: valid = false;
    }
    setIsValid(valid);
  }, [formData, step]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    const response = await fetch("api/register", {
      method: 'post',
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (data.errors) { setErrors(data.errors); }
    else {
      localStorage.setItem('token',data.token);
      setToken(data.token);
      console.log("Inscription réussie :", formData);
      navigate("/");
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
            <div className={`h-1 w-16 ${step >= 2 ? 'bg-purpleLight' : 'bg-gray-300 dark:bg-grayDark'}`}></div>
          </div>
          <div className="flex items-center">
            <div className={`w-10 h-10 flex items-center justify-center rounded-full ${
                step >= 2 ? 'bg-purpleLight text-white' : 'bg-gray-300 text-gray-700 dark:bg-grayDark dark:text-black'}`}> 2
            </div>
            <div className={`h-1 w-16 ${step >= 3 ? 'bg-purpleLight' : 'bg-gray-300 dark:bg-grayDark'}`}></div>
          </div>
          <div className="flex items-center">
            <div className={`w-10 h-10 flex items-center justify-center rounded-full ${
                step >= 3 ? 'bg-purpleLight text-white' : 'bg-gray-300 text-gray-700 dark:bg-grayDark dark:text-black'}`}> 3
            </div>
            <div className={`h-1 w-16 ${step >= 4 ? 'bg-purpleLight' : 'bg-gray-300 dark:bg-grayDark'}`}></div>
          </div>
          <div>
            <div className={`w-10 h-10 flex items-center justify-center rounded-full ${
                step === 4 ? 'bg-purpleLight text-white' : 'bg-gray-300 text-gray-700 dark:bg-grayDark dark:text-black'}`}> 4
            </div>
          </div>
        </div>
        <h4 className="text-2xl font-semibold mb-2 dark:text-white">Create your account</h4>
        <p className="text-sm text-gray-600 mb-6 dark:text-grayDark">Enter your personal details to create account</p>
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
                <Input type="text" value="+59" required readOnly width="w-1/4"/>
                <Input type="number"name="telephone" value={formData.telephone} onChange={handleChange} placeholder="000-000-0000" width="w-3/4"/>
              </div>
          </div>
        </> )}
        {step === 2 && ( <>
          <div className="mb-4">
            <Label label="Email Address"/>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Test@gmail.com" required />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <Label label="Password"/>
            <div className="relative">
                <Input type={inputType} name="password" value={formData.password} onChange={handleChange} placeholder="*********" required />
                <ShowPassword onToggle={setInputType} />
            </div>
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="mb-4">
              <Label label="Confirm Password"/>
              <div className="relative">
                  <Input type={inputType1} name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} placeholder="*********" required />
                  <ShowPassword onToggle={setInputType1} />
              </div>
          </div>
        </> )}
        {step === 3 && ( <>
          <div className="mb-4">
              <Label label="date_naissance"/>
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
                <input type="radio" value="Female" checked={formData.genre === "Female"} onChange={handleChange} name="genre" className="hidden" />
                <div className="w-4 h-4 border-2 border-gray-300 dark:border-purpleLight rounded-full flex items-center justify-center">
                  {formData.genre === "Female" && ( <div className="w-2 h-2 bg-gray-300 dark:bg-purpleLight rounded-full"></div> )}
                </div>
                <span className="ml-2 text-gray-700 dark:text-grayDark">Female</span>
              </label>
            </div>
          </div>
          <Dropdown label="Job" name="job" options={jobs} selectedValue={formData.job} onSelect={handleChange} isOpen={isJobOpen}
            toggleOpen={() => {
              setIsJobOpen(!isJobOpen);
              setIsHousingTypeOpen(false);
              setIsOccupancyStatusOpen(false);
            }} />
          <Dropdown label="Housing Type" name="housing_type" options={housingTypes} selectedValue={formData.housing_type} onSelect={handleChange} isOpen={isHousingTypeOpen}
            toggleOpen={() => {
              setIsHousingTypeOpen(!isHousingTypeOpen);
              setIsJobOpen(false);
              setIsOccupancyStatusOpen(false);
            }} />
          <Dropdown label="Occupancy Status" name="occupancy_status" options={occupancyStatuses} selectedValue={formData.occupancy_status} onSelect={handleChange} isOpen={isOccupancyStatusOpen}
            toggleOpen={() => {
              setIsOccupancyStatusOpen(!isOccupancyStatusOpen);
              setIsJobOpen(false);
              setIsHousingTypeOpen(false);
            }} />
        </> )}
        {step === 4 && ( <>
          <Dropdown label="Country" name="country" options={countries} selectedValue={formData.country} onSelect={handleChange} isOpen={isCountryOpen}
            toggleOpen={() => {
              setIsCountryOpen(!isCountryOpen);
              setIsCityOpen(false);
            }} />
          <Dropdown label="City" name="city" options={cities} selectedValue={formData.city} onSelect={handleChange} isOpen={isCityOpen}
            toggleOpen={() => {
              setIsCityOpen(!isCityOpen);
              setIsCountryOpen(false);
            }} />
          <div className="mb-4">
              <Label label="Postal Code"/>
              <Input type="text" name="postal_code" value={formData.postal_code} onChange={handleChange} placeholder="5000" required />
          </div>
        </> )}
        <div className="flex justify-between">
          <button type="button" onClick={prevStep} disabled={step === 1} 
            className={`bg-purpleLight text-white px-4 py-2 rounded ${step === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}> Previous </button>
          <button type={step === 4 ? "submit" : "button"} onClick={step === 4 ? handleSubmit : nextStep} disabled={!isValid}
            className={`bg-purpleLight text-white px-4 py-2 rounded ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}> {text} </button>
        </div>
        <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-grayDark">Already have an account?{" "}
                <Link className="text-purpleLight hover:underline" to="/login">Sign in</Link>
            </p>
        </div>
      </form>
    </FormContainer>
  );
};

export default Register;