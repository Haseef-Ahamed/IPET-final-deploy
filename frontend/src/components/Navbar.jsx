 
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import fbIcon from "../assets/fb.svg";
import twitterIcon from "../assets/twitter.svg";
import linkedInIcon from "../assets/linkedIn.svg";
import youtubeIcon from "../assets/youtube.svg";
import logo from "../assets/logo1.svg";
import { useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import axios from 'axios'

const Navbar = () => {
  const [coursesDropdown, setCoursesDropdown] = useState(false);
  const [membershipDropdown, setMembershipDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchResults, setSearchResults] = useState({});
  const searchRef = useRef(null);
  const [courses, setCourses] = useState([]);

  // Helper function to clear admin-related storage and navigate to admin login
  const handleAdminLoginClick = () => {
    // Clear all localStorage and sessionStorage
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
    toggleMobileMenu(); // Close mobile menu when navigating
  };

  const mobileMenuClasses = `fixed inset-0 z-50 transform bg-white overflow-auto transition-transform duration-300 ease-in-out ${
    isMenuOpen ? "translate-x-0" : "translate-x-full"
  }`;

  // Define your navigation routes
  const navigationConfig = {
    "CPD Courses": {
      items: [],
      apiPath: "http://72.60.42.161/api/events-courses/course"
    },
    "News & Events": {
      items: [{ title: "News & Events", path: "/newsevents" }],
    },
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://72.60.42.161/api/events-courses/course"
        );
        
        if (response.data) {
          setCourses(response.data);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };
  
    fetchCourses();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim()) {
      setShowSuggestions(true);
      
      // Filter the actual courses data
      const filtered = courses.filter(course =>
        course.title.toLowerCase().includes(value.toLowerCase())
      );
      
      setSearchResults({
        "CPD Courses": filtered.map(course => ({
          title: course.title,
          path: `/courses/${course.id}`,
          id: course.id
        }))
      });
    } else {
      setShowSuggestions(false);
      setSearchResults({});
    }
  };

  const handleSuggestionClick = (item) => {
    setSearchTerm(item.title);
    setShowSuggestions(false);
    navigate(item.path);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate('/search');
    }
    setShowSuggestions(false);
  };

  return (
    <>
      <div className=" bg-[#2D387D] text-white md:py-2 sm:py-6 md:h-14 sm:h-16 min-w-full md:px-16 sm:px-8 hidden md:block">
        <div className="max-w-full">
          <div className="container flex items-center justify-between min-w-full md:mx-auto sm:mx-auto">
            <div className="flex items-center md:space-x-5 sm:space-x-2">
              <span className="md:text-[16px] sm:text-[13px] font-[600]">
                Email: <span className="font-[400]">info@ipet.lk</span>
              </span>
              <div className="h-9 w-[1px] bg-white/30 mx-4"></div>
              <span className="md:text-[16px] sm:text-[13px] font-[600]">
                Call: <span className="font-[400]">+94 771 170 441</span>
              </span>
            </div>
            <div className="items-center md:flex sm:flex md:space-x-10 sm:space-x-2">
              <div className="md:text-[0px] sm:text-[24px] md:flex sm:flex items-center space-x-4">
                <a href="https://www.facebook.com/share/15MH58JbuB/" className="hover:text-gray-300">
                  <img src={fbIcon} alt="" />
                </a>
                <a href="https://www.linkedin.com/company/institute-of-professional-engineers-and-technologist/" className="hover:text-gray-300">
                  <img src={linkedInIcon} alt="" />
                </a>
              </div>

              <div className="relative ml-4" ref={searchRef}>
                <form onSubmit={handleSubmit} className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onClick={() => setShowSuggestions(true)}
                    className="w-64 pr-8 text-sm text-gray-800 border border-gray-300 rounded-md md:px-4 sm:px-2 md:py-1 sm:py-1 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <button type="submit" className="absolute p-1 transform -translate-y-1/2 rounded-full right-2 top-1/2 hover:bg-gray-100">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9.625 8.5H9.0325L8.8225 8.2975C9.58296 7.41555 10.0009 6.28954 10 5.125C10 4.16082 9.71409 3.21829 9.17842 2.4166C8.64275 1.61491 7.88137 0.990067 6.99058 0.621089C6.09979 0.252112 5.11959 0.155571 4.17394 0.343674C3.22828 0.531777 2.35964 0.996076 1.67786 1.67786C0.996076 2.35964 0.531777 3.22828 0.343674 4.17394C0.155571 5.11959 0.252112 6.09979 0.621089 6.99058C0.990067 7.88137 1.61491 8.64275 2.4166 9.17842C3.21829 9.71409 4.16082 10 5.125 10C6.3325 10 7.4425 9.5575 8.2975 8.8225L8.5 9.0325V9.625L12.25 13.3675L13.3675 12.25L9.625 8.5ZM5.125 8.5C3.2575 8.5 1.75 6.9925 1.75 5.125C1.75 3.2575 3.2575 1.75 5.125 1.75C6.9925 1.75 8.5 3.2575 8.5 5.125C8.5 6.9925 6.9925 8.5 5.125 8.5Z"
                        fill="#777777" fillOpacity="0.49"
                      />
                    </svg>
                  </button>
                </form>

                {showSuggestions && searchTerm && (
                  <div className="absolute z-50 w-full mt-1 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg max-h-96">
                    {Object.entries(searchResults).map(([category, items]) => (
                      <div key={category}>
                        <div className="sticky top-0 px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
                          {category}
                        </div>
                        {items.map((item, index) => (
                          <div
                            key={index}
                            className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSuggestionClick(item)}
                          >
                            {item.title}
                          </div>
                        ))}
                      </div>
                    ))}
                    {Object.keys(searchResults).length === 0 && (
                      <div className="px-4 py-2 text-sm text-gray-500">
                        No results found
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile view */}
      <div className="bg-[#2D387D] text-white py-1 h-[51px] min-w-full px-6 md:hidden">
        <div className="min-w-full">
          <div className="container flex items-center justify-between min-w-full mx-auto">
            <div className="grid grid-cols-1">
              <div className="flex items-center gap-[6px]">
                <span className="text-[8px] font-[600]">
                  Email: <span className="font-[400]">info@ipet.lk</span>
                </span>
                <div className="h-7 w-[1px] bg-white/30 mx-0"></div>
                <span className="text-[8px] font-[600]">
                  Call: <span className="font-[400]">+94 771 170 441</span>
                </span>
              </div>
              <div className="flex items-center gap-[5px]">
                <a href="https://www.facebook.com/share/15MH58JbuB/" className="hover:text-gray-300">
                  <img src={fbIcon} alt="" className="w-[10px] h-[10px]" />
                </a>
                <a href="https://www.linkedin.com/company/institute-of-professional-engineers-and-technologist/" className="hover:text-gray-300">
                  <img src={linkedInIcon} alt="" className="w-[10px] h-[10px]" />
                </a>
              </div>
            </div>
            <div className="flex items-center" ref={searchRef}>
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onClick={() => setShowSuggestions(true)}
                  className="w-[110px] h-[15px] p-[10px] rounded-[5px] text-gray-800 text-[8px] focus:outline-none"
                />
                <button className="absolute right-2 top-[15px] transform -translate-y-1/2">
                  <svg width="10" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9.625 8.5H9.0325L8.8225 8.2975C9.58296 7.41555 10.0009 6.28954 10 5.125C10 4.16082 9.71409 3.21829 9.17842 2.4166C8.64275 1.61491 7.88137 0.990067 6.99058 0.621089C6.09979 0.252112 5.11959 0.155571 4.17394 0.343674C3.22828 0.531777 2.35964 0.996076 1.67786 1.67786C0.996076 2.35964 0.531777 3.22828 0.343674 4.17394C0.155571 5.11959 0.252112 6.09979 0.621089 6.99058C0.990067 7.88137 1.61491 8.64275 2.4166 9.17842C3.21829 9.71409 4.16082 10 5.125 10C6.3325 10 7.4425 9.5575 8.2975 8.8225L8.5 9.0325V9.625L12.25 13.3675L13.3675 12.25L9.625 8.5ZM5.125 8.5C3.2575 8.5 1.75 6.9925 1.75 5.125C1.75 3.2575 3.2575 1.75 5.125 1.75C6.9925 1.75 8.5 3.2575 8.5 5.125C8.5 6.9925 6.9925 8.5 5.125 8.5Z"
                      fill="#777777" fillOpacity="0.49"
                    />
                  </svg>
                </button>
              </form>

              {showSuggestions && searchTerm && (
                <div className="absolute z-50 w-full mt-1 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg max-h-48">
                  {Object.entries(searchResults).map(([category, items]) => (
                    <div key={category}>
                      <div className="sticky top-0 px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
                        {category}
                      </div>
                      {items.map((item, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSuggestionClick(item)}
                        >
                          {item.title}
                        </div>
                      ))}
                    </div>
                  ))}
                  {Object.keys(searchResults).length === 0 && (
                    <div className="px-4 py-2 text-sm text-gray-500">
                      No results found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <nav className="w-full bg-white shadow-lg">
        <div className="px-4 py-2 lg:px-14 xl:px-16">
          <div className="flex items-center justify-between h-16 lg:h-28">
            <div className="flex-shrink-0">
              <img
                src={logo}
                alt="Logo"
                className="h-10 w-20 lg:h-[85px] lg:w-[160px] cursor-pointer"
                onClick={() => window.location.reload(navigate("/"))}
              />
            </div>

            <div className="items-center hidden space-x-6 lg:flex xl:space-x-12">
              <a href="/" className="text-black hover:text-[#2D387D] text-[16px] transition-colors">Home</a>
              <a href="/aboutus" className="text-black hover:text-[#2D387D] text-[16px] transition-colors">About Us</a>
              <a href="/view-courses" className="text-black hover:text-[#2D387D] text-[16px] transition-colors">CPD Courses</a>
              <a href="/membership" className="text-black hover:text-[#2D387D] text-[16px] transition-colors">Membership</a>
              <a href="/newsevents" className="text-black hover:text-[#2D387D] text-[16px] transition-colors">News & Events</a>
              <a href="/contactus" className="text-black hover:text-[#2D387D] text-[16px] transition-colors">Contact Us</a>
            </div>

            <div className="items-center hidden space-x-2 lg:flex">
              <button
                onClick={() => navigate("/login")}
                className="action-button bg-[#2D387D] text-white text-[16px] font-medium px-6 py-2 rounded-[5px] hover:bg-[#1e2655] transition-colors"
              >
                My iPET
              </button>
              <button
                onClick={() => navigate("/membership-details")}
                className="action-button bg-[#2D387D] text-white text-[16px] font-medium px-6 py-2 rounded-[5px] hover:bg-[#1e2655] transition-colors"
              >
                Register
              </button>
              <button
                onClick={handleAdminLoginClick} // Updated to use the helper function
                className="text-[16px] font-medium px-2 py-2 rounded-[5px] hover:bg-[#1e2655] transition-colors"
              >
                <FaUserAlt className="" />
              </button>
            </div>

            <div className="lg:hidden">
              <button onClick={toggleMobileMenu} className="p-2">
                {isMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className={mobileMenuClasses}>
          <div className="px-4 pt-16 pb-8 space-y-4">
            <div className="flex items-center justify-between mb-8">
              <img src={logo} alt="Logo" className="w-20 h-10" />
              <button onClick={toggleMobileMenu} className="p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col items-center px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                onClick={() => handleNavigation("/")}
                className="block px-3 py-2 text-[16px] font-[600] text-black hover:text-[#2D387D] w-full text-center"
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation("/aboutus")}
                className="block px-3 py-2 text-[16px] font-[600] text-black hover:text-[#2D387D] w-full text-center"
              >
                About Us
              </button>
              <button
                onClick={() => handleNavigation("/view-courses")}
                className="w-full px-2 text-center gap-2 py-2 text-[16px] font-[600] text-black hover:text-[#2D387D] flex justify-center items-center"
              >
                CPD Courses
              </button>
              <button
                onClick={() => handleNavigation("/membership")}
                className="w-full text-center px-3 gap-2 py-2 text-[16px] font-[600] text-black hover:text-[#2D387D] flex items-center justify-center"
              >
                Membership
              </button>
              <button
                onClick={() => handleNavigation("/newsevents")}
                className="block px-3 py-2 text-[16px] font-[600] text-black hover:text-[#2D387D] w-full text-center"
              >
                News & Events
              </button>
              <button
                onClick={() => handleNavigation("/contactus")}
                className="block px-3 py-2 text-[16px] font-[600] text-black hover:text-[#2D387D] w-full text-center"
              >
                Contact Us
              </button>

              <div className="flex justify-center flex-col gap-[30px] sm:gap-6 lg:gap-8 px-3 sm:px-4 lg:px-6 pt-2 mb-5 w-full max-w-[400px] lg:max-w-[600px] mx-auto">
                <button
                  className="bg-[#2D387D] text-[14px] sm:text-[16px] lg:text-[18px] font-[500] text-white px-2 sm:px-4 py-1 h-[38px] sm:h-[44px] lg:h-[50px] w-full rounded-[5px] hover:bg-[#1E2959] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#2D387D] focus:ring-opacity-50 shadow-md"
                  onClick={() => handleNavigation("/login")}
                >
                  My iPET
                </button>
                <button
                  className="bg-[#2D387D] text-[14px] sm:text-[16px] lg:text-[18px] font-[500] text-white px-2 sm:px-4 py-1 h-[38px] sm:h-[44px] lg:h-[50px] w-full rounded-[5px] hover:bg-[#1E2959] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#2D387D] focus:ring-opacity-50 shadow-md"
                  onClick={() => handleNavigation("/membership-details")}
                >
                  Register
                </button>
                <button
                  onClick={() => {
                    handleAdminLoginClick(); // Updated to use the helper function
                    handleNavigation("/admin-login"); // Ensure mobile menu closes
                  }}
                  className="text-[16px] flex items-center justify-center font-medium px-40 py-1 h-[38px] sm:h-[44px] lg:h-[50px] w-full rounded-[5px] hover:bg-[#1e2655] transition-colors"
                >
                  <FaUserAlt className="flex items-center" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;