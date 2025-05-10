import { useState } from "react";
import Header from "@/components/Header/DashboardSubHeader";
import { Tag } from "lucide-react";
import EntityManager from "@/service/EntityManager";

const CodePromotions = () => {
  const [formData, setFormData] = useState({code_promotion_id: "", code: "", reduction: "", dateExpiration: "", nbUtilisationMax: "" });
  const columns = [
    { label: "Code", key: "code", type: "text" },
    { label: "Réduction (%)", key: "reduction", type: "text" },
    { label: "Utilisation", key: "nbUtilisation", type: "text" },
    { label: "Utilisation Max", key: "nbUtilisationMax", type: "text" },
    { label: "Date d'expiration", key: "dateExpiration", type: "date" },
    { label: "Actions", key: "actions", type: "actions" }
  ];

  const fields = [
    { label: "Code", key: "code", type: "text" },
    { label: "Réduction (%)", key: "reduction", type: "number" },
    { label: "Date d'expiration", key: "dateExpiration", type: "date" },
    { label: "Nombre d'utilisations maximal", key: "nbUtilisationMax", type: "number" }
  ];

  return (
    <>
      <Header title="Codes Promotions" icon={Tag} parent="Promotions et Offres" current="Codes Promotions" />
      <EntityManager columns={columns} fields={fields} label="codePromotions" identifiant="code_promotion_id" formData={formData} setFormData={setFormData} actionList={["edit", "delete"]} />
    </>
  );
};

export default CodePromotions;