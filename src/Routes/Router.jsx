import { createBrowserRouter } from "react-router";
import Home from "../Layouts/pages/Home/Home";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Login from "../Layouts/pages/Login";
import Register from "../Layouts/pages/Register";
import { HelmetProvider } from "react-helmet-async";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <HelmetProvider>
        <RootLayout />
      </HelmetProvider>
    ),
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
