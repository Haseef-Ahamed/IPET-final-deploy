import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:5000/api/admin/forgot-password", {
        username,
        email,
      });
  
      if (response.data.message) {
        setSuccess(response.data.message);
        setError("");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to send reset link. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div>
      <div
        style={{
          backgroundImage: 'url("https://www.ipet.lk/assets/building-DIQFAFtg.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "auto",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1rem",
          position: "relative",
          paddingBottom: "8rem"
        }}
      >
        <div className="w-full max-w-3xl p-4 md:p-12 space-y-8 md:space-y-12 bg-[#E9ECF7] rounded-lg shadow-md">
          <div className="space-y-4 text-center">
            <h1 className="text-2xl md:text-3xl font-semibold text-[#2543B1]">
              Forgot Password
            </h1>
            <p className="text-sm md:text-base text-[#2D387D]">
              Enter your username and email to receive a reset link.
            </p>
          </div>

          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2 md:space-y-3">
              <label
                htmlFor="username"
                className="block text-sm md:text-base font-medium text-[#2D387D]"
              >
                User Name
              </label>
              <div className="relative">
                <select
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none pr-10 w-full p-2.5 md:p-3 border bg-[#E9ECF7] border-[#2543B1] rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                >
                  <option value="" disabled>
                    Select Admin
                  </option>
                  <option value="admin1">admin1</option>
                  <option value="admin2">admin2</option>
                  <option value="admin3">admin3</option>
                  <option value="admin4">admin4</option>
                </select>
                <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#2D387D]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="space-y-2 md:space-y-3">
              <label
                htmlFor="email"
                className="block text-sm md:text-base font-medium text-[#2D387D]"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 md:p-3 border border-[#2D387D] bg-[#E9ECF7] rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}

            <button
              type="submit"
              className="w-full bg-[#2D387D] text-white py-2.5 md:py-3 rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;