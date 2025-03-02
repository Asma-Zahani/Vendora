import { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import Label from "@/components/Forms/Label";
import Input from "@/components/Forms/Input";
import Dropdown from "@/components/Forms/Dropdown";
import UserContext from '@/utils/UserContext';
import { updateClient } from "@/service/ClientService";

const Checkout = () => {
    const { user, setUser } = useContext(UserContext);

    const defaultUserInfo = user.user || {};

    const [paymentMethod, setPaymentMethod] = useState("carte");
    const [deliveryMethod, setDeliveryMethod] = useState("livraison");

    const [isRegionOpen, setIsRegionOpen] = useState(false);
    const [isVilleOpen, setIsVilleOpen] = useState(false);

    const location = useLocation();
    const checkoutData = location.state;

    const [formData, setFormData] = useState({ nom: defaultUserInfo.nom, prenom: defaultUserInfo.prenom, telephone: defaultUserInfo.telephone, email: defaultUserInfo.email, region: defaultUserInfo.region, ville: defaultUserInfo.ville, adresse: defaultUserInfo.adresse });
      
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

    const handleEdit = async () => {
        try {      
            const updatedUser = await updateClient(defaultUserInfo.id, formData);
            setUser((prevUser) => ({ ...prevUser, user: updatedUser }));
        } catch (error) {
          console.error("Erreur de modification:", error);
          alert("Une erreur est survenue lors de la modification du client");
        }
    };

    return (
        <section className="mx-6 py-6">
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="inline-block min-w-full py-2 align-middle">
                    <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm">
                        <div className="flex flex-col lg:flex-row gap-6">
                            {/* Formulaire de facturation */}
                            <div className="flex-1/5 py-4 px-2">
                                <h4 className="text-2xl font-semibold mb-2 dark:text-white">Détails de facturation</h4>
                                <p className="text-sm text-gray-600 dark:text-grayDark mb-10">Vérifiez vos informations avant de passer la commande.</p>
                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                        <Label label="Méthode de réception" />
                                        <div className="flex justify-center space-x-6">
                                        <label className="flex items-center cursor-pointer">
                                            <input type="radio" value="livraison" checked={deliveryMethod === "livraison"} onChange={() => setDeliveryMethod("livraison")} name="delivery" className="hidden" />
                                            <div className="w-4 h-4 border-2 border-gray-300 dark:border-purpleLight rounded-full flex items-center justify-center">
                                            {deliveryMethod === "livraison" && ( <div className="w-2 h-2 bg-gray-300 dark:bg-purpleLight rounded-full"></div> )}
                                            </div>
                                            <span className="ml-2 text-gray-700 dark:text-grayDark">Livraison</span>
                                        </label>
                                        <label className="flex items-center cursor-pointer">
                                            <input type="radio" value="drive" checked={deliveryMethod === "drive"} onChange={() => setDeliveryMethod("drive")} name="delivery" className="hidden" />
                                            <div className="w-4 h-4 border-2 border-gray-300 dark:border-purpleLight rounded-full flex items-center justify-center">
                                            {deliveryMethod === "drive" && ( <div className="w-2 h-2 bg-gray-300 dark:bg-purpleLight rounded-full"></div> )}
                                            </div>
                                            <span className="ml-2 text-gray-700 dark:text-grayDark">Retrait drive</span>
                                        </label>
                                        </div>
                                    </div>
                                    {deliveryMethod === "livraison" && (
                                        <>
                                            <div className="col-span-2">
                                                <Label label="Adresse"/>
                                                <Input type="text" name="adresse" value={formData.adresse} onChange={handleChange} placeholder="Adresse" required />
                                            </div>
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
                                        </>
                                    )}
                                    {deliveryMethod === "drive" && (
                                        <div className="col-span-2">
                                            <Dropdown label="Point de retrait" name="point de retrait"/>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Récapitulatif de commande */}
                            <div className="flex-1 p-12 bg-contentLight dark:bg-contentDark border border-gray-300 dark:border-borderDark">
                                <div className="border-b tracking-wide font-semibold text-xl dark:border-borderDark pb-4 mb-4 flex justify-between">
                                    <p>Produits</p>
                                    <p>totale</p>
                                </div>
                                <div className="border-b dark:border-borderDark pb-4 mb-4 space-y-2">
                                    {checkoutData.produits.map((produit, index) => {
                                        return (
                                            <div key={index} className="flex justify-between">
                                                <p>{produit.nom} × {produit.quantite} </p>
                                                <strong>${produit.prix * produit.quantite}</strong>
                                            </div>
                                        );
                                    })}
                                </div>
                                <p className="text-lg font-semibold flex justify-between">
                                    Total : <strong>${checkoutData.total}</strong>
                                </p>
                                {checkoutData.codePromo && <p><strong>Code Promo :</strong> {checkoutData.codePromo}</p>}
                                <div className="mt-4">
                                    <h3 className="font-bold">Méthode de paiement</h3>
                                    <label className="block mt-2">
                                        <input type="radio" name="payment" value="check" onChange={() => setPaymentMethod("check")} /> Chèque
                                    </label>
                                    <label className="block mt-2">
                                        <input type="radio" name="payment" value="cod" onChange={() => setPaymentMethod("cod")} /> Paiement en espèce à la livraison
                                    </label>
                                    <label className="block mt-2">
                                        <input type="radio" name="payment" value="carte" checked={paymentMethod === "carte"} onChange={() => setPaymentMethod("carte")} /> Paiement par carte bancaire
                                    </label>
                                </div>
                                <button onClick={() => {handleEdit()}} className="mt-6 bg-purpleLight text-white py-2 px-4 rounded">Passer la commande</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Checkout;
