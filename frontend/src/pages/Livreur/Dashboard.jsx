import { Truck, MapPin, Clock, Home } from "lucide-react";
import Header from "@/components/Header/DashboardSubHeader";
import { useEffect, useState } from "react";
import { getEntities } from "@/service/EntitesService";
import StatCard from "@/components/Statistics/StatCard";

export const Dashboard = () => {
  const [commandesDuJour, setCommandesDuJour] = useState([]);
  const [commandesLivreurEnCours, setCommandesLivreurEnCours] = useState([]);
  const [livraisonsParEtat, setLivraisonsParEtat] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLivraisonsParEtat(await getEntities("livraisonsParEtat"));
        setCommandesDuJour(await getEntities("commandesLivreurJour"));
        setCommandesLivreurEnCours(await getEntities("commandesLivreurEnCours"));
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
          <StatCard title="Préparée à livrer" value={livraisonsParEtat ? livraisonsParEtat['Préparée'] : 0} icon={<Clock />} />
          <StatCard title="Annulées" value={livraisonsParEtat ? livraisonsParEtat['Annulée'] : 0} icon={<MapPin />} />
        </div>
        <div className="bg-customLight dark:bg-customDark p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">📋 Commandes à livrer aujourd&apos;hui</h2>            
          {commandesDuJour.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {commandesDuJour.map((commandeLivraison, index) => (
                  <div key={index} className="border border-gray-300 dark:border-borderDark rounded-xl p-5 dark:bg-contentDark shadow-md hover:shadow-xl transition-shadow">
                  <div className="mb-2">
                      <h3 className="flex gap-2 text-lg font-semibold text-gray-800 dark:text-white"
                        onClick={() => {window.location.href = `/colisALivrer?id=${commandeLivraison.commande_id}`}}>
                        Commande Num° : <p className="cursor-pointer hover:text-purpleLight hover:underline">{'#' + commandeLivraison.commande_id || "Nom inconnu"}</p>
                      </h3>
                      <p className="text-sm  text-gray-600 dark:text-gray-300 mt-1">
                        Client : {commandeLivraison.commande.client?.prenom + " " + commandeLivraison.commande.client?.nom}
                      </p>
                      <p className="text-sm  text-gray-600 dark:text-gray-300 mt-1">
                        Adresse : {commandeLivraison.commande.client?.adresse || "Adresse non fournie"}
                      </p>
                      <p className="text-sm  text-gray-600 dark:text-gray-300 mt-1">
                        Ville : {commandeLivraison.commande.client?.ville + ' - ' + commandeLivraison.commande.client?.region || "Adresse non fournie"}
                      </p>
                  </div>
                  </div>
              ))}
              </div>
          ) : (
              <p className="text-gray-500 dark:text-gray-300 text-center text-lg">Aucune commande à livrer aujourd&apos;hui.</p>
          )}
        </div>
        <div className="bg-customLight dark:bg-customDark p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">📋 Commandes en cours de livraison</h2>            
          {commandesLivreurEnCours.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {commandesLivreurEnCours.map((commandeLivraison) => {
                const client = commandeLivraison.commande.client || {};
                const villeRegion = client.ville && client.region ? `${client.ville} - ${client.region}` : "Adresse non fournie";
                return (
                  <div key={commandeLivraison.commande_id} className="border border-gray-300 dark:border-borderDark rounded-xl p-5 dark:bg-contentDark shadow-md hover:shadow-xl transition-shadow">
                    <div className="mb-2">
                      <h3 className="flex gap-2 text-lg font-semibold text-gray-800 dark:text-white cursor-pointer hover:text-purpleLight hover:underline"
                        onClick={() => { window.location.href = `/colisEnCours?id=${commandeLivraison.commande_id}` }}>
                        Commande Num° : {'#' + (commandeLivraison.commande_id || "Nom inconnu")}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Client : {client.prenom ? `${client.prenom} ${client.nom || ''}` : "Nom inconnu"}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Adresse : {client.adresse || "Adresse non fournie"}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Ville : {villeRegion}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-300 text-center text-lg">Aucune commande en cours.</p>
          )}
        </div>

      </section>
    </>
  );
};

export default Dashboard;
