import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showVerificationField, setShowVerificationField] = useState(false);
  const [verificationId, setVerificationId] = useState("");
  const [verificationError, setVerificationError] = useState("");

  useEffect(() => {
    const tabId = sessionStorage.getItem("tabId") || crypto.randomUUID();
    sessionStorage.setItem("tabId", tabId);
    console.log("AdminLogin: Initialized tabId", tabId);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("AdminLogin: Attempting login", { username });

    if (!username || !password) {
      console.error("AdminLogin: Missing username or password");
      setError("Username and password are required.");
      return;
    }

    try {
      const response = await axios.post("http://72.60.42.161/api/admin/login", {
        username,
        password,
      });

      console.log("AdminLogin: Login response", response.data);

      if (response.data.success) {
        const { token, username: responseUsername, adminId } = response.data;
        const tabId = sessionStorage.getItem("tabId");

        console.log("AdminLogin: Storing token and admin info", { token, username: responseUsername, adminId, tabId });

        sessionStorage.setItem(`adminToken_${tabId}`, token);
        sessionStorage.setItem(`loggedInAdmin_${tabId}`, responseUsername);
        localStorage.setItem(`loggedInAdmin_${tabId}`, responseUsername);

        const activeSessions = JSON.parse(localStorage.getItem("activeAdminSessions") || "{}");
        activeSessions[tabId] = responseUsername;
        localStorage.setItem("activeAdminSessions", JSON.stringify(activeSessions));

        login(token, responseUsername);
        console.log("AdminLogin: Navigating to admin-dashboard");
        navigate("/admin-dashboard");
      }
    } catch (err) {
      console.error("AdminLogin: Login error", err.response?.data || err.message);
      setError(err.response?.data?.error || "Failed to login. Please try again.");
    }
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      const tabId = sessionStorage.getItem("tabId");
      if (tabId) {
        console.log("AdminLogin: Cleaning up session for tab", tabId);
        const activeSessions = JSON.parse(localStorage.getItem("activeAdminSessions") || "{}");
        delete activeSessions[tabId];
        localStorage.setItem("activeAdminSessions", JSON.stringify(activeSessions));
        sessionStorage.removeItem(`loggedInAdmin_${tabId}`);
        sessionStorage.removeItem(`adminToken_${tabId}`);
        localStorage.removeItem(`loggedInAdmin_${tabId}`);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const getCurrentAdmin = () => {
    const tabId = sessionStorage.getItem("tabId");
    const currentAdmin = sessionStorage.getItem(`loggedInAdmin_${tabId}`);
    console.log("AdminLogin: Getting current admin", { tabId, currentAdmin });
    return currentAdmin;
  };

  const handleForgotPassword = () => {
    console.log("AdminLogin: Forgot password clicked");
    setShowVerificationField(true);
  };

  const handleVerification = () => {
    console.log("AdminLogin: Verifying ID", { verificationId });
    const hardcodedVerificationId = "ADMIN2025@";
    if (verificationId === hardcodedVerificationId) {
      console.log("AdminLogin: Verification successful, navigating to forgot-password");
      navigate("/admin-forgot-password");
    } else {
      console.error("AdminLogin: Invalid verification ID");
      setVerificationError("Invalid verification ID");
    }
  };

  return (
    // JSX remains unchanged
    <>
      <div
        style={{
          backgroundImage: 'url("https://www.ipet.lk/assets/building-DIQFAFtg.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          justifyContent: "center",
          padding: "1rem",
          paddingBottom: "8rem",
          paddingTop: "3rem",
        }}
      >
        <div className="w-full max-w-3xl p-6 md:p-12 space-y-6 bg-[#E9ECF7] rounded-lg shadow-md">
          <div className="space-y-4 text-center">
            <h1 className="text-3xl font-semibold text-[#2543B1]">
              Admin Login
            </h1>
            <p className="text-base text-[#2D387D]">
              If you are already a member, sign in here
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-3">
              <label
                htmlFor="username"
                className="block text-base font-medium text-[#2D387D]"
              >
                User Name
              </label>
              <div className="relative">
                <select
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none pr-10 w-full p-3 border bg-[#E9ECF7] border-[#2543B1] rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
                <span className="absolute inset-y-0 flex items-center pointer-events-none right-3">
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

            <div className="space-y-3">
              <label
                htmlFor="password"
                className="block text-base font-medium text-[#2D387D]"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-[#2D387D] bg-[#E9ECF7] rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full bg-[#2D387D] text-white py-3 rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </button>

            <div className="space-y-6 text-left">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="block text-base text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>

              {showVerificationField && (
                <div className="space-y-3">
                  <label
                    htmlFor="verificationId"
                    className="block text-base font-medium text-[#2D387D]"
                  >
                    Verification ID
                  </label>
                  <div className="relative">
                    <input
                      id="verificationId"
                      type="password"
                      value={verificationId}
                      onChange={(e) => setVerificationId(e.target.value)}
                      className="w-full p-3 border border-[#2D387D] bg-[#E9ECF7] rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Enter Verification ID"
                      required
                    />
                  </div>
                  {verificationError && (
                    <p className="text-sm text-red-500">{verificationError}</p>
                  )}
                  <button
                    type="button"
                    onClick={handleVerification}
                    className="w-full py-3 text-white bg-blue-400 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Verify
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;