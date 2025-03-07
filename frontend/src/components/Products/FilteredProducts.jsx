/* eslint-disable react/prop-types */
import { useState } from "react";
import Card from "@/components/Products/Card";
import List from "@/components/Products/List";
import Filtre from "@/components/Products/Filtre";
import FiltreHeader from "@/components/Products/FiltreHeader";

const FilteredProducts = ({ datas, gridInfo, filtres, ajouterAuPanier }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [sortOption, setSortOption] = useState("default");

    // Filtrage des produits
    let currentItems = datas.filter(item => {
        const matchesSearchTerm =
            searchTerm.length === 0 ||
            item.nom?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description?.toString().toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.categorie_id);
        const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(item.marque_id);
        const matchesColor = selectedColors.length === 0 || item.couleurs.some(couleur => selectedColors.includes(couleur.couleur_id));
        const matchesPrice = parseFloat(item.prix_apres_promo) <= parseFloat(maxPrice);

        return matchesSearchTerm && matchesCategory && matchesBrand && matchesColor && matchesPrice;
    });

    // Tri des produits en fonction de l'option sélectionnée
    switch (sortOption) {
        case "lowToHigh":
            currentItems.sort((a, b) => parseFloat(a.prix_apres_promo) - parseFloat(b.prix_apres_promo));
            break;
        case "highToLow":
            currentItems.sort((a, b) => parseFloat(b.prix_apres_promo) - parseFloat(a.prix_apres_promo));
            break;
        case "alphaAsc":
            currentItems.sort((a, b) => a.nom.localeCompare(b.nom));
            break;
        case "alphaDesc":
            currentItems.sort((a, b) => b.nom.localeCompare(a.nom));
            break;
        default:
            break;
    }

    const selectedFiltres = {
        selectedCategories, setSelectedCategories,
        selectedBrands, setSelectedBrands,
        selectedColors, setSelectedColors
    };

    return (
        <div>
            <FiltreHeader
                onChange={gridInfo.setGridCols}
                onToggleView={gridInfo.setIsGrid}
                isGrid={gridInfo.isGrid}
                gridCols={gridInfo.gridCols}
                onSortChange={setSortOption}  // Ajout de la gestion du tri
            />
            <Filtre
                filtres={filtres}
                selectedFiltres={selectedFiltres}
                searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                maxPrice={maxPrice} setMaxPrice={setMaxPrice}
            />
            <div className={`mt-10 gap-6 
                ${gridInfo.isGrid ? `grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${gridInfo.gridCols}` : "flex flex-col gap-4"}`}>

                {datas.length > 0 && currentItems.length > 0 ? (
                    currentItems.map((produit, index) => (
                        gridInfo.isGrid ? (
                            <Card key={index} produit={produit} ajouterAuPanier={ajouterAuPanier} />
                        ) : (
                            <List key={index} produit={produit} ajouterAuPanier={ajouterAuPanier} />
                        )
                    ))
                ) : (
                    <div className="flex justify-center items-center w-full h-full">
                        <p>Aucun produit pour le moment</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FilteredProducts;
