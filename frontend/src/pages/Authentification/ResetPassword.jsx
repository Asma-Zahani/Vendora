import { useState, useEffect }  from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";
import Input from "@/components/Forms/Input";
import ShowPassword from "@/components/Forms/ShowPassword";
import FormContainer from "./Form";
import Label from "@/components/Forms/Label";
import Button from "@/components/Forms/Button";

const ResetPassword = () => {
    const [inputType, setInputType] = useState("password");
    const [inputType1, setInputType1] = useState("password");
    const [formData, setFormData] = useState({password: "", confirmPassword: ""});
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
            navigate("/home");
        }
    };

    useEffect(() => {
        setIsValid(formData.password.trim() !== "" &&
        formData.confirmPassword.trim() !== "" &&
        formData.password === formData.confirmPassword);
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
                </div>
                <div className="mb-4">
                    <Label label="Confirmer le nouveau mot de passe"/>
                    <div className="relative">
                        <Input type={inputType1} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="*********" required />
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