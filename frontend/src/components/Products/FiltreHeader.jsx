/* eslint-disable react/prop-types */
import { useState } from "react";
import { Grid, List } from "lucide-react";
import Dropdown from "@/components/ui/Dropdown";

const FiltreHeader = ({ gridInfo, onSortChange, indexOfFirstItem, indexOfLastItem, totalItems }) => {
  const [selectedSort, setSelectedSort] = useState("default");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Options de tri
  const sortOptions = [
    { value: "default", label: "Trier par" },
    { value: "lowToHigh", label: "Prix : du plus bas au plus élevé" },
    { value: "highToLow", label: "Prix : du plus élevé au plus bas" },
    { value: "alphaAsc", label: "Nom : A-Z" },
    { value: "alphaDesc", label: "Nom : Z-A" },
  ];

  const handleSortChange = (selected) => {
    setSelectedSort(selected.value);
    onSortChange(selected.value); // Envoie la valeur au parent
    setIsDropdownOpen(false);
  };

  return (
    <div className="mt-8 flex items-center justify-between">
      <div className="flex gap-3">
        <div onClick={() => gridInfo.handleConfigGridChange("isGrid",true)} className={`p-2 hover:bg-bgLight hover:dark:bg-bgDark rounded-md text-purpleLight ${gridInfo.isGrid ? "bg-bgLight dark:bg-bgDark" : ""}`}>
          <Grid size={17} />
        </div>
        <div onClick={() => gridInfo.handleConfigGridChange("isGrid",false)} className={`p-2 hover:bg-bgLight hover:dark:bg-bgDark rounded-md text-purpleLight ${!gridInfo.isGrid ? "bg-bgLight dark:bg-bgDark" : ""}`} >
          <List size={17} />
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
  );
};

export default FiltreHeader;
