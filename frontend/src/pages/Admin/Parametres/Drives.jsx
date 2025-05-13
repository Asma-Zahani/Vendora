import { useEffect, useState } from "react";
import Header from "@/components/Header/DashboardSubHeader";
import { Store } from "lucide-react";
import EntityManager from "@/service/EntityManager";
import { getEntities } from "@/service/EntitesService";
import { regions, villes } from "@/service/UserInfos";

const Drives = () => {
  const [statusOptions, setStatusOptions] = useState([]);
  const [responsables, setResponsables] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {  
        setResponsables(await getEntities("responsables"));
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
    { label: "Status", key: "status", type: "dropdown", options: statusOptions },
    { label: "Responsable", key: "responsable_id", type: "dropdown", options: responsables.filter(responsable => responsable.drive === null).map(responsable => ({ value: responsable.id, label: responsable.prenom + " " + responsable.nom })) },
    { label: "Region", key: "region", type: "dropdown", options: regions.map(region => ({ value: region, label: region })) },
    { label: "Ville", key: "ville", type: "dropdown", options: villes[formData.region]?.map(ville => ({ value: ville, label: ville })) || [] },
    { label: "Adresse", key: "adresse", type: "text" },
    ];
  
  return (
    <>
      <Header title="Drives" icon={Store} parent="Paramètres" current="Drives" />
      <EntityManager columns={columns} fields={fields} label="drives" identifiant="drive_id" formData={formData} setFormData={setFormData} actionList={["view", "edit", "delete"]} />
    </>
  );
};

export default Drives;