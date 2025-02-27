import { useEffect, useState } from "react";
import Header from "../Header";
import { getCategories, getCategorie, createCategorie, updateCategorie, deleteCategorie } from "@/service/CategorieService";
import { Layers2Icon } from "lucide-react";
import FilteredTable from "@/components/Tables/FilteredTable";

const FactureFournisseurs = () => {
  const [formData, setFormData] = useState({categorie_id: "", title: "", image: "", rang: "" });
  const [categories, setCategories] = useState([]);

  const columns = [
    { label: "Titre", key: "titre", type: "text" },
    { label: "Image", key: "image", type: "img" },
    { label: "Date de création", key: "created_at", type: "date" },
    { label: "Rang", key: "rang", type: "progress" },
    { label: "Actions", key: "actions", type: "actions" }
  ];
  const fields = [
    { label: "Titre", key: "titre", type: "text" },
    { label: "Rang", key: "rang", type: "number" },
    { label: "Image", key: "image", type: "image" }
  ];

  useEffect(() => { (async () => setCategories(await getCategories()))()}, [categories]);

  const handleCategorie = async (categorie_id) => {
    try {
      const categorie = await getCategorie(categorie_id);
      setFormData(categorie);
    } catch (error) {
      console.error("Erreur lors de la récupération du categorie:", error);
      alert('Une erreur est survenue lors de la récupération du categorie');
    }
  };
  const handleCreate = async () => {
    try {
      await createCategorie(formData);
      setCategories((prevCategories) => prevCategories.filter(categorie => categorie.categorie_id !== formData.categorie_id));
      alert(`Categorie ajouter avec succès`);
    } catch (error) {
      console.error("Erreur d'ajout:", error);
      alert('Une erreur est survenue lors de l\'ajout du categorie');
    }
  }; 
  const handleEdit = async () => {
    try {      
      await updateCategorie(formData.categorie_id, formData);
      setCategories((prevCategories) => prevCategories.filter(categorie => categorie.categorie_id !== formData.categorie_id));
      alert(`Categorie avec l'ID ${formData.categorie_id} modifié avec succès`);
    } catch (error) {
      console.error("Erreur de modification:", error);
      alert("Une erreur est survenue lors de la modification du categorie");
    }
  };
  const handleDelete = async (categorie_id) => {
    try {
      console.log(categorie_id);
      
      await deleteCategorie(categorie_id);
      setCategories((prevCategories) => prevCategories.filter(categorie => categorie.categorie_id !== formData.categorie_id));
      alert(`Categorie with id ${categorie_id} supprimé avec succès`);
    } catch (error) {
      console.error("Erreur de suppression:", error);
      alert('Une erreur est survenue lors de la suppression du categorie');
    }
  };

  const formattedCategories = categories.map((item) => ({ ...item,
    actions: {
      edit: () => handleCategorie(item.categorie_id),
      delete: (categorie_id) => handleDelete(categorie_id)
    }
  }));

  const formActions = {formData, setFormData, fields, handleCreate, handleEdit, columns};

  return (
    <>
      <Header title="Categories" icon={Layers2Icon} parent="Gestion des produits" current="Categories" />
      <FilteredTable formActions={formActions} label={"categories"} datas={formattedCategories} identifiant={"categorie_id"} />
    </>
  );
};

export default FactureFournisseurs;
