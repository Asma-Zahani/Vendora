/* eslint-disable react/prop-types */
import { useState } from "react";
import Card from "@/components/Products/Card";
import List from "@/components/Products/List";
import Filtre from "@/components/Products/FiltreAsma";

const FilteredProducts = ({ datas, gridCols, isGrid, filtres }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [maxPrice, setMaxPrice] = useState(1000);

    const currentItems = datas.filter(item => {
        const matchesSearchTerm = searchTerm.length === 0 ||
            item.nom?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description?.toString().toLowerCase().includes(searchTerm.toLowerCase());
            
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.categorie_id);
        const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(item.marque_id);
        const matchesColor = selectedColors.length === 0 || item.couleurs_id.some(couleurId => selectedColors.includes(couleurId));
        const matchesPrice = parseFloat(item.prix_apres_promo) <= parseFloat(maxPrice);
        
        return matchesSearchTerm && matchesCategory && matchesBrand && matchesColor && matchesPrice;
    });
    
    const selectedFiltres = {selectedCategories, setSelectedCategories, selectedBrands, setSelectedBrands, selectedColors, setSelectedColors};
    
    return (
        <div>
            <Filtre filtres={filtres} selectedFiltres={selectedFiltres}
                searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
            <div className={`mt-10 ${isGrid ? "grid gap-6" : "flex flex-col gap-4"}`}
                style={isGrid ? { gridTemplateColumns: `repeat(${gridCols}, 1fr)` } : {}}>
                {datas.length > 0 && 
                    currentItems.length > 0 ? currentItems.map((produit,index) => (
                        isGrid ? (
                        <Card key={index} produit={produit} />
                        ) : (
                        <List key={index} produit={produit} />
                        )
                    )) : (
                        <div className="flex justify-center items-center w-full h-full">
                            <p>Aucun produit pour le moment</p>
                        </div>
                    )}
            </div>
        </div>
    );
}

export default FilteredProducts;