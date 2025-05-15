import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import { getEntity } from "@/service/EntitesService";
import { SquareCheckBig } from "lucide-react";

const BarcodeScanner = () => {
    const [scanResult, setScanResult] = useState(null);
    const [commande, setCommande] = useState();
    const [path, setPath] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setCommande(await getEntity("commande", scanResult));   
        };
        if (scanResult != null) {fetchData()}
    }, [scanResult]);  

    useEffect(() => {
        if (commande?.commande_retrait_drive) {
            if (commande.etatCommande === "En attente") {
                setPath(`/colisATraiter?id=${scanResult.split('/').pop()}`);
            } else if (commande.etatCommande === "Préparée") {
                setPath(`/colisPrets?id=${scanResult.split('/').pop()}`);
            } else if (commande.etatCommande === "Retirée") {
                setPath(`/colisRecuperes?id=${scanResult.split('/').pop()}`);
            }
        } else if (commande?.commande_livraison) {
            if (commande.etatCommande === "En attente") {
                setPath(`/colisALivrer?id=${scanResult.split('/').pop()}`);
            } else if (commande.etatCommande === "En cours de livraison") {
                setPath(`/colisEnCours?id=${scanResult.split('/').pop()}`);
            } else if (commande.etatCommande === "Livrée") {
                setPath(`/colisLivrees?id=${scanResult.split('/').pop()}`);
            }
        }
    }, [commande, scanResult]);  
    
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
                    <button className="text-blue-600 hover:underline break-all" onClick={() => window.location.href = path}>
                        #{scanResult}
                    </button>
                </div>

            ) : (
                <div id="reader" className="border border-gray-300 dark:border-borderDark rounded-lg p-4 w-full flex flex-col items-center justify-center"/>
            )}
        </div>
    );
};

export default BarcodeScanner;