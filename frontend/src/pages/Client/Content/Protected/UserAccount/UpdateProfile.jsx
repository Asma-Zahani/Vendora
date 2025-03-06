import { useContext, useState } from "react";
import UserContext from '@/utils/UserContext';
import Label from "@/components/Forms/Label";
import Input from "@/components/Forms/Input";
import Dropdown from "@/components/Forms/Dropdown";

const UpdateProfile = () => {
    const { user } = useContext(UserContext);

    const [isRegionOpen, setIsRegionOpen] = useState(false);
    const [isVilleOpen, setIsVilleOpen] = useState(false);

    const [formData, setFormData] = useState({ nom: user.nom, prenom: user.prenom, telephone: user.telephone, email: user.email, region: user.region, ville: user.ville, adresse: user.adresse, point_retrait: '' });
          
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

    const regions = [
        "Ariana", "Béja", "Ben Arous", "Bizerte", "Gabès", "Gafsa", "Jendouba", "Kairouan", 
        "Kasserine", "Kébili", "Le Kef", "Mahdia", "Manouba", "Médenine", "Monastir", "Nabeul", 
        "Sfax", "Sidi Bouzid", "Siliana", "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan"
    ];
      
    const villes = {
        "Ariana": ["Ariana Ville", "Ettadhamen", "Kalâat el-Andalous", "La Soukra", "Mnihla", "Raoued", "Sidi Thabet"],
        "Béja": ["Béja Ville", "Amdoun", "Goubellat", "Medjez el-Bab", "Nefza", "Téboursouk", "Testour"],
        "Ben Arous": ["Ben Arous", "Bou Mhel el-Bassatine", "El Mourouj", "Ezzahra", "Fouchana", "Hammam Chott", "Hammam Lif", "Mohamedia", "Mornag", "Radès"],
        "Bizerte": ["Bizerte", "Mateur", "Ras Jebel", "Menzel Bourguiba", "Ghar El Melh", "Joumine", "Sejnane"],
        "Gabès": ["Gabès Ville", "Mareth", "Matmata", "Métouia", "El Hamma", "Ghannouch", "Nouvelle Matmata"],
        "Gafsa": ["Gafsa Ville", "Métlaoui", "Mdhilla", "Redeyef", "El Guettar", "Sned"],
        "Jendouba": ["Jendouba Ville", "Aïn Draham", "Bou Salem", "Fernana", "Tabarka"],
        "Kairouan": ["Kairouan Ville", "Sbikha", "Haffouz", "Nasrallah", "Hajeb El Ayoun"],
        "Kasserine": ["Kasserine Ville", "Fériana", "Thala", "Sbiba", "Sbeitla"],
        "Kébili": ["Kébili Ville", "Douz", "Souk Lahad", "El Faouar"],
        "Le Kef": ["Le Kef Ville", "Dahmani", "Jérissa", "Sakiet Sidi Youssef"],
        "Mahdia": ["Mahdia Ville", "Chebba", "Rejiche", "Ksour Essef", "El Jem"],
        "Manouba": ["Manouba", "Douar Hicher", "Oued Ellil", "Tebourba"],
        "Médenine": ["Médenine Ville", "Zarzis", "Djerba Midoun", "Djerba Houmt Souk", "Ben Guerdane"],
        "Monastir": ["Monastir Ville", "Jemmal", "Ksibet el-Médiouni", "Moknine", "Téboulba", "Sahline"],
        "Nabeul": ["Nabeul Ville", "Hammamet", "Korba", "Kelibia", "Soliman", "Menzel Temime"],
        "Sfax": ["Sfax Ville", "El Amra", "Agareb", "Bir Ali Ben Khalifa", "Mahrès", "Skhira"],
        "Sidi Bouzid": ["Sidi Bouzid Ville", "Regueb", "Jilma", "Meknassy", "Mezzouna"],
        "Siliana": ["Siliana Ville", "Bargou", "Gaâfour", "Makthar", "El Krib"],
        "Sousse": ["Sousse Ville", "Msaken", "Akouda", "Hammam Sousse", "Kalaa Kebira", "Kalaa Sghira"],
        "Tataouine": ["Tataouine Ville", "Bir Lahmar", "Ghomrassen", "Remada"],
        "Tozeur": ["Tozeur Ville", "Degache", "Nefta", "Tamerza"],
        "Tunis": ["Tunis Ville", "Le Bardo", "La Marsa", "Carthage", "El Menzah", "El Omrane", "Le Kram"],
        "Zaghouan": ["Zaghouan Ville", "El Fahs", "Bir Mcherga", "Nadhour"]
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
                        <Dropdown label="Ville" name="ville" options={villes[formData.region]} selectedValue={formData.ville} onSelect={handleChange} isOpen={isVilleOpen}
                        toggleOpen={() => {
                            setIsVilleOpen(!isVilleOpen);
                            setIsRegionOpen(false);
                        }} />
                    </div>
                    <div className="col-span-2 grid grid-cols-3 gap-6">
                        <Dropdown label="Ville" name="ville" options={villes[formData.region]} selectedValue={formData.ville} onSelect={handleChange} isOpen={isVilleOpen}
                        toggleOpen={() => {
                            setIsVilleOpen(!isVilleOpen);
                            setIsRegionOpen(false);
                        }} />
                        <Dropdown label="Ville" name="ville" options={villes[formData.region]} selectedValue={formData.ville} onSelect={handleChange} isOpen={isVilleOpen}
                        toggleOpen={() => {
                            setIsVilleOpen(!isVilleOpen);
                            setIsRegionOpen(false);
                        }} />
                        <Dropdown label="Ville" name="ville" options={villes[formData.region]} selectedValue={formData.ville} onSelect={handleChange} isOpen={isVilleOpen}
                        toggleOpen={() => {
                            setIsVilleOpen(!isVilleOpen);
                            setIsRegionOpen(false);
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
