// src/components/Dashboard/Dashboard.jsx
import React, { useState } from "react";
import SideVar from "./SideVar";
import CustomHelmet from "../../../components/ui/Meta/CustomHelmet";
import SidebarMenu, { MobileSidebar } from "./LeftVar";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("User Profile");

  return (
    <>
      <CustomHelmet title="Dashboard" />

      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-[250px] bg-gray-100 border-r shadow-md flex-shrink-0 overflow-y-auto">
          <SidebarMenu setActiveSection={setActiveSection} />
        </div>

        {/* Mobile Drawer */}
        <MobileSidebar setActiveSection={setActiveSection} />

        {/* Main Content */}
        <div className="flex-1 p-4 bg-gray-50">
          <SideVar section={activeSection || "User Profile"} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
