/* eslint-disable react/prop-types */
import { Search } from "lucide-react";
import { useState } from "react";
import Dropdown from "./Dropdown";

const Filtre = ({ categories, marques, couleurs, onApplyFilters }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [maxPrice, setMaxPrice] = useState(1000);

    const toggleCategory = (categoryId) => {
      setSelectedCategories(prev => prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]);
    };
  
    const toggleBrand = (brandId) => {
      setSelectedBrands(prev => prev.includes(brandId) ? prev.filter(id => id !== brandId) : [...prev, brandId]);
    };

    const toggleColor = (colorId) => {
      setSelectedColors(prev => prev.includes(colorId) ? prev.filter(id => id !== colorId) : [...prev, colorId]);
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        applyFilters(); // Appliquer les filtres lorsque "Enter" est pressé
      }
    };

    
  
    const applyFilters = () => {
      onApplyFilters({ category: selectedCategories, brand: selectedBrands , color: selectedColors , price: maxPrice , search: searchTerm});
      console.log("Filtres appliqués :", { category: selectedCategories, brand: selectedBrands , color: selectedColors , price: maxPrice , search: searchTerm});
    };
   

  
  return (
    <div className="mt-6 flex gap-6 relative z-50">
      {/* Premier champ de recherche - taille fixe */}
      <div className="relative flex items-center">
        <Dropdown
          isOpen={isOpen}
          toggleOpen={() => setIsOpen(!isOpen)}
          categories={categories}
          brands={marques}
          colors={couleurs} 
          selectedCategories={selectedCategories}
          toggleCategory={toggleCategory}
          selectedBrands={selectedBrands}
          toggleBrand={toggleBrand}
          selectedColors={selectedColors}
          toggleColor={toggleColor}
          applyFilters={applyFilters}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />
        
      </div>

      {/* champ de recherche */}
      <div className="relative flex items-center flex-1">
        <span className="absolute left-3">
          <Search className="w-5 h-5 text-gray-400 dark:text-gray-600" />
        </span>
        <input
          type="text"
          placeholder="Rechercher"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress} // Utilisez onKeyDown pour détecter la pression de la touche "Enter"
          className="block w-full py-1.5 pr-5 pl-10 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-lg placeholder-gray-400/70 focus:border-purpleLight focus:ring-2 focus:ring-purpleLight focus-visible:outline-none shadow-sm"
        />
      </div>
    </div>
  );
}

export default Filtre;
