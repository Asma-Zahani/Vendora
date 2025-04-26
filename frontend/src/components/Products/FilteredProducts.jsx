/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Card from "@/components/Products/Card";
import List from "@/components/Products/List";
import Filtre from "@/components/Products/Filtre";
import FiltreHeader from "@/components/Products/FiltreHeader";
import Pagination from "@/components/Pagination/ProductPagination";

const FilteredProducts = ({ wishlist, data, gridInfo, filtres, ajouterAuPanier, ajouterAuListeSouhait, productConfig, selectedFiltres }) => {
    const [sortOption, setSortOption] = useState("default");

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

    return (
        <div className="mx-0 lg:mx-20 gap-2 sm:gap-6">
            <FiltreHeader gridInfo={gridInfo} indexOfFirstItem={data.from - 1} indexOfLastItem={data.to} totalItems={data.total} onSortChange={setSortOption}/>
            <Filtre filtres={filtres} selectedFiltres={selectedFiltres} productConfig={productConfig}/>
            <div className={`mt-10 ${gridInfo.isGrid ? `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${gridInfo.gridCols}` : "flex flex-col gap-4"}`}>

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
