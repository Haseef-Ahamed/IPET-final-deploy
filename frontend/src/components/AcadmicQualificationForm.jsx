import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoAddCircleOutline, IoReload, IoRemoveCircleOutline } from "react-icons/io5";
import Swal from "sweetalert2";

const AcadmicQualificationForm = () => {
  const [activeStep, setActiveStep] = useState(2);
  const [isOngoing, setIsOngoing] = useState(false);
  const [subjects, setSubjects] = useState(Array(4).fill(""));
  const [credits, setCredits] = useState(Array(4).fill(""));
  const [picturePreview, setPicturePreview] = useState(null);
  const [pictureName, setPictureName] = useState("");
  const [certificatePreview, setCertificatePreview] = useState(null);
  const [certificateName, setCertificateName] = useState("");
  const [alCertificateFile, setAlCertificateFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [isRotating, setIsRotating] = useState(false);
  const [membershipRows, setMembershipRows] = useState([1]);
  const [formData, setFormData] = useState({
    examination: "GCE Advanced Level",
    year: "",
    subjects: [],
    credits: [],
    periodOfStudyFrom: "",
    periodOfStudyTo: "",
    institutionName: "",
    institutionType: "university",
    qualifications: [],
    isAlCompleted: true,
    higherEducationInstitutes: [
      {
        periodOfStudyFrom: "",
        periodOfStudyTo: "",
        institutionName: "",
        institutionType: "university",
        qualifications: [],
        certificateFile: null,
      },
    ],
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;

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
    "Other" // Add "Other" option
  ];

  const handleFileChange = (e, type, index) => {
    const file = e.target.files[0];
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB
  
    if (file) {
      if (!allowedTypes.includes(file.type)) {
        setFileError("Please upload PDF or Image files only (PDF, JPEG, PNG)");
        return;
      }
  
      if (file.size > maxSize) {
        setFileError("File size should be less than 5MB");
        return;
      }

      // Clear file-related errors when a valid file is uploaded
      const newErrors = { ...errors };
  
      if (type === "alCertificate") {
        setAlCertificateFile(file);
        delete newErrors.alCertificate;
      } else if (type === "higherEducationCertificate") {
        const newHigherEducationInstitutes = [...formData.higherEducationInstitutes];
        newHigherEducationInstitutes[index].certificateFile = file;

        // Clear higher education certificate error for this index
        delete newErrors[`higherEducationCertificate-${index}`];
  
        // Set the file preview for the selected file
        const reader = new FileReader();
        reader.onload = (e) => {
          newHigherEducationInstitutes[index].certificatePreview = e.target.result;
          setFormData({
            ...formData,
            higherEducationInstitutes: newHigherEducationInstitutes,
          });
        };
        reader.readAsDataURL(file);
  
        setFormData({
          ...formData,
          higherEducationInstitutes: newHigherEducationInstitutes,
        });
      }
        // Update the errors state
        setErrors(newErrors);
        setFileError("");
    }
  };

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

  const handleSubjectChange = (index, value) => {
    const newSubjects = [...subjects];
    newSubjects[index] = value;
    setSubjects(newSubjects);
    setFormData({
      ...formData,
      subjects: newSubjects,
    });
  };

  const handleCreditChange = (index, value) => {
    const newCredits = [...credits];
    newCredits[index] = value;
    setCredits(newCredits);
    setFormData({
      ...formData,
      credits: newCredits,
    });
  };

  const handleHigherEducationChange = (index, field, value) => {
    const newHigherEducationInstitutes = [...formData.higherEducationInstitutes];
    
    if (field === "ongoing") {
      newHigherEducationInstitutes[index].ongoing = value;
      
      if (value) {
        newHigherEducationInstitutes[index].periodOfStudyTo = "Ongoing";
      } else {
        newHigherEducationInstitutes[index].periodOfStudyTo = "";
      }
      
      newHigherEducationInstitutes[index].qualifications = newHigherEducationInstitutes[
        index
      ].qualifications.map((qualification) => ({
        ...qualification,
        awardedYear: value ? "" : qualification.awardedYear,
      }));
    } else if (field === "qualifications") {
      // For qualification fields, update the qualifications array
      newHigherEducationInstitutes[index].qualifications = value;
      
      // Clear both qualification name and year errors for this index
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[`qualificationName-${index}`];
        delete newErrors[`qualificationYear-${index}`];
        return newErrors;
      });
    } else {
      newHigherEducationInstitutes[index][field] = value;
      
      // Clear the specific error message when the field is updated
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[`${field}-${index}`];
        return newErrors;
      });
    }
  
    setFormData({
      ...formData,
      higherEducationInstitutes: newHigherEducationInstitutes,
    });
  };
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
          certificateFile: null,
        },
      ],
    });
  };

  const removeHigherEducationInstitute = (index) => {
    const newHigherEducationInstitutes = [...formData.higherEducationInstitutes];
    newHigherEducationInstitutes.splice(index, 1);
    setFormData({
      ...formData,
      higherEducationInstitutes: newHigherEducationInstitutes,
    });
  };

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

  // Get the list of available subjects for a specific dropdown
  const getAvailableSubjects = (currentIndex) => {
    return gceAlSubjects.filter(
      (subject) => !subjects.includes(subject) || subjects[currentIndex] === subject
    );
  };

  const validateForm = () => {
    const newErrors = {};
  
    // Validate GCE Advanced Level fields if "Didn't Complete A/L" is unchecked
    if (formData.isAlCompleted) {
      if (!formData.year) newErrors.year = "Year is required.";
      if (!formData.subjects.some(subject => subject !== "")) newErrors.subjects = "At least one subject is required.";
      if (!formData.credits.some(credit => credit !== "")) newErrors.credits = "At least one credit is required.";
      
      if (!alCertificateFile) {
        newErrors.alCertificate = "Please upload your AL certificate.";
      }
    }
  
    // Validate higher education institutes
    formData.higherEducationInstitutes.forEach((institute, index) => {
      // Check if any field in this institute is filled
      const hasAnyValue = 
        institute.periodOfStudyFrom || 
        institute.periodOfStudyTo || 
        institute.institutionName || 
        institute.qualifications.some(q => q?.name || q?.awardedYear) ||
        institute.certificateFile;
  
      // If any field is filled, validate all required fields
      if (hasAnyValue) {
        if (!institute.periodOfStudyFrom) {
          newErrors[`periodOfStudyFrom-${index}`] = "Period of study (from) is required.";
        }
  
        if (!institute.periodOfStudyTo && !institute.ongoing) {
          newErrors[`periodOfStudyTo-${index}`] = "Period of study (to) is required.";
        }
  
        if (!institute.institutionName) {
          newErrors[`institutionName-${index}`] = "Institution name is required.";
        } else if (institute.institutionName === "Other" && !institute.otherInstitutionName) {
          newErrors[`otherInstitutionName-${index}`] = "Please specify the institution name.";
        }

        if (!institute.institutionType) {
          newErrors[`institutionType-${index}`] = "Institution type is required.";
        }
  
        // Validate qualifications
        if (!institute.qualifications.length || !institute.qualifications.some(q => q?.name)) {
          newErrors[`qualificationName-${index}`] = "Qualification name is required.";
        }
  
        if (!institute.ongoing && (!institute.qualifications.length || !institute.qualifications.some(q => q?.awardedYear))) {
          newErrors[`qualificationYear-${index}`] = "Awarded year is required.";
        }
  
        if (!institute.certificateFile) {
          newErrors[`higherEducationCertificate-${index}`] = "Please upload the certificate for this qualification.";
        }
      }
    });
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    try {
      let alCertificatePath = null;
      let higherEducationCertificatePaths = [];
  
      // Upload AL Certificate (only if A/L is completed and has details)
      if (formData.isAlCompleted && alCertificateFile) {
        const alCertificateFormData = new FormData();
        alCertificateFormData.append("file", alCertificateFile);
        const alCertificateResponse = await fetch("http://localhost:5000/api/upload/al-certificate", {
          method: "POST",
          body: alCertificateFormData,
        });
        if (!alCertificateResponse.ok) throw new Error("Failed to upload AL Certificate.");
        const alCertificateResult = await alCertificateResponse.json();
        alCertificatePath = alCertificateResult.filePath;
      }
  
      // Upload Higher Education Certificates if provided
      for (const institute of formData.higherEducationInstitutes) {
        if (institute.certificateFile) {
          const higherEducationCertificateFormData = new FormData();
          higherEducationCertificateFormData.append("file", institute.certificateFile);
          const higherEducationCertificateResponse = await fetch("http://localhost:5000/api/upload/higher-education-certificate", {
            method: "POST",
            body: higherEducationCertificateFormData,
          });
          if (!higherEducationCertificateResponse.ok) throw new Error("Failed to upload Higher Education Certificate.");
          const higherEducationCertificateResult = await higherEducationCertificateResponse.json();
          higherEducationCertificatePaths.push(higherEducationCertificateResult.filePath);
        } else {
          higherEducationCertificatePaths.push(null);
        }
      }
  
      // Prepare form data for submission
      const formDataToSend = {
        id: userId,
        examination: formData.examination,
        year: formData.year,
        subjects: formData.subjects,
        credits: formData.credits,
        isAlCompleted: formData.isAlCompleted,
        alCertificatePath,
        higherEducationInstitutes: formData.higherEducationInstitutes.map((institute, index) => {
          const institutionName = institute.institutionName === "Other" ? institute.otherInstitutionName : institute.institutionName;
          return {
            periodOfStudyFrom: institute.periodOfStudyFrom,
            periodOfStudyTo: institute.periodOfStudyTo,
            institutionName,
            institutionType: institute.institutionType,
            qualifications: institute.qualifications,
            certificatePath: higherEducationCertificatePaths[index],
          };
        }).filter(institute => institute.institutionName || institute.qualifications.length),
      };
  
      console.log("Form Data to Send:", formDataToSend);
      const response = await fetch("http://localhost:5000/api/register/academic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataToSend),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Backend Error:", errorResponse);
        throw new Error(errorResponse.error || "Failed to submit form data.");
      }
  
      const result = await response.json();
      console.log(result.message);
  
      navigate("/register/register-acadamic/register-proposes/training/", { state: { userId } });
    } catch (error) {
      console.error("Error:", error.message);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.message || "Please check the form and try again.",
      });
    }
  };
  

  return (
    <div className="min-h-screen bg-[#EDEDED] px-0 py-8">
      <div className="max-w-[1500px] mx-auto bg-[#EDEDED] mb-24 rounded-lg lg:px-16 px-8 py-6">
        <h1 className="text-2xl lg:text-left text-center font-semibold mb-4">
          IPET Member Registration Form
        </h1>

        <div className="max-w-[1430px] mx-auto lg:bg-white rounded-lg lg:shadow-md lg:p-6">
          <p className="text-sm mb-6 lg:text-left text-center">
            You may submit a request for membership at IPET by completing the
            following form. For completing this application you should have
            electronic copies of following documents ready.
          </p>
          <div className="max-w-7xl mx-auto lg:bg-white rounded-lg">
            {/* Steps Navigation */}
            <div className="w-full max-w-7xl mx-auto px-0 sm:px-6 lg:px-0">
              <div className="relative">
                {/* Mobile View (current step only) */}
                <div className="sm:hidden">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-full p-4 text-white bg-[#1e3a8a] flex flex-col justify-center items-center min-h-[60px]"
                    >
                      <div className="text-base font-medium">
                        Step {activeStep}
                      </div>
                      <div className="text-sm mt-1 text-center">
                        {activeStep === 1 && "Training & Experience"}
                        {activeStep === 2 && "Academic Qualifications"}
                        {activeStep === 3 && "Training & Experience"}
                        {activeStep === 4 && "Professional Memberships"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop View (all steps) */}
                <div className="hidden sm:block">
                  <div className="flex flex-row justify-between items-stretch gap-[1px] mb-0.5">
                    {/* Step 1 */}
                    <div
                      className={`flex-1 p-4 text-white ${
                        activeStep === 1 ? "bg-[#1e3a8a]" : "bg-[#2563eb]"
                      } flex flex-col justify-center min-h-[80px] min-w-[200px] cursor-pointer transition-colors duration-200 hover:bg-[#1e3a8a]`}
                    >
                      <div className="text-base font-medium whitespace-nowrap">
                        Step 1
                      </div>
                      <div className="text-sm mt-1 whitespace-nowrap">
                        Training & Experience
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div
                      className={`flex-1 p-4 text-white ${
                        activeStep === 2 ? "bg-[#1e3a8a]" : "bg-[#2563eb]"
                      } flex flex-col justify-center min-h-[80px] min-w-[200px] cursor-pointer transition-colors duration-200 hover:bg-[#1e3a8a]`}
                    >
                      <div className="text-base font-medium whitespace-nowrap">
                        Step 2
                      </div>
                      <div className="text-sm mt-1 whitespace-nowrap">
                        Academic Qualifications
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div
                      className={`flex-1 p-4 text-white ${
                        activeStep === 3 ? "bg-[#1e3a8a]" : "bg-[#2563eb]"
                      } flex flex-col justify-center min-h-[80px] min-w-[200px] cursor-pointer transition-colors duration-200 hover:bg-[#1e3a8a]`}
                    >
                      <div className="text-base font-medium whitespace-nowrap">
                        Step 3
                      </div>
                      <div className="text-sm mt-1 whitespace-nowrap">
                        Training & Experience
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div
                      className={`flex-1 p-4 text-white ${
                        activeStep === 4 ? "bg-[#1e3a8a]" : "bg-[#2563eb]"
                      } flex flex-col justify-center min-h-[80px] min-w-[200px] cursor-pointer transition-colors duration-200 hover:bg-[#1e3a8a]`}
                    >
                      <div className="text-base font-medium whitespace-nowrap">
                        Step 4
                      </div>
                      <div className="text-sm mt-1 whitespace-nowrap">
                        Professional Memberships
                      </div>
                    </div>
                  </div>

                  {/* Arrow Indicator for Desktop */}
                  <div
                    className="absolute -bottom-5 transition-all duration-200"
                    style={{
                      left: `calc(${(activeStep - 1) * (100 / 4)}% + ${100 / 8}%)`,
                      transform: "translateX(-50%)",
                    }}
                  >
                    <div
                      className="w-0 h-0 
                        border-l-[10px] border-l-transparent 
                        border-t-[20px] border-t-[#1e3a8a] 
                        border-r-[10px] border-r-transparent"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            {/* Main Form */}
            <div className="max-w-7xl mx-auto bg-[#EDEDED] border-t-8 border-t-[#2D387D] border-b-8 border-b-[#2D387D] lg:shadow-md lg:p-6">
              <form onSubmit={handleSubmit} className="lg:space-y-6 bg-[#EDEDED] lg:p-6 rounded-lg">
                {/* GCE Advanced Level Section */}
                <div className="lg:bg-white bg-[#EDEDED] rounded-lg lg:p-6 mb-6 lg:shadow-sm">
                  <h2 className="text-lg font-medium mb-4 lg:mt-0 mt-16">
                    GCE Advanced Level :
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <label className="block font-bold mb-2">
                          Examination : <span className=""></span>
                        </label>
                        <select
                          name="examination"
                          value={formData.examination}
                          onChange={handleInputChange}
                          className="w-full border rounded-md p-2"
                          disabled={!formData.isAlCompleted}
                        >
                          <option>GCE Advanced Level</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-bold mb-2">
                          Year : <span className=""></span>
                        </label>
                        <select
                          name="year"
                          value={formData.year}
                          onChange={handleInputChange}
                          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required={formData.isAlCompleted}
                          disabled={!formData.isAlCompleted}
                        >
                          <option value="">Select Year</option>
                          {Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, index) => {
                            const year = new Date().getFullYear() - index; // Start from the current year and go backward
                            return (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            );
                          })}
                        </select>
                        {errors.year && (
                          <p className="text-red-500 text-sm mt-1">{errors.year}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-4">
                      <div>
                        <label className="block mb-2 font-bold">
                          Upload AL Certification :{" "}
                          <span className="text-black"></span>
                        </label>
                        <input
                          type="file"
                          id="alCertificateInput"
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileChange(e, "alCertificate")}
                          disabled={!formData.isAlCompleted}
                        />
                        <button
                          type="button" // Add this line to prevent form submission
                          onClick={() =>
                            document.getElementById("alCertificateInput").click()
                          }
                          className="bg-[#1e3a8a] text-white lg:w-[118px] w-full px-6 py-2 rounded hover:bg-[#1e3a8a]/90 transition-colors"
                          disabled={!formData.isAlCompleted}
                        >
                          Browse...
                        </button>
                        {alCertificateFile && (
                          <div className="flex items-center space-x-2">
                            <div className="text-sm text-gray-600 break-all mt-4">
                              {alCertificateFile.name}
                            </div>
                            <button
                              onClick={() => setAlCertificateFile(null)}
                              className="text-black hover:text-red-700"
                              disabled={!formData.isAlCompleted}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        )}
                        {fileError && (
                          <div className="text-black text-sm">
                            {fileError}
                          </div>
                        )}
                        {alCertificateFile &&
                          alCertificateFile.type.startsWith("image/") && (
                            <div className="mt-4 max-w-xs">
                              <img
                                src={URL.createObjectURL(alCertificateFile)}
                                alt="AL Certificate Preview"
                                className="rounded-lg shadow-md"
                              />
                            </div>
                          )}
                        {alCertificateFile &&
                          alCertificateFile.type === "application/pdf" && (
                            <div className="mt-4 flex items-center text-sm text-gray-600">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                />
                              </svg>
                              PDF Document
                            </div>
                          )}
                          {formData.isAlCompleted && errors.alCertificate && (
                            <p className="text-red-500 text-sm mt-1">{errors.alCertificate}</p>
                          )}
                      </div>
                    </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      {/* Subjects Column */}
                      <div>
                        <label className="block text-md font-bold mb-2">
                          Subjects : <span className=""></span>
                        </label>
                        <div className="space-y-4">
                          {Array(4)
                            .fill(null)
                            .map((_, index) => (
                              <div key={`subject-${index}`} className="relative">
                                <select
                                  value={subjects[index]}
                                  onChange={(e) => handleSubjectChange(index, e.target.value)}
                                  className="w-full p-2 border border-gray-300 rounded appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  required={formData.isAlCompleted}
                                  disabled={!formData.isAlCompleted}
                                >
                                  <option value="">Select</option>
                                  {getAvailableSubjects(index).map((subject, idx) => (
                                    <option
                                      key={idx}
                                      value={subject}
                                      disabled={subjects.includes(subject) && subjects[index] !== subject}
                                    >
                                      {subject}
                                    </option>
                                  ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                  <svg
                                    className="w-4 h-4 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M19 9l-7 7-7-7"
                                    />
                                  </svg>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Credits Column */}
                      <div>
                        <label className="block text-md font-bold mb-2">
                          Credits : <span className=""></span>
                        </label>
                        <div className="space-y-4">
                          {Array(4)
                            .fill(null)
                            .map((_, index) => (
                              <div key={`credit-${index}`} className="relative">
                                <select
                                  value={credits[index]}
                                  onChange={(e) => handleCreditChange(index, e.target.value)}
                                  className="w-full p-2 border border-gray-300 rounded appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  required={formData.isAlCompleted}
                                  disabled={!formData.isAlCompleted}
                                >
                                  <option value="">Select</option>
                                  <option value="A">A</option>
                                  <option value="B">B</option>
                                  <option value="C">C</option>
                                  <option value="S">S</option>
                                  <option value="F">F</option>
                                  <option value="F">Absent</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                  <svg
                                    className="w-4 h-4 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M19 9l-7 7-7-7"
                                    />
                                  </svg>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>

                    <div className="lg:mt-4 lg:mb-0 mb-10">
                      <label className="flex items-center font-bold space-x-2">
                        <input
                          type="checkbox"
                          checked={!formData.isAlCompleted}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              isAlCompleted: !e.target.checked,
                            })
                          }
                          className="rounded"
                        />
                        <span>Didn't Complete A/L</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Higher Education Section */}
                <div className="lg:bg-white lg:p-6 rounded-lg">
                  <h2 className="text-lg font-bold lg:mb-4 mb-10">
                    Higher Education :
                  </h2>

                  {formData.higherEducationInstitutes.map((institute, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6 mb-6">
                      <h3 className="text-lg font-semibold mb-4">Higher Education {index + 1}</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block font-bold mb-2">
                            Period Of Study : <span className=""></span>
                          </label>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                              <label className="block font-medium mb-1 text-sm">
                                From: <span className=""></span>
                              </label>
                              <div>
                                <select
                                  name="periodOfStudyFrom"
                                  value={institute.periodOfStudyFrom}
                                  onChange={(e) =>
                                    handleHigherEducationChange(
                                      index,
                                      "periodOfStudyFrom",
                                      e.target.value
                                    )
                                  }
                                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                  <option value="">Select Year</option>
                                  {Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, index) => {
                                    const year = new Date().getFullYear() - index; // Start from the current year and go backward
                                    return (
                                      <option key={year} value={year}>
                                        {year}
                                      </option>
                                    );
                                  })}
                                </select>
                                {errors[`periodOfStudyFrom-${index}`] && (
                                  <p className="text-red-500 text-sm mt-1">{errors[`periodOfStudyFrom-${index}`]}</p>
                                )}
                              </div>
                            </div>

                            <div>
                              <label className="block font-medium mb-1 text-sm">
                                To: <span className=""></span>
                              </label>
                              <div>
                                <select
                                  name="periodOfStudyTo"
                                  value={institute.periodOfStudyTo}
                                  onChange={(e) =>
                                    handleHigherEducationChange(
                                      index,
                                      "periodOfStudyTo",
                                      e.target.value
                                    )
                                  }
                                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  disabled={institute.ongoing} // Disable the field if ongoing is checked
                                >
                                  <option value="">Select Year</option>
                                  {!institute.ongoing && Array.from({ length: new Date().getFullYear() - 1950 + 1 }, (_, index) => {
                                    const year = new Date().getFullYear() - index; // Start from the current year and go backward
                                    return (
                                      <option key={year} value={year}>
                                        {year}
                                      </option>
                                    );
                                  })}
                                  {institute.ongoing && <option value="Ongoing">Ongoing</option>}
                                </select>
                                {errors[`periodOfStudyTo-${index}`] && (
                                  <p className="text-red-500 text-sm mt-1">{errors[`periodOfStudyTo-${index}`]}</p>
                                )}
                              </div>
                              <div className="mt-4 hidden lg:flex">
                                <label className="inline-flex items-center">
                                  <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    checked={institute.ongoing}
                                    onChange={(e) =>
                                      handleHigherEducationChange(index, "ongoing", e.target.checked)
                                    }
                                  />
                                  <span className="ml-2 font-bold">Ongoing</span>
                                </label>
                              </div>
                            </div>

                            <div>
                              <label className="block mb-1 font-medium text-sm">
                                Name Of Institution : <span className="text-red-500"></span>
                              </label>
                              <select
                                name="institutionName"
                                value={institute.institutionName}
                                onChange={(e) =>
                                  handleHigherEducationChange(
                                    index,
                                    "institutionName",
                                    e.target.value
                                  )
                                }
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                              >
                                <option value="">Select Institution</option>
                                {sriLankanUniversities.map((university, idx) => (
                                  <option key={idx} value={university}>
                                    {university}
                                  </option>
                                ))}
                              </select>
                              {errors[`institutionName-${index}`] && (
                                <p className="text-red-500 text-sm mt-1">{errors[`institutionName-${index}`]}</p>
                              )}
                              {institute.institutionName === "Other" && errors[`otherInstitutionName-${index}`] && (
                                <p className="text-red-500 text-sm mt-1">{errors[`otherInstitutionName-${index}`]}</p>
                              )}
                              {institute.institutionName === "Other" && (
                                <input
                                  type="text"
                                  name="otherInstitutionName"
                                  value={institute.otherInstitutionName || ""}
                                  onChange={(e) =>
                                    handleHigherEducationChange(
                                      index,
                                      "otherInstitutionName",
                                      e.target.value
                                    )
                                  }
                                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  placeholder="Enter Institution Name"
                                />
                              )}
                              {errors.institutionName && (
                                <p className="text-red-500 text-sm mt-1">{errors.institutionName}</p>
                              )}
                            </div>

                            <div>
                              <label className="block mb-1 font-medium text-sm">
                                Type Of Institution : <span className=""></span>
                              </label>
                              <select
                                name="institutionType"
                                value={institute.institutionType}
                                onChange={(e) =>
                                  handleHigherEducationChange(
                                    index,
                                    "institutionType",
                                    e.target.value
                                  )
                                }
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                              >
                                <option value="">Select Institution</option>
                                <option value="university">University</option>
                                <option value="college">College</option>
                              </select>
                              {errors[`institutionType-${index}`] && (
                                <p className="text-red-500 text-sm mt-1">{errors[`institutionType-${index}`]}</p>
                              )}
                            </div>

                            <div className="mt-4 lg:hidden">
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                  checked={isOngoing}
                                  onChange={(e) => setIsOngoing(e.target.checked)}
                                />
                                <span className="ml-2 font-bold">Ongoing</span>
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* Qualification Details */}
                        <div className="relative">
                          {membershipRows.map((row, idx) => (
                            <div
                              key={idx}
                              className="grid md:grid-cols-3 lg:space-x-12 gap-8 mb-6"
                            >
                              <div>
                                <label className="block font-bold mb-2">
                                  Name Of Qualification : <span className=""></span>
                                </label>
                                <input
                                  type="text"
                                  name={`qualificationName-${idx}`}
                                  value={institute.qualifications[idx]?.name || ""}
                                  onChange={(e) => {
                                    const newQualifications = [...institute.qualifications];
                                    newQualifications[idx] = {
                                      ...newQualifications[idx],
                                      name: e.target.value,
                                    };
                                    handleHigherEducationChange(
                                      index,
                                      "qualifications",
                                      newQualifications
                                    );
                                  }}
                                  className="lg:w-[360px] w-full border border-gray-300 rounded p-2"
                                />
                                {errors[`qualificationName-${index}`] && (
                                  <p className="text-red-500 text-sm mt-1">{errors[`qualificationName-${index}`]}</p>
                                )}
                              </div>
                              <div>
                                <label className="block font-bold mb-2">
                                  Awarded Year : <span className="text-red-500"></span>
                                </label>
                                <select
                                  name={`awardedYear-${idx}`}
                                  value={institute.qualifications[idx]?.awardedYear || ""}
                                  onChange={(e) => {
                                    const newQualifications = [...institute.qualifications];
                                    newQualifications[idx] = {
                                      ...newQualifications[idx],
                                      awardedYear: e.target.value,
                                    };
                                    handleHigherEducationChange(index, "qualifications", newQualifications);
                                  }}
                                  className="lg:w-[264px] w-full border border-gray-300 rounded p-2"
                                  disabled={institute.ongoing} // Disable if ongoing is checked
                                >
                                  <option value="">Select Year</option>
                                  {Array.from({ length: new Date().getFullYear() - 1950 + 1 }, (_, i) => {
                                    const year = new Date().getFullYear() - i;
                                    return (
                                      <option key={year} value={year}>
                                        {year}
                                      </option>
                                    );
                                  })}
                                </select>
                                {errors[`qualificationYear-${index}`] && (
                                  <p className="text-red-500 text-sm mt-1">{errors[`qualificationYear-${index}`]}</p>
                                )}
                              </div>

                              <div>
                                <label className="block font-bold mb-2">
                                  Higher Education Certification : <span className=""></span>
                                </label>
                                <input
                                  type="file"
                                  id={`higherEducationCertificateInput-${index}-${idx}`}
                                  className="hidden"
                                  accept=".pdf,.jpg,.jpeg,.png"
                                  onChange={(e) => handleFileChange(e, "higherEducationCertificate", index)}
                                />
                                <button
                                  type="button" // Add this line to prevent form submission
                                  onClick={() =>
                                    document.getElementById(`higherEducationCertificateInput-${index}-${idx}`).click()
                                  }
                                  className="bg-[#1e3a8a] text-white lg:w-[118px] w-full px-6 py-2 rounded hover:bg-[#1e3a8a]/90 transition-colors"
                                >
                                  Browse...
                                </button>

                                {fileError && (
                                  <div className="text-black text-sm">
                                    {fileError}
                                  </div>
                                )}
 
                                {institute.certificateFile &&
                                  institute.certificateFile.type === "application/pdf" && (
                                    <div className="mt-4 flex items-center text-sm text-gray-600">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 mr-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                        />
                                      </svg>
                                      PDF Document
                                    </div>
                                  )}
                                    {errors[`higherEducationCertificate-${index}`] && (
                                      <p className="text-red-500 text-sm mt-1">
                                        {errors[`higherEducationCertificate-${index}`]}
                                      </p>
                                    )}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Plus and Minus Buttons */}
                        <div className="flex justify-end space-x-4">
                          <button
                            type="button"
                            onClick={() => removeHigherEducationInstitute(index)}
                            className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                          >
                            <IoRemoveCircleOutline className="w-5 h-5" /> {/* Minus Icon */}
                          </button>
                          {index === formData.higherEducationInstitutes.length - 1 && (
                            <button
                              type="button"
                              onClick={addHigherEducationInstitute}
                              className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
                            >
                              <IoAddCircleOutline className="w-5 h-5" /> {/* Plus Icon */}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Submit Button */}
                <div className="flex justify-start mt-10 mb-5">
                  <button
                    type="submit"
                    className="lg:w-[83px] w-full px-4 py-2 bg-[#2D387D] text-white rounded"
                  >
                    Next
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcadmicQualificationForm;