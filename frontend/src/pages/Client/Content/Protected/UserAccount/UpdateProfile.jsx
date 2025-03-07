import { useContext, useState } from "react";
import UserContext from '@/utils/UserContext';
import Label from "@/components/Forms/Label";
import Input from "@/components/Forms/Input";
import Dropdown from "@/components/Forms/Dropdown";
import { regions, villes, emplois, housingTypes, occupancyStatuses } from '@/service/UserInfos';

const UpdateProfile = () => {
    const { user } = useContext(UserContext);

    const [isEmploiOpen, setIsEmploiOpen] = useState(false);
    const [isHousingTypeOpen, setIsHousingTypeOpen] = useState(false);
    const [isOccupancyStatusOpen, setIsOccupancyStatusOpen] = useState(false);
    const [isRegionOpen, setIsRegionOpen] = useState(false);
    const [isVilleOpen, setIsVilleOpen] = useState(false);

    const [formData, setFormData] = useState({ nom: user.nom, prenom: user.prenom, telephone: user.telephone, email: user.email, region: user.region, ville: user.ville, adresse: user.adresse, point_retrait: '' });
          
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

    return (
        <div className="col-span-2 w-full py-2">
            <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm">
                <h1 className="text-lg font-semibold mb-4">Modifier Profile</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg">
                    <div>
                        <Label label="Nom"/>
                        <Input type="text" name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom" required />
                    </div>
                    <div>
                        <Label label="Prénom"/>
                        <Input type="text" name="prenom" value={formData.prenom} onChange={handleChange} placeholder="Prénom" required />
                    </div>
                    <div>
                        <Label label="Téléphone"/>
                        <Input type="text" name="telephone" value={formData.telephone} onChange={handleChange} placeholder="Téléphone" required />
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
                        <Dropdown label="Région" name="region" options={regions} selectedValue={formData.region} onSelect={handleChange} isOpen={isRegionOpen}
                        toggleOpen={() => {
                            setIsRegionOpen(!isRegionOpen);
                            setIsVilleOpen(false);
                        }} />
                        <Dropdown label="Ville" name="ville" options={villes[formData.region] || []} selectedValue={formData.ville} onSelect={handleChange} isOpen={isVilleOpen}
                        toggleOpen={() => {
                            setIsVilleOpen(!isVilleOpen);
                            setIsRegionOpen(false);
                        }} />
                    </div>
                    <div className="col-span-2 grid grid-cols-3 gap-6">
                        <Dropdown label="Emploi" name="emploi" options={emplois} selectedValue={formData.emploi} onSelect={handleChange} isOpen={isEmploiOpen}
                            toggleOpen={() => {
                            setIsEmploiOpen(!isEmploiOpen);
                            setIsHousingTypeOpen(false);
                            setIsOccupancyStatusOpen(false);
                        }} />
                        <Dropdown label="Type de logement" name="typeLogement" options={housingTypes} selectedValue={formData.typeLogement} onSelect={handleChange} isOpen={isHousingTypeOpen}
                            toggleOpen={() => {
                            setIsHousingTypeOpen(!isHousingTypeOpen);
                            setIsEmploiOpen(false);
                            setIsOccupancyStatusOpen(false);
                        }} />
                        <Dropdown label="Statut d'occupation" name="statusLogement" options={occupancyStatuses} selectedValue={formData.statusLogement} onSelect={handleChange} isOpen={isOccupancyStatusOpen}
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
            </div>
        </div>
    );
};

export default UpdateProfile;
