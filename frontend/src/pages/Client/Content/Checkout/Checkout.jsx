import { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import Label from "@/components/Forms/Label";
import UserContext from '@/utils/UserContext'; // Assure-toi d'importer le contexte de l'utilisateur

const Checkout = () => {
    const { user } = useContext(UserContext);

    const defaultUserInfo = user.user || {};

    const [paymentMethod, setPaymentMethod] = useState("carte");
    const [deliveryMethod, setDeliveryMethod] = useState("livraison");

    const [selectedRegion, setSelectedRegion] = useState(defaultUserInfo.region);
    const [selectedCity, setSelectedCity] = useState(defaultUserInfo.ville);

    const location = useLocation();
    const checkoutData = location.state;

    if (!checkoutData) {
        return <p className="text-center text-red-500">Aucune donnée de commande trouvée.</p>;
    }

    

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

    const handleRegionChange = (e) => {
        const selectedRegion = e.target.value;
        setSelectedRegion(selectedRegion);
        setSelectedCity("");
    };

    return (
        <section className="mx-6 py-6">
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="inline-block min-w-full py-2 align-middle">
                    <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm">
                        <div className="flex flex-col lg:flex-row gap-6">
                            {/* Formulaire de facturation */}
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold mb-4">Détails de facturation</h2>
                                <div className="mb-4">
                                    <Label label="Méthode de réception" />
                                    <div className="flex justify-center space-x-6">
                                        <label className="flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                value="livraison"
                                                checked={deliveryMethod === "livraison"}
                                                onChange={() => setDeliveryMethod("livraison")}
                                                name="delivery"
                                                className="hidden"
                                            />
                                            <div className="w-4 h-4 border-2 border-gray-300 dark:border-purpleLight rounded-full flex items-center justify-center">
                                                {deliveryMethod === "livraison" && (
                                                    <div className="w-2 h-2 bg-gray-300 dark:bg-purpleLight rounded-full"></div>
                                                )}
                                            </div>
                                            <span className="ml-2 text-gray-700 dark:text-grayDark">Livraison</span>
                                        </label>
                                        <label className="flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                value="drive"
                                                checked={deliveryMethod === "drive"}
                                                onChange={() => setDeliveryMethod("drive")}
                                                name="delivery"
                                                className="hidden"
                                            />
                                            <div className="w-4 h-4 border-2 border-gray-300 dark:border-purpleLight rounded-full flex items-center justify-center">
                                                {deliveryMethod === "drive" && (
                                                    <div className="w-2 h-2 bg-gray-300 dark:bg-purpleLight rounded-full"></div>
                                                )}
                                            </div>
                                            <span className="ml-2 text-gray-700 dark:text-grayDark">Retrait Drive</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Prénom"
                                        className="border p-2 rounded"
                                        defaultValue={defaultUserInfo.prenom || ""}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Nom"
                                        className="border p-2 rounded"
                                        defaultValue={defaultUserInfo.nom || ""}
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Téléphone"
                                        className="border p-2 rounded"
                                        defaultValue={defaultUserInfo.telephone || ""}
                                    />
                                    {deliveryMethod === "livraison" && (
                                        <>
                                            <input
                                                type="email"
                                                placeholder="Adresse Email"
                                                className="border p-2 rounded"
                                                defaultValue={defaultUserInfo.email || ""}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Adresse"
                                                className="border p-2 rounded col-span-2"
                                                defaultValue={defaultUserInfo.adresse || ""}
                                            />
                                            
                                            {/* Dropdown pour la région */}
                                            <select
                                                className="border p-2 rounded"
                                                value={selectedRegion}
                                                onChange={handleRegionChange}
                                            >
                                                <option value="">Choisir une région...</option>
                                                {regions.map((region, index) => (
                                                    <option key={index} value={region}>{region}</option>
                                                ))}
                                            </select>

                                            {/* Dropdown pour la ville */}
                                            {(
                                                <select
                                                    className="border p-2 rounded"
                                                    value={selectedCity}
                                                    onChange={(e) => setSelectedCity(e.target.value)}
                                                >
                                                    <option value="">Choisir une ville...</option>
                                                    {villes[selectedRegion]?.map((city, index) => (
                                                        <option key={index} value={city}>{city}</option>
                                                    ))}
                                                </select>
                                            )}
                                        </>
                                    )}
                                    {deliveryMethod === "drive" && (
                                        <select className="border p-2 rounded">
                                            <option>Choisissez un point de retrait...</option>
                                        </select>
                                    )}
                                </div>
                            </div>

                            {/* Récapitulatif de commande */}
                            <div className="flex-1 p-6 bg-contentLight dark:bg-contentDark border border-gray-300 dark:border-borderDark">
                                <h2 className="text-2xl font-bold mb-4">Résumé de commande</h2>
                                <div className="border-b pb-4 mb-4 space-y-2">
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
                                <button onClick={() => alert('Commande passée')} className="mt-6 bg-purpleLight text-white py-2 px-4 rounded">Passer la commande</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Checkout;
