import { Package } from "lucide-react";
import Header from "@/components/Header/DashboardSubHeader";

export const ColisPrets = () => {
  return (
    <>
      <Header title="Colis prêts" icon={Package} parent="Gestion des colis" current="Colis prêts" />
    </>
  );
};

export default ColisPrets;
