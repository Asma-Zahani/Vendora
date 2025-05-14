import { useEffect, useState } from "react";
import Header from "@/components/Header/DashboardSubHeader";
import { PackageCheck } from "lucide-react";
import EntityManager from "@/service/EntityManager";
import { getEntities } from "@/service/EntitesService";

const ColisALivrer = () => {
  const [selectedFilter, setSelectedFilter] = useState("En attente");
  const filtres = { field: "etatCommande", selectedFilter, setSelectedFilter};
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
    { label: "État Commande", key: "etatCommande", type: "dropdown", options: etatCommandeOptions }
  ];

  return (
    <>
      <Header title="Colis récupérés" icon={PackageCheck} parent="Gestion des colis" current="Colis récupérés" />
      <EntityManager filtres={filtres} notAdd={true} columns={columns} fields={fields} label="commandeLivreur" identifiant="commande_id" formData={formData} setFormData={setFormData} actionList={["view", "switch", "facture"]} />
    </>
  );
};

export default ColisALivrer;