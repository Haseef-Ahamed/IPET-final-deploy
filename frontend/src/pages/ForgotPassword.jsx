import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserBackground from '../assets/skyscrapers-sunset.jpg'; // Import the background image

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/user/forgot-password", {
        email,
      });

      if (response.data.success) {
        setMessage("Password reset link has been sent to your email.");
        setError("");
      } else {
        setError("Failed to send reset link. Please try again.");
        setMessage("");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to send reset link. Please try again.");
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
            paddingBottom: "5rem",
          }}
        >
          <div className="w-full max-w-3xl p-12 space-y-12 bg-[#E9ECF7] rounded-lg shadow-md">
            <div className="space-y-4 text-center">
              <h1 className="text-3xl font-semibold text-[#2543B1]">Forgot Password</h1>
              <p className="text-base text-[#2D387D]">
                Enter your email to receive a password reset link.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-3">
                <label htmlFor="email" className="block text-base font-medium text-[#2D387D]">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                Send Reset Link
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-blue-600 hover:underline"
                >
                  Back to Login
                </button>
              </div>
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            paddingBottom:'8rem'
          }}
        >
          <div className="w-full max-w-md p-8 space-y-8 bg-[#E9ECF7] rounded-lg shadow-md">
            <div className="space-y-4 text-center">
              <h1 className="text-2xl font-semibold text-[#2543B1]">Forgot Password</h1>
              <p className="text-sm text-[#2D387D]">
                Enter your email to receive a password reset link.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-3">
                <label htmlFor="email" className="block text-sm font-medium text-[#2D387D]">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                Send Reset Link
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-blue-600 hover:underline"
                >
                  Back to Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;