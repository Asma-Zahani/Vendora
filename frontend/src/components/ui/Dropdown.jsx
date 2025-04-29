/* eslint-disable react/prop-types */
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";

const Dropdown = ({ label, name, options, selectedValue, onSelect, isOpen, toggleOpen, target }) => {
  const selectedOption = options.find(option => option.value === selectedValue);
  return (
    <div className={`${target ? "mb-4" : ""}`}>
      <div className="relative">
        {target && <Label label={label} />}
        <Input value={selectedOption ? `${selectedOption.label}` :  `Select a ${label}`} isOpen={isOpen} name={name} onClick={toggleOpen} required readOnly/>
        {isOpen && options.length > 0 && (
          <div className="absolute mt-1 z-[9999] w-full bg-customLight dark:bg-contentDark border border-gray-300 dark:border-borderDark rounded-md shadow-lg max-h-50 overflow-x-auto scrollbar">
            {options.map((option, index) => (
              <div key={index} className={`px-4 py-2 text-gray-700 rounded-md hover:bg-purpleLight hover:text-white dark:hover:text-white cursor-pointer 
                ${ selectedValue === option.value ? "bg-purpleLight text-white" : "dark:text-grayDark" }`}
                onClick={() => onSelect(target ? { target: { name, value: option.value } } : { name, value: option.value })}> {option.label} 
              </div> 
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
