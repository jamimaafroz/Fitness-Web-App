import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import Logo from "../../../Hooks/Logo";
import { NavLink } from "react-router";

const Footer = () => {
  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Trainers", to: "/trainers" },
    { name: "Classes", to: "/classes" },
    { name: "Community", to: "/community" },
  ];

  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-6 md:flex md:items-center md:justify-between">
        {/* Logo + Title */}
        <div className="mb-6 md:mb-0">
          <Logo />
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col md:flex-row gap-6 text-gray-700 font-semibold text-lg">
          {navLinks.map(({ name, to }) => (
            <NavLink
              key={name}
              to={to}
              className={({ isActive }) =>
                `hover:text-[#C65656] transition-colors duration-300 ${
                  isActive ? "text-[#C65656]" : ""
                }`
              }
              aria-label={`Go to ${name}`}
            >
              {name}
            </NavLink>
          ))}
        </nav>

        {/* Social Links */}
        <div className="flex space-x-6 mt-6 md:mt-0 text-gray-700 text-xl">
          <a
            href="https://facebook.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-[#C65656] transition-colors duration-300"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-[#C65656] transition-colors duration-300"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-[#C65656] transition-colors duration-300"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-[#C65656] transition-colors duration-300"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} YourFitnessApp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
