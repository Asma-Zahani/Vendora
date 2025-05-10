/* eslint-disable react/prop-types */
const Button = ({ isValid, onClick, text }) => {
  return (
    <button onClick={onClick} className={`w-full bg-purpleLight text-white py-2 rounded-md text-sm 
      ${ !isValid ? "opacity-50 cursor-not-allowed" : ""  }`} type="submit" disabled={!isValid}> {text}
    </button>
  );
};
  
export default Button;
  