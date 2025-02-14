import type { RouteObject } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import {
  Home,
  ActionEvent,
  ActionRetention,
  Performance,
  Exception,
} from "@/pages";

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
        children: [
          {
            path: "event",
            element: <ActionEvent />,
          },
          {
            path: "retention",
            element: <ActionRetention />,
          },
        ],
      },
      {
        path: "/performance",
        element: <Performance />,
      },
      {
        path: "/Exception",
        element: <Exception />,
      },
    ],
  },
];

function Routes() {
  return useRoutes(routes);
}

export default Routes;
