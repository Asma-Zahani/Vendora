/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext, useCallback, useMemo } from "react";
import { addToPanier } from "@/service/PanierService";
import { addToWishlist } from "@/service/WishlistService";
import FilteredProducts from '@/components/Products/FilteredProducts';
import UserContext from '@/utils/UserContext';
import { getEntities } from "@/service/EntitesService";

const Shop = () => {
  const { user, panier, wishlist, setPanier, setWishlist } = useContext(UserContext);

  const [gridCols, setGridCols] = useState(3);
  const [isGrid, setIsGrid] = useState(true);

  const [produits, setProduits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [marques, setMarques] = useState([]);
  const [couleurs, setCouleurs] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItemPerPage, setSelectedItemPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("");

  const [formData, setFormData] = useState(null);
  const [panierAjoute, setPanierAjoute] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [maxPrice, setMaxPrice] = useState(1000);

  const filters = useMemo(() => {
    const newFilters = {};
  
    if (selectedBrands && selectedBrands.length > 0) {
      newFilters.marque_id = selectedBrands;
    }
    if (selectedColors && selectedColors.length > 0) {
      newFilters["couleurs.couleur_id"] = selectedColors;
    }
    if (selectedCategories && selectedCategories.length > 0) {
      newFilters["sousCategorie.categorie_id"] = selectedCategories;
    }
    if (maxPrice > 0) {
      newFilters.maxPrice = maxPrice;
    }
  
    return newFilters;
  }, [selectedBrands, selectedColors, selectedCategories, maxPrice]);

  useEffect(() => {
    const fetchData = async () => {
      setProduits(await getEntities("produits", currentPage, selectedItemPerPage, searchTerm, sortBy, sortOrder, filters));         
    };
    fetchData();
  }, [currentPage, selectedItemPerPage, searchTerm, sortBy, sortOrder, filters]);

  // console.log(produits);
  
  useEffect(() => {
    const fetchData = async () => {
      setCategories(await getEntities("categories"));
      setMarques(await getEntities("marques"));
      setCouleurs(await getEntities("couleurs"));
    };
    fetchData();
  }, []);
  
  const handlePageChange = (pageNumber) => {    
    setCurrentPage(pageNumber);
  }

  const handleConfigChange = useCallback((key, value) => {
    setCurrentPage(1);
    if (key === "itemsPerPage") setSelectedItemPerPage(value);
    if (key === "searchTerm") setSearchTerm(value);
  }, []);

  const handleConfigGridChange = useCallback((key, value) => {
    if (key === "isGrid") {
      setIsGrid(value);
      value ? setSelectedItemPerPage(15) : setSelectedItemPerPage(10);
    };
    if (key === "gridCols") {
      setGridCols(value);
      value === 3 ? setSelectedItemPerPage(15) : value === 4 ? setSelectedItemPerPage(20) : setSelectedItemPerPage(30);
    }
  }, []);

  const toggleSortOrder = useCallback((columnKey, columnOrder) => {    
    setSortBy(prevKey => (prevKey === columnKey ? prevKey : columnKey));
    setSortOrder(prevOrder => (prevOrder === columnOrder ? prevOrder : columnOrder));
    setCurrentPage(1);
  }, [sortBy]);  

  const ajouterAuPanier = (produit_id, quantiteAjoutee) => {
    const produitExistant = panier?.find(item => item.produit_id === produit_id);
    
    const quantiteTotale = produitExistant 
      ? (produitExistant.pivot?.quantite 
          ? parseInt(produitExistant.pivot.quantite) + parseInt(quantiteAjoutee) 
          : parseInt(produitExistant.quantite) + parseInt(quantiteAjoutee)) 
      : parseInt(quantiteAjoutee);

    setFormData({
      client_id: user?.id,
      produit_id: produit_id,
      quantite: quantiteTotale,
    });

    setPanierAjoute(true);
  };

  const ajouterAuListeSouhait = async (produit_id) => {
    try {
      const produit = produits.find(item => item.produit_id === produit_id);
      
      const wishlistItem = { client_id: user?.id, produit_id };
      await addToWishlist(wishlistItem);
      setWishlist(prevWishlist => [...prevWishlist, produit]);
      console.log("Liste de souhaits mise à jour avec succès");
    } catch (error) {
      console.error("Erreur lors de l'ajout à la liste de souhaits:", error);
    }
  };

  useEffect(() => {
    if (panierAjoute && formData) {
      const timeout = setTimeout(async () => {
        try {
          await addToPanier(formData);
          setPanier(prevProduits => {
            const produitExistant = prevProduits.find(item => item.produit_id === formData.produit_id);
          
            if (produitExistant) {
              return prevProduits.map(item =>
                item.produit_id === formData.produit_id 
                  ? { ...item, pivot: { ...item.pivot, quantite: formData.quantite } } 
                  : item
              );
            } else {
              const produit = produits.find(item => item.produit_id === formData.produit_id);
              return produit ? [...prevProduits, { ...produit, pivot: { quantite: formData.quantite } }] : prevProduits;
            }
          });
          console.log("Panier mis à jour");
        } catch (error) {
          console.error("Erreur lors de la mise à jour du panier:", error);
        }
        setPanierAjoute(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [panierAjoute, formData]);

  const filtres = { categories, marques, couleurs };
  const gridInfo = { isGrid, gridCols, handleConfigGridChange };
  const productConfig = {currentPage, selectedItemPerPage, handlePageChange, handleConfigChange, searchTerm, sortOrder, sortBy, toggleSortOrder};
  const selectedFiltres = {selectedCategories, setSelectedCategories, selectedBrands, setSelectedBrands, selectedColors, setSelectedColors, maxPrice, setMaxPrice};
  
  return (
    <div className="px-8">
      <FilteredProducts wishlist={wishlist} data={produits} gridInfo={gridInfo} productConfig={productConfig} filtres={filtres} selectedFiltres={selectedFiltres}
        ajouterAuPanier={ajouterAuPanier} ajouterAuListeSouhait={ajouterAuListeSouhait} />
    </div>
  );
};

export default Shop;