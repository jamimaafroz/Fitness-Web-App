import React from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/Navbar/Navbar";
import Footer from "../pages/Footer/Footer";
// import Navbar from "../pages/shared/Navbar/Navbar";
// import Footer from "../pages/shared/Footer/Footer";

const RootLayout = () => {
  return (
    <div className="m-0 p-0">
      <Navbar className="m-0 p-0" />
      <Outlet />
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
