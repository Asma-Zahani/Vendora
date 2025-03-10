import { useEffect, useState } from "react";
import Header from "../Header";
import { getCommandesLivraisons, getCommandeLivraison } from "@/service/CommandeLivraisonService";
import { getEtatCommandes } from "@/service/EnumsService";
import { getClients } from "@/service/UsersService";
import { Package } from "lucide-react";
import FilteredTable from "@/components/Tables/FilteredTable";

const CommandeLivraison = () => {
  const [formData, setFormData] = useState({etatCommande: ""});
  
  const [commandesLivraisons, setCommandesLivraisons] = useState([]);
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
    { label: "Date de Livraison", key: "dateLivraison", type: "date" },
    { label: "Actions", key: "actions", type: "actions" }
  ];
  
  const fields = [
    { label: "État Commande", key: "etatCommande", type: "dropdown", options: etatCommandeOptions },
  ];
  
  useEffect(() => { (async () => setCommandesLivraisons(await getCommandesLivraisons()))()}, [commandesLivraisons]);

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

  const handleCommandeLivraison = async (commande_id) => {
    try {
      const commandeLivraison = await getCommandeLivraison(commande_id);

      const formattedCommandeLivraison = { 
        ...commandeLivraison.commande, 
        ...commandeLivraison 
      };
      
      setFormData(formattedCommandeLivraison);
    } catch (error) {
      console.error("Erreur lors de la récupération du categorie:", error);
      alert('Une erreur est survenue lors de la récupération du categorie');
    }
  };

  const formattedCommandesLivraisons = commandesLivraisons.map(({ commande, ...rest }) => ({
    ...commande,
    ...rest,
    actions: {
      view: () => handleCommandeLivraison(commande.commande_id),
      switch: () => handleCommandeLivraison(commande.commande_id),
      facture: () => handleCommandeLivraison(commande.commande_id),
    }
  }));
  

  const formActions = {formData, setFormData, fields, columns};
  
  return (
    <>
      <Header title="Commandes Livraisons" icon={Package} parent="Gestion des commandes" current="Commandes / Livraisons" />
      {<FilteredTable formActions={formActions} label={"commandesLivraisons"} datas={formattedCommandesLivraisons} identifiant={"commande_id"} />}
    </>
  );
};

export default CommandeLivraison;
