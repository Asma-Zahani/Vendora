import { useState } from "react";
import Header from "@/components/Header/DashboardSubHeader";
import { Bookmark } from "lucide-react";
import EntityManager from "@/service/EntityManager";

const Marques = () => {
  const [formData, setFormData] = useState({nom: "", image: ""});
  const columns = [
    { label: "Marque", key: "nom", type: "textWithImage" },
    { label: "Date de création", key: "created_at", type: "date" },
    { label: "Actions", key: "actions", type: "actions" }
  ];
  const fields = [
    { label: "Nom", key: "nom", type: "text" },
    { label: "Image", key: "image", type: "image" },
  ];

  return (
    <>
      <Header title="Marques" icon={Bookmark} parent="Gestion des produits" current="Marques" />
      <EntityManager columns={columns} fields={fields} label="marques" identifiant="marque_id" formData={formData} setFormData={setFormData}  actionList={["edit", "delete"]} />
    </>
  );
};

export default Marques;
