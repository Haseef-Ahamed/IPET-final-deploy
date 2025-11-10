/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
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

        // Ensure the fetched data is an array
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("Fetched data is not an array:", data);
          setUsers([]); // Set users to an empty array if data is not an array
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]); // Set users to an empty array in case of an error
      }
    };

    fetchUsers();
  }, []);

  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(users.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      {/* Desktop View */}
      <div className="container mx-auto lg:px-0 px-2 py-16 mb-16 lg:block hidden">
        <h1 className="text-4xl font-bold text-[#0051FF] text-center mb-8">
          All Users
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
                  DOB
                </th>
                <th className="px-6 py-3 border-b border-r text-center text-sm font-semibold text-gray-700">
                  Admin 1
                </th>
                <th className="px-6 py-3 border-b border-r text-center text-sm font-semibold text-gray-700">
                  Admin 2
                </th>
                <th className="px-6 py-3 border-b border-r text-center text-sm font-semibold text-gray-700">
                  Admin 3
                </th>
                <th className="px-6 py-3 border-b border-r text-center text-sm font-semibold text-gray-700">
                  Admin 4
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentUsers.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50 text-center">
                  <td className="px-6 py-4 text-sm text-gray-900 border-r">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border-r">
                    {user.nameWithInitials}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border-r">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border-r">
                    {user.nic}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border-r">
                    {user.dob.substring(0, 10)}
                  </td>
                  <td className="px-6 py-4 border-r">
                    <button
                      className={`px-4 py-1 rounded-md text-[15px] font-[600] transition-colors ${
                        user.admin1status === "approved"
                          ? "bg-green-500 hover:bg-green-600"
                          : user.admin1status === "rejected"
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-[#2a3990] hover:bg-[#1a276f]"
                      } text-white`}
                    >
                      {capitalizeFirstLetter(user.admin1status)}
                    </button>
                  </td>
                  <td className="px-6 py-4 border-r">
                    <button
                      className={`px-4 py-1 rounded-md text-[15px] font-[600] transition-colors ${
                        user.admin2status === "approved"
                          ? "bg-green-500 hover:bg-green-600"
                          : user.admin2status === "rejected"
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-[#2a3990] hover:bg-[#1a276f]"
                      } text-white`}
                    >
                      {capitalizeFirstLetter(user.admin2status)}
                    </button>
                  </td>
                  <td className="px-6 py-4 border-r">
                    <button
                      className={`px-4 py-1 rounded-md text-[15px] font-[600] transition-colors ${
                        user.admin3status === "approved"
                          ? "bg-green-500 hover:bg-green-600"
                          : user.admin3status === "rejected"
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-[#2a3990] hover:bg-[#1a276f]"
                      } text-white`}
                    >
                      {capitalizeFirstLetter(user.admin3status || "pending")}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className={`px-4 py-1 rounded-md text-[15px] font-[600] transition-colors ${
                        user.admin4status === "approved"
                          ? "bg-green-500 hover:bg-green-600"
                          : user.admin4status === "rejected"
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-[#2a3990] hover:bg-[#1a276f]"
                      } text-white`}
                    >
                      {capitalizeFirstLetter(user.admin4status || "pending")}
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
          All Users
        </h1>
        <div className="space-y-4">
          {currentUsers.map((user, index) => (
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
                <strong>DOB:</strong> {user.dob.substring(0, 10)}
              </div>
              <div className="text-sm text-gray-900">
                <strong>Admin 1 Status:</strong>{" "}
                <span
                  className={`inline-block px-2 py-1 rounded-md text-sm font-semibold ${
                    user.admin1status === "approved"
                      ? "bg-green-500 text-white"
                      : user.admin1status === "rejected"
                      ? "bg-red-500 text-white"
                      : "bg-[#2a3990] text-white"
                  }`}
                >
                  {capitalizeFirstLetter(user.admin1status)}
                </span>
              </div>
              <div className="text-sm text-gray-900">
                <strong>Admin 2 Status:</strong>{" "}
                <span
                  className={`inline-block px-2 py-1 rounded-md text-sm font-semibold ${
                    user.admin2status === "approved"
                      ? "bg-green-500 text-white"
                      : user.admin2status === "rejected"
                      ? "bg-red-500 text-white"
                      : "bg-[#2a3990] text-white"
                  }`}
                >
                  {capitalizeFirstLetter(user.admin2status)}
                </span>
              </div>
              <div className="text-sm text-gray-900">
                <strong>Admin 3 Status:</strong>{" "}
                <span
                  className={`inline-block px-2 py-1 rounded-md text-sm font-semibold ${
                    user.admin3status === "approved"
                      ? "bg-green-500 text-white"
                      : user.admin3status === "rejected"
                      ? "bg-red-500 text-white"
                      : "bg-[#2a3990] text-white"
                  }`}
                >
                  {capitalizeFirstLetter(user.admin3status || "pending")}
                </span>
              </div>
              <div className="text-sm text-gray-900">
                <strong>Admin 4 Status:</strong>{" "}
                <span
                  className={`inline-block px-2 py-1 rounded-md text-sm font-semibold ${
                    user.admin4status === "approved"
                      ? "bg-green-500 text-white"
                      : user.admin4status === "rejected"
                      ? "bg-red-500 text-white"
                      : "bg-[#2a3990] text-white"
                  }`}
                >
                  {capitalizeFirstLetter(user.admin4status || "pending")}
                </span>
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

export default AllUsers;