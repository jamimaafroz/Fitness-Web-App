import { createBrowserRouter } from "react-router";
import Home from "../Layouts/pages/Home/Home";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Login from "../Layouts/pages/Login";
import Register from "../Layouts/pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
]);
