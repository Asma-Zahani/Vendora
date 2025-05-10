import { useState, useEffect, useContext } from "react";
import Header from "@/components/Header/DashboardSubHeader";
import { Truck } from "lucide-react";
import EntityManager from "../EntityManager";
import { getEntities } from "@/service/EntitesService";
import { UserContext } from "@/utils/UserContext";

const CommandesEnCours = () => {
  const [formData, setFormData] = useState({});
  const [allData, setAllData] = useState([]);
  const { user } = useContext(UserContext);
  const [etatCommandeOptions, setEtatCommandeOptions] = useState([]); 

  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setClients(await getEntities("users"));
        setEtatCommandeOptions(await getEntities("etatCommandes"));
        const commandes = await getEntities("commandeLivraisons");
  
        const commandesFiltrees = commandes.filter(cmd => {
          let livreurId = cmd.livreur_id;
          if (typeof livreurId === 'object' && livreurId !== null) {
            livreurId = livreurId.id; 
          }

          return Number(livreurId) === Number(user.id) && cmd.commande.etatCommande === "En attente";
        });
  
        setAllData(commandesFiltrees);
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
      }
    };
    fetchData();
  }, [user.id]);
  
  
 
  const columns = [
    { label: "Num°", key: "commande_id" , type: "text", prefix: "#" },   
    { label: "Client", key: "client_id", type: "id", options: clients.map(client => ({ value: client.id, label: client.prenom + " " + client.nom }))},    
    { label: "Adresse Livraison",key: "adresse_livraison" , type: "text"  }, 
    { label: "Date", key: "created_at", type: "date" },
    { label: "Actions", key: "actions", type: "actions" },
  ];

  const fields = [
    { label: "État Commande", key: "etatCommande", type: "dropdown", options: etatCommandeOptions },
  ];


  return (
    <>
      <Header title="Commandes En Cours" icon={Truck} parent="Commandes" current="En Cours" />
      <EntityManager notAdd={true} columns={columns} fields={fields} label="commandeLivraisons" identifiant="commande_id" formData={formData} setFormData={setFormData} data={allData} actionList={["switch"]} />

    </>
  );
};

export default CommandesEnCours;
