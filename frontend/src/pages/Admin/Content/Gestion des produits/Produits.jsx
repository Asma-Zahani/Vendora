import { useEffect, useState } from "react";
import Header from "../Header";
import { getProduits, getProduit, createProduit, updateProduit, deleteProduit } from "@/service/ProduitService";
import { getSousCategories } from "@/service/SousCategorieService";
import { getMarques } from "@/service/MarqueService";
import { getFournisseurs } from "@/service/FournisseurService";
import { getPromotions } from "@/service/PromotionService";
import { getCouleurs, createCouleur } from "@/service/CouleurService";
import { Layers2Icon } from "lucide-react";
import FilteredTable from "@/components/Tables/FilteredTable";

const Produits = () => {
  const filtres = { field: "status", value: ['Tous', 'Disponible', 'Rupture de stock'] };
  const [produits, setProduits] = useState([]);
  const [sousCategories, setSousCategories] = useState([]);
  const [marques, setMarques] = useState([]);
  const [fournisseurs, setFournisseurs] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [couleurs, setCouleurs] = useState([]); 
  const dropdownSousCategoriesOptions = sousCategories.map(sousCategorie => ({ value: sousCategorie.sous_categorie_id, label: sousCategorie.titre }));
  const dropdownMarquesOptions = marques.map(marque => ({ value: marque.marque_id, label: marque.nom }));
  const dropdownFournisseursOptions = fournisseurs.map(fournisseur => ({ value: fournisseur.id, label: fournisseur.nom + ' ' + fournisseur.prenom }));
  const dropdownPromotionsOptions = promotions.map(promotion => ({ value: promotion.promotion_id, label: promotion.nom + ' - ' + promotion.reduction + '%' }));
  
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    status: "",
    image: "",
    prix: "",
    sous_categorie_id: "",
    marque_id: "",
    fournisseur_id: "",
    couleurs: []
  });

  const [formColor, setFormColor] = useState({nom: "", code_hex: ""});

  
  const handleCreateCouleur = async () => {
    try {      
      const newCouleur = await createCouleur(formColor);
  
      setCouleurs((prevCouleurs) => [...prevCouleurs, newCouleur]);
      alert(`Couleur ajouté avec succès`);
    } catch (error) {
      console.error("Erreur d'ajout:", error);
      alert('Une erreur est survenue lors de l\'ajout du couleur');
    }
  };
  
  const columns = [
    { label: "Titre", key: "nom", type: "text" },
    { label: "Image", key: "image", type: "img" },
    { label: "Sous Catégorie", key: "sous_categorie", type: "text" }, 
    { label: "Marque", key: "marque", type: "text" }, 
    { label: "Prix", key: "prix", type: "text" },
    { label: "Couleurs", key: "couleurs", type: "text" }, 
    { label: "Status", key: "status", type: "text" },
    { label: "Actions", key: "actions", type: "actions" }
  ];

  const fields = [
    { label: "Titre", key: "nom", type: "text" },
    { label: "Prix", key: "prix", type: "number" },
    { label: "Image", key: "image", type: "image" },
    { label: "Sous Catégorie", key: "sous_categorie_id", type: "dropdown", options: dropdownSousCategoriesOptions },
    { label: "Marque", key: "marque_id", type: "dropdown", options: dropdownMarquesOptions },
    { label: "Fournisseur", key: "fournisseur_id", type: "dropdown", options: dropdownFournisseursOptions },
    { label: "Promotions", key: "promotion_id", type: "dropdown", options: dropdownPromotionsOptions },
    { label: "Couleurs", key: "couleurs", type: "colors", options: couleurs, form: formColor, setForm: setFormColor, handleCreate: handleCreateCouleur }, 
    { label: "Description", key: "description", type: "textarea" },
  ];

  useEffect(() => { 
    (async () => {
      setProduits(await getProduits()); 
    })(); 
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setSousCategories(await getSousCategories());
        setMarques(await getMarques());
        setFournisseurs(await getFournisseurs());
        setPromotions(await getPromotions());
        setCouleurs(await getCouleurs());
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchCategories();
  }, []);

  const handleProduit = async (produit_id) => {
    try {
      const produit = await getProduit(produit_id);
      console.log(produit);
      
      setFormData(produit);
    } catch (error) {
      console.error("Erreur lors de la récupération du produit:", error);
      alert('Une erreur est survenue lors de la récupération du produit');
    }
  };

  const handleCreate = async () => {
    try {      
      const newProduit = await createProduit(formData);
      setProduits((prevProduits) => [...prevProduits, newProduit]);
      alert(`Produit ajouté avec succès`);
    } catch (error) {
      console.error("Erreur d'ajout:", error);
      alert('Une erreur est survenue lors de l\'ajout du produit');
    }
  };
  

  const handleEdit = async () => {
    try {      
      await updateProduit(formData.produit_id, formData);
      setProduits(await getProduits());
      alert(`Produit modifié avec succès`);
    } catch (error) {
      console.error("Erreur de modification:", error);
      alert("Une erreur est survenue lors de la modification du produit");
    }
  };

  const handleDelete = async (produit_id) => {
    try {
      await deleteProduit(produit_id);
      setProduits(await getProduits());
      alert(`Produit supprimé avec succès`);
    } catch (error) {
      console.error("Erreur de suppression:", error);
      alert('Une erreur est survenue lors de la suppression du produit');
    }
  };
  
  const formattedProduits = produits.map((item) => ({
    ...item,
    sous_categorie: sousCategories.find(s => s.sous_categorie_id === item.sous_categorie_id)?.titre || "Non défini",
    marque: marques.find(m => m.marque_id === item.marque_id)?.nom || "Non défini",
    couleurs: item.couleurs && Array.isArray(item.couleurs) ? 
              item.couleurs.map(couleur => couleur.nom).join(", ") : "Aucune couleur", 
    actions: {
      edit: () => handleProduit(item.produit_id),
      delete: (produit_id) => handleDelete(produit_id),
    }
  }));

  const formActions = {formData, setFormData, fields, handleCreate, handleEdit, columns};

  return (
    <>
      <Header title="Produits" icon={Layers2Icon} parent="Gestion des produits" current="Produits" />
      <FilteredTable formActions={formActions} label={"produits"} datas={formattedProduits} filtres={filtres} identifiant={"produit_id"} />
    </>
  );
};

export default Produits;
