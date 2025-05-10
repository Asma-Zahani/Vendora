import { Routes, Route } from "react-router";
import routes from "@/index";
import UserInterface from "@/pages/UserInterface";
import Home from "@/pages/Client/Home/Home";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { ChevronsUp } from "lucide-react";

function renderRoutes(routesArray) {
  return routesArray.map((route, index) => (
    <Route key={index} path={route.path} element={route.element}>
      {route.children && renderRoutes(route.children)}
    </Route>
  ));
}

function App() {
  useEffect(() => {
    AOS.init({
      easing: "ease-in-sine",
    });
  }, []);

  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    window.addEventListener("scroll", () => {setIsVisible(window.scrollY > 200)});
    return () => window.removeEventListener("scroll", () => {setIsVisible(window.scrollY > 200)});
  }, []);

  return (
    <>
      <Routes>
        {renderRoutes(routes)}
        <Route path="/" element={<UserInterface />}>
            <Route index element={<Home />} />
        </Route>
      </Routes>
      {isVisible && ( <button onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" })}}
        className="fixed bottom-17 right-4 bg-purpleLight/75 text-borderGrayLight p-2 rounded-sm shadow-lg transition-all transform hover:scale-110 z-10">
          <ChevronsUp size={23} />
      </button>)}
    </>
  );
}

export default App;
