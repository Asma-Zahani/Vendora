import { useEffect, useState } from "react";
import Header from "../Header";
import { getFournisseurs, getFournisseur, createFournisseur, updateFournisseur, deleteFournisseur } from "@/service/FournisseurService";
import { Briefcase } from "lucide-react";
import FilteredTable from "@/components/Tables/FilteredTable";

const Fournisseurs = () => {
  const [formData, setFormData] = useState({ nom: "", prenom: "", telephone: "", email: "", password: "", password_confirmation: "", date_naissance: "", genre: "" });
  
  const [fournisseurs, setFournisseurs] = useState([]);

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
  

  useEffect(() => { (async () => setFournisseurs(await getFournisseurs()))()}, [fournisseurs]);

  const handleFournisseur = async (id) => {
    try {
      console.log(id);
      const fournisseur = await getFournisseur(id);
      setFormData(fournisseur);
    } catch (error) {
      console.error("Erreur lors de la récupération du fournisseur:", error);
      alert('Une erreur est survenue lors de la récupération du fournisseur');
    }
  };
  const handleCreate = async () => {
    try {
      await createFournisseur(formData);
      setFournisseurs((prevFournisseurs) => prevFournisseurs.filter(fournisseur => fournisseur.id !== formData.id));
      alert(`Fournisseur ajouter avec succès`);
    } catch (error) {
      console.error("Erreur d'ajout:", error);
      alert('Une erreur est survenue lors de l\'ajout du fournisseur');
    }
  }; 
  const handleEdit = async () => {
    try {      
      await updateFournisseur(formData.id, formData);
      setFournisseurs((prevFournisseurs) => prevFournisseurs.filter(fournisseur => fournisseur.id !== formData.id));
      alert(`Fournisseur avec l'ID ${formData.id} modifié avec succès`);
    } catch (error) {
      console.error("Erreur de modification:", error);
      alert("Une erreur est survenue lors de la modification du fournisseur");
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteFournisseur(id);
      setFournisseurs((prevFournisseurs) => prevFournisseurs.filter(fournisseur => fournisseur.id !== formData.id));
      alert(`Fournisseur with id ${id} supprimé avec succès`);
    } catch (error) {
      console.error("Erreur de suppression:", error);
      alert('Une erreur est survenue lors de la suppression du fournisseur');
    }
  };

  const formattedFournisseurs = fournisseurs.map((item) => ({ ...item,
    actions: {
      edit: () => handleFournisseur(item.id),
      delete: (id) => handleDelete(id)
    }
  }));

  const formActions = {formData, setFormData, fields, handleCreate, handleEdit, columns};

  return (
    <>
      <Header title="Fournisseurs" icon={Briefcase} parent="Gestion des utilisateurs" current="Fournisseurs" />
      <FilteredTable formActions={formActions} label={"fournisseurs"} datas={formattedFournisseurs} identifiant={"id"} />
    </>
  );
};

export default Fournisseurs;
