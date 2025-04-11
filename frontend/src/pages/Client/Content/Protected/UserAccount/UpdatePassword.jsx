import { useContext, useState } from "react";
import UserContext from "@/utils/UserContext";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import ShowPassword from "@/components/ui/ShowPassword";
import { updatePassword } from "@/service/AuthService";
import { SuccessMessageContext } from "@/utils/SuccessMessageContext"

const UpdatePassword = () => {
    const { user } = useContext(UserContext);

    const [inputType, setInputType] = useState("password");
    const [inputType1, setInputType1] = useState("password");
    const [inputType2, setInputType2] = useState("password");
    const [formData, setFormData] = useState({ current_password: "", new_password: "", new_password_confirmation: "" });
    const [errors, setErrors] = useState({});
    const { setSuccessMessage } = useContext(SuccessMessageContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); setSuccessMessage("");

        const data = await updatePassword(user.id,formData);
        
        if (data.errors) {
            setErrors(data.errors);
        } else if (data.message) {
            setSuccessMessage(data.message);
            setFormData({ current_password: "", new_password: "", new_password_confirmation: "" });
        }
    };

    return (
        <div className="col-span-2 w-full py-2">
            <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm">
                <h1 className="text-lg font-semibold mb-4">Modifier mot de passe</h1>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg">
                        <div className="col-span-2">
                            <Label label="Mot de passe Actuel"/>
                            <div className="relative">
                                <Input type={inputType} name="current_password" value={formData.current_password} onChange={handleChange} placeholder="*********" required />
                                <ShowPassword onToggle={setInputType} />
                            </div>
                            {errors.current_password && <p className="text-sm text-red-500">{errors.current_password}</p>}
                        </div>
                        <div className="mb-4">
                            <Label label="Nouveau mot de passe"/>
                            <div className="relative">
                                <Input type={inputType1} name="new_password" value={formData.new_password} onChange={handleChange} placeholder="*********" required />
                                <ShowPassword onToggle={setInputType1} />
                            </div>
                            {errors.new_password && (
                                <div className="text-sm text-red-500">
                                    {errors.new_password.map((error, index) => (
                                    <p key={index}>{error}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="mb-4">
                            <Label label="Confirmer le mot de passe"/>
                            <div className="relative">
                                <Input type={inputType2} name="new_password_confirmation" value={formData.new_password_confirmation} onChange={handleChange} placeholder="*********" required />
                                <ShowPassword onToggle={setInputType2} />
                            </div>
                            {errors.new_password_confirmation && <p className="text-sm text-red-500">{errors.new_password_confirmation}</p>}
                        </div>
                    </div>
                    <div className="border-t pt-5 border-contentLight dark:border-borderDark -mx-6 flex">
                        <button className="ml-auto mr-5 px-4 py-2 text-sm text-white bg-purpleLight rounded-md">Modifier mot de passe</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword;
