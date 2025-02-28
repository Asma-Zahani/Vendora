/* eslint-disable react/prop-types */
import { useState } from "react";
import { Grid, List } from "lucide-react";
import Dropdown from "@/components/ui/Dropdown";

const FiltreHeader = ({ onChange, onToggleView, isGrid, gridCols, onSortChange }) => {
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
    <div className="mt-4 flex items-center justify-between">
      <div className="flex gap-3">
        <div
          onClick={() => onToggleView(true)}
          className={`p-2 hover:bg-bgLight hover:dark:bg-bgDark rounded-md text-purpleLight ${
            isGrid ? "bg-bgLight dark:bg-bgDark" : ""
          }`}
        >
          <Grid size={17} />
        </div>
        <div
          onClick={() => onToggleView(false)}
          className={`p-2 hover:bg-bgLight hover:dark:bg-bgDark rounded-md text-purpleLight ${
            !isGrid ? "bg-bgLight dark:bg-bgDark" : ""
          }`}
        >
          <List size={17} />
        </div>
        {isGrid && (
          <div className="flex gap-2">
            {[2, 3, 4, 6].map((cols) => (
              <div key={cols} className="flex gap-0.5" onClick={() => onChange(cols)}>
                {Array.from({ length: cols }).map((_, index) => (
                  <button
                    key={index}
                    className={`my-2 w-1 rounded-md ${
                      gridCols === cols ? "bg-purpleLight" : "bg-black dark:bg-white"
                    }`}
                  ></button>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dropdown de tri */}
      <Dropdown
        options={sortOptions}
        selectedValue={selectedSort}
        onSelect={handleSortChange}
        isOpen={isDropdownOpen}
        toggleOpen={() => setIsDropdownOpen(!isDropdownOpen)}
      />
    </div>
  );
};

export default FiltreHeader;
