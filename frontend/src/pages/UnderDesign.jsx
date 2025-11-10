/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";

const UnderDesign = () => {
  const navigate = useNavigate();
  return (
    <div className="max-h-screen items-center block md:hidden ">
      <div className="text-center mt-52 -top-w-1/2 h-[44px]">
      <p className="text-2xl font-semibold mb-10">Under Design. . .</p>
        <button
        //   onClick={() => navigate("https://iesl.lk/mis/register/new")}
        onClick={() => window.location.href = "https://iesl.lk/mis/register/new"}
          className="bg-[#2D387D] text-white px-8 py-4 rounded-lg hover:bg-blue-900 transition-colors duration-300 text-[16px] font-[500] "
        >
          Get Membership
        </button>
      </div>
    </div>
  );
};

export default UnderDesign;
