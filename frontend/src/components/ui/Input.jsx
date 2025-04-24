/* eslint-disable react/prop-types */

const Input = ({type = "text", name, value, onChange, onClick, placeholder = "", width = "", error, required = false, readOnly = false}) => {
  return (
    <div>
      <input type={type} name={name} value={value} onChange={onChange} onClick={onClick} placeholder={placeholder} required={required} readOnly={readOnly}
        className={`mt-1 px-4 py-2 text-gray-700 dark:text-grayDark dark:bg-contentDark focus:outline-none rounded-md border border-gray-300 dark:border-borderDark placeholder:text-gray-300 dark:placeholder:text-grayDark ${width ? width : "w-full"} ${onClick ? "cursor-pointer" : ""}`}/>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default Input;
