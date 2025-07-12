import React from "react";
import { Menu } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router"; // ✅ Use react-router-dom!
import { Button } from "@/components/ui/button";
import useAuth from "../../../Hooks/useAuth";
import Logo from "../../../Hooks/Logo";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

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

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-transparent shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-2xl font-bold text-primary cursor-pointer select-none">
            <Logo />
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          {["/", "/trainers", "/classes", "/community"].map((path, i) => {
            const labels = ["Home", "Trainers", "Classes", "Community"];
            return (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `text-xl font-bold transition-colors duration-300 ${
                    isActive ? "text-[#C65656]" : "hover:text-[#C65656]"
                  }`
                }
              >
                {labels[i]}
              </NavLink>
            );
          })}

          {/* Show dashboard link if logged in */}
          {user && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `text-xl font-bold transition-colors duration-300 ${
                  isActive ? "text-[#C65656]" : "hover:text-[#C65656]"
                }`
              }
            >
              Dashboard
            </NavLink>
          )}
        </nav>

        {/* Auth Buttons + Avatar */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {/* Profile Picture */}
              <img
                src={
                  user.photoURL ||
                  "https://i.ibb.co/Gv1qf3v/default-profile.png"
                }
                alt={user.displayName || "User"}
                className="w-9 h-9 rounded-full object-cover border-2 border-[#C65656]"
                title={user.displayName || "User"}
              />

              {/* Log Out Button */}
              <Button
                onClick={handleSignOut}
                className="px-4 py-2 text-[#C65656] border border-[#C65656] rounded-md hover:bg-[#C65656] hover:text-white transition duration-300"
              >
                Log out
              </Button>
            </>
          ) : (
            // Login Button
            <NavLink to="/login">
              <Button className="px-4 py-2 bg-[#C65656] text-white rounded-md hover:bg-[#9e4848] transition duration-300">
                Login
              </Button>
            </NavLink>
          )}

          {/* Mobile menu icon */}
          <button className="md:hidden focus:outline-none">
            <Menu className="h-6 w-6 text-primary hover:text-primary/80 transition-colors duration-200" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
