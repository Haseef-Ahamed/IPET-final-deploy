import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie library for cookie management

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <LoginForm setIsLogin={setIsLogin} />
  );
};

const LoginForm = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const [membershipNumber, setMembershipNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Check for saved cookies on component mount
  useEffect(() => {
    const savedMembershipNumber = Cookies.get("membershipNumber");
    if (savedMembershipNumber) {
      setMembershipNumber(savedMembershipNumber);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the backend
      const response = await axios.post("http://localhost:5000/api/user/login", {
        membershipNumber,
        password,
      });

      if (response.data.success) {
        // Successful login
        const userId = response.data.userId;
        
        // Store data in localStorage
        localStorage.setItem("loggedInUser", membershipNumber);
        localStorage.setItem("userId", userId);
        
        // If remember me is checked, store in cookies (expire in 30 days)
        if (rememberMe) {
          Cookies.set("membershipNumber", membershipNumber, { expires: 30 });
          Cookies.set("userId", userId, { expires: 30 });
        } else {
          // Clear any existing cookies if remember me is unchecked
          Cookies.remove("membershipNumber");
          Cookies.remove("userId");
        }
        
        navigate(`/user/${userId}`);
      } else {
        setError("Invalid membership number or password");
      }
    } catch (error) {
    console.error("Login error:", error);

    // ✅ Check if backend sent a specific error message
    if (error.response && error.response.data && error.response.data.error) {
      setError(error.response.data.error);
    } else {
      setError("Failed to login. Please try again.");
    }
  }
  };

  return (
    <div
      style={{
        backgroundImage: 'url("https://www.ipet.lk/assets/skyscrapers-sunset-CK4hRmNk.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        paddingTop: "2rem",
        paddingBottom: "8rem",
      }}
    >
      {/* Desktop view */}
      <div className="hidden md:block">
        <div className="w-[700px] max-w-4xl p-12 space-y-12 bg-[#E9ECF7] rounded-lg shadow-md">
          <div className="space-y-4 text-center">
            <h1 className="text-3xl font-semibold text-[#2543B1]">
              iPET Login
            </h1>
            <p className="text-base text-[#2D387D]">
              If you are already a member, sign in here
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-3">
              <label
                htmlFor="membershipNumber"
                className="block text-base font-medium text-[#2D387D]"
              >
                Membership Number
              </label>
              <div className="relative">
                <input
                  id="membershipNumber"
                  type="text"
                  value={membershipNumber}
                  onChange={(e) => setMembershipNumber(e.target.value)}
                  className="pr-10 w-full p-3 border bg-[#E9ECF7] border-[#2543B1] rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
                <span className="absolute inset-y-0 right-3 flex items-center text-[#2D387D]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
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
                  className="pr-10 w-full p-3 border border-[#2D387D] bg-[#E9ECF7] rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
                <span className="absolute inset-y-0 right-3 flex items-center text-[#2D387D]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="relative">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="appearance-none cursor-pointer h-5 w-5 border-2 border-[#2D387D] bg-[#E9ECF7] rounded-sm focus:ring-[#2D387D] focus:ring-offset-0"
                />
                {rememberMe && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mb-1 text-purple-900"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <label
                htmlFor="remember"
                className="text-base font-medium text-[#2D387D]"
              >
                Remember Me
              </label>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-[#2D387D] text-white py-3 rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </button>

            <div className="text-left space-y-6">
              <a
                href="#"
                onClick={() => navigate("/forgot-password")}
                className="block text-base text-blue-600 hover:underline"
              >
                Forgot Password?
              </a>

              <div className="text-base text-center text-gray-600">
                If you are not a member
                <br />
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="text-blue-600 hover:underline ml-1"
                >
                  Register Here
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Mobile view */}
      <div className="md:hidden">
        <div className="w-[380px] max-w-3xl p-12 space-y-8 bg-[#E9ECF7] rounded-lg shadow-md">
          <div className="space-y-4 text-center">
            <h1 className="text-[16px] font-semibold text-[#2543B1]">
              iPET Login
            </h1>
            <p className="text-[12px] text-[#2D387D]">
              If you are already a member, sign in here
            </p>
          </div>

          <form className="space-y-6 -ml-6" onSubmit={handleLogin}>
            <div className="space-y-3">
              <label
                htmlFor="membershipNumber-mobile"
                className="block text-[12px] font-medium text-[#2D387D]"
              >
                Membership Number
              </label>
              <div className="relative">
                <input
                  id="membershipNumber-mobile"
                  type="text"
                  value={membershipNumber}
                  onChange={(e) => setMembershipNumber(e.target.value)}
                  className="pr-5 w-[330px] h-[39px] text-[10px] p-3 border bg-[#E9ECF7] border-[#2543B1] rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
                <span className="absolute inset-y-0 right-0 flex items-center text-[#2D387D]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <label
                htmlFor="password-mobile"
                className="block text-[12px] font-medium text-[#2D387D]"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password-mobile"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-5 w-[330px] h-[39px] text-[10px] p-3 border border-[#2D387D] bg-[#E9ECF7] rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
                <span className="absolute inset-y-0 right-0 flex items-center text-[#2D387D]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="relative">
                <input
                  type="checkbox"
                  id="remember-mobile"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="appearance-none cursor-pointer h-4 w-4 border-2 border-[#2D387D] bg-[#E9ECF7] rounded-sm focus:ring-[#2D387D] focus:ring-offset-0"
                />
                {rememberMe && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mb-1 text-purple-900"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <label
                htmlFor="remember-mobile"
                className="text-[12px] font-medium text-[#2D387D]"
              >
                Remember Me
              </label>
            </div>
            
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="pr-5 w-[330px] h-[39px] text-[14px] bg-[#2D387D] text-white py-2 rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </button>

            <div className="text-left space-y-6">
              <a
                href="/forgot-password"
                className="block text-[12px] text-blue-600 hover:underline"
              >
                Forgot Password?
              </a>

              <div className="text-[12px] text-center text-gray-600">
                If you are not a member
                <br />
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="text-blue-600 hover:underline ml-1"
                >
                  Register Here
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;