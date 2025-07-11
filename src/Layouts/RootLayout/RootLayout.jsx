import React from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/Navbar/Navbar";
// import Navbar from "../pages/shared/Navbar/Navbar";
// import Footer from "../pages/shared/Footer/Footer";

const RootLayout = () => {
  return (
    <div className="m-0 p-0">
      <Navbar className="m-0 p-0" />
      <main className="">
        {/* or whatever your navbar height is */}
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
