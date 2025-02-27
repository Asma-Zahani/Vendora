/* eslint-disable react/prop-types */
import Label from "./Label";
import Input from "./Input";

const Dropdown = ({ label, name, options, selectedValue, onSelect, isOpen, toggleOpen }) => {
  return (
    <div className="mb-4">
      <Label label={label}/>
      <div className="mt-1 relative">
        <Input value={selectedValue || `Select a ${label}`} name={name} onClick={toggleOpen} required readOnly/>
        {isOpen && (
          <div className="absolute mt-1 z-10 w-full bg-customLight dark:bg-contentDark border border-gray-300 dark:border-purpleLight rounded-md shadow-lg">
            {options.map((option, index) => (
              <div key={index} className={`px-4 py-2 text-gray-700 hover:bg-purpleLight hover:text-white dark:hover:text-white cursor-pointer 
                ${ selectedValue === option ? "bg-purpleLight text-white" : "dark:text-grayDark" }`}
                onClick={() => onSelect({ target: { name, value: option } })} > {option} </div> ))}
          </div>)}
      </div>
    </div>
  );
};

export default Dropdown;
