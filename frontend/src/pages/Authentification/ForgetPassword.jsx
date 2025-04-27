import { useState, useEffect, useContext } from "react";
import FormContainer from "./Form";
import Input from "@/components/ui/Input";
import { forgotPassword } from "@/service/AuthService";
import { SuccessMessageContext } from "@/utils/SuccessMessageContext";
import { resendForgotPasswordEmail } from "@/service/AuthService";

const ForgetPassword = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [isValid, setIsValid] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const [errors, setErrors] = useState({});
  const { setSuccessMessage } = useContext(SuccessMessageContext);

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (!isValid) return;
  
      const data = await forgotPassword(formData);
  
      if (data.errors) { 
        setErrors(data.errors); 
      } else if (data.message) {
        setSuccessMessage(data.message);
    }
  };

  const renvoyerEmail = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    const data = await resendForgotPasswordEmail(formData);
    
    if (data.errors) { 
      setErrors(data.errors); 
    } else if (data.message) {
      setSuccessMessage(data.message);
    }
  };

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailRegex.test(formData.email.trim()));
  }, [formData]);   

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <h4 className="text-xl sm:text-2xl font-semibold mb-2 dark:text-white">Vous avez oublié votre mot de passe ?</h4>
        <p className="text-sm text-gray-600 dark:text-grayDark mb-2">Entrez votre email</p>
        <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Test@gmail.com" required />
        {errors.email && <p className="error">{errors.email}</p>}
        <div className="flex justify-end">
            <button className={`mt-4 bg-purpleLight text-white text-[14px] py-2 px-6 rounded-md
                ${!isValid ? "opacity-50 cursor-not-allowed" : ""}`} type="submit" disabled={!isValid}>
                Envoyer
            </button>
        </div>
        <div className="mt-4 text-[14px]">
            <p className="dark:text-grayDark">
                Vous n&apos;avez pas reçu l&apos;email ?{" "}<span onClick={renvoyerEmail} className="text-purpleLight hover:underline cursor-pointer">Renvoyer</span>
            </p>
        </div>
    </form>
    </FormContainer>
  );
};

export default ForgetPassword;
