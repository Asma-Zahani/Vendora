import { useEffect, useState } from "react";
import Header from "@/components/Header/DashboardSubHeader";
import { Package } from "lucide-react";
import EntityManager from "../EntityManager";
import { getEntities } from "@/service/EntitesService";

const CommandeLivraison = () => {
  const [selectedFilter, setSelectedFilter] = useState("Tous");
  const filtres = { field: "etatCommande", value: ['Tous', 'En attente', 'Retirée', 'Annulée'], selectedFilter, setSelectedFilter};
  const [etatCommandeOptions, setEtatCommandeOptions] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {  
        setClients(await getEntities("users"));
        setEtatCommandeOptions(await getEntities("etatCommandes"));
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchData();
  }, []);

  const [formData, setFormData] = useState({etatCommande: ""});

  const columns = [
    { label: "Num°", key: "commande_id", type: "text", prefix: "#" },
    { label: "Client", key: "client_id", type: "id", options: clients.map(client => ({ value: client.id, label: client.prenom + " " + client.nom }))},
    { label: "Total", key: "total", type: "enum" },
    { label: "État Commande", key: "etatCommande", type: "enum" },
    { label: "Actions", key: "actions", type: "actions" }
  ];
  
  const fields = [
    { label: "État Commande", key: "etatCommande", type: "dropdown", options: etatCommandeOptions },
  ];

  return (
    <>
      <Header title="Commandes Retrait Drives" icon={Package} parent="Gestion des commandes" current="Commandes / Retrait Drives" />
      <EntityManager filtres={filtres} notAdd={true} columns={columns} fields={fields} label="commandeRetraitDrives" identifiant="commande_id" formData={formData} setFormData={setFormData} actionList={["view", "switch", "facture"]} />
    </>
  );
};

export default CommandeLivraison;