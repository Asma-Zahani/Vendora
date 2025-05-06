/* eslint-disable react/prop-types */
import ShowPassword from "@/components/ui/ShowPassword";
import { ChevronDown } from "lucide-react";

const Input = ({type = "text", name, value, onChange, onClick, isOpen, placeholder = "", width = "", error, onToggle, required = false, readOnly = false}) => {
  const hasDropdown = typeof isOpen !== "undefined";
  const hasToggle = typeof onToggle !== "undefined";
  const hasError = Boolean(error);

  return (
    (!hasDropdown && !hasToggle) ? (
      <>
        <input type={type} name={name} value={value} onChange={onChange} onClick={onClick} placeholder={placeholder} required={required} readOnly={readOnly}
          className={`mt-1 px-4 py-2 text-gray-700 dark:text-grayDark dark:bg-contentDark focus:outline-none rounded-md border border-gray-300 dark:border-borderDark placeholder:text-gray-300 dark:placeholder:text-grayDark ${width || "w-full"} ${onClick ? "cursor-pointer" : ""}`} />
        {hasError && (
          <div className="text-sm text-red-500 mt-1">
            {Array.isArray(error) ? error.map((e, i) => <p key={i}>{e}</p>) : <p>{error}</p>}
          </div>
        )}
      </>
    ) : 
    (
      <div className="flex flex-col">
        <div className="relative flex items-center">
          <input type={type} name={name} value={value} onChange={onChange} onClick={onClick} placeholder={placeholder} required={required} readOnly={readOnly}
            className={`mt-1 px-4 py-2 pr-10 text-gray-700 dark:text-grayDark dark:bg-contentDark focus:outline-none rounded-md border border-gray-300 dark:border-borderDark placeholder:text-gray-300 dark:placeholder:text-grayDark ${width || "w-full"} ${onClick ? "cursor-pointer" : ""}`} />
          {hasDropdown && <ChevronDown className={`absolute right-3 w-5 h-5 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} />}
          {hasToggle && <ShowPassword onToggle={onToggle}/>}
        </div>
        {hasError && (
          <div className="text-sm text-red-500 mt-1">
            {Array.isArray(error) ? error.map((e, i) => <p key={i}>{e}</p>) : <p>{error}</p>}
          </div>
        )}
      </div>
    )
  );
};

export default Input;
