import { useEffect, useState } from "react";
import Sidebar from "@/pages/Livreur/SideBar/Sidebar";
import SidebarFixed from "@/pages/Livreur/SideBar/SidebarFixed";
import Header from "@/pages/Livreur/Header/Header";
import Footer from "@/pages/Livreur/Footer/Footer";
import { Outlet } from "react-router";
import { ChevronsUp } from "lucide-react";

const LivreurInterface = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isSidebarHover, setIsSidebarHover] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const toggleSidebarHover = () => {
    setIsSidebarHover(!isSidebarHover);
  };

  const toggleDrawerOpen = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    window.addEventListener("scroll", () => {setIsVisible(window.scrollY > 200)});
    return () => window.removeEventListener("scroll", () => {setIsVisible(window.scrollY > 200)});
  }, []);
  
  const sidebarClasses = "fixed h-full w-[16.25rem] z-[1050] bg-customLight dark:bg-customDark shadow-lg transform transition-transform";

  return (
    <div className="text-base dark:text-zinc-100 min-h-screen flex flex-col">
      <div className="flex flex-grow">
        <div className={`hidden lg:block ${isSidebarVisible ? "w-64 flex-shrink-0" : ""}`}>
          {!isSidebarVisible && !isSidebarHover && (
            <SidebarFixed isSidebarHover={isSidebarHover} toggleSidebarHover={toggleSidebarHover} />
          )}
          {(isSidebarVisible || isSidebarHover) && (
            <div className={sidebarClasses}>
              <Sidebar {...(isSidebarVisible ? { isDrawer: false } : { isHover: !isSidebarHover, toggleSidebarHover })} />
            </div>
          )}
        </div>
        <div className={`${sidebarClasses} lg:hidden ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <Sidebar isDrawer={true} onClose={() => setIsDrawerOpen(false)} />
        </div>

        <div className={`flex-1 flex flex-col ${!isSidebarVisible ? "w-990:ml-[5rem]" : ""}`}>
          <Header isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar} toggleDrawerOpen={toggleDrawerOpen}/>
          <div>
            <Outlet />
          </div>
          <Footer isSidebarVisible={isSidebarVisible}/>
        </div>
        
        {isVisible && ( <button onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" })}}
          className="fixed bottom-8 right-8 bg-purpleLight/75 text-borderGrayLight p-2 rounded-full shadow-lg transition-all transform hover:scale-110 z-10">
            <ChevronsUp size={23} />
        </button>)}
      </div>
    </div>
  );
};

export default LivreurInterface;
