import { useState, useEffect , useContext} from "react";
import Header from "../Header";
import { Users } from "lucide-react";
import EntityManager from "../EntityManager";
import { getEntities } from "@/service/EntitesService";
import { UserContext } from "@/utils/UserContext";
const ClientsLivreur = () => {

  const [clients, setClients] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("Tous");

  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchClientsAvecCommandes = async () => {
      try {
        const commandes = await getEntities("commandeLivraisons");
        const allClients = await getEntities("users"); // ou "clients" selon ton API
  
        const commandesFiltrees = commandes
          .filter(cmd => {
            const livreurId = typeof cmd.livreur_id === "object" && cmd.livreur_id !== null
              ? cmd.livreur_id.id
              : cmd.livreur_id;
  
            const estLivreur = Number(livreurId) === Number(user.id);
            const etat = cmd.commande?.etatCommande;
  
            return selectedFilter === "Tous" ? estLivreur : estLivreur && etat === selectedFilter;
          });
  
        const idsClientsAjoutes = new Set();
        const clientsAvecCommandes = [];
  
        commandesFiltrees.forEach(cmd => {
          const clientId = cmd.commande?.client_id;
          if (clientId && !idsClientsAjoutes.has(clientId)) {
            const clientDetails = allClients.find(client => client.id === clientId);
            if (clientDetails) {
              idsClientsAjoutes.add(clientId);
              clientsAvecCommandes.push(clientDetails);
            }
          }
        });
  
        setClients(clientsAvecCommandes);
      } catch (error) {
        console.error("Erreur lors de la récupération des clients :", error);
      }
    };
  
    fetchClientsAvecCommandes();
  }, [user.id, selectedFilter]);
  

  const columns = [
    { label: "Client", type: "nomComplete" },
    { label: "Téléphone", key: "telephone", type: "text" },
    { label: "Email", key: "email", type: "text" },
    { label: "Date de naissance", key: "date_naissance", type: "date" },
  ];

  return (
    <>
      <Header title="Clients" icon={Users} parent="Gestion des utilisateurs" current="Clients" />
      <EntityManager
        columns={columns}
        label="clients"
        identifiant="client_id"
        data={clients} 
        actionList={[]}
        notAdd={true}
      />
    </>
  );
};

export default ClientsLivreur;
