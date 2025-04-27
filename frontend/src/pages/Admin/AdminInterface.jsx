import { useState } from "react";
import Sidebar from "@/pages/Admin/SideBar/Sidebar";
import SidebarFixed from "@/pages/Admin/SideBar/SidebarFixed";
import Header from "@/pages/Admin/Header/Header";
import Footer from "@/pages/Admin/Footer/Footer";
import { Outlet } from "react-router";

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
      </div>
    </div>
  );
};

export default AdminInterface;
