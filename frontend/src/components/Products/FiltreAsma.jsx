/* eslint-disable react/prop-types */
import { Search } from "lucide-react";
import { useState } from "react";
import Dropdown from "./Dropdown";

const Filtre = ({ filtres, selectedFiltres, searchTerm, setSearchTerm, maxPrice, setMaxPrice }) => {
  const [isOpen, setIsOpen] = useState(false);

    const toggleCategory = (categoryId) => {
      selectedFiltres.setSelectedCategories(prev => prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]);
    };
  
    const toggleBrand = (brandId) => {
      selectedFiltres.setSelectedBrands(prev => prev.includes(brandId) ? prev.filter(id => id !== brandId) : [...prev, brandId]);
    };

    const toggleColor = (colorId) => {
      selectedFiltres.setSelectedColors(prev => prev.includes(colorId) ? prev.filter(id => id !== colorId) : [...prev, colorId]);
    };
  
  return (
    <div className="mt-6 flex gap-6 relative z-50">
      <div className="relative flex items-center">
        <Dropdown isOpen={isOpen} toggleOpen={() => setIsOpen(!isOpen)}
          categories={filtres.categories} brands={filtres.marques} colors={filtres.couleurs} 
          selectedCategories={selectedFiltres.selectedCategories}
          toggleCategory={toggleCategory}
          selectedBrands={selectedFiltres.selectedBrands}
          toggleBrand={toggleBrand}
          selectedColors={selectedFiltres.selectedColors}
          toggleColor={toggleColor}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />
        
      </div>

      <div className="relative flex items-center flex-1">
        <span className="absolute left-3">
          <Search className="w-5 h-5 text-gray-400 dark:text-gray-600" />
        </span>
        <input type="text" placeholder="Rechercher" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full py-1.5 pr-5 pl-10 dark:bg-customDark text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-lg placeholder-gray-400/70 focus:border-purpleLight focus:ring-2 focus:ring-purpleLight focus-visible:outline-none shadow-sm"/>
      </div>
    </div>
  );
}

export default Filtre;
