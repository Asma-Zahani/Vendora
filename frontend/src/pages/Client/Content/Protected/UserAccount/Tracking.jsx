import { useState } from "react";
import { PackageSearch, CheckCircle, Clock, XCircle } from "lucide-react";
import { getEntity } from "@/service/EntitesService";

const Tracking = () => {
    const [orderId, setOrderId] = useState("");
    const [commande, setCommande] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        setError(null);
        setCommande(null);
        
        if (!orderId) {
            setError("Veuillez entrer un numéro de commande valide.");
            return;
        }

        try {
            const commandeLivraison = await getEntity("commandeLivraisons", orderId);
    
            const formattedCommandeLivraison = { 
            ...commandeLivraison.commande, 
            ...commandeLivraison 
            };
            
            setCommande(formattedCommandeLivraison);
        } catch (error) {
            console.error("Erreur lors de la récupération du categorie:", error);
            alert('Une erreur est survenue lors de la récupération du categorie');
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "préparé":
                return <Clock className="text-yellow-500" size={24} />;
            case "expédié":
                return <CheckCircle className="text-blue-500" size={24} />;
            case "livré":
                return <CheckCircle className="text-green-500" size={24} />;
            case "annulé":
                return <XCircle className="text-red-500" size={24} />;
            default:
                return <PackageSearch className="text-gray-500" size={24} />;
        }
    };

    return (
        <div className="col-span-2 w-full py-2 space-y-5">
            <div className="overflow-hidden bg-customLight dark:bg-customDark border border-contentLight dark:border-borderDark rounded-lg p-6 shadow-sm">
                <h1 className="text-lg font-semibold mb-4">Suivi de Commande</h1>
                <div className="flex gap-4 mb-4">
                    <input 
                        type="text" 
                        className="border px-4 py-2 w-full rounded-lg" 
                        placeholder="Entrez votre numéro de commande"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                    />
                    <button 
                        className="bg-purpleLight text-white px-4 py-2 rounded-lg"
                        onClick={handleSearch}
                    >
                        Rechercher
                    </button>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                {commande && (
                    <div className="mt-4 p-4 border rounded-lg bg-gray-100 dark:bg-gray-800">
                        <h2 className="text-lg font-semibold">Commande #{commande.id}</h2>
                        <p className="mt-2">Date : {commande.date}</p>
                        <p className="mt-2 flex items-center gap-2">Statut : {getStatusIcon(commande.status)} {commande.status}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tracking;