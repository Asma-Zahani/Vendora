/* eslint-disable react/prop-types */
const FilterButtons = ({ filtre, selectedFilter, setSelectedFilter }) => {
    return (
        <div className="inline-flex rounded-md border border-borderGrayLight dark:border-borderGrayDark divide-x dark:divide-borderGrayDark w-full sm:w-auto">
            {filtre.map((filter, index) => (
                <button key={index} className={`px-5 py-2 text-xs font-medium sm:text-sm w-full sm:w-auto ${selectedFilter === filter ? 
                    "bg-bgLight dark:bg-bgDark text-purpleLight" : "hover:bg-bgLight dark:hover:bg-bgDark"}`}
                        onClick={() => {setSelectedFilter(filter);}}> {filter}
                </button>
            ))}
        </div>
    );
};

export default FilterButtons;
