import { Clock, Home, PackageX, Store } from "lucide-react";
import Header from "@/components/Header/DashboardSubHeader";
import StatCard from "@/components/Statistics/StatCard";
import { useEffect, useState } from "react";
import { getEntities } from "@/service/EntitesService";

export const Dashboard = () => {
  const [retraitDrivesParEtat, setRetraitDrivesParEtat] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setRetraitDrivesParEtat(await getEntities("retraitDrivesParEtat"));
      } catch (error) {
        console.error("Erreur lors de la récupération :", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header title="Tableau de bord" icon={Home} parent="Tableau de bord" />
      <section className="mx-6 py-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Colis à traiter" value={retraitDrivesParEtat ? retraitDrivesParEtat['En attente'] : 0} icon={<Store />} />
          <StatCard title="Colis prêts" value={retraitDrivesParEtat ? retraitDrivesParEtat['Préparée'] : 0} icon={<Clock />} />
          <StatCard title="Colis retirés" value={retraitDrivesParEtat ? retraitDrivesParEtat['Retirée'] : 0} icon={<PackageX />} />
        </div>
      </section>
    </>
  );
};

export default Dashboard;
