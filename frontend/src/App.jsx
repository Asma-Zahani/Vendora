import { Routes, Route } from "react-router";
import routes from "@/routes/index";
import UserInterface from "@/pages/Client/UserInterface";
import Home from "@/pages/Client/Content/Home/Home";
import AOS from "aos";
import "aos/dist/aos.css";
import { useContext, useEffect } from "react";
import { SuccessMessageContext } from "@/utils/SuccessMessageContext"
import Alert from "@/components/Alert/Alert";

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

  const { successMessage, setSuccessMessage } = useContext(SuccessMessageContext);

  return (
    <>
      <Routes>
        {renderRoutes(routes)}
        <Route path="/" element={<UserInterface />}>
            <Route index element={<Home />} />
        </Route>
      </Routes>
      {successMessage && <Alert successMessage={successMessage} setSuccessMessage={setSuccessMessage} />}
    </>
    );
}

export default App;
