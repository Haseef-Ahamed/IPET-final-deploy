import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import Swal from "sweetalert2";

const AcadmicQualificationEditForm = () => {
  const [formData, setFormData] = useState({
    examination: "GCE Advanced Level",
    year: "",
    subjects: [],
    credits: [],
    al_certificate_path: "",
    higherEducationInstitutes: [
      {
        periodOfStudyFrom: "",
        periodOfStudyTo: "",
        institutionName: "",
        institutionType: "university",
        qualifications: [],
        certificatePath: "",
      },
    ],
    profile_picture_path: "", // Added to store profile picture
  });
  const [errors, setErrors] = useState({});
  const [fileErrors, setFileErrors] = useState({});
  const { userId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Academic Qualifications");

  // Define tabs for desktop and mobile
  const tabs = [
    "Personal Information",
    "Academic Qualifications",
    "Training & Experience",
    "Professional Memberships",
  ];
  const mobileTabs = ["Academic Qualifications"];

  // Fetch existing data when the component mounts
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user-details/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user details.");
        }
        const userData = await response.json();

        // Parse JSON fields if they are stored as strings
        const parsedUserData = {
          ...userData,
          subjects: userData.subjects ? JSON.parse(userData.subjects) : [],
          credits: userData.credits ? JSON.parse(userData.credits) : [],
          higherEducationInstitutes: userData.higher_education_institutes
            ? JSON.parse(userData.higher_education_institutes)
            : [
                {
                  periodOfStudyFrom: "",
                  periodOfStudyTo: "",
                  institutionName: "",
                  institutionType: "university",
                  qualifications: [],
                  certificatePath: "",
                },
              ],
          al_certificate_path: userData.al_certificate_path || "",
          isAlCompleted: userData.is_al_completed === 1,
          profile_picture_path: userData.profile_picture_path || "", // Added
        };

        console.log("Fetched User Data:", parsedUserData); // Debugging
        setFormData(parsedUserData);
      } catch (error) {
        console.error("Error fetching user details:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch user details. Please try again.",
          confirmButtonColor: "#2A3990",
        });
      }
    };

    fetchUserDetails();
  }, [userId]);

  // Handle navigation tab clicks
  const handleStepClick = (tabName) => {
    setActiveTab(tabName);
    switch (tabName) {
      case "Personal Information":
        navigate(`/personal-info/${userId}`);
        break;
      case "Academic Qualifications":
        navigate(`/acadamic-info/${userId}`);
        break;
      case "Training & Experience":
        navigate(`/training-info/${userId}`);
        break;
      case "Professional Memberships":
        navigate(`/memberships-info/${userId}`);
        break;
      default:
        break;
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleHigherEducationChange = (index, field, value) => {
    const newHigherEducationInstitutes = [...formData.higherEducationInstitutes];
    newHigherEducationInstitutes[index][field] = value;

    // If "Ongoing" is checked, set periodOfStudyTo to "Ongoing"
    if (field === "periodOfStudyTo" && value === "Ongoing") {
      newHigherEducationInstitutes[index].periodOfStudyTo = "Ongoing";
    }

    setFormData({
      ...formData,
      higherEducationInstitutes: newHigherEducationInstitutes,
    });
  };

  // Handle qualification changes
  const handleQualificationChange = (instituteIndex, qIndex, field, value) => {
    const newInstitutes = [...formData.higherEducationInstitutes];
    const newQuals = [...newInstitutes[instituteIndex].qualifications];
    newQuals[qIndex][field] = value;
    newInstitutes[instituteIndex].qualifications = newQuals;
    setFormData({ ...formData, higherEducationInstitutes: newInstitutes });
  };

  // Add a new higher education institute
  const addHigherEducationInstitute = () => {
    setFormData({
      ...formData,
      higherEducationInstitutes: [
        ...formData.higherEducationInstitutes,
        {
          periodOfStudyFrom: "",
          periodOfStudyTo: "",
          institutionName: "",
          institutionType: "university",
          qualifications: [],
          certificatePath: "",
        },
      ],
    });
  };

  // Remove a higher education institute
  const removeHigherEducationInstitute = (index) => {
    const newHigherEducationInstitutes = [...formData.higherEducationInstitutes];
    newHigherEducationInstitutes.splice(index, 1);
    setFormData({
      ...formData,
      higherEducationInstitutes: newHigherEducationInstitutes,
    });
  };

  // Add a new qualification to a higher education institute
  const addQualification = (index) => {
    const newInstitutes = [...formData.higherEducationInstitutes];
    newInstitutes[index].qualifications.push({ name: "", awardedYear: "" });
    setFormData({ ...formData, higherEducationInstitutes: newInstitutes });
  };

  // Remove a qualification from a higher education institute
  const removeQualification = (instituteIndex, qIndex) => {
    const newInstitutes = [...formData.higherEducationInstitutes];
    newInstitutes[instituteIndex].qualifications.splice(qIndex, 1);
    setFormData({ ...formData, higherEducationInstitutes: newInstitutes });
  };

  // Handle file uploads
  const handleFileChange = async (e, type, index) => {
    const file = e.target.files[0];
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    const errorKey = type === "alCertificate" ? "alCertificate" : `higherEducationCertificate-${index}`;

    if (file) {
      if (!allowedTypes.includes(file.type)) {
        setFileErrors((prev) => ({
          ...prev,
          [errorKey]: "Please upload PDF or Image files only (PDF, JPEG, PNG).",
        }));
        return;
      }

      if (file.size > maxSize) {
        setFileErrors((prev) => ({ ...prev, [errorKey]: "File size should be less than 5MB." }));
        return;
      }

      if (file.size === 0) {
        setFileErrors((prev) => ({
          ...prev,
          [errorKey]: "Selected file is empty. Please upload a valid file.",
        }));
        return;
      }

      // Create a new FormData instance
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      try {
        let uploadEndpoint = "";
        if (type === "alCertificate") {
          uploadEndpoint = "http://localhost:5000/api/upload/al-certificate";
        } else if (type === "higherEducationCertificate") {
          uploadEndpoint = "http://localhost:5000/api/upload/higher-education-certificate";
        }

        console.log("Uploading to:", uploadEndpoint, "File:", file.name, "Size:", file.size);

        const response = await fetch(uploadEndpoint, {
          method: "POST",
          body: uploadFormData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to upload file.");
        }

        const result = await response.json();
        const filePath = result.filePath;

        if (type === "alCertificate") {
          setFormData((prevData) => ({
            ...prevData,
            al_certificate_path: filePath,
          }));
        } else if (type === "higherEducationCertificate") {
          setFormData((prevData) => {
            const updatedInstitutes = [...prevData.higherEducationInstitutes];
            if (updatedInstitutes[index]) {
              updatedInstitutes[index] = {
                ...updatedInstitutes[index],
                certificatePath: filePath,
              };
            }
            return {
              ...prevData,
              higherEducationInstitutes: updatedInstitutes,
            };
          });
        }

        setFileErrors((prev) => ({ ...prev, [errorKey]: "" }));
      } catch (error) {
        console.error("Error uploading file:", error);
        setFileErrors((prev) => ({
          ...prev,
          [errorKey]: error.message || "Failed to upload file. Please try again.",
        }));
      }
    }
  };

  // Validate the form
  const validateForm = () => {
    const newErrors = {};

    if (formData.isAlCompleted) {
      if (!formData.year) newErrors.year = "Year is required.";
      if (!formData.subjects.some((subject) => subject !== ""))
        newErrors.subjects = "At least one subject is required.";
      if (!formData.credits.some((credit) => credit !== ""))
        newErrors.credits = "At least one credit is required.";
    }

    formData.higherEducationInstitutes.forEach((institute, index) => {
      if (!institute.periodOfStudyFrom)
        newErrors[`periodOfStudyFrom-${index}`] = "Period of study (from) is required.";
      if (!institute.periodOfStudyTo)
        newErrors[`periodOfStudyTo-${index}`] = "Period of study (to) is required.";
      if (!institute.institutionName)
        newErrors[`institutionName-${index}`] = "Institution name is required.";
      if (!institute.qualifications.length)
        newErrors[`qualifications-${index}`] = "At least one qualification is required.";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Prepare the data to send
      const dataToSend = {
        id: userId,
        examination: formData.examination,
        year: formData.year,
        subjects: formData.subjects,
        credits: formData.credits,
        isAlCompleted: formData.isAlCompleted ? 1 : 0,
        alCertificatePath: formData.al_certificate_path,
        higherEducationInstitutes: formData.higherEducationInstitutes,
      };

      // Send the updated data to the backend
      const response = await fetch("http://localhost:5000/api/register/academic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error("Failed to update academic qualifications.");
      }

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Academic qualifications updated successfully!",
        confirmButtonColor: "#2A3990",
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to update academic qualifications.",
        confirmButtonColor: "#2A3990",
      });
    }
  };

  // List of GCE AL subjects
  const gceAlSubjects = [
    "Accounting",
    "Agricultural Science",
    "Arabic",
    "Art",
    "Bio Resource Technology",
    "Bio Systems Technology",
    "Biology",
    "Buddhism",
    "Buddhist Civilization",
    "Business Statistics",
    "Business Studies",
    "Carnatic Music",
    "Chemistry",
    "Chinese",
    "Christian Civilization",
    "Christianity",
    "Civil Technology",
    "Combined Mathematics",
    "Common General Test",
    "Communication & Media Studies",
    "Dancing (Bharatha)",
    "Dancing (Indigenous)",
    "Drama & Theatre (English)",
    "Drama & Theatre (Sinhala)",
    "Drama & Theatre (Tamil)",
    "Economics",
    "Electrical, Electronic and Information Technology",
    "Engineering Technology",
    "English",
    "Food Technology",
    "French",
    "General English",
    "Geography",
    "German",
    "Greek and Roman Civilization",
    "Higher Mathematics",
    "Hindi",
    "Hindu Civilization",
    "Hinduism",
    "History of Europe",
    "History of India",
    "History of Modern World",
    "Home Economics",
    "Information & Communication Technology",
    "Islamic Civilization",
    "Islam",
    "Japanese",
    "Korean",
    "Logic & Scientific Method",
    "Malay",
    "Mathematics",
    "Mechanical Technology",
    "Oriental Music",
    "Pali",
    "Physics",
    "Political Science",
    "Russian",
    "Sanskrit",
    "Science for Technology",
    "Sinhala",
    "Tamil",
    "Western Music",
  ];

  const sriLankanUniversities = [
    "University of Colombo",
    "University of Peradeniya",
    "University of Sri Jayewardenepura",
    "University of Kelaniya",
    "University of Moratuwa",
    "University of Jaffna",
    "University of Ruhuna",
    "Eastern University, Sri Lanka",
    "South Eastern University of Sri Lanka",
    "Rajarata University of Sri Lanka",
    "Sabaragamuwa University of Sri Lanka",
    "Wayamba University of Sri Lanka",
    "Uva Wellassa University of Sri Lanka",
    "Open University of Sri Lanka",
    "Sri Lanka Institute of Information Technology (SLIIT)",
    "General Sir John Kotelawala Defence University",
    "Buddhist and Pali University of Sri Lanka",
    "University of the Visual & Performing Arts",
    "Gampaha Wickramarachchi University of Indigenous Medicine",
    "University of Vocational Technology",
    "National School of Business Management",
    "Sri Lanka Institute of Advanced Technological Education (SLIATE)",
    "Ocean University of Sri Lanka",
    "University of Vavuniya",
    "University of Colombo School of Computing (UCSC)",
    "IESL College of Engineering",
  ];

  // Get the list of available subjects for a specific dropdown
  const getAvailableSubjects = (currentIndex) => {
    return gceAlSubjects.filter(
      (subject) => !formData.subjects.includes(subject) || formData.subjects[currentIndex] === subject
    );
  };

  // Generate years for dropdowns
  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 1950; year--) {
      years.push(year);
    }
    return years;
  };

  return (
    <div className="bg-[#D9D9D9] lg:py-4 py-6 lg:px-6 px-4">
      <div className="max-w-[1360px] mx-auto lg:bg-white lg:px-8 lg:py-6 py-4 rounded-lg">
        {/* Profile Picture (Mobile: Top Center) */}
        <div className="lg:hidden flex justify-center mb-6">
          <div className="w-[88px] h-[90px] bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
            {formData.profile_picture_path ? (
              <img
                src={formData.profile_picture_path}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/150";
                }}
              />
            ) : (
              <svg
                width="88"
                height="90"
                viewBox="0 0 153 142"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse cx="76.5" cy="74" rx="76.5" ry="78" fill="#D9D9D9" />
                <path
                  d="M76 70.5C69.5375 70.5 64.0052 68.3214 59.4031 63.9641C54.801 59.6068 52.5 54.3687 52.5 48.25C52.5 42.1313 54.801 36.8932 59.4031 32.5359C64.0052 28.1786 69.5375 26 76 26C82.4625 26 87.9948 28.1786 92.5969 32.5359C97.199 36.8932 99.5 42.1313 99.5 48.25C99.5 54.3687 97.199 59.6068 92.5969 63.9641C87.9948 68.3214 82.4625 70.5 76 70.5ZM29 115V99.425C29 96.2729 29.8578 93.3767 31.5733 90.7364C33.2888 88.096 35.5643 86.0787 38.4 84.6844C44.4708 81.8104 50.6396 79.6559 56.9062 78.2207C63.1729 76.7856 69.5375 76.0662 76 76.0625C82.4625 76.0588 88.8271 76.7782 95.0937 78.2207C101.36 79.6633 107.529 81.8178 113.6 84.6844C116.44 86.075 118.717 88.0923 120.433 90.7364C122.148 93.3804 123.004 96.2766 123 99.425V115H29Z"
                  fill="black"
                />
              </svg>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="relative mb-8">
          <div className="max-w-7xl mx-auto">
            <div className="relative flex items-center justify-start lg:gap-4">
              {(window.innerWidth < 1024 ? mobileTabs : tabs).map((tabName) => (
                <button
                  key={tabName}
                  onClick={() => handleStepClick(tabName)}
                  className={`relative py-2 px-4 h-[48px] sm:h-[56px] text-[14px] sm:text-[16px] font-[500] rounded-md transition-colors ${
                    window.innerWidth < 1024
                      ? "w-full text-center bg-[#2A3990] text-white"
                      : activeTab === tabName
                      ? "bg-[#2A3990] text-white px-6"
                      : "text-gray-700 hover:bg-gray-200 px-6"
                  }`}
                  disabled={window.innerWidth < 1024 && tabName !== "Academic Qualifications"}
                >
                  {tabName}
                  {activeTab === tabName && (
                    <div className="absolute -bottom-[8px] left-1/2 transform -translate-x-1/2">
                      <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#2A3990]"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#2A3990]"></div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* GCE Advanced Level Section */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-[18px] sm:text-[20px] font-[700] mb-6 text-[#2A3990]">
              GCE Advanced Level
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                  Examination <span className="text-red-500">*</span>
                </label>
                <select
                  name="examination"
                  value={formData.examination}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                  disabled={!formData.isAlCompleted}
                >
                  <option>GCE Advanced Level</option>
                </select>
              </div>
              <div>
                <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                  Year <span className="text-red-500">*</span>
                </label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                  required={formData.isAlCompleted}
                  disabled={!formData.isAlCompleted}
                >
                  <option value="">Select Year</option>
                  {generateYears().map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                {errors.year && <p className="text-red-500 text-[14px] mt-1">{errors.year}</p>}
              </div>
            </div>

            {/* Subjects and Credits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                  Subjects <span className="text-red-500">*</span>
                </label>
                {Array(4)
                  .fill(null)
                  .map((_, index) => (
                    <div key={`subject-${index}`} className="mb-4">
                      <select
                        value={formData.subjects[index] || ""}
                        onChange={(e) => {
                          const newSubjects = [...formData.subjects];
                          newSubjects[index] = e.target.value;
                          setFormData({ ...formData, subjects: newSubjects });
                        }}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                        required={formData.isAlCompleted}
                        disabled={!formData.isAlCompleted}
                      >
                        <option value="">Select Subject</option>
                        {getAvailableSubjects(index).map((subject, idx) => (
                          <option key={idx} value={subject}>
                            {subject}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                {errors.subjects && (
                  <p className="text-red-500 text-[14px] mt-1">{errors.subjects}</p>
                )}
              </div>

              <div>
                <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                  Credits <span className="text-red-500">*</span>
                </label>
                {Array(4)
                  .fill(null)
                  .map((_, index) => (
                    <div key={`credit-${index}`} className="mb-4">
                      <select
                        value={formData.credits[index] || ""}
                        onChange={(e) => {
                          const newCredits = [...formData.credits];
                          newCredits[index] = e.target.value;
                          setFormData({ ...formData, credits: newCredits });
                        }}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                        required={formData.isAlCompleted}
                        disabled={!formData.isAlCompleted}
                      >
                        <option value="">Select Credit</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="S">S</option>
                        <option value="F">F</option>
                        <option value="Absent">Absent</option>
                      </select>
                    </div>
                  ))}
                {errors.credits && (
                  <p className="text-red-500 text-[14px] mt-1">{errors.credits}</p>
                )}
              </div>
            </div>

            {/* AL Certificate Upload */}
            <div className="mt-6">
              <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                Upload AL Certificate <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                id="alCertificateInput"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileChange(e, "alCertificate")}
              />
              <button
                type="button"
                onClick={() => document.getElementById("alCertificateInput").click()}
                className="w-full sm:w-[160px] px-4 py-2 text-[14px] sm:text-[16px] font-[600] rounded-md bg-[#2A3990] text-white hover:bg-[#1b2142] transition-colors"
                disabled={!formData.isAlCompleted}
              >
                Browse...
              </button>
              {formData.al_certificate_path && (
                <div className="mt-2 text-[14px] text-gray-600">
                  <a
                    href={`http://localhost:5000/api/download-al-certificate/${userId}`}
                    download={`al_certificate_${userId}.pdf`}
                    className="text-[#2A3990] hover:underline"
                  >
                    {formData.al_certificate_path.split("/").pop()}
                  </a>
                </div>
              )}
              {fileErrors.alCertificate && (
                <p className="text-red-500 text-[14px] mt-1">{fileErrors.alCertificate}</p>
              )}
            </div>

            {/* Didn't Complete A/L Checkbox */}
            <div className="mt-4">
              <label className="flex items-center text-[16px] font-[600] text-gray-700 space-x-2">
                <input
                  type="checkbox"
                  checked={!formData.isAlCompleted}
                  onChange={(e) =>
                    setFormData({ ...formData, isAlCompleted: !e.target.checked })
                  }
                  className="rounded"
                />
                <span>Didn't Complete A/L</span>
              </label>
            </div>
          </div>

          {/* Higher Education Section */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
            <h2 className="text-[18px] sm:text-[20px] font-[700] mb-6 text-[#2A3990]">
              Higher Education
            </h2>
            {formData.higherEducationInstitutes.map((institute, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 sm:p-6 rounded-lg border border-gray-200 mb-6"
              >
                <h3 className="text-[16px] font-[600] text-gray-700 mb-4">
                  Higher Education {index + 1}
                </h3>
                <div className="space-y-4">
                  {/* Period of Study */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                        Period Of Study (From) <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={institute.periodOfStudyFrom}
                        onChange={(e) =>
                          handleHigherEducationChange(index, "periodOfStudyFrom", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                        required
                      >
                        <option value="">Select Year</option>
                        {generateYears().map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                      {errors[`periodOfStudyFrom-${index}`] && (
                        <p className="text-red-500 text-[14px] mt-1">
                          {errors[`periodOfStudyFrom-${index}`]}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                        Period Of Study (To) <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center gap-4">
                        {institute.periodOfStudyTo === "Ongoing" ? (
                          <input
                            type="text"
                            value="Ongoing"
                            readOnly
                            className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                          />
                        ) : (
                          <select
                            value={institute.periodOfStudyTo}
                            onChange={(e) =>
                              handleHigherEducationChange(index, "periodOfStudyTo", e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                            required
                          >
                            <option value="">Select Year</option>
                            {generateYears().map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        )}
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={institute.periodOfStudyTo === "Ongoing"}
                            onChange={(e) => {
                              const newValue = e.target.checked ? "Ongoing" : "";
                              handleHigherEducationChange(index, "periodOfStudyTo", newValue);
                            }}
                            className="rounded"
                          />
                          <span>Ongoing</span>
                        </label>
                      </div>
                      {errors[`periodOfStudyTo-${index}`] && (
                        <p className="text-red-500 text-[14px] mt-1">
                          {errors[`periodOfStudyTo-${index}`]}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Institution Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                        Institution Name <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={institute.institutionName}
                        onChange={(e) =>
                          handleHigherEducationChange(index, "institutionName", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                        required
                      >
                        <option value="">Select Institution</option>
                        {sriLankanUniversities.map((university, idx) => (
                          <option key={idx} value={university}>
                            {university}
                          </option>
                        ))}
                      </select>
                      {errors[`institutionName-${index}`] && (
                        <p className="text-red-500 text-[14px] mt-1">
                          {errors[`institutionName-${index}`]}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                        Institution Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={institute.institutionType}
                        onChange={(e) =>
                          handleHigherEducationChange(index, "institutionType", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                        required
                      >
                        <option value="university">University</option>
                        <option value="college">College</option>
                      </select>
                    </div>
                  </div>

                  {/* Qualifications and Awarded Year */}
                  <div>
                    <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                      Qualifications <span className="text-red-500">*</span>
                    </label>
                    {institute.qualifications.map((qualification, qIndex) => (
                      <div
                        key={qIndex}
                        className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-6 mb-4 items-center"
                      >
                        <div>
                          <input
                            type="text"
                            value={qualification.name || ""}
                            onChange={(e) =>
                              handleQualificationChange(index, qIndex, "name", e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                            placeholder="Qualification Name"
                            required
                          />
                        </div>
                        <div>
                          <select
                            value={qualification.awardedYear || ""}
                            onChange={(e) =>
                              handleQualificationChange(index, qIndex, "awardedYear", e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                            required
                            disabled={institute.periodOfStudyTo === "Ongoing"}
                          >
                            <option value="">Select Awarded Year</option>
                            {generateYears().map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeQualification(index, qIndex)}
                          className="px-3 py-2 rounded-md bg-[#2A3990] text-white hover:bg-[#1b2142] transition-colors"
                        >
                          <IoRemoveCircleOutline className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                    <div className="flex justify-end mt-2">
                      <button
                        type="button"
                        onClick={() => addQualification(index)}
                        className="px-3 py-2 rounded-md bg-[#2A3990] text-white hover:bg-[#1b2142] transition-colors"
                      >
                        <IoAddCircleOutline className="w-5 h-5" />
                      </button>
                    </div>
                    {errors[`qualifications-${index}`] && (
                      <p className="text-red-500 text-[14px] mt-1">
                        {errors[`qualifications-${index}`]}
                      </p>
                    )}
                  </div>

                  {/* Certificate Upload for Higher Education */}
                  <div>
                    <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                      Upload Certificate <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      id={`higherEducationCertificateInput-${index}`}
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, "higherEducationCertificate", index)}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById(`higherEducationCertificateInput-${index}`).click()
                      }
                      className="w-full sm:w-[160px] px-4 py-2 text-[14px] sm:text-[16px] font-[600] rounded-md bg-[#2A3990] text-white hover:bg-[#1b2142] transition-colors"
                    >
                      Browse...
                    </button>
                    {institute.certificatePath && (
                      <div className="mt-2 text-[14px] text-gray-600">
                        <a
                          href={`http://localhost:5000/api/download-higher-education-certificate/${userId}/${index}`}
                          download={`higher_education_certificate_${userId}_${index}.pdf`}
                          className="text-[#2A3990] hover:underline"
                        >
                          {institute.certificatePath.split("/").pop()}
                        </a>
                      </div>
                    )}
                    {fileErrors[`higherEducationCertificate-${index}`] && (
                      <p className="text-red-500 text-[14px] mt-1">
                        {fileErrors[`higherEducationCertificate-${index}`]}
                      </p>
                    )}
                  </div>
                </div>

                {/* Remove Button */}
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={() => removeHigherEducationInstitute(index)}
                    className="px-3 py-2 rounded-md bg-[#2A3990] text-white hover:bg-[#1b2142] transition-colors"
                  >
                    <IoRemoveCircleOutline className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
            {/* Add Higher Education Button */}
            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={addHigherEducationInstitute}
                className="px-3 py-2 rounded-md bg-[#2A3990] text-white hover:bg-[#1b2142] transition-colors"
              >
                <IoAddCircleOutline className="w-5 h-5" />
              </button>
            </div>

          {/* Navigation Buttons */}
          <div className="flex justify-end gap-4 mt-6 flex-col sm:flex-row mb-12">
            <button
              type="button"
              onClick={() => navigate(`/personal-info/${userId}`)}
              className="w-full sm:w-[160px] h-[48px] px-4 py-2 text-[14px] sm:text-[16px] font-[600] rounded-md bg-[#2A3990] text-white hover:bg-[#1b2142] transition-colors"
            >
              Back
            </button>

            <button
              type="submit"
              className="w-full sm:w-[160px] h-[48px] px-4 py-2 text-[14px] sm:text-[16px] font-[600] rounded-md bg-[#F5B027] text-white hover:bg-[#E4D00A] transition-colors"
            >
              Update
            </button>

            <button
              type="button"
              onClick={() => navigate(`/training-info/${userId}`)}
              className="w-full sm:w-[160px] h-[48px] px-4 py-2 text-[14px] sm:text-[16px] font-[600] rounded-md bg-[#2A3990] text-white hover:bg-[#1b2142] transition-colors"
            >
              Next
            </button>
          </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default AcadmicQualificationEditForm;