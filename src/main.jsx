import React from "react";
import ReactDOM from "react-dom/client"; // ✅ This is the fix
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router"; // ✅ Use react-router-dom
import { router } from "./Routes/Router.jsx";
import AuthProvider from "./contexts/AuthContexts/AuthProvider.jsx";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 🔧 Create Query Client
const queryClient = new QueryClient();

// ✅ Modern React 18 rendering
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
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
            className="mt-[30vh]"
          />
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>
);
