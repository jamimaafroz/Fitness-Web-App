import React from "react";
import { Button } from "@/components/ui/button"; // Assuming you use this Button component
import { NavLink } from "react-router";

const AuthButtons = ({ user, onLogout }) => {
  return user ? (
    <button
      onClick={onLogout}
      className="px-4 py-2 text-[#C65656] border-2 border-[#C65656] rounded-md font-semibold hover:bg-[#C65656] hover:text-white transition-colors duration-300"
      aria-label="Log out"
      type="button"
    >
      Log out
    </button>
  ) : (
    <NavLink to="/login" aria-label="Login">
      <button
        className="px-4 py-2 bg-[#C65656] text-white rounded-md font-semibold hover:bg-[#9e4848] transition-colors duration-300"
        type="button"
      >
        Login
      </button>
    </NavLink>
  );
};

export default AuthButtons;
