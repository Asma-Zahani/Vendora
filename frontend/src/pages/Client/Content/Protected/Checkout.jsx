/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import Dropdown from "@/components/Forms/Dropdown";
import { default as Drop } from "@/components/ui/Dropdown";
import UserContext from '@/utils/UserContext';
import ConfirmModal from "@/components/Modals/ConfirmModal";
import { useNavigate } from "react-router-dom";
import { regions, villes } from '@/service/UserInfos';
import { getEntities, updateEntity, createEntity } from "@/service/EntitesService";
import Recapitulatif from "./Recapitulatif"

const Checkout = () => {
    const { user, setUser, setPanier } = useContext(UserContext);

    const [step, setStep] = useState(1);
    
    const [paymentMethod, setPaymentMethod] = useState("espece");
    const [deliveryMethod, setDeliveryMethod] = useState("livraison");

    const [isRegionOpen, setIsRegionOpen] = useState(false);
    const [isVilleOpen, setIsVilleOpen] = useState(false);
    const [isPointRetraitOpen, setIsPointRetraitOpen] = useState(false);

    const location = useLocation();
    const checkoutData = location.state;

    const [formData, setFormData] = useState({ nom: user.nom, prenom: user.prenom, telephone: user.telephone, email: user.email, region: user.region, ville: user.ville, adresse: user.adresse, drive_id: '' });
      
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === 'region') {
          setFormData((prev) => ({ ...prev, ville: "" }));
          setIsRegionOpen(false);
        } else if (name === 'ville') {
          setIsVilleOpen(false);
        } else if (name === 'drive_id') {
            setIsPointRetraitOpen(false);
          }
    };
    
    const [drives, setDrives] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          setDrives(await getEntities("drives"));
        }; 
        fetchData();
    }, []);
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();
    
    console.log(checkoutData);
    
    const passerCommande = async () => {
        try {      
            const updatedUser = await updateEntity("users", user.id, formData);
            if (deliveryMethod === "drive") {                
                createEntity("commandeRetraitDrives",{
                    client_id: user.id,
                    total: checkoutData.discounted,
                    ...(checkoutData.PromoId && { code_promotion_id: checkoutData.PromoId }),
                    drive_id: formData.drive_id,
                    produits: checkoutData.produits.map(produit => ({
                        produit_id: produit.produit_id,
                        quantite: produit.pivot?.quantite ? produit.pivot.quantite : produit.quantite,
                        couleur: produit.pivot?.couleur
                    }))
                });
            }
            else {
                createEntity("commandeLivraisons",{
                    client_id: user.id,
                    total: checkoutData.discounted,
                    ...(checkoutData.PromoId && { code_promotion_id: checkoutData.PromoId }),
                    produits: checkoutData.produits.map(produit => ({
                        produit_id: produit.produit_id,
                        quantite: produit.pivot?.quantite ? produit.pivot.quantite : produit.quantite,
                        couleur: produit.pivot?.couleur
                    }))
                });
            }
            setUser(() => ({ ...updatedUser.data }));
            setPanier([]);
            navigate("/orderHistory");
        } catch (error) {
          console.error("Erreur de modification:", error);
          alert("Une erreur est survenue lors de la modification du client");
        }
    };
    
    useEffect(() => {
        if (!checkoutData) { 
            navigate("/cart") 
        };
    }, [checkoutData]);

    if (!checkoutData) {
        return null;
    }

    return (
        <section className="mx-6 py-6">
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="inline-block min-w-full py-2 align-middle">
                    <div className="bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm">
                        <div className="flex flex-col lg:flex-row gap-6">
                            {/* Formulaire de facturation */}
                            <div className="flex-1/5 py-4 px-2">
                                <h4 className="text-2xl font-semibold mb-2 dark:text-white">Détails de facturation</h4>
                                <p className="text-sm text-gray-600 dark:text-grayDark mb-10">Vérifiez vos informations avant de passer la commande.</p>
                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {step === 1 && (
                                        <>
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
                                        </>
                                    )}
                                    {step === 2 && (
                                        <>
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
                                            {deliveryMethod === "livraison" ? <>
                                                <div className="col-span-2">
                                                    <Label label="Adresse"/>
                                                    <Input type="text" name="adresse" value={formData.adresse} onChange={handleChange} placeholder="Adresse" required />
                                                </div>
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
                                                </> : <div className="col-span-2">
                                                    <Drop label="Point de retrait" name="drive_id" options={drives.map(drive => ({ value: drive.drive_id, label: drive.nom }))} selectedValue={formData.drive_id} 
                                                    onSelect={(selected) => { 
                                                        setFormData({ ...formData, drive_id: selected.value });
                                                        setIsPointRetraitOpen(null);
                                                    }}
                                                    isOpen={isPointRetraitOpen}
                                                    toggleOpen={() => {setIsPointRetraitOpen(!isPointRetraitOpen)}} />
                                            </div> }
                                        </>
                                    )}
                                    {step === 3 && (
                                        <>
                                            <div className="col-span-2">
                                                <Label label="Méthode de paiement" />
                                                <div className="flex justify-center space-x-6">
                                                <label className="flex items-center cursor-pointer">
                                                    <input type="radio" value="espece" checked={paymentMethod === "espece"} onChange={() => setPaymentMethod("espece")} name="payment" className="hidden" />
                                                    <div className="w-4 h-4 border-2 border-gray-300 dark:border-purpleLight rounded-full flex items-center justify-center">
                                                    {paymentMethod === "espece" && ( <div className="w-2 h-2 bg-gray-300 dark:bg-purpleLight rounded-full"></div> )}
                                                    </div>
                                                    <span className="ml-2 text-gray-700 dark:text-grayDark">Paiement en espèce</span>
                                                </label>
                                                <label className="flex items-center cursor-pointer">
                                                    <input type="radio" value="carte" checked={paymentMethod === "carte"} onChange={() => setPaymentMethod("carte")} name="payment" className="hidden" />
                                                    <div className="w-4 h-4 border-2 border-gray-300 dark:border-purpleLight rounded-full flex items-center justify-center">
                                                    {paymentMethod === "carte" && ( <div className="w-2 h-2 bg-gray-300 dark:bg-purpleLight rounded-full"></div> )}
                                                    </div>
                                                    <span className="ml-2 text-gray-700 dark:text-grayDark">Paiement par carte</span>
                                                </label>
                                                </div>
                                            </div>
                                            {paymentMethod === "espece" ? <>
                                                <p>frais de livraison</p>
                                                </> : <div className="col-span-2">
                                                    carte
                                            </div> }
                                        </>
                                    )}
                                </div>

                                <div className="flex justify-between mt-6">
                                    {step > 1 && (
                                        <button onClick={() => setStep(step - 1)} className="bg-gray-300 text-black py-2 px-4 rounded">
                                        Retour
                                        </button>
                                    )}
                                    {step < 3 && (
                                        <button onClick={() => setStep(step + 1)} className="bg-purpleLight text-white py-2 px-4 rounded ml-auto">
                                        Suivant
                                        </button>
                                    )}
                                    {step == 3 && (
                                        <button onClick={() => setIsOpen(true)} className="bg-purpleLight text-white py-2 px-4 rounded ml-auto">
                                        Passer la commande
                                        </button>
                                    )}
                                </div>
                            </div>
                            <Recapitulatif checkoutData={checkoutData} />
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && <ConfirmModal isOpen={isOpen} onClose={() => setIsOpen(false)} message="test" onConfirm={() => {setIsOpen(false); passerCommande()}}/> }
        </section>
    );
};

export default Checkout;