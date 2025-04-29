/* eslint-disable react/prop-types */
import { ChevronDown, Grid, List, Search } from "lucide-react";
import { useState } from "react";
import Dropdown from "@/components/ui/Dropdown";
import Checkbox from "@/components/ui/Checkbox";

const Filtre = ({ gridInfo, onSortChange, indexOfFirstItem, indexOfLastItem, totalItems, filtres, selectedFiltres, productConfig }) => {
  const [selectedSort, setSelectedSort] = useState("default");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: "default", label: "Trier par" },
    { value: "lowToHigh", label: "Prix : du plus bas au plus élevé" },
    { value: "highToLow", label: "Prix : du plus élevé au plus bas" },
    { value: "alphaAsc", label: "Nom : A-Z" },
    { value: "alphaDesc", label: "Nom : Z-A" },
  ];

  const handleSortChange = (selected) => {
    setSelectedSort(selected.value);
    onSortChange(selected.value);
    setIsDropdownOpen(false);
  };

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
    <>
      <div className="mt-8 flex items-center justify-between">
        <div className="flex gap-3 mt-1">
          <div onClick={() => gridInfo.handleConfigGridChange("isGrid",true)} className={`p-2.5 sm:p-2 hover:bg-bgLight hover:dark:bg-bgDark rounded-md text-purpleLight ${gridInfo.isGrid ? "bg-bgLight dark:bg-bgDark" : ""}`}>
            <Grid className="h-5.5 w-5.5 sm:h-4 sm:w-4"  />
          </div>
          <div onClick={() => gridInfo.handleConfigGridChange("isGrid",false)} className={`p-2.5 sm:p-2 hidden sm:flex hover:bg-bgLight hover:dark:bg-bgDark rounded-md text-purpleLight ${!gridInfo.isGrid ? "bg-bgLight dark:bg-bgDark" : ""}`} >
            <List className="h-5.5 w-5.5 sm:h-4 sm:w-4" />
          </div>
          {gridInfo.isGrid && (
            <div className="hidden md:hidden lg:flex gap-2">
              {[3, 4, 5].map((cols) => (
                <div key={cols} className="flex gap-0.5" onClick={() => gridInfo.handleConfigGridChange("gridCols",cols)}>
                  {Array.from({ length: cols }).map((_, index) => (
                    <button key={index} className={`my-2 w-1 rounded-md ${gridInfo.gridCols === cols ? "bg-purpleLight" : "bg-black dark:bg-white"}`}></button>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {totalItems > 0 && 
            <span className="text-sm text-gray-700 dark:text-gray-400 hidden md:block lg:block">
                Affichage de <span className="font-semibold text-gray-900 dark:text-white">{indexOfFirstItem + 1}</span> {" "}
                à <span className="font-semibold text-gray-900 dark:text-white">{indexOfLastItem}</span> sur {" "}
                <span className="font-semibold text-gray-900 dark:text-white">{totalItems}</span> entrées
            </span>
          }
          <Dropdown options={sortOptions} selectedValue={selectedSort} onSelect={handleSortChange} isOpen={isDropdownOpen} toggleOpen={() => setIsDropdownOpen(!isDropdownOpen)}/>
        </div>
      </div>
      <div className="mt-6 relative z-50 sm:flex sm:items-center sm:space-x-3 sm:w-full">
        <div className="relative flex items-center">
          <div className="relative">
            <div className="w-74 sm:w-64 flex items-center justify-between cursor-pointer border border-gray-300 dark:border-borderDark bg-customLight dark:bg-customDark rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition duration-200" onClick={() => setIsOpen(!isOpen)}>
              <span className="text-gray-700 dark:text-gray-300 font-medium">Filtres</span>
              <ChevronDown className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} />
            </div>
            {isOpen && (
              <div className="absolute bg-customLight dark:bg-customDark p-4 mt-1 shadow-lg rounded-lg w-74 sm:w-64 z-20 top-full left-0 border border-gray-200 dark:border-borderDark max-h-120 overflow-x-auto scrollbar">
                <div className="mb-4">
                  <h4 className="text-md font-semibold mb-2 text-gray-800 dark:text-gray-200">Catégorie</h4>
                  <div className="space-y-2">
                  {filtres.categories.length > 0 ? (
                      filtres.categories.map((category) => (
                        <label key={category.categorie_id} className="flex items-center space-x-2 cursor-pointer">
                          <Checkbox checked={selectedFiltres.selectedCategories.includes(category.categorie_id)} onChange={() => toggleCategory(category.categorie_id)} />
                          <span className="text-gray-700 dark:text-gray-300">{category.titre}</span>
                        </label>
                      ))
                    ) : (
                      <p className="text-gray-700 dark:text-gray-300">Aucune catégorie disponible.</p>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-md font-semibold mb-2 text-gray-800 dark:text-gray-200">Marque</h4>
                  <div className="space-y-2">
                  {filtres.marques.length > 0 ? (
                      filtres.marques.map((brand) => (
                        <label key={brand.marque_id} className="flex items-center space-x-2 cursor-pointer">
                          <Checkbox checked={selectedFiltres.selectedBrands.includes(brand.marque_id)} onChange={() => toggleBrand(brand.marque_id)} />
                          <span className="text-gray-700 dark:text-gray-300">{brand.nom}</span>
                        </label>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">Aucune marque disponible</p>
                    )}
                  </div>
                </div> 

                <div className="mb-4">
                  <h4 className="text-md font-semibold mb-2 text-gray-800 dark:text-gray-200">Couleurs</h4>
                  <div className="flex gap-2 overflow-y-auto scrollbar flex-grow pr-2">
                    {filtres.couleurs.map((color) => {
                      return (
                        <div key={color.couleur_id} className="relative">
                          <div style={{ backgroundColor: color.code_hex }} onClick={() => toggleColor(color.couleur_id)} className={`w-8 h-8 rounded-full border-2 cursor-pointer ${selectedFiltres.selectedColors.includes(color.couleur_id) ? 'border-purpleLight scale-110' : 'border-borderGrayLight dark:border-borderGrayDark'}`}/>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-md font-semibold mb-2 text-gray-800 dark:text-gray-200">Prix</h4>
                  
                  <input id="minmax-range" type="range" min="0" max="1000" value={selectedFiltres.maxPrice} onChange={(e) => selectedFiltres.setMaxPrice(parseFloat(e.target.value))}  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 range-slider"></input>
                  <p className="mt-1 text-sm text-gray-600">Prix maximum: {selectedFiltres.maxPrice} DT</p>
                </div>
              </div>
            )}
          </div>
        </div> 

        <div className="relative flex items-center flex-1 mt-4 sm:mt-0">
          <span className="absolute left-3">
            <Search className="w-5 h-5 text-gray-400 dark:text-borderDark" />
          </span>
          <input type="text" placeholder="Rechercher" value={productConfig.searchTerm} onChange={(e) => {productConfig.handleConfigChange("searchTerm", e.target.value);}} 
            className="block w-full py-1.5 pr-5 pl-10 dark:bg-contentDark text-gray-700 dark:text-gray-300 border border-borderGrayLight dark:border-borderDark rounded-md placeholder-gray-400/70 focus:border-purpleLight focus:dark:border-borderDark focus:ring-2 focus:ring-bgLight focus:dark:ring-bgDark focus-visible:outline-none" />
        </div>
      </div>
    </>
  );
}

export default Filtre;
