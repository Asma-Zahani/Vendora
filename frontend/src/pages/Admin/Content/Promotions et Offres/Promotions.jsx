import { useEffect, useState } from "react";
import Header from "../Header";
import { getPromotions, getPromotion, createPromotion, updatePromotion, deletePromotion } from "@/service/PromotionService";
import { Percent } from "lucide-react";
import FilteredTable from "@/components/Tables/FilteredTable";

const Promotions = () => {
  const [formData, setFormData] = useState({promotion_id: "", nom: "", reduction: "", dateDebut: "", dateFin: "" });
  const [promotions, setPromotions] = useState([]);

  const columns = [
    { label: "Nom", key: "nom", type: "text" },
    { label: "Réduction (%)", key: "reduction", type: "text" },
    { label: "Date de début", key: "dateDebut", type: "date" },
    { label: "Date de fin", key: "dateFin", type: "date" },
    { label: "Date de création", key: "created_at", type: "date" },
    { label: "Actions", key: "actions", type: "actions" }
  ];

  const fields = [
    { label: "Nom", key: "nom", type: "text" },
    { label: "Réduction (%)", key: "reduction", type: "number" },
    { label: "Date de début", key: "dateDebut", type: "date" },
    { label: "Date de fin", key: "dateFin", type: "date" }
  ];

  useEffect(() => { (async () => setPromotions(await getPromotions()))()}, [promotions]);

  const handlePromotion = async (promotion_id) => {
    try {
      const promotion = await getPromotion(promotion_id);
      setFormData(promotion);
    } catch (error) {
      console.error("Erreur lors de la récupération du promotion:", error);
      alert('Une erreur est survenue lors de la récupération du promotion');
    }
  };
  const handleCreate = async () => {
    try {
      await createPromotion(formData);
      setPromotions((prevPromotions) => prevPromotions.filter(promotion => promotion.promotion_id !== formData.promotion_id));
      alert(`Promotion ajouter avec succès`);
    } catch (error) {
      console.error("Erreur d'ajout:", error);
      alert('Une erreur est survenue lors de l\'ajout du promotion');
    }
  }; 
  const handleEdit = async () => {
    try {      
      await updatePromotion(formData.promotion_id, formData);
      setPromotions((prevPromotions) => prevPromotions.filter(promotion => promotion.promotion_id !== formData.promotion_id));
      alert(`Promotion avec l'ID ${formData.promotion_id} modifié avec succès`);
    } catch (error) {
      console.error("Erreur de modification:", error);
      alert("Une erreur est survenue lors de la modification du promotion");
    }
  };
  const handleDelete = async (promotion_id) => {
    try {
      console.log(promotion_id);
      
      await deletePromotion(promotion_id);
      setPromotions((prevPromotions) => prevPromotions.filter(promotion => promotion.promotion_id !== formData.promotion_id));
      alert(`Promotion with id ${promotion_id} supprimé avec succès`);
    } catch (error) {
      console.error("Erreur de suppression:", error);
      alert('Une erreur est survenue lors de la suppression du promotion');
    }
  };

  const formattedPromotions = promotions.map((item) => ({ ...item,
    actions: {
      edit: () => handlePromotion(item.promotion_id),
      delete: (promotion_id) => handleDelete(promotion_id)
    }
  }));

  const formActions = {formData, setFormData, fields, handleCreate, handleEdit, columns};

  return (
    <>
      <Header title="Promotions" icon={Percent} parent="Promotions et Offres" current="Promotions" />
      <FilteredTable formActions={formActions} label={"promotions"} datas={formattedPromotions} identifiant={"promotion_id"} />
    </>
  );
};

export default Promotions;
