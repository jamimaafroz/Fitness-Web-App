import React from "react";
import { Menu } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import useAuth from "../../../Hooks/useAuth";
import Logo from "../../../Hooks/Logo";

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

  const links = (
    <>
      <NavLink to="/">
        <p className="text-xl font-bold hover:text-[#C65656]">Home</p>
      </NavLink>
      <NavLink to="/trainers">
        <p className="text-xl font-bold hover:text-[#C65656]">Trainers</p>
      </NavLink>
      <NavLink to="/classes">
        <p className="text-xl font-bold hover:text-[#C65656]">Classes</p>
      </NavLink>
      <NavLink to="/community">
        <p className="text-xl font-bold hover:text-[#C65656]">Community</p>
      </NavLink>
    </>
  );

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
        <nav className="hidden md:flex gap-6 items-center">{links}</nav>

        {/* Auth Buttons + Avatar */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <img
                src={
                  user.photoURL ||
                  "https://i.ibb.co/Gv1qf3v/default-profile.png"
                }
                alt={user.displayName || "User"}
                className="w-9 h-9 rounded-full object-cover border-2 border-primary cursor-pointer"
                title={user.displayName || "User"}
              />
              <Button
                variant="outline"
                className="text-base hover:text-red-500 transition-colors duration-200"
                onClick={handleSignOut}
              >
                Log out
              </Button>
            </>
          ) : (
            <NavLink to="/login">
              <Button className="text-base hover:bg-primary/10 transition-colors duration-200">
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
