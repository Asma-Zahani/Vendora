import { useEffect, useState } from "react";
import Header from "../Header";
import { getCommandesRetraitDrives, getCommandeRetraitDrive } from "@/service/CommandeRetraitDriveService";
import { getEtatCommandes } from "@/service/EnumsService";
import { getClients } from "@/service/ClientService";
import { Package } from "lucide-react";
import FilteredTable from "@/components/Tables/FilteredTable";

const CommandeRetraitDrive = () => {
  const [formData, setFormData] = useState({
    client_id: "",
    code_promotion_id: "",
    total: 0,
    etatCommande: "",
    horaireRetrait: ""
  });
  
  const [commandesRetraitDrives, setCommandesRetraitDrives] = useState([]);
  const [clients, setClients] = useState([]);
  const [etatCommandeOptions, setEtatCommandeOptions] = useState([]);

  const dropdownOptions = {    
    client_id: clients.map(client => ({ value: client.id, label: client.prenom + " " + client.nom }))
  };

  const columns = [
    { label: "Num°", key: "commande_id", type: "text" },
    { label: "Client", key: "client_id", type: "id", options: dropdownOptions.client_id},
    { label: "Total", key: "total", type: "text" },
    { label: "État Commande", key: "etatCommande", type: "enum" },
    { label: "Date de création", key: "created_at", type: "date" },
    { label: "Date de Retrait", key: "horaireRetrait", type: "date" },
    { label: "Point de vente", key: "commande_id", type: "text" },
    { label: "Actions", key: "actions", type: "actions" }
  ];
  
  const fields = [
    { label: "État Commande", key: "etatCommande", type: "dropdown", options: etatCommandeOptions },
  ];
  
  useEffect(() => { (async () => setCommandesRetraitDrives(await getCommandesRetraitDrives()))()}, [commandesRetraitDrives]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setClients(await getClients());
        setEtatCommandeOptions(await getEtatCommandes());
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchData();
  }, []);

  const handleCommandeRetraitDrive = async (commande_id) => {
    try {
      const categorie = await getCommandeRetraitDrive(commande_id);
      setFormData(categorie);
    } catch (error) {
      console.error("Erreur lors de la récupération du categorie:", error);
      alert('Une erreur est survenue lors de la récupération du categorie');
    }
  };

  const formattedCommandesRetraitDrives = commandesRetraitDrives.map(({ commande, ...rest }) => ({
    ...commande,
    ...rest,
    actions: {
      view: () => handleCommandeRetraitDrive(commande.commande_id),
      switch: () => handleCommandeRetraitDrive(commande.commande_id),
      facture: () => handleCommandeRetraitDrive(commande.commande_id),
    }
  }));
  

  const formActions = {formData, setFormData, fields, columns};

  return (
    <>
      <Header title="Commandes Retrait Drives" icon={Package} parent="Gestion des commandes" current="Commandes / Retrait Drives" />
      {<FilteredTable formActions={formActions} label={"commandesRetraitDrives"} datas={formattedCommandesRetraitDrives} identifiant={"commande_id"} />}
    </>
  );
};

export default CommandeRetraitDrive;
