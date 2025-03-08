/* eslint-disable react/prop-types */
import Input from "@/components/ui/Input";

const Dropdown = ({ label, name, options, selectedValue, onSelect, isOpen, toggleOpen }) => {
  const selectedOption = options.find(option => option.value === selectedValue);
  return (
    <div className="">
      <div className="relative">
        <Input value={selectedOption ? `${selectedOption.label}` :  `Select a ${label}`} name={name} onClick={toggleOpen} required readOnly/>
        {isOpen && (
          <div className="absolute mt-1 z-[9999] w-full bg-customLight dark:bg-contentDark border border-gray-300 dark:border-borderDark rounded-md shadow-lg max-h-50 overflow-x-auto scrollbar">
            {options.map((option, index) => (
              <div key={index} className={`px-4 py-2 text-gray-700 rounded-md hover:bg-purpleLight hover:text-white dark:hover:text-white cursor-pointer 
                ${ selectedValue === option.value ? "bg-purpleLight text-white" : "dark:text-grayDark" }`}
                onClick={() => onSelect({ name, value: option.value })} > {option.label} 
              </div> 
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
