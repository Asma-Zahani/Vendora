import { Routes, Route } from "react-router";
import routes from "@/routes/index";
import UserInterface from "@/pages/Client/UserInterface";
import Home from "@/pages/Client/Content/Home/Home";

function renderRoutes(routesArray) {
  return routesArray.map((route, index) => (
    <Route key={index} path={route.path} element={route.element}>
      {route.children && renderRoutes(route.children)}
    </Route>
  ));
}

function App() {
  return (
    <Routes>
      {renderRoutes(routes)}
      <Route path="/" element={<UserInterface />}>
          <Route index element={<Home />} />
      </Route>
    </Routes>
    );
}

export default App;
