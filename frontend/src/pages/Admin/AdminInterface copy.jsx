import { useEffect, useState } from "react";
import Sidebar from "@/pages/Admin/SideBar/Sidebar";
import SidebarFixed from "@/pages/Admin/SideBar/SidebarFixed";
import Header from "@/pages/Admin/Header/Header";
import Footer from "@/pages/Admin/Footer/Footer";
import { Outlet } from "react-router";
import { ChevronsUp } from "lucide-react";

const AdminInterface = () => {
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
    
  return (
    <div className="text-base dark:text-zinc-100 min-h-screen flex flex-col">
      <div className="flex flex-grow">
        <div className="hidden w-990:block">
          {!isSidebarVisible && ( <>
              {!isSidebarHover && <SidebarFixed isSidebarHover={isSidebarHover} toggleSidebarHover={toggleSidebarHover} />}
              <div className={isSidebarHover ? "" : "hidden"}>
                <div className={`fixed top-0 bottom-0 w-[16.25rem] z-[1050] bg-customLight dark:bg-customDark shadow-lg transform transition-transform`}>
                  <Sidebar isHover={!isSidebarHover} toggleSidebarHover={toggleSidebarHover} />
                </div>
              </div>
            </> )}
        </div>
        {isSidebarVisible && (
          <div className="hidden w-990:block w-64 flex-shrink-0">
            <div className="fixed top-0 bottom-0 w-[16.25rem] bg-customLight dark:bg-customDark">
              <Sidebar isDrawer={false}/>
            </div>
          </div>
        )}
        <div className={`fixed w-990:hidden top-0 left-0 h-full w-[16.25rem] bg-customLight dark:bg-customDark shadow-lg z-50 transform transition-transform 
            ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <Sidebar isDrawer={true} onClose={() => setIsDrawerOpen(false)} />
        </div>

        <div className={`flex-1 flex flex-col ${!isSidebarVisible ? "w-990:ml-[5rem]" : ""}`}>
          <Header
            isSidebarVisible={isSidebarVisible}
            toggleSidebar={toggleSidebar}
            toggleDrawerOpen={toggleDrawerOpen}
          />
          <div className="">
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

export default AdminInterface;
