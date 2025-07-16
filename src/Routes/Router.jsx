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
import TrainerBookingPage from "../Layouts/pages/Trainers/TrainerBookingPage";
import Payment from "../Layouts/pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Layouts/pages/Dashboard/Payment/PaymentHistory";
import PendingTrainers from "../components/PirvateComponents/BeTrainer/PendingTrainer";
import MakeAdmin from "../components/PirvateComponents/makeAdmin";
import BookedTrainer from "../components/PirvateComponents/BookedTrainer";

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
      {
        path: `/booking/:id`,
        element: (
          <PrivateRoute>
            <TrainerBookingPage></TrainerBookingPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/payment",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
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
    children: [
      {
        path: "paymentHistory",
        element: <PaymentHistory />,
      },
      {
        path: "pendingTrainer",
        element: <PendingTrainers />,
      },
      {
        path: "makeadmin",
        element: <MakeAdmin />,
      },

      {
        path: "booked-trainer/:id", // no leading slash here in nested routes
        element: <BookedTrainer />,
      },
    ],
  },
]);
