/* eslint-disable react/prop-types */
import { Truck, MapPin, Clock } from "lucide-react";
import Header from "@/pages/Admin/Content/Header";
import { useEffect, useState } from "react";
import { getAuthenticatedEntities } from "@/service/EntitesService";

export const Dashboard = () => {
  const [commandesDuJour, setCommandesDuJour] = useState([]);
  const [livraisonsEffectuees, setLivraisonsEffectuees] = useState(0);
  const [livraisonsEnCours, setLivraisonsEnCours] = useState(0);
  const [livraisonsAnnulees, setLivraisonsAnnulees] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commandes = await getAuthenticatedEntities("commandesLivreurJour");
        setCommandesDuJour(commandes);
  
        const effectuees = await getAuthenticatedEntities("livraisonsEffectuees");
        setLivraisonsEffectuees(Array.isArray(effectuees) ? effectuees.length : 0);
  
        const enCours = await getAuthenticatedEntities("livraisonsEnCours");
        setLivraisonsEnCours(Array.isArray(enCours) ? enCours.length : 0);
        console.log(enCours);
  
        const annulees = await getAuthenticatedEntities("livraisonsAnnulees");
        setLivraisonsAnnulees(Array.isArray(annulees) ? annulees.length : 0);
      } catch (error) {
        console.error("Erreur lors de la récupération :", error);
      }
    };
    fetchData();
  }, []);
  

  return (
    <>
      <Header title="Tableau de bord" icon={Truck} parent="Tableau de bord" />
      <section className="mx-6 py-6 space-y-6">
        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Livraisons effectuées" value={livraisonsEffectuees} icon={<Truck />} />
          <StatCard title="En attente" value={livraisonsEnCours} icon={<Clock />} />
          <StatCard title="Annulées" value={livraisonsAnnulees} icon={<MapPin />} />
        </div>

        {/* Liste des commandes du jour */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-black dark:text-gray-600">📋 Commandes à livrer aujourd&apos;hui</h2>            


            {commandesDuJour.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {commandesDuJour.map((commande, index) => (
                    <div
                    key={index}
                    className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 bg-gradient-to-br from-purple-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-md hover:shadow-xl transition-shadow"
                    >
                    <div className="mb-2">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        Client : {commande.client?.nom || "Nom inconnu"}
                        </h3>
                        <p className="text-sm  text-gray-600 dark:text-gray-300 mt-1">
                        Adresse : {commande.client?.adresse || "Adresse non fournie"}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Heure prévue : {commande.commande_livraison?.dateLivraison || "Non définie"}
                        </p>
                    </div>
                    </div>
                ))}
                </div>
            ) : (
                <p className="text-gray-500 text-center text-lg">Aucune commande à livrer aujourd&apos;hui.</p>
            )}
            </div>
      </section>
    </>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-customLight dark:bg-customDark p-4 rounded-lg shadow-md flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-300">{title}</p>
      <h3 className="text-2xl font-bold">{value.toString()}</h3>
    </div>
    <div className="text-purpleLight">{icon}</div>
  </div>
);

export default Dashboard;
