/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Card from "@/components/Products/Card";
import List from "@/components/Products/List";
import Filtre from "@/components/Products/Filtre";
import Pagination from "@/components/Pagination/ProductPagination";

const FilteredProducts = ({ wishlist, data, gridInfo, filtres, ajouterAuPanier, ajouterAuListeSouhait, productConfig, selectedFiltres }) => {
    const [sortOption, setSortOption] = useState("default");
    const [isSmScreen, setIsSmScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmScreen(window.innerWidth <= 640);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        switch (sortOption) {
            case "default":
                productConfig.toggleSortOrder("");
                break;
            case "lowToHigh":
                productConfig.toggleSortOrder("prix_apres_promo", "asc");
                break;
            case "highToLow":
                productConfig.toggleSortOrder("prix_apres_promo", "desc");
                break;
            case "alphaAsc":
                productConfig.toggleSortOrder("nom", "asc");
                break;
            case "alphaDesc":
                productConfig.toggleSortOrder("nom", "desc");
                break;
            default:
                break;
        }
    }, [sortOption]);  

    useEffect(() => {
        if (isSmScreen) {
            gridInfo.handleConfigGridChange("isGrid", true);
        }
    }, [isSmScreen, gridInfo.handleConfigGridChange]);

    return (
        <div className="mx-0 lg:mx-20">
            <Filtre gridInfo={gridInfo} indexOfFirstItem={data.from - 1} indexOfLastItem={data.to} totalItems={data.total} onSortChange={setSortOption} filtres={filtres} selectedFiltres={selectedFiltres} productConfig={productConfig}/>
            <div className={`mt-10 ${gridInfo.isGrid ? `gap-2 sm:gap-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${gridInfo.gridCols}` : "hidden sm:flex flex-col"}`}>
                {data.data?.length > 0 ? (
                    data.data?.map((produit, index) => (
                        gridInfo.isGrid ? (
                            <Card key={index} wishlist={wishlist} produit={produit} ajouterAuPanier={ajouterAuPanier} ajouterAuListeSouhait={ajouterAuListeSouhait} />
                        ) : (
                            <List key={index} list={true} wishlist={wishlist} produit={produit} ajouterAuPanier={ajouterAuPanier} ajouterAuListeSouhait={ajouterAuListeSouhait} />
                        )
                    ))
                ) : (
                    <div className="flex justify-center items-center w-full h-full">
                        <p>Aucun produit pour le moment</p>
                    </div>
                )}
            </div>
            {data.data?.length > 0 && (
                <Pagination currentPage={data.current_page} totalItems={data.total} itemsPerPage={data.per_page} 
                    onPageChange={(pageNumber) => productConfig.handlePageChange(pageNumber)}/>
            )}
        </div>
    );
}

export default FilteredProducts;