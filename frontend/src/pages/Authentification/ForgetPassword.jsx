import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormContainer from "./Form";
import Input from "@/components/Forms/Input";

const ForgetPassword = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      console.log("Formulaire soumis avec succès !", formData);
      navigate("/reset-password");
    }
  };

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailRegex.test(formData.email.trim()));
  }, [formData]);   

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <h4 className="text-2xl font-semibold mb-2 dark:text-white"> Forget Your Password? </h4>
        <p className="text-sm text-gray-600 dark:text-grayDark mb-2"> Enter your email </p>
        <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Test@gmail.com" required />
        <div className="flex justify-end">
          <button className={`mt-4 bg-purpleLight text-white text-[14px] py-2 px-6 rounded-md
            ${!isValid ? "opacity-50 cursor-not-allowed" : ""}`} type="submit" disabled={!isValid}>
            Send
          </button>
        </div>
        <div className="mt-4 text-[14px]">
          <span className="dark:text-grayDark">
            If don&apos;t receive E-mail?{" "}<a className="text-purpleLight hover:underline"> Resend </a>
          </span>
        </div>
      </form>
    </FormContainer>
  );
};

export default ForgetPassword;
