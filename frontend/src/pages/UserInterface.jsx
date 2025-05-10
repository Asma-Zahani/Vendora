import { Outlet } from "react-router";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const UserInterface = () => {
  return (
    <div className="text-base dark:text-zinc-100 min-h-screen flex flex-col relative">
      <div className="absolute top-0 left-0 w-full z-100">
        <Header />
      </div>
      <div className="mt-15 sm:mt-20">
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default UserInterface;