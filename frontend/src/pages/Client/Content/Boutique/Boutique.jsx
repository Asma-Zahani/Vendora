/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext, useCallback, useMemo } from "react";
import FilteredProducts from '@/components/Products/FilteredProducts';
import UserContext from '@/utils/UserContext';
import { getEntities } from "@/service/EntitesService";
import usePanierWishlist from "../Protected/usePanierWishlist";

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
      console.log("produits", produits);     
    };
    fetchData();
  }, [currentPage, selectedItemPerPage, searchTerm, sortBy, sortOrder, filters]);
  
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
  
  const { ajouterAuPanier, ajouterAuListeSouhait } = usePanierWishlist(user, panier, setPanier, produits.data, wishlist, setWishlist);

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