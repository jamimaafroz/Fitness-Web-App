import React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../components/ui/sheet";
import useAuth from "../../../Hooks/useAuth";
import { FaHome } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

const LeftVar = ({ setActiveSection }) => {
  const { user, logOut } = useAuth();

  const baseLinks = [
    "User Profile",
    "Activity Log",
    "Be A Trainer",
    "Booked Trainer",
    "Payment History",
    "Pending Trainer Requests", // Fixed comma here
    "Newsletter Subscribers",
  ];

  // ONLY normal users/members get these extra links:
  const extraLinks = [];

  if (user?.role === "member") {
    extraLinks.push("Forum", "Manage Slots", "Add Slot");
  }

  if (user?.role === "admin") {
    extraLinks.push("Make Admin");
  }

  const navLinks = [...baseLinks, ...extraLinks];

  const handleLogout = () => {
    logOut()
      .then(() => console.log("Logged out successfully!"))
      .catch((err) => console.error("Failed to log out:", err));
  };

  return (
    <aside className="h-full md:flex flex-col justify-between p-4 border-r w-[250px] bg-gray-100 shadow-md">
      <div>
        <h1 className="text-2xl font-bold mb-6 text-[#C65656]">
          ZenithFit Dashboard
        </h1>
        <nav className="space-y-2">
          {navLinks.map((name) => {
            // Hide Activity Log if user is not a member
            if (name === "Activity Log" && user?.role !== "member") return null;

            // Hide Newsletter Subscribers if user is not admin
            if (name === "Newsletter Subscribers" && user?.role !== "admin")
              return null;

            return (
              <button
                key={name}
                onClick={() => setActiveSection(name)}
                className="w-full text-left px-4 py-2 rounded hover:bg-[#f8d7da] hover:text-[#C65656] transition"
              >
                {name}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-2">
        <Link to="/">
          <Button className="w-full justify-start gap-2 bg-white hover:cursor-pointer hover:text-[#C65656]">
            <FaHome className="w-5 h-5" />
            Home
          </Button>
        </Link>

        <Button
          className="w-full justify-start gap-2 bg-white hover:cursor-pointer hover:text-[#C65656]"
          onClick={handleLogout}
        >
          <MdLogout className="w-5 h-5" />
          Log Out
        </Button>
      </div>
    </aside>
  );
};

// Mobile version with prop
export const MobileLeftVar = ({ setActiveSection }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden p-2">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] bg-white">
        <SheetHeader>
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <SheetDescription className="sr-only">
            This is the main navigation menu for the dashboard.
          </SheetDescription>
        </SheetHeader>
        <LeftVar setActiveSection={setActiveSection} />
      </SheetContent>
    </Sheet>
  );
};

export default LeftVar;
