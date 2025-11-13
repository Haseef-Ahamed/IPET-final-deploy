 
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfessionalMembershipsEdit = () => {
  const [activeTab, setActiveTab] = useState("Professional Memberships");
  const navigate = useNavigate();

  const handleStepClick = (tabName) => {
    setActiveTab(tabName);
    switch (tabName) {
      case "Personal Information":
        navigate("/personal");
        break;
      case "Academic Qualifications":
        navigate("/acadamic");
        break;
      case "Training & Experience":
        navigate("/training");
        break;
      case "Professional Memberships":
        navigate("/memberships");
        break;
      default:
        break;
    }
  };

  const [memberships, setMemberships] = useState([
    {
      institution: "ABC institute",
      membershipNumber: "2001786788",
      joinedYear: "2024",
    },
  ]);

  const addMoreEntry = () => {
    setMemberships([
      ...memberships,
      {
        institution: "",
        membershipNumber: "",
        joinedYear: "",
      },
    ]);
  };
  return (
    <>
      <div className="bg-[#D9D9D9] hidden">
        <div className="bg-[#D9D9D9] lg:py-6 py-12 lg:px-0 px-6">
          <div className="w-full bg-white shadow-md  lg:px-16 px-6  py-6 mb-0">
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
                    <ellipse
                      cx="76.5"
                      cy="71"
                      rx="76.5"
                      ry="71"
                      fill="#D9D9D9"
                    />
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
                    <ellipse
                      cx="76.5"
                      cy="74"
                      rx="76.5"
                      ry="78"
                      fill="#D9D9D9"
                    />
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

          <div className="max-w-[1360px] mx-auto hidden lg:bg-white lg:px-12 py-6 mb-28">
            {/* Navigation Tabs */}

            <div className="relative mb-10">
              <div className="max-w-7xl mx-auto px-4">
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
                      {/* ... rest of the button content ... */}
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
                      {/* ... rest of the button content ... */}
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
                      {/* ... rest of the button content ... */}
                      {activeTab === "Training & Experience" && (
                        <div className="absolute -bottom-[1px] left-1/2 transform -translate-x-1/2">
                          <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-[#2A3990]"></div>
                        </div>
                      )}
                    </button>

                    <button
                      onClick={() =>
                        handleStepClick("Professional Memberships")
                      }
                      className={`relative py-4 px-6 h-[64px] lg:text-[18px] text-[12px] font-[400] whitespace-nowrap transition-colors
${
  activeTab === "Professional Memberships"
    ? "bg-[#2D387D] text-white"
    : "text-gray-700 hover:text-gray-900"
}`}
                    >
                      Professional Memberships
                      {/* ... rest of the button content ... */}
                      {activeTab === "Professional Memberships" && (
                        <div className="absolute -bottom-[1px] left-1/2 transform -translate-x-1/2">
                          <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-[#2A3990]"></div>
                        </div>
                      )}
                    </button>
                  </div>
                  <div className="lg:block hidden">
                    <button className="flex items-center gap-4 px-4 py-2 rounded-md bg-[#4287F5] text-[18px] font-[400] text-white hover:bg-blue-600 transition-colors ml-4">
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
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M20.4254 1.68686C20.928 1.24707 21.6097 1 22.3205 1C23.0313 1 23.713 1.24707 24.2156 1.68686C24.7182 2.12664 25.0006 2.72312 25.0006 3.34507C25.0006 3.96702 24.7182 4.5635 24.2156 5.00329L12.8285 14.9681C12.5285 15.2303 12.1579 15.4223 11.7508 15.5263L8.12108 16.4549C8.01236 16.4827 7.89713 16.4843 7.78742 16.4597C7.67772 16.4351 7.5776 16.3852 7.49752 16.3151C7.41745 16.2451 7.36037 16.1575 7.33226 16.0615C7.30416 15.9655 7.30606 15.8647 7.33777 15.7695L8.39903 12.5935C8.51845 12.2376 8.73829 11.9137 9.03831 11.6516L20.4254 1.68686Z"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
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
            <div className="lg:hidden flex justify-end -mt-5 mb-10">
              <button className="flex items-center gap-4 px-4 py-2 rounded-md bg-[#4287F5] lg:text-[18px] text-[12px] font-[400] text-white hover:bg-blue-600 transition-colors ml-4">
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
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M20.4254 1.68686C20.928 1.24707 21.6097 1 22.3205 1C23.0313 1 23.713 1.24707 24.2156 1.68686C24.7182 2.12664 25.0006 2.72312 25.0006 3.34507C25.0006 3.96702 24.7182 4.5635 24.2156 5.00329L12.8285 14.9681C12.5285 15.2303 12.1579 15.4223 11.7508 15.5263L8.12108 16.4549C8.01236 16.4827 7.89713 16.4843 7.78742 16.4597C7.67772 16.4351 7.5776 16.3852 7.49752 16.3151C7.41745 16.2451 7.36037 16.1575 7.33226 16.0615C7.30416 15.9655 7.30606 15.8647 7.33777 15.7695L8.39903 12.5935C8.51845 12.2376 8.73829 11.9137 9.03831 11.6516L20.4254 1.68686Z"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Edit
              </button>
            </div>

            {/* Form Content */}
            <div className=" lg:block hidden ">
              <div className="mx-auto lg:p-6 lg:bg-[#EDEDED] ">
                <div className="mx-auto ">
                  <form className="space-y-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <div>
                        <h2 className="lg:text-[18px] text-[16px] font-[700] mb-4">
                          Period Of Work : *
                        </h2>

                        <div className="space-y-4">
                          {memberships.map((membership, index) => (
                            <div
                              key={index}
                              className="grid grid-cols-1 md:grid-cols-3 gap-4"
                            >
                              <div>
                                <label className="block lg:text-[18px] text-[16px] font-[700] mb-1">
                                  Institution
                                </label>
                                <input
                                  type="text"
                                  value={membership.institution}
                                  className="w-full px-3 py-2 border border-black lg:text-[16px] text-[14px] font-[400] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>

                              <div>
                                <label className="block lg:text-[18px] text-[16px] font-[700] mb-1">
                                  Membership Number
                                </label>
                                <input
                                  type="text"
                                  value={membership.membershipNumber}
                                  className="w-full px-3 py-2 border border-black lg:text-[16px] text-[14px] font-[400] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>

                              <div>
                                <label className="block lg:text-[18px] text-[16px] font-[700] mb-1">
                                  Joined year
                                </label>
                                <input
                                  type="text"
                                  value={membership.joinedYear}
                                  className="w-full px-3 py-2 border border-black lg:text-[16px] text-[14px] font-[400] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={addMoreEntry}
                            className="mt-2 px-4 py-2 bg-[#356CC4] lg:text-[18px] text-[16px] font-[700] text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            + Add more
                          </button>
                        </div>
                      </div>

                      <div className="mt-6 ">
                        <h2 className="lg:text-[18px] text-[16px] font-[700] mb-3">
                          Upload Certification : *
                        </h2>
                        <div className="flex gap-3">
                          <div className="flex items-center bg-gray-200   px-6 py-2 rounded">
                            <span className="text-[12px] font-[700] text-gray-700">
                              AL.pdf
                            </span>
                            <span className="ml-2">
                              <svg
                                width="17"
                                height="22"
                                viewBox="0 0 17 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M8.5 0.0930176V6.59302C8.5 6.99084 8.65804 7.37237 8.93934 7.65368C9.22064 7.93498 9.60218 8.09302 10 8.09302H16.5V18.093C16.5 18.6235 16.2893 19.1322 15.9142 19.5072C15.5391 19.8823 15.0304 20.093 14.5 20.093H2.5C1.96957 20.093 1.46086 19.8823 1.08579 19.5072C0.710714 19.1322 0.5 18.6235 0.5 18.093V2.09302C0.5 1.56258 0.710714 1.05388 1.08579 0.678804C1.46086 0.303731 1.96957 0.0930176 2.5 0.0930176H8.5ZM7.511 9.94102C7.27162 11.4641 6.47513 12.844 5.276 13.813C4.389 14.529 5.2 15.934 6.264 15.525C7.70282 14.9709 9.29618 14.9709 10.735 15.525C11.799 15.935 12.61 14.53 11.723 13.813C10.5239 12.844 9.72738 11.4641 9.488 9.94102C9.311 8.81502 7.688 8.81402 7.511 9.94102ZM8.5 12.396L9.306 13.79H7.696L8.5 12.396ZM10.5 0.136018C10.8789 0.216373 11.2263 0.405009 11.5 0.679018L15.914 5.09302C16.188 5.36674 16.3766 5.71414 16.457 6.09302H10.5V0.136018Z"
                                  fill="black"
                                />
                              </svg>
                            </span>
                          </div>
                          <button className="bg-[#2A3990] text-[18px] font-[700]  text-white px-6 py-2 rounded hover:bg-[#1b2142] transition-colors">
                            Browse...
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end mt-5">
                      <button
                        type="submit"
                        className="bg-[#2D387D] text-white px-[17px] py-[8px] lg:w-[227px] w-full rounded-md hover:bg-blue-900"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* <div className="lg:absolute lg:hidden bottom-0 mt-1  left-0 w-full h-[7px] bg-[#2A3990]">
              {" "}
            </div> */}
          </div>
        </div>
        <div className=" hidden -mt-40 mb-24">
            <div className="mx-auto lg:p-6 lg:bg-[#EDEDED] ">
              <div className="mx-auto ">
                <form className="space-y-6">
                  <div className="bg-white  shadow-md p-6">
                    <div>
                      <h2 className="lg:text-[18px] text-[16px] font-[700] mb-4">
                        Period Of Work : *
                      </h2>

                      <div className="space-y-4">
                        {memberships.map((membership, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-1 md:grid-cols-3 gap-4"
                          >
                            <div>
                              <label className="block lg:text-[18px] text-[16px] font-[700] mb-1">
                                Institution
                              </label>
                              <input
                                type="text"
                                value={membership.institution}
                                className="w-full px-3 py-2 border border-black lg:text-[16px] text-[14px] font-[400] focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>

                            <div>
                              <label className="block lg:text-[18px] text-[16px] font-[700] mb-1">
                                Membership Number
                              </label>
                              <input
                                type="text"
                                value={membership.membershipNumber}
                                className="w-full px-3 py-2 border border-black lg:text-[16px] text-[14px] font-[400] focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>

                            <div>
                              <label className="block lg:text-[18px] text-[16px] font-[700] mb-1">
                                Joined year
                              </label>
                              <input
                                type="text"
                                value={membership.joinedYear}
                                className="w-full px-3 py-2 border border-black lg:text-[16px] text-[14px] font-[400] focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={addMoreEntry}
                          className="mt-2 px-4 py-2 bg-[#356CC4] lg:text-[18px] text-[16px] font-[700] text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          + Add more
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 lg:block hidden">
                      <h2 className="lg:text-[18px] text-[16px] font-[700] mb-3">
                        Upload Certification : *
                      </h2>
                      <div className="flex gap-3">
                        <div className="flex items-center bg-gray-200   px-6 py-2 rounded">
                          <span className="text-[12px] font-[700] text-gray-700">
                            AL.pdf
                          </span>
                          <span className="ml-2">
                            <svg
                              width="17"
                              height="22"
                              viewBox="0 0 17 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M8.5 0.0930176V6.59302C8.5 6.99084 8.65804 7.37237 8.93934 7.65368C9.22064 7.93498 9.60218 8.09302 10 8.09302H16.5V18.093C16.5 18.6235 16.2893 19.1322 15.9142 19.5072C15.5391 19.8823 15.0304 20.093 14.5 20.093H2.5C1.96957 20.093 1.46086 19.8823 1.08579 19.5072C0.710714 19.1322 0.5 18.6235 0.5 18.093V2.09302C0.5 1.56258 0.710714 1.05388 1.08579 0.678804C1.46086 0.303731 1.96957 0.0930176 2.5 0.0930176H8.5ZM7.511 9.94102C7.27162 11.4641 6.47513 12.844 5.276 13.813C4.389 14.529 5.2 15.934 6.264 15.525C7.70282 14.9709 9.29618 14.9709 10.735 15.525C11.799 15.935 12.61 14.53 11.723 13.813C10.5239 12.844 9.72738 11.4641 9.488 9.94102C9.311 8.81502 7.688 8.81402 7.511 9.94102ZM8.5 12.396L9.306 13.79H7.696L8.5 12.396ZM10.5 0.136018C10.8789 0.216373 11.2263 0.405009 11.5 0.679018L15.914 5.09302C16.188 5.36674 16.3766 5.71414 16.457 6.09302H10.5V0.136018Z"
                                fill="black"
                              />
                            </svg>
                          </span>
                        </div>
                        <button className="bg-[#2A3990] text-[18px] font-[700]  text-white px-6 py-2 rounded hover:bg-[#1b2142] transition-colors">
                          Browse...
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 lg:hidden">
                      <h2 className="lg:text-[18px] text-[16px] font-[700] mb-3">
                        Upload Certification : *
                      </h2>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center bg-gray-200 w-[132px]  px-9 py-2 rounded">
                          <span className="text-[12px] font-[700] text-gray-700">
                            AL.pdf
                          </span>
                          <span className="ml-2">
                            <svg
                              width="17"
                              height="22"
                              viewBox="0 0 17 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M8.5 0.0930176V6.59302C8.5 6.99084 8.65804 7.37237 8.93934 7.65368C9.22064 7.93498 9.60218 8.09302 10 8.09302H16.5V18.093C16.5 18.6235 16.2893 19.1322 15.9142 19.5072C15.5391 19.8823 15.0304 20.093 14.5 20.093H2.5C1.96957 20.093 1.46086 19.8823 1.08579 19.5072C0.710714 19.1322 0.5 18.6235 0.5 18.093V2.09302C0.5 1.56258 0.710714 1.05388 1.08579 0.678804C1.46086 0.303731 1.96957 0.0930176 2.5 0.0930176H8.5ZM7.511 9.94102C7.27162 11.4641 6.47513 12.844 5.276 13.813C4.389 14.529 5.2 15.934 6.264 15.525C7.70282 14.9709 9.29618 14.9709 10.735 15.525C11.799 15.935 12.61 14.53 11.723 13.813C10.5239 12.844 9.72738 11.4641 9.488 9.94102C9.311 8.81502 7.688 8.81402 7.511 9.94102ZM8.5 12.396L9.306 13.79H7.696L8.5 12.396ZM10.5 0.136018C10.8789 0.216373 11.2263 0.405009 11.5 0.679018L15.914 5.09302C16.188 5.36674 16.3766 5.71414 16.457 6.09302H10.5V0.136018Z"
                                fill="black"
                              />
                            </svg>
                          </span>
                        </div>
                        <button className="bg-[#2A3990] text-[18px] font-[700]  text-white px-6 py-2 rounded hover:bg-[#1b2142] transition-colors">
                          Browse...
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-5 px-6">
                    <button
                      type="submit"
                      className="bg-[#2D387D] text-white mb-10 px-[17px] py-[8px] lg:w-[227px] w-full rounded-md hover:bg-blue-900"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
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

      <div className="bg-[#D9D9D9] lg:py-3 py-3 lg:px-16 px-6">
      <div className="max-w-[1360px] mx-auto  lg:bg-white lg:px-16 py-6 mb-28">
            {/* Navigation Tabs */}

            <div className="relative mb-10">
              <div className="max-w-7xl mx-auto px-4">
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
                      {/* ... rest of the button content ... */}
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
                      {/* ... rest of the button content ... */}
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
                      {/* ... rest of the button content ... */}
                      {activeTab === "Training & Experience" && (
                        <div className="absolute -bottom-[1px] left-1/2 transform -translate-x-1/2">
                          <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-[#2A3990]"></div>
                        </div>
                      )}
                    </button>

                    <button
                      onClick={() =>
                        handleStepClick("Professional Memberships")
                      }
                      className={`relative py-4 px-6 h-[64px] lg:text-[18px] text-[12px] font-[400] whitespace-nowrap transition-colors
${
  activeTab === "Professional Memberships"
    ? "bg-[#2D387D] text-white"
    : "text-gray-700 hover:text-gray-900"
}`}
                    >
                      Professional Memberships
                      {/* ... rest of the button content ... */}
                      {activeTab === "Professional Memberships" && (
                        <div className="absolute -bottom-[1px] left-1/2 transform -translate-x-1/2">
                          <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-[#2A3990]"></div>
                        </div>
                      )}
                    </button>
                  </div>
                  <div className="lg:block hidden">
                    <button className="flex items-center gap-4 px-4 py-2 rounded-md bg-[#4287F5] text-[18px] font-[400] text-white hover:bg-blue-600 transition-colors ml-4">
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
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M20.4254 1.68686C20.928 1.24707 21.6097 1 22.3205 1C23.0313 1 23.713 1.24707 24.2156 1.68686C24.7182 2.12664 25.0006 2.72312 25.0006 3.34507C25.0006 3.96702 24.7182 4.5635 24.2156 5.00329L12.8285 14.9681C12.5285 15.2303 12.1579 15.4223 11.7508 15.5263L8.12108 16.4549C8.01236 16.4827 7.89713 16.4843 7.78742 16.4597C7.67772 16.4351 7.5776 16.3852 7.49752 16.3151C7.41745 16.2451 7.36037 16.1575 7.33226 16.0615C7.30416 15.9655 7.30606 15.8647 7.33777 15.7695L8.39903 12.5935C8.51845 12.2376 8.73829 11.9137 9.03831 11.6516L20.4254 1.68686Z"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
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
            <div className="lg:hidden flex justify-end -mt-5 mb-10">
              <button className="flex items-center gap-4 px-4 py-2 rounded-md bg-[#4287F5] lg:text-[18px] text-[12px] font-[400] text-white hover:bg-blue-600 transition-colors ml-4">
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
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M20.4254 1.68686C20.928 1.24707 21.6097 1 22.3205 1C23.0313 1 23.713 1.24707 24.2156 1.68686C24.7182 2.12664 25.0006 2.72312 25.0006 3.34507C25.0006 3.96702 24.7182 4.5635 24.2156 5.00329L12.8285 14.9681C12.5285 15.2303 12.1579 15.4223 11.7508 15.5263L8.12108 16.4549C8.01236 16.4827 7.89713 16.4843 7.78742 16.4597C7.67772 16.4351 7.5776 16.3852 7.49752 16.3151C7.41745 16.2451 7.36037 16.1575 7.33226 16.0615C7.30416 15.9655 7.30606 15.8647 7.33777 15.7695L8.39903 12.5935C8.51845 12.2376 8.73829 11.9137 9.03831 11.6516L20.4254 1.68686Z"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Edit
              </button>
            </div>

            {/* Form Content */}
            <div className=" lg:block hidden ">
              <div className="mx-auto lg:p-6 lg:bg-[#EDEDED] ">
                <div className="mx-auto ">
                  <form className="space-y-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <div>
                        <h2 className="lg:text-[18px] text-[16px] font-[700] mb-4">
                          Period Of Work : *
                        </h2>

                        <div className="space-y-4">
                          {memberships.map((membership, index) => (
                            <div
                              key={index}
                              className="grid grid-cols-1 md:grid-cols-3 gap-4"
                            >
                              <div>
                                <label className="block lg:text-[18px] text-[16px] font-[700] mb-1">
                                  Institution
                                </label>
                                <input
                                  type="text"
                                  value={membership.institution}
                                  className="w-full px-3 py-2 border border-black lg:text-[16px] text-[14px] font-[400] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>

                              <div>
                                <label className="block lg:text-[18px] text-[16px] font-[700] mb-1">
                                  Membership Number
                                </label>
                                <input
                                  type="text"
                                  value={membership.membershipNumber}
                                  className="w-full px-3 py-2 border border-black lg:text-[16px] text-[14px] font-[400] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>

                              <div>
                                <label className="block lg:text-[18px] text-[16px] font-[700] mb-1">
                                  Joined year
                                </label>
                                <input
                                  type="text"
                                  value={membership.joinedYear}
                                  className="w-full px-3 py-2 border border-black lg:text-[16px] text-[14px] font-[400] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={addMoreEntry}
                            className="mt-2 px-4 py-2 bg-[#356CC4] lg:text-[18px] text-[16px] font-[700] text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            + Add more
                          </button>
                        </div>
                      </div>

                      <div className="mt-6 ">
                        <h2 className="lg:text-[18px] text-[16px] font-[700] mb-3">
                          Upload Certification : *
                        </h2>
                        <div className="flex gap-3">
                          <div className="flex items-center bg-gray-200   px-6 py-2 rounded">
                            <span className="text-[12px] font-[700] text-gray-700">
                              AL.pdf
                            </span>
                            <span className="ml-2">
                              <svg
                                width="17"
                                height="22"
                                viewBox="0 0 17 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M8.5 0.0930176V6.59302C8.5 6.99084 8.65804 7.37237 8.93934 7.65368C9.22064 7.93498 9.60218 8.09302 10 8.09302H16.5V18.093C16.5 18.6235 16.2893 19.1322 15.9142 19.5072C15.5391 19.8823 15.0304 20.093 14.5 20.093H2.5C1.96957 20.093 1.46086 19.8823 1.08579 19.5072C0.710714 19.1322 0.5 18.6235 0.5 18.093V2.09302C0.5 1.56258 0.710714 1.05388 1.08579 0.678804C1.46086 0.303731 1.96957 0.0930176 2.5 0.0930176H8.5ZM7.511 9.94102C7.27162 11.4641 6.47513 12.844 5.276 13.813C4.389 14.529 5.2 15.934 6.264 15.525C7.70282 14.9709 9.29618 14.9709 10.735 15.525C11.799 15.935 12.61 14.53 11.723 13.813C10.5239 12.844 9.72738 11.4641 9.488 9.94102C9.311 8.81502 7.688 8.81402 7.511 9.94102ZM8.5 12.396L9.306 13.79H7.696L8.5 12.396ZM10.5 0.136018C10.8789 0.216373 11.2263 0.405009 11.5 0.679018L15.914 5.09302C16.188 5.36674 16.3766 5.71414 16.457 6.09302H10.5V0.136018Z"
                                  fill="black"
                                />
                              </svg>
                            </span>
                          </div>
                          <button className="bg-[#2A3990] text-[18px] font-[700]  text-white px-6 py-2 rounded hover:bg-[#1b2142] transition-colors">
                            Browse...
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end mt-5">
                      <button
                        type="submit"
                        className="bg-[#2D387D] text-white px-[17px] py-[8px] lg:w-[227px] w-full rounded-md hover:bg-blue-900"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* <div className="lg:absolute lg:hidden bottom-0 mt-1  left-0 w-full h-[7px] bg-[#2A3990]">
              {" "}
            </div> */}
          </div>
      </div>

      <div className="bg-[#D9D9D9]">
      <div className=" lg:hidden -mt-40 mb-24">
            <div className="mx-auto lg:p-6 lg:bg-[#EDEDED] ">
              <div className="mx-auto ">
                <form className="space-y-6">
                  <div className="bg-white  shadow-md p-6">
                    <div>
                      <h2 className="lg:text-[18px] text-[16px] font-[700] mb-4">
                        Period Of Work : *
                      </h2>

                      <div className="space-y-4">
                        {memberships.map((membership, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-1 md:grid-cols-3 gap-4"
                          >
                            <div>
                              <label className="block lg:text-[18px] text-[16px] font-[700] mb-1">
                                Institution
                              </label>
                              <input
                                type="text"
                                value={membership.institution}
                                className="w-full px-3 py-2 border border-black lg:text-[16px] text-[14px] font-[400] focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>

                            <div>
                              <label className="block lg:text-[18px] text-[16px] font-[700] mb-1">
                                Membership Number
                              </label>
                              <input
                                type="text"
                                value={membership.membershipNumber}
                                className="w-full px-3 py-2 border border-black lg:text-[16px] text-[14px] font-[400] focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>

                            <div>
                              <label className="block lg:text-[18px] text-[16px] font-[700] mb-1">
                                Joined year
                              </label>
                              <input
                                type="text"
                                value={membership.joinedYear}
                                className="w-full px-3 py-2 border border-black lg:text-[16px] text-[14px] font-[400] focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={addMoreEntry}
                          className="mt-2 px-4 py-2 bg-[#356CC4] lg:text-[18px] text-[16px] font-[700] text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          + Add more
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 lg:block hidden">
                      <h2 className="lg:text-[18px] text-[16px] font-[700] mb-3">
                        Upload Certification : *
                      </h2>
                      <div className="flex gap-3">
                        <div className="flex items-center bg-gray-200   px-6 py-2 rounded">
                          <span className="text-[12px] font-[700] text-gray-700">
                            AL.pdf
                          </span>
                          <span className="ml-2">
                            <svg
                              width="17"
                              height="22"
                              viewBox="0 0 17 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M8.5 0.0930176V6.59302C8.5 6.99084 8.65804 7.37237 8.93934 7.65368C9.22064 7.93498 9.60218 8.09302 10 8.09302H16.5V18.093C16.5 18.6235 16.2893 19.1322 15.9142 19.5072C15.5391 19.8823 15.0304 20.093 14.5 20.093H2.5C1.96957 20.093 1.46086 19.8823 1.08579 19.5072C0.710714 19.1322 0.5 18.6235 0.5 18.093V2.09302C0.5 1.56258 0.710714 1.05388 1.08579 0.678804C1.46086 0.303731 1.96957 0.0930176 2.5 0.0930176H8.5ZM7.511 9.94102C7.27162 11.4641 6.47513 12.844 5.276 13.813C4.389 14.529 5.2 15.934 6.264 15.525C7.70282 14.9709 9.29618 14.9709 10.735 15.525C11.799 15.935 12.61 14.53 11.723 13.813C10.5239 12.844 9.72738 11.4641 9.488 9.94102C9.311 8.81502 7.688 8.81402 7.511 9.94102ZM8.5 12.396L9.306 13.79H7.696L8.5 12.396ZM10.5 0.136018C10.8789 0.216373 11.2263 0.405009 11.5 0.679018L15.914 5.09302C16.188 5.36674 16.3766 5.71414 16.457 6.09302H10.5V0.136018Z"
                                fill="black"
                              />
                            </svg>
                          </span>
                        </div>
                        <button className="bg-[#2A3990] text-[18px] font-[700]  text-white px-6 py-2 rounded hover:bg-[#1b2142] transition-colors">
                          Browse...
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 lg:hidden">
                      <h2 className="lg:text-[18px] text-[16px] font-[700] mb-3">
                        Upload Certification : *
                      </h2>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center bg-gray-200 w-[132px]  px-9 py-2 rounded">
                          <span className="text-[12px] font-[700] text-gray-700">
                            AL.pdf
                          </span>
                          <span className="ml-2">
                            <svg
                              width="17"
                              height="22"
                              viewBox="0 0 17 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M8.5 0.0930176V6.59302C8.5 6.99084 8.65804 7.37237 8.93934 7.65368C9.22064 7.93498 9.60218 8.09302 10 8.09302H16.5V18.093C16.5 18.6235 16.2893 19.1322 15.9142 19.5072C15.5391 19.8823 15.0304 20.093 14.5 20.093H2.5C1.96957 20.093 1.46086 19.8823 1.08579 19.5072C0.710714 19.1322 0.5 18.6235 0.5 18.093V2.09302C0.5 1.56258 0.710714 1.05388 1.08579 0.678804C1.46086 0.303731 1.96957 0.0930176 2.5 0.0930176H8.5ZM7.511 9.94102C7.27162 11.4641 6.47513 12.844 5.276 13.813C4.389 14.529 5.2 15.934 6.264 15.525C7.70282 14.9709 9.29618 14.9709 10.735 15.525C11.799 15.935 12.61 14.53 11.723 13.813C10.5239 12.844 9.72738 11.4641 9.488 9.94102C9.311 8.81502 7.688 8.81402 7.511 9.94102ZM8.5 12.396L9.306 13.79H7.696L8.5 12.396ZM10.5 0.136018C10.8789 0.216373 11.2263 0.405009 11.5 0.679018L15.914 5.09302C16.188 5.36674 16.3766 5.71414 16.457 6.09302H10.5V0.136018Z"
                                fill="black"
                              />
                            </svg>
                          </span>
                        </div>
                        <button className="bg-[#2A3990] text-[18px] font-[700]  text-white px-6 py-2 rounded hover:bg-[#1b2142] transition-colors">
                          Browse...
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-5 px-6">
                    <button
                      type="submit"
                      className="bg-[#2D387D] text-white mb-10 px-[17px] py-[8px] lg:w-[227px] w-full rounded-md hover:bg-blue-900"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default ProfessionalMembershipsEdit;
