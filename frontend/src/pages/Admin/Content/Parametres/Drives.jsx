import { useEffect, useState } from "react";
import Header from "../Header";
import { Store } from "lucide-react";
import EntityManager from "../EntityManager";
import { getEntities } from "@/service/EntitesService";

const Drives = () => {
  const [statusOptions, setStatusOptions] = useState([]);
  useEffect(() => {
      const fetchData = async () => {
        try {
          setStatusOptions(await getEntities("statusDrives"));
        } catch (error) {
          console.error("Erreur lors de la récupération des données :", error);
        }
      };
      fetchData();
  }, []);

  const [formData, setFormData] = useState({ nom: "", adresse: "", region: "", ville: "", status: ""});

  const columns = [
    { label: "Nom", key: "nom", type: "text" },
    { label: "Region", key: "region", type: "text" },
    { label: "Ville", key: "ville", type: "text" },
    { label: "Status", key: "status", type: "text" },
    { label: "Actions", key: "actions", type: "actions" }
  ];  
  const fields = [
    { label: "Nom", key: "nom", type: "text" },
    { label: "Adresse", key: "adresse", type: "text" },
    { label: "Region", key: "region", type: "text" },
    { label: "Ville", key: "ville", type: "text" },
    { label: "Status", key: "status", type: "dropdown", options: statusOptions },
  ];

  return (
    <>
      <Header title="Drives" icon={Store} parent="Paramètres" current="Drives" />
      <EntityManager columns={columns} fields={fields} label="drives" identifiant="drive_id" formData={formData} setFormData={setFormData} actionList={["view", "edit", "delete"]} />
    </>
  );
};

export default Drives;