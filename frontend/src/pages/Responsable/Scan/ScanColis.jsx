import { ScanBarcode } from "lucide-react";
import Header from "@/components/Header/DashboardSubHeader";
import BarcodeScanner from "@/components/BarCode/BarcodeScanner";

export const ScanColis = () => {
  return (
    <>
      <Header title="Scanner un colis" icon={ScanBarcode} parent="Scan" current="Scanner un colis" />
      <section className="mx-6 py-6 space-y-6">
        <BarcodeScanner />
      </section>
    </>
  );
};

export default ScanColis;