/* eslint-disable react/prop-types */
import { Search } from "lucide-react";
import { useState } from "react";
import Dropdown from "./Dropdown";

const Filtre = ({ filtres, selectedFiltres, productConfig }) => {
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
    <div className="mt-6 relative z-50 sm:flex sm:items-center sm:space-x-3 sm:w-full">
      <div className="relative flex items-center">
        <Dropdown isOpen={isOpen} toggleOpen={() => setIsOpen(!isOpen)}
          categories={filtres.categories} brands={filtres.marques} colors={filtres.couleurs} 
          selectedCategories={selectedFiltres.selectedCategories}
          toggleCategory={toggleCategory}
          selectedBrands={selectedFiltres.selectedBrands}
          toggleBrand={toggleBrand}
          selectedColors={selectedFiltres.selectedColors}
          toggleColor={toggleColor}
          maxPrice={selectedFiltres.maxPrice}
          setMaxPrice={selectedFiltres.setMaxPrice}
        />
      </div> 

      <div className="relative flex items-center flex-1 mt-4 sm:mt-0">
        <span className="absolute left-3">
          <Search className="w-5 h-5 text-gray-400 dark:text-borderDark" />
        </span>
        <input type="text" placeholder="Rechercher" value={productConfig.searchTerm} onChange={(e) => {productConfig.handleConfigChange("searchTerm", e.target.value);}} 
          className="block w-full py-1.5 pr-5 pl-10 dark:bg-contentDark text-gray-700 dark:text-gray-300 border border-borderGrayLight dark:border-borderDark rounded-md placeholder-gray-400/70 focus:border-purpleLight focus:dark:border-borderDark focus:ring-2 focus:ring-bgLight focus:dark:ring-bgDark focus-visible:outline-none" />
      </div>
    </div>
  );
}

export default Filtre;
