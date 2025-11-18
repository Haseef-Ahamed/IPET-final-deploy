import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'; // For making API requests

const UserProfile = ({ userType }) => {
  const navigate = useNavigate();
  const { userId } = useParams(); // Extract userId from URL params
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data based on userId
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user-details/${userId}`);
        setProfileData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleEdit = () => {
    navigate(`/personal-info/${userId}`, { state: { profileData } });
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // Parse subjects and credits from JSON strings to arrays
  const subjects = profileData.subjects ? JSON.parse(profileData.subjects) : [];
  const credits = profileData.credits ? JSON.parse(profileData.credits) : [];

  // Parse higher education institutes from JSON string to array
  const higherEducationInstitutes = profileData.higher_education_institutes ? JSON.parse(profileData.higher_education_institutes) : [];

  // Construct the full URL for the profile picture
  const profilePictureUrl = profileData.profile_picture_path || "/default-avatar.png";

  return (
    <div className="min-h-screen bg-gray-50 p-0 px-6 md:px-0 md:p-8 lg:p-12 ">
      <div className="max-w-7xl mx-auto md:mb-20 mb-28 md:mt-0 mt-10">
        {/* Edit Profile Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={handleEdit}
            className="bg-[#2D387D] text-white text-sm md:text-base px-4 py-2 md:px-6 md:py-3 rounded-md hover:bg-[#1a2359] transition-colors duration-300 flex items-center gap-2"
          >
            <svg className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Profile
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 bg-white rounded-lg shadow-lg p-6 md:p-8 lg:p-12">
          {/* Profile Info */}
          <div className="w-full lg:w-1/3 bg-[#E9ECF7] rounded-lg p-6 space-y-6">
            <div className="flex flex-col items-center">
              {/* Profile Picture */}
              <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden">
                <img
                  src={profilePictureUrl} // Use the constructed profile picture URL
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <div className="text-center mt-4">
                <h2 className="text-xl md:text-2xl font-bold text-[#2543B1]">
                  {profileData.nameWithInitials}
                </h2>
              </div>

              {/* Contact and Address Details */}
              <div className="space-y-2 mt-4">
                {/* Email */}
                <p className="text-sm md:text-base font-semibold text-gray-700 mt-4">
                  📧 {profileData.email}
                </p>

                {/* Mobile Number */}
                <p className="text-sm md:text-base font-semibold text-gray-700 mt-4">
                  📞 {profileData.mobileCode} {profileData.mobile}
                </p>

                {/* Date of Birth */}
                <p className="text-sm md:text-base font-semibold text-gray-700 mt-4">
                  🎂 {profileData.dob.substring(0, 10)}
                </p>

                {/* Address */}
                <div className="text-sm md:text-base font-semibold text-gray-700">
                  <p></p>
                  <p>🏠 {profileData.currentAddressLine1} {profileData.currentAddressLine2}, {profileData.currentCity}</p>
                </div>

                {/* Address */}
                <div className="text-sm md:text-base font-semibold text-gray-700">
                  <p></p>
                  <p>🏠 {profileData.currentProvince}, {profileData.currentCountry}</p>
                  <p></p>
                </div>
              </div>
            </div>
          </div>

          {/* Experience & Education */}
          <div className="w-full lg:w-2/3 space-y-6">
            {/* Work Experiences */}
            <div className="border rounded-lg p-6 bg-[#F9FAFB]">
              <h3 className="text-lg md:text-xl font-semibold text-[#2543B1] mb-4">
                Work Experiences
              </h3>
              <div className="space-y-4 text-sm md:text-base">
                {profileData.training_experience?.map((experience, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row justify-between gap-2 bg-white p-4 rounded-lg shadow-sm"
                  >
                    <span className="font-medium text-gray-700">
                      📅 {experience.periodOfWorkFrom} - {experience.periodOfWorkTo}
                    </span>
                    <span className="font-medium text-gray-700">
                      🏢 {experience.placeOfWork}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Qualifications */}
            <div className="border rounded-lg p-6 bg-[#F9FAFB]">
              <h3 className="text-lg md:text-xl font-semibold text-[#2543B1] mb-4">
                Education Qualifications
              </h3>
              <div className="space-y-2 text-sm md:text-base">
                <p className="font-medium text-gray-700">
                  🎓 {profileData.examination} ({profileData.year})
                </p>
              </div>

              {/* Higher Education Institutes */}
              <div className="mt-4">
                <h4 className="text-md font-semibold text-[#2543B1] mb-2">
                  Higher Education:
                </h4>
                {higherEducationInstitutes.map((institute, index) => (
                  <div key={index} className="mb-4">
                    <p className="text-sm md:text-base font-medium text-gray-700">
                      🏛️ Institution: {institute.institutionName} ({institute.periodOfStudyFrom} - {institute.periodOfStudyTo})
                    </p>
                    {institute.qualifications?.map((qualification, qIndex) => (
                      <p key={qIndex} className="text-sm md:text-base font-medium text-gray-700 mt-2">
                        🎓 Qualification: {qualification.name} (Awarded: {qualification.awardedYear})
                      </p>
                    ))}
                  </div>
                ))}
              </div>

              {/* Subjects and Grades */}
              <div className="mt-4">
                <h4 className="text-md font-semibold text-[#2543B1] mb-2">
                  Subjects and Grades:
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  {subjects.map((subject, index) => (
                    <li key={index} className="text-sm md:text-base font-medium text-gray-700">
                      📚 {subject}: {credits[index] || "N/A"}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Professional Memberships */}
            <div className="border rounded-lg p-6 bg-[#F9FAFB]">
              <h3 className="text-lg md:text-xl font-semibold text-[#2543B1] mb-4">
                Professional Memberships
              </h3>
              {profileData.professional_memberships?.length > 0 ? (
                <div className="space-y-4 text-sm md:text-base">
                  {profileData.professional_memberships.map((membership, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow-sm"
                    >
                      <span className="font-medium text-gray-700">
                        🏛️ Institution: {membership.institution}
                      </span>
                      <span className="font-medium text-gray-700">
                        🔢 Membership Number: {membership.membershipNumber}
                      </span>
                      <span className="font-medium text-gray-700">
                        📅 Joined Year: {membership.joinedYear}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm md:text-base font-medium text-gray-700">
                  No professional memberships found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;