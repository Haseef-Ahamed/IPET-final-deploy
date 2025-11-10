import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AdminBackground from '../../assets/admin-background.jpeg'; // Import the background image

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams(); // Get reset token from URL params

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Send the new password and reset token to the backend
      const response = await axios.post("http://72.60.42.161/api/admin/reset-password", {
        token,
        password,
      });

      if (response.data.success) {
        setSuccess("Password reset successfully!");
        setError("");
        setTimeout(() => navigate("/admin-login"), 2000); // Redirect to login after success
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="hidden md:block">
      {/* Apply background image using inline styles */}
      <div
        style={{
          backgroundImage: 'url("https://www.ipet.lk/assets/building.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "auto",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "5rem",
          paddingBottom: "11rem",
          position: "relative"
        }}
      >
        <div className="w-full max-w-3xl p-12 space-y-12 bg-[#E9ECF7] rounded-lg shadow-md">
          <div className="space-y-4 text-center">
            <h1 className="text-3xl font-semibold text-[#2543B1]">
              Reset Password
            </h1>
            <p className="text-base text-[#2D387D]">
              Enter a new password for your account.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-3">
              <label
                htmlFor="password"
                className="block text-base font-medium text-[#2D387D]"
              >
                New Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-[#2D387D] bg-[#E9ECF7] rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              />
            </div>

            <div className="space-y-3">
              <label
                htmlFor="confirmPassword"
                className="block text-base font-medium text-[#2D387D]"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-[#2D387D] bg-[#E9ECF7] rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}

            <button
              type="submit"
              className="w-full bg-[#2D387D] text-white py-3 rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;