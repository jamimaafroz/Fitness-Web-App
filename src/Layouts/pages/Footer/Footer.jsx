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
    <footer className="bg-[#C65656] py-16  sm:py-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-10 md:gap-0">
        {/* Logo */}
        <div className="flex items-center justify-center md:justify-start mb-4 md:mb-0">
          <Logo variant="footer" />
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col sm:flex-row items-center gap-6 text-gray-100 font-medium text-base sm:text-lg">
          {navLinks.map(({ name, to }) => (
            <NavLink
              key={name}
              to={to}
              className={({ isActive }) =>
                `transition-colors duration-300 hover:text-white ${
                  isActive ? "text-white" : ""
                }`
              }
              aria-label={`Go to ${name}`}
            >
              {name}
            </NavLink>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="flex justify-center md:justify-end space-x-5 text-gray-100 text-xl">
          <a
            href="https://facebook.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-white transition-colors duration-300"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-white transition-colors duration-300"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-white transition-colors duration-300"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-white transition-colors duration-300"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-sm text-gray-200">
        © {new Date().getFullYear()} YourFitnessApp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
