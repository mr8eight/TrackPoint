import type { RouteObject } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Home, Action, Performance, Exception } from "@/pages";

const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/action",
        element: <Action />,
      },
      {
        path: "/performance",
        element: <Performance />,
      },
      {
        path: "/exception",
        element: <Exception />,
      },
    ],
  },
];

function Routes() {
  return useRoutes(routes);
}

export default Routes;
