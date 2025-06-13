import { useContext, useState } from "react";
import UserContext from '@/utils/UserContext';
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import Dropdown from "@/components/ui/Dropdown";
import { regions, villes } from '@/service/UserInfos';
import { updateEntity } from "@/service/EntitesService";
import { SuccessMessageContext } from "@/utils/SuccessMessageContext"

const UpdateProfile = () => {
    const { user } = useContext(UserContext);

    const [isRegionOpen, setIsRegionOpen] = useState(false);
    const [isVilleOpen, setIsVilleOpen] = useState(false);

    const [formData, setFormData] = useState({ nom: user.nom, prenom: user.prenom, telephone: user.telephone, email: user.email, region: user.region, ville: user.ville, adresse: user.adresse});
        
    const [errors, setErrors] = useState({}); 
    const { setSuccessMessage } = useContext(SuccessMessageContext);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === 'region') {
          setFormData((prev) => ({ ...prev, ville: "" }));
          setIsRegionOpen(false);
        } else if (name === 'ville') {
          setIsVilleOpen(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const data = await updateEntity("users",user.id,formData);
        
        if (data.errors) {
            setErrors(data.errors);
        } else if (data.message) {            
            setSuccessMessage(data.message);
            setFormData(data.data);
        }
    };

    return (
        <div className="col-span-2 w-full py-2">
            <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm">
                <h1 className="text-lg font-semibold mb-4">Modifier Profile</h1>
                
                <form  onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg">
                        <div className="col-span-2 sm:col-span-1">
                            <Label label="Nom"/>
                            <Input type="text" name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom" error={errors.nom} required />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <Label label="Prénom"/>
                            <Input type="text" name="prenom" value={formData.prenom} onChange={handleChange} placeholder="Prénom" error={errors.prenom} required />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <Label label="Téléphone"/>
                            <Input type="text" name="telephone" value={formData.telephone} onChange={handleChange} placeholder="Téléphone" error={errors.telephone} required />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <Label label="Email"/>
                            <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" error={errors.email} required />
                        </div>
                        <div className="col-span-2">
                            <Label label="Adresse"/>
                            <Input type="text" name="adresse" value={formData.adresse} onChange={handleChange} placeholder="Adresse" error={errors.adresse} required />
                        </div>
                        <div className="col-span-2 grid grid-cols-2 gap-6">
                            <div className="col-span-2 sm:col-span-1 -mb-4 sm:mb-0">
                                <Dropdown label="Région" name="region" options={regions.map(region => ({ value: region, label: region }))} selectedValue={formData.region} onSelect={handleChange} isOpen={isRegionOpen} target={true}
                                toggleOpen={() => {
                                    setIsRegionOpen(!isRegionOpen);
                                    setIsVilleOpen(false);
                                }} />
                            </div>
                            <div className="col-span-2 sm:col-span-1 -mb-4 sm:mb-0">
                                <Dropdown label="Ville" name="ville" options={villes[formData.region]?.map(ville => ({ value: ville, label: ville })) || []} selectedValue={formData.ville} onSelect={handleChange} isOpen={isVilleOpen} target={true}
                                toggleOpen={() => {
                                    setIsVilleOpen(!isVilleOpen);
                                    setIsRegionOpen(false);
                                }} />
                            </div>
                        </div>
                    </div>
                    <div className="border-t pt-5 border-contentLight dark:border-borderDark -mx-6 flex">
                        <button className="ml-auto mr-5 px-4 py-2 text-sm text-white bg-purpleLight rounded-md">Modifier profile</button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default UpdateProfile;