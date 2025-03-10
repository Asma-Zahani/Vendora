import { useEffect, useState } from "react";
import Header from "../Header";
import { getClients, getUser, createClient, updateUser, deleteUser } from "@/service/UsersService";
import { Users } from "lucide-react";
import FilteredTable from "@/components/Tables/FilteredTable";

const Clients = () => {
  const [formData, setFormData] = useState({ nom: "", prenom: "", telephone: "", email: "", password: "", password_confirmation: "", date_naissance: "", genre: "" });
  
  const [clients, setClients] = useState([]);

  const columns = [
    { label: "Nom", key: "nom", type: "text" },
    { label: "Prénom", key: "prenom", type: "text" },
    { label: "Téléphone", key: "telephone", type: "text" },
    { label: "Email", key: "email", type: "text" },
    { label: "Date de naissance", key: "date_naissance", type: "date" },
    { label: "Genre", key: "genre", type: "text" },
    { label: "Actions", key: "actions", type: "actions" }
  ];  
  const fields = [
    { label: "Nom", key: "nom", type: "text" },
    { label: "Prénom", key: "prenom", type: "text" },
    { label: "Téléphone", key: "telephone", type: "text" },
    { label: "Email", key: "email", type: "email" },
    { label: "Date de naissance", key: "date_naissance", type: "date" },
    { label: "Genre", key: "genre", type: "genre" }
  ];
  

  useEffect(() => { (async () => setClients(await getClients()))()}, [clients]);

  const handleClient = async (id) => {
    try {
      const client = await getUser(id);
      setFormData(client);
    } catch (error) {
      console.error("Erreur lors de la récupération du client:", error);
      alert('Une erreur est survenue lors de la récupération du client');
    }
  };
  const handleCreate = async () => {
    try {
      await createClient(formData);
      setClients((prevClients) => prevClients.filter(client => client.id !== formData.id));
      alert(`Client ajouter avec succès`);
    } catch (error) {
      console.error("Erreur d'ajout:", error);
      alert('Une erreur est survenue lors de l\'ajout du client');
    }
  }; 
  const handleEdit = async () => {
    try {      
      await updateUser(formData.id, formData);
      setClients((prevClients) => prevClients.filter(client => client.id !== formData.id));
      alert(`Client avec l'ID ${formData.id} modifié avec succès`);
    } catch (error) {
      console.error("Erreur de modification:", error);
      alert("Une erreur est survenue lors de la modification du client");
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setClients((prevPosts) => prevPosts.filter(post => post.id !== id));
      alert(`Client with id ${id} supprimé avec succès`);
    } catch (error) {
      console.error("Erreur de suppression:", error);
      alert('Une erreur est survenue lors de la suppression du client');
    }
  };

  const formattedClients = clients.map((item) => ({ ...item,
    actions: {
      edit: () => handleClient(item.id),
      delete: (id) => handleDelete(id)
    }
  }));

  const formActions = {formData, setFormData, fields, handleCreate, handleEdit, columns};

  return (
    <>
      <Header title="Clients" icon={Users} parent="Gestion des utilisateurs" current="Clients" />
      <FilteredTable formActions={formActions} label={"clients"} datas={formattedClients} identifiant={"id"}/>
    </>
  );
};

export default Clients;
