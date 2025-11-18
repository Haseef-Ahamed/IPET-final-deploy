/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */

import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { useUserContext } from "../../contexts/UserContext";

const ApprovalSection = () => {
  const [activeTab, setActiveTab] = useState("Professional Memberships");
  const navigate = useNavigate();
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  // const { approveUser, rejectUser } = useUserContext();

  const admins = ["Admin 1", "Admin 2", "Admin 3", "Admin 4"];

  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const membershipData = {
    institution: "ABC Institute",
    membershipNumber: "2001786788",
    joinedYear: "2024",
  };

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

  const users = [
    {
      idNo: "123456",
      name: "H.W.U.V Karunarthne",
      emailAddress: "Shehahan@123.gmail.com",
      nicNo: "200182768902",
      date: "2024/12/12",
      nameWithInitials: "Mr. H.W.U.V Karunarthne",
      nameDenoted: "Heshan Wijethunge",
      gender: "Male",
      dob: "2001/08/27",
      passport: "N7825661",
      mobile: "+94 712556677",
      homeTel: "+94 812266778",
      officeTel: "+94 812266779",
      homeFax: "+94 812266780",
      officeFax: "+94 812266781",
      workplace: "LMC Makubura",
      designation: "Software Engineer",
      currentAddress: {
        line1: "11/2, Madawala Road",
        line2: "Katugasthota",
        city: "Kandy",
        province: "Central",
        country: "Sri Lanka",
      },
      officialAddress: {
        line1: "45, Temple Road",
        line2: "Maligawatta",
        city: "Colombo",
        province: "Western",
        country: "Sri Lanka",
      },
      permanentAddress: {
        line1: "72/1, Lake Road",
        line2: "Kurunegala",
        city: "Kurunegala",
        province: "North Western",
        country: "Sri Lanka",
      },
    },
    {
      idNo: "123892",
      name: "H.I.U.V Wijethunge",
      emailAddress: "malsh@123.gmail.com",
      nicNo: "200181768902",
      date: "2024/12/12",
      nameWithInitials: "Mr. H.I.U.V Wijethunge",
      nameDenoted: "Heshan Wijethunge",
      gender: "Male",
      dob: "2001/08/17",
      passport: "N7825661",
      mobile: "+94 712556677",
      homeTel: "+94 812266778",
      officeTel: "+94 812266779",
      homeFax: "+94 812266780",
      officeFax: "+94 812266781",
      workplace: "LMC Makubura",
      designation: "Software Engineer",
      currentAddress: {
        line1: "11/2, Madawala Road",
        line2: "Katugasthota",
        city: "Kandy",
        province: "Central",
        country: "Sri Lanka",
      },
      officialAddress: {
        line1: "45, Temple Road",
        line2: "Maligawatta",
        city: "Colombo",
        province: "Western",
        country: "Sri Lanka",
      },
      permanentAddress: {
        line1: "72/1, Lake Road",
        line2: "Kurunegala",
        city: "Kurunegala",
        province: "North Western",
        country: "Sri Lanka",
      },
    },
    {
      idNo: "123432",
      name: "U.V Malshi",
      emailAddress: "abc@123.gmail.com",
      nicNo: "200180768902",
      date: "2024/12/12",
      nameWithInitials: "Mr. U.V Malshi",
      nameDenoted: "Heshan Wijethunge",
      gender: "Male",
      dob: "2001/08/07",
      passport: "N7825661",
      mobile: "+94 712556677",
      homeTel: "+94 812266778",
      officeTel: "+94 812266779",
      homeFax: "+94 812266780",
      officeFax: "+94 812266781",
      workplace: "LMC Makubura",
      designation: "Software Engineer",
      currentAddress: {
        line1: "11/2, Madawala Road",
        line2: "Katugasthota",
        city: "Kandy",
        province: "Central",
        country: "Sri Lanka",
      },
      officialAddress: {
        line1: "45, Temple Road",
        line2: "Maligawatta",
        city: "Colombo",
        province: "Western",
        country: "Sri Lanka",
      },
      permanentAddress: {
        line1: "72/1, Lake Road",
        line2: "Kurunegala",
        city: "Kurunegala",
        province: "North Western",
        country: "Sri Lanka",
      },
    },
    {
      idNo: "123908",
      name: "H. Ramanyaka",
      emailAddress: "yohan@123.gmail.com",
      nicNo: "200181768902",
      date: "2024/12/12",
      nameWithInitials: "Mr. H. Ramanyaka",
      nameDenoted: "Heshan Wijethunge",
      gender: "Male",
      dob: "2001/08/17",
      passport: "N7825661",
      mobile: "+94 712556677",
      homeTel: "+94 812266778",
      officeTel: "+94 812266779",
      homeFax: "+94 812266780",
      officeFax: "+94 812266781",
      workplace: "LMC Makubura",
      designation: "Software Engineer",
      currentAddress: {
        line1: "11/2, Madawala Road",
        line2: "Katugasthota",
        city: "Kandy",
        province: "Central",
        country: "Sri Lanka",
      },
      officialAddress: {
        line1: "45, Temple Road",
        line2: "Maligawatta",
        city: "Colombo",
        province: "Western",
        country: "Sri Lanka",
      },
      permanentAddress: {
        line1: "72/1, Lake Road",
        line2: "Kurunegala",
        city: "Kurunegala",
        province: "North Western",
        country: "Sri Lanka",
      },
    },
    {
      idNo: "123456",
      name: "H.W.U.V Karunarthne",
      emailAddress: "Shehahan@123.gmail.com",
      nicNo: "200181768902",
      date: "2024/12/12",
      nameWithInitials: "Mr. H.W.U.V Karunarthne",
      nameDenoted: "Heshan Wijethunge",
      gender: "Male",
      dob: "2001/08/17",
      passport: "N7825661",
      mobile: "+94 712556677",
      homeTel: "+94 812266778",
      officeTel: "+94 812266779",
      homeFax: "+94 812266780",
      officeFax: "+94 812266781",
      workplace: "LMC Makubura",
      designation: "Software Engineer",
      currentAddress: {
        line1: "11/2, Madawala Road",
        line2: "Katugasthota",
        city: "Kandy",
        province: "Central",
        country: "Sri Lanka",
      },
      officialAddress: {
        line1: "45, Temple Road",
        line2: "Maligawatta",
        city: "Colombo",
        province: "Western",
        country: "Sri Lanka",
      },
      permanentAddress: {
        line1: "72/1, Lake Road",
        line2: "Kurunegala",
        city: "Kurunegala",
        province: "North Western",
        country: "Sri Lanka",
      },
    },
    {
      idNo: "123892",
      name: "H.I.U.V Wijethunge",
      emailAddress: "malsh@123.gmail.com",
      nicNo: "200180768902",
      date: "2024/12/12",
      nameWithInitials: "Mr. H.I.U.V Wijethunge",
      nameDenoted: "Heshan Wijethunge",
      gender: "Male",
      dob: "2001/08/07",
      passport: "N7825661",
      mobile: "+94 712556677",
      homeTel: "+94 812266778",
      officeTel: "+94 812266779",
      homeFax: "+94 812266780",
      officeFax: "+94 812266781",
      workplace: "LMC Makubura",
      designation: "Software Engineer",
      currentAddress: {
        line1: "11/2, Madawala Road",
        line2: "Katugasthota",
        city: "Kandy",
        province: "Central",
        country: "Sri Lanka",
      },
      officialAddress: {
        line1: "45, Temple Road",
        line2: "Maligawatta",
        city: "Colombo",
        province: "Western",
        country: "Sri Lanka",
      },
      permanentAddress: {
        line1: "72/1, Lake Road",
        line2: "Kurunegala",
        city: "Kurunegala",
        province: "North Western",
        country: "Sri Lanka",
      },
    },
    {
      idNo: "123432",
      name: "U.V Malshi",
      emailAddress: "abc@123.gmail.com",
      nicNo: "200180768902",
      date: "2024/12/12",
      nameWithInitials: "Mr. U.V Malshi",
      nameDenoted: "Heshan Wijethunge",
      gender: "Male",
      dob: "2001/08/07",
      passport: "N7825661",
      mobile: "+94 712556677",
      homeTel: "+94 812266778",
      officeTel: "+94 812266779",
      homeFax: "+94 812266780",
      officeFax: "+94 812266781",
      workplace: "LMC Makubura",
      designation: "Software Engineer",
      currentAddress: {
        line1: "11/2, Madawala Road",
        line2: "Katugasthota",
        city: "Kandy",
        province: "Central",
        country: "Sri Lanka",
      },
      officialAddress: {
        line1: "45, Temple Road",
        line2: "Maligawatta",
        city: "Colombo",
        province: "Western",
        country: "Sri Lanka",
      },
      permanentAddress: {
        line1: "72/1, Lake Road",
        line2: "Kurunegala",
        city: "Kurunegala",
        province: "North Western",
        country: "Sri Lanka",
      },
    },
    {
      idNo: "123908",
      name: "H. Ramanyaka",
      emailAddress: "yohan@123.gmail.com",
      nicNo: "200181768902",
      date: "2024/12/12",
      nameWithInitials: "Mr. H. Ramanyaka",
      nameDenoted: "Heshan Wijethunge",
      gender: "Male",
      dob: "2001/08/17",
      passport: "N7825661",
      mobile: "+94 712556677",
      homeTel: "+94 812266778",
      officeTel: "+94 812266779",
      homeFax: "+94 812266780",
      officeFax: "+94 812266781",
      workplace: "LMC Makubura",
      designation: "Software Engineer",
      currentAddress: {
        line1: "11/2, Madawala Road",
        line2: "Katugasthota",
        city: "Kandy",
        province: "Central",
        country: "Sri Lanka",
      },
      officialAddress: {
        line1: "45, Temple Road",
        line2: "Maligawatta",
        city: "Colombo",
        province: "Western",
        country: "Sri Lanka",
      },
      permanentAddress: {
        line1: "72/1, Lake Road",
        line2: "Kurunegala",
        city: "Kurunegala",
        province: "North Western",
        country: "Sri Lanka",
      },
    },
  ];

  // const handleUserForward = (user) => {
  //   navigate('/forward', {
  //     state: {
  //       userData: user
  //     }
  //   });
  // };

  const location = useLocation();
  const userData = location.state?.userData;

  const handleForward = () => {
    // Create the final data object with all sections
    const finalData = {
      ...userData,
      approvalStatus: "pending",
      approvalDate: new Date().toISOString(),
      // Add any other approval-related fields
    };

    // Navigate back to pending users with updated data
    navigate("/forward-d", {
      state: {
        updatedUserData: finalData
      }
    });
  };

  // const handleApprove = () => {
  //   if (selectedAdmin) {
  //     approveUser(user);

  //   } else {
  //     alert('Please select an admin first');
  //   }
  // };

  // const handleReject = () => {
  //   rejectUser(user);

  // };
  return (
    <>
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

      <div className="bg-[#D9D9D9]  lg:py-2 py-6 lg:px-16 px-6">
        <div className="max-w-1500 mx-auto space-y-6 -mt-10 mb-32 lg:px-16 px-0 hidden">
          <div className="flex flex-col   bg-white md:px-0 py-6 px-6 ">
            {/* Approve Section */}
            <div className=" ">
              <div className="space-y-3 mb-10">
                <p className="text-black text-sm md:text-[18px] font-[500]">
                  Click the 'Approve' button to finalize the student's approval
                  after verifying their qualifications.
                </p>
                <button
                  className="w-[227px] bg-[#2c3e7b] text-white py-[10px] px-[17px] text-[18px] font-[700] rounded-md hover:bg-[#1e2b57] transition duration-300"
                  onClick={() => console.log("Approved")}
                >
                  Approve
                </button>
              </div>
            </div>
            {/* Reject Section */}
            <div className=" ">
              <div className="space-y-3">
                <p className="text-black text-sm md:text-[18px] font-[500]">
                  Click the 'Reject' button to decline the student's application
                  if their qualifications do not meet the required criteria
                </p>
                <button
                  className="w-[227px] bg-[#a61d24] text-white py-[10px] px-[17px] rounded-md text-[18px] font-[700] hover:bg-[#8a1a1f] transition duration-300"
                  onClick={() => console.log("Rejected")}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1500px] mx-auto bg-white  shadow-md p-6 space-y-8 mb-28">
          {/* Instructions */}
          <p className="text-black  font-[500] text-sm md:text-[18px]">
            Click the 'Approve' button to finalize the student's approval after
            verifying their qualifications. Or Click the 'Reject' button to
            decline the student's application if their qualifications do not
            meet the required criteria
          </p>

          {/* Approve/Reject Buttons */}
          <div className="flex flex-row sm:flex-row gap-4">
            <button
              // key={userData.id}
              // onClick={() => navigate("/forward")}
              onClick={handleForward}
              className="w-full sm:w-[227px] bg-[#2a3990] text-[18px] font-[700] text-white py-2 px-4 rounded-md hover:bg-[#232f75] transition-colors"
            >
              Approve
            </button>

            <button onClick={(()=>navigate('/decline-users'))} className="w-full sm:w-[227px] bg-[#b91c1c] text-[18px] font-[700] text-white py-2 px-4 rounded-md hover:bg-[#991818] transition-colors">
              Reject
            </button>
          </div>

          {/* Forward Instructions */}
          <p className="text-balck font-[500] text-sm md:text-[18px] hidden">
            Please forward this student form to another admin by making a
            selection for student approval.
          </p>

          {/* Admin Selection */}
          <div className="hidden">
            <div className="flex lg:flex-row flex-col gap-8 ">
              {admins.map((admin, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAdmin(admin)}
                  className={`p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow
                ${
                  selectedAdmin === admin
                    ? "bg-blue-50 border-2 border-blue-500"
                    : "bg-white border border-gray-200"
                }`}
                >
                  <span className="text-gray-800 text-sm md:text-base">
                    {admin}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="hidden">
            <div className="grid  lg:grid-cols-4 grid-cols-2 gap-8 ">
              {admins.map((admin, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAdmin(admin)}
                  className={`p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow
                ${
                  selectedAdmin === admin
                    ? "bg-blue-50 border-2 border-blue-500"
                    : "bg-white border border-gray-200"
                }`}
                >
                  <span className="text-gray-800 text-sm md:text-base">
                    {admin}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Forward Button */}
          <div>
            <button className="w-full hidden sm:w-[227px]  text-[18px] font-[700] bg-[#2a3990] text-white py-2 px-4 rounded-md hover:bg-[#232f75] transition-colors">
              Forward
            </button>
          </div>
        </div>
      </div>

      <div className=" bg-[#D9D9D9] -mt-24 hidden">
        <div className="max-w-1500 mx-auto space-y-6 mb-20  -mt-10 lg:px-16 px-0 py-6 ">
          <div className="text-center  bg-white md:px-0 py-6 px-8 mb-10">
            <div className=" ">
              <div className="space-y-3 mb-10">
                <p className="text-black text-sm md:text-[18px] font-[500]">
                  Click the 'Approve' button to finalize the student's approval
                  after verifying their qualifications.
                </p>
                <button
                  className="w-[227px] bg-[#2c3e7b] text-white py-[10px] px-[17px] text-[18px] font-[700] rounded-md hover:bg-[#1e2b57] transition duration-300"
                  onClick={() => console.log("Approved")}
                >
                  Approve
                </button>
              </div>
            </div>

            <div className=" ">
              <div className="space-y-3">
                <p className="text-black text-sm md:text-[18px] font-[500]">
                  Click the 'Reject' button to decline the student's application
                  if their qualifications do not meet the required criteria
                </p>
                <button
                  className="w-[227px] bg-[#a61d24] text-white py-[10px] px-[17px] rounded-md text-[18px] font-[700] hover:bg-[#8a1a1f] transition duration-300"
                  onClick={() => console.log("Rejected")}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApprovalSection;
