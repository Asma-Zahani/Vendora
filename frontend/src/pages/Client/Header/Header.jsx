import { useContext , useState, useRef } from "react";
import { Search, ShoppingCart, Settings, User, LogIn, User2, Menu, Heart } from 'lucide-react';
import ProfileMale from "@/assets/default/user_male.png";
import ProfileFemale from "@/assets/default/user_female.png";
import logo from "@/assets/logo/logo.svg";
import DarkMode from "@/utils/DarkMode";
import { UserContext } from "@/utils/UserContext";
import { Link } from "react-router";
import { handleLogout } from "@/service/AuthService";

const Header = () => {
  const { user, panier, wishlist, token, setUser, setToken } = useContext(UserContext);
  const menuRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header
      className="w-full bg-customLight dark:bg-customDark dark:shadow-none transition-all duration-300 relative">
      <div className="mx-0 lg:mx-10 px-4 py-2 md:py-4 lg:py-4">
        <div className="flex items-center w-full">
          <div className="flex items-center justify-between px-4 py-2 relative">
            <button
              ref={menuRef}
              onClick={toggleDropdown}
              type="button"
              className="relative flex justify-center items-center ml-0 lg:ml-5 p-2 transition-all h-[37.5px] duration-75 ease-linear rounded-md order-none lg:order-1"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link to="/" className="order-1 lg:order-none">
              <img src={logo} alt="Logo" className="h-8" />
            </Link>

            {showDropdown && (
              <div
                className="absolute bg-contentLight dark:bg-contentDark shadow-md rounded w-48 mt-2 z-50"
                style={{
                  top: menuRef.current ? menuRef.current.offsetTop + 40 : "auto",
                  left: menuRef.current ? menuRef.current.offsetLeft : "auto",
                }}
              >
                <ul className="flex flex-col">
                  <li>
                    <Link onClick={toggleDropdown} to="/shop" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                      Page Boutique
                    </Link>
                  </li>
                  <li>
                    <Link onClick={toggleDropdown} to="/contact" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
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
                {user && panier &&
                  <span className="absolute top-0 right-0 flex items-center justify-center min-w-[16px] min-h-[16px] text-xs font-bold text-white bg-red-500 rounded-full transition-transform duration-300 transform rotate-[360deg]">
                    {panier.reduce((total) => total + 1, 0)} 
                  </span>
                }
              </Link>
            </div>

            <div className="inline-flex relative items-center border-l-2 dark:border-borderDark pl-0.5 -mr-2">
              <Link to="/wishlist" className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110">
                <Heart className="inline-block w-5 h-5 stroke-1 transition-transform duration-300 transform rotate-[360deg]"  />
                {user && wishlist &&
                  <span className="absolute top-0 right-0 flex items-center justify-center min-w-[16px] min-h-[16px] text-xs font-bold text-white bg-red-500 rounded-full transition-transform duration-300 transform rotate-[360deg]">
                    {wishlist.reduce((total) => total + 1, 0)} 
                  </span>
                }
              </Link>
            </div>

            <div className="relative flex items-center border-l-2 border-r-2 dark:border-borderDark pl-1 -mr-2">
              <DarkMode />
            </div>

            {user && 
              <div className="relative group flex items-center dark:border-borderDark pl-4 -my-3">
                <button type="button" className="inline-block p-0 transition-all duration-200 ease-linear rounded-full">
                  <div className="bg-bgDark rounded-full w-[29px] h-[29px] md:w-[39px] md:h-[39px] lg:w-[39px] lg:h-[39px]">
                    {user.genre === "male" ? <img src={ProfileMale} alt="" className="w-full h-full rounded-full" /> : <img src={ProfileFemale} alt="" className="w-full h-full rounded-full" />}
                  </div>
                </button>
                <div className="lg:flex hidden flex-col items-start justify-center pl-2">
                  <span className="text-md">{user.prenom + ' ' + user.nom}</span>
                </div>
                <ul className="absolute hidden group-hover:flex flex-col bg-contentLight dark:bg-contentDark shadow-md p-2 rounded w-40 z-80 top-[60px] right-[-20px]">
                  <Link to={"updateProfile"} className="flex items-center py-3 px-4 leading-4 cursor-pointer border-b dark:border-borderDark">
                    <User size={15} className="mr-2" /> Account
                  </Link>
                  <li className="flex items-center py-3 px-4 leading-4 cursor-pointer border-b dark:border-borderDark">
                    <Settings size={15} className="mr-2" /> Settings
                  </li>
                  <li className="flex items-center py-3 px-4 leading-4 cursor-pointer">
                    <form onSubmit={() => handleLogout(token, setUser, setToken)} className="w-full">
                      <button className="flex items-center w-full">
                        <LogIn size={15} className="mr-2" /> Log Out
                      </button>
                    </form>
                  </li>
                </ul>
              </div>
            }
            
            {!user && 
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