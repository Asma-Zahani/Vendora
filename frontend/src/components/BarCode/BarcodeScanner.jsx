import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";

const BarcodeScanner = () => {
    const [scanResult, setScanResult] = useState(null);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner("reader", {
            qrbox: {
                width: 250,
                height: 250
            },
            fps: 5,
        }, );

        scanner.render(success, error);

        function success(result) {
            scanner.clear();
            setScanResult(result);
        }

        function error() {
            console.log(error);
        }
    }, [])    

    return (
        <div>
            <h2>Scanner un code-barres</h2>
            {scanResult 
            ? <div>Success: <a href={"http://"+scanResult}>{scanResult}</a></div>
            : <div className="flex flex-col justify-center items-center" id="reader"></div>
            }
        </div>
    );
};

export default BarcodeScanner;