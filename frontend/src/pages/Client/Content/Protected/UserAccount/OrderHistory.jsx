import { useEffect, useState } from "react";
import { PackageX } from "lucide-react";
import { getAuthenticatedEntities } from "@/service/EntitesService";
import FacturePDF from "../FacturePDF";
import axios from "axios";
import Modal from "@/components/Modals/Modal";

const OrderHistory = () => {
    const [commandes, setCommandes] = useState([]);
    const [factures, setFactures] = useState([]); // Nouveau state pour stocker toutes les factures
    const [selectedFacture, setSelectedFacture] = useState(null); // Facture sélectionnée

    useEffect(() => {
        const fetchData = async () => {
            try {
                setCommandes(await getAuthenticatedEntities("commande/user"));
                
                // Charger toutes les factures avec un appel axios
                const response = await axios.get("http://127.0.0.1:8000/api/factureCommandes");
                
                // Vérifiez la réponse dans la console
                console.log("Factures récupérées:", response.data);
                
                setFactures(response.data); // Enregistrer les factures
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };
        fetchData();
    }, []);  // Cette dépendance est vide, donc l'effet se déclenche une seule fois lors du chargement du composant

    const handleVoirFacture = (commandeId) => {
        // Trouver la facture correspondante à la commande sélectionnée
        const facture = factures.find(facture => facture.commande_id === commandeId);
        console.log(facture);
        setSelectedFacture(facture); // Mettre à jour l'état avec la facture sélectionnée
    };

    return (
        <div className="col-span-2 w-full py-2 space-y-5">
            <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm">
                {commandes?.some(item => item.commande_retrait_drive) && <h1 className="text-lg font-semibold mb-4">Historique des commandes de Retrait Drive</h1>}
                <div className="grid grid-cols-1 gap-4 rounded-lg">
                    {!(commandes.length === 0 || !commandes.some(item => item.commande_retrait_drive)) ? (
                        <div className="overflow-x-auto scrollbar">
                            <table className="min-w-full border-collapse border border-borderGrayLight dark:border-borderDark">
                                <thead>
                                    <tr className="bg-contentLight dark:bg-contentDark">
                                        <th className="border border-gray-200 dark:border-borderDark px-4 py-6">Num °</th>
                                        <th className="border border-gray-200 dark:border-borderDark px-4 py-2">Date</th>
                                        <th className="border border-gray-200 dark:border-borderDark px-4 py-2">Total</th>
                                        <th className="border border-gray-200 dark:border-borderDark px-4 py-2">Status</th>
                                        <th className="border border-gray-200 dark:border-borderDark px-4 py-2">Point de Vente</th>
                                        <th className="border border-gray-200 dark:border-borderDark px-4 py-2">Date Retrait</th>
                                        <th className="border border-gray-200 dark:border-borderDark px-4 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {commandes.map((commande, index) => (
                                        <tr key={index} className="text-center">
                                            {commande.commande_retrait_drive ? (
                                                <>
                                                    <td className="border border-borderGrayLight dark:border-borderDark px-4 py-2">#{commande.commande_id}</td>
                                                    <td className="border border-borderGrayLight dark:border-borderDark px-4 py-2">{commande.created_at.slice(0, 10)}</td>
                                                    <td className="border border-borderGrayLight dark:border-borderDark px-4 py-2">${commande.total}</td>
                                                    <td className="border border-borderGrayLight dark:border-borderDark px-4 py-2">{commande.etatCommande}</td>
                                                    <td className="border border-borderGrayLight dark:border-borderDark px-4 py-2">{commande.commande_retrait_drive.drive.nom}</td>
                                                    <td className="border border-borderGrayLight dark:border-borderDark px-4 py-2">{commande.commande_retrait_drive.dateRetrait ? (commande.commande_retrait_drive.dateRetrait).slice(0, 10) : "Non Valide"}</td>
                                                    <td className="border border-borderGrayLight dark:border-borderDark px-4 py-2">
                                                        <button
                                                            onClick={() => handleVoirFacture(commande.commande_id)}
                                                            className="text-blue-500 hover:text-blue-700">Voir Facture</button>
                                                    </td>
                                                </>
                                            ) : null}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center text-center h-95">
                            <div className="flex flex-col max-w-lg">
                                <div className="p-3 mx-auto text-purpleLight">
                                    <PackageX size={80} />
                                </div>
                                <h1 className="mt-3 text-2xl font-semibold uppercase text-gray-800 dark:text-white">Aucune commande en retrait drive</h1>
                                <div className="pt-2 text-sm">
                                    <p>Vous n&apos;avez pas encore passé de commande en retrait drive.</p>
                                    <p>Parcourez nos produits et choisissez le retrait drive pour récupérer votre commande rapidement !</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Afficher la facture sélectionnée */}
            <Modal isOpen={selectedFacture !== null} onClose={() => setSelectedFacture(null)}>
  {selectedFacture && <FacturePDF facture={selectedFacture} />}
</Modal>


            <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm">
                {commandes?.some(item => item.commande_livraison) && <h1 className="text-lg font-semibold mb-4">Historique des commandes de Livraison</h1>}
                <div className="grid grid-cols-1 gap-4 rounded-lg">
                    {!(commandes.length === 0 || !commandes.some(item => item.commande_livraison)) ? (
                        <div className="overflow-x-auto scrollbar">
                            <table className="min-w-full border-collapse border border-borderGrayLight dark:border-borderDark">
                                <thead>
                                    <tr className="bg-contentLight dark:bg-contentDark">
                                        <th className="border border-gray-200 dark:border-borderDark px-4 py-6">Num °</th>
                                        <th className="border border-gray-200 dark:border-borderDark px-4 py-2">Date</th>
                                        <th className="border border-gray-200 dark:border-borderDark px-4 py-2">Total</th>
                                        <th className="border border-gray-200 dark:border-borderDark px-4 py-2">Status</th>
                                        <th className="border border-gray-200 dark:border-borderDark px-4 py-2">Date Livraison</th>
                                        <th className="border border-gray-200 dark:border-borderDark px-4 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {commandes.map((commande, index) => (
                                        <tr key={index} className="text-center">
                                            {commande.commande_livraison ? (
                                                <>
                                                    <td className="border border-borderGrayLight dark:border-borderDark px-4 py-2">#{commande.commande_id}</td>
                                                    <td className="border border-borderGrayLight dark:border-borderDark px-4 py-2">{commande.created_at.slice(0, 10)}</td>
                                                    <td className="border border-borderGrayLight dark:border-borderDark px-4 py-2">${commande.total}</td>
                                                    <td className="border border-borderGrayLight dark:border-borderDark px-4 py-2">{commande.etatCommande}</td>
                                                    <td className="border border-borderGrayLight dark:border-borderDark px-4 py-2"> {commande.commande_livraison.dateLivraison ? (commande.commande_livraison.dateLivraison).slice(0,10) :  "Non Valide"}</td>
                                                    <td className="border border-borderGrayLight dark:border-borderDark px-4 py-2">
                                                        <button
                                                            onClick={() => handleVoirFacture(commande.commande_id)}
                                                            className="text-blue-500 hover:text-blue-700">Voir Facture</button>
                                                    </td>
                                                </>
                                            ) : null}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center text-center h-95">
                            <div className="flex flex-col max-w-lg">
                                <div className="p-3 mx-auto text-purpleLight">
                                    <PackageX size={80} />
                                </div>
                                <h1 className="mt-3 text-2xl font-semibold uppercase text-gray-800 dark:text-white">Aucune commande en livraison</h1>
                                <div className="pt-2 text-sm">
                                    <p>Vous n&apos;avez pas encore passé de commande pour la livraison.</p>
                                    <p>Explorez notre boutique et passez votre première commande dès maintenant !</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Afficher la facture sélectionnée */}
            <Modal isOpen={selectedFacture !== null} onClose={() => setSelectedFacture(null)}>
  {selectedFacture && <FacturePDF facture={selectedFacture} />}
</Modal>
        </div>
    );
}; 

export default OrderHistory;
