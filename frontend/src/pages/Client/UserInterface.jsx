import { Outlet } from "react-router";
import Header from "@/pages/Client/Header/Header";

const UserInterface = () => {
  return (
    <div className="text-base dark:text-zinc-100 min-h-screen flex flex-col relative">
      <div className={`fixed top-0 left-0 w-full z-1000"`}>
        <Header />
      </div>
      <div className="mt-20">
        <Outlet />
      </div>
    </div>
  );
};

export default UserInterface;
