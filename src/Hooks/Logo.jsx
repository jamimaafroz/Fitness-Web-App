import React from "react";
import { MdFitnessCenter } from "react-icons/md";

const Logo = () => {
  return (
    <div className="flex items-center gap-2 cursor-pointer select-none group">
      <p className="border-1 border-[#c65656] p-2 text-3xl font-extrabold text-[rgba(198,86,86)] hover:text-primary ">
        ZenithFit
      </p>
      <span className="text-5xl text-[#C65656] group-hover:scale-110 transform transition-transform duration-300">
        <MdFitnessCenter />
      </span>
    </div>
  );
};

export default Logo;
