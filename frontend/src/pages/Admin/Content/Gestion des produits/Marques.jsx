import { useEffect, useState } from "react";
import Header from "../Header";
import { getMarques, createMarque, deleteMarque, getMarque, updateMarque } from "@/service/MarqueService";
import { Bookmark } from "lucide-react";
import FilteredTable from "@/components/Tables/FilteredTable";

const Marques = () => {
  const [marques, setMarques] = useState([]);

  const [formData, setFormData] = useState({nom: "", image: ""});
  const columns = [
    { label: "Nom", key: "nom", type: "text" },
    { label: "Image", key: "image", type: "img" },
    { label: "Date de création", key: "created_at", type: "date" },
    { label: "Actions", key: "actions", type: "actions" }
  ];
  const fields = [
    { label: "Nom", key: "nom", type: "text" },
    { label: "Image", key: "image", type: "image" },
  ];

  useEffect(() => { (async () => setMarques(await getMarques()))()}, [marques]);

  const handleMarque = async (marque_id) => {
    try {
      const marque = await getMarque(marque_id);
      setFormData(marque);
    } catch (error) {
      console.error("Erreur lors de la récupération du Marque:", error);
      alert('Une erreur est survenue lors de la récupération du Marque');
    }
  };
  const handleCreate = async () => {
    try {
      await createMarque(formData);
      setMarques((prevMarques) => prevMarques.filter(Marque => Marque.marque_id !== formData.marque_id));
      alert(`Marque ajouter avec succès`);
    } catch (error) {
      console.error("Erreur d'ajout:", error);
      alert('Une erreur est survenue lors de l\'ajout du Marque');
    }
  }; 
  const handleEdit = async () => {
    try {      
      await updateMarque(formData.marque_id, formData);
      setMarques((prevMarques) => prevMarques.filter(Marque => Marque.marque_id !== formData.marque_id));
      alert(`Marque avec l'ID ${formData.marque_id} modifié avec succès`);
    } catch (error) {
      console.error("Erreur de modification:", error);
      alert("Une erreur est survenue lors de la modification du Marque");
    }
  };
  const handleDelete = async (marque_id) => {
    try {
      await deleteMarque(marque_id);
      setMarques((prevPosts) => prevPosts.filter(post => post.marque_id !== marque_id));
      alert(`Marque with marque_id ${marque_id} supprimé avec succès`);
    } catch (error) {
      console.error("Erreur de suppression:", error);
      alert('Une erreur est survenue lors de la suppression du Marque');
    }
  };

  const formattedMarques = marques.map((item) => ({ ...item,
    actions: {
      edit: () => handleMarque(item.marque_id),
      delete: (marque_id) => handleDelete(marque_id)
    }
  }));

  const formActions = {formData, setFormData, fields, handleCreate, handleEdit, columns};

  return (
    <>
      <Header title="Marques" icon={Bookmark} parent="Gestion des produits" current="Marques" />
      <FilteredTable formActions={formActions} label={"Marques"} datas={formattedMarques} identifiant={"marque_id"}/>
    </>
  );
};

export default Marques;
