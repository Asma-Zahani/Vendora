import { useState } from "react";
import Header from "../Header";
import { Truck } from "lucide-react";
import EntityManager from "../EntityManager";

const Livreurs = () => {
  const [formData, setFormData] = useState({ nom: "", prenom: "", telephone: "", email: "", password: "", password_confirmation: "", date_naissance: "", genre: "" });
  
  const columns = [
    { label: "Livreur", type: "nomComplete" },
    { label: "Téléphone", key: "telephone", type: "text" },
    { label: "Email", key: "email", type: "text" },
    { label: "Actions", key: "actions", type: "actions" }
  ];  
  const fields = [
    { label: "Nom", key: "nom", type: "text" },
    { label: "Prénom", key: "prenom", type: "text" },
    { label: "Téléphone", key: "telephone", type: "text" },
    { label: "Email", key: "email", type: "email" },
    { label: "Date de naissance", key: "date_naissance", type: "date" },
    { label: "Genre", key: "genre", type: "radio", options: ["Male", "Femalle"]}
  ];

  return (
    <>
      <Header title="Livreurs" icon={Truck} parent="Gestion des utilisateurs" current="Livreurs" />
      <EntityManager columns={columns} fields={fields} label="livreurs" identifiant="id" formData={formData} setFormData={setFormData} actionList={["edit", "delete"]} />
    </>
  );
};

export default Livreurs;