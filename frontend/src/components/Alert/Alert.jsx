import { BellRing, X } from "lucide-react";

/* eslint-disable react/prop-types */
const Alert = ({successMessage, setSuccessMessage}) => {

    return (
        <div data-aos="fade-down" data-aos-duration="800" className={`fixed top-15 right-10 flex items-center p-4 text-purpleLight bg-contentLight dark:bg-contentDark shadow-lg 
            transition-all duration-1000 ease-in-out ${successMessage ? "border-l-4 border-purpleLight" : "border-0"}`} >
            <div className="absolute py-[34px] w-full -mx-5 border-b-1 border-purpleLight"></div>
            <BellRing size={20} className="dark:text-white" />
            <span className="ml-3 text-sm font-medium pr-20">{successMessage}</span>
            <button  type="button" onClick={() => {setSuccessMessage(""); console.log(successMessage)}} className="ml-auto bg-transparent text-purpleLight rounded-lg p-1.5" >
                <X/>
            </button>
        </div>
    );
};

export default Alert;
