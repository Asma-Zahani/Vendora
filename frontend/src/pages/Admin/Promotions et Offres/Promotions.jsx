import { useState } from "react";
import Header from "@/components/Header/DashboardSubHeader";
import { Percent } from "lucide-react";
import EntityManager from "@/service/EntityManager";

const Promotions = () => {
  const [formData, setFormData] = useState({promotion_id: "", nom: "", reduction: "", dateDebut: "", dateFin: "" });
  const columns = [
    { label: "Nom", key: "nom", type: "text" },
    { label: "Réduction (%)", key: "reduction", type: "text" },
    { label: "Date de début", key: "dateDebut", type: "date" },
    { label: "Date de fin", key: "dateFin", type: "date" },
    { label: "Actions", key: "actions", type: "actions" }
  ];

  const fields = [
    { label: "Nom", key: "nom", type: "text" },
    { label: "Réduction (%)", key: "reduction", type: "number" },
    { label: "Date de début", key: "dateDebut", type: "date" },
    { label: "Date de fin", key: "dateFin", type: "date" }
  ];

  return (
    <>
      <Header title="Promotions" icon={Percent} parent="Promotions et Offres" current="Promotions" />
      <EntityManager columns={columns} fields={fields} label="promotions" identifiant="promotion_id" formData={formData} setFormData={setFormData} actionList={["edit", "delete"]} />
    </>
  );
};

export default Promotions;