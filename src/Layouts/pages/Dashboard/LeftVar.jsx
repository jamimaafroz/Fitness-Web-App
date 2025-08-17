// src/components/Dashboard/LeftSidebar.jsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import useAuth from "../../../Hooks/useAuth";
import {
  FaHome,
  FaUser,
  FaClipboardList,
  FaUsers,
  FaDumbbell,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import {
  MdLogout,
  MdAdminPanelSettings,
  MdAddBox,
  MdEventNote,
} from "react-icons/md";

const iconMap = {
  "User Profile": <FaUser />,
  "Activity Log": <FaClipboardList />,
  "Be A Trainer": <FaDumbbell />,
  "Booked Trainer": <MdEventNote />,
  "Payment History": <FaMoneyCheckAlt />,
  "Pending Trainer Requests": <FaUsers />,
  "Newsletter Subscribers": <FaUsers />,
  Forum: <FaClipboardList />,
  "Manage Slots": <MdEventNote />,
  "Add Slot": <MdAddBox />,
  "Make Admin": <MdAdminPanelSettings />,
  "Total Balance": <FaMoneyCheckAlt />,
  "Add Class": <MdAddBox />,
};

const SidebarMenu = ({ setActiveSection, isMobile = false }) => {
  const { user, logOut } = useAuth();

  const baseLinks = [
    "User Profile",
    "Activity Log",
    "Be A Trainer",
    "Booked Trainer",
    "Payment History",
    "Pending Trainer Requests",
    "Newsletter Subscribers",
  ];

  const extraLinks = [];
  if (user?.role === "trainer")
    extraLinks.push("Forum", "Manage Slots", "Add Slot");
  if (user?.role === "admin")
    extraLinks.push("Forum", "Make Admin", "Total Balance", "Add Class");

  const navLinks = [...baseLinks, ...extraLinks];

  const handleLogout = () => {
    logOut()
      .then(() => console.log("Logged out successfully!"))
      .catch((err) => console.error("Failed to log out:", err));
  };

  return (
    <aside
      className={`flex flex-col justify-between p-6 bg-white shadow-lg rounded-md min-h-full ${
        isMobile ? "h-full" : "overflow-y-auto"
      }`}
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-8 text-[#C65656]">
          ZenithFit Dashboard
        </h1>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-2">
          {navLinks.map((name) => {
            if (
              (name === "Activity Log" && user?.role !== "member") ||
              (name === "Newsletter Subscribers" && user?.role !== "admin")
            )
              return null;

            return (
              <button
                key={name}
                onClick={() => setActiveSection(name)}
                className="flex items-center gap-3 px-4 py-2 rounded hover:bg-[#FCE1E1] hover:text-[#C65656] transition-colors font-medium"
              >
                {iconMap[name]}
                <span>{name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Buttons */}
      <div className="flex flex-col gap-3 mt-6">
        <Link to="/">
          <Button className="w-full justify-start gap-2 bg-[#f8f9fa] hover:bg-[#e2e6ea] hover:text-[#C65656]">
            <FaHome className="w-5 h-5" />
            Home
          </Button>
        </Link>

        <Button
          className="w-full justify-start gap-2 bg-[#f8f9fa] hover:bg-[#e2e6ea] hover:text-[#C65656]"
          onClick={handleLogout}
        >
          <MdLogout className="w-5 h-5" />
          Log Out
        </Button>
      </div>
    </aside>
  );
};

// Mobile Sidebar
export const MobileSidebar = ({ setActiveSection }) => {
  const { user } = useAuth();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="md:hidden p-2 fixed top-4 left-4 z-50"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-64 h-full bg-white overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">Navigation Menu</SheetTitle>
          <SheetDescription>
            Select a section to navigate within the dashboard.
          </SheetDescription>
        </SheetHeader>

        {user && <SidebarMenu setActiveSection={setActiveSection} isMobile />}
      </SheetContent>
    </Sheet>
  );
};

export default SidebarMenu;
