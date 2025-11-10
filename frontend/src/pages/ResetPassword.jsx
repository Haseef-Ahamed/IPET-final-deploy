import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UserBackground from '../assets/skyscrapers-sunset.jpg'; // Import the background image

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(`https://ipetlogin-ke28wtsvb-dineshs-projects-1830e570.vercel.app/api/user/reset-password/${token}`, {
        password,
      });

      if (response.data.success) {
        setMessage("Password has been reset successfully.");
        setError("");
        setTimeout(() => navigate("/login"), 3000); // Redirect to login after 3 seconds
      } else {
        setError("Failed to reset password. Please try again.");
        setMessage("");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to reset password. Please try again.");
      setMessage("");
    }
  };

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:block">
        <div
          style={{
            backgroundImage: 'url("https://www.ipet.lk/assets/skyscrapers-sunset-CK4hRmNk.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "5rem",
            paddingBottom: "10rem",
          }}
        >
          <div className="w-full max-w-3xl p-12 space-y-12 bg-[#E9ECF7] rounded-lg shadow-md">
            <div className="space-y-4 text-center">
              <h1 className="text-3xl font-semibold text-[#2543B1]">Reset Password</h1>
              <p className="text-base text-[#2D387D]">Enter your new password.</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-3">
                <label htmlFor="password" className="block text-base font-medium text-[#2D387D]">
                  New Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border bg-[#E9ECF7] border-[#2543B1] rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
              </div>

              <div className="space-y-3">
                <label htmlFor="confirmPassword" className="block text-base font-medium text-[#2D387D]">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 border bg-[#E9ECF7] border-[#2543B1] rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
              </div>

              {message && <p className="text-green-500 text-sm">{message}</p>}
              {error && <p className="text-red-500 text-sm">{error}</p>}

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

      {/* Mobile View */}
      <div className="md:hidden">
        <div
          style={{
            backgroundImage: 'url("https://www.ipet.lk/assets/skyscrapers-sunset-CK4hRmNk.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <div className="w-full max-w-md p-8 space-y-8 bg-[#E9ECF7] rounded-lg shadow-md">
            <div className="space-y-4 text-center">
              <h1 className="text-2xl font-semibold text-[#2543B1]">Reset Password</h1>
              <p className="text-sm text-[#2D387D]">Enter your new password.</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-3">
                <label htmlFor="password" className="block text-sm font-medium text-[#2D387D]">
                  New Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border bg-[#E9ECF7] border-[#2543B1] rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
              </div>

              <div className="space-y-3">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#2D387D]">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 border bg-[#E9ECF7] border-[#2543B1] rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
              </div>

              {message && <p className="text-green-500 text-sm">{message}</p>}
              {error && <p className="text-red-500 text-sm">{error}</p>}

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
    </>
  );
};

export default ResetPassword;