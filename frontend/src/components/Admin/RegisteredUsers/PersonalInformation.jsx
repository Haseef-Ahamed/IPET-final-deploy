/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const PersonalInformation = () => {
  const [activeTab, setActiveTab] = useState("Personal Information");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { userId } = useParams();

  // Handle tab navigation
  const handleStepClick = (tabName) => {
    setActiveTab(tabName);
    switch (tabName) {
      case "Personal Information":
        navigate(`/personal-r/${userId}`);
        break;
      case "Academic Qualifications":
        navigate(`/acadamic/${userId}`);
        break;
      case "Training & Experience":
        navigate(`/training/${userId}`);
        break;
      case "Professional Memberships":
        navigate(`/memberships/${userId}`);
        break;
      default:
        break;
    }
  };

  // Handle certificate download
  const handleCertificateDownload = async () => {
    try {
      if (!userData?.birth_certificate_path) {
        Swal.fire({
          icon: "error",
          title: "No Certificate",
          text: "No birth certificate available for download.",
        });
        return;
      }

      const certificateUrl = userData.birth_certificate_path;
      console.log("Attempting to download certificate from:", certificateUrl);

      const response = await axios({
        url: certificateUrl,
        method: "GET",
        responseType: "blob",
      }).catch(async (error) => {
        console.error("Direct download failed:", error.message);
        return axios({
          url: `http://localhost:5000/api/download-birth-certificate/${userId}`,
          method: "GET",
          responseType: "blob",
        });
      });

      const blob = new Blob([response.data], {
        type: response.headers["content-type"] || "application/pdf",
      });
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = certificateUrl.split("/").pop() || `birth_certificate_${userId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading certificate:", error);
      Swal.fire({
        icon: "error",
        title: "Download Failed",
        text: "Unable to download the certificate.",
      });
    }
  };

  // Fetch user details
  useEffect(() => {
    if (userId) {
      const fetchUserDetails = async () => {
        try {
          console.log("Fetching details for userId:", userId);
          const response = await axios.get(`http://localhost:5000/api/user-details/${userId}`);
          console.log("Fetched user data:", response.data);
          setUserData(response.data);
        } catch (error) {
          console.error("Error fetching user details:", error);
          Swal.fire({
            icon: "error",
            title: "Fetch Error",
            text: "Failed to load user details.",
          });
        }
      };
      fetchUserDetails();
    }
  }, [userId]);

  // Define tabs
  const tabs = [
    "Personal Information",
    "Academic Qualifications",
    "Training & Experience",
    "Professional Memberships",
  ];
  const mobileTabs = ["Personal Information"];

  return (
    <>
      <div className="bg-[#D9D9D9] lg:py-4 py-6 lg:px-6 px-4">
        <div className="max-w-[1360px] mx-auto lg:bg-white lg:px-8 lg:py-6 py-4 rounded-lg">
          {/* Profile Picture (Mobile: Top Center) */}
          <div className="lg:hidden flex justify-center mb-6">
            <div className="w-[88px] h-[90px] bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
              {userData?.profile_picture_path ? (
                <img
                  src={userData.profile_picture_path}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                />
              ) : (
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
              )}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="relative mb-8">
            <div className="max-w-7xl mx-auto">
              <div className="relative flex items-center justify-start lg:gap-4">
                {(window.innerWidth < 1024 ? mobileTabs : tabs).map((tabName) => (
                  <button
                    key={tabName}
                    onClick={() => handleStepClick(tabName)}
                    className={`relative py-2 px-4 h-[48px] sm:h-[56px] text-[14px] sm:text-[16px] font-[500] rounded-md transition-colors ${
                      window.innerWidth < 1024
                        ? "w-full text-center bg-[#2A3990] text-white"
                        : activeTab === tabName
                        ? "bg-[#2A3990] text-white px-6"
                        : "text-gray-700 hover:bg-gray-200 px-6"
                    }`}
                    disabled={window.innerWidth < 1024 && tabName !== "Personal Information"}
                  >
                    {tabName}
                    {activeTab === tabName && (
                      <div className="absolute -bottom-[8px] left-1/2 transform -translate-x-1/2">
                        <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#2A3990]"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#2A3990]"></div>
          </div>

          {/* Personal Information Content */}
          <div className="lg:bg-[#EDEDED] lg:p-6 p-4 rounded-lg lg:shadow-sm">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
              <h2 className="text-[18px] sm:text-[20px] font-[700] mb-6 text-[#2A3990]">
                Personal Information
              </h2>

              {/* Profile Picture (Desktop: Inside Content) */}
              <div className="hidden lg:flex justify-center mb-6">
                <div className="w-[153px] h-[142px] bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                  {userData?.profile_picture_path ? (
                    <img
                      src={userData.profile_picture_path}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/150";
                      }}
                    />
                  ) : (
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
                  )}
                </div>
              </div>

              {/* Personal Details */}
              <div className="mb-8 p-4 sm:p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-[16px] font-[600] mb-4 text-gray-700">Personal Details</h3>
                {userData ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[16px] font-[600] block mb-1 text-gray-700">
                        Name with Initials
                      </label>
                      <p className="text-[14px] sm:text-[16px] text-gray-900">
                        {userData.nameWithInitials || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-[16px] font-[600] block mb-1 text-gray-700">
                        Name Denoted by Initials
                      </label>
                      <p className="text-[14px] sm:text-[16px] text-gray-900">
                        {userData.nameDenoted || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-[16px] font-[600] block mb-1 text-gray-700">
                        Gender
                      </label>
                      <p className="text-[14px] sm:text-[16px] text-gray-900">
                        {userData.gender || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-[16px] font-[600] block mb-1 text-gray-700">
                        Date of Birth
                      </label>
                      <p className="text-[14px] sm:text-[16px] text-gray-900">
                        {userData.dob ? userData.dob.substring(0, 10) : "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-[16px] font-[600] block mb-1 text-gray-700">
                        Email Address
                      </label>
                      <p className="text-[14px] sm:text-[16px] text-gray-900">
                        {userData.email || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-[16px] font-[600] block mb-1 text-gray-700">
                        NIC
                      </label>
                      <p className="text-[14px] sm:text-[16px] text-gray-900">
                        {userData.nic || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-[16px] font-[600] block mb-1 text-gray-700">
                        Passport Number
                      </label>
                      <p className="text-[14px] sm:text-[16px] text-gray-900">
                        {userData.passport || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-[16px] font-[600] block mb-1 text-gray-700">
                        Mobile Number
                      </label>
                      <p className="text-[14px] sm:text-[16px] text-gray-900">
                        {userData.mobile || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-[16px] font-[600] block mb-1 text-gray-700">
                        Home Telephone Number
                      </label>
                      <p className="text-[14px] sm:text-[16px] text-gray-900">
                        {userData.homeTel || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-[16px] font-[600] block mb-1 text-gray-700">
                        Office Telephone Number
                      </label>
                      <p className="text-[14px] sm:text-[16px] text-gray-900">
                        {userData.officeTel || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-[16px] font-[600] block mb-1 text-gray-700">
                        Home Fax Number
                      </label>
                      <p className="text-[14px] sm:text-[16px] text-gray-900">
                        {userData.homeFax || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-[16px] font-[600] block mb-1 text-gray-700">
                        Office Fax Number
                      </label>
                      <p className="text-[14px] sm:text-[16px] text-gray-900">
                        {userData.officeFax || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-[16px] font-[600] block mb-1 text-gray-700">
                        Current Place of Work
                      </label>
                      <p className="text-[14px] sm:text-[16px] text-gray-900">
                        {userData.workplace || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-[16px] font-[600] block mb-1 text-gray-700">
                        Current Designation
                      </label>
                      <p className="text-[14px] sm:text-[16px] text-gray-900">
                        {userData.designation || "N/A"}
                      </p>
                    </div>
                    {userData?.birth_certificate_path && (
                      <div className="sm:col-span-2">
                        <label className="text-[16px] font-[600] block mb-1 text-gray-700">
                          Birth Certificate
                        </label>
                        <button
                          onClick={handleCertificateDownload}
                          className="w-full sm:w-auto bg-[#2A3990] text-[14px] sm:text-[16px] font-[600] text-white px-4 py-2 rounded-md hover:bg-[#1b2142] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2A3990] focus:ring-opacity-50"
                        >
                          Download Birth Certificate
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-[16px] text-gray-600 text-center">
                    No personal details available.
                  </p>
                )}
              </div>

              {/* Address Details */}
              <div className="p-4 sm:p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-[16px] font-[600] mb-4 text-gray-700">Address Details</h3>
                {userData ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* Official Address */}
                    <div>
                      <h4 className="text-[16px] font-[600] mb-2 text-gray-700">
                        Official Address
                      </h4>
                      <div className="space-y-2">
                        <div>
                          <label className="text-[14px] font-[600] block text-gray-700">
                            Address Line 1
                          </label>
                          <p className="text-[14px] sm:text-[16px] text-gray-900">
                            {userData.officialAddressLine1 || "N/A"}
                          </p>
                        </div>
                        <div>
                          <label className="text-[14px] font-[600] block text-gray-700">
                            Address Line 2
                          </label>
                          <p className="text-[14px] sm:text-[16px] text-gray-900">
                            {userData.officialAddressLine2 || "N/A"}
                          </p>
                        </div>
                        <div>
                          <label className="text-[14px] font-[600] block text-gray-700">
                            City
                          </label>
                          <p className="text-[14px] sm:text-[16px] text-gray-900">
                            {userData.officialCity || "N/A"}
                          </p>
                        </div>
                        <div>
                          <label className="text-[14px] font-[600] block text-gray-700">
                            Province/State
                          </label>
                          <p className="text-[14px] sm:text-[16px] text-gray-900">
                            {userData.officialProvince || "N/A"}
                          </p>
                        </div>
                        <div>
                          <label className="text-[14px] font-[600] block text-gray-700">
                            Country
                          </label>
                          <p className="text-[14px] sm:text-[16px] text-gray-900">
                            {userData.officialCountry || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Permanent Address */}
                    <div>
                      <h4 className="text-[16px] font-[600] mb-2 text-gray-700">
                        Permanent Address
                      </h4>
                      <div className="space-y-2">
                        <div>
                          <label className="text-[14px] font-[600] block text-gray-700">
                            Address Line 1
                          </label>
                          <p className="text-[14px] sm:text-[16px] text-gray-900">
                            {userData.permanentAddressLine1 || "N/A"}
                          </p>
                        </div>
                        <div>
                          <label className="text-[14px] font-[600] block text-gray-700">
                            Address Line 2
                          </label>
                          <p className="text-[14px] sm:text-[16px] text-gray-900">
                            {userData.permanentAddressLine2 || "N/A"}
                          </p>
                        </div>
                        <div>
                          <label className="text-[14px] font-[600] block text-gray-700">
                            City
                          </label>
                          <p className="text-[14px] sm:text-[16px] text-gray-900">
                            {userData.permanentCity || "N/A"}
                          </p>
                        </div>
                        <div>
                          <label className="text-[14px] font-[600] block text-gray-700">
                            Province/State
                          </label>
                          <p className="text-[14px] sm:text-[16px] text-gray-900">
                            {userData.permanentProvince || "N/A"}
                          </p>
                        </div>
                        <div>
                          <label className="text-[14px] font-[600] block text-gray-700">
                            Country
                          </label>
                          <p className="text-[14px] sm:text-[16px] text-gray-900">
                            {userData.permanentCountry || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Current Address */}
                    <div>
                      <h4 className="text-[16px] font-[600] mb-2 text-gray-700">
                        Current Address
                      </h4>
                      <div className="space-y-2">
                        <div>
                          <label className="text-[14px] font-[600] block text-gray-700">
                            Address Line 1
                          </label>
                          <p className="text-[14px] sm:text-[16px] text-gray-900">
                            {userData.currentAddressLine1 || "N/A"}
                          </p>
                        </div>
                        <div>
                          <label className="text-[14px] font-[600] block text-gray-700">
                            Address Line 2
                          </label>
                          <p className="text-[14px] sm:text-[16px] text-gray-900">
                            {userData.currentAddressLine2 || "N/A"}
                          </p>
                        </div>
                        <div>
                          <label className="text-[14px] font-[600] block text-gray-700">
                            City
                          </label>
                          <p className="text-[14px] sm:text-[16px] text-gray-900">
                            {userData.currentCity || "N/A"}
                          </p>
                        </div>
                        <div>
                          <label className="text-[14px] font-[600] block text-gray-700">
                            Province/State
                          </label>
                          <p className="text-[14px] sm:text-[16px] text-gray-900">
                            {userData.currentProvince || "N/A"}
                          </p>
                        </div>
                        <div>
                          <label className="text-[14px] font-[600] block text-gray-700">
                            Country
                          </label>
                          <p className="text-[14px] sm:text-[16px] text-gray-900">
                            {userData.currentCountry || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-[16px] text-gray-600 text-center">
                    No address details available.
                  </p>
                )}
              </div>

              {/* Navigation Button */}
              <div className="flex justify-end gap-4 mt-6 flex-col sm:flex-row">
                <button
                  onClick={() => navigate(`/acadamic/${userId}`)}
                  className="w-full sm:w-[160px] px-4 py-2 text-[14px] sm:text-[16px] font-[600] rounded-md bg-[#2A3990] text-white hover:bg-[#1b2142] transition-colors mb-20"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInformation;