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

const Laivraison = () => {

    const { user} = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const checkoutData = location.state;
    

    const [isRegionOpen, setIsRegionOpen] = useState(false);
    const [isVilleOpen, setIsVilleOpen] = useState(false);
    const [isPointRetraitOpen, setIsPointRetraitOpen] = useState(false);
    const [formData, setFormData] = useState({ nom: user.nom, prenom: user.prenom, telephone: user.telephone, email: user.email, region: user.region, ville: user.ville, adresse: user.adresse, drive_id: '' });

    const { adresse, region, ville, drive_id } = formData;

    const [errors, setErrors] = useState({});

    const [drives, setDrives] = useState([]);
    const [deliveryMethod, setDeliveryMethod] = useState("livraison");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
        if (name === 'region') {
          setFormData((prev) => ({ ...prev, ville: "" }));
          setIsRegionOpen(false);
        } else if (name === 'ville') {
          setIsVilleOpen(false);
        } else if (name === 'drive_id') {
            setIsPointRetraitOpen(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
          setDrives(await getEntities("drives"));
        }; 
        fetchData();
    }, []);

    const validateForm = () => {
        let newErrors = {};
        
        
        if (deliveryMethod === "livraison") {
            if (!adresse) newErrors.adresse = "L'adresse est requise";
            if (!region) newErrors.region = "La région est requise";
            if (!ville) newErrors.ville = "La ville est requise";
        }
        
        if (deliveryMethod === "drive" && !drive_id) {
            newErrors.drive_id = "Sélectionnez un point de retrait";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleReturnToInfo = () => {
        navigate("/checkout", { state: checkoutData });
    };

    const handleOrderClick = () => {
        let totalAvecFrais = checkoutData.total;
    
        if (deliveryMethod === "livraison") {
            totalAvecFrais += 8000; // Ajouter les frais de livraison
        }
        if (!validateForm()) {
            return; // Arrête l'exécution si le formulaire est invalide
        }else{
            navigate("/paiement", { state:  {
                ...checkoutData,            // garder les données existantes
                total: totalAvecFrais,      // mise à jour du total avec les frais
                methodeLivraison: deliveryMethod, // envoyer la méthode choisie
                livraisonData: formData     // tu peux aussi envoyer les infos saisies si besoin});
        
            }
        });
    }
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
                                                {errors.adresse && <p className="text-red-500 text-sm">{errors.adresse}</p>}
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
                                    )}
                                    {deliveryMethod === "drive" && (
                                        <div className="col-span-2">
                                            <Drop label="Point de retrait" name="drive_id" options={drives.map(drive => ({ value: drive.drive_id, label: drive.nom }))} selectedValue={formData.drive_id} 
                                            onSelect={(selected) => { 
                                                setFormData({ ...formData, drive_id: selected.value });
                                                setIsPointRetraitOpen(null);
                                            }}
                                            isOpen={isPointRetraitOpen}
                                            toggleOpen={() => {setIsPointRetraitOpen(!isPointRetraitOpen)}} />
                                            {errors.drive_id && <p className="text-red-500 text-sm">{errors.drive_id}</p>}
                                        </div>
                                    )}

                        
<div className="mt-6 flex flex-col sm:flex-row justify-between gap-4">
    <button
        onClick={handleReturnToInfo}
        className="bg-gray-300 text-black py-2 px-4 rounded transition-all duration-300 hover:bg-gray-400 w-full sm:w-auto"
    >
        Retour aux informations
    </button>
    <button
        onClick={handleOrderClick}
        className="bg-purpleLight text-white py-2 px-4 rounded transition-all duration-300 hover:bg-purple w-full sm:w-auto"
    >
        Continuer vers le paiement 
    </button>
</div>

                        

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
                                                <p>{produit.nom} × {produit.pivot?.quantite ?? produit.quantite} </p>
                                                <strong>${produit.prix * (produit.pivot?.quantite ?? produit.quantite)}</strong>
                                            </div>
                                        );
                                    })}
                                </div>
                                <p className="text-lg font-semibold flex justify-between">
                                    Total : <strong>${checkoutData.total}</strong>
                                </p>
                                {checkoutData.codePromo && <p><strong>Code Promo :</strong> {checkoutData.codePromo}</p>}
                                    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Laivraison