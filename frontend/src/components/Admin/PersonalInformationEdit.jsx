/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PersonalInformationEdit = () => {
  const [activeTab, setActiveTab] = useState("Personal Information");
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

  const [form_Data, setForm_Data] = useState({
    nameWithInitials: "Mr. N.S. Perera",
    nameByInitials: "Nirmal Shan",
    gender: "Male",
    dateOfBirth: "11/11/2002",
    email: "nirmal@gmail.com",
    nic: "2002123456",
    passportNumber: "2002123456",
    mobileNumber: "+94 712556677",
    homeTelephone: "+94 712556677",
    officeTelephone: "+94 712556677",
    homeFax: "+94 712556677",
    officeFax: "+94 712556677",
    currentWorkplace: "LMC Makubura",
    currentDesignation: "Kandy",
    currentAddress: {
      line1: "11/2, Madawala Road, Katugasthota",
      line2: "Wattegama, Kandy",
      city: "Kandy",
      province: "Central",
      country: "Sri Lanka",
    },
    officialAddress: {
      line1: "11/2, Madawala Road, Katugasthota",
      line2: "Wattegama, Kandy",
      city: "Kandy",
      province: "Central",
      country: "Sri Lanka",
    },
    permanentAddress: {
      line1: "11/2, Madawala Road, Katugasthota",
      line2: "Wattegama, Kandy",
      city: "Kandy",
      province: "Central",
      country: "Sri Lanka",
    },
  });

  const handleInputChange = (e, section, field) => {
    if (section) {
      setForm_Data((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: e.target.value,
        },
      }));
    } else {
      setForm_Data((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/personal");
  };

  const [formData, setFormData] = useState({
    nameWithInitials: "Mr. N.S. Perera",
    nameDenotedByInitials: "Nirmal Shah",
    gender: "Male",
    dateOfBirth: "1/11/2002",
    email: "nirmal@gmail.com",
    nic: "2002123456",
    passportNumber: "2002123456",
    mobileNumber: "712556677",
    homeTelephone: "712556677",
    officeTelephone: "712556677",
    homeFax: "712556677",
    officeFax: "712556677",
    currentWorkPlace: "LMC Matubura",
    currentDesignation: "Kandy",
  });

  const PhoneInput = ({ label, value }) => (
    <div className="mb-4">
      <label className="block lg:text-[18px] text-[16px] font-[600] mb-1">
        {label}
      </label>
      <div className="flex">
        <div className="relative lg:text-[16px] text-[14px] font-[300]">
          <select className="w-full  bg-white border border-r-0   border-black  px-3 py-2 ">
            <option>🇱🇰 +94</option>
          </select>
        </div>
        <input
          type="text"
          value={value}
          className="flex-1 px-4 py-2 border border-l-0 lg:text-[16px] text-[12px] font-[300]  border-black  "
        />
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-[#D9D9D9] hidden">
        <div className="bg-[#D9D9D9] lg:py-6 py-12 lg:px-0 px-6">
          <div className="w-full bg-white shadow-md  lg:px-16 px-6 lg:py-6 py-12 mb-0">
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

          {/* <div className="max-w-[1360px] mx-auto  lg:bg-white lg:px-16 py-6 mb-28">
        

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
            <div className="lg:hidden flex justify-end -mt-5 lg:mb-10 -mb-28">
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

           
            <div className="  lg:block hidden">
              <div className="mx-auto lg:p-6  lg:bg-[#D9D9D9] ">
                <div className=" mx-auto ">
                  <form className="" onSubmit={handleSubmit}>
                    <div className="lg:bg-white bg-[#D9D9D9] lg:p-10 p-10 rounded-md space-y-6">
                      <div className="lg:block hidden">
                     
                        <div className="grid md:grid-cols-2 lg:gap-16 gap-6 ">
                          <div>
                            <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                              Name With Initials
                            </label>
                            <input
                              value={form_Data.nameWithInitials}
                              onChange={(e) =>
                                handleInputChange(e, null, "nameWithInitials")
                              }
                              type="text"
                              className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300]  border border-black px-3 py-2"
                              defaultValue="Mr. N.S. Perera"
                            />
                          </div>
                          <div>
                            <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                              Mobile Number
                            </label>
                            <div className="mt-1 flex lg:text-[16px] text-[14px] font-[300] ">
                              <select className=" border border-r-0  border-black px-3 py-2">
                                <option>🇱🇰 +94</option>
                              </select>
                              <input
                                value={form_Data.mobileNumber}
                                onChange={(e) =>
                                  handleInputChange(e, null, "mobileNumber")
                                }
                                type="tel"
                                className="block w-full border-l-0  border border-black px-3 py-2"
                                defaultValue="712556677"
                              />
                            </div>
                          </div>
                        </div>

                
                        <div className="grid md:grid-cols-2 lg:gap-16 gap-6">
                          <div>
                            <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                              Name Denoted by Initials
                            </label>
                            <input
                              value={form_Data.nameByInitials}
                              onChange={(e) =>
                                handleInputChange(e, null, "nameByInitials")
                              }
                              type="text"
                              className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                              defaultValue="Nirmal Shan"
                            />
                          </div>
                          <div>
                            <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                              Home Telephone Number
                            </label>
                            <div className="mt-1 flex lg:text-[16px] text-[14px] font-[300]">
                              <select className=" border border-r-0 border-black px-3 py-2">
                                <option>🇱🇰 +94</option>
                              </select>
                              <input
                                 value={form_Data.homeTelephone}
                                 onChange={(e) =>
                                   handleInputChange(e, null, "homeTelephone")
                                 }
                                type="tel"
                                className="block w-full border-l-0 border border-black px-3 py-2"
                                defaultValue="712556677"
                              />
                            </div>
                          </div>
                        </div>

               
                        <div className="grid md:grid-cols-2 lg:gap-16 gap-6">
                          <div>
                            <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                              Gender
                            </label>
                            <input
                               value={form_Data.gender}
                               onChange={(e) =>
                                 handleInputChange(e, null, "gender")
                               }
                              type="text"
                              className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                              defaultValue="Male"
                            />
                          </div>
                          <div>
                            <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                              Office Telephone Number
                            </label>
                            <div className="mt-1 flex lg:text-[16px] text-[14px] font-[300]">
                              <select className="border border-r-0 border-black px-3 py-2">
                                <option>🇱🇰 +94</option>
                              </select>
                              <input
                                 value={form_Data.officeTelephone}
                                 onChange={(e) =>
                                   handleInputChange(e, null, "officeTelephone")
                                 }
                                type="tel"
                                className="block w-full  border border-l-0  border-black px-3 py-2"
                                defaultValue="712556677"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:gap-16 gap-6">
                          <div>
                            <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                              Date of Birth
                            </label>
                            <input
                               value={form_Data.dateOfBirth}
                               onChange={(e) =>
                                 handleInputChange(e, null, "dateOfBirth")
                               }
                              type="date"
                              className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                              defaultValue="2002-11-11"
                            />
                          </div>
                          <div>
                            <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                              Home Fax Number
                            </label>
                            <div className="mt-1 flex lg:text-[16px] text-[14px] font-[300]">
                              <select className="border border-r-0 border-black px-3 py-2">
                                <option>🇱🇰 +94</option>
                              </select>
                              <input
                                 value={form_Data.homeFax}
                                 onChange={(e) =>
                                   handleInputChange(e, null, "homeFax")
                                 }
                                type="tel"
                                className="block w-full border-l-0 border border-black px-3 py-2"
                                defaultValue="712556677"
                              />
                            </div>
                          </div>
                        </div>

                      
                        <div className="grid md:grid-cols-2 lg:gap-16 gap-6">
                          <div>
                            <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                              Email Address
                            </label>
                            <input
                               value={form_Data.email}
                               onChange={(e) =>
                                 handleInputChange(e, null, "email")
                               }
                              type="email"
                              className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                              defaultValue="nirmal@gmail.com"
                            />
                          </div>
                          <div>
                            <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                              Office Fax Number
                            </label>
                            <div className="mt-1 flex lg:text-[16px] text-[14px] font-[300]">
                              <select className=" border border-r-0 border-black px-3 py-2">
                                <option>🇱🇰 +94</option>
                              </select>
                              <input
                                 value={form_Data.officeFax}
                                 onChange={(e) =>
                                   handleInputChange(e, null, "officeFax")
                                 }
                                type="tel"
                                className="block w-full border-l-0 border border-black px-3 py-2"
                                defaultValue="712556677"
                              />
                            </div>
                          </div>
                        </div>

                      
                        <div className="grid md:grid-cols-2 lg:gap-16 gap-6">
                          <div>
                            <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                              NIC
                            </label>
                            <input
                               value={form_Data.nic}
                               onChange={(e) =>
                                 handleInputChange(e, null, "nic")
                               }
                              type="text"
                              className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                              defaultValue="200212345"
                            />
                          </div>
                          <div>
                            <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                              Current Place of Work
                            </label>
                            <input
                               value={form_Data.currentWorkplace}
                               onChange={(e) =>
                                 handleInputChange(e, null, "currentWorkplace")
                               }
                              type="text"
                              className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                              defaultValue="LMC Matukubura"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:gap-16 gap-6">
                          <div>
                            <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                              Passport Number
                            </label>
                            <input
                               value={form_Data.passportNumber}
                               onChange={(e) =>
                                 handleInputChange(e, null, "passportNumber")
                               }
                              type="text"
                              className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                              defaultValue="200212345"
                            />
                          </div>
                          <div>
                            <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                              Current Designation
                            </label>
                            <input
                               value={form_Data.currentDesignation}
                               onChange={(e) =>
                                 handleInputChange(e, null, "currentDesignation")
                               }
                              type="text"
                              className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                              defaultValue="Kandy"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="lg:hidden">
                        <div className="mb-4">
                          <label className="block lg:text-[18px] text-[16px] font-[600] mb-1">
                            Name With Initials
                          </label>
                          <input
                            type="text"
                            value={formData.nameWithInitials}
                            className="w-full px-3 py-2 border lg:text-[16px] text-[14px] font-[300] border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="mb-4">
                          <label className="block lg:text-[18px] text-[16px] font-[600] mb-1">
                            Name Denoted by Initials : *
                          </label>
                          <input
                            type="text"
                            value={formData.nameDenotedByInitials}
                            className="w-full px-3 py-2 border lg:text-[16px] text-[14px] font-[300] border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="mb-4">
                          <label className="block lg:text-[18px] text-[16px] font-[600] mb-1">
                            Gender
                          </label>
                          <input
                            type="text"
                            value={formData.gender}
                            className="w-full px-3 py-2 border lg:text-[16px] text-[14px] font-[300] border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="mb-4">
                          <label className="block lg:text-[18px] text-[16px] font-[600] mb-1">
                            Date Of Birth
                          </label>
                          <input
                            type="date"
                            value={formData.dateOfBirth}
                            className="w-full px-3 py-2 border lg:text-[16px] text-[14px] font-[300] border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="mb-4">
                          <label className="block lg:text-[18px] text-[16px] font-[600] mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            className="w-full px-3 py-2 border lg:text-[16px] text-[14px] font-[300] border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="mb-4">
                          <label className="block lg:text-[18px] text-[16px] font-[600] mb-1">
                            NIC
                          </label>
                          <input
                            type="text"
                            value={formData.nic}
                            className="w-full px-3 py-2 border lg:text-[16px] text-[14px] font-[300] border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="mb-4">
                          <label className="block lg:text-[18px] text-[16px] font-[600] mb-1">
                            Passport Number
                          </label>
                          <input
                            type="text"
                            value={formData.passportNumber}
                            className="w-full px-3 py-2 border lg:text-[16px] text-[14px] font-[300] border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <PhoneInput
                          label="Mobile Number"
                          value={formData.mobileNumber}
                        />
                        <PhoneInput
                          label="Home Telephone Number"
                          value={formData.homeTelephone}
                        />
                        <PhoneInput
                          label="Office Telephone Number"
                          value={formData.officeTelephone}
                        />
                        <PhoneInput
                          label="Home Fax Number"
                          value={formData.homeFax}
                        />
                        <PhoneInput
                          label="Office Fax Number"
                          value={formData.officeFax}
                        />

                        <div className="mb-4">
                          <label className="block lg:text-[18px] text-[16px] font-[600] mb-1">
                            Current Place of work
                          </label>
                          <input
                            type="text"
                            value={formData.currentWorkPlace}
                            className="w-full px-3 py-2 border lg:text-[16px] text-[14px] font-[300] border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="mb-4">
                          <label className="block lg:text-[18px] text-[16px] font-[600] mb-1">
                            Current Designation
                          </label>
                          <input
                            type="text"
                            value={formData.currentDesignation}
                            className="w-full px-3 py-2  border lg:text-[16px] text-[14px] font-[300] border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                     
                      <div className="grid md:grid-cols-2 lg:gap-16 gap-6">
                       
                        <div className="space-y-4">
                          <h3 className="lg:text-[20px] text-[18px] font-[700]">
                            Current Address
                          </h3>
                          <div>
                            <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                              Address Line 1
                            </label>
                            <input
                               value={form_Data.currentAddress.line1}
                               onChange={(e) =>
                                 handleInputChange(e, null, "currentAddress.line1")
                               }
                              type="text"
                              className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                              defaultValue="11/2, Madawala Road, Katugasthota"
                            />
                          </div>
                          <div>
                            <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                              Address Line 2
                            </label>
                            <input
                               value={form_Data.currentAddress.line2}
                               onChange={(e) =>
                                 handleInputChange(e, null, "currentAddress.line2")
                               }
                              type="text"
                              className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                              defaultValue="Wattegama, Kandy"
                            />
                          </div>
                          <div>
                            <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                              City
                            </label>
                            <input
                               value={form_Data.currentAddress.city}
                               onChange={(e) =>
                                 handleInputChange(e, null, "currentAddress.city")
                               }
                              type="text"
                              className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                              defaultValue="Kandy"
                            />
                          </div>
                          <div>
                            <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                              Province/State
                            </label>
                            <input
                               value={form_Data.currentAddress.province}
                               onChange={(e) =>
                                 handleInputChange(e, null, "currentAddress.province")
                               }
                              type="text"
                              className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                              defaultValue="Central"
                            />
                          </div>
                          <div>
                            <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                              Country
                            </label>
                            <input
                               value={form_Data.currentAddress.country}
                               onChange={(e) =>
                                 handleInputChange(e, null, "currentAddress.country")
                               }
                              type="text"
                              className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                              defaultValue="Sri Lanka"
                            />
                          </div>
                        </div>

                     
                        <div className="space-y-4">
                          <h3 className="lg:text-[20px] text-[18px] font-[700]">
                            Permanent Address
                          </h3>
                          <div>
                            <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                              Address Line 1
                            </label>
                            <input
                               value={form_Data.permanentAddress.line1}
                               onChange={(e) =>
                                 handleInputChange(e, null, "permanentAddress.line1")
                               }
                              type="text"
                              className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                              defaultValue="11/2, Madawala Road, Katugasthota"
                            />
                          </div>
                          <div>
                            <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                              Address Line 2
                            </label>
                            <input
                               value={form_Data.permanentAddress.line2}
                               onChange={(e) =>
                                 handleInputChange(e, null, "permanentAddress.line2")
                               }
                              type="text"
                              className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                              defaultValue="Wattegama, Kandy"
                            />
                          </div>
                          <div>
                            <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                              City
                            </label>
                            <input
                               value={form_Data.permanentAddress.city}
                               onChange={(e) =>
                                 handleInputChange(e, null, "permanentAddress.city")
                               }
                              type="text"
                              className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                              defaultValue="Kandy"
                            />
                          </div>
                          <div>
                            <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                              Province/State
                            </label>
                            <input
                               value={form_Data.permanentAddress.province}
                               onChange={(e) =>
                                 handleInputChange(e, null, "permanentAddress.province")
                               }
                              type="text"
                              className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                              defaultValue="Central"
                            />
                          </div>
                          <div>
                            <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                              Country
                            </label>
                            <input
                               value={form_Data.permanentAddress.country}
                               onChange={(e) =>
                                 handleInputChange(e, null, "permanentAddress.country")
                               }
                              type="text"
                              className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                              defaultValue="Sri Lanka"
                            />
                          </div>
                        </div>
                      </div>

                     
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="lg:text-[20px] text-[18px] font-[700]">
                            Official Address
                          </h3>
                          <div>
                            <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                              Address Line 1
                            </label>
                            <input
                               value={form_Data.officialAddress.line1}
                               onChange={(e) =>
                                 handleInputChange(e, null, "officialAddress.line1")
                               }
                              type="text"
                              className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                              defaultValue="11/2, Madawala Road, Katugasthota"
                            />
                          </div>
                          <div>
                            <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                              Address Line 2
                            </label>
                            <input
                               value={form_Data.officialAddress.line2}
                               onChange={(e) =>
                                 handleInputChange(e, null, "officialAddress.line2")
                               }
                              type="text"
                              className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                              defaultValue="Wattegama, Kandy"
                            />
                          </div>
                          <div>
                            <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                              City
                            </label>
                            <input
                               value={form_Data.officialAddress.city}
                               onChange={(e) =>
                                 handleInputChange(e, null, "officialAddress.city")
                               }
                              type="text"
                              className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                              defaultValue="Kandy"
                            />
                          </div>
                          <div>
                            <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                              Province/State
                            </label>
                            <input
                               value={form_Data.officialAddress.province}
                               onChange={(e) =>
                                 handleInputChange(e, null, "officialAddress.province")
                               }
                              type="text"
                              className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                              defaultValue="Central"
                            />
                          </div>
                          <div>
                            <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                              Country
                            </label>
                            <input
                               value={form_Data.officialAddress.country}
                               onChange={(e) =>
                                 handleInputChange(e, null, "officialAddress.country")
                               }
                              type="text"
                              className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                              defaultValue="Sri Lanka"
                            />
                          </div>
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
          </div> */}
        </div>
        <div className="hidden mb-24  ">
          <div className="mx-auto  ">
            <div className=" mx-auto   ">
              <form className="">
                <div className="   rounded-md space-y-6">
                  <div className="lg:hidden  ">
                    <div className=" bg-white mb-10 px-6 py-3 ">
                      <div className="mb-4 p">
                        <label className="block lg:text-[18px] text-[16px] font-[600] mb-1">
                          Name With Initials
                        </label>
                        <input
                          type="text"
                          value={formData.nameWithInitials}
                          className="w-full px-3 py-2 border lg:text-[16px] text-[14px] font-[300] border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block lg:text-[18px] text-[16px] font-[600] mb-1">
                          Name Denoted by Initials : *
                        </label>
                        <input
                          type="text"
                          value={formData.nameDenotedByInitials}
                          className="w-full px-3 py-2 border lg:text-[16px] text-[14px] font-[300] border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block lg:text-[18px] text-[16px] font-[600] mb-1">
                          Gender
                        </label>
                        <input
                          type="text"
                          value={formData.gender}
                          className="w-full px-3 py-2 border lg:text-[16px] text-[14px] font-[300] border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block lg:text-[18px] text-[16px] font-[600] mb-1">
                          Date Of Birth
                        </label>
                        <input
                          type="date"
                          value={formData.dateOfBirth}
                          className="w-full px-3 py-2 border lg:text-[16px] text-[14px] font-[300] border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block lg:text-[18px] text-[16px] font-[600] mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          className="w-full px-3 py-2 border lg:text-[16px] text-[14px] font-[300] border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block lg:text-[18px] text-[16px] font-[600] mb-1">
                          NIC
                        </label>
                        <input
                          type="text"
                          value={formData.nic}
                          className="w-full px-3 py-2 border lg:text-[16px] text-[14px] font-[300] border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block lg:text-[18px] text-[16px] font-[600] mb-1">
                          Passport Number
                        </label>
                        <input
                          type="text"
                          value={formData.passportNumber}
                          className="w-full px-3 py-2 border lg:text-[16px] text-[14px] font-[300] border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="bg-white mb-10 px-6 py-3">
                      <PhoneInput
                        label="Mobile Number"
                        value={formData.mobileNumber}
                      />
                      <PhoneInput
                        label="Home Telephone Number"
                        value={formData.homeTelephone}
                      />
                      <PhoneInput
                        label="Office Telephone Number"
                        value={formData.officeTelephone}
                      />
                      <PhoneInput
                        label="Home Fax Number"
                        value={formData.homeFax}
                      />
                      <PhoneInput
                        label="Office Fax Number"
                        value={formData.officeFax}
                      />

                      <div className="mb-4">
                        <label className="block lg:text-[18px] text-[16px] font-[600] mb-1">
                          Current Place of work
                        </label>
                        <input
                          type="text"
                          value={formData.currentWorkPlace}
                          className="w-full px-3 py-2 border lg:text-[16px] text-[14px] font-[300] border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block lg:text-[18px] text-[16px] font-[600] mb-1">
                          Current Designation
                        </label>
                        <input
                          type="text"
                          value={formData.currentDesignation}
                          className="w-full px-3 py-2  border lg:text-[16px] text-[14px] font-[300] border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Address Sections */}
                  <div className="grid md:grid-cols-2 lg:gap-16 gap-6">
                    {/* Current Address */}
                    <div className="space-y-4">
                      <h3 className="lg:text-[20px] text-[18px] font-[700] px-6">
                        Current Address
                      </h3>
                      <div className="bg-white mb-10 px-6 py-6">
                        <div>
                          <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                            Address Line 1
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                            defaultValue="11/2, Madawala Road, Katugasthota"
                          />
                        </div>
                        <div>
                          <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                            Address Line 2
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                            defaultValue="Wattegama, Kandy"
                          />
                        </div>
                        <div>
                          <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                            City
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                            defaultValue="Kandy"
                          />
                        </div>
                        <div>
                          <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                            Province/State
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                            defaultValue="Central"
                          />
                        </div>
                        <div>
                          <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                            Country
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                            defaultValue="Sri Lanka"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Permanent Address */}
                    <div className="space-y-4">
                      <h3 className="lg:text-[20px] text-[18px] font-[700] px-6">
                        Permanent Address
                      </h3>
                      <div className="bg-white mb-10 px-6 py-6">
                        <div>
                          <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                            Address Line 1
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                            defaultValue="11/2, Madawala Road, Katugasthota"
                          />
                        </div>
                        <div>
                          <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                            Address Line 2
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                            defaultValue="Wattegama, Kandy"
                          />
                        </div>
                        <div>
                          <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                            City
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                            defaultValue="Kandy"
                          />
                        </div>
                        <div>
                          <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                            Province/State
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                            defaultValue="Central"
                          />
                        </div>
                        <div>
                          <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                            Country
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                            defaultValue="Sri Lanka"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Official Address */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="lg:text-[20px] text-[18px] font-[700] px-6">
                        Official Address
                      </h3>
                      <div className="bg-white mb-10 px-6 py-6">
                        <div>
                          <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                            Address Line 1
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                            defaultValue="11/2, Madawala Road, Katugasthota"
                          />
                        </div>
                        <div>
                          <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                            Address Line 2
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                            defaultValue="Wattegama, Kandy"
                          />
                        </div>
                        <div>
                          <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                            City
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                            defaultValue="Kandy"
                          />
                        </div>
                        <div>
                          <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                            Province/State
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                            defaultValue="Central"
                          />
                        </div>
                        <div>
                          <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                            Country
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                            defaultValue="Sri Lanka"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-5  py-3 px-6">
                  <button
                    type="submit"
                    className="bg-[#2D387D] mb-10 text-white px-[17px] py-[8px] lg:w-[227px] w-full rounded-md hover:bg-blue-900"
                  >
                    Save
                  </button>
                </div>

                {/* <div className="lg:absolute lg:hidden bottom-0 mt-1  left-0 w-full h-[7px] bg-[#2A3990]">
                  {" "}
                </div> */}
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
        <div className="lg:hidden flex justify-end -mt-5 lg:mb-10 -mb-28">
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
        <div className="  lg:block hidden">
          <div className="mx-auto lg:p-6  lg:bg-[#D9D9D9] ">
            <div className=" mx-auto ">
              <form className="" onSubmit={handleSubmit}>
                <div className="lg:bg-white bg-[#D9D9D9] lg:p-10 p-10 rounded-md space-y-6">
                  <div className="lg:block hidden">
                    {/* First Row */}
                    <div className="grid md:grid-cols-2 lg:gap-16 gap-6 ">
                      <div>
                        <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                          Name With Initials
                        </label>
                        <input
                          value={form_Data.nameWithInitials}
                          onChange={(e) =>
                            handleInputChange(e, null, "nameWithInitials")
                          }
                          type="text"
                          className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300]  border border-black px-3 py-2"
                          defaultValue="Mr. N.S. Perera"
                        />
                      </div>
                      <div>
                        <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                          Mobile Number
                        </label>
                        <div className="mt-1 flex lg:text-[16px] text-[14px] font-[300] ">
                          <select className=" border border-r-0  border-black px-3 py-2">
                            <option>🇱🇰 +94</option>
                          </select>
                          <input
                            value={form_Data.mobileNumber}
                            onChange={(e) =>
                              handleInputChange(e, null, "mobileNumber")
                            }
                            type="tel"
                            className="block w-full border-l-0  border border-black px-3 py-2"
                            defaultValue="712556677"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Second Row */}
                    <div className="grid md:grid-cols-2 lg:gap-16 gap-6">
                      <div>
                        <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                          Name Denoted by Initials
                        </label>
                        <input
                          value={form_Data.nameByInitials}
                          onChange={(e) =>
                            handleInputChange(e, null, "nameByInitials")
                          }
                          type="text"
                          className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                          defaultValue="Nirmal Shan"
                        />
                      </div>
                      <div>
                        <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                          Home Telephone Number
                        </label>
                        <div className="mt-1 flex lg:text-[16px] text-[14px] font-[300]">
                          <select className=" border border-r-0 border-black px-3 py-2">
                            <option>🇱🇰 +94</option>
                          </select>
                          <input
                             value={form_Data.homeTelephone}
                             onChange={(e) =>
                               handleInputChange(e, null, "homeTelephone")
                             }
                            type="tel"
                            className="block w-full border-l-0 border border-black px-3 py-2"
                            defaultValue="712556677"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Third Row */}
                    <div className="grid md:grid-cols-2 lg:gap-16 gap-6">
                      <div>
                        <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                          Gender
                        </label>
                        <input
                           value={form_Data.gender}
                           onChange={(e) =>
                             handleInputChange(e, null, "gender")
                           }
                          type="text"
                          className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                          defaultValue="Male"
                        />
                      </div>
                      <div>
                        <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                          Office Telephone Number
                        </label>
                        <div className="mt-1 flex lg:text-[16px] text-[14px] font-[300]">
                          <select className="border border-r-0 border-black px-3 py-2">
                            <option>🇱🇰 +94</option>
                          </select>
                          <input
                             value={form_Data.officeTelephone}
                             onChange={(e) =>
                               handleInputChange(e, null, "officeTelephone")
                             }
                            type="tel"
                            className="block w-full  border border-l-0  border-black px-3 py-2"
                            defaultValue="712556677"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Additional Rows */}
                    <div className="grid md:grid-cols-2 lg:gap-16 gap-6">
                      <div>
                        <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                          Date of Birth
                        </label>
                        <input
                           value={form_Data.dateOfBirth}
                           onChange={(e) =>
                             handleInputChange(e, null, "dateOfBirth")
                           }
                          type="date"
                          className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                          defaultValue="2002-11-11"
                        />
                      </div>
                      <div>
                        <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                          Home Fax Number
                        </label>
                        <div className="mt-1 flex lg:text-[16px] text-[14px] font-[300]">
                          <select className="border border-r-0 border-black px-3 py-2">
                            <option>🇱🇰 +94</option>
                          </select>
                          <input
                             value={form_Data.homeFax}
                             onChange={(e) =>
                               handleInputChange(e, null, "homeFax")
                             }
                            type="tel"
                            className="block w-full border-l-0 border border-black px-3 py-2"
                            defaultValue="712556677"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="grid md:grid-cols-2 lg:gap-16 gap-6">
                      <div>
                        <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                          Email Address
                        </label>
                        <input
                           value={form_Data.email}
                           onChange={(e) =>
                             handleInputChange(e, null, "email")
                           }
                          type="email"
                          className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                          defaultValue="nirmal@gmail.com"
                        />
                      </div>
                      <div>
                        <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                          Office Fax Number
                        </label>
                        <div className="mt-1 flex lg:text-[16px] text-[14px] font-[300]">
                          <select className=" border border-r-0 border-black px-3 py-2">
                            <option>🇱🇰 +94</option>
                          </select>
                          <input
                             value={form_Data.officeFax}
                             onChange={(e) =>
                               handleInputChange(e, null, "officeFax")
                             }
                            type="tel"
                            className="block w-full border-l-0 border border-black px-3 py-2"
                            defaultValue="712556677"
                          />
                        </div>
                      </div>
                    </div>

                    {/* ID Information */}
                    <div className="grid md:grid-cols-2 lg:gap-16 gap-6">
                      <div>
                        <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                          NIC
                        </label>
                        <input
                           value={form_Data.nic}
                           onChange={(e) =>
                             handleInputChange(e, null, "nic")
                           }
                          type="text"
                          className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                          defaultValue="200212345"
                        />
                      </div>
                      <div>
                        <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                          Current Place of Work
                        </label>
                        <input
                           value={form_Data.currentWorkplace}
                           onChange={(e) =>
                             handleInputChange(e, null, "currentWorkplace")
                           }
                          type="text"
                          className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                          defaultValue="LMC Matukubura"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:gap-16 gap-6">
                      <div>
                        <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                          Passport Number
                        </label>
                        <input
                           value={form_Data.passportNumber}
                           onChange={(e) =>
                             handleInputChange(e, null, "passportNumber")
                           }
                          type="text"
                          className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                          defaultValue="200212345"
                        />
                      </div>
                      <div>
                        <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                          Current Designation
                        </label>
                        <input
                           value={form_Data.currentDesignation}
                           onChange={(e) =>
                             handleInputChange(e, null, "currentDesignation")
                           }
                          type="text"
                          className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                          defaultValue="Kandy"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="lg:hidden">
                    <div className="mb-4">
                      <label className="block lg:text-[18px] text-[16px] font-[600] mb-1">
                        Name With Initials
                      </label>
                      <input
                        type="text"
                        value={formData.nameWithInitials}
                        className="w-full px-3 py-2 border lg:text-[16px] text-[14px] font-[300] border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block lg:text-[18px] text-[16px] font-[600] mb-1">
                        Name Denoted by Initials : *
                      </label>
                      <input
                        type="text"
                        value={formData.nameDenotedByInitials}
                        className="w-full px-3 py-2 border lg:text-[16px] text-[14px] font-[300] border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block lg:text-[18px] text-[16px] font-[600] mb-1">
                        Gender
                      </label>
                      <input
                        type="text"
                        value={formData.gender}
                        className="w-full px-3 py-2 border lg:text-[16px] text-[14px] font-[300] border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block lg:text-[18px] text-[16px] font-[600] mb-1">
                        Date Of Birth
                      </label>
                      <input
                        type="date"
                        value={formData.dateOfBirth}
                        className="w-full px-3 py-2 border lg:text-[16px] text-[14px] font-[300] border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block lg:text-[18px] text-[16px] font-[600] mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        className="w-full px-3 py-2 border lg:text-[16px] text-[14px] font-[300] border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block lg:text-[18px] text-[16px] font-[600] mb-1">
                        NIC
                      </label>
                      <input
                        type="text"
                        value={formData.nic}
                        className="w-full px-3 py-2 border lg:text-[16px] text-[14px] font-[300] border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block lg:text-[18px] text-[16px] font-[600] mb-1">
                        Passport Number
                      </label>
                      <input
                        type="text"
                        value={formData.passportNumber}
                        className="w-full px-3 py-2 border lg:text-[16px] text-[14px] font-[300] border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <PhoneInput
                      label="Mobile Number"
                      value={formData.mobileNumber}
                    />
                    <PhoneInput
                      label="Home Telephone Number"
                      value={formData.homeTelephone}
                    />
                    <PhoneInput
                      label="Office Telephone Number"
                      value={formData.officeTelephone}
                    />
                    <PhoneInput
                      label="Home Fax Number"
                      value={formData.homeFax}
                    />
                    <PhoneInput
                      label="Office Fax Number"
                      value={formData.officeFax}
                    />

                    <div className="mb-4">
                      <label className="block lg:text-[18px] text-[16px] font-[600] mb-1">
                        Current Place of work
                      </label>
                      <input
                        type="text"
                        value={formData.currentWorkPlace}
                        className="w-full px-3 py-2 border lg:text-[16px] text-[14px] font-[300] border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block lg:text-[18px] text-[16px] font-[600] mb-1">
                        Current Designation
                      </label>
                      <input
                        type="text"
                        value={formData.currentDesignation}
                        className="w-full px-3 py-2  border lg:text-[16px] text-[14px] font-[300] border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  {/* Address Sections */}
                  <div className="grid md:grid-cols-2 lg:gap-16 gap-6">
                    {/* Current Address */}
                    <div className="space-y-4">
                      <h3 className="lg:text-[20px] text-[18px] font-[700]">
                        Current Address
                      </h3>
                      <div>
                        <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                          Address Line 1
                        </label>
                        <input
                           value={form_Data.currentAddress.line1}
                           onChange={(e) =>
                             handleInputChange(e, null, "currentAddress.line1")
                           }
                          type="text"
                          className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                          defaultValue="11/2, Madawala Road, Katugasthota"
                        />
                      </div>
                      <div>
                        <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                          Address Line 2
                        </label>
                        <input
                           value={form_Data.currentAddress.line2}
                           onChange={(e) =>
                             handleInputChange(e, null, "currentAddress.line2")
                           }
                          type="text"
                          className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                          defaultValue="Wattegama, Kandy"
                        />
                      </div>
                      <div>
                        <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                          City
                        </label>
                        <input
                           value={form_Data.currentAddress.city}
                           onChange={(e) =>
                             handleInputChange(e, null, "currentAddress.city")
                           }
                          type="text"
                          className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                          defaultValue="Kandy"
                        />
                      </div>
                      <div>
                        <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                          Province/State
                        </label>
                        <input
                           value={form_Data.currentAddress.province}
                           onChange={(e) =>
                             handleInputChange(e, null, "currentAddress.province")
                           }
                          type="text"
                          className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                          defaultValue="Central"
                        />
                      </div>
                      <div>
                        <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                          Country
                        </label>
                        <input
                           value={form_Data.currentAddress.country}
                           onChange={(e) =>
                             handleInputChange(e, null, "currentAddress.country")
                           }
                          type="text"
                          className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                          defaultValue="Sri Lanka"
                        />
                      </div>
                    </div>

                    {/* Permanent Address */}
                    <div className="space-y-4">
                      <h3 className="lg:text-[20px] text-[18px] font-[700]">
                        Permanent Address
                      </h3>
                      <div>
                        <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                          Address Line 1
                        </label>
                        <input
                           value={form_Data.permanentAddress.line1}
                           onChange={(e) =>
                             handleInputChange(e, null, "permanentAddress.line1")
                           }
                          type="text"
                          className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                          defaultValue="11/2, Madawala Road, Katugasthota"
                        />
                      </div>
                      <div>
                        <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                          Address Line 2
                        </label>
                        <input
                           value={form_Data.permanentAddress.line2}
                           onChange={(e) =>
                             handleInputChange(e, null, "permanentAddress.line2")
                           }
                          type="text"
                          className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                          defaultValue="Wattegama, Kandy"
                        />
                      </div>
                      <div>
                        <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                          City
                        </label>
                        <input
                           value={form_Data.permanentAddress.city}
                           onChange={(e) =>
                             handleInputChange(e, null, "permanentAddress.city")
                           }
                          type="text"
                          className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                          defaultValue="Kandy"
                        />
                      </div>
                      <div>
                        <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                          Province/State
                        </label>
                        <input
                           value={form_Data.permanentAddress.province}
                           onChange={(e) =>
                             handleInputChange(e, null, "permanentAddress.province")
                           }
                          type="text"
                          className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                          defaultValue="Central"
                        />
                      </div>
                      <div>
                        <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                          Country
                        </label>
                        <input
                           value={form_Data.permanentAddress.country}
                           onChange={(e) =>
                             handleInputChange(e, null, "permanentAddress.country")
                           }
                          type="text"
                          className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                          defaultValue="Sri Lanka"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Official Address */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="lg:text-[20px] text-[18px] font-[700]">
                        Official Address
                      </h3>
                      <div>
                        <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                          Address Line 1
                        </label>
                        <input
                           value={form_Data.officialAddress.line1}
                           onChange={(e) =>
                             handleInputChange(e, null, "officialAddress.line1")
                           }
                          type="text"
                          className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                          defaultValue="11/2, Madawala Road, Katugasthota"
                        />
                      </div>
                      <div>
                        <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                          Address Line 2
                        </label>
                        <input
                           value={form_Data.officialAddress.line2}
                           onChange={(e) =>
                             handleInputChange(e, null, "officialAddress.line2")
                           }
                          type="text"
                          className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                          defaultValue="Wattegama, Kandy"
                        />
                      </div>
                      <div>
                        <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                          City
                        </label>
                        <input
                           value={form_Data.officialAddress.city}
                           onChange={(e) =>
                             handleInputChange(e, null, "officialAddress.city")
                           }
                          type="text"
                          className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                          defaultValue="Kandy"
                        />
                      </div>
                      <div>
                        <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                          Province/State
                        </label>
                        <input
                           value={form_Data.officialAddress.province}
                           onChange={(e) =>
                             handleInputChange(e, null, "officialAddress.province")
                           }
                          type="text"
                          className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                          defaultValue="Central"
                        />
                      </div>
                      <div>
                        <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                          Country
                        </label>
                        <input
                           value={form_Data.officialAddress.country}
                           onChange={(e) =>
                             handleInputChange(e, null, "officialAddress.country")
                           }
                          type="text"
                          className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                          defaultValue="Sri Lanka"
                        />
                      </div>
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
            {/* Save Button */}
          </div>
        </div>
      </div>
      </div>
      <div className="bg-[#D9D9D9] ">
      <div className="lg:hidden mb-24  ">
          <div className="mx-auto  ">
            <div className=" mx-auto   ">
              <form className="">
                <div className="   rounded-md space-y-6">
                  <div className="lg:hidden  ">
                    <div className=" bg-white mb-10 px-6 py-3 ">
                      <div className="mb-4 p">
                        <label className="block lg:text-[18px] text-[16px] font-[600] mb-1">
                          Name With Initials
                        </label>
                        <input
                          type="text"
                          value={formData.nameWithInitials}
                          className="w-full px-3 py-2 border lg:text-[16px] text-[14px] font-[300] border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block lg:text-[18px] text-[16px] font-[600] mb-1">
                          Name Denoted by Initials : *
                        </label>
                        <input
                          type="text"
                          value={formData.nameDenotedByInitials}
                          className="w-full px-3 py-2 border lg:text-[16px] text-[14px] font-[300] border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block lg:text-[18px] text-[16px] font-[600] mb-1">
                          Gender
                        </label>
                        <input
                          type="text"
                          value={formData.gender}
                          className="w-full px-3 py-2 border lg:text-[16px] text-[14px] font-[300] border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block lg:text-[18px] text-[16px] font-[600] mb-1">
                          Date Of Birth
                        </label>
                        <input
                          type="date"
                          value={formData.dateOfBirth}
                          className="w-full px-3 py-2 border lg:text-[16px] text-[14px] font-[300] border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block lg:text-[18px] text-[16px] font-[600] mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          className="w-full px-3 py-2 border lg:text-[16px] text-[14px] font-[300] border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block lg:text-[18px] text-[16px] font-[600] mb-1">
                          NIC
                        </label>
                        <input
                          type="text"
                          value={formData.nic}
                          className="w-full px-3 py-2 border lg:text-[16px] text-[14px] font-[300] border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block lg:text-[18px] text-[16px] font-[600] mb-1">
                          Passport Number
                        </label>
                        <input
                          type="text"
                          value={formData.passportNumber}
                          className="w-full px-3 py-2 border lg:text-[16px] text-[14px] font-[300] border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="bg-white mb-10 px-6 py-3">
                      <PhoneInput
                        label="Mobile Number"
                        value={formData.mobileNumber}
                      />
                      <PhoneInput
                        label="Home Telephone Number"
                        value={formData.homeTelephone}
                      />
                      <PhoneInput
                        label="Office Telephone Number"
                        value={formData.officeTelephone}
                      />
                      <PhoneInput
                        label="Home Fax Number"
                        value={formData.homeFax}
                      />
                      <PhoneInput
                        label="Office Fax Number"
                        value={formData.officeFax}
                      />

                      <div className="mb-4">
                        <label className="block lg:text-[18px] text-[16px] font-[600] mb-1">
                          Current Place of work
                        </label>
                        <input
                          type="text"
                          value={formData.currentWorkPlace}
                          className="w-full px-3 py-2 border lg:text-[16px] text-[14px] font-[300] border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block lg:text-[18px] text-[16px] font-[600] mb-1">
                          Current Designation
                        </label>
                        <input
                          type="text"
                          value={formData.currentDesignation}
                          className="w-full px-3 py-2  border lg:text-[16px] text-[14px] font-[300] border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Address Sections */}
                  <div className="grid md:grid-cols-2 lg:gap-16 gap-6">
                    {/* Current Address */}
                    <div className="space-y-4">
                      <h3 className="lg:text-[20px] text-[18px] font-[700] px-6">
                        Current Address
                      </h3>
                      <div className="bg-white mb-10 px-6 py-6">
                        <div>
                          <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                            Address Line 1
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                            defaultValue="11/2, Madawala Road, Katugasthota"
                          />
                        </div>
                        <div>
                          <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                            Address Line 2
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                            defaultValue="Wattegama, Kandy"
                          />
                        </div>
                        <div>
                          <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                            City
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                            defaultValue="Kandy"
                          />
                        </div>
                        <div>
                          <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                            Province/State
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                            defaultValue="Central"
                          />
                        </div>
                        <div>
                          <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                            Country
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                            defaultValue="Sri Lanka"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Permanent Address */}
                    <div className="space-y-4">
                      <h3 className="lg:text-[20px] text-[18px] font-[700] px-6">
                        Permanent Address
                      </h3>
                      <div className="bg-white mb-10 px-6 py-6">
                        <div>
                          <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                            Address Line 1
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                            defaultValue="11/2, Madawala Road, Katugasthota"
                          />
                        </div>
                        <div>
                          <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                            Address Line 2
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                            defaultValue="Wattegama, Kandy"
                          />
                        </div>
                        <div>
                          <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                            City
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                            defaultValue="Kandy"
                          />
                        </div>
                        <div>
                          <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                            Province/State
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                            defaultValue="Central"
                          />
                        </div>
                        <div>
                          <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                            Country
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                            defaultValue="Sri Lanka"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Official Address */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="lg:text-[20px] text-[18px] font-[700] px-6">
                        Official Address
                      </h3>
                      <div className="bg-white mb-10 px-6 py-6">
                        <div>
                          <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                            Address Line 1
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                            defaultValue="11/2, Madawala Road, Katugasthota"
                          />
                        </div>
                        <div>
                          <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                            Address Line 2
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                            defaultValue="Wattegama, Kandy"
                          />
                        </div>
                        <div>
                          <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                            City
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                            defaultValue="Kandy"
                          />
                        </div>
                        <div>
                          <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                            Province/State
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                            defaultValue="Central"
                          />
                        </div>
                        <div>
                          <label className="block lg:text-[18px] text-[16px] font-[600] text-black">
                            Country
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full lg:text-[16px] text-[14px] font-[300] border border-black px-3 py-2"
                            defaultValue="Sri Lanka"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-5  py-3 px-6">
                  <button
                    type="submit"
                    className="bg-[#2D387D] mb-10 text-white px-[17px] py-[8px] lg:w-[227px] w-full rounded-md hover:bg-blue-900"
                  >
                    Save
                  </button>
                </div>

                {/* <div className="lg:absolute lg:hidden bottom-0 mt-1  left-0 w-full h-[7px] bg-[#2A3990]">
                  {" "}
                </div> */}
              </form>
            </div>
          </div>
        </div>
        </div>
    </>
  );
};

export default PersonalInformationEdit;
