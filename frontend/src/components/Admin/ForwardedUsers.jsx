import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Function to format admin names (e.g., "admin3" -> "Admin 3")
const formatAdminName = (admin) => {
  const adminNumber = admin.replace("admin", "");
  return `Admin ${adminNumber}`;
};

const ForwardUsers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [currentTabAdmin, setCurrentTabAdmin] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch all users from the backend API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://72.60.42.161/api/user-details");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();

        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("Fetched data is not an array:", data);
          setUsers([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  // Get the current tab's admin
  useEffect(() => {
    const getCurrentTabAdmin = () => {
      const tabId = sessionStorage.getItem('tabId');
      if (!tabId) {
        console.error("No tab ID found");
        return null;
      }

      // Try to get admin from sessionStorage first (tab-specific)
      const tabAdmin = sessionStorage.getItem(`loggedInAdmin_${tabId}`);
      if (tabAdmin) {
        return tabAdmin;
      }

      // Check active sessions in localStorage as fallback
      const activeSessions = JSON.parse(localStorage.getItem('activeAdminSessions') || '{}');
      return activeSessions[tabId] || null;
    };

    const admin = getCurrentTabAdmin();
    setCurrentTabAdmin(admin);
    console.log(`Current tab admin: ${admin}`);

    // Set up interval to check for admin changes
    const checkAdminInterval = setInterval(() => {
      const newAdmin = getCurrentTabAdmin();
      if (newAdmin !== currentTabAdmin) {
        setCurrentTabAdmin(newAdmin);
      }
    }, 1000); // Check every second

    return () => clearInterval(checkAdminInterval);
  }, [currentTabAdmin]);

  // Function to handle viewing user info
  const handleViewInfo = (user) => {
    navigate(`/personal-r/${user.id}`, { 
      state: { 
        userData: user,
        currentTabAdmin: currentTabAdmin // Pass the current tab's admin
      } 
    });
  };

  // Filter users to display only those where the current tab's admin is in forwarded_admins
  const filteredUsers = users.filter((user) => {
    const forwardedAdmins = user.forwarded_admins ? JSON.parse(user.forwarded_admins) : [];
    return forwardedAdmins.includes(currentTabAdmin);
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredUsers.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      {/* Desktop View */}
      <div className="container mx-auto lg:px-4 px-2 py-16 mb-16 lg:block hidden">
        <h1 className="text-4xl font-bold text-[#0051FF] text-center mb-8">
          Forwarded Users {currentTabAdmin && `- ${formatAdminName(currentTabAdmin)}`}
        </h1>

        <div className="overflow-x-auto lg:p-0 p-6 bg-white">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-200 text-center">
                <th className="px-6 py-3 text-center border-b border-r text-sm font-semibold text-gray-700">
                  User Id
                </th>
                <th className="px-6 py-3 border-b border-r text-center text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-6 py-3 border-b border-r text-center text-sm font-semibold text-gray-700">
                  Email Address
                </th>
                <th className="px-6 py-3 border-b border-r text-center text-sm font-semibold text-gray-700">
                  NIC No
                </th>
                <th className="px-6 py-3 border-b border-r text-center text-sm font-semibold text-gray-700">
                  Date
                </th>
                <th className="px-6 py-3 border-b border-r text-center text-sm font-semibold text-gray-700">
                  Forwarded To
                </th>
                <th className="px-6 py-3 border-b text-center text-sm font-semibold text-gray-700">
                  Info
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentUsers.map((user, index) => (
                <ForwardedUserRow
                  key={index}
                  user={user}
                  currentTabAdmin={currentTabAdmin}
                  handleViewInfo={handleViewInfo}
                />
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination for Desktop */}
        <div className="flex justify-center mt-4">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`px-4 py-2 mx-1 rounded ${
                currentPage === number ? "bg-[#0051FF] text-white" : "bg-gray-200 text-gray-700"
              } hover:bg-blue-600 hover:text-white transition-colors`}
            >
              {number}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile View */}
      <div className="container mx-auto px-4 py-8 mb-20 lg:hidden block">
        <h1 className="text-2xl font-bold text-[#0051FF] text-center mb-6">
          Forwarded Users {currentTabAdmin && `- ${formatAdminName(currentTabAdmin)}`}
        </h1>
        <div className="space-y-4">
          {currentUsers.map((user, index) => {
            const forwardedAdmins = user.forwarded_admins ? JSON.parse(user.forwarded_admins) : [];
            const receivedAdmins = user.received_admins ? JSON.parse(user.received_admins) : [];
            const filteredReceivedAdmins = forwardedAdmins.includes(currentTabAdmin)
              ? receivedAdmins
              : [];

            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <div className="text-sm text-gray-900">
                  <strong>User ID:</strong> {user.id}
                </div>
                <div className="text-sm text-gray-900">
                  <strong>Name:</strong> {user.nameWithInitials}
                </div>
                <div className="text-sm text-gray-900">
                  <strong>Email:</strong> {user.email}
                </div>
                <div className="text-sm text-gray-900">
                  <strong>NIC No:</strong> {user.nic}
                </div>
                <div className="text-sm text-gray-900">
                  <strong>Date:</strong> {user.dob.substring(0, 10)}
                </div>
                <div className="text-sm text-gray-900">
                  <strong>Forwarded To:</strong>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {filteredReceivedAdmins.map((admin, adminIndex) => (
                      <span
                        key={adminIndex}
                        className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full"
                      >
                        {formatAdminName(admin)}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => handleViewInfo(user)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-semibold w-full transition-colors"
                  >
                    View Info
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {/* Pagination for Mobile */}
        <div className="flex justify-center mt-4">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`px-4 py-2 mx-1 rounded ${
                currentPage === number ? "bg-[#0051FF] text-white" : "bg-gray-200 text-gray-700"
              } hover:bg-blue-600 hover:text-white transition-colors`}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

// Component for a single row in the desktop table
const ForwardedUserRow = ({ user, currentTabAdmin, handleViewInfo }) => {
  // Parse forwarded_admins and received_admins from the user object
  const forwardedAdmins = user.forwarded_admins ? JSON.parse(user.forwarded_admins) : [];
  const receivedAdmins = user.received_admins ? JSON.parse(user.received_admins) : [];

  // Filter received_admins to show only those where the current tab's admin is in forwarded_admins
  const filteredReceivedAdmins = forwardedAdmins.includes(currentTabAdmin)
    ? receivedAdmins
    : [];

  return (
    <tr className="hover:bg-gray-50 text-center">
      <td className="px-6 py-4 text-sm text-gray-900 border-r">{user.id}</td>
      <td className="px-6 py-4 text-sm text-gray-900 border-r">
        {user.nameWithInitials}
      </td>
      <td className="px-6 py-4 text-sm text-gray-900 border-r">{user.email}</td>
      <td className="px-6 py-4 text-sm text-gray-900 border-r">{user.nic}</td>
      <td className="px-6 py-4 text-sm text-gray-900 border-r">
        {user.dob.substring(0, 10)}
      </td>
      <td className="px-6 py-4 text-sm text-gray-900 border-r">
        <div className="flex flex-wrap gap-2 justify-center">
          {filteredReceivedAdmins.map((admin, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full"
            >
              {formatAdminName(admin)}
            </span>
          ))}
        </div>
      </td>
      <td className="px-6 py-4">
        <button
          onClick={() => handleViewInfo(user)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md text-[18px] font-[600] transition-colors"
        >
          Info
        </button>
      </td>
    </tr>
  );
};

export default ForwardUsers;