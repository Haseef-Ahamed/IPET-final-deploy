/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ProfessionalMemberships = () => {
  const [activeTab, setActiveTab] = useState("Professional Memberships");
  const navigate = useNavigate();
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);

  // Determine approval status
  const isApproved =
    userData?.admin1status === "approved" && userData?.admin2status === "approved";
  const isRejected =
    userData?.admin1status === "rejected" || userData?.admin2status === "rejected";

  // ----- Tab navigation -----
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

  // ----- Certificate download -----
  const handleDownloadCertificate = async (certificatePath) => {
    if (!certificatePath) {
      Swal.fire({
        icon: "error",
        title: "No Certificate",
        text: "No certificate available for download.",
      });
      return;
    }

    try {
      const response = await axios.get(certificatePath, { responseType: "blob" });

      if (response.data instanceof Blob) {
        const url = window.URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", certificatePath.split("/").pop());
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        Swal.fire({ icon: "error", title: "Error", text: "Invalid file format." });
      }
    } catch (error) {
      console.error("Error downloading certificate:", error);
      Swal.fire({
        icon: "error",
        title: "Download Failed",
        text: "Unable to download the certificate.",
      });
    }
  };

  // ----- Fetch user data -----
  useEffect(() => {
    if (userId) {
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/user-details/${userId}`
          );
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

  // ----- Next navigation -----
  const handleNext = () => {
    navigate(`/professional/${userId}`, { state: { userData } });
  };

  // ----- Tabs -----
  const tabs = [
    "Personal Information",
    "Academic Qualifications",
    "Training & Experience",
    "Professional Memberships",
  ];
  const mobileTabs = ["Professional Memberships"];

  return (
    <>
      <div className="bg-[#D9D9D9] lg:py-4 py-6 lg:px-6 px-4">
        <div className="max-w-[1360px] mx-auto lg:bg-white lg:px-8 lg:py-6 py-4 rounded-lg">
          {/* Mobile Profile Picture */}
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
                    disabled={window.innerWidth < 1024 && tabName !== "Professional Memberships"}
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

          {/* Content */}
          <div className="lg:bg-[#EDEDED] lg:p-6 p-4 rounded-lg lg:shadow-sm">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
              <h2 className="text-[18px] sm:text-[20px] font-[700] mb-6 text-[#2A3990]">
                Professional Memberships
              </h2>

              {/* Membership List */}
              <div className="mb-8 p-4 sm:p-6 bg-gray-50 rounded-lg border border-gray-200">
                {userData?.professional_memberships?.length > 0 ? (
                  userData.professional_memberships.map((membership, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 last:mb-0 border-b border-gray-200 pb-6 last:pb-0 last:border-b-0"
                    >
                      {/* Institution */}
                      <div>
                        <h3 className="text-[16px] font-[600] mb-2 text-gray-700">
                          Institution
                        </h3>
                        <p className="text-[14px] sm:text-[16px] text-gray-900">
                          {membership.institution || "N/A"}
                        </p>
                      </div>

                      {/* Membership Number */}
                      <div>
                        <h3 className="text-[16px] font-[600] mb-2 text-gray-700">
                          Membership Number
                        </h3>
                        <p className="text-[14px] sm:text-[16px] text-gray-900">
                          {membership.membershipNumber || "N/A"}
                        </p>
                      </div>

                      {/* Joined Year */}
                      <div>
                        <h3 className="text-[16px] font-[600] mb-2 text-gray-700">
                          Joined Year
                        </h3>
                        <p className="text-[14px] sm:text-[16px] text-gray-900">
                          {membership.joinedYear || "N/A"}
                        </p>
                      </div>

                      {/* Download Certificate – ONLY IF certificatePath exists */}
                      {membership.certificatePath && (
                        <div className="sm:col-span-3">
                          <h3 className="text-[16px] font-[600] mb-2 text-gray-700">
                            Certificate
                          </h3>
                          <button
                            onClick={() => handleDownloadCertificate(membership.certificatePath)}
                            className="w-full sm:w-auto bg-[#2A3990] text-[14px] sm:text-[16px] font-[600] text-white px-4 py-2 rounded-md hover:bg-[#1b2142] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2A3990] focus:ring-opacity-50"
                          >
                            Download Certificate
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-[16px] text-gray-600 text-center">
                    No professional memberships available.
                  </p>
                )}
              </div>

              {/* Navigation Buttons – SAME SIZE */}
              <div className="flex justify-end gap-4 mt-8">
                <button
                  onClick={() => navigate(`/training/${userId}`)}
                  className="w-full sm:w-[160px] px-4 py-2 text-[14px] sm:text-[16px] font-[600] rounded-md bg-[#2A3990] text-white hover:bg-[#1b2142] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2A3990] focus:ring-opacity-50"
                >
                  Back
                </button>

                {/* Show Next only when not approved/rejected */}
                {!isApproved && !isRejected && (
                  <button
                    onClick={handleNext}
                    className="w-full sm:w-[160px] px-4 py-2 text-[14px] sm:text-[16px] font-[600] rounded-md bg-[#2A3990] text-white hover:bg-[#1b2142] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2A3990] focus:ring-opacity-50"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfessionalMemberships;