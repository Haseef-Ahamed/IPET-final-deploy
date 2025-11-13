/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */

import footer_logo from "../assets/Footer_logo.svg";
import telephone from "../assets/Telephone.svg";
import location from "../assets/Location.svg";
import mail from "../assets/Mail.svg";
import fb from "../assets/Footer_fb.svg";
import linkedIn from "../assets/Footer_linkedIn.svg";

const Footer = () => {
  return (
    <>
      {/* Desktop & Tablet View */}
      <div className="hidden w-full md:block">
        <div className="bg-gradient-to-r from-[#2D387D] to-[#4B5EAA] text-white py-8 w-[90%] max-w-[1200px] mx-auto absolute left-1/2 -translate-x-1/2 -mt-20 rounded-xl shadow-lg">
          <div className="px-6 mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex flex-col items-center flex-1 min-w-[150px] space-y-4 transition-transform duration-300 hover:scale-105">
                <img src={telephone} alt="Telephone" className="w-8 h-8 md:h-10 md:w-10" />
                <span className="text-sm md:text-lg font-semibold">
                  +94 771 170 441
                </span>
              </div>

              <div className="w-px h-24 bg-[#BFC2D6] opacity-50"></div>

              <div className="flex flex-col items-center flex-1 min-w-[150px] space-y-4 transition-transform duration-300 hover:scale-105">
                <img src={location} alt="Location" className="w-8 h-8 md:h-10 md:w-10" />
                <span className="text-sm md:text-lg font-semibold text-center">
                  No 60, Weediyawatta, Yakkala.
                </span>
              </div>

              <div className="w-px h-24 bg-[#BFC2D6] opacity-50"></div>

              <div className="flex flex-col items-center flex-1 min-w-[150px] space-y-4 transition-transform duration-300 hover:scale-105">
                <img src={mail} alt="Email" className="w-8 h-8 md:h-10 md:w-10" />
                <span className="text-sm md:text-lg font-semibold">
                  info@ipet.lk
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-40 pb-16 text-white bg-gray-900 w-full">
          <div className="container px-6 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left ml-20">
              {/* Logo and Social Media Section */}
              <div className="space-y-8">
                <img
                  src={footer_logo}
                  alt="iPET Logo"
                  className="h-20 md:h-24 mx-auto md:mx-0 transition-transform duration-300 hover:scale-110"
                />
                <div>
                  <h3 className="font-bold text-lg mb-5 tracking-wide">Follow Us On</h3>
                  <div className="flex justify-center md:justify-start gap-4">
                    <a
                      href="https://www.facebook.com/share/15MH58JbuB/"
                      className="border border-white p-3 rounded-full hover:bg-white group transition-all duration-300 transform hover:scale-110"
                    >
                      <img
                        src={fb}
                        alt="Facebook"
                        className="h-7 w-7 md:h-8 md:w-8 group-hover:invert"
                      />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/institute-of-professional-engineers-and-technologist/"
                      className="border border-white p-3 rounded-full hover:bg-white group transition-all duration-300 transform hover:scale-110"
                    >
                      <img
                        src={linkedIn}
                        alt="LinkedIn"
                        className="h-7 w-7 md:h-8 md:w-8 group-hover:invert"
                      />
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Links Section */}
              <div className="space-y-6" style={{marginLeft:'40px'}}>
                <h3 className="text-lg mb-5 tracking-wide">
                  QUICK LINKS
                  <hr className="border-t-2 border-gray-500 my-3 w-24 mx-auto md:mx-0" />
                </h3>
                <ul className="space-y-4">
                  {[
                    { name: "Home", path: "/" },
                    { name: "About Us", path: "/aboutus" },
                    { name: "News & Events", path: "/newsevents" },
                    { name: "Contact Us", path: "/contactus" },
                  ].map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.path}
                        className="hover:text-gray-300 transition-colors duration-200 text-base"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* New Services Section */}
              <div className="space-y-6 ml-3"  style={{marginLeft:'28px'}}>
                <h3 className="text-lg mb-5 tracking-wide">
                  SERVICES
                  <hr className="border-t-2 border-gray-500 my-3 w-24 mx-auto md:mx-0" />
                </h3>
                <ul className="space-y-4">
                  {[
                    { name: "CPD Courses", path: "/view-courses" },
                    { name: "Membership", path: "/membership" },
                  ].map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.path}
                        className="hover:text-gray-300 transition-colors duration-200 text-base"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources Section */}
              <div className="space-y-6 ml-3"  style={{marginLeft:'28px'}}>
                <h3 className="text-lg mb-5 tracking-wide">
                  RESOURCES
                  <hr className="border-t-2 border-gray-500 my-3 w-24 mx-auto md:mx-0" />
                </h3>
                <ul className="space-y-4">
                  {[
                    { name: "Privacy Policy", path: "/privacy-policy" },
                    { name: "Legal Policy", path: "/legal-policy" },
                  ].map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.path}
                        className="hover:text-gray-300 transition-colors duration-200 text-base"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="py-6 text-white bg-gray-900 border-t border-gray-700">
          <div className="container px-6 mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-5 text-sm font-light text-center">
              <p>
                Copyright © 2024{" "}
                <a href="https://www.ipet.lk" className="text-[#3B82F6] hover:underline">
                  IPET
                </a>
                . All Rights Reserved.
              </p>
              <p>
                Designed & Developed by{" "}
                <a href="https://uvexzon.com" className="text-[#3B82F6] hover:underline">
                  Uvexzon
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="w-full md:hidden">
        <div className="bg-gradient-to-r from-[#2D387D] to-[#4B5EAA] text-white py-6 w-full mx-auto -mt-24 rounded-b-lg shadow-lg">
          <div className="px-4 mx-auto">
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-col items-center space-y-2 transition-transform duration-300 hover:scale-105">
                <img src={telephone} alt="Telephone" className="w-5 h-5" />
                <span className="text-xs font-semibold text-center">
                  +94 771 170 441
                </span>
              </div>

              <div className="w-px h-12 bg-[#BFC2D6] opacity-50"></div>

              <div className="flex flex-col items-center space-y-2 transition-transform duration-300 hover:scale-105">
                <img src={location} alt="Location" className="w-5 h-5" />
                <span className="text-xs font-semibold text-center">
                  No 60, Weediyawatta, Yakkala.
                </span>
              </div>

              <div className="w-px h-12 bg-[#BFC2D6] opacity-50"></div>

              <div className="flex flex-col items-center space-y-2 transition-transform duration-300 hover:scale-105">
                <img src={mail} alt="Email" className="w-5 h-5" />
                <span className="text-xs font-semibold text-center">
                  info@ipet.lk
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-28 pb-12 text-white bg-gray-900">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col items-center space-y-12">
              <img
                src={footer_logo}
                alt="iPET Logo"
                className="h-16 transition-transform duration-300 hover:scale-110 mx-auto"
              />

              <div className="w-full grid grid-cols-1 gap-10">
                <div className="space-y-6 text-center">
                  <h3 className="text-sm mb-5 tracking-wide">
                    QUICK LINKS
                    <hr className="border-t-2 border-gray-500 my-3 mx-auto w-20" />
                  </h3>
                  <ul className="space-y-4 text-sm">
                    {[
                      { name: "Home", path: "/" },
                      { name: "About Us", path: "/aboutus" },
                      { name: "News & Events", path: "/newsevents" },
                      { name: "Contact Us", path: "/contactus" },
                    ].map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.path}
                          className="hover:text-gray-300 transition-colors duration-200"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6 text-center">
                  <h3 className="text-sm mb-5 tracking-wide">
                    SERVICES
                    <hr className="border-t-2 border-gray-500 my-3 mx-auto w-20" />
                  </h3>
                  <ul className="space-y-4 text-sm">
                    {[
                      { name: "CPD Courses", path: "/view-courses" },
                      { name: "Membership", path: "/membership" },
                    ].map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.path}
                          className="hover:text-gray-300 transition-colors duration-200"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6 text-center">
                  <h3 className="text-sm mb-5 tracking-wide">
                    RESOURCES
                    <hr className="border-t-2 border-gray-500 my-3 mx-auto w-20" />
                  </h3>
                  <ul className="space-y-4 text-sm">
                    {[
                      { name: "Privacy Policy", path: "/privacy-policy" },
                      { name: "Legal Policy", path: "/legal-policy" },
                    ].map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.path}
                          className="hover:text-gray-300 transition-colors duration-200"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col items-center space-y-5">
                  <h3 className="font-bold text-sm tracking-wide">Follow Us On</h3>
                  <div className="flex gap-4">
                    <a
                      href="https://www.facebook.com/share/15MH58JbuB/"
                      className="border border-white p-2 rounded-full hover:bg-white group transition-all duration-300 transform hover:scale-110"
                    >
                      <img
                        src={fb}
                        alt="Facebook"
                        className="w-5 h-5 group-hover:invert"
                      />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/institute-of-professional-engineers-and-technologist/"
                      className="border border-white p-2 rounded-full hover:bg-white group transition-all duration-300 transform hover:scale-110"
                    >
                      <img
                        src={linkedIn}
                        alt="LinkedIn"
                        className="w-5 h-5 group-hover:invert"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-6 text-white bg-gray-900 border-t border-gray-700">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col items-center gap-4 text-xs font-light text-center">
              <p>
                Copyright © 2024{" "}
                <a href="https://www.ipet.lk" className="text-[#3B82F6] hover:underline">
                  IPET
                </a>
                . All Rights Reserved.
              </p>
              <p>
                Designed & Developed by{" "}
                <a href="https://uvexzon.com" className="text-[#3B82F6] hover:underline">
                  Uvexzon
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;