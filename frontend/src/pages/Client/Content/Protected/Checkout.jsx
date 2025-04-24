import { useState, useContext, useEffect, useRef } from "react";
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
import { Elements } from "@stripe/react-stripe-js";
import StripeForm from "./StripeForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51RDmsOI30GkvvwdVKatq2qxS8kRXvNyo7npbGfDG9nl4mvFYT4GyKOLPUMwNO9bHsQAiXHfaEQqXkLy5X3cZ20lP00GP1fVvNa");

const Checkout = () => {
    const { user, setUser, setPanier } = useContext(UserContext);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ ...user, drive_id: '' });
    const [paymentMethod, setPaymentMethod] = useState("espece");
    const [deliveryMethod, setDeliveryMethod] = useState("livraison");
    const [drives, setDrives] = useState([]);
    const [errors, setErrors] = useState({});
    const [isRegionOpen, setIsRegionOpen] = useState(false);
    const [isVilleOpen, setIsVilleOpen] = useState(false);
    const [isPointRetraitOpen, setIsPointRetraitOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isCardValid, setIsCardValid] = useState(false);

    const location = useLocation();
    const checkoutData = location.state;
    const stripeFormRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        if (!checkoutData) navigate("/cart");
    }, [checkoutData, navigate]);

    useEffect(() => {
        const fetchDrives = async () => {
            setDrives(await getEntities("drives"));
        };
        fetchDrives();
    }, []);

    const checkoutDataAvecFrais = {
        ...checkoutData,
        fraisLivraison: step === 3 && deliveryMethod === "livraison" ? 8 : 0,
        totalAvecFrais: parseFloat(checkoutData.discounted) + (step === 3 && deliveryMethod === "livraison" ? 8 : 0)
    };

    const validateStep = () => {
        const newErrors = {};
        if (step === 1) {
            if (!formData.nom) newErrors.nom = "Le nom est requis";
            if (!formData.prenom) newErrors.prenom = "Le prénom est requis";
            if (!formData.telephone) newErrors.telephone = "Le téléphone est requis";
            if (!formData.email) newErrors.email = "L'email est requis";
        } else if (step === 2) {
            if (!deliveryMethod) newErrors.deliveryMethod = "Méthode de réception requise";
            if (deliveryMethod === "livraison") {
                if (!formData.adresse) newErrors.adresse = "Adresse requise";
                if (!formData.region) newErrors.region = "Région requise";
                if (!formData.ville) newErrors.ville = "Ville requise";
            } else if (deliveryMethod === "drive" && !formData.drive_id) {
                newErrors.drive_id = "Point de retrait requis";
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            ...(name === "region" && { ville: "" })
        }));
    };

    const passerCommande = async () => {
        try {
            const transactionId = paymentMethod === "carte" && stripeFormRef.current ? await stripeFormRef.current.submitPayment() : null;
            const updatedUser = await updateEntity("users", user.id, formData);
            const orderData = {
                client_id: user.id,
                total: checkoutData.discounted,
                transaction_id: transactionId,
                ...(checkoutData.PromoId && { code_promotion_id: checkoutData.PromoId }),
                produits: checkoutData.produits.map(produit => ({
                    produit_id: produit.produit_id,
                    quantite: produit.pivot?.quantite || produit.quantite,
                    couleur: produit.pivot?.couleur
                }))
            };
            if (deliveryMethod === "drive") {
                await createEntity("commandeRetraitDrives", { ...orderData, drive_id: formData.drive_id });
            } else {
                const data = await createEntity("commandeLivraisons", orderData);
                console.log(data);
                
            }
            setUser(updatedUser.data);
            setPanier([]);
            navigate("/orderHistory");
        } catch (error) {
            console.error("Erreur de commande:", error);
            alert("Erreur lors de la commande.");
        }
    };

    const handleOrderClick = () => {
        if (validateStep()) {
            setIsOpen(true);
        }
    };

    const stepContent = {
        1: (
            <>
                <div className="mb-4">
                    <Label label="Nom" />
                    <Input type="text" name="nom" value={formData.nom} onChange={handleChange} error={errors.nom} />
                </div>
                <div className="mb-4">
                    <Label label="Prénom" />
                    <Input type="text" name="prenom" value={formData.prenom} onChange={handleChange} error={errors.prenom} />
                </div>
                <div className="mb-4">
                    <Label label="Téléphone"/>
                    <Input type="text" name="telephone" value={formData.telephone} onChange={handleChange} error={errors.telephone} />
                </div>
                <div className="mb-4">
                    <Label label="Email" />
                    <Input type="text" name="email" value={formData.email} onChange={handleChange} error={errors.email} />
                </div>
            </>
        ),
        2: (
            <>
                <div className="col-span-2">
                    <Label label="Méthode de réception" />
                    <div className="flex justify-center space-x-6">
                        <label className="flex items-center cursor-pointer">
                            <input type="radio" value="livraison" checked={deliveryMethod === "livraison"} onChange={() => {setDeliveryMethod("livraison"); setPaymentMethod("espece")}} name="delivery" className="hidden" />
                            <div className="w-4 h-4 border-2 border-gray-300 dark:border-purpleLight rounded-full flex items-center justify-center">
                            {deliveryMethod === "livraison" && ( <div className="w-2 h-2 bg-gray-300 dark:bg-purpleLight rounded-full"></div> )}
                            </div>
                            <span className="ml-2 text-gray-700 dark:text-grayDark">Livraison</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                            <input type="radio" value="drive" checked={deliveryMethod === "drive"} onChange={() => {setDeliveryMethod("drive"); setPaymentMethod("carte")}} name="delivery" className="hidden" />
                            <div className="w-4 h-4 border-2 border-gray-300 dark:border-purpleLight rounded-full flex items-center justify-center">
                            {deliveryMethod === "drive" && ( <div className="w-2 h-2 bg-gray-300 dark:bg-purpleLight rounded-full"></div> )}
                            </div>
                            <span className="ml-2 text-gray-700 dark:text-grayDark">Retrait drive</span>
                        </label>
                    </div>
                </div>
                {deliveryMethod === "livraison" ? (
                    <>
                        <div className="col-span-2">
                            <Label label="Adresse"/>
                            <Input type="text" name="adresse" value={formData.adresse} onChange={handleChange} placeholder="Adresse" required error={errors.adresse} />
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
                    </>
                ) : (
                    <div className="col-span-2">
                        <Drop label="Point de retrait" name="drive_id" options={drives.map(drive => ({ value: drive.drive_id, label: drive.nom }))} selectedValue={formData.drive_id} 
                        onSelect={(selected) => { 
                            setFormData({ ...formData, drive_id: selected.value });
                            setIsPointRetraitOpen(null);
                        }}
                        isOpen={isPointRetraitOpen}
                        toggleOpen={() => {setIsPointRetraitOpen(!isPointRetraitOpen)}} />
                        {errors.drive_id && <p className="text-red-500 text-sm mt-1">{errors.drive_id}</p>}
                    </div>
                )}
            </>
        ),
        3: (
            <>
                <div className="col-span-2">
                    <Label label="Méthode de paiement" />
                    {deliveryMethod !== "drive" && (
                        <div className="flex flex-col md:flex-row justify-center gap-6">
                            <label className="flex items-center cursor-pointer">
                                <input type="radio" value="espece" checked={paymentMethod === "espece"} onChange={() => setPaymentMethod("espece")} name="payment" className="hidden" />
                                <div className="w-4 h-4 border-2 border-gray-300 dark:border-purpleLight rounded-full flex items-center justify-center">
                                    {paymentMethod === "espece" && (
                                        <div className="w-2 h-2 bg-gray-300 dark:bg-purpleLight rounded-full"></div>
                                    )}
                                </div>
                                <span className="ml-2 text-gray-700 dark:text-grayDark">Paiement en espèce</span>
                            </label>
                            <label className="flex items-center cursor-pointer">
                                <input type="radio" value="carte" checked={paymentMethod === "carte"} onChange={() => setPaymentMethod("carte")} name="payment" className="hidden" />
                                <div className="w-4 h-4 border-2 border-gray-300 dark:border-purpleLight rounded-full flex items-center justify-center">
                                    {paymentMethod === "carte" && (
                                        <div className="w-2 h-2 bg-gray-300 dark:bg-purpleLight rounded-full"></div>
                                    )}
                                </div>
                                <span className="ml-2 text-gray-700 dark:text-grayDark">Paiement par carte</span>
                            </label>
                        </div>
                    )}
                </div>
                {paymentMethod === "carte" && (
                    <div className="col-span-2 p-6 border border-borderGrayLight dark:border-borderDark rounded">
                        <p className="font-semibold text-sm mb-4">Les cartes acceptées incluent Mastercard et Visa.</p>
                        <Elements stripe={stripePromise}>
                            <StripeForm ref={stripeFormRef} amount={checkoutDataAvecFrais.totalAvecFrais} user={user} onSuccess={passerCommande} setIsCardValid={setIsCardValid} />
                        </Elements>
                    </div>
                )}
                {paymentMethod === "espece" && <p className="text-sm mt-4">Frais de livraison applicables.</p>}
            </>
        )
    };

    return (
        <section className="mx-6 py-6">
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="inline-block min-w-full py-2 align-middle">
                    <div className="bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm">
                        <div className="flex flex-col lg:flex-row gap-6">
                            <div className="flex-1/5 py-4 px-2">
                                <h4 className="text-2xl font-semibold mb-2 dark:text-white">Détails de facturation</h4>
                                <p className="text-sm text-gray-600 dark:text-grayDark mb-10">Vérifiez vos informations avant de passer la commande.</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {stepContent[step]}
                                </div>
                                <div className="flex justify-between mt-6">
                                    {step > 1 && (<button onClick={() => setStep(step - 1)} className="bg-gray-300 text-black py-2 px-4 rounded">Retour</button>)}
                                    {step < 3 && (<button onClick={() => {if (validateStep()) { setStep(step + 1);}}} className="bg-purpleLight text-white py-2 px-4 rounded ml-auto">Suivant</button>)}
                                    {step == 3 && ( <button onClick={() => handleOrderClick()} disabled={paymentMethod === "carte" && !isCardValid}  className={`py-2 px-4 rounded ml-auto bg-purpleLight text-white
                                            ${paymentMethod === "carte" && !isCardValid ? 'cursor-not-allowed opacity-50' : ''}`}> Passer la commande </button>)}
                                </div>
                            </div>
                            <Recapitulatif checkoutData={checkoutDataAvecFrais} />
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && <ConfirmModal isOpen={isOpen} onClose={() => setIsOpen(false)} message="test" onConfirm={() => {setIsOpen(false); passerCommande()}}/> }
        </section>
    );
};

export default Checkout;