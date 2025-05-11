import { Routes, Route } from "react-router";
import routes from "@/index";
import UserInterface from "@/pages/UserInterface";
import Home from "@/pages/Client/Home/Home";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

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

  return (
    <>
      <Routes>
        {renderRoutes(routes)}
        <Route path="/" element={<UserInterface />}>
            <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
