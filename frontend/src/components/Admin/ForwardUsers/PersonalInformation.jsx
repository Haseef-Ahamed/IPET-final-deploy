/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PersionalInformation = () => {
  const [activeTab, setActiveTab] = useState("Personal Information");
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state?.userData;


  const handleNext = () => {
    // Create an object with all the personal information
    const personalData = {
      ...userData,
      personalInfo: {
        nameWithInitials: userData.nameWithInitials,
        nameDenoted: userData.nameDenoted,
        gender: userData.gender,
        dob: userData.dob,
        emailAddress: userData.emailAddress,
        nicNo: userData.nicNo,
        passport: userData.passport,
        mobile: userData.mobile,
        homeTel: userData.homeTel,
        officeTel: userData.officeTel,
        homeFax: userData.homeFax,
        officeFax: userData.officeFax,
        workplace: userData.workplace,
        designation: userData.designation,
        currentAddress: userData.currentAddress,
        officialAddress: userData.officialAddress,
        permanentAddress: userData.permanentAddress
      }
    };

    // Navigate to academic page with the combined data
    navigate("/acadamic-f", {
      // state: {
      //   userData: personalData
      // }
      state: {
        userData: personalData // Make sure you're passing the user data
      }
    });
  };

  const handleStepClick = (tabName) => {
    setActiveTab(tabName);
    switch (tabName) {
      case "Personal Information":
        navigate("/personal-f");
        break;
      case "Academic Qualifications":
        // navigate("/acadamic");
        handleNext()
        break;
      case "Training & Experience":
        navigate("/training-f");
        break;
      case "Professional Memberships":
        navigate("/memberships-f");
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div className="bg-[#D9D9D9] lg:py-6 py-6 lg:px-0 px-6 hidden">
        <div className="max-w-full bg-white shadow-md  lg:px-16 px-6 py-6 lg:py-6 mb-2">
          <div className="flex flex-col md:flex-row items-center md:items-center ">
            <div className="lg:w-[153px] w-[88px] lg:h-[142px] h-[90px] bg-gray-200 rounded-full overflow-hidden">
              <div className="lg:block hidden">
                <svg
                  width="153"
                  height="142"
                  viewBox="0 0 153 142"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse cx="76.5" cy="71" rx="76.5" ry="71" fill="#D9D9D9" />
                  <path
                    d="M76 70.5C69.5375 70.5 64.0052 68.3214 59.4031 63.9641C54.801 59.6068 52.5 54.3687 52.5 48.25C52.5 42.1313 54.801 36.8932 59.4031 32.5359C64.0052 28.1786 69.5375 26 76 26C82.4625 26 87.9948 28.1786 92.5969 32.5359C97.199 36.8932 99.5 42.1313 99.5 48.25C99.5 54.3687 97.199 59.6068 92.5969 63.9641C87.9948 68.3214 82.4625 70.5 76 70.5ZM29 115V99.425C29 96.2729 29.8578 93.3767 31.5733 90.7364C33.2888 88.096 35.5643 86.0787 38.4 84.6844C44.4708 81.8104 50.6396 79.6559 56.9062 78.2207C63.1729 76.7856 69.5375 76.0662 76 76.0625C82.4625 76.0588 88.8271 76.7782 95.0937 78.2207C101.36 79.6633 107.529 81.8178 113.6 84.6844C116.44 86.075 118.717 88.0923 120.433 90.7364C122.148 93.3804 123.004 96.2766 123 99.425V115H29Z"
                    fill="black"
                  />
                </svg>
              </div>

              <div className="lg:hidden">
                <svg
                  width="88"
                  height="90"
                  viewBox="0 0 153 142"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse cx="76.5" cy="74" rx="76.5" ry="78" fill="#D9D9D9" />
                  <path
                    d="M76 70.5C69.5375 70.5 64.0052 68.3214 59.4031 63.9641C54.801 59.6068 52.5 54.3687 52.5 48.25C52.5 42.1313 54.801 36.8932 59.4031 32.5359C64.0052 28.1786 69.5375 26 76 26C82.4625 26 87.9948 28.1786 92.5969 32.5359C97.199 36.8932 99.5 42.1313 99.5 48.25C99.5 54.3687 97.199 59.6068 92.5969 63.9641C87.9948 68.3214 82.4625 70.5 76 70.5ZM29 115V99.425C29 96.2729 29.8578 93.3767 31.5733 90.7364C33.2888 88.096 35.5643 86.0787 38.4 84.6844C44.4708 81.8104 50.6396 79.6559 56.9062 78.2207C63.1729 76.7856 69.5375 76.0662 76 76.0625C82.4625 76.0588 88.8271 76.7782 95.0937 78.2207C101.36 79.6633 107.529 81.8178 113.6 84.6844C116.44 86.075 118.717 88.0923 120.433 90.7364C122.148 93.3804 123.004 96.2766 123 99.425V115H29Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>

            <div className="flex-1 w-full space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:flex items-center justify-between lg:ml-[50px]  gap-[26px] max-w-[1175px]">
                <div className="flex flex-col  md:flex-row gap-4">
                  <span className="font-[400] lg:text-[18px] text-[12px]">
                    Engineering Discipline :
                  </span>
                  <span className="bg-gray-200 px-2 py-1 lg:w-[144px] h-[35px]"></span>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <span className="font-[400] lg:text-[18px] text-[12px]">
                    Membership Number :
                  </span>
                  <span className="bg-gray-200 px-2 py-1  lg:w-[144px] h-[35px]"></span>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <span className="font-[400] lg:text-[18px] text-[12px]">
                    Class of Membership :
                  </span>
                  <span className="bg-gray-200 px-2 py-1 lg:w-[144px] h-[35px]"></span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4   lg:p-2 gap-[6px] max-w-[1215px] lg:ml-[30px]">
                <div className="flex flex-col md:flex-row gap-4">
                  <span className="font-[400] lg:text-[18px] text-[12px]">
                    Wild Apricot ID :
                  </span>
                  <span className="bg-gray-200 px-2 py-1 lg:w-[144px] h-[35px]"></span>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <span className="font-[400] lg:text-[18px] text-[12px]">
                    ECSL Number :
                  </span>
                  <span className="bg-gray-200 px-2 py-1 lg:w-[144px] h-[35px]"></span>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <span className="font-[400] lg:text-[18px] text-[12px]">
                    Profile Enrollment Date :
                  </span>
                  <span className="bg-gray-200 px-2 py-1 lg:w-[144px] h-[35px]"></span>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <span className="font-[400] lg:text-[18px] text-[12px]">
                    Library Member No:
                  </span>
                  <span className="bg-gray-200 px-2 py-1 lg:w-[144px] h-[35px]"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Persional form */}
      </div>

      <div className="bg-[#D9D9D9] py-6 px-6 lg:py-6 lg:px-0">
        <div className="w-full max-w-full mx-auto bg-white shadow-md px-6 py-6 lg:px-16 lg:py-6 mb-2">
          <div className="flex flex-col md:flex-row items-center md:items-center">
            {/* Profile Picture */}
            <div className="lg:w-[153px] w-[88px] lg:h-[142px] h-[90px] bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
              <div className="lg:block hidden">
                <svg
                  width="153"
                  height="142"
                  viewBox="0 0 153 142"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse cx="76.5" cy="71" rx="76.5" ry="71" fill="#D9D9D9" />
                  <path
                    d="M76 70.5C69.5375 70.5 64.0052 68.3214 59.4031 63.9641C54.801 59.6068 52.5 54.3687 52.5 48.25C52.5 42.1313 54.801 36.8932 59.4031 32.5359C64.0052 28.1786 69.5375 26 76 26C82.4625 26 87.9948 28.1786 92.5969 32.5359C97.199 36.8932 99.5 42.1313 99.5 48.25C99.5 54.3687 97.199 59.6068 92.5969 63.9641C87.9948 68.3214 82.4625 70.5 76 70.5ZM29 115V99.425C29 96.2729 29.8578 93.3767 31.5733 90.7364C33.2888 88.096 35.5643 86.0787 38.4 84.6844C44.4708 81.8104 50.6396 79.6559 56.9062 78.2207C63.1729 76.7856 69.5375 76.0662 76 76.0625C82.4625 76.0588 88.8271 76.7782 95.0937 78.2207C101.36 79.6633 107.529 81.8178 113.6 84.6844C116.44 86.075 118.717 88.0923 120.433 90.7364C122.148 93.3804 123.004 96.2766 123 99.425V115H29Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div className="lg:hidden">
                <svg
                  width="88"
                  height="90"
                  viewBox="0 0 153 142"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse cx="76.5" cy="74" rx="76.5" ry="78" fill="#D9D9D9" />
                  <path
                    d="M76 70.5C69.5375 70.5 64.0052 68.3214 59.4031 63.9641C54.801 59.6068 52.5 54.3687 52.5 48.25C52.5 42.1313 54.801 36.8932 59.4031 32.5359C64.0052 28.1786 69.5375 26 76 26C82.4625 26 87.9948 28.1786 92.5969 32.5359C97.199 36.8932 99.5 42.1313 99.5 48.25C99.5 54.3687 97.199 59.6068 92.5969 63.9641C87.9948 68.3214 82.4625 70.5 76 70.5ZM29 115V99.425C29 96.2729 29.8578 93.3767 31.5733 90.7364C33.2888 88.096 35.5643 86.0787 38.4 84.6844C44.4708 81.8104 50.6396 79.6559 56.9062 78.2207C63.1729 76.7856 69.5375 76.0662 76 76.0625C82.4625 76.0588 88.8271 76.7782 95.0937 78.2207C101.36 79.6633 107.529 81.8178 113.6 84.6844C116.44 86.075 118.717 88.0923 120.433 90.7364C122.148 93.3804 123.004 96.2766 123 99.425V115H29Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>

            {/* Info Section */}
            <div className="flex-1 w-full space-y-4">
              {/* First Row */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:ml-[26px] lg:flex items-center justify-between">
                <div className="flex flex-col md:flex-row gap-2">
                  <span className="font-[400] text-[12px] lg:text-[17px]">
                    Engineering Discipline:
                  </span>
                  <span className="bg-gray-200 px-2 py-1 h-[35px] lg:w-[144px]"></span>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <span className="font-[400] text-[12px] lg:text-[18px]">
                    Membership Number:
                  </span>
                  <span className="bg-gray-200 px-2 py-1 h-[35px] lg:w-[144px]"></span>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <span className="font-[400] text-[12px] lg:text-[17px]">
                    Class of Membership:
                  </span>
                  <span className="bg-gray-200 px-2 py-1 h-[35px] lg:w-[144px]"></span>
                </div>
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:ml-[7px]">
                <div className="flex flex-col md:flex-row gap-2">
                  <span className="font-[400] text-[12px] lg:text-[17px]">
                    Wild Apricot ID:
                  </span>
                  <span className="bg-gray-200 px-2 py-1 h-[35px] lg:w-[144px]"></span>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <span className="font-[400] text-[12px] lg:text-[17px]">
                    ECSL Number:
                  </span>
                  <span className="bg-gray-200 px-2 py-1 h-[35px] lg:w-[144px]"></span>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <span className="font-[400] text-[12px] lg:text-[17px]">
                    Profile Enrollment Date:
                  </span>
                  <span className="bg-gray-200 px-2 py-1 h-[35px] lg:w-[144px]"></span>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <span className="font-[400] text-[12px] lg:text-[17px]">
                    Library Member No:
                  </span>
                  <span className="bg-gray-200 px-2 py-1 h-[35px] lg:w-[144px]"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#D9D9D9] lg:py-1 py-6 lg:px-16 px-6">
        <div className="max-w-[1360px] mx-auto   lg:bg-white lg:px-14 lg:py-6 mb-28">
          <div className="relative container mb-10">
            <div className="max-w-7xl mx-auto  px-4">
              <div className="relative flex items-center justify-between">
                <div className="flex overflow-x-auto no-scrollbar gap-10">
                  <button
                    onClick={() => handleStepClick("Personal Information")}
                    className={`relative py-4 px-6 mb-0 h-[64px] lg:text-[18px] text-[12px] font-[400] whitespace-nowrap transition-colors
 ${
   activeTab === "Personal Information"
     ? "bg-[#2D387D] text-white"
     : "text-gray-700 hover:text-gray-900"
 }`}
                  >
                    Personal Information
                    {activeTab === "Personal Information" && (
                      <div className="absolute -bottom-[1px] left-1/2 transform -translate-x-1/2">
                        <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-transparent  border-r-[12px] border-t-[12px] border-t-[#2A3990]"></div>
                      </div>
                    )}
                  </button>

                  <button
                    onClick={() => handleStepClick("Academic Qualifications")}
                    className={`relative py-4 px-6 h-[64px] lg:text-[18px] text-[12px] font-[400] whitespace-nowrap transition-colors
 ${
   activeTab === "Academic Qualifications"
     ? "bg-[#2D387D] text-white"
     : "text-gray-700 hover:text-gray-900"
 }`}
                  >
                    Academic Qualifications
                    {activeTab === "Academic Qualifications" && (
                      <div className="absolute -bottom-[1px] left-1/2 transform -translate-x-1/2">
                        <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-[#2A3990]"></div>
                      </div>
                    )}
                  </button>

                  <button
                    onClick={() => handleStepClick("Training & Experience")}
                    className={`relative py-4 px-6 h-[64px] lg:text-[18px] text-[12px] font-[400] whitespace-nowrap transition-colors
 ${
   activeTab === "Training & Experience"
     ? "bg-[#2D387D] text-white"
     : "text-gray-700 hover:text-gray-900"
 }`}
                  >
                    Training & Experience
                    {activeTab === "Training & Experience" && (
                      <div className="absolute -bottom-[1px] left-1/2 transform -translate-x-1/2">
                        <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-[#2A3990]"></div>
                      </div>
                    )}
                  </button>

                  <button
                    onClick={() => handleStepClick("Professional Memberships")}
                    className={`relative py-4 px-6 h-[64px] lg:text-[18px] text-[12px] font-[400] whitespace-nowrap transition-colors
 ${
   activeTab === "Professional Memberships"
     ? "bg-[#2D387D] text-white"
     : "text-gray-700 hover:text-gray-900"
 }`}
                  >
                    Professional Memberships
                    {activeTab === "Professional Memberships" && (
                      <div className="absolute -bottom-[1px] left-1/2 transform -translate-x-1/2">
                        <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-[#2A3990]"></div>
                      </div>
                    )}
                  </button>
                </div>
                <div className="hidden">
                  <button
                    onClick={() => navigate("/personal-edit")}
                    className="flex items-center gap-4 px-4 py-2 rounded-md bg-[#4287F5] text-[18px] font-[400] text-white hover:bg-blue-600 transition-colors ml-4"
                  >
                    <svg
                      width="26"
                      height="23"
                      viewBox="0 0 26 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.3706 2.10141H3.52681C2.85666 2.10141 2.21395 2.33435 1.74008 2.74898C1.26622 3.16362 1 3.72598 1 4.31236V19.789C1 20.3754 1.26622 20.9378 1.74008 21.3524C2.21395 21.7671 2.85666 22 3.52681 22H21.2145C21.8846 22 22.5273 21.7671 23.0012 21.3524C23.475 20.9378 23.7413 20.3754 23.7413 19.789V12.0507"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M20.4254 1.68686C20.928 1.24707 21.6097 1 22.3205 1C23.0313 1 23.713 1.24707 24.2156 1.68686C24.7182 2.12664 25.0006 2.72312 25.0006 3.34507C25.0006 3.96702 24.7182 4.5635 24.2156 5.00329L12.8285 14.9681C12.5285 15.2303 12.1579 15.4223 11.7508 15.5263L8.12108 16.4549C8.01236 16.4827 7.89713 16.4843 7.78742 16.4597C7.67772 16.4351 7.5776 16.3852 7.49752 16.3151C7.41745 16.2451 7.36037 16.1575 7.33226 16.0615C7.30416 15.9655 7.30606 15.8647 7.33777 15.7695L8.39903 12.5935C8.51845 12.2376 8.73829 11.9137 9.03831 11.6516L20.4254 1.68686Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Edit
                  </button>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-1 bg-[#2A3990]">
              {" "}
            </div>
          </div>
          <div className="hidden">
            <div className=" flex justify-end -mt-5 mb-10">
              <button
                onClick={() => navigate("/personal-edit")}
                className="flex items-center gap-4 px-4 py-2 rounded-md bg-[#4287F5] lg:text-[18px] text-[12px] font-[400] text-white hover:bg-blue-600 transition-colors ml-4"
              >
                <svg
                  width="26"
                  height="23"
                  viewBox="0 0 26 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.3706 2.10141H3.52681C2.85666 2.10141 2.21395 2.33435 1.74008 2.74898C1.26622 3.16362 1 3.72598 1 4.31236V19.789C1 20.3754 1.26622 20.9378 1.74008 21.3524C2.21395 21.7671 2.85666 22 3.52681 22H21.2145C21.8846 22 22.5273 21.7671 23.0012 21.3524C23.475 20.9378 23.7413 20.3754 23.7413 19.789V12.0507"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20.4254 1.68686C20.928 1.24707 21.6097 1 22.3205 1C23.0313 1 23.713 1.24707 24.2156 1.68686C24.7182 2.12664 25.0006 2.72312 25.0006 3.34507C25.0006 3.96702 24.7182 4.5635 24.2156 5.00329L12.8285 14.9681C12.5285 15.2303 12.1579 15.4223 11.7508 15.5263L8.12108 16.4549C8.01236 16.4827 7.89713 16.4843 7.78742 16.4597C7.67772 16.4351 7.5776 16.3852 7.49752 16.3151C7.41745 16.2451 7.36037 16.1575 7.33226 16.0615C7.30416 15.9655 7.30606 15.8647 7.33777 15.7695L8.39903 12.5935C8.51845 12.2376 8.73829 11.9137 9.03831 11.6516L20.4254 1.68686Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Edit
              </button>
            </div>
          </div>

          <div className="  ">
            <div className="mx-auto lg:p-6 lg:bg-[#EDEDED] ">
              <div className="grid md:grid-cols-3 lg:gap-x-16 gap-y-4 lg:p-10  lg:bg-white">
                {/* Left Column */}
                <div className="space-y-6 bg-white lg:p-0 p-6">
                  <div>
                    <h2 className="font-[600] lg:text-[18px] text-[16px] mb-1">
                      Name With Initials
                    </h2>
                    <p className="font-[400] lg:text-[16px] text-[16px]">
                      {/* Mr. N.S. Perera */}
                      {userData?.nameWithInitials}
                    </p>
                  </div>

                  <div>
                    <h2 className="font-[600] lg:text-[18px] text-[16px] mb-1">
                      Name Denoted by Initials : *
                    </h2>
                    <p className="font-[400] lg:text-[16px] text-[16px]">
                      {/* Nirmal Shan */}
                      {userData?.nameDenoted}
                    </p>
                  </div>

                  <div>
                    <h2 className="font-[600] lg:text-[18px] text-[16px] mb-1">
                      Gender
                    </h2>
                    <p className="font-[400] lg:text-[16px] text-[16px]">
                      {/* Male */}
                      {userData?.gender}
                    </p>
                  </div>

                  <div>
                    <h2 className="font-[600] lg:text-[18px] text-[16px] mb-1">
                      Date Of Birth
                    </h2>
                    <p className="font-[400] lg:text-[16px] text-[16px]">
                      {/* 11/11/2002 */}
                      {userData?.dob}
                    </p>
                  </div>

                  <div>
                    <h2 className="font-[600] lg:text-[18px] text-[16px] mb-1">
                      Email Address
                    </h2>
                    <a className="font-[400] lg:text-[16px] text-[16px]">
                      {/* nirmal@gmail.com */}
                      {userData?.emailAddress}
                    </a>
                  </div>

                  <div>
                    <h2 className="font-[600] lg:text-[18px] text-[16px] mb-1">
                      NIC
                    </h2>
                    <p className="font-[400] lg:text-[16px] text-[16px]">
                      {/* 2002123456 */}
                      {userData?.nicNo}
                    </p>
                  </div>

                  <div>
                    <h2 className="font-[600] lg:text-[18px] text-[16px] mb-1">
                      Passport Number
                    </h2>
                    <p className="font-[400] lg:text-[16px] text-[16px]">
                      {userData?.passport}
                    </p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6 lg:-mt-1 mt-3 bg-white lg:p-0 p-6">
                  <div>
                    <h2 className="font-[600] lg:text-[18px] text-[16px] mb-1">
                      Mobile Number
                    </h2>
                    <p className="font-[400] lg:text-[16px] text-[16px]">
                      +94 712556677
                      {/* {userData?.emailAddress} */}
                    </p>
                  </div>

                  <div>
                    <h2 className="font-[600] lg:text-[18px] text-[16px] mb-1">
                      Home Telephone Number
                    </h2>
                    <p className="font-[400] lg:text-[16px] text-[16px]">
                      +94 712556677
                      {/* {userData?.emailAddress} */}
                    </p>
                  </div>

                  <div>
                    <h2 className="font-[600] lg:text-[18px] text-[16px] mb-1">
                      Office Telephone Number
                    </h2>
                    <p className="font-[400] lg:text-[16px] text-[16px]">
                      +94 712556677
                      {/* {userData?.emailAddress} */}
                    </p>
                  </div>

                  <div>
                    <h2 className="font-[600] lg:text-[18px] text-[16px] mb-1">
                      Home Fax Number
                    </h2>
                    <p className="font-[400] lg:text-[16px] text-[16px]">
                      +94 712556677
                      {/* {userData?.emailAddress} */}
                    </p>
                  </div>

                  <div>
                    <h2 className="font-[600] lg:text-[18px] text-[16px] mb-1">
                      Office Fax Number
                    </h2>
                    <p className="font-[400] lg:text-[16px] text-[16px]">
                      +94 712556677
                      {/* {userData?.emailAddress} */}
                    </p>
                  </div>

                  <div>
                    <h2 className="font-[600] lg:text-[18px] text-[16px] mb-1">
                      Current Place of work
                    </h2>
                    <p className="font-[400] lg:text-[16px] text-[16px]">
                      LMC Makubura
                      {/* {userData?.emailAddress} */}
                    </p>
                  </div>

                  <div>
                    <h2 className="font-[600] lg:text-[18px] text-[16px] mb-1">
                      Current Designation
                    </h2>
                    <p className="font-[400] lg:text-[16px] text-[16px]">
                      Kandy
                      {/* {userData?.emailAddress} */}
                    </p>
                  </div>
                </div>

                {/* third column */}
                {/* Current Address */}
                <div className="space-y-4 lg:-mt-1 mt-4">
                  <h2 className="font-[700] lg:text-[18px] text-[16px]">
                    Current Address
                  </h2>

                  <div className="space-y-3 bg-white lg:p-0 p-6">
                    <div>
                      <label className="block font-[600] lg:text-[18px] text-[16px] ">
                        Address Line 1
                      </label>
                      <p className="mt-1 font-[400] lg:text-[16px] text-[16px] ">
                        11/2, Madawala Road, Katugasthota
                      </p>
                    </div>

                    <div>
                      <label className="block font-[600] lg:text-[18px] text-[16px] ">
                        Address Line 2
                      </label>
                      <p className="mt-1 font-[400] lg:text-[16px] text-[16px] ">
                        Wattegama, Kandy
                      </p>
                    </div>

                    <div>
                      <label className="block font-[600] lg:text-[18px] text-[16px] ">
                        City
                      </label>
                      <p className="mt-1 font-[400] lg:text-[16px] text-[16px]">
                        Kandy
                      </p>
                    </div>

                    <div>
                      <label className="block font-[600] lg:text-[18px] text-[16px]">
                        Province/State
                      </label>
                      <p className="mt-1 font-[400] lg:text-[16px] text-[16px]">
                        Central
                      </p>
                    </div>

                    <div>
                      <label className="block font-[600] lg:text-[18px] text-[16px]">
                        Country
                      </label>
                      <p className="mt-1 font-[400] lg:text-[16px] text-[16px]">
                        Sri Lanka
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mx-auto mt-6 lg:bg-white lg:p-10 space-y-8">
                {/* Official and Permanent Address Grid */}
                <div className="grid md:grid-cols-2 lg:gap-0 gap-4">
                  {/* Official Address */}
                  <div className="space-y-4">
                    <h2 className="font-[700] lg:text-[18px] lg:mt-0 mt-4 text-[16px]">
                      Official Address
                    </h2>

                    <div className="space-y-3 bg-white lg:p-0 p-6">
                      <div>
                        <label className="block font-[600] lg:text-[18px] text-[16px]">
                          Address Line 1
                        </label>
                        <p className="mt-1 font-[400] lg:text-[16px] text-[16px]">
                          11/2, Madawala Road, Katugasthota
                        </p>
                      </div>

                      <div>
                        <label className="block font-[600] lg:text-[18px] text-[16px]">
                          Address Line 2
                        </label>
                        <p className="mt-1 font-[400] lg:text-[16px] text-[16px]">
                          Wattegama, Kandy
                        </p>
                      </div>

                      <div>
                        <label className="block font-[600] lg:text-[18px] text-[16px]">
                          City
                        </label>
                        <p className="mt-1 font-[400] lg:text-[16px] text-[16px]">
                          Kandy
                        </p>
                      </div>

                      <div>
                        <label className="block font-[600] lg:text-[18px] text-[16px]">
                          Province/State
                        </label>
                        <p className="mt-1 font-[400] lg:text-[16px] text-[16px]">
                          Central
                        </p>
                      </div>

                      <div>
                        <label className="block font-[600] lg:text-[18px] text-[16px]">
                          Country
                        </label>
                        <p className="mt-1 font-[400] lg:text-[16px] text-[16px]">
                          Sri Lanka
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Permanent Address */}
                  <div className="space-y-4">
                    <h2 className="font-[700] lg:text-[18px] lg:mt-0 mt-4 text-[16px]">
                      Permanent Address
                    </h2>

                    <div className="space-y-3 bg-white lg:p-0 p-6">
                      <div>
                        <label className="block font-[600] lg:text-[18px] text-[16px]">
                          Address Line 1
                        </label>
                        <p className="mt-1 font-[400] lg:text-[16px] text-[16px]">
                          11/2, Madawala Road, Katugasthota
                        </p>
                      </div>

                      <div>
                        <label className="block font-[600] lg:text-[18px] text-[16px]">
                          Address Line 2
                        </label>
                        <p className="mt-1 font-[400] lg:text-[16px] text-[16px]">
                          Wattegama, Kandy
                        </p>
                      </div>

                      <div>
                        <label className="block font-[600] lg:text-[18px] text-[16px]">
                          City
                        </label>
                        <p className="mt-1 font-[400] lg:text-[16px] text-[16px]">
                          Kandy
                        </p>
                      </div>

                      <div>
                        <label className="block font-[600] lg:text-[18px] text-[16px]">
                          Province/State
                        </label>
                        <p className="mt-1 font-[400] lg:text-[16px] text-[16px]">
                          Central
                        </p>
                      </div>

                      <div>
                        <label className="block font-[600] lg:text-[18px] text-[16px]">
                          Country
                        </label>
                        <p className="mt-1 font-[400] lg:text-[16px] text-[16px]">
                          Sri Lanka
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-6 lg:p-4">
                <button
                  // key={userData.idNo}
                  // onClick={() => navigate("/acadamic")}
                  onClick={handleNext}
                  className="bg-[#2D387D] text-white lg:w-[227px] w-full  px-[17px] py-[8px] lg:text-[18px] text-[16px] font-[700]  rounded-[5px] "
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          <div className="lg:absolute lg:hidden bottom-0 mt-1  left-0 w-full h-[7px] bg-[#2A3990]">
            {" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default PersionalInformation;
