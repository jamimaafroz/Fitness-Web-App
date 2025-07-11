import React from "react";
import { Menu } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router"; // make sure react-router-dom
import { Button } from "@/components/ui/button";
import useAuth from "../../../Hooks/useAuth";
import Logo from "../../../Hooks/Logo";
import AuthButtons from "../../../Hooks/AuthButtons";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logOut()
      .then(() => {
        console.log("Logged out");
        navigate("/login");
      })
      .catch((err) => console.error(err));
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
        </nav>

        {/* Auth Buttons + Avatar */}
        <div className="flex items-center gap-4">
          <AuthButtons user={user} onLogout={handleSignOut} />

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
