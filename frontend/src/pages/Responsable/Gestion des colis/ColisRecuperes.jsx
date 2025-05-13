import { PackageCheck } from "lucide-react";
import Header from "@/components/Header/DashboardSubHeader";

export const ColisRecuperes = () => {
  return (
    <>
      <Header title="Colis récupérés" icon={PackageCheck} parent="Gestion des colis" current="Colis récupérés" />
    </>
  );
};

export default ColisRecuperes;
