import { useState, useEffect, useContext } from "react";
import Header from "../Header";
import { Truck } from "lucide-react";
import EntityManager from "../EntityManager";
import { getEntities } from "@/service/EntitesService";
import { UserContext } from "@/utils/UserContext";

const HistoriqueCommandes = () => {
  const [formData, setFormData] = useState({etatCommande: ""});
  const [allData, setAllData] = useState([]);
  const { user } = useContext(UserContext);
  const [etatCommandeOptions, setEtatCommandeOptions] = useState([]); 
  const [selectedFilter, setSelectedFilter] = useState("Tous");

  const [clients, setClients] = useState([]);
  const filtres = { field: "etatCommande", value: ['Tous', 'En attente', 'Livrée', 'Annulée'], selectedFilter, setSelectedFilter};


  useEffect(() => {
    const fetchData = async () => {
      try {
        setClients(await getEntities("users"));
        setEtatCommandeOptions(await getEntities("etatCommandes"));
        const commandes = await getEntities("commandeLivraisons");
  
        const commandesFiltrees = commandes
          .filter(cmd => {
            const livreurId = typeof cmd.livreur_id === 'object' && cmd.livreur_id !== null
              ? cmd.livreur_id.id
              : cmd.livreur_id;
  
            const estLivreur = Number(livreurId) === Number(user.id);
            const etat = cmd.commande?.etatCommande;
  
            return selectedFilter === "Tous" ? estLivreur : estLivreur && etat === selectedFilter;
          })
          .map(cmd => ({
            ...cmd,
            client_id: cmd.commande?.client_id ?? null,
            etatCommande: cmd.commande?.etatCommande ?? "",
            created_at: cmd.commande?.created_at ?? cmd.created_at,
          }));
  
        setAllData(commandesFiltrees);
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
      }
    };
  
    fetchData();
  }, [user.id, selectedFilter]);


  const columns = [
    { label: "Num°", key: "commande_id" , type: "text", prefix: "#" },   
    { label: "Client", key: "client_id", type: "id", options: clients.map(client => ({ value: client.id, label: client.prenom + " " + client.nom }))},    
    { label: "Adresse Livraison",key: "adresse_livraison" , type: "text"  }, 
    { label: "Date", key: "created_at", type: "date" },
  ];

  const fields = [
    { label: "État Commande", key: "etatCommande", type: "dropdown", options: etatCommandeOptions },
  ];


  return (
    <>
      <Header title="Historique Commandes" icon={Truck} parent="Commandes" current="Historique" />
      <EntityManager filtres={filtres} notAdd={true} columns={columns} fields={fields} label="commande Livraisons" identifiant="commande_id" formData={formData} setFormData={setFormData} data={allData} actionList={[]} />

    </>
  );
};

export default HistoriqueCommandes;
