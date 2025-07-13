import React, { useState } from "react";
import SideVar from "./SideVar";
import LeftVar from "./LeftVar";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("User Profile");

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-[250px] bg-gray-100 h-full">
        <LeftVar setActiveSection={setActiveSection} />
      </div>

      {/* Right Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
        <SideVar section={activeSection} />
      </div>
    </div>
  );
};

export default Dashboard;
