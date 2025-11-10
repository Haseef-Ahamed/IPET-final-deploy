import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RegisteredUsers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [membershipNumber, setMembershipNumber] = useState("");
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

  // Filter users to display only those approved by at least 2 admins
  const approvedUsers = users.filter((user) => {
    const approvalCount = [
      user.admin1status,
      user.admin2status,
      user.admin3status,
      user.admin4status,
    ].filter((status) => status === "approved").length;

    return approvalCount >= 2;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = approvedUsers.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(approvedUsers.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleViewInfo = (user) => {
    navigate(`/personal-r/${user.id}`, { state: { userData: user } });
  };

  const handleDoubleClick = (userId) => {
    setEditingUserId(userId);
  };

  const handleMembershipNumberChange = (e) => {
    setMembershipNumber(e.target.value);
  };

  const handleKeyPress = (e, userId) => {
    if (e.key === "Enter") {
      handleSaveMembershipNumber(userId);
    }
  };

  const handleBlur = (userId) => {
    handleSaveMembershipNumber(userId);
  };

  const handleSaveMembershipNumber = async (userId) => {
    console.log("Saving membership number for user:", userId); // Debugging
    console.log("Membership number:", membershipNumber); // Debugging

    if (!membershipNumber) {
      alert("Please enter a membership number.");
      return;
    }

    try {
      const response = await fetch("http://72.60.42.161/api/assign-membership-number", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, membershipNumber }),
      });

      console.log("Response status:", response.status); // Debugging

      if (!response.ok) {
        throw new Error("Failed to assign membership number.");
      }

      const data = await response.json();
      console.log("Response data:", data); // Debugging
      alert(data.message);

      // Update the user list to reflect the new membership number
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, membership_number: membershipNumber } : user
        )
      );

      // Reset the editing state
      setEditingUserId(null);
      setMembershipNumber("");
    } catch (error) {
      console.error("Error assigning membership number:", error);
      alert("Failed to assign membership number.");
    }
  };

  return (
    <>
      {/* Desktop view */}
      <div className="container mx-auto lg:px-4 px-2 py-16 mb-20 lg:block hidden">
        <h1 className="text-4xl font-bold text-blue-600 text-center mb-8">
          Registered Users
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
                  Membership Number
                </th>
                <th className="px-6 py-3 border-b text-center text-sm font-semibold text-gray-700">
                  Status
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
                  <td
                    className="px-6 py-4 text-sm text-gray-900 border-r cursor-pointer"
                    onDoubleClick={() => handleDoubleClick(user.id)}
                  >
                    {editingUserId === user.id ? (
                      <input
                        type="text"
                        value={membershipNumber}
                        onChange={handleMembershipNumberChange}
                        onKeyPress={(e) => handleKeyPress(e, user.id)}
                        onBlur={() => handleBlur(user.id)}
                        className="border border-gray-300 rounded-md p-1 w-full"
                        autoFocus
                      />
                    ) : (
                      user.membership_number || "Double-click to add"
                    )}
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

      {/* Mobile view */}
      <div className="container mx-auto px-4 py-8 mb-20 lg:hidden block">
        <h1 className="text-2xl font-bold text-blue-600 text-center mb-6">
          Registered Users
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
                <strong>Date:</strong> {user.dob.substring(0, 10)}
              </div>
              <div
                className="text-sm text-gray-900 cursor-pointer"
                onDoubleClick={() => handleDoubleClick(user.id)}
              >
                <strong>Membership Number:</strong>{" "}
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    value={membershipNumber}
                    onChange={handleMembershipNumberChange}
                    onKeyPress={(e) => handleKeyPress(e, user.id)}
                    onBlur={() => handleBlur(user.id)}
                    className="border border-gray-300 rounded-md p-1 mt-1 w-full"
                    autoFocus
                  />
                ) : (
                  user.membership_number || "Double-tap to add"
                )}
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

export default RegisteredUsers;