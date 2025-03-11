import { useState, useEffect, useContext }  from "react";
import { Link, useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import Input from "@/components/ui/Input";
import ShowPassword from "@/components/ui/ShowPassword";
import FormContainer from "./Form";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";
import { resetPassword } from "@/service/AuthService";
import { SuccessMessageContext } from "@/utils/SuccessMessageContext"

const ResetPassword = () => {    
    const location = useLocation();
    const [token, setToken] = useState(null);
    const [formData, setFormData] = useState({token: "", password: "", password_confirmation: ""});

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        setToken(token);
    }, [location]);

    useEffect(() => {
        if (token) {
          setFormData((prevState) => ({
            ...prevState,
            token: token,
          }));
        }
      }, [token]);

    const [inputType, setInputType] = useState("password");
    const [inputType1, setInputType1] = useState("password");
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const [errors, setErrors] = useState({});
        const { setSuccessMessage } = useContext(SuccessMessageContext);

    const handleSubmit = async (e) => {
          e.preventDefault();
          if (!isValid) return;
      
          const data = await resetPassword(formData);
          
          if (data.errors) { 
            setErrors(data.errors); 
          } else if (data.message) {
            setSuccessMessage(data.message);
            navigate("/login");
        }
    };

    useEffect(() => {
        setIsValid(formData.password.trim() !== "" &&
        formData.password_confirmation.trim() !== "" &&
        formData.password === formData.password_confirmation);
    }, [formData]);

    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <h4 className="text-2xl font-semibold mb-2 dark:text-white">Réinitialiser votre mot de passe</h4>
                <div className="mb-4">
                    <Label label="Nouveau mot de passe"/>
                    <div className="relative">
                        <Input type={inputType} name="password" value={formData.password} onChange={handleChange} placeholder="*********" required />
                        <ShowPassword onToggle={setInputType} />
                    </div>
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>
                <div className="mb-4">
                    <Label label="Confirmer le nouveau mot de passe"/>
                    <div className="relative">
                        <Input type={inputType1} name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} placeholder="*********" required />
                        <ShowPassword onToggle={setInputType1} />
                    </div>
                </div>
                <Button isValid={isValid} text="Terminé" />
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 dark:text-grayDark">Vous avez déjà un mot de passe ?{"  "}  
                        <Link className="text-purpleLight hover:underline" to="/login">Se connecter</Link>
                    </p>
                </div>
            </form>
        </FormContainer>
    );
}

export default ResetPassword;