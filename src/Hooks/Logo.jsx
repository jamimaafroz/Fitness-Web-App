import React from "react";
import { MdFitnessCenter } from "react-icons/md";

const Logo = () => {
  return (
    <div className="flex items-center gap-2 cursor-pointer select-none group">
      <p className="text-3xl font-extrabold text-primary tracking-wide drop-shadow-md group-hover:text-[#C65656] transition-colors duration-300">
        ZenithFit
      </p>
      <span className="text-5xl text-[#C65656] group-hover:scale-110 transform transition-transform duration-300">
        <MdFitnessCenter />
      </span>
    </div>
  );
};

export default Logo;
