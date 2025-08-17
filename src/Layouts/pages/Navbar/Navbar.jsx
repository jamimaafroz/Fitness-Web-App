import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import useAuth from "../../../Hooks/useAuth";
import Logo from "../../../Hooks/Logo";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

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
        toast.error("Failed to log out. Try again.");
        console.error(err);
      });
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/trainers", label: "Trainers" },
    { path: "/classes", label: "Classes" },
    { path: "/community", label: "Community" },
  ];

  if (user) navLinks.push({ path: "/dashboard", label: "Dashboard" });

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-sm bg-transparent shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center text-2xl font-bold text-[#C65656]"
        >
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `text-lg font-medium transition-colors ${
                  isActive
                    ? "text-[#C65656]"
                    : "text-gray-700 hover:text-[#C65656]"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Auth Buttons - Desktop */}
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
              <Button className="bg-[#C65656] text-white hover:bg-[#a84242]">
                Login
              </Button>
            </NavLink>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex items-center justify-center"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="w-6 h-6 text-[#C65656]" />
          ) : (
            <Menu className="w-6 h-6 text-[#C65656]" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white shadow-md border-t overflow-hidden"
          >
            <div className="flex flex-col gap-4 py-4 px-6">
              {navLinks.map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `text-gray-700 font-medium hover:text-[#C65656] ${
                      isActive && "text-[#C65656]"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}

              {user ? (
                <div className="flex items-center justify-between pt-2">
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
                  <Button className="w-full bg-[#C65656] text-white hover:bg-[#a84242] text-sm">
                    Login
                  </Button>
                </NavLink>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
