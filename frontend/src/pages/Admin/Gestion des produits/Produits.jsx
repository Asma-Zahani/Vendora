import { useContext, useEffect, useState } from "react";
import Header from "@/components/Header/DashboardSubHeader";
import { ShoppingBag } from "lucide-react";
import { getEntities } from "@/service/EntitesService";
import EntityManager from "@/service/EntityManager";
import { createEntity } from "@/service/EntitesService";
import { SuccessMessageContext } from "@/utils/SuccessMessageContext";

const Produits = () => {
  const [selectedFilter, setSelectedFilter] = useState("Tous");
  const filtres = { field: "status", value: ['Tous', 'Disponible', 'Rupture de stock', 'Hors vente', 'En arrivage'], selectedFilter, setSelectedFilter};
  const [sousCategories, setSousCategories] = useState([]);
  const [marques, setMarques] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [couleurs, setCouleurs] = useState([]); 
  
  const { setSuccessMessage } = useContext(SuccessMessageContext);

  useEffect(() => {
    const fetchData = async () => { 
      setSousCategories(await getEntities("sousCategories"));
      setMarques(await getEntities("marques"));
      setPromotions(await getEntities("promotions"));
      setCouleurs(await getEntities("couleurs"));
    }; 
    fetchData();
  }, []);

  const [formData, setFormData] = useState({nom: "", description: "", status: "", image: "", prix: "", sous_categorie_id: "", marque_id: "", couleurs: [], quantite: "", caracteristique: ""});

  const [formColor, setFormColor] = useState({nom: "", code_hex: ""});

  const handleCreateCouleur = async () => {
    const data = await createEntity("couleurs", formColor);    
    if (data.message) {
      setSuccessMessage(data.message);
      setCouleurs((prevCouleurs) => [...prevCouleurs, data.data]);
      return true;
    }
  };
  
  useEffect(() => {
    if (formData.quantite === null) {
      setFormData(prev => ({
        ...prev,
        caracteristique: "Avec caractéristiques"
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        caracteristique: "Standard"
      }))
    }
  }, [formData.quantite]);
  
  const columns = [
    { label: "Produit", key: "nom", type: "textWithImage" },    
    { label: "Prix", key: "prix", type: "text" },
    { label: "Sous Catégorie", key: "sous_categorie_id", sort: "sous_categories.titre", type: "id", options: sousCategories.map(sousCategorie => ({ value: sousCategorie.sous_categorie_id, label: sousCategorie.titre })) },
    { label: "Status", key: "status", type: "enum" },
    { label: "Actions", key: "actions", type: "actions" }
  ];

  const fields = [
    { label: "Titre", key: "nom", type: "text" },
    { label: "Prix", key: "prix", type: "number" },
    { label: "Image", key: "image", type: "image" },
    { label: "Sous Catégorie", key: "sous_categorie_id", type: "dropdown", options: sousCategories.map(sousCategorie => ({ value: sousCategorie.sous_categorie_id, label: sousCategorie.titre })) },
    { label: "Marque", key: "marque_id", type: "dropdown", options: marques.map(marque => ({ value: marque.marque_id, label: marque.nom })) },
    { label: "Promotions", key: "promotion_id", type: "dropdown", options: promotions.map(promotion => ({ value: promotion.promotion_id, label: promotion.nom + ' - ' + promotion.reduction + '%' })) },
    { label: "Caractéristiques du produit", key: "caracteristique", type: "radio", options: ["Standard", "Avec caractéristiques"]},
    ...(formData.caracteristique === "Avec caractéristiques" ? [
      { label: "Couleurs", key: "couleurs", type: "couleurs", options: couleurs, form: formColor, setForm: setFormColor, handleCreate: handleCreateCouleur }
    ] : []),
    ...(formData.caracteristique === "Standard" ? [
      { label: "Quantité", key: "quantite", type: "number" }
    ] : []),
    { label: "Description", key: "description", type: "textarea" },
  ];

  return (
    <>
      <Header title="Produits" icon={ShoppingBag} parent="Gestion des produits" current="Produits" />
      <EntityManager filtres={filtres} columns={columns} fields={fields} label="produits" identifiant="produit_id" formData={formData} setFormData={setFormData} actionList={["view", "edit", "delete"]} />
    </>
  );
};

export default Produits;