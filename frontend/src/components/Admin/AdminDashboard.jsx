import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [currentAdmin, setCurrentAdmin] = useState("");

  useEffect(() => {
    // Get the current tab's ID and admin
    const tabId = sessionStorage.getItem('tabId');
    const loggedInAdmin = sessionStorage.getItem(`loggedInAdmin_${tabId}`);
    
    if (loggedInAdmin) {
      setCurrentAdmin(loggedInAdmin);
      console.log(`Admin logged in: ${loggedInAdmin}`);
    } else {
      console.log("No admin is currently logged in.");
      // Redirect to login if no admin found
      navigate("/admin-login");
    }
  }, [navigate]);

  return (
    <div className="container max-w-7xl mx-auto lg:px-16 px-8 py-16 mb-28">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Admin Dashboard - {currentAdmin}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white lg:w-[345px] h-[225px] items-center flex justify-center rounded-[14px] shadow-md p-6 shadow-[#00000040] hover:shadow-lg transition duration-300">
          <button
            onClick={() => navigate("/register-users")}
            className="text-[25px] font-[700] text-center"
          >
            Registered Users
          </button>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-[14px] lg:w-[345px] h-[225px] items-center flex justify-center shadow-md shadow-[#00000040] p-6 hover:shadow-lg transition duration-300">
          <button
            onClick={() => navigate("/pending-users")}
            className="text-[25px] font-[700] text-center"
          >
            Pending Users
          </button>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-[14px] lg:w-[345px] h-[225px] items-center flex justify-center shadow-md shadow-[#00000040] p-6 hover:shadow-lg transition duration-300">
          <button
            onClick={() => navigate("/decline-users")}
            className="text-[25px] font-[700] text-center"
          >
            Decline Users
          </button>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-[14px] lg:w-[345px] h-[225px] items-center flex justify-center shadow-md shadow-[#00000040] p-6 hover:shadow-lg transition duration-300">
          <button
            onClick={() => navigate("/forward-users")}
            className="text-[25px] font-[700] text-center"
          >
            Forwarded Users
          </button>
        </div>

        {/* Card 5 */}
        <div className="bg-white rounded-[14px] lg:w-[345px] h-[225px] items-center flex justify-center shadow-md shadow-[#00000040] p-6 hover:shadow-lg transition duration-300">
          <button
            onClick={() => navigate("/received-users")}
            className="text-[25px] font-[700] text-center"
          >
            Received Users
          </button>
        </div>

        {/* Card 6 */}
        <div className="bg-white rounded-[14px] lg:w-[345px] h-[225px] items-center flex justify-center shadow-md shadow-[#00000040] p-6 hover:shadow-lg transition duration-300">
          <button
            onClick={() => navigate("/all-users")}
            className="text-[25px] font-[700] text-center"
          >
            All Users
          </button>
        </div>

        {/* Card 7 - View Course */}
        <div className="bg-white rounded-[14px] lg:w-[345px] h-[225px] items-center flex justify-center shadow-md shadow-[#00000040] p-6 hover:shadow-lg transition duration-300">
          <button
            onClick={() => navigate("/view-courses-table")}
            className="text-[25px] font-[700] text-center"
          >
            View Course
          </button>
        </div>

        {/* Card 8 - View Event */}
        <div className="bg-white rounded-[14px] lg:w-[345px] h-[225px] items-center flex justify-center shadow-md shadow-[#00000040] p-6 hover:shadow-lg transition duration-300">
          <button
            onClick={() => navigate("/view-events-table")}
            className="text-[25px] font-[700] text-center"
          >
            View Event
          </button>
        </div>

        {/* Card 9 - Add Course/Event */}
        <div className="bg-white rounded-[14px] lg:w-[345px] h-[225px] items-center flex justify-center shadow-md shadow-[#00000040] p-6 hover:shadow-lg transition duration-300">
          <button
            onClick={() => navigate("/add-course-event")}
            className="text-[25px] font-[700] text-center"
          >
            Add Course/Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;