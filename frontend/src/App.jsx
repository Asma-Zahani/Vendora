import { Routes, Route } from "react-router";
import routes from "@/routes/index";

function App() {
  return (
    <Routes>
      {routes.map((route, index) => {
        if (route.element && route.children) {
          return (
            <Route key={index} element={route.element}>
              {route.children?.map((child, childIndex) => (
                <Route key={childIndex} path={child.path} element={child.element}>
                  {child.children?.map((grandchild, grandchildIndex) => (
                    <Route key={grandchildIndex} path={grandchild.path} element={grandchild.element} />
                  ))}
                </Route>
              ))}
            </Route>
          );
        }
        return (
          <Route key={index} path={route.path} element={route.element}>
            {route.children?.map((child, childIndex) => (
              <Route key={childIndex} path={child.path} element={child.element} />
            ))}
          </Route>
        );
      })}
    </Routes>
  );
}

export default App;
