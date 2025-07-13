import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import useAuth from "../../../Hooks/useAuth";
import Logo from "../../../Hooks/Logo";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully!");
        navigate("/login");
      })
      .catch((err) => {
        toast.error("Failed to log out. Please try again.");
        console.error(err);
      });
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/trainers", label: "Trainers" },
    { path: "/classes", label: "Classes" },
    { path: "/community", label: "Community" },
  ];

  if (user) {
    navLinks.push({ path: "/dashboard", label: "Dashboard" });
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `text-lg font-semibold transition-colors duration-300 ${
                  isActive ? "text-[#C65656]" : "hover:text-[#C65656]"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right Side - Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <img
                src={
                  user.photoURL ||
                  "https://i.ibb.co/Gv1qf3v/default-profile.png"
                }
                alt={user.displayName || "User"}
                className="w-9 h-9 rounded-full object-cover border-2 border-[#C65656]"
                title={user.displayName || "User"}
              />
              <Button
                onClick={handleSignOut}
                className="text-[#C65656] border border-[#C65656] hover:bg-[#C65656] hover:text-white"
              >
                Log out
              </Button>
            </>
          ) : (
            <NavLink to="/login">
              <Button className="bg-[#C65656] text-white hover:bg-[#9e4848]">
                Login
              </Button>
            </NavLink>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="h-6 w-6 text-[#C65656]" />
          ) : (
            <Menu className="h-6 w-6 text-[#C65656]" />
          )}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t shadow-md py-4 px-6 space-y-4 transition-all">
          {navLinks.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block text-lg font-semibold ${
                  isActive ? "text-[#C65656]" : "text-gray-700"
                } hover:text-[#C65656]`
              }
            >
              {label}
            </NavLink>
          ))}

          {user ? (
            <div className="flex items-center justify-between">
              <img
                src={
                  user.photoURL ||
                  "https://i.ibb.co/Gv1qf3v/default-profile.png"
                }
                alt="User"
                className="w-8 h-8 rounded-full border border-[#C65656]"
              />
              <Button
                onClick={handleSignOut}
                className="text-[#C65656] border border-[#C65656] hover:bg-[#C65656] hover:text-white text-sm"
              >
                Log out
              </Button>
            </div>
          ) : (
            <NavLink to="/login" onClick={() => setMobileOpen(false)}>
              <Button className="w-full bg-[#C65656] text-white hover:bg-[#9e4848] text-sm">
                Login
              </Button>
            </NavLink>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
