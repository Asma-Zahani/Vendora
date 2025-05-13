import { useState } from "react";
import Header from "@/components/Header/DashboardSubHeader";
import { Users } from "lucide-react";
import EntityManager from "@/service/EntityManager";
import { regions, villes } from "@/service/UserInfos";

const Clients = () => {
  const [formData, setFormData] = useState({ nom: "", prenom: "", telephone: "", email: "", password: "", password_confirmation: "", date_naissance: "", genre: "" });

  const columns = [
    { label: "Client", type: "nomComplete" },
    { label: "Téléphone", key: "telephone", type: "text" },
    { label: "Email", key: "email", type: "text" },
    { label: "Actions", key: "actions", type: "actions" }
  ];  
  const fields = [
    { label: "Nom", key: "nom", type: "text" },
    { label: "Prénom", key: "prenom", type: "text" },
    { label: "Téléphone", key: "telephone", type: "text" },
    { label: "Email", key: "email", type: "email" },
    { label: "Adresse", key: "adresse", type: "text" },
    { label: "Region", key: "region", type: "dropdown", options: regions.map(region => ({ value: region, label: region })) },
    { label: "Ville", key: "ville", type: "dropdown", options: villes[formData.region]?.map(ville => ({ value: ville, label: ville })) || [] },
    { label: "Date de naissance", key: "date_naissance", type: "date" },
    { label: "Genre", key: "genre", type: "radio", options: ["Male", "Femelle"]},
  ];

  return (
    <>
      <Header title="Clients" icon={Users} parent="Gestion des utilisateurs" current="Clients" />
      <EntityManager columns={columns} fields={fields} label="clients" identifiant="id" formData={formData} setFormData={setFormData} actionList={["view", "edit", "delete"]}/>
    </>
  );
};

export default Clients;