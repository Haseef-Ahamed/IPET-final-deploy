import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ProfileView from "./ProfileView";
import { useNavigate } from "react-router-dom";

const IPETMIS = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const response = await fetch("http://72.60.42.161/api/search-user-by-nic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nic: formData.registrationId }),
      });

      const data = await response.json();

      if (response.status === 404) {
        setError("User not found.");
        return;
      }

      if (response.status === 403) {
        setError("User does not have a membership number.");
        return;
      }

      if (response.status === 200) {
        setError("");
        setProfileData(data);
        setShowProfile(true);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setError("Failed to fetch user details.");
    }
  };

  if (showProfile && profileData) {
    return <ProfileView profileData={profileData} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 items-center justify-center lg:p-2 lg:px-16 px-2 lg:py-6 py-4" style={{ minHeight: "73vh" }}>
      <div className="max-w-full w-full lg:h-[700px] h-auto bg-white justify-center shadow-lg lg:p-24 p-6 flex flex-row md:flex-row lg:gap-8 gap-4">
        <div className="min-w-full w-full lg:h-[500px] h-auto bg-[#E9ECF7] rounded-lg shadow-lg lg:p-16 p-6">
          <div className="space-y-4 text-center mb-5">
            <h1 className="text-[16px] lg:text-4xl font-semibold text-[#2543B1]">
              iPET MIS
            </h1>
          </div>

          <div className="lg:flex lg:justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="registrationId"
                  className="block text-black lg:text-[20px] text-[14px] font-[500] mb-4"
                >
                  NIC Number
                </label>
                <input
                  {...register("registrationId", {
                    required: "Registration ID is required",
                  })}
                  type="text"
                  id="registrationId"
                  className={`lg:w-[620px] w-full lg:h-[70px] h-[45px] bg-[#E9ECF7] px-3 py-2 mb-5 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    errors.registrationId
                      ? "border-red-500"
                      : "border-[#2D387D]"
                  }`}
                />
                {errors.registrationId && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.registrationId.message}
                  </p>
                )}
                {error && (
                  <p className="mt-1 text-sm text-red-500">{error}</p>
                )}
              </div>

              <button
                type="submit"
                className="lg:w-[620px] w-full lg:h-[70px] h-[45px] lg:text-[18px] text-[14px] font-[500] bg-[#2D387D] text-white py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPETMIS;