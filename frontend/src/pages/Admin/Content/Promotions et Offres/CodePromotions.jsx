import { useEffect, useState } from "react";
import Header from "../Header";
import { getCodePromotions, getCodePromotion, createCodePromotion, updateCodePromotion, deleteCodePromotion } from "@/service/CodePromotionService";
import { Tag } from "lucide-react";
import FilteredTable from "@/components/Tables/FilteredTable";

const CodePromotions = () => {
  const [formData, setFormData] = useState({code_promotion_id: "", code: "", reduction: "", dateExpiration: "", nbUtilisationMax: "" });
  const [codePromotions, setCodePromotions] = useState([]);

  const columns = [
    { label: "Code", key: "code", type: "text" },
    { label: "Réduction (%)", key: "reduction", type: "text" },
    { label: "Date d'expiration", key: "dateExpiration", type: "date" },
    { label: "Nombre d'utilisations max", key: "nbUtilisationMax", type: "text" },
    { label: "Date de création", key: "created_at", type: "date" },
    { label: "Actions", key: "actions", type: "actions" }
  ];

  const fields = [
    { label: "Code", key: "code", type: "text" },
    { label: "Réduction (%)", key: "reduction", type: "number" },
    { label: "Date d'expiration", key: "dateExpiration", type: "date" },
    { label: "Nombre d'utilisations maximal", key: "nbUtilisationMax", type: "number" }
  ];

  useEffect(() => { (async () => setCodePromotions(await getCodePromotions()))()}, [codePromotions]);

  const handleCodePromotion = async (code_promotion_id) => {
    try {
      const codePromotion = await getCodePromotion(code_promotion_id);
      setFormData(codePromotion);
    } catch (error) {
      console.error("Erreur lors de la récupération du codePromotion:", error);
      alert('Une erreur est survenue lors de la récupération du codePromotion');
    }
  };
  const handleCreate = async () => {
    try {
      await createCodePromotion(formData);
      setCodePromotions((prevCodePromotions) => prevCodePromotions.filter(codePromotion => codePromotion.code_promotion_id !== formData.code_promotion_id));
      alert(`CodePromotion ajouter avec succès`);
    } catch (error) {
      console.error("Erreur d'ajout:", error);
      alert('Une erreur est survenue lors de l\'ajout du codePromotion');
    }
  }; 
  const handleEdit = async () => {
    try {      
      await updateCodePromotion(formData.code_promotion_id, formData);
      setCodePromotions((prevCodePromotions) => prevCodePromotions.filter(codePromotion => codePromotion.code_promotion_id !== formData.code_promotion_id));
      alert(`CodePromotion avec l'ID ${formData.code_promotion_id} modifié avec succès`);
    } catch (error) {
      console.error("Erreur de modification:", error);
      alert("Une erreur est survenue lors de la modification du codePromotion");
    }
  };
  const handleDelete = async (code_promotion_id) => {
    try {      
      await deleteCodePromotion(code_promotion_id);
      setCodePromotions((prevCodePromotions) => prevCodePromotions.filter(codePromotion => codePromotion.code_promotion_id !== formData.code_promotion_id));
      alert(`CodePromotion with id ${code_promotion_id} supprimé avec succès`);
    } catch (error) {
      console.error("Erreur de suppression:", error);
      alert('Une erreur est survenue lors de la suppression du codePromotion');
    }
  };

  const formattedCodePromotions = codePromotions.map((item) => ({ ...item,
    actions: {
      edit: () => handleCodePromotion(item.code_promotion_id),
      delete: (code_promotion_id) => handleDelete(code_promotion_id)
    }
  }));

  const formActions = {formData, setFormData, fields, handleCreate, handleEdit, columns};

  return (
    <>
      <Header title="Codes Promotions" icon={Tag} parent="Promotions et Offres" current="Codes Promotions" />
      <FilteredTable formActions={formActions} label={"codePromotions"} datas={formattedCodePromotions} identifiant={"code_promotion_id"} />
    </>
  );
};

export default CodePromotions;
