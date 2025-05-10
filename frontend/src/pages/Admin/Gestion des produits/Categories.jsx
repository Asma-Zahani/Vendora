import { useState } from "react";
import Header from "@/components/Header/DashboardSubHeader";
import { Layers2Icon } from "lucide-react";
import EntityManager from "@/service/EntityManager";

const Categories = () => {
  const [formData, setFormData] = useState({categorie_id: "", title: "", image: "", rang: "" });
  const columns = [
    { label: "Catégorie", key: "titre", type: "textWithImage" },
    { label: "Date de création", key: "created_at", type: "date" },
    { label: "Actions", key: "actions", type: "actions" }
  ];
  const fields = [
    { label: "Titre", key: "titre", type: "text" },
    { label: "Image", key: "image", type: "image" }
  ];

  return (
    <>
      <Header title="Categories" icon={Layers2Icon} parent="Gestion des produits" current="Categories" />
      <EntityManager columns={columns} fields={fields} label="categories" identifiant="categorie_id" formData={formData} setFormData={setFormData} actionList={["edit", "delete"]} />
    </>
  );
};

export default Categories;