/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo/logo.svg";
import { ChevronRight, ChevronDown, X, LogOut } from "lucide-react";
import Icon from "@/assets/logo/logo-ico.svg";
import { handleLogout } from "@/service/EntitesService";
import { UserContext } from '@/utils/UserContext';
import ConfirmModal from "@/components/Modals/ConfirmModal";

const Sidebar = ({ onClose, isDrawer, isHover, toggleSidebarHover, menuItems }) => {
  const { setUser, setToken } = useContext(UserContext);
  const [openDropdown, setOpenDropdown] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };  

  const isActiveSubItems = (path, subItems = []) => {
    if (location.pathname === path) return true;
    return subItems.some((subItem) => location.pathname === subItem.path);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`h-full shadow-xl shadow-slate-300/50 dark:shadow-gray-800/50  ${ isHover ? "hidden" : "block" }`} onMouseLeave={toggleSidebarHover} >
      <div className="flex items-center justify-between lg:justify-center px-5 mt-4">        
        <Link to="/" className="relative flex justify-center items-center">
          <div className="absolute h-20 w-40 bg-cover bg-center rounded-md z-0 bg-image"/>
          <div style={{ backgroundImage: `url(${Icon})` }} className="absolute top-4.5 left-3 h-11 w-11 bg-cover bg-center rounded-md z-10"/>
          <img src={logo} alt="Logo" className="relative h-20 z-20" />
        </Link>
        {isDrawer && (
          <button onClick={onClose} className="p-2 rounded-md">
            <X size={24} />
          </button>
        )}
      </div>
      <div className="scrollbar pt-2 overflow-y-auto h-full">
        <ul className="space-y-4 px-5 pb-25">
          {menuItems.map((menu, menuIndex) => (
            <li key={menuIndex}>
              <h6 className="text-gray-700 dark:text-white font-semibold uppercase text-xs">
                {menu.title}
              </h6>
              {menu.items.map((item, itemIndex) => (
                <div key={itemIndex} className="mt-2 mx-1">
                  <div
                    className={`flex items-center justify-between p-2 rounded-md cursor-pointer 
                      ${
                        isActiveSubItems(item.path, item.subItems)
                          ? "bg-bgLight dark:bg-bgDark text-purpleLight"
                          : "hover:bg-bgLight dark:hover:bg-bgDark text-black dark:text-white"
                      }`}
                    onClick={() => toggleDropdown(`${menuIndex}-${itemIndex}`)}
                  >
                    <div className="flex items-center">
                      {item.icon}
                      {!item.subItems ? (
                        <Link onClick={onClose} to={item.path} className="ml-3 font-medium">
                          {item.label}
                        </Link>
                      ) : (
                        <span className="ml-3 font-medium">{item.label}</span>
                      )}
                    </div>
                    <div className="pr-2">
                      {item.subItems ? (
                        openDropdown === `${menuIndex}-${itemIndex}` ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )
                      ) : null}
                    </div>
                  </div>
                  <div className="ml-6 mt-2 border-l-2 border-purpleLight">
                    {item.subItems && openDropdown === `${menuIndex}-${itemIndex}` && (
                      <ul className="ml-2 -space-y-2 ">
                        {item.subItems.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link onClick={onClose}
                              to={subItem.path}
                              className={`block p-2 text-sm rounded-md 
                              ${isActive(subItem.path) ? "text-purpleLight font-semibold" : "text-black dark:text-gray-400"}`}
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </li>
          ))}
            <li>
              <h6 className="text-gray-700 dark:text-white font-semibold uppercase text-xs -mb2">
                Compte
              </h6>
              <div className="my-2 mx-1">
                <div onClick={() => setIsOpen(true)} className={`flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-bgLight dark:hover:bg-bgDark text-black dark:text-white`}>
                  <div className="flex items-center">
                    <LogOut size={20} />
                    <span className="ml-3 font-medium">Déconnexion</span>
                  </div>
                </div>
              </div>
            </li>
        </ul>
      </div>
      {isOpen && <ConfirmModal isOpen={isOpen} icon={<LogOut />} onClose={() => setIsOpen(false)} message="Êtes-vous sûr de vouloir vous déconnecter ?" onConfirm={(e) => { e.preventDefault(); handleLogout(setUser, setToken); }}/>}
    </div>
  );
};

export default Sidebar;
