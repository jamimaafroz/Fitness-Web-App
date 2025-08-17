// Logo.jsx
import React from "react";
import { MdFitnessCenter } from "react-icons/md";

const Logo = ({ variant = "default" }) => {
  const isFooter = variant === "footer";

  return (
    <div className="flex items-center gap-2 cursor-pointer select-none group">
      <p
        className={`border-1 p-2 text-3xl font-extrabold 
          ${
            isFooter
              ? "text-white border-white"
              : "text-[rgba(198,86,86)] border-[#c65656]"
          } 
          hover:text-primary`}
      >
        ZenithFit
      </p>
      <span
        className={`text-5xl transform transition-transform duration-300 group-hover:scale-110 
          ${isFooter ? "text-white" : "text-[#C65656]"}`}
      >
        <MdFitnessCenter />
      </span>
    </div>
  );
};

export default Logo;
