import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoAddCircleOutline, IoRemoveCircleOutline, IoReload } from "react-icons/io5";
import Swal from "sweetalert2";

const TrainingExperience = () => {
  const [activeStep, setActiveStep] = useState(3);
  const [isOngoing, setIsOngoing] = useState(false);
  const navigate = useNavigate();
  const [picturePreview, setPicturePreview] = useState(null);
  const [pictureName, setPictureName] = useState("");
  const [certificatePreview, setCertificatePreview] = useState(null);
  const [certificateName, setCertificateName] = useState("");
  const [fileError, setFileError] = useState("");
  const [isRotating, setIsRotating] = useState(false);
  const location = useLocation();
  const userId = location.state?.userId;

  // State for multiple training entries
  const [trainingEntries, setTrainingEntries] = useState([
    {
      periodOfWork: {
        from: "",
        to: "",
        ongoing: false,
      },
      placeOfWork: "",
      positionHeld: "",
      workDescription: "",
      certificateFile: null,
      certificatePath: "",
    },
  ]);

  // Add a new training entry
  const addNewEntry = () => {
    setTrainingEntries([
      ...trainingEntries,
      {
        periodOfWork: {
          from: "",
          to: "",
          ongoing: false,
        },
        placeOfWork: "",
        positionHeld: "",
        workDescription: "",
        certificateFile: null,
        certificatePath: "",
      },
    ]);
  };

  // Remove a training entry
  const removeEntry = (index) => {
    const newEntries = [...trainingEntries];
    newEntries.splice(index, 1);
    setTrainingEntries(newEntries);
  };

  // Handle input changes for a specific training entry
  const handleInputChange = (index, field, value) => {
    const newEntries = [...trainingEntries];
    newEntries[index][field] = value;
    setTrainingEntries(newEntries);
  };

  // Handle period of work changes for a specific training entry
  const handlePeriodOfWorkChange = (index, field, value) => {
    const newEntries = [...trainingEntries];
    if (field === "ongoing") {
      newEntries[index].periodOfWork.to = value ? "Ongoing" : "";
      newEntries[index].periodOfWork.ongoing = value;
    } else {
      newEntries[index].periodOfWork[field] = value;
    }
    setTrainingEntries(newEntries);
  };

  // Handle file upload for a specific training entry
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
      if (!allowedTypes.includes(file.type)) {
        setFileError("Please upload PDF or Image files only (PDF, JPEG, PNG)");
        return;
      }

      if (file.size > maxSize) {
        setFileError("File size should be less than 5MB");
        return;
      }

      const newEntries = [...trainingEntries];
      newEntries[index].certificateFile = file;
      newEntries[index].certificatePath = URL.createObjectURL(file);
      setTrainingEntries(newEntries);
      setFileError("");
    }
  };

  // Handle file upload to the server
  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://72.60.42.161/api/upload/training-certificate", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
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
    
    // Validate required fields
    const missingFields = [];
    trainingEntries.forEach((entry, index) => {
      if (!entry.periodOfWork.from) missingFields.push(`Period of Work (From) - Row ${index + 1}`);
      if (!entry.periodOfWork.to && !entry.periodOfWork.ongoing) missingFields.push(`Period of Work (To) - Row ${index + 1}`);
      if (!entry.placeOfWork) missingFields.push(`Place of Work - Row ${index + 1}`);
      if (!entry.positionHeld) missingFields.push(`Position Held - Row ${index + 1}`);
      if (!entry.workDescription) missingFields.push(`Work Description - Row ${index + 1}`);
      if (!entry.certificateFile) missingFields.push(`Certificate File - Row ${index + 1}`);
    });
  
    if (missingFields.length > 0) {
      // Skip API call and navigate directly to the next step
      navigate("/register/register-acadamic/register-proposes/training/professional-membership", {
        state: { userId },
      });
      return;
    }
  
    try {
      // Prepare the payload
      const payload = await Promise.all(
        trainingEntries.map(async (entry) => {
          const filePath = await handleFileUpload(entry.certificateFile);
          return {
            periodOfWorkFrom: entry.periodOfWork.from,
            periodOfWorkTo: entry.periodOfWork.ongoing ? null : entry.periodOfWork.to,
            ongoing: entry.periodOfWork.ongoing,
            placeOfWork: entry.placeOfWork,
            positionHeld: entry.positionHeld,
            workDescription: entry.workDescription,
            trainingCertificatePath: filePath,
          };
        })
      );
  
      // Send the payload to the backend
      const response = await fetch("http://72.60.42.161/api/register/training", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId, // Include userId in the payload
          trainingEntries: payload, // Include trainingEntries in the payload
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit form data.");
      }
  
      const result = await response.json();
      console.log("Form submission successful:", result.message);
  
      // Navigate to the next step after successful submission
      navigate("/register/register-acadamic/register-proposes/training/professional-membership", {
        state: { userId },
      });
    } catch (error) {
      console.error("Error during form submission:", error.message);
      alert("Failed to submit form data. Please try again.");
    }
  };
  

  return (
    <div className="min-h-screen bg-[#EDEDED] px-0 py-8">
      <div className="max-w-[1500px] mx-auto bg-[#EDEDED] mb-24 rounded-lg lg:px-16 px-8 py-6">
        <h1 className="text-2xl font-semibold mb-4 lg:text-left text-center">
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
              <form onSubmit={handleSubmit}>
                {/* Training Entries Section */}
                {trainingEntries.map((entry, index) => (
                  <div key={index} className="lg:bg-white rounded-lg lg:p-6 lg:shadow-sm mb-6">
                    <h2 className="text-lg font-bold lg:mt-0 mt-16">
                      Training & Experience {index + 1}:
                    </h2>

                    {/* Period of Work Section */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div>
                        <label className="block font-bold mb-2">
                          From: <span className=""></span>
                        </label>
                        <select
                          value={entry.periodOfWork.from}
                          onChange={(e) =>
                            handlePeriodOfWorkChange(index, "from", e.target.value)
                          }
                          className="w-full border border-gray-300 rounded p-2"
                        >
                          <option value="">Select year</option>
                          {Array.from({ length: new Date().getFullYear() - 1950 + 1 }, (_, i) => 1950 + i)
                            .reverse()
                            .map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold mb-2">
                          To: <span className=""></span>
                        </label>
                        <select
                          value={entry.periodOfWork.to}
                          onChange={(e) =>
                            handlePeriodOfWorkChange(index, "to", e.target.value)
                          }
                          className="w-full border border-gray-300 rounded p-2"
                          disabled={entry.periodOfWork.ongoing}
                        >
                          <option value="">Select year</option>
                          {Array.from({ length: new Date().getFullYear() - 1950 + 1 }, (_, i) => 1950 + i)
                            .reverse()
                            .map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                        </select>
                        <div className="mt-2 lg:flex hidden">
                          <label className="inline-flex items-center">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300"
                              checked={entry.periodOfWork.ongoing}
                              onChange={(e) =>
                                handlePeriodOfWorkChange(index, "ongoing", e.target.checked)
                              }
                            />
                            <span className="ml-2 font-bold">Ongoing</span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block mb-2 font-bold">
                          Place of Work : <span className=""></span>
                        </label>
                        <input
                          type="text"
                          value={entry.placeOfWork}
                          onChange={(e) =>
                            handleInputChange(index, "placeOfWork", e.target.value)
                          }
                          className="w-full border border-gray-300 rounded p-2"
                          placeholder="Enter place of work"
                        />
                      </div>

                      <div>
                        <label className="font-bold block mb-2">
                          Position Held: <span className=""></span>
                        </label>
                        <input
                          type="text"
                          value={entry.positionHeld}
                          onChange={(e) =>
                            handleInputChange(index, "positionHeld", e.target.value)
                          }
                          className="w-full border border-gray-300 rounded p-2"
                        />
                      </div>

                      <div className="mt-2 lg:hidden">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                            checked={entry.periodOfWork.ongoing}
                            onChange={(e) =>
                              handlePeriodOfWorkChange(index, "ongoing", e.target.checked)
                            }
                          />
                          <span className="ml-2 font-bold">Ongoing</span>
                        </label>
                      </div>
                    </div>

                    {/* Work Description Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                      <div className="md:col-span-2">
                        <label className="block mb-2 font-bold">
                          Concise Description of Work Carried Out :{" "}
                          <span className=""></span>
                        </label>
                        <textarea
                          value={entry.workDescription}
                          onChange={(e) =>
                            handleInputChange(index, "workDescription", e.target.value)
                          }
                          className="w-full border border-gray-300 rounded p-2 h-32"
                        />
                      </div>

                      <div>
                        <label className="block font-bold mb-2">
                          Upload Certification : <span className=""></span>
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
                            type="button"
                            onClick={() =>
                              document.getElementById(`certificateInput-${index}`).click()
                            }
                            className="bg-[#1e3a8a] text-white lg:w-[118px] w-full px-6 py-2 rounded hover:bg-[#1e3a8a]/90 transition-colors mt-4"
                          >
                            Browse...
                          </button>
                        </div>

                        {/* File Name Display */}
                        {entry.certificateFile && (
                          <div className="mt-2">
                            <div className="text-sm text-gray-600 break-all">
                              <strong>File Name:</strong> {entry.certificateFile.name}
                            </div>
                          </div>
                        )}

                        {/* Error Message */}
                        {fileError && (
                          <div className="text-black text-sm mt-2">{fileError}</div>
                        )}

                        {/* File Preview */}
                        {entry.certificateFile && (
                          <div className="mt-4">
                            {entry.certificateFile.type.startsWith("image/") ? (
                              // Image Preview
                              <img
                                src={entry.certificatePath}
                                alt="Certificate Preview"
                                className="rounded-lg shadow-md max-w-full h-auto"
                              />
                            ) : entry.certificateFile.type === "application/pdf" ? (
                              // PDF Preview (Show an icon or message)
                              <div className="flex items-center text-sm text-gray-600">
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
                            ) : (
                              // Unsupported File Type
                              <div className="text-sm text-gray-600">
                                Unsupported file type. Please upload a PDF or image.
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Add/Remove Buttons */}
                    <div className="flex items-center justify-end gap-4 mt-6">
                      {trainingEntries.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeEntry(index)}
                          className="w-10 h-10 bg-red-500 rounded-full text-white flex items-center justify-center"
                        >
                          <IoRemoveCircleOutline className="text-2xl" />
                        </button>
                      )}
                      {index === trainingEntries.length - 1 && (
                        <button
                          type="button"
                          onClick={addNewEntry}
                          className="w-10 h-10 bg-green-500 rounded-full text-white flex items-center justify-center"
                        >
                          <IoAddCircleOutline className="text-2xl" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {/* Navigation Buttons */}
                <div className="mb-6 mt-10 flex flex-col sm:flex-row gap-3 sm:gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      navigate("/register/register-acadamic")
                    }
                    className="w-full sm:w-auto bg-[#1e3a8a] text-white px-6 py-3 sm:py-2 rounded text-base font-medium hover:bg-[#162a61] transition-colors duration-200"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-[#1e3a8a] text-white px-6 py-3 sm:py-2 rounded text-base font-medium hover:bg-[#162a61] transition-colors duration-200"
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

export default TrainingExperience;