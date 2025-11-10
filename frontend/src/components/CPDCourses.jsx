/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import scales from "../assets/Scales.svg";
import graduate from "../assets/Graduate.svg";
import network from "../assets/Network.svg";
import drone from "../assets/Drone.svg";
import graduates from "../assets/Graduates.svg";
import worker from "../assets/Worker.svg";
import about_bg from "../assets/Abouthero_bg.svg";
import about_bg_m from "../assets/Aboutus_m_bg.svg";
import { useNavigate } from "react-router-dom";

const CPDCourses = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const courses = [
    {
      id: 1,
      title: "CPD Courses 01",
      image: scales,
      description:
        "To be recognized as a premier institution in engineering and technology, fostering innovation, excellence, and sustainable practices that empower professionals to shape the future of our global community.",
    },
    {
      id: 2,
      title: "CPD Courses 02",
      image: graduate,
      description:
        "To be recognized as a premier institution in engineering and technology, fostering innovation, excellence, and sustainable practices that empower professionals to shape the future of our global community.",
    },
    {
      id: 3,
      title: "CPD Courses 03",
      image: network,
      description:
        "To be recognized as a premier institution in engineering and technology, fostering innovation, excellence, and sustainable practices that empower professionals to shape the future of our global community.",
    },
    {
      id: 4,
      title: "CPD Courses 04",
      image: drone,
      description:
        "To be recognized as a premier institution in engineering and technology, fostering innovation, excellence, and sustainable practices that empower professionals to shape the future of our global community.",
    },
    {
      id: 5,
      title: "CPD Courses 05",
      image: graduates,
      description:
        "To be recognized as a premier institution in engineering and technology, fostering innovation, excellence, and sustainable practices that empower professionals to shape the future of our global community.",
    },
    {
      id: 6,
      title: "CPD Courses 06",
      image: worker,
      description:
        "To be recognized as a premier institution in engineering and technology, fostering innovation, excellence, and sustainable practices that empower professionals to shape the future of our global community.",
    },
  ];

  return (
    // <div className="min-h-screen bg-gray-100 py-28 px-4 mb-16">
    //   <div className="max-w-7xl mx-auto">
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //       {courses.map((course) => (
    //         <div
    //           key={course.id}
    //           className="bg-white h-[770px]  overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    //         >
    //           <div className="relative h-[426px] w-[440px]">
    //             <img
    //               src={course.image}
    //               alt={course.title}
    //               className="w-[440px] h-full object-cover"
    //             />
    //           </div>
    //           <div className="p-6">
    //             <h3 className="text-[30px] font-[600] text-[#2543B1] mb-4">
    //               {course.title}
    //             </h3>
    //             <p className="text-[#2543B1] font-[400] text-[16px] mb-8">
    //               {course.description}
    //             </p>
    //             <button className="text-center text-[24px] w-[340px] h-[66px] bg-[#2D387D] text-white py-[15px] px-4 rounded-[5px] hover:bg-blue-900 transition-colors duration-300">
    //               Register Now
    //             </button>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
    <>
      <div className="min-h-screen bg-gray-50 md:block hidden">
        {/* Hero Banner */}
        <div className="relative  h-[269px] mb-8">
          <div className="absolute inset-0">
            <img
              src={about_bg}
              alt="CPD Courses Banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-0 ml-16">
              <h1 className="text-4xl md:text-5xl font-bold  text-white">
                CPD Courses
              </h1>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="container max-w-[1500px] mx-auto px-16 pb-40 py-14 md:flex">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white w-full overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-[400px]">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-[30px] font-[600] text-[#2543B1] mb-3">
                    {course.title}
                  </h3>
                  <p className="text-[16px] text-[#2543B1] font-[400] mb-4 leading-relaxed">
                    {course.description}
                  </p>
                  <button
                    onClick={() => navigate("/register")}
                    className="w-full h-[66px] text-[24px] bg-[#2D387D] text-white py-2.5 rounded-md hover:bg-blue-900 transition-colors duration-300 text-sm font-medium"
                  >
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* mobile view */}
      <div className="min-h-screen min-w-full bg-gray-50 md:hidden">
        {/* Hero Banner */}

        <div className="relative px-2 w-full md:w-full sm:w-[742px] h-[169px] md:h-[269px] sm:h-[269px]  md:hidden ">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[#00000099]  z-10" />
            <img
              src={about_bg_m}
              alt="About Us Hero"
              className="md:w-full sm:w-[740px] md:h-full sm:h-full w-full h-full object-cover"
            />
          </div>

          <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-0 md:px-0 md:ml-[70px] sm:ml-[40px]">
            <div className="flex items-center h-full">
              <h1 className="text-[30px] md:text-5xl lg:text-6xl font-[600] text-white">
                CPD Courses
              </h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-3 pb-40 py-14">
          {/* Single Course Display */}
          <div className="relative overflow-hidden">
            <div
              className="transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              <div className="flex">
                {courses.map((course) => (
                  <div key={course.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white w-full max-w-[390px] mx-auto overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                      <div className="relative h-[268px]">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 text-center">
                        <h3 className="text-[14px] font-[600] text-[#2543B1] mb-3">
                          {course.title}
                        </h3>
                        <p className="text-[12px] text-[#2543B1] font-[400] mb-4 leading-relaxed">
                          {course.description}
                        </p>
                        <button className="w-full h-[31px] text-[14px] bg-[#2D387D] text-white py-2.0 rounded-md hover:bg-blue-900 transition-colors duration-300  font-medium">
                          Register Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {courses.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === index
                    ? "bg-[#2D387D80] w-2"
                    : "bg-[#2D387D33] hover:bg-gray-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CPDCourses;
