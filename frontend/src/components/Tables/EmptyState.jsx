/* eslint-disable react/prop-types */
import { Plus, Search, Database } from "lucide-react";

const EmptyState = ({ label, searchTerm, setSearchTerm, data }) => {
    return (
        <div className="flex items-center justify-center text-center h-80">
            <div className="flex flex-col max-w-sm">
                {data.length > 0 ?
                    <div className="p-3 mx-auto bg-bgLight dark:bg-bgDark text-purpleLight rounded-full">
                        <Search size={20} />
                    </div> :
                    <div className="p-3 mx-auto bg-bgLight dark:bg-bgDark text-purpleLight rounded-full">
                        <Database size={20} />
                    </div>
                }
                <h1 className="mt-3 text-lg text-gray-800 dark:text-white">Aucun {label.slice(0, -1)} trouvé</h1>
                {data.length > 0 ? 
                    <p className="mt-2 text-gray-500 dark:text-gray-400">Votre recherche “{searchTerm}” n’a pas correspondue à aucune {label.slice(0, -1)}. Veuillez réessayer ou ajouter un nouveau {label.slice(0, -1)}.</p> 
                    :
                    <p className="mt-2 text-gray-500 dark:text-gray-400">Aucune donnée à afficher pour le moment.</p>
                }
                <div className="flex items-center justify-center mt-4 gap-x-3">
                    {data.length > 0 && 
                        <button onClick={() => {setSearchTerm('');}} className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border border-borderGrayLight dark:border-borderGrayDark rounded-md">
                            Effacer la recherche
                        </button>
                    }
                    <button className="flex items-center px-4 py-2 text-sm text-white bg-purpleLight rounded-md gap-x-2">
                        <Plus size={17} />
                        <span>Ajouter {label}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmptyState;
