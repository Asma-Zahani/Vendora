import { useEffect, useState } from "react";
import Header from "@/components/Header/DashboardSubHeader";
import { getEntities } from "@/service/EntitesService";
import { Layers3Icon } from "lucide-react";
import EntityManager from "../EntityManager";

const SousCategories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {    
      const data = await getEntities("categories");    
      setCategories(data);
    }; 
    fetchData();
  }, []);

  const [formData, setFormData] = useState({sous_categorie_id: "", titre: "", image: "", categorie_id: ""});
  const columns = [
    { label: "Sous Catégorie", key: "titre", type: "textWithImage" },
    { label: "Catégorie", key: "categorie_id", sort: "categories.titre", type: "id", options: categories.map(cat => ({ value: cat.categorie_id, label: cat.titre }))},
    { label: "Date de création", key: "created_at", type: "date" },
    { label: "Actions", key: "actions", type: "actions" }
  ];
  const fields = [
    { label: "Titre", key: "titre", type: "text" },
    { label: "Image", key: "image", type: "image" },
    { label: "Categorie", key: "categorie_id", type: "dropdown", options: categories.map(cat => ({ value: cat.categorie_id, label: cat.titre })) }
  ];

  return (
    <>
      <Header title="SousCategories" icon={Layers3Icon} parent="Gestion des produits" current="SousCategories" />
      <EntityManager columns={columns} fields={fields} label="sousCategories" identifiant="sous_categorie_id" formData={formData} setFormData={setFormData} actionList={["edit", "delete"]} />
    </>
  );
};

export default SousCategories;
