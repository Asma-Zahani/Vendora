import { useState } from "react";
import Sidebar from "@/pages/Admin/SideBar/Sidebar";
import SidebarFixed from "@/pages/Admin/SideBar/SidebarFixed";
import Header from "@/pages/Admin/Header/Header";
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
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminInterface;
