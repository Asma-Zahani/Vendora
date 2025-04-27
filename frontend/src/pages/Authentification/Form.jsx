/* eslint-disable react/prop-types */
import logo from "@/assets/logo/logo.svg";
import Bg from "@/assets/coming-soon-bg.jpg";
import { Link } from "react-router";

const FormContainer = ({children}) => {
    return (
        <div className="relative flex items-center justify-center min-h-screen" style={{ backgroundImage: `url(${Bg})` }}>
            <div className="absolute w-full h-full dark:bg-customDark dark:bg-opacity-80"></div>
            <div className="relative w-[450px] mx-10">
                <Link to="/" className="block mb-2 text-left">
                    <img className="h-24" src={logo} />
                </Link>
                <div className="bg-customLight dark:bg-contentDark rounded-lg shadow-2xl dark:shadow-gray-500/50 p-6 lg:p-10">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default FormContainer;