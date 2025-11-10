import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ForwardSection = () => {
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [loggedInAdmin, setLoggedInAdmin] = useState(null);
  const { userId } = useParams();
  const navigate = useNavigate();

  const admins = ["Admin 1", "Admin 2", "Admin 3", "Admin 4"];
  const adminStatus = ["admin1", "admin2", "admin3", "admin4"];

  // Retrieve the logged-in admin for current tab
  useEffect(() => {
    const tabId = sessionStorage.getItem('tabId');
    if (tabId) {
      const admin = localStorage.getItem(`loggedInAdmin_${tabId}`);
      if (admin) {
        setLoggedInAdmin(admin);
        console.log(`Admin logged in for tab ${tabId}: ${admin}`);
      } else {
        console.log("No admin is currently logged in for this tab.");
        // Redirect to login if no admin is logged in
        navigate('/admin-login');
      }
    } else {
      console.log("No tab ID found.");
      // Initialize tab ID if not exists
      const newTabId = crypto.randomUUID();
      sessionStorage.setItem('tabId', newTabId);
    }
  }, [navigate]);

  const handleForward = async () => {
    const tabId = sessionStorage.getItem('tabId');
    const currentAdmin = localStorage.getItem(`loggedInAdmin_${tabId}`);

    if (!selectedAdmin || !currentAdmin || !userId) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please select an admin to forward the form.",
      });
      return;
    }

    // Prevent forwarding to same admin
    if (selectedAdmin === currentAdmin) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Cannot forward to yourself. Please select a different admin.",
      });
      return;
    }

    try {
      const response = await fetch("http://72.60.42.161/api/forward-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          forwardedAdminId: selectedAdmin,
          currentAdminId: currentAdmin,
        }),
      });

      const rawResponse = await response.text();
      console.log("Raw Response:", rawResponse);

      const data = JSON.parse(rawResponse);

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Form forwarded successfully!",
        });
        console.log(data.message);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.error || "Failed to forward the form.",
        });
      }
    } catch (error) {
      console.error("Error forwarding form:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while forwarding the form.",
      });
    }
  };

  const handleBackToDashboard = () => {
    navigate("/admin-dashboard");
  };

  return (
    <>
      <div className="bg-[#D9D9D9] py-6 w-full mb-40">
        <div className="bg-white shadow-md p-6 space-y-8 ml-5 mr-5">
          {/* Forward Instructions */}
          <p className="text-black font-[500] text-sm md:text-[18px]">
            Please forward this student form to another admin by making a
            selection for student approval.
          </p>

          {/* Admin Selection */}
          <div className="lg:block hidden">
            <div className="flex lg:flex-row flex-col gap-8">
              {adminStatus.map((admin, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAdmin(admin)}
                  className={`p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow
                    ${
                      selectedAdmin === admin
                        ? "bg-blue-50 border-2 border-blue-500"
                        : "bg-white border border-gray-200"
                    }
                    ${
                      admin === loggedInAdmin
                        ? "disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
                        : ""
                    }`}
                  disabled={admin === loggedInAdmin}
                >
                  <span className="text-gray-800 text-sm md:text-base">
                    {admin}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:hidden">
            <div className="grid lg:grid-cols-4 grid-cols-2 gap-8">
              {adminStatus.map((admin, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAdmin(admin)}
                  className={`p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow
                    ${
                      selectedAdmin === admin
                        ? "bg-blue-50 border-2 border-blue-500"
                        : "bg-white border border-gray-200"
                    }
                    ${
                      admin === loggedInAdmin
                        ? "disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
                        : ""
                    }`}
                  disabled={admin === loggedInAdmin}
                >
                  <span className="text-gray-800 text-sm md:text-base">
                    {admin}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Buttons Section */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <button
              onClick={handleForward}
              className="w-full sm:w-[227px] text-[18px] font-[700] bg-[#2a3990] text-white py-2 px-4 rounded-md hover:bg-[#232f75] transition-colors"
            >
              Forward
            </button>

            <button
              onClick={handleBackToDashboard}
              className="w-full sm:w-auto bg-[#FF5733] text-white px-6 py-2 rounded-md hover:bg-[#E64A2E] transition-colors text-[18px] font-[700]"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForwardSection;