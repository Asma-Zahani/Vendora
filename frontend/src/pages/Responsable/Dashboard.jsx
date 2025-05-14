import { Clock, Home, MapPin, Truck } from "lucide-react";
import Header from "@/components/Header/DashboardSubHeader";
import StatCard from "@/components/Statistics/StatCard";
import { useEffect, useState } from "react";
import { getEntities } from "@/service/EntitesService";

export const Dashboard = () => {
  const [livraisonsParEtat, setLivraisonsParEtat] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLivraisonsParEtat(await getEntities("livraisonsParEtat"));
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
          <StatCard title="Livraisons effectuées" value={livraisonsParEtat ? livraisonsParEtat['Livrée'] : 0} icon={<Truck />} />
          <StatCard title="En attente" value={livraisonsParEtat ? livraisonsParEtat['En attente'] : 0} icon={<Clock />} />
          <StatCard title="Annulées" value={livraisonsParEtat ? livraisonsParEtat['Annulée'] : 0} icon={<MapPin />} />
        </div>
      </section>
    </>
  );
};

export default Dashboard;
