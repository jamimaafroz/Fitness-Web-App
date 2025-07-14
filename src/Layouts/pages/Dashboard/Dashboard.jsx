import React, { useState } from "react";
import LeftVar, { MobileLeftVar } from "./LeftVar";
import SideVar from "./SideVar";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("User Profile");

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-[250px] bg-gray-100 border-r shadow-md">
        <LeftVar setActiveSection={setActiveSection} />
      </div>

      {/* Mobile Drawer */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <MobileLeftVar setActiveSection={setActiveSection} />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto md:ml-[250px] mt-8 p-6">
        <SideVar section={activeSection || "User Profile"} />
      </div>
    </div>
  );
};

export default Dashboard;
