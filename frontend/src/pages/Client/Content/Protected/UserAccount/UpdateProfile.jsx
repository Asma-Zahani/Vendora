import { useContext, useState } from "react";
import UserContext from '@/utils/UserContext';
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import Dropdown from "@/components/ui/Dropdown";
import { regions, villes, emplois, housingTypes, occupancyStatuses } from '@/service/UserInfos';
import { updateProfile } from "@/service/AuthService";
import { SuccessMessageContext } from "@/utils/SuccessMessageContext"

const UpdateProfile = () => {
    const { user } = useContext(UserContext);

    const [isEmploiOpen, setIsEmploiOpen] = useState(false);
    const [isHousingTypeOpen, setIsHousingTypeOpen] = useState(false);
    const [isOccupancyStatusOpen, setIsOccupancyStatusOpen] = useState(false);
    const [isRegionOpen, setIsRegionOpen] = useState(false);
    const [isVilleOpen, setIsVilleOpen] = useState(false);

    const [formData, setFormData] = useState({ nom: user.nom, prenom: user.prenom, telephone: user.telephone, email: user.email, region: user.region, ville: user.ville, adresse: user.adresse, emploi: user.emploi, typeLogement: user.typeLogement, statusLogement: user.statusLogement });
        
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const data = await updateProfile(user.id,formData);
        
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
                        <div>
                            <Label label="Nom"/>
                            <Input type="text" name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom" required />
                        </div>
                        {errors.current_password && <p className="text-sm text-red-500">{errors.current_password}</p>}
                        <div>
                            <Label label="Prénom"/>
                            <Input type="text" name="prenom" value={formData.prenom} onChange={handleChange} placeholder="Prénom" required />
                        </div>
                        <div>
                            <Label label="Téléphone"/>
                            <Input type="text" name="telephone" value={formData.telephone} onChange={handleChange} placeholder="Téléphone" required />
                            {errors.telephone && <p className="text-sm text-red-500">{errors.telephone}</p>}
                        </div>
                        <div>
                            <Label label="Email"/>
                            <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                        </div>
                        <div className="col-span-2">
                            <Label label="Adresse"/>
                            <Input type="text" name="adresse" value={formData.adresse} onChange={handleChange} placeholder="Adresse" required />
                        </div>
                        <div className="col-span-2 grid grid-cols-2 gap-6">
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
                        </div>
                        <div className="col-span-2 grid grid-cols-3 gap-6">
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