/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import fbIcon from "../assets/fb.svg";
import linkedInIcon from "../assets/linkedIn.svg";
import logo from "../assets/logo1.svg";
import { useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleAdminLoginClick = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/admin-login");
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? "hidden" : "unset";
  };

  const handleNavigation = (path) => {
    navigate(path);
    toggleMobileMenu();
  };

  const mobileMenuClasses = `fixed inset-0 z-50 bg-white overflow-y-auto transition-transform duration-300 ease-in-out ${
    isMenuOpen ? "translate-x-0" : "translate-x-full"
  }`;

  return (
    <>
      {/* ==================== DESKTOP TOP BAR ==================== */}
      <div className="bg-[#2D387D] text-white h-14 hidden md:flex items-center px-16">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-sm font-medium">
          <div className="flex items-center gap-6">
            <span>Email: <span className="font-normal">info@ipet.lk</span></span>
            <div className="h-7 w-px bg-white/30"></div>
            <span>Call: <span className="font-normal">+94 771 170 441</span></span>
          </div>
          <div className="flex items-center gap-5">
            <a href="https://www.facebook.com/share/15MH58JbuB/" className="hover:opacity-80 transition">
              <img src={fbIcon} alt="Facebook" className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/company/institute-of-professional-engineers-and-technologist/" className="hover:opacity-80 transition">
              <img src={linkedInIcon} alt="LinkedIn" className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* ==================== MOBILE TOP BAR ==================== */}
      <div className="bg-[#2D387D] text-white py-2 h-[51px] px-4 md:hidden">
        <div className="flex items-center justify-between h-full text-xs font-medium">
          <div className="flex items-center gap-2">
            <span>Email: info@ipet.lk</span>
            <div className="h-5 w-px bg-white/30"></div>
            <span>Call: +94 771 170 441</span>
          </div>
          <div className="flex gap-3">
            <img src={fbIcon} alt="FB" className="w-5 h-5" />
            <img src={linkedInIcon} alt="LI" className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* ==================== MAIN NAVIGATION ==================== */}
      <nav className="bg-white shadow-lg sticky top-0 z-40">
        <div className="px-4 py-3 lg:px-16">
          <div className="flex items-center justify-between h-16 lg:h-28 relative">
            {/* Logo - Left */}
            <div className="flex-shrink-0">
              <img
                src={logo}
                alt="iPET Logo"
                className="h-10 w-20 lg:h-20 lg:w-40 cursor-pointer"
                onClick={() => {
                  navigate("/");
                  window.location.reload();
                }}
              />
            </div>

            {/* Desktop Menu - Center */}
            <div className="hidden lg:flex flex-1 justify-center items-center space-x-10">
              {[
                { label: "Home", path: "/" },
                { label: "About Us", path: "/aboutus" },
                { label: "CPD Courses", path: "/view-courses" },
                { label: "Membership", path: "/membership" },
                { label: "News & Events", path: "/newsevents" },
                { label: "Contact Us", path: "/contactus" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.path);
                  }}
                  className="text-gray-800 hover:text-[#2D387D] text-base font-medium transition duration-200"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Desktop Buttons - Right */}
            <div className="hidden lg:flex items-center space-x-3">
              <button
                onClick={() => navigate("/login")}
                className="bg-[#2D387D] text-white px-6 py-2.5 rounded hover:bg-[#1e2655] transition font-medium"
              >
                My iPET
              </button>
              <button
                onClick={() => navigate("/membership-details")}
                className="bg-[#2D387D] text-white px-6 py-2.5 rounded hover:bg-[#1e2655] transition font-medium"
              >
                Register
              </button>
              <button
                onClick={handleAdminLoginClick}
                className="p-2.5 hover:bg-gray-100 rounded-full transition"
              >
                <FaUserAlt className="text-[#2D387D] text-xl" />
              </button>
            </div>

            {/* MOBILE: Hamburger Icon */}
            <div className="flex items-center justify-end flex-1 lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-3 -mr-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ==================== MOBILE FULLSCREEN MENU ==================== */}
        <div className={mobileMenuClasses}>
          <div className="flex flex-col h-full px-6 pt-10 pb-12">
            {/* Logo – Reduced spacing from mb-14 → mb-8 */}
            <div className="flex justify-center mb-8">
              <img src={logo} alt="iPET Logo" className="h-20 w-48" />
            </div>

            {/* Close Button */}
            <button
              onClick={toggleMobileMenu}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition"
            >
              <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Menu Links */}
            <div className="space-y-4 text-center flex-1">
              {[
                { label: "Home", path: "/" },
                { label: "About Us", path: "/aboutus" },
                { label: "CPD Courses", path: "/view-courses" },
                { label: "Membership", path: "/membership" },
                { label: "News & Events", path: "/newsevents" },
                { label: "Contact Us", path: "/contactus" },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavigation(item.path)}
                  className="block w-full py-3 text-2xl font-bold text-gray-800 hover:text-[#2D387D] transition"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 mt-8 w-full max-w-sm mx-auto">
              <button
                onClick={() => handleNavigation("/login")}
                className="w-full bg-[#2D387D] text-white font-bold text-2xl py-6 rounded-lg hover:bg-[#1e2655] transition shadow-xl"
              >
                My iPET
              </button>
              <button
                onClick={() => handleNavigation("/membership-details")}
                className="w-full bg-[#2D387D] text-white font-bold text-2xl py-6 rounded-lg hover:bg-[#1e2655] transition shadow-xl"
              >
                Register
              </button>
              <button
                onClick={() => {
                  handleAdminLoginClick();
                  toggleMobileMenu();
                }}
                className="w-full bg-[#2D387D] text-white font-bold text-2xl py-6 rounded-lg hover:bg-[#1e2655] transition shadow-xl flex items-center justify-center gap-4"
              >
                <FaUserAlt className="text-3xl" />
                <span>Admin Login</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;