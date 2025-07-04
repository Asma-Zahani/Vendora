/* eslint-disable react/prop-types */
import { BellRing, X } from "lucide-react";
import { useEffect } from "react";

const Alert = ({successMessage, setSuccessMessage}) => {

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage("");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [setSuccessMessage, successMessage]);

    return (
        <div data-aos="fade-down" data-aos-duration="800" className={`fixed top-15 z-[999] mx-4 sm:right-10 flex items-center p-4 text-purpleLight bg-contentLight dark:bg-contentDark shadow-lg 
            transition-all duration-1000 ease-in-out ${successMessage ? "border-l-4 border-b-1 border-purpleLight" : "border-0"}`} >
            <div className="flex justify-end absolute py-[8px] w-full -mx-6">
                <button onClick={() => {setSuccessMessage(null)}} className="ml-auto bg-transparent text-purpleLight rounded-lg p-1.5" >
                    <X/>
                </button>
            </div>
            <BellRing size={20} className="dark:text-white" />
            <span className="ml-3 text-sm font-medium pr-20">{successMessage}</span>
        </div>
    );
};

export default Alert;
