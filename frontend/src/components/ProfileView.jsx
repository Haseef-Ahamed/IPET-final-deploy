/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProfileView = ({ profileData }) => {
  const navigate = useNavigate();

  // Ensure profileData is defined
  if (!profileData) {
    return <div>Loading...</div>;
  }

  // Parse JSON fields
  const credits = JSON.parse(profileData.credits || "[]");
  const subjects = JSON.parse(profileData.subjects || "[]");
  const higherEducationInstitutes = JSON.parse(
    profileData.higher_education_institutes || "[]"
  );

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center p-20 mb-20">
          {/* Main Card */}
          <div className="max-w-[1366px] w-full bg-white shadow-xl rounded-lg p-24 flex flex-col md:flex-row gap-8">
            {/* Left Section - Profile Info */}
            <div className="md:w-[444px] flex flex-col items-center bg-gradient-to-b from-blue-100 to-purple-100 rounded-lg p-6 space-y-4 shadow-md">
              <div className="w-48 h-48 rounded-full overflow-hidden mt-10 mb-5 border-4 border-white shadow-lg">
                <img
                  src={profileData.profile_picture_path || "default-avatar.png"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-bold text-[#2543B1]">
                  {profileData.nameWithInitials}
                </h2>
                <p className="text-black font-semibold mb-3">
                  {profileData.designation || "Engineer"}
                </p>
              </div>

              <div className="text-center space-y-2">
                <p className="text-black font-semibold">{profileData.email}</p>
                <p className="text-black font-semibold">{profileData.mobile}</p>
              </div>
            </div>

            {/* Right Section - Experience & Education */}
            <div className="md:w-[628px] space-y-6">
              {/* Work Experience */}
              <div className="border rounded-lg p-6 bg-gradient-to-b from-blue-50 to-purple-50 shadow-md">
                <h3 className="text-xl font-semibold text-[#2543B1] mb-4">
                  Work Experiences
                </h3>
                <div className="space-y-4">
                  {profileData.training_experience &&
                    profileData.training_experience.map((experience, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-black font-medium">
                          {experience.periodOfWorkFrom} -{" "}
                          {experience.ongoing
                            ? "Ongoing"
                            : experience.periodOfWorkTo}
                        </span>
                        <span className="font-medium text-[#2543B1]">
                          {experience.positionHeld} at {experience.placeOfWork}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Educational Qualifications */}
              <div className="border rounded-lg p-6 bg-gradient-to-b from-blue-50 to-purple-50 shadow-md">
                <h3 className="text-xl font-semibold text-[#2543B1] mb-4">
                  Educational Qualifications
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-black">
                      GCE Advanced Level - {profileData.year}
                    </h4>
                    <div className="flex flex-wrap gap-4 mt-2">
                      {subjects.map((subject, index) => (
                        <div
                          key={index}
                          className="text-black font-medium bg-white p-2 rounded-lg shadow-sm"
                        >
                          <span>{subject}: </span>
                          <span className="font-bold text-[#2543B1]">
                            {credits[index]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Higher Education */}
              <div className="border rounded-lg p-6 bg-gradient-to-b from-blue-50 to-purple-50 shadow-md">
                <h3 className="text-xl font-semibold text-[#2543B1] mb-4">
                  Higher Education
                </h3>
                <div className="space-y-4">
                  {higherEducationInstitutes.map((institute, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg shadow-sm"
                    >
                      <h4 className="text-lg font-semibold text-black">
                        {institute.institutionName}
                      </h4>
                      <p className="text-black font-medium">
                        {institute.periodOfStudyFrom} - {institute.periodOfStudyTo}
                      </p>
                      {institute.qualifications.map((qualification, idx) => (
                        <div
                          key={idx}
                          className="text-black font-medium mt-2 bg-gray-50 p-2 rounded-lg"
                        >
                          <span>{qualification.name}: </span>
                          <span className="font-bold text-[#2543B1]">
                            {qualification.awardedYear}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center p-7 py-7 mb-20 md:hidden">
        <div className="max-w-full w-full bg-white shadow-xl rounded-lg p-8 flex flex-col md:flex-row gap-8">
          {/* Left Section - Profile Info */}
          <div className="max-w-full md:w-[444px] flex flex-col items-center bg-gradient-to-b from-blue-100 to-purple-100 rounded-lg p-6 space-y-4 shadow-md">
            <div className="w-48 h-48 rounded-full overflow-hidden mt-10 mb-5 border-4 border-white shadow-lg">
              <img
                src={profileData.profile_picture_path || "default-avatar.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-center">
              <h2 className="text-[20px] font-bold text-[#2543B1]">
                {profileData.nameWithInitials}
              </h2>
              <p className="text-black font-semibold text-[14px] mb-3">
                {profileData.designation || "Engineer"}
              </p>
            </div>

            <div className="text-center space-y-2 text-[14px]">
              <p className="text-black font-semibold">{profileData.email}</p>
              <p className="text-black font-semibold">{profileData.mobile}</p>
            </div>

            <div className="flex space-x-4">
              <a
                href="#"
                className="text-[#2543B1] hover:text-blue-700 transition-colors duration-300"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="#"
                className="text-[#2543B1] hover:text-blue-700 transition-colors duration-300"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="#"
                className="text-[#2543B1] hover:text-blue-700 transition-colors duration-300"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </div>

          {/* Right Section - Experience & Education */}
          <div className="md:w-[628px] space-y-6">
            {/* Work Experience */}
            <div className="border rounded-lg p-6 bg-gradient-to-b from-blue-50 to-purple-50 shadow-md">
              <h3 className="text-[18px] font-semibold text-[#2543B1] mb-4">
                Work Experiences
              </h3>
              <div className="space-y-4 text-[12px]">
                {profileData.training_experience &&
                  profileData.training_experience.map((experience, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-black font-medium">
                        {experience.periodOfWorkFrom} -{" "}
                        {experience.ongoing
                          ? "Ongoing"
                          : experience.periodOfWorkTo}
                      </span>
                      <span className="font-medium text-[#2543B1]">
                        {experience.positionHeld} at {experience.placeOfWork}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Educational Qualifications */}
            <div className="border rounded-lg p-6 bg-gradient-to-b from-blue-50 to-purple-50 shadow-md">
              <h3 className="text-[18px] font-semibold text-[#2543B1] mb-4">
                Educational Qualifications
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-[16px] font-semibold text-black">
                    GCE Advanced Level - {profileData.year}
                  </h4>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {subjects.map((subject, index) => (
                      <div
                        key={index}
                        className="text-black font-medium bg-white p-2 rounded-lg shadow-sm"
                      >
                        <span>{subject}: </span>
                        <span className="font-bold text-[#2543B1]">
                          {credits[index]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Higher Education */}
            <div className="border rounded-lg p-6 bg-gradient-to-b from-blue-50 to-purple-50 shadow-md">
              <h3 className="text-[18px] font-semibold text-[#2543B1] mb-4">
                Higher Education
              </h3>
              <div className="space-y-4">
                {higherEducationInstitutes.map((institute, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-sm"
                  >
                    <h4 className="text-[16px] font-semibold text-black">
                      {institute.institutionName}
                    </h4>
                    <p className="text-black font-medium">
                      {institute.periodOfStudyFrom} - {institute.periodOfStudyTo}
                    </p>
                    {institute.qualifications.map((qualification, idx) => (
                      <div
                        key={idx}
                        className="text-black font-medium mt-2 bg-gray-50 p-2 rounded-lg"
                      >
                        <span>{qualification.name}: </span>
                        <span className="font-bold text-[#2543B1]">
                          {qualification.awardedYear}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileView;