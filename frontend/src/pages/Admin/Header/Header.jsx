import { ChevronsLeft, ChevronsRight, Search, ShoppingCart, Settings, ChevronDown, User, LogIn, Bell, Menu } from 'lucide-react';
import ProfileMale from "@/assets/default/user_male.png";
import ProfileFemale from "@/assets/default/user_female.png";
import DarkMode from "@/utils/DarkMode";
import { UserContext } from '@/utils/UserContext';
import { useContext } from 'react';
import { handleLogout } from "@/service/AuthService";

// eslint-disable-next-line react/prop-types
const Header = ({ isSidebarVisible, toggleSidebar, toggleDrawerOpen }) => {
  const { user, token, setUser, setToken } = useContext(UserContext);

  return (
    <header className={`w-full fixed z-20 left-0 bg-customLight dark:bg-customDark border-b border-contentLight dark:border-borderDark dark:shadow-none
      ${ isSidebarVisible ? "lg:ml-[16.25rem] lg:w-[calc(100%-16.25rem)]" : " lg:w-[calc(100%-5rem)] lg:ml-[5rem]" }
      `}>
      <div className="px-4 py-2 md:py-4 lg:py-4">
        <div className="flex items-center w-full">
          <div className="px-1 pr-3">
            <button type="button" className="w-990:inline-flex hidden relative justify-center items-center p-0 transition-all w-[37.5px] h-[37.5px] duration-75 ease-linear rounded-md"
              onClick={toggleSidebar} >
              {isSidebarVisible ? ( <ChevronsLeft className="w-5 h-5" /> ) : ( <ChevronsRight className="w-5 h-5" /> )}
            </button>
            <button type="button" className="w-990:hidden inline-flex relative justify-center items-center p-0 transition-all h-[37.5px] duration-75 ease-linear rounded-md"
              onClick={toggleDrawerOpen} >
              <Menu className="w-5 h-5"/>
            </button>
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

            <div className="relative flex items-center border-l dark:border-borderDark pl-1 w-990:border-none -mr-2">
              <button type="button" className="w-10 h-10 flex items-center justify-center rounded-full p-2 transition-all duration-300 hover:scale-110">
                <ShoppingCart className="inline-block w-5 h-5 stroke-1 transition-transform duration-300 transform rotate-[360deg]" />
              </button>
            </div>

            <div className="relative flex items-center border-l  dark:border-borderDark pl-1 -mr-2">
              <button type="button" className="w-10 h-10 flex items-center justify-center rounded-full p-2 transition-all duration-300 hover:scale-110">
                <Bell className="inline-block w-5 h-5 stroke-1 transition-transform duration-300 transform rotate-[360deg]" />
                <span className="absolute top-2 right-2.5 flex w-1.5 h-1.5">
                  <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-red-500"></span>
                  <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-red-500"></span>
                </span>
              </button>
            </div>

            <div className="relative flex items-center border-l border-r dark:border-borderDark pl-1 -mr-2">
              <DarkMode />
            </div>

            <div className="relative group flex items-center dark:border-borderDark pl-4 -my-4">
              <button type="button" className="inline-block p-0 transition-all duration-200 ease-linear rounded-full">
                <div className="bg-bgDark rounded-full w-[29px] h-[29px] md:w-[39px] md:h-[39px] lg:w-[39px] lg:h-[39px]">
                {user.genre === "male" ? <img src={ProfileMale} alt="" className="w-full h-full rounded-full" /> : <img src={ProfileFemale} alt="" className="w-full h-full rounded-full" />}
                </div>
              </button>
              <div className="lg:flex hidden flex-col items-start justify-center pl-2">
                <span className="font-semibold text-sm leading-4">{user.prenom + ' ' + user.nom}</span>
                <div className="flex items-center gap-1 text-xs leading-6">
                  <p className="cursor-pointer">Admin</p>
                  <ChevronDown className="text-center cursor-pointer" size={12} />
                </div>
              </div>
              <ul className="absolute hidden group-hover:flex flex-col bg-contentLight dark:bg-contentDark shadow-md mt-2 p-2 rounded w-40 z-10 top-[60px] right-[0px]">
                <li className="flex items-center py-3 px-4 leading-4 hover:bg-gray-100 dark:hover:bg-[#3D3D3D] cursor-pointer border-b dark:border-[#3D3D3D]">
                  <User size={15} className="mr-2 " /> Account
                </li>
                <li className="flex items-center py-3 px-4 leading-4 hover:bg-gray-100 dark:hover:bg-[#3D3D3D] cursor-pointer border-b dark:border-[#3D3D3D]">
                  <Settings size={15} className="mr-2" /> Settings
                </li>
                <li className="flex items-center py-3 px-4 leading-4 hover:bg-gray-100 dark:hover:bg-[#3D3D3D] cursor-pointer">
                  <form onSubmit={() => handleLogout(token, setUser, setToken)} className="w-full">
                    <button className="flex items-center w-full">
                      <LogIn size={15} className="mr-2" /> Log Out
                    </button>
                  </form>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;