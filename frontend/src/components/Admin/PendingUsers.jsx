import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PendingUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loggedInAdmin, setLoggedInAdmin] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Retrieve the logged-in admin's username from localStorage
  useEffect(() => {
    const admin = localStorage.getItem("loggedInAdmin");
    if (admin) {
      setLoggedInAdmin(admin); // Set the logged-in admin's username
    }
  }, []);

  // Fetch pending users from the backend API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/pending-users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Filter users where all 4 admin statuses are "pending"
  const pendingUsers = users.filter((user) => {
    return (
      user.admin1status === "pending" &&
      user.admin2status === "pending" &&
      user.admin3status === "pending" &&
      user.admin4status === "pending"
    );
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = pendingUsers.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(pendingUsers.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleViewInfo = (user) => {
    navigate("/personal", { state: { userData: user } });
  };

  const handleViewInfoR = (user) => {
    navigate(`/personal-r/${user.idNo}`); // Navigate to /personal-r with userId
  };

  // Function to format the date
  const formatDate = (dateString) => {
    return dateString.split("T")[0]; // Extract the date part before "T"
  };

  return (
    <>
      {/* Desktop View */}
      <div className="container mx-auto lg:px-4 px-2 py-16 mb-16 lg:block hidden">
        <h1 className="text-4xl font-bold text-[#0051FF] text-center mb-8">
          Pending Users
        </h1>

        <div className="overflow-x-auto lg:p-0 p-6 bg-white">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-200 text-center">
                <th className="px-6 py-3 text-center border-b border-r text-sm font-semibold text-gray-700">
                  Id No
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
                  Date of Birth
                </th>
                <th className="px-6 py-3 border-b border-r text-center text-sm font-semibold text-gray-700">
                  Info
                </th>
                <th className="px-6 py-3 border-b border-r text-center text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentUsers.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50 text-center">
                  <td className="px-6 py-4 text-sm text-gray-900 border-r">
                    {user.idNo}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border-r">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border-r">
                    {user.emailAddress}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border-r">
                    {user.nicNo}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border-r">
                    {formatDate(user.dob)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border-r">
                    <div
                      className="bg-[#0051FF] hover:bg-blue-600 text-white px-4 py-1 rounded-md text-[16px] font-[600] transition-colors"
                    >
                      Pending
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border-r">  
                    <button
                      onClick={() => handleViewInfoR(user)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md text-[16px] font-[600] transition-colors"
                    >
                      Info
                    </button>
                  </td>
                </tr>
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
          Pending Users
        </h1>
        <div className="space-y-4">
          {currentUsers.map((user, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <div className="text-sm text-gray-900">
                <strong>ID No:</strong> {user.idNo}
              </div>
              <div className="text-sm text-gray-900">
                <strong>Name:</strong> {user.name}
              </div>
              <div className="text-sm text-gray-900">
                <strong>Email:</strong> {user.emailAddress}
              </div>
              <div className="text-sm text-gray-900">
                <strong>NIC No:</strong> {user.nicNo}
              </div>
              <div className="text-sm text-gray-900">
                <strong>Date of Birth:</strong> {formatDate(user.dob)}
              </div>
              <div className="text-sm text-gray-900">
                <strong>Status:</strong>{" "}
                <span
                  className="bg-[#0051FF] text-white px-2 py-1 rounded-md text-sm font-semibold"
                >
                  Pending
                </span>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => handleViewInfoR(user)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-semibold w-full transition-colors"
                >
                  View Info
                </button>
              </div>
            </div>
          ))}
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

export default PendingUsers;