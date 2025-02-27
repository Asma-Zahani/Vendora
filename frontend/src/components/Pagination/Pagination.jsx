/* eslint-disable react/prop-types */
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ indexOfFirstItem, indexOfLastItem, currentPage, totalItems, itemsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const generatePageNumbers = () => {
        const pageNumbers = [];        
        if (totalPages <= 6) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage === 1 || currentPage >= 2 ) pageNumbers.push(1);            
            if (currentPage > 3) pageNumbers.push("...");

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pageNumbers.push(i);
            }
            
            if (currentPage < totalPages - 2) pageNumbers.push("...");
            if (currentPage < totalPages - 1) pageNumbers.push(totalPages);
        }
        
        return pageNumbers;
    };

    const prevPage = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const nextPage = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    return (
        <div className="flex flex-col md:flex-row lg:flex-row items-center justify-between border-contentLight dark:border-borderDark pt-3">
            <span className="text-sm text-gray-700 dark:text-gray-400 hidden md:block lg:block">
                Affichage de <span className="font-semibold text-gray-900 dark:text-white">{indexOfFirstItem + 1}</span> {" "}
                à <span className="font-semibold text-gray-900 dark:text-white">{indexOfLastItem}</span> sur {" "}
                <span className="font-semibold text-gray-900 dark:text-white">{totalItems}</span> entrées
            </span>
            {totalPages > 1 && 
                <nav className="items-center justify-center">
                    <ul className="flex items-center -space-x-px h-8 text-sm">
                        {currentPage > 1 && 
                            <li>
                                <button onClick={prevPage} className="flex items-center justify-center px-2 text-gray-500 rounded-s-lg hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
                                    <ChevronLeft size={10} />
                                </button>
                            </li>
                        }
                        {generatePageNumbers().map((number, index) => (
                            <li key={index}>
                                {number === "..." ? (
                                    <span className="px-3 h-8 text-gray-500">...</span>
                                ) : (
                                    <button 
                                        onClick={() => onPageChange(number)}
                                        className={`flex items-center px-3 h-8 rounded-md ${currentPage === number ? 'text-white bg-purpleLight' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white'}`}
                                    >
                                        {number}
                                    </button>
                                )}
                            </li>
                        ))}
                        {currentPage < totalPages &&
                            <li>
                                <button onClick={nextPage} className="flex items-center justify-center px-3 h-8 text-gray-500 rounded-e-lg hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
                                    <ChevronRight size={10} />
                                </button>
                            </li>
                        }
                    </ul>
                </nav>
            }
        </div>
    );
};

export default Pagination;
