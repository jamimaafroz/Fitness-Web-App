import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./Layouts/pages/Home/Home.jsx";
import { RouterProvider } from "react-router";
import { router } from "./Routes/Router.jsx";
import AuthProvider from "./contexts/AuthContexts/AuthProvider.jsx";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          closeOnClick
          pauseOnHover
          draggable
          hideProgressBar
          toastClassName="custom-toast"
          bodyClassName="custom-toast-body"
          className="mt-[30vh]" // moves it down to mid-page
        />
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>
);
