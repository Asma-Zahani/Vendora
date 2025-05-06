/* eslint-disable react/prop-types */

import { ChevronDown } from "lucide-react";

const Input = ({type = "text", name, value, onChange, onClick, isOpen, placeholder = "", width = "", error, required = false, readOnly = false}) => {
  return (
    typeof isOpen !== 'undefined' ? (
      <div className="flex flex-col">
        <div className="relative flex items-center">
          <input type={type} name={name} value={value} onChange={onChange} onClick={onClick} placeholder={placeholder} required={required} readOnly={readOnly}
            className={`mt-1 px-4 py-2 text-gray-700 dark:text-grayDark dark:bg-contentDark focus:outline-none rounded-md border border-gray-300 dark:border-borderDark placeholder:text-gray-300 dark:placeholder:text-grayDark 
              ${width ? width : "w-full"} ${onClick ? "cursor-pointer" : ""}`}/>
          <ChevronDown className={`absolute right-3 w-5 h-5 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} />
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    ) : 
    (
      <input type={type} name={name} value={value} onChange={onChange} onClick={onClick} placeholder={placeholder} required={required} readOnly={readOnly}
            className={`mt-1 px-4 py-2 text-gray-700 dark:text-grayDark dark:bg-contentDark focus:outline-none rounded-md border border-gray-300 dark:border-borderDark placeholder:text-gray-300 dark:placeholder:text-grayDark 
              ${width ? width : "w-full"} ${onClick ? "cursor-pointer" : ""}`}/>
    )
  );
};

export default Input;