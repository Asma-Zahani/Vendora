import { useEffect, useState } from "react";
import Header from "../Header";
import { getSousCategories, getSousCategorie, createSousCategorie, updateSousCategorie, deleteSousCategorie } from "@/service/SousCategorieService";
import { getCategories } from "@/service/CategorieService";
import { Layers3Icon } from "lucide-react";
import FilteredTable from "@/components/Tables/FilteredTable";

const SousCategories = () => {
  const [sousCategories, setSousCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const dropdownOptions = {    
    categorie_id: categories.map(cat => ({ value: cat.categorie_id, label: cat.titre }))
  };

  const [formData, setFormData] = useState({sous_categorie_id: "", titre: "", image: "", categorie_id: ""});
  const columns = [
    { label: "Titre", key: "titre", type: "text" },
    { label: "Categorie", key: "categorie_id", type: "id", options: dropdownOptions.categorie_id},
    { label: "Image", key: "image", type: "img" },
    { label: "Date de création", key: "created_at", type: "date" },
    { label: "Actions", key: "actions", type: "actions" }
  ];
  const fields = [
    { label: "Titre", key: "titre", type: "text" },
    { label: "Image", key: "image", type: "image" },
    { label: "Categorie", key: "categorie_id", type: "dropdown", options: dropdownOptions.categorie_id }
  ];
  
  useEffect(() => { (async () => setSousCategories(await getSousCategories()))()}, [sousCategories]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategories(await getCategories());
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSousCategorie = async (sous_categorie_id) => {
    try {
      setFormData(await getSousCategorie(sous_categorie_id));
    } catch (error) {
      console.error("Erreur lors de la récupération du sousCategorie:", error);
      alert('Une erreur est survenue lors de la récupération du sousCategorie');
    }
  };
  const handleCreate = async () => {
    try {
      await createSousCategorie(formData);
      setSousCategories((prevSousCategories) => prevSousCategories.filter(sousCategorie => sousCategorie.sous_categorie_id !== formData.sous_categorie_id));
      alert(`sousCategorie ajouter avec succès`);
    } catch (error) {
      console.error("Erreur d'ajout:", error);
      alert('Une erreur est survenue lors de l\'ajout du sousCategorie');
    }
  }; 
  const handleEdit = async () => {
    try {      
      await updateSousCategorie(formData.sous_categorie_id, formData);
      setSousCategories((prevSousCategories) => prevSousCategories.filter(sousCategorie => sousCategorie.sous_categorie_id !== formData.sous_categorie_id));
      alert(`SousCategorie avec l'ID ${formData.sous_categorie_id} modifié avec succès`);
    } catch (error) {
      console.error("Erreur de modification:", error);
      alert("Une erreur est survenue lors de la modification du sousCategorie");
    }
  };
  const handleDelete = async (sous_categorie_id) => {
    try {
      await deleteSousCategorie(sous_categorie_id);
      setSousCategories((prevSousCategories) => prevSousCategories.filter(sousCategorie => sousCategorie.sous_categorie_id !== sous_categorie_id));
      alert(`SousCategorie with id ${sous_categorie_id} supprimé avec succès`);
    } catch (error) {
      console.error("Erreur de suppression:", error);
      alert('Une erreur est survenue lors de la suppression du sousCategorie');
    }
  };

  const formattedSousCategories = sousCategories.map((item) => ({ ...item,
    actions: {
      edit: () => handleSousCategorie(item.sous_categorie_id),
      delete: (sous_categorie_id) => handleDelete(sous_categorie_id)
    }
  }));

  const formActions = {formData, setFormData, fields, handleCreate, handleEdit, columns};

  return (
    <>
      <Header title="SousCategories" icon={Layers3Icon} parent="Gestion des produits" current="SousCategories" />
      <FilteredTable formActions={formActions} label={"SousCategories"} datas={formattedSousCategories} identifiant={"sous_categorie_id"} />
    </>
  );
};

export default SousCategories;
