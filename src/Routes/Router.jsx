import { createBrowserRouter } from "react-router";
import Home from "../Layouts/pages/Home/Home";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Login from "../Layouts/pages/Login";
import Register from "../Layouts/pages/Register";
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
import AllClasses from "../Layouts/pages/FeaturedSection/AllClasses";
import BeATrainer from "../components/PirvateComponents/BeTrainer/BeTrainer";
import ForumPostSection from "../Layouts/pages/FeaturedSection/ForumPostSection";
import Error from "../Layouts/pages/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/trainers",
        element: <AllTrainers />,
      },
      {
        path: "/trainers/:id",
        element: <TrainerDetails />,
      },
      {
        path: "/classes",
        element: <AllClasses />,
      },
      {
        path: "/community",
        element: <ForumPostSection></ForumPostSection>,
      },
      {
        path: "/booking/:id",
        element: (
          <PrivateRoute>
            <TrainerBookingPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/become-trainer",
        element: (
          <PrivateRoute>
            <BeATrainer />
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
  { path: "*", element: <Error /> },
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
        path: "booked-trainer/:id",
        element: <BookedTrainer />,
      },
    ],
  },
]);
