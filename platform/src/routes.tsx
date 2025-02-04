import type { RouteObject } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import Home from "./pages/Home";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
];

function Routes() {
  return useRoutes(routes);
}

export default Routes;
