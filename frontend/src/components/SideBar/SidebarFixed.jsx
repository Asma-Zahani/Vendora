/* eslint-disable react/prop-types */
import { useLocation } from "react-router-dom";
import logo from "@/assets/logo/logo-ico.svg";
import { LogOut } from "lucide-react";

const SidebarFixed = ({ toggleSidebarHover, menuItems }) => {
  const location = useLocation();

  return (
    <div className="shadow-md shadow-slate-300/50 dark:shadow-gray-800/50 py-6 w-[5rem] bg-customLight dark:bg-customDark fixed bottom-0 top-0 z-[1003] transition-all duration-75 ease-linear"
      onMouseEnter={toggleSidebarHover}>
      <div className="flex items-center justify-center px-5 text-center h-header">
        <img src={logo} alt="Logo" className="h-10" />
      </div>
      <div className="pt-10">
        <ul className="flex flex-col items-center space-y-5">
          {menuItems.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {section.items.map((item, itemIndex) => {
                const isActive =
                location.pathname === item.path ||
                (item.subItems && item.subItems.some(subItem => location.pathname === subItem.path));
                return (
                  <li key={itemIndex} className="relative">
                    <div className={`flex items-center justify-center w-12 h-12 transition-all duration-75 ease-linear rounded-xl ${
                        isActive ? "bg-bgLight dark:bg-bgDark text-purpleLight font-semibold" : "text-black -my-2 dark:text-white" }`} to={item.path}>
                      {item.icon}
                    </div>
                  </li>
                );
              })}
            </div>
          ))}
          <li>
            <div className={`flex items-center justify-center w-12 h-12 transition-all duration-75 ease-linear rounded-xl text-black -my-2 dark:text-white`}>
              <LogOut size={20} />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarFixed;
