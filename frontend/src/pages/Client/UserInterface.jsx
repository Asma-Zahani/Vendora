import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Header from "@/pages/Client/Header/Header";
import Footer from "@/pages/Client/Footer/Footer";
import { ArrowUp } from "lucide-react";

const UserInterface = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {setIsVisible(window.scrollY > 200)});
    return () => window.removeEventListener("scroll", () => {setIsVisible(window.scrollY > 200)});
  }, []);
  
  return (
    <div className="text-base dark:text-zinc-100 min-h-screen flex flex-col relative">
      <div className="absolute top-0 left-0 w-full z-50">
        <Header />
      </div>
      <div className="mt-20">
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
      {isVisible && ( <button onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" })}}
        className="fixed bottom-16 right-4 bg-purpleLight text-white p-4 rounded-full shadow-lg hover:bg-purpleLight transition-all transform hover:scale-110 z-10">
          <ArrowUp />
      </button>)}
    </div>
  );
};

export default UserInterface;