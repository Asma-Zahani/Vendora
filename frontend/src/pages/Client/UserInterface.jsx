import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Header from "@/pages/Client/Header/Header";

const UserInterface = () => {
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);

  const handleScroll = () => {
    if (window.scrollY >= 0) {
      setIsHeaderFixed(true);
    } else {
      setIsHeaderFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="text-base dark:text-zinc-100 min-h-screen flex flex-col relative">
      <div className={`${isHeaderFixed ? "fixed top-0 left-0 w-full z-1000" : ""}`}>
        <Header />
      </div>
      <Outlet />
    </div>
  );
};

export default UserInterface;
