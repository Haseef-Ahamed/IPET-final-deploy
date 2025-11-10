import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ApprovalSection = () => {
  const [activeTab, setActiveTab] = useState("Professional Memberships");
  const navigate = useNavigate();
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [loggedInAdmin, setLoggedInAdmin] = useState(null);
  const { userId } = useParams();  // Getting userId from URL params

  // Define the admins array
  const admins = ["admin1", "admin2", "admin3", "admin4"];

  // Get current tab's admin
  useEffect(() => {
    const tabId = sessionStorage.getItem('tabId');
    if (tabId) {
      const admin = localStorage.getItem(`loggedInAdmin_${tabId}`);
      if (admin) {
        setLoggedInAdmin(admin);
        console.log(`Admin logged in for tab ${tabId}: ${admin}`);
      } else {
        console.log("No admin is currently logged in for this tab.");
        // Redirect to login if no admin found
        navigate("/admin-login");
      }
    } else {
      console.log("No tab ID found.");
      navigate("/admin-login");
    }
  }, [navigate]);

  const getAdminStatusField = (admin) => {
    switch (admin) {
      case "admin1":
        return "admin1status";
      case "admin2":
        return "admin2status";
      case "admin3":
        return "admin3status";
      case "admin4":
        return "admin4status";
      default:
        return null;
    }
  };

  const handleApprove = async () => {
    console.log("Approve button clicked for userId:", userId);
    const tabId = sessionStorage.getItem('tabId');
    const currentAdmin = localStorage.getItem(`loggedInAdmin_${tabId}`);
    
    if (!currentAdmin) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No admin is logged in for this tab.",
      });
      return;
    }
  
    const adminStatusField = getAdminStatusField(currentAdmin);

    if (!adminStatusField) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Invalid admin.",
      });
      return;
    }

    try {
      console.log("Sending approve request with:", {
        userId: userId,
        [adminStatusField]: "approved"
      });
      
      const response = await fetch("http://72.60.42.161/api/approve-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,  // Using userId from useParams
          [adminStatusField]: "approved",
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("User approved successfully:", data);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "User approved successfully!",
      });
      navigate(`/forward/${userId}`);
    } catch (error) {
      console.error("Error approving user:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to approve user.",
      });
    }
  };

  const handleReject = async () => {
    console.log("Reject button clicked for userId:", userId);
    const tabId = sessionStorage.getItem('tabId');
    const currentAdmin = localStorage.getItem(`loggedInAdmin_${tabId}`);
    
    if (!currentAdmin) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No admin is logged in for this tab.",
      });
      return;
    }

    const adminStatusField = getAdminStatusField(currentAdmin);
    if (!adminStatusField) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Invalid admin.",
      });
      return;
    }

    try {
      console.log("Sending reject request with:", {
        userId: userId,
        [adminStatusField]: "rejected"
      });

      const response = await fetch("http://72.60.42.161/api/reject-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,  // Using userId from useParams
          [adminStatusField]: "rejected",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "User rejected successfully!",
      });
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Error rejecting user:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to reject user.",
      });
    }
  };



  return (
    <>
      <div className="bg-[#D9D9D9]  lg:py-2 py-2 lg:px-38 px-2">
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
                  onClick={handleApprove}
                  className="w-full sm:w-[227px] bg-[#2a3990] text-[18px] font-[700] text-white py-2 px-4 rounded-md hover:bg-[#232f75] transition-colors"
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
                  onClick={handleReject}
                  className="w-full sm:w-[227px] bg-[#b91c1c] text-[18px] font-[700] text-white py-2 px-4 rounded-md hover:bg-[#991818] transition-colors"
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
                  onClick={handleApprove}
                  className="w-full sm:w-[227px] bg-[#2a3990] text-[18px] font-[700] text-white py-2 px-4 rounded-md hover:bg-[#232f75] transition-colors"
                >
                  Approve
                </button>
                <button
                  onClick={handleReject}
                  className="w-full sm:w-[227px] bg-[#b91c1c] text-[18px] font-[700] text-white py-2 px-4 rounded-md hover:bg-[#991818] transition-colors"
                >
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
