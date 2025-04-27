import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import ThemeContext from '@/utils/ThemeContext';
import { ShoppingCart, User2, Menu, Heart, Moon, Sun } from 'lucide-react';
import logo from "@/assets/logo/logo.svg";
import { UserContext } from "@/utils/UserContext";
import { Link } from "react-router";
import UserAction from "@/components/Header/UserAction";
import LightBgLogo from "@/assets/logo/bg-logo-light.png";
import DarkBgLogo from "@/assets/logo/bg-logo-dark.png";

const Header = () => {
  const location = useLocation();
  const { theme, setTheme } = useContext(ThemeContext);
  const { user, wishlist, panier } = useContext(UserContext);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const links = [
    { to: "/", text: "Home" },
    { to: "/about", text: "About" },
    { to: "/boutique", text: "Boutique" },
    { to: "/contact", text: "Contact" },
  ];
  
  return (
    <>
      <header className="w-full fixed left-0 bg-customLight dark:bg-customDark border-b border-contentLight dark:border-borderDark dark:shadow-none transition-all">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-2 px-4 sm:px-0">
          <Link to="/" className="relative">
            <img src={logo} alt="Logo" className="h-14 sm:h-20 relative z-10" />
            <div style={{ backgroundImage: `url(${theme === "light" ? LightBgLogo : DarkBgLogo})` }} className="absolute inset-0 bg-cover bg-center z-0"></div>
          </Link>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className="flex gap-3 ms-auto pr-0 lg:pr-2 md:pr-5">
              <div className="hidden sm:flex relative items-center sm:pl-0.5 -mr-4 sm:-mr-2">
                <Link to="/cart" className="w-10 h-10 flex items-center justify-center rounded-full p-2 transition-all duration-300 hover:scale-110">
                  <ShoppingCart className="inline-block w-5 h-5 stroke-1 transition-transform duration-300 transform rotate-[360deg]" />
                  <span className="absolute top-0 right-0 flex items-center justify-center min-w-[16px] min-h-[16px] text-xs font-bold text-white bg-red-500 rounded-full transition-transform duration-300 transform rotate-[360deg]">
                    {user ? panier?.reduce((total) => total + 1, 0) : 0} 
                  </span>
                </Link>
              </div>
              <div className="hidden sm:flex relative items-center sm:border-l-2 dark:border-borderDark sm:pl-0.5 sm:-mr-2">
                <Link to="/wishlist" className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110">
                  <Heart className="inline-block w-5 h-5 stroke-1 transition-transform duration-300 transform rotate-[360deg]"  />
                  <span className="absolute top-0 right-0 flex items-center justify-center min-w-[16px] min-h-[16px] text-xs font-bold text-white bg-red-500 rounded-full transition-transform duration-300 transform rotate-[360deg]">
                    {user ? wishlist?.reduce((total) => total + 1, 0) : 0} 
                  </span>
                </Link>
              </div>
              <div className="relative hidden sm:flex items-center sm:border-l-2 sm:border-r-2 dark:border-borderDark sm:pl-1 sm:-mr-2">
                <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="w-10 h-10 flex items-center justify-center rounded-full transition-all p-2 duration-300 hover:scale-110">
                  {theme === "light" ? (
                    <Moon className="inline-block w-5 h-5 stroke-1 transition-transform duration-300 transform rotate-0" />
                  ) : (
                    <Sun className="inline-block w-5 h-5 stroke-1 transition-transform duration-300 transform rotate-[360deg]" />
                  )}
                </button>
              </div>
              {user ? <UserAction home={true} /> :
                <div className="relative hidden sm:flex items-center transition-all duration-300 hover:scale-110 -mr-4 sm:mr-0">
                  <div className="relative flex items-center">
                    <Link to="/login" className="leading-4 text-sm flex items-center justify-center">
                      <div type="button" className="w-10 h-10 rounded-full p-2">
                        <User2 className="inline-block w-5 h-5 stroke-1" />
                      </div>
                      <p className="hidden sm:block">Connexion</p>
                    </Link>
                  </div>
                </div>}
            </div>
            <button onClick={() => {setShowDropdown(!showDropdown)}} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-purpleLight rounded-lg sm:hidden hover:bg-bgLight dark:hover:bg-bgDark" aria-expanded={showDropdown}>
              <Menu className="w-5 h-5" />
            </button>
          </div>
          <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${showDropdown ? "flex" : "hidden"}`} id="navbar-user">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 w-full">
              {links.map((link, index) => (
                <li key={index} className="w-full">
                  <Link to={link.to} className={`block w-full md:p-0 py-2 px-3 rounded-sm ${location.pathname === link.to ? "text-white bg-purpleLight md:text-purpleLight" : "hover:bg-gray-100 hover:dark:bg-borderGrayDark md:hover:text-purpleLightHover"} md:bg-transparent md:hover:bg-transparent`}>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;