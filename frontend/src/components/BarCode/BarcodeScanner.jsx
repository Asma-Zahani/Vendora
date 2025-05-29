import { Html5QrcodeScanner } from "html5-qrcode";
import { useContext, useEffect, useState } from "react";
import { getEntity } from "@/service/EntitesService";
import { SquareCheckBig } from "lucide-react";
import UserContext from '@/utils/UserContext';
import { Link } from "react-router";

const BarcodeScanner = () => {
    const { user } = useContext(UserContext);
    const [scanResult, setScanResult] = useState(null);
    const [commande, setCommande] = useState();
    const [path, setPath] = useState();

    useEffect(() => {
        const fetchData = async () => {
            if (!scanResult) return;

            let entityType = user.role === "livreur" ? "commandeLivraison" : "commandeDrive";
            const data = await getEntity(entityType, scanResult);
            setCommande(data);
        };

        fetchData();
    }, [scanResult, user.role]);

    useEffect(() => {
        if (!commande || !scanResult) return;

        const id = scanResult.split('/').pop();
        const etat = commande.etatCommande;

        if (user.role === "responsable" && commande.commande_retrait_drive) {
            switch (etat) {
                case "En attente":
                    setPath(`/colisATraiter?id=${id}`);
                    break;
                case "Préparée":
                    setPath(`/colisPrets?id=${id}`);
                    break;
                case "Retirée":
                    setPath(`/colisRecuperes?id=${id}`);
                    break;
                case "Annulée":
                    setPath(`/colisAnnulesDrive?id=${id}`);
                    break;
                default:
                    setPath(`/scanColis`);
            }
        } else if (user.role === "livreur" && commande.commande_livraison) {
            switch (etat) {
                case "En attente":
                    setPath(`/colisALivrer?id=${id}`);
                    break;
                case "En cours de livraison":
                    setPath(`/colisEnCours?id=${id}`);
                    break;
                case "Livrée":
                    setPath(`/colisLivrees?id=${id}`);
                    break;
                case "Annulée":
                    setPath(`/ColisAnnulesLivraison?id=${id}`);
                    break;
                default:
                    setPath(`/scanColis`);
            }
        } else {
            setPath(`/scanColis`);
        }
    }, [commande, scanResult, user.role]);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner("reader", {
            qrbox: { width: 250, height: 250 },
            fps: 5,
        });

        scanner.render(success, error);

        function success(result) {
            scanner.clear();
            setScanResult(result);
        }

        function error(err) {
            console.log(err);
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center space-y-6 bg-customLight dark:bg-customDark shadow-lg rounded-2xl p-6 w-full mx-auto">
            <h2 className="text-2xl font-semibold">Scanner un code-barres</h2>

            {scanResult ? (
                <div className="text-green-600 text-center">
                    <p className="mb-2 flex gap-1 items-center font-medium"><SquareCheckBig size={20}/> Code scanné avec succès :</p>
                    <Link to={path} className="text-blue-600 hover:underline break-all">
                        #{scanResult}
                    </Link>
                </div>

            ) : (
                <div id="reader" className="border border-gray-300 dark:border-borderDark rounded-lg p-4 w-full flex flex-col items-center justify-center"/>
            )}
        </div>
    );
};

export default BarcodeScanner;