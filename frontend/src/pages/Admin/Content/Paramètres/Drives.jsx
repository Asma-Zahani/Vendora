import { useEffect, useState } from "react";
import Header from "../Header";
import { getDrives, getDrive, createDrive, updateDrive, deleteDrive } from "@/service/DriveService";
import { getStatusDrives } from "@/service/EnumsService";
import { Store } from "lucide-react";
import FilteredTable from "@/components/Tables/FilteredTable";

const Drives = () => {
  const [formData, setFormData] = useState({ nom: "", adresse: "", region: "", ville: "", status: ""});
  
  const [drives, setDrives] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);

  const columns = [
    { label: "Nom", key: "nom", type: "text" },
    { label: "Adresse", key: "adresse", type: "text" },
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
  

  useEffect(() => { (async () => setDrives(await getDrives()))()}, [drives]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setStatusOptions(await getStatusDrives());
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchData();
  }, []);

  const handleDrive = async (drive_id) => {
    try {
      setFormData(await getDrive(drive_id));
    } catch (error) {
      console.error("Erreur lors de la récupération du drive:", error);
      alert('Une erreur est survenue lors de la récupération du drive');
    }
  };
  const handleCreate = async () => {
    try {
      await createDrive(formData);
      setDrives((prevDrives) => prevDrives.filter(drive => drive.drive_id !== formData.drive_id));
      alert(`Drive ajouter avec succès`);
    } catch (error) {
      console.error("Erreur d'ajout:", error);
      alert('Une erreur est survenue lors de l\'ajout du drive');
    }
  }; 
  const handleEdit = async () => {
    try {      
      await updateDrive(formData.drive_id, formData);
      setDrives((prevDrives) => prevDrives.filter(drive => drive.drive_id !== formData.drive_id));
      alert(`Drive avec l'ID ${formData.drive_id} modifié avec succès`);
    } catch (error) {
      console.error("Erreur de modification:", error);
      alert("Une erreur est survenue lors de la modification du drive");
    }
  };
  const handleDelete = async (drive_id) => {
    try {
      await deleteDrive(drive_id);
      setDrives((prevPosts) => prevPosts.filter(post => post.drive_id !== drive_id));
      alert(`Drive with id ${drive_id} supprimé avec succès`);
    } catch (error) {
      console.error("Erreur de suppression:", error);
      alert('Une erreur est survenue lors de la suppression du drive');
    }
  };

  const formattedDrives = drives.map((item) => ({ ...item,
    actions: {
      edit: () => handleDrive(item.drive_id),
      delete: (drive_id) => handleDelete(drive_id)
    }
  }));

  const formActions = {formData, setFormData, fields, handleCreate, handleEdit, columns};

  return (
    <>
      <Header title="Drives" icon={Store} parent="Paramètres" current="Drives" />
      <FilteredTable formActions={formActions} label={"Drives"} datas={formattedDrives} identifiant={"drive_id"}/>
    </>
  );
};

export default Drives;
