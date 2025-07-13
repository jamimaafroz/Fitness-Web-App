import React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../../../components/ui/sheet";
import useAuth from "../../../Hooks/useAuth";
import { FaHome } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

const LeftVar = ({ setActiveSection }) => {
  const navLinks = [
    { name: "User Profile" },
    { name: "Activity Log" },
    { name: "Be A Trainer" },
    { name: "Booked Trainer" },
  ];
  const { logOut } = useAuth();
  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("Logged out successfully!");
      })
      .catch((err) => {
        console.error("Failed to log out:", err);
      });
  };

  return (
    <aside className="h-full hidden md:flex flex-col justify-between p-4 border-r w-[250px] bg-white shadow-md">
      <div>
        <h1 className="text-2xl font-bold mb-6 text-[#C65656]">
          ZenithFit Dashboard
        </h1>
        <nav className="space-y-2">
          {navLinks.map(({ name }) => (
            <button
              key={name}
              onClick={() => setActiveSection(name)}
              className="w-full text-left px-4 py-2 rounded hover:bg-[#f8d7da] hover:text-[#C65656] transition"
            >
              {name}
            </button>
          ))}
        </nav>
      </div>

      <div className="space-y-2">
        <Link to="/">
          <Button className="w-full justify-start gap-2  hover:cursor-pointer hover:text-[#C65656]">
            <FaHome className="w-5 h-5" />
            Home
          </Button>
        </Link>

        <Button
          className="w-full justify-start gap-2 hover:cursor-pointer hover:text-[#C65656] "
          onClick={handleLogout}
        >
          <MdLogout className="w-5 h-5" />
          Log Out
        </Button>
      </div>
    </aside>
  );
};

export const MobileLeftVar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden p-2">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] bg-white">
        <LeftVar />
      </SheetContent>
    </Sheet>
  );
};

export default LeftVar;
