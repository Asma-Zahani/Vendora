import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";

const BarcodeScanner = () => {
    const [scanResult, setScanResult] = useState(null);

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
                    <p className="mb-2 font-medium">✅ Code scanné avec succès :</p>
                    <button className="text-blue-600 underline break-all"
                        onClick={() => {
                        const idCommande = scanResult.split('/').pop();
                        window.location.href = `/colisPrets?id=${idCommande}`;
                        }}>
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