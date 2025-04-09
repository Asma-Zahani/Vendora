/* eslint-disable no-unused-vars */
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

const Checkout = () => {
    const { user, setUser, setPanier } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const checkoutData = location.state;
    

    // const [paymentMethod, setPaymentMethod] = useState("carte");
    // const [deliveryMethod, setDeliveryMethod] = useState("livraison");

    const [isRegionOpen, setIsRegionOpen] = useState(false);
    const [isVilleOpen, setIsVilleOpen] = useState(false);
    const [isPointRetraitOpen, setIsPointRetraitOpen] = useState(false);

    const [formData, setFormData] = useState({ nom: user.nom, prenom: user.prenom, telephone: user.telephone, email: user.email, region: user.region, ville: user.ville, adresse: user.adresse, drive_id: '' });

    const [errors, setErrors] = useState({});

    // const [cardDetails, setCardDetails] = useState({
    //     cardNumber: "",
    //     expiryDate: "",
    //     cvc: ""
    // });


   
    
    const handleReturnToCart = () => {
        window.location.href = "/cart"; // Utilisation de window.location pour rediriger
    };
    
    // const handleCardChange = (e) => {
    //     const { name, value } = e.target;
    //     setCardDetails({ ...cardDetails, [name]: value });
    // };
    
      
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
    
    // const [drives, setDrives] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //       setDrives(await getEntities("drives"));
    //     }; 
    //     fetchData();
    // }, []);
    // const [isOpen, setIsOpen] = useState(false);
    // const tva = 0.19;



    // const passerCommande = async () => {
    //     try {
    //         // Mettre à jour l'utilisateur
    //         const updatedUser = await updateEntity("users", user.id, formData);
    
    //         let commandeResponse;
    //         if (deliveryMethod === "drive") {
    //             commandeResponse = await createEntity("commandeRetraitDrives", {
    //                 client_id: user.id,
    //                 total: checkoutData.total,
    //                 ...(checkoutData.PromoId && { code_promotion_id: checkoutData.PromoId }),
    //                 drive_id: formData.drive_id,
    //                 produits: checkoutData.produits.map(produit => ({
    //                     produit_id: produit.produit_id,
    //                     quantite: produit.pivot?.quantite ? produit.pivot.quantite : produit.quantite
    //                 }))
    //             });
    //         } else {
    //             commandeResponse = await createEntity("commandeLivraisons", {
    //                 client_id: user.id,
    //                 total: checkoutData.total,
    //                 ...(checkoutData.PromoId && { code_promotion_id: checkoutData.PromoId }),
    //                 produits: checkoutData.produits.map(produit => ({
    //                     produit_id: produit.produit_id,
    //                     quantite: produit.pivot?.quantite ? produit.pivot.quantite : produit.quantite
    //                 }))
    //             });
    //         }
    //         console.log(commandeResponse);
    
    //         // Créer la facture après avoir créé la commande
    //         const factureResponse = await createEntity("factureCommandes", {
    //             commande_id: commandeResponse.commande.commande_id,
    //             totalHT: commandeResponse.commande.total,  // Montant hors taxe
    //             totalTTC: commandeResponse.commande.total * (1 + tva / 100),  // Montant TTC
    //             remise: 0,  // Remise si applicable
    //         });
    //         // Vérifier si factureResponse est bien retourné
    //         console.log("Facture Response:", factureResponse);

    //         if (!factureResponse?.data?.facture_id) {
    //             console.error("Erreur : facture_id introuvable !");
    //             return alert("Erreur lors de la création de la facture !");
    //         }

    //         console.log("Facture ID:", factureResponse?.data?.facture_id);


    //         // Créer les détails de la facture
    //         for (const produit of checkoutData.produits) {
    //             try {
    //                 console.log("Insertion de détail facture pour le produit:", produit);

    //                 const detailResponse = await createEntity("detailFactures", {
    //                     facture_id: factureResponse?.data?.facture_id,
    //                     produit_id: produit.produit_id,
    //                     quantite: produit.pivot?.quantite ?? produit.quantite ?? 1,
    //                     prix_unitaire: parseFloat(produit.prix) || 0,
    //                     totalLigneHT: (parseFloat(produit.prix) || 0) * (produit.pivot?.quantite ?? produit.quantite ?? 1),
    //                     totalLigneTTC: ((parseFloat(produit.prix) || 0) * (produit.pivot?.quantite ?? produit.quantite ?? 1)) * 1.19,
                        
    //                 });

    //                 console.log("Détail Facture ajouté:", detailResponse);

    //             } catch (error) {
    //                 console.error("Erreur lors de l'ajout d'un détail de facture:", error);
    //                 alert("Une erreur est survenue lors de l'ajout des détails de la facture.");
    //             }
    //         }

    //         console.log("detailFactures", checkoutData.produits);
    
    //         // Mettre à jour l'utilisateur et le panier
    //         setUser(() => ({ ...updatedUser }));
    //         setPanier([]);
    //         navigate("/orderHistory");
    
    //     } catch (error) {
    //         console.error("Erreur de modification:", error);
    //         alert("Une erreur est survenue lors de la modification du client");
    //     }
    // };
    

    const validateForm = () => {
        let newErrors = {};
        const { nom, prenom, telephone, email} = formData;
        //const { cardNumber, expiryDate, cvc } = cardDetails;
        
        if (!nom) newErrors.nom = "Le nom est requis";
        if (!prenom) newErrors.prenom = "Le prénom est requis";
        if (!telephone) newErrors.telephone = "Le téléphone est requis";
        if (!email) newErrors.email = "L'email est requis";
        
        
        // if (deliveryMethod === "livraison") {
        //     if (!adresse) newErrors.adresse = "L'adresse est requise";
        //     if (!region) newErrors.region = "La région est requise";
        //     if (!ville) newErrors.ville = "La ville est requise";
        // }
        
        // if (deliveryMethod === "drive" && !drive_id) {
        //     newErrors.drive_id = "Sélectionnez un point de retrait";
        // }

        // if (paymentMethod === "carte") {
        //     if (!cardNumber) newErrors.cardNumber = "Le numéro de carte est requis";
        //     if (!expiryDate) newErrors.expiryDate = "La date d'expiration est requise";
        //     if (!cvc) newErrors.cvc = "Le CVC est requis";
        // }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    
    

    // const validateCardDetails = () => {
    //     const { cardNumber, expiryDate, cvc } = cardDetails;
    
    //     // Vérifier la validité du numéro de carte (algorithme de Luhn)
    //     const isValidCardNumber = (number) => {
    //         const sanitized = number.replace(/\s+/g, ""); // Supprimer les espaces
    //         let sum = 0;
    //         let alternate = false;
    //         for (let i = sanitized.length - 1; i >= 0; i--) {
    //             let n = parseInt(sanitized[i], 10);
    //             if (alternate) {
    //                 n *= 2;
    //                 if (n > 9) n -= 9;
    //             }
    //             sum += n;
    //             alternate = !alternate;
    //         }
    //         return sum % 10 === 0;
    //     };
    
    //     if (!isValidCardNumber(cardNumber)) {
    //         alert("Numéro de carte invalide.");
    //         return false;
    //     }
    
    //     // Vérifier la date d'expiration
    //     const [month, year] = expiryDate.split("/").map(num => parseInt(num, 10));
    //     if (!month || !year || month < 1 || month > 12) {
    //         alert("Date d'expiration invalide.");
    //         return false;
    //     }
    //     const currentYear = new Date().getFullYear() % 100;
    //     const currentMonth = new Date().getMonth() + 1;
    //     if (year < currentYear || (year === currentYear && month < currentMonth)) {
    //         alert("Carte bancaire expirée.");
    //         return false;
    //     }
    
    //     // Vérifier le CVC (doit être 3 chiffres)
    //     if (!/^\d{3}$/.test(cvc)) {
    //         alert("Code de sécurité (CVC) invalide.");
    //         return false;
    //     }
    
    //     return true;
    // };
    
    const handleOrderClick = () => {
        if (!validateForm()) {
            return; // Arrête l'exécution si le formulaire est invalide
        }else{
            navigate("/laivraison", { state: checkoutData });
        }
    }

    //     if (paymentMethod === "carte") {
    //         if (!validateCardDetails()) {
    //             return; 
    //         }
    //     }
    //     setIsOpen(true);
    // };
    
    
    
    // useEffect(() => {
    //     if (!checkoutData) { 
    //         navigate("/cart") 
    //     };
    // }, [checkoutData]);

    // if (!checkoutData) {
    //     return null;
    // }

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
                                    <div>
                                        <Label label="Nom"/>
                                        <Input type="text" name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom" required />
                                        {errors.nom && <p className="text-red-500 text-sm">{errors.nom}</p>}
                                    </div>
                                    <div>
                                        <Label label="Prénom"/>
                                        <Input type="text" name="prenom" value={formData.prenom} onChange={handleChange} placeholder="Prénom" required />
                                        {errors.prenom && <p className="text-red-500 text-sm">{errors.prenom}</p>}
                                    </div>
                                    <div>
                                        <Label label="Téléphone"/>
                                        <Input type="text" name="telephone" value={formData.telephone} onChange={handleChange} placeholder="Téléphone" required />
                                        {errors.telephone && <p className="text-red-500 text-sm">{errors.telephone}</p>}
                                    </div>
                                    <div>
                                        <Label label="Email"/>
                                        <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                    </div>
                                    {/* <div className="col-span-2">
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
                                    </div> */}
                                    {/* {deliveryMethod === "livraison" && (
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
                                    )} */}

                        <div className="flex justify-between">
                            <button
                                onClick={handleReturnToCart}
                                className="bg-gray-300 text-black hover:bg-gray-400  py-2 px-4 rounded-lg sm:mr-4"
                            >
                                Retourner au panier
                            </button>
                            <button
                                onClick={handleOrderClick}
                                className="bg-purpleLight hover:bg-purpleLightHover py-2 px-4 rounded-lg text-white sm:mr-4"
                            >
                                Continuer à la livraison
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
                                {/* <div className="mt-4">
                                    <h3 className="font-bold">Méthode de paiement</h3>
                                    <label className="block mt-2">
                                        <input type="radio" name="payment" value="cod" onChange={() => setPaymentMethod("cod")} /> Paiement en espèce à la livraison
                                    </label>
                                    <label className="block mt-2">
                                        <input type="radio" name="payment" value="carte" checked={paymentMethod === "carte"} onChange={() => setPaymentMethod("carte")} /> Paiement par carte bancaire
                                    </label>
                                    {paymentMethod === "carte" && (
                                        <div className="mt-4 p-4 border rounded bg-gray-100">
                                            <p className="font-semibold text-sm mb-2">Les cartes acceptées incluent Mastercard et Visa.</p>
                                            
                                            <label className="block text-sm font-medium">Numéro de carte</label>
                                            <Input type="text" name="cardNumber" value={cardDetails.cardNumber} onChange={handleCardChange} placeholder="1234 1234 1234 1234" required maxLength="19" className="mt-1 mb-3"/>
                                            {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium">Date d'expiration (MM/AA)</label>
                                                    <Input type="text" name="expiryDate" value={cardDetails.expiryDate} onChange={handleCardChange} placeholder="MM / AA" required maxLength="5" className="mt-1"/>
                                                    {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium">Code de sécurité (CVC)</label>
                                                    <Input type="text" name="cvc" value={cardDetails.cvc} onChange={handleCardChange} placeholder="CVC" required maxLength="3" className="mt-1"/>
                                                    {errors.cvc && <p className="text-red-500 text-sm">{errors.cvc}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div> */}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* {isOpen && <ConfirmModal isOpen={isOpen} onClose={() => setIsOpen(false)} 
                message="Voulez vous vraiment passer la commande ?"
                onConfirm={() => {
                    setIsOpen(false);
                    passerCommande();
            }}/> } */}
        </section>
    );
};

export default Checkout;
