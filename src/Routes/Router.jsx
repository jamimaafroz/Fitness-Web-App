import { createBrowserRouter } from "react-router";
import Home from "../Layouts/pages/Home/Home";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Login from "../Layouts/pages/Login";
import Register from "../Layouts/pages/Register";
import { HelmetProvider } from "react-helmet-async";
import Dashboard from "../Layouts/pages/Dashboard/Dashboard";
import PrivateRoute from "../Route/PrivateRoute";
import AllTrainers from "../Layouts/pages/Trainers/AllTrainers";
import TrainerDetails from "../Layouts/pages/Trainers/TrainerDetails";

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
      {
        path: "/trainers",
        Component: AllTrainers,
      },
      {
        path: `/trainers/:id`,
        Component: TrainerDetails,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
]);
