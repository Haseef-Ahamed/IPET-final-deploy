/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProfileView = ({ profileData }) => {
  const navigate = useNavigate();

  // Set page title to "My Profile" and restore on unmount
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "My Profile";

    // Cleanup: restore title when leaving the page
    return () => {
      document.title = previousTitle;
    };
  }, []);

  // Safety check
  if (!profileData) {
    return <div className="text-center py-10">Loading...</div>;
  }

  // Parse JSON fields safely
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
          <div className="max-w-[1366px] w-full bg-white shadow-xl rounded-lg p-24 flex flex-col md:flex-row gap-8">
            {/* Left Section */}
            <div className="md:w-[444px] flex flex-col items-center bg-gradient-to-b from-blue-100 to-purple-100 rounded-lg p-6 space-y-4 shadow-md">
              <div className="w-48 h-48 rounded-full overflow-hidden mt-10 mb-5 border-4 border-white shadow-lg">
                <img
                  src={profileData.profile_picture_path || "default-avatar.png"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150?text=Profile";
                  }}
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

            {/* Right Section */}
            <div className="md:w-[628px] space-y-6">
              {/* Work Experience */}
              <div className="border rounded-lg p-6 bg-gradient-to-b from-blue-50 to-purple-50 shadow-md">
                <h3 className="text-xl font-semibold text-[#2543B1] mb-4">
                  Work Experiences
                </h3>
                <div className="space-y-4">
                  {profileData.training_experience?.length > 0 ? (
                    profileData.training_experience.map((exp, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-black font-medium">
                          {exp.periodOfWorkFrom} -{" "}
                          {exp.ongoing ? "Ongoing" : exp.periodOfWorkTo}
                        </span>
                        <span className="font-medium text-[#2543B1]">
                          {exp.positionHeld} at {exp.placeOfWork}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">No experience listed.</p>
                  )}
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
                      GCE Advanced Level - {profileData.year || "N/A"}
                    </h4>
                    <div className="flex flex-wrap gap-3 mt-3">
                      {subjects.length > 0 ? (
                        subjects.map((subject, i) => (
                          <div
                            key={i}
                            className="bg-white px-3 py-1 rounded-lg shadow-sm text-sm"
                          >
                            <span className="font-medium">{subject}:</span>{" "}
                            <span className="font-bold text-[#2543B1]">
                              {credits[i] || "N/A"}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 italic">No subjects listed.</p>
                      )}
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
                  {higherEducationInstitutes.length > 0 ? (
                    higherEducationInstitutes.map((inst, i) => (
                      <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="text-lg font-semibold text-black">
                          {inst.institutionName}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {inst.periodOfStudyFrom} – {inst.periodOfStudyTo}
                        </p>
                        {inst.qualifications?.length > 0 ? (
                          inst.qualifications.map((q, idx) => (
                            <div
                              key={idx}
                              className="mt-2 p-2 bg-gray-50 rounded text-sm"
                            >
                              <span className="font-medium">{q.name}:</span>{" "}
                              <span className="font-bold text-[#2543B1]">
                                {q.awardedYear}
                              </span>
                            </div>
                          ))
                        ) : (
                          <p className="text-xs text-gray-500 italic mt-1">
                            No qualifications listed.
                          </p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">No higher education listed.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-6 py-10">
        <div className="bg-white shadow-xl rounded-lg p-6 space-y-6">
          {/* Profile Info */}
          <div className="flex flex-col items-center bg-gradient-to-b from-blue-100 to-purple-100 rounded-lg p-6 space-y-4">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img
                src={profileData.profile_picture_path || "default-avatar.png"}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/120?text=Profile";
                }}
              />
            </div>
            <h2 className="text-xl font-bold text-[#2543B1]">
              {profileData.nameWithInitials}
            </h2>
            <p className="text-sm font-semibold text-black">
              {profileData.designation || "Engineer"}
            </p>
            <div className="text-center space-y-1 text-sm">
              <p className="font-medium">{profileData.email}</p>
              <p className="font-medium">{profileData.mobile}</p>
            </div>
            <div className="flex space-x-4 mt-3">
              <a href="#" className="text-[#2543B1] hover:text-blue-700">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-[#2543B1] hover:text-blue-700">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-[#2543B1] hover:text-blue-700">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Work Experience */}
          <div className="p-4 bg-gradient-to-b from-blue-50 to-purple-50 rounded-lg">
            <h3 className="text-lg font-semibold text-[#2543B1] mb-3">
              Work Experiences
            </h3>
            {profileData.training_experience?.length > 0 ? (
              profileData.training_experience.map((exp, i) => (
                <div key={i} className="text-xs mb-2 flex justify-between">
                  <span>{exp.periodOfWorkFrom} - {exp.ongoing ? "Ongoing" : exp.periodOfWorkTo}</span>
                  <span className="text-[#2543B1] font-medium">
                    {exp.positionHeld} @ {exp.placeOfWork}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-500 italic">No experience listed.</p>
            )}
          </div>

          {/* A/L */}
          <div className="p-4 bg-gradient-to-b from-blue-50 to-purple-50 rounded-lg">
            <h3 className="text-lg font-semibold text-[#2543B1] mb-3">
              GCE A/L - {profileData.year || "N/A"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {subjects.length > 0 ? (
                subjects.map((s, i) => (
                  <div
                    key={i}
                    className="bg-white px-2 py-1 rounded text-xs shadow-sm"
                  >
                    <strong>{s}:</strong> <span className="text-[#2543B1]">{credits[i]}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-500 italic">No subjects.</p>
              )}
            </div>
          </div>

          {/* Higher Education */}
          <div className="p-4 bg-gradient-to-b from-blue-50 to-purple-50 rounded-lg">
            <h3 className="text-lg font-semibold text-[#2543B1] mb-3">
              Higher Education
            </h3>
            {higherEducationInstitutes.length > 0 ? (
              higherEducationInstitutes.map((inst, i) => (
                <div key={i} className="bg-white p-3 rounded shadow-sm mb-3 text-xs">
                  <h4 className="font-semibold">{inst.institutionName}</h4>
                  <p className="text-gray-600">
                    {inst.periodOfStudyFrom} – {inst.periodOfStudyTo}
                  </p>
                  {inst.qualifications?.map((q, idx) => (
                    <div key={idx} className="mt-1 p-1 bg-gray-50 rounded">
                      {q.name}: <strong className="text-[#2543B1]">{q.awardedYear}</strong>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-500 italic">No higher education.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileView;