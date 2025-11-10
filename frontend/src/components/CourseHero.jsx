/* eslint-disable no-unused-vars */
import React from "react";
import about_bg from "../assets/Abouthero_bg.svg";

const CourseHero = () => {
  return (
    <div className="relative md:w-full sm:w-[742px] h-[300px] md:h-[269px] sm:h-[269px] hidden md:block">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#00000099] z-10" />
        <img
          src={about_bg}
          alt="About Us Hero"
          className="md:w-full sm:w-[740px] md:h-full sm:h-full object-cover"
        />
      </div>

      <div className="relative z-20 h-full max-w-7xl mx-auto sm:px-0 md:px-0 md:ml-[70px] sm:ml-[40px]">
        <div className="flex items-center h-full">
          <h1 className="text-[50px] md:text-5xl lg:text-6xl font-[600] text-white">
            CPD Courses
          </h1>
        </div>
      </div>
    </div>
  );
};

export default CourseHero;
