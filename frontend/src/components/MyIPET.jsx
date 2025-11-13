/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import member1 from "../assets/Member1.svg";
import member2 from "../assets/Member2.svg";
import member3 from "../assets/Member3.svg";
import member4 from "../assets/Member4.svg";
// import { teamMembers } from '../components/TeamMembers';

const MyIPET = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    registrationId: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // const user = teamMembers[credentials.registrationId];
    const user = teamMembers.find(
      (member) =>
        member.registrationId === credentials.registrationId &&
        member.password === credentials.password
    );

    if (user) {
      sessionStorage.setItem("userType", user.type);
      sessionStorage.setItem(
        "userProfile",
        JSON.stringify({
          ...user,
          photoUrl: user.image, // Ensure photoUrl is set
          title: user.position,
        })
      );

      // Navigate based on user type
      switch (user.type) {
        case "admin":
          navigate("/admin-dashboard");
          break;
        case "user":
          navigate("/user");
          break;
        case "guest-user":
          navigate("/guest-user");
          break;
        default:
          navigate("/");
      }
    } else {
      alert("Invalid credentials");
    }
  };

  const teamMembers = [
    {
      registrationId: "1",
      type: "user",
      password: "user123",
      name: "HON. DR. NADEESH PERERA",
      position: "CEO at Training Authority",
      location: "Sri Lanka",
      image: member1,
      photoUrl: member1,
      email: "nadeesh@example.com",
      phone: "+94 123 456 789",
      duration1: "2019 - Present",
      duration2: "2020 - Present",
      companyName1: "Senior Engineer - ABC Company",
      companyName2: "Engineer - ABC Company",
      education: "BEng.(Hons) Civil Engineering - University of Moratuwa",
      engineeringProjects: "Construction Project 01 - Colombo",
      title: "CEO at Training Authority",
    },
    {
      registrationId: "2",
      type: "user",
      password: "user123",
      name: "HON. DR. NADEESH PERERA",
      position: "CEO at Training Authority",
      location: "Sri Lanka",
      image: member2,
      photoUrl: member2,
      email: "nadeesh@example.com",
      phone: "+94 123 456 789",
      duration1: "2019 - Present",
      duration2: "2020 - Present",
      companyName1: "Senior Engineer - ABC Company",
      companyName2: "Engineer - ABC Company",
      education: "BEng.(Hons) Civil Engineering - University of Moratuwa",
      engineeringProjects: "Construction Project 01 - Colombo",
      title: "CEO at Training Authority",
    },
    {
      registrationId: "3",
      type: "guest-user",
      password: "guest123",
      name: "HON. DR. NADEESH PERERA",
      position: "CEO at Training Authority",
      location: "Sri Lanka",
      image: member3,
      photoUrl: member3,
      email: "nadeesh@example.com",
      phone: "+94 123 456 789",
      duration1: "2019 - Present",
      duration2: "2020 - Present",
      companyName1: "Senior Engineer - ABC Company",
      companyName2: "Engineer - ABC Company",
      education: "BEng.(Hons) Civil Engineering - University of Moratuwa",
      engineeringProjects: "Construction Project 01 - Colombo",
      title: "CEO at Training Authority",
    },
    {
      registrationId: "4",
      type: "guest-user",
      password: "guest123",
      name: "HON. DR. NADEESH PERERA",
      position: "CEO at Training Authority",
      location: "Sri Lanka",
      image: member4,
      photoUrl: member4,
      email: "nadeesh@example.com",
      phone: "+94 123 456 789",
      duration1: "2019 - Present",
      duration2: "2020 - Present",
      companyName1: "Senior Engineer - ABC Company",
      companyName2: "Engineer - ABC Company",
      education: "BEng.(Hons) Civil Engineering - University of Moratuwa",
      engineeringProjects: "Construction Project 01 - Colombo",
      title: "CEO at Training Authority",
    },
    {
      registrationId: "5",
      type: "user",
      password: "user123",
      name: "HON. DR. NADEESH PERERA",
      position: "CEO at Training Authority",
      location: "Sri Lanka",
      image: member2,
      photoUrl: member2,
      email: "nadeesh@example.com",
      phone: "+94 123 456 789",
      duration1: "2019 - Present",
      duration2: "2020 - Present",
      companyName1: "Senior Engineer - ABC Company",
      companyName2: "Engineer - ABC Company",
      education: "BEng.(Hons) Civil Engineering - University of Moratuwa",
      engineeringProjects: "Construction Project 01 - Colombo",
      title: "CEO at Training Authority",
    },
    {
      registrationId: "6",
      type: "user",
      password: "user123",
      name: "HON. DR. NADEESH PERERA",
      position: "CEO at Training Authority",
      location: "Sri Lanka",
      image: member3,
      photoUrl: member3,
      email: "nadeesh@example.com",
      phone: "+94 123 456 789",
      duration1: "2019 - Present",
      duration2: "2020 - Present",
      companyName1: "Senior Engineer - ABC Company",
      companyName2: "Engineer - ABC Company",
      education: "BEng.(Hons) Civil Engineering - University of Moratuwa",
      engineeringProjects: "Construction Project 01 - Colombo",
      title: "CEO at Training Authority",
    },
    {
      registrationId: "7",
      type: "guest-user",
      password: "guest123",
      name: "HON. DR. NADEESH PERERA",
      position: "CEO at Training Authority",
      location: "Sri Lanka",
      image: member4,
      photoUrl: member4,
      email: "nadeesh@example.com",
      phone: "+94 123 456 789",
      duration1: "2019 - Present",
      duration2: "2020 - Present",
      companyName1: "Senior Engineer - ABC Company",
      companyName2: "Engineer - ABC Company",
      education: "BEng.(Hons) Civil Engineering - University of Moratuwa",
      engineeringProjects: "Construction Project 01 - Colombo",
      title: "CEO at Training Authority",
    },
  ];

  return (
    <>
      <div className="hidden md:block">
        <div className="min-h-screen flex items-center justify-center bg-white pt-20 mb-40 ">
          <div className="w-full max-w-3xl p-12 space-y-12 bg-[#E9ECF7] rounded-lg shadow-md">
            <div className="space-y-4 text-center">
              <h1 className="text-5xl font-semibold text-[#2543B1]">
                My iPET
              </h1>
              <p className="text-base text-[#2D387D]">
                If you are already a member, sign in here
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-3">
                <label
                  htmlFor="registrationId"
                  className="block text-base font-medium text-[#2D387D]"
                >
                  ID Number
                </label>
                <div className="relative">
                  <input
                    id="registrationId"
                    type="text"
                    value={credentials.registrationId}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        registrationId: e.target.value,
                      })
                    }
                    className="pr-10 w-full p-3 border bg-[#E9ECF7] border-[#2543B1] rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        password: e.target.value,
                      })
                    }
                    className="pr-10 w-full p-3 border border-[#2D387D] bg-[#E9ECF7] rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
                <input
                  type="checkbox"
                  id="remember"
                  className="appearance-none cursor-pointer checked:bg-[#2D387D] h-5 w-5 border-2 border-[#2D387D] bg-[#E9ECF7] text-[#2D387D]  focus:ring-[#2D387D] focus:ring-offset-0"
                  required
                />
                <label
                  htmlFor="remember"
                  className="text-base font-medium text-[#2D387D]"
                >
                  Remember Me
                </label>
              </div>

              <button
                // onClick={() => navigate("/admin-dashboard")}
                type="submit"
                className="w-full bg-[#2D387D] text-white py-3 rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Login
              </button>

              <div className="text-left space-y-6">
                <a
                  href="#"
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
      </div>

      {/* Mobile view */}

      <div className=" md:hidden">
        <div className="min-h-screen flex items-center justify-center bg-white pt-20 mb-40 ">
          <div className="w-[380px] max-w-3xl p-12 space-y-8 bg-[#E9ECF7] rounded-lg shadow-md">
            <div className="space-y-4 text-center">
              <h1 className="text-[16px] font-semibold text-[#2543B1]">
                Registered Engineers Login
              </h1>
              <p className="text-[12px] text-[#2D387D]">
                If you are already a member, sign in here
              </p>
            </div>

            <form className="space-y-6 -ml-6" onSubmit={handleSubmit}>
              <div className="space-y-3">
                <label
                  htmlFor="registrationId"
                  className="block text-[12px] font-medium text-[#2D387D]"
                >
                  ID Number
                </label>
                <div className="relative">
                  <input
                    id="registrationId"
                    type="text"
                    value={credentials.registrationId}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        registrationId: e.target.value,
                      })
                    }
                    className="pr-5 w-[330px] h-[39px] text-[10px] p-3 border  bg-[#E9ECF7] border-[#2543B1] rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
                  htmlFor="password"
                  className="block text-[12px] font-medium text-[#2D387D]"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        password: e.target.value,
                      })
                    }
                    className="pr-5 w-[330px] h-[39px] text-[10px] p-3 border border-[#2D387D] bg-[#E9ECF7] rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
                <input
                  type="checkbox"
                  id="remember"
                  className="appearance-none cursor-pointer checked:bg-[#2D387D] h-4 w-4 border-2 border-[#2D387D] bg-[#E9ECF7] text-[#2D387D]  focus:ring-[#2D387D] focus:ring-offset-0"
                />
                <label
                  htmlFor="remember"
                  className="text-[12px] font-medium text-[#2D387D]"
                >
                  Remember Me
                </label>
              </div>

              <button
                type="submit"
                className="pr-5 w-[330px] h-[39px] text-[14px] bg-[#2D387D] text-white py-2 rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Login
              </button>

              <div className="text-left space-y-6">
                <a
                  href="#"
                  className="block text-[12px] text-blue-600 hover:underline"
                >
                  Forgot Password?
                </a>

                <div className="text-[12px] text-center text-gray-600">
                  If you are not a member
                  <br />
                  <button
                    type="button"
                    onClick={() => navigate("/admin-dashboard")}
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
    </>
  );
};

export default MyIPET;
