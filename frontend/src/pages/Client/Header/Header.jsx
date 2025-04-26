import { useContext , useState, useRef } from "react";
import { ShoppingCart, User2, Menu, Heart } from 'lucide-react';
import logo from "@/assets/logo/logo.svg";
import DarkMode from "@/utils/DarkMode";
import { UserContext } from "@/utils/UserContext";
import { Link } from "react-router";
import UserAction from "@/components/Header/UserAction";
import BgLogo from "@/assets/logo/bg-logo.png";

const Header = () => {
  const { user, wishlist, panier } = useContext(UserContext);
  const menuRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  
  return (
    <header
      className="w-full fixed left-0 bg-customLight dark:bg-customDark border-b border-contentLight dark:border-borderDark dark:shadow-none transition-all">
      <div className="mx-0 lg:mx-10 px-4">
        <div className="flex items-center w-full">
          <div className="flex items-center justify-between px-4 py-2 relative">
            <button ref={menuRef} onClick={() => {setShowDropdown(!showDropdown)}} type="button" className="relative flex justify-center items-center -ml-2 mr-2 lg:ml-5 p-0 sm:p-2 transition-all h-[37.5px] duration-75 ease-linear rounded-md order-none lg:order-1">
              <Menu className="w-5 h-5" />
            </button>
            <Link to="/" className="order-1 lg:order-none relative">
              <img src={logo} alt="Logo" className="h-14 sm:h-20 relative z-10" />
              <div style={{ backgroundImage: `url(${BgLogo})` }} className="absolute inset-0 bg-cover bg-center z-0"
              ></div>
            </Link>

            {showDropdown && (
              <div className="absolute bg-contentLight dark:bg-contentDark shadow-md rounded w-48 mt-2 z-50"
                style={{
                  top: menuRef.current ? menuRef.current.offsetTop + 40 : "auto",
                  left: menuRef.current ? menuRef.current.offsetLeft : "auto",
                }}
              >
                <ul className="flex flex-col">
                  <li>
                    <Link onClick={() => {setShowDropdown(!showDropdown)}} to="/boutique" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                      Page Boutique
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => {setShowDropdown(!showDropdown)}} to="/contact" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                      Contactez-nous
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="flex gap-3 ms-auto pr-0 lg:pr-2 md:pr-5">

            <div className="inline-flex relative items-center sm:pl-0.5 -mr-4 sm:-mr-2">
              <Link to="/cart" className="w-10 h-10 flex items-center justify-center rounded-full p-2 transition-all duration-300 hover:scale-110">
                <ShoppingCart className="inline-block w-5 h-5 stroke-1 transition-transform duration-300 transform rotate-[360deg]" />
                <span className="absolute top-0 right-0 flex items-center justify-center min-w-[16px] min-h-[16px] text-xs font-bold text-white bg-red-500 rounded-full transition-transform duration-300 transform rotate-[360deg]">
                  {user ? panier?.reduce((total) => total + 1, 0) : 0} 
                </span>
              </Link>
            </div>

            <div className="inline-flex relative items-center sm:border-l-2 dark:border-borderDark sm:pl-0.5 -mr-4 sm:-mr-2">
              <Link to="/wishlist" className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110">
                <Heart className="inline-block w-5 h-5 stroke-1 transition-transform duration-300 transform rotate-[360deg]"  />
                <span className="absolute top-0 right-0 flex items-center justify-center min-w-[16px] min-h-[16px] text-xs font-bold text-white bg-red-500 rounded-full transition-transform duration-300 transform rotate-[360deg]">
                  {user ? wishlist?.reduce((total) => total + 1, 0) : 0} 
                </span>
              </Link>
            </div>

            <div className="relative flex items-center sm:border-l-2 sm:border-r-2 dark:border-borderDark sm:pl-1 -mr-4 sm:-mr-2">
              <DarkMode />
            </div>

            {user ?
              <UserAction home={true} />
              :
              <div className="relative flex items-center transition-all duration-300 hover:scale-110 -mr-4 sm:mr-0">
                <div className="relative flex items-center">
                  <Link to="/login" className="leading-4 text-sm flex items-center justify-center">
                    <div type="button" className="w-10 h-10 rounded-full p-2">
                      <User2 className="inline-block w-5 h-5 stroke-1" />
                    </div>
                    <p className="hidden sm:block">Connexion</p>
                  </Link>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;