import { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import Input from "@/components/Forms/Input";
import ShowPassword from "@/components/Forms/ShowPassword";
import FormContainer from "./Form";
import Label from "@/components/Forms/Label";
import Button from "@/components/Forms/Button";
import { UserContext } from "@/utils/UserContext";

const Login = () => {
    const [inputType, setInputType] = useState("password");
    const [formData, setFormData] = useState({email: "", password: ""});
    const [isValid, setIsValid] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [errors, setErrors] = useState({});
    const {setToken} = useContext(UserContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValid) return;

        const response = await fetch("api/login", {
            method: 'post',
            body: JSON.stringify(formData)
        });
        const data = await response.json();

        if (data.errors) { setErrors(data.errors); }
        else {
            localStorage.setItem('token',data.token);
            setToken(data.token);
        }
    };

    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValid(emailRegex.test(formData.email.trim()) && formData.password.trim() !== "");
    }, [formData]);

    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <h4 className="text-2xl font-semibold mb-2 dark:text-white">Connectez-vous à votre compte</h4>
                <p className="text-sm text-gray-600 dark:text-grayDark mb-6">Entrez votre email et votre mot de passe pour vous connecter</p>
                <div className="mb-4">
                    <Label label="Email Address"/>
                    <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Test@gmail.com" required />
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>
                <div className="mb-4">
                    <Label label="Mot de passe"/>
                    <div className="relative">
                        <Input type={inputType} name="password" value={formData.password} onChange={handleChange} placeholder="*********" required />
                        <ShowPassword onToggle={setInputType} />
                    </div>
                    {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>
                <div className="flex justify-between mb-6">
                    <label className="flex items-center cursor-pointer text-sm text-gray-700 dark:text-white">
                        <input type="checkbox" checked={isChecked} onChange={() => {setIsChecked(!isChecked)}} className="hidden"/>
                        <span className={`appearance-none w-4 h-4 mr-2 rounded-sm ${isChecked ? 'bg-purpleLight' : 'bg-contentLight dark:bg-contentDark'} flex items-center justify-center`}>
                            {isChecked && <span className="text-white text-sm">✔</span>}
                        </span>
                        Se souvenir du mot de passe
                    </label>
                    <Link className="text-sm text-purpleLight hover:underline" to="/forget-password">Mot de passe oublié ?</Link>
                </div>
                <Button isValid={isValid} text="Se connecter" />
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 dark:text-grayDark">Vous n&apos;avez pas de compte ? {" "} 
                        <Link className="text-purpleLight hover:underline" to="/register">Créer un compte</Link>
                    </p>
                </div>
            </form>
        </FormContainer>
    );
}

export default Login;