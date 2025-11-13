 
 
 
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const ProfessionalMembershipsForm = () => {
  const [activeStep, setActiveStep] = useState(4);
  const [picturePreview, setPicturePreview] = useState(null);
  const [pictureName, setPictureName] = useState("");
  const [certificatePreview, setCertificatePreview] = useState(null);
  const [certificateName, setCertificateName] = useState("");
  const location = useLocation();
  const userId = location.state?.userId;

  const navigate = useNavigate();

  // State for managing rows
  const [rowData, setRowData] = useState([
    {
      institution: "",
      membershipNumber: "",
      joinedYear: "",
      certificateFile: null,
      fileName: "",
      fileError: "",
    },
  ]);

  // Handle back button click
  const handleBackClick = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 1));
    navigate("/register/register-acadamic/register-proposes/training");
  };

  // Add a new row
  const addNewRow = () => {
    setRowData((prev) => [
      ...prev,
      {
        institution: "",
        membershipNumber: "",
        joinedYear: "",
        certificateFile: null,
        fileName: "",
        fileError: "",
      },
    ]);
  };

  // Remove a row
  const removeRow = (index) => {
    setRowData((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle step navigation
  const handleStepClick = (step) => {
    setActiveStep(step);
    switch (step) {
      case 1:
        navigate("/register");
        break;
      case 2:
        navigate("/register/register-acadamic");
        break;
      case 3:
        navigate("/register/register-acadamic/register-proposes/training");
        break;
      case 4:
        navigate(
          "/register/register-acadamic/register-proposes/training/professional-membership"
        );
        break;
      default:
        break;
    }
  };

  // Handle file change for each row
  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (file) {
      // File type validation
      if (!allowedTypes.includes(file.type)) {
        setRowData((prev) => {
          const updatedRows = [...prev];
          updatedRows[index].fileError =
            "Please upload PDF or Image files only (PDF, JPEG, PNG)";
          return updatedRows;
        });
        return;
      }

      // File size validation
      if (file.size > maxSize) {
        setRowData((prev) => {
          const updatedRows = [...prev];
          updatedRows[index].fileError = "File size should be less than 5MB";
          return updatedRows;
        });
        return;
      }

      // Update the state for the specific row
      setRowData((prev) => {
        const updatedRows = [...prev];
        updatedRows[index].certificateFile = file;
        updatedRows[index].fileName = file.name;
        updatedRows[index].fileError = "";
        return updatedRows;
      });
    }
  };

  // Handle file upload
  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://72.60.42.161/api/membership_upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error("Failed to upload file.");
      }

      const result = await response.json();
      return result.filePath; // Return the file path
    } catch (error) {
      console.error("Error uploading file:", error.message);
      throw error;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Filter out empty rows where no data was entered
      const nonEmptyRows = rowData.filter(row => 
        row.institution.trim() !== "" || 
        row.membershipNumber.trim() !== "" || 
        row.joinedYear !== "" || 
        row.certificateFile !== null
      );
  
      // If there are no records at all, just navigate to login
      if (nonEmptyRows.length === 0) {
        navigate("/login");
        return;
      }
  
      // Process only non-empty rows
      const professionalMemberships = await Promise.all(
        nonEmptyRows.map(async (row) => ({
          institution: row.institution,
          membershipNumber: row.membershipNumber,
          joinedYear: row.joinedYear,
          certificatePath: row.certificateFile
            ? await handleFileUpload(row.certificateFile)
            : null,
        }))
      );
  
      // Only make API call if there are records to submit
      if (professionalMemberships.length > 0) {
        const response = await fetch(
          "http://72.60.42.161/api/register/professional-membership",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: userId,
              professionalMemberships: professionalMemberships,
            }),
          }
        );
  
        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error("Failed to submit form data.");
        }
      }
  
      // Navigate to login page regardless of whether data was submitted
      navigate("/login");
    } catch (error) {
      console.error("Error during form submission:", error.message);
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: 'Failed to submit form data. Please try again.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#EDEDED] py-8 px-0">
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
              {/* Navigation Buttons Top */}
              <div className="mb-6 mt-10 space-x-2">
                <button
                  onClick={handleBackClick}
                  className="bg-[#1e3a8a] w-full lg:w-[84px] text-white px-6 py-2 rounded"
                >
                  Back
                </button>
              </div>
              <h6 style={{ marginBottom: '20px' }}>If you have any professional memberships, please include them as well.</h6>

              {/* Professional Memberships Section */}
              <div className="lg:bg-white rounded-lg lg:p-6 lg:shadow-sm">
                {rowData.map((row, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6"
                  >
                    <div>
                      <label className="block mb-2 font-bold lg:mt-0 mt-12">
                        Institution:
                      </label>
                      <input
                        type="text"
                        value={row.institution}
                        onChange={(e) => {
                          const updatedRows = [...rowData];
                          updatedRows[index].institution = e.target.value;
                          setRowData(updatedRows);
                        }}
                        className="w-full border border-gray-300 rounded p-2"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 font-bold">
                        Membership Number :
                      </label>
                      <input
                        type="text"
                        value={row.membershipNumber}
                        onChange={(e) => {
                          const updatedRows = [...rowData];
                          updatedRows[index].membershipNumber = e.target.value;
                          setRowData(updatedRows);
                        }}
                        className="w-full border border-gray-300 rounded p-2"
                      />
                    </div>

                    <div>
                    <label className="block mb-2 font-bold">
                      Joined year:
                    </label>
                    <select
                      value={row.joinedYear}
                      onChange={(e) => {
                        const updatedRows = [...rowData];
                        updatedRows[index].joinedYear = e.target.value;
                        setRowData(updatedRows);
                      }}
                      className="w-full border border-gray-300 rounded p-2"
                    >
                      <option value="">Select year</option>
                      {Array.from(
                        { length: new Date().getFullYear() - 1950 + 1 },
                        (_, index) => {
                          const year = new Date().getFullYear() - index;
                          return (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          );
                        }
                      )}
                    </select>
                  </div>

                    <div>
                      <label className="block mb-2 font-bold">
                        Upload Certification :
                      </label>
                      <div className="flex flex-col sm:flex-row justify-between gap-4 -mt-4">
                        {/* Hidden file input */}
                        <input
                          type="file"
                          id={`certificateInput-${index}`}
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileChange(e, index)}
                        />

                        {/* Browse button */}
                        <button
                          onClick={() =>
                            document.getElementById(`certificateInput-${index}`).click()
                          }
                          className="bg-[#1e3a8a] text-white lg:w-[118px] w-full px-6 py-2 rounded hover:bg-[#1e3a8a]/90 transition-colors mt-4"
                        >
                          Browse...
                        </button>

                        {/* Add New Row and Minus Buttons */}
                        <div className="flex items-center justify-center gap-4 mt-4">
                          <button
                            onClick={addNewRow}
                            className="w-10 h-10 bg-green-500 rounded-full text-white flex items-center justify-center"
                          >
                            <span>
                              <IoAddCircleOutline className="text-2xl" />
                            </span>
                          </button>
                          <button
                            className="w-10 h-10 bg-red-500 rounded-full text-white flex items-center justify-center"
                            onClick={() => removeRow(index)}
                          >
                            <span>
                              <IoRemoveCircleOutline className="text-2xl" />
                            </span>
                          </button>
                        </div>
                      </div>

                      {/* File Name Display */}
                      {row.fileName && (
                        <div className="flex items-center space-x-2 mt-2">
                          <div className="text-sm text-gray-600 break-all">
                            {row.fileName}
                          </div>
                          <button
                            onClick={() => {
                              const updatedRows = [...rowData];
                              updatedRows[index].certificateFile = null;
                              updatedRows[index].fileName = "";
                              setRowData(updatedRows);
                              document.getElementById(`certificateInput-${index}`).value = "";
                            }}
                            className="text-black hover:text-red-700"
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

                      {/* Error Message */}
                      {row.fileError && (
                        <div className="text-black text-sm mt-2">
                          {row.fileError}
                        </div>
                      )}

                      {/* File Preview */}
                      {row.certificateFile &&
                        row.certificateFile.type.startsWith("image/") && (
                          <div className="mt-4 max-w-xs">
                            <img
                              src={URL.createObjectURL(row.certificateFile)}
                              alt="Certificate Preview"
                              className="rounded-lg shadow-md"
                            />
                          </div>
                        )}

                      {/* PDF Preview */}
                      {row.certificateFile &&
                        row.certificateFile.type === "application/pdf" && (
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
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Buttons Bottom */}
              <div className="mb-6 mt-10 flex flex-col sm:flex-row gap-3 sm:gap-2">
                <button
                  onClick={handleBackClick}
                  className="w-full sm:w-auto bg-[#1e3a8a] text-white px-6 py-3 sm:py-2 rounded text-base font-medium hover:bg-[#162a61] transition-colors duration-200"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="w-full sm:w-auto bg-green-500 text-white px-6 py-3 sm:py-2 rounded text-base font-medium hover:bg-green-600 transition-colors duration-200"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalMembershipsForm;