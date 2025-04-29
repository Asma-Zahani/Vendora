/* eslint-disable react/prop-types */
import logo from "@/assets/logo/logo.svg";
import ThemeContext from '@/utils/ThemeContext';
import Bg from "@/assets/coming-soon-bg.jpg";
import { Link } from "react-router";
import LightBgLogo from "@/assets/logo/bg-logo-light.png";
import DarkBgLogo from "@/assets/logo/bg-logo-dark.png";
import Icon from "@/assets/logo/logo-ico.svg";
import { useContext } from "react";

const FormContainer = ({children}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="relative flex items-center justify-center min-h-screen" style={{ backgroundImage: `url(${Bg})` }}>
      <div className="fixed inset-0 dark:bg-customDark/90 transition-opacity" aria-hidden="true" />
      <div className="relative w-[450px] mx-4">
        <div className="relative flex">
          <div style={{ backgroundImage: `url(${theme === "light" ? LightBgLogo : DarkBgLogo})` }} className="absolute h-24 w-48 bg-cover bg-center z-0 rounded-md"/>
          <div style={{ backgroundImage: `url(${Icon})` }} className="absolute mt-5 ml-3 h-14 w-14 bg-cover bg-center z-0 rounded-md"/>
          <Link to="/" className="relative z-10">
            <img src={logo} alt="Logo" className="h-24 mx-auto" />
          </Link>
        </div>
        <div className="bg-customLight dark:bg-contentDark rounded-lg shadow-2xl dark:shadow-gray-500/50 p-6 lg:p-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormContainer;