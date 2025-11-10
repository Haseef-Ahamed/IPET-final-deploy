import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import Swal from "sweetalert2";

const TrainingAndExperience = () => {
  const [activeTab, setActiveTab] = useState("Training & Experience");
  const navigate = useNavigate();
  const { userId } = useParams();
  const [formData, setFormData] = useState({
    workExperiences: [
      {
        periodOfWorkFrom: "",
        periodOfWorkTo: "",
        ongoing: false,
        placeOfWork: "",
        positionHeld: "",
        workDescription: "",
        trainingCertificatePath: "",
      },
    ],
    profile_picture_path: "", // Added to store profile picture
  });
  const [errors, setErrors] = useState({}); // Added for form validation
  const [fileErrors, setFileErrors] = useState({});

  // Define tabs for desktop and mobile
  const tabs = [
    "Personal Information",
    "Academic Qualifications",
    "Training & Experience",
    "Professional Memberships",
  ];
  const mobileTabs = ["Training & Experience"];

  // Generate a list of years for the dropdown
  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 1950; year--) {
      years.push(year);
    }
    return years;
  };

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://72.60.42.161/api/user-details/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }
        const userData = await response.json();
        console.log("Fetched User Data:", userData);
        setFormData({
          workExperiences: userData.training_experience
            ? Array.isArray(userData.training_experience)
              ? userData.training_experience
              : JSON.parse(userData.training_experience)
            : [
                {
                  periodOfWorkFrom: "",
                  periodOfWorkTo: "",
                  ongoing: false,
                  placeOfWork: "",
                  positionHeld: "",
                  workDescription: "",
                  trainingCertificatePath: "",
                },
              ],
          profile_picture_path: userData.profile_picture_path || "", // Added
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch user data. Please try again.",
          confirmButtonColor: "#2A3990",
        });
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  // Handle input changes
  const handleInputChange = (index, field, value) => {
    const newExperiences = [...formData.workExperiences];
    newExperiences[index][field] = value;
    if (field === "ongoing" && value) {
      newExperiences[index].periodOfWorkTo = "Ongoing";
    }
    setFormData({ ...formData, workExperiences: newExperiences });
    setErrors((prev) => ({
      ...prev,
      [`${field}-${index}`]: "", // Clear error for the field
    }));
  };

  // Handle file changes
  const handleFileChange = async (e, index) => {
    const file = e.target.files[0];
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
    const maxSize = 5 * 1024 * 1024; // 5MB
    const errorKey = `certificate-${index}`;

    if (!file) {
      setFileErrors((prev) => ({ ...prev, [errorKey]: "No file selected." }));
      return;
    }

    console.log("Selected file:", {
      name: file.name,
      type: file.type,
      size: file.size,
    });

    if (!allowedTypes.includes(file.type)) {
      setFileErrors((prev) => ({
        ...prev,
        [errorKey]: "Please upload PDF or Image files only (PDF, JPEG, PNG, JPG).",
      }));
      return;
    }

    if (file.size > maxSize) {
      setFileErrors((prev) => ({ ...prev, [errorKey]: "File size should be less than 5MB." }));
      return;
    }

    if (file.size === 0) {
      setFileErrors((prev) => ({ ...prev, [errorKey]: "Selected file is empty." }));
      return;
    }

    const uploadFormData = new FormData();
    uploadFormData.append("file", file);

    try {
      const response = await fetch("http://72.60.42.161/api/upload/training-certificate", {
        method: "POST",
        body: uploadFormData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to upload file.");
      }

      const result = await response.json();
      const filePath = result.filePath;
      console.log("File uploaded successfully. File path:", filePath);

      const newExperiences = [...formData.workExperiences];
      newExperiences[index].trainingCertificatePath = filePath;
      setFormData({ ...formData, workExperiences: newExperiences });
      setFileErrors((prev) => ({ ...prev, [errorKey]: "" }));
    } catch (error) {
      console.error("Error uploading file:", error);
      setFileErrors((prev) => ({
        ...prev,
        [errorKey]: error.message || "Failed to upload file. Please try again.",
      }));
    }
  };

  // Add new work experience entry
  const addNewEntry = () => {
    setFormData({
      ...formData,
      workExperiences: [
        ...formData.workExperiences,
        {
          periodOfWorkFrom: "",
          periodOfWorkTo: "",
          ongoing: false,
          placeOfWork: "",
          positionHeld: "",
          workDescription: "",
          trainingCertificatePath: "",
        },
      ],
    });
  };

  // Remove work experience entry
  const removeEntry = (index) => {
    const newExperiences = [...formData.workExperiences];
    newExperiences.splice(index, 1);
    setFormData({ ...formData, workExperiences: newExperiences });
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    formData.workExperiences.forEach((experience, index) => {
      if (!experience.periodOfWorkFrom) {
        newErrors[`periodOfWorkFrom-${index}`] = "Period of work (from) is required.";
      }
      if (!experience.periodOfWorkTo && !experience.ongoing) {
        newErrors[`periodOfWorkTo-${index}`] = "Period of work (to) is required.";
      }
      if (!experience.placeOfWork) {
        newErrors[`placeOfWork-${index}`] = "Place of work is required.";
      }
      if (!experience.positionHeld) {
        newErrors[`positionHeld-${index}`] = "Position held is required.";
      }
      if (!experience.workDescription) {
        newErrors[`workDescription-${index}`] = "Work description is required.";
      }
      if (!experience.trainingCertificatePath) {
        newErrors[`certificate-${index}`] = "Training certificate is required.";
      }
    });
    setErrors(newErrors); // Use errors state for form validation
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill in all required fields and upload valid files.",
        confirmButtonColor: "#2A3990",
      });
      return;
    }

    try {
      const trainingData = {
        userId: userId,
        trainingEntries: formData.workExperiences,
      };

      const response = await fetch("http://72.60.42.161/api/register/training", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trainingData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update training data.");
      }

      const result = await response.json();
      console.log("Training data updated successfully:", result.message);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Training data updated successfully!",
        confirmButtonColor: "#2A3990",
      });
    } catch (error) {
      console.error("Error updating training data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to update training data. Please try again.",
        confirmButtonColor: "#2A3990",
      });
    }
  };

  // Handle file download
  const handleFileDownload = async (e, filePath) => {
    e.preventDefault();
    try {
      if (!filePath) {
        throw new Error("Invalid file path");
      }

      const response = await fetch(filePath, {
        method: "GET",
        headers: {
          Accept: "application/pdf,image/jpeg,image/png,image/jpg",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to download file.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = decodeURIComponent(filePath.split("/").pop()) || "certificate.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to download file. Please ensure the file is accessible.",
        confirmButtonColor: "#2A3990",
      });
    }
  };

  // Navigation handlers
  const handleBack = () => {
    navigate(`/acadamic-info/${userId}`);
  };

  const handleNext = () => {
    navigate(`/memberships-info/${userId}`);
  };

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

  const renderFileSection = (experience, index) => (
    <div>
      <label className="block text-[16px] font-[600] text-gray-700 mb-1">
        Upload Certification <span className="text-red-500">*</span>
      </label>
      <div className="flex flex-col gap-2">
        <input
          type="file"
          id={`certificateInput-${index}`}
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => handleFileChange(e, index)}
        />
        <button
          type="button"
          onClick={() => document.getElementById(`certificateInput-${index}`).click()}
          className="w-full sm:w-[160px] px-4 py-2 text-[14px] sm:text-[16px] font-[600] rounded-md bg-[#2A3990] text-white hover:bg-[#1b2142] transition-colors"
        >
          Browse...
        </button>
        {experience.trainingCertificatePath && (
          <div className="mt-2 text-[14px] text-gray-600 text-left">
            <strong>File:</strong>{" "}
            <button
              type="button"
              onClick={(e) => handleFileDownload(e, experience.trainingCertificatePath)}
              className="text-[#2A3990] hover:underline cursor-pointer"
            >
              {decodeURIComponent(experience.trainingCertificatePath.split("/").pop())}
            </button>
          </div>
        )}
        {fileErrors[`certificate-${index}`] && (
          <p className="text-red-500 text-[14px] mt-1">{fileErrors[`certificate-${index}`]}</p>
        )}
      </div>
    </div>
  );

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
                  disabled={window.innerWidth < 1024 && tabName !== "Training & Experience"}
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
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
            {formData.workExperiences.map((experience, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 sm:p-6 rounded-lg border border-gray-200 mb-6"
              >
                <h2 className="text-[16px] font-[600] text-gray-700 mb-4">
                  Training & Experience {index + 1}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div>
                    <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                      From <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={experience.periodOfWorkFrom}
                      onChange={(e) =>
                        handleInputChange(index, "periodOfWorkFrom", e.target.value)
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
                    {errors[`periodOfWorkFrom-${index}`] && (
                      <p className="text-red-500 text-[14px] mt-1">
                        {errors[`periodOfWorkFrom-${index}`]}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                      To <span className="text-red-500">*</span>
                    </label>
                    {experience.ongoing ? (
                      <input
                        type="text"
                        value="Ongoing"
                        readOnly
                        className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                      />
                    ) : (
                      <select
                        value={experience.periodOfWorkTo}
                        onChange={(e) =>
                          handleInputChange(index, "periodOfWorkTo", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                        required={!experience.ongoing}
                        disabled={experience.ongoing}
                      >
                        <option value="">Select Year</option>
                        {generateYears().map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    )}
                    <label className="flex items-center gap-2 mt-2">
                      <input
                        type="checkbox"
                        checked={experience.ongoing}
                        onChange={(e) => handleInputChange(index, "ongoing", e.target.checked)}
                        className="rounded"
                      />
                      <span>Ongoing</span>
                    </label>
                    {errors[`periodOfWorkTo-${index}`] && (
                      <p className="text-red-500 text-[14px] mt-1">
                        {errors[`periodOfWorkTo-${index}`]}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                      Place of Work <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={experience.placeOfWork}
                      onChange={(e) => handleInputChange(index, "placeOfWork", e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                      required
                    />
                    {errors[`placeOfWork-${index}`] && (
                      <p className="text-red-500 text-[14px] mt-1">
                        {errors[`placeOfWork-${index}`]}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                      Position Held <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={experience.positionHeld}
                      onChange={(e) => handleInputChange(index, "positionHeld", e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                      required
                    />
                    {errors[`positionHeld-${index}`] && (
                      <p className="text-red-500 text-[14px] mt-1">
                        {errors[`positionHeld-${index}`]}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-[16px] font-[600] text-gray-700 mb-1">
                      Work Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={experience.workDescription}
                      onChange={(e) =>
                        handleInputChange(index, "workDescription", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-md p-2 h-32 focus:outline-none focus:ring-2 focus:ring-[#2A3990]"
                      required
                    />
                    {errors[`workDescription-${index}`] && (
                      <p className="text-red-500 text-[14px] mt-1">
                        {errors[`workDescription-${index}`]}
                      </p>
                    )}
                  </div>
                  {renderFileSection(experience, index)}
                </div>

                <div className="flex items-center justify-end gap-4 mt-6">
                  {formData.workExperiences.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEntry(index)}
                      className="px-3 py-2 rounded-md bg-[#2A3990] text-white hover:bg-[#1b2142] transition-colors"
                    >
                      <IoRemoveCircleOutline className="w-5 h-5" />
                    </button>
                  )}
                  {index === formData.workExperiences.length - 1 && (
                    <button
                      type="button"
                      onClick={addNewEntry}
                      className="px-3 py-2 rounded-md bg-[#2A3990] text-white hover:bg-[#1b2142] transition-colors"
                    >
                      <IoAddCircleOutline className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            <div className="flex justify-end gap-4 mt-6 flex-col sm:flex-row">
              <button
                type="button"
                onClick={handleBack}
                className="w-full sm:w-[160px] px-4 py-2 text-[14px] sm:text-[16px] font-[600] rounded-md bg-[#2A3990] text-white hover:bg-[#1b2142] transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-full sm:w-[160px] px-4 py-2 text-[14px] sm:text-[16px] font-[600] rounded-md bg-[#F5B027] text-white hover:bg-[#1b2142] transition-colors"
              >
                Update
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-full sm:w-[160px] px-4 py-2 text-[14px] sm:text-[16px] font-[600] rounded-md bg-[#2A3990] text-white hover:bg-[#1b2142] transition-colors mb-20"
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

export default TrainingAndExperience;