import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router";
import Input from "@/components/ui/Input";
import FormContainer from "./Form";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";
import { UserContext } from "@/utils/UserContext";
import { SuccessMessageContext } from "@/utils/SuccessMessageContext";
import { createEntity } from "@/service/EntitesService";

const Login = () => {
    const location = useLocation();
    const [inputType, setInputType] = useState("password");
    const [formData, setFormData] = useState({email: "", password: "", isChecked: false});
    const [isValid, setIsValid] = useState(false);

    const [errors, setErrors] = useState({});
    const { setSuccessMessage } = useContext(SuccessMessageContext);
    
    const [verifToken, setVerifToken] = useState(null);
    const [rememberToken] = useState(localStorage.getItem('rememberToken'));
    const {setToken} = useContext(UserContext);
    
    const handleAutoLogin = async () => {
        const data = await createEntity("autoLogin", { remember_token: rememberToken });
        if (data.errors) {
            setErrors(data.errors);
        } else {
            localStorage.setItem('token', data.token);
            if (data.rememberToken) {localStorage.setItem('rememberToken', data.rememberToken)}
            setToken(data.token);
        }
    };


    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setVerifToken(params.get('token'));
    }, [location, setVerifToken]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await createEntity("auth/verify-email", {token: verifToken});
            if (data.message) {
                setSuccessMessage(data.message);    
                setVerifToken(null);
                const url = new URL(window.location.href);
                url.searchParams.delete('token');
                window.history.replaceState({}, '', url); 
            }
        };
        if (verifToken) {
            fetchData();
        }
    }, [setSuccessMessage, verifToken]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!isValid) return;

        const data = await createEntity("login",formData);
        
        if (data.errors) { 
            setErrors(data.errors); 
        } else {
            localStorage.setItem('token',data.token);
            if (data.rememberToken) {localStorage.setItem('rememberToken', data.rememberToken)}
            setToken(data.token);
        }
    }

    const renvoyerEmail = async (e) => {
        e.preventDefault();
        if (!isValid) return;
    
        const data = await createEntity("email/resend", formData);
        
        if (data.errors) { 
          setErrors(data.errors); 
        } else if (data.message) {
          setSuccessMessage(data.message);
      }
    };

    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValid(emailRegex.test(formData.email.trim()) && formData.password.trim() !== "");
    }, [formData]);

    return (
        <FormContainer>
            <form onSubmit={handleLogin}>
                <h4 className="text-xl sm:text-2xl font-semibold mb-2 dark:text-white">Connectez-vous à votre compte</h4>
                <p className="text-sm text-gray-600 dark:text-grayDark mb-6">Entrez votre email et votre mot de passe pour vous connecter</p>
                <div className="mb-4">
                    <Label label="Email Address"/>
                    <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Test@gmail.com" error={errors.email} required />
                    {errors.token && <p className="text-sm text-red-500 mt-1">{errors.token}</p>}
                    {Array.isArray(errors.email) && errors.email.includes("Votre adresse email n'a pas été vérifiée.") && <p className="text-sm">Vous n&apos;avez pas reçu l&apos;email ? <span onClick={renvoyerEmail} className="text-purpleLight hover:underline cursor-pointer">Renvoyer</span></p>}
                </div>
                <div className="mb-4">
                    <Label label="Mot de passe"/>
                    <Input type={inputType} name="password" value={formData.password} onChange={handleChange} placeholder="*********" error={errors.password} onToggle={setInputType} required />
                </div>
                <div className="sm:flex sm:justify-between mb-6">
                    <label className="flex items-center cursor-pointer text-sm text-gray-700 dark:text-white">
                        <input type="checkbox" checked={formData.isChecked} onChange={() => {setFormData({ ...formData, isChecked: !formData.isChecked })}} className="hidden"/>
                        <span className={`appearance-none w-4 h-4 mr-2 rounded-sm ${formData.isChecked ? 'bg-purpleLight' : 'bg-contentLight dark:bg-contentDark'} flex items-center justify-center`}>
                            {formData.isChecked && <span className="text-white text-sm">✔</span>}
                        </span>
                        Se souvenir du mot de passe
                    </label>
                    <Link className="text-sm text-purpleLight hover:underline" to="/forget-password">Mot de passe oublié ?</Link>
                </div>
                <Button isValid={isValid} text="Se connecter" />
            </form>
            {rememberToken && 
                <div className="mt-6">
                    <p className="text-md mb-4 flex items-center justify-center">
                        <span className="text-gray-700 dark:text-white">Ou reprendre votre session</span>
                        <span className="border-t border-gray-300 dark:border-borderDark flex-grow ml-2"></span>
                    </p>
                    <button onClick={handleAutoLogin} className="w-full border border-purpleLight text-purpleLight py-2 rounded-md text-sm" type="submit">
                        Se reconnecter automatiquement
                    </button>
                </div>
            }
            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-grayDark">Vous n&apos;avez pas de compte ? {" "} 
                    <Link className="text-purpleLight hover:underline" to="/register">Créer un compte</Link>
                </p>
            </div>
        </FormContainer>
    );
}

export default Login;