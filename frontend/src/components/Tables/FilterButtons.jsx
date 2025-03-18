/* eslint-disable react/prop-types */
const FilterButtons = ({ filtre, selectedFilter, setSelectedFilter }) => {
    return (
        <div className="inline-flex rounded-md border border-borderGrayLight dark:border-borderGrayDark divide-x dark:divide-borderGrayDark w-full lg:w-auto">
            {filtre.map((filter, index) => (
                <button key={index} className={`px-5 py-2 text-xs font-medium lg:text-sm w-full lg:w-auto truncate ${selectedFilter === filter ? 
                    "bg-bgLight dark:bg-bgDark text-purpleLight" : "hover:bg-bgLight dark:hover:bg-bgDark"}`}
                        onClick={() => {setSelectedFilter(filter);}}> {filter.length > 10 ? filter.substring(0, 10) + '...' : filter}
                </button>
            ))}
        </div>
    );
};

export default FilterButtons;
