import { useEffect, useState } from "react";
import Header from "../Header";
import { getLivreurs, getLivreur, createLivreur, updateLivreur, deleteLivreur } from "@/service/LivreurService";
import { Truck } from "lucide-react";
import FilteredTable from "@/components/Tables/FilteredTable";

const Livreurs = () => {
  const [formData, setFormData] = useState({ nom: "", prenom: "", telephone: "", email: "", password: "", password_confirmation: "", date_naissance: "", genre: "" });
  
  const [livreurs, setLivreurs] = useState([]);

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
  

  useEffect(() => { (async () => setLivreurs(await getLivreurs()))()}, [livreurs]);

  const handleLivreur = async (id) => {
    try {
      setFormData(await getLivreur(id));
    } catch (error) {
      console.error("Erreur lors de la récupération du livreur:", error);
      alert('Une erreur est survenue lors de la récupération du livreur');
    }
  };
  const handleCreate = async () => {
    try {
      await createLivreur(formData);
      setLivreurs((prevLivreurs) => prevLivreurs.filter(livreur => livreur.id !== formData.id));
      alert(`Livreur ajouter avec succès`);
    } catch (error) {
      console.error("Erreur d'ajout:", error);
      alert('Une erreur est survenue lors de l\'ajout du livreur');
    }
  }; 
  const handleEdit = async () => {
    try {      
      await updateLivreur(formData.id, formData);
      setLivreurs((prevLivreurs) => prevLivreurs.filter(livreur => livreur.id !== formData.id));
      alert(`Livreur avec l'ID ${formData.id} modifié avec succès`);
    } catch (error) {
      console.error("Erreur de modification:", error);
      alert("Une erreur est survenue lors de la modification du livreur");
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteLivreur(id);
      setLivreurs((prevPosts) => prevPosts.filter(post => post.id !== id));
      alert(`Livreur with id ${id} supprimé avec succès`);
    } catch (error) {
      console.error("Erreur de suppression:", error);
      alert('Une erreur est survenue lors de la suppression du livreur');
    }
  };

  const formattedLivreurs = livreurs.map((item) => ({ ...item,
    actions: {
      edit: () => handleLivreur(item.id),
      delete: (id) => handleDelete(id)
    }
  }));

  const formActions = {formData, setFormData, fields, handleCreate, handleEdit, columns};

  return (
    <>
      <Header title="Livreurs" icon={Truck} parent="Gestion des utilisateurs" current="Livreurs" />
      <FilteredTable formActions={formActions} label={"livreurs"} datas={formattedLivreurs} identifiant={"id"}/>
    </>
  );
};

export default Livreurs;
