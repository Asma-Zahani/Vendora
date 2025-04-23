import { useContext , useState, useRef } from "react";
import { Search, ShoppingCart, User2, Menu, Heart } from 'lucide-react';
import logo from "@/assets/logo/logo.svg";
import DarkMode from "@/utils/DarkMode";
import { UserContext } from "@/utils/UserContext";
import { Link } from "react-router";
import UserAction from "@/components/Header/UserAction";

const Header = () => {
  const { user, wishlist, panier } = useContext(UserContext);
  const menuRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  
  return (
    <header
      className="w-full fixed left-0 bg-customLight dark:bg-customDark border-b border-contentLight dark:border-borderDark dark:shadow-none transition-all">
      <div className="mx-0 lg:mx-10 px-4 py-2 md:py-4 lg:py-4">
        <div className="flex items-center w-full">
          <div className="flex items-center justify-between px-4 py-2 relative">
            <button ref={menuRef} onClick={() => {setShowDropdown(!showDropdown)}} type="button" className="relative flex justify-center items-center ml-0 lg:ml-5 p-2 transition-all h-[37.5px] duration-75 ease-linear rounded-md order-none lg:order-1">
              <Menu className="w-5 h-5" />
            </button>
            <Link to="/" className="order-1 lg:order-none">
              <img src={logo} alt="Logo" className="h-8" />
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
          
          <div className="relative w-990:inline-flex hidden">
            <input type="text" className="py-3 p-6 dark:bg-contentDark bg-contentLight placeholder:text-black text-sm dark:placeholder:text-white rounded focus-visible:outline-0 min-w-[400px]" 
              placeholder="Type to Search .." autoComplete="off" 
            />
            <button type="button" className="transition-all duration-300 hover:scale-110 absolute right-3.5 top-2.5" >
              <Search className="inline-block size-5 transition-transform duration-300 transform rotate-[360deg]" />
            </button>
          </div>

          <div className="flex gap-3 ms-auto pr-0 lg:pr-2 md:pr-5">
            <div className="w-990:hidden relative flex items-center -mr-2">
              <button type="button" className="w-10 h-10 flex items-center justify-center rounded-full p-2 transition-all duration-300 hover:scale-110">
                <Search className="inline-block w-5 h-5 stroke-1 transition-transform duration-300 transform rotate-[360deg]" />
              </button>
            </div>

            <div className="inline-flex relative items-center border-l-2 dark:border-borderDark pl-0.5 w-990:border-none -mr-2">
              <Link to="/cart" className="w-10 h-10 flex items-center justify-center rounded-full p-2 transition-all duration-300 hover:scale-110">
                <ShoppingCart className="inline-block w-5 h-5 stroke-1 transition-transform duration-300 transform rotate-[360deg]" />
                <span className="absolute top-0 right-0 flex items-center justify-center min-w-[16px] min-h-[16px] text-xs font-bold text-white bg-red-500 rounded-full transition-transform duration-300 transform rotate-[360deg]">
                  {user ? panier?.reduce((total) => total + 1, 0) : 0} 
                </span>
              </Link>
            </div>

            <div className="inline-flex relative items-center border-l-2 dark:border-borderDark pl-0.5 -mr-2">
              <Link to="/wishlist" className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110">
                <Heart className="inline-block w-5 h-5 stroke-1 transition-transform duration-300 transform rotate-[360deg]"  />
                <span className="absolute top-0 right-0 flex items-center justify-center min-w-[16px] min-h-[16px] text-xs font-bold text-white bg-red-500 rounded-full transition-transform duration-300 transform rotate-[360deg]">
                  {user ? wishlist?.reduce((total) => total + 1, 0) : 0} 
                </span>
              </Link>
            </div>

            <div className="relative flex items-center border-l-2 border-r-2 dark:border-borderDark pl-1 -mr-2">
              <DarkMode />
            </div>

            {user ?
              <UserAction home={true} />
              :
              <div className="relative flex items-center dark:border-borderDark transition-all duration-300 hover:scale-110">
                <div className="relative flex items-center">
                  <Link to="/login" className="leading-4 text-sm flex items-center justify-center">
                    <div type="button" className="w-10 h-10 rounded-full p-2">
                      <User2 className="inline-block w-5 h-5 stroke-1" />
                    </div>
                    Connexion
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