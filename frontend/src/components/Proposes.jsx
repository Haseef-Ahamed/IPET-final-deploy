import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoReload } from "react-icons/io5";
import Swal from "sweetalert2";

const Proposes = () => {
  const [activeStep, setActiveStep] = useState(3);
  const [membershipRows, setMembershipRows] = useState([1, 2]);
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId; // Retrieve userId from location state

  console.log(userId);

  // State for form data
  const [proposers, setProposers] = useState([
    { nameWithInitials: "", classOfMembership: "", membershipNumber: "", certificateFile: null, certificatePath: "" },
    { nameWithInitials: "", classOfMembership: "", membershipNumber: "", certificateFile: null, certificatePath: "" },
  ]);

  // State for search fields
  const [searchByName, setSearchByName] = useState("");
  const [searchByMembershipNumber, setSearchByMembershipNumber] = useState("");

  const [fileErrors, setFileErrors] = useState([]); // To handle file validation errors

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
        navigate("/register/register-acadamic/register-proposes");
        break;
      case 4:
        navigate("/register/register-acadamic/register-proposes/training");
        break;
      case 5:
        navigate(
          "/register/register-acadamic/register-proposes/training/professional-membership"
        );
        break;
      default:
        break;
    }
  };

  const handleRemoveFile = (index) => {
    const updatedProposers = [...proposers];
    updatedProposers[index].certificateFile = null; // Clear the file
    updatedProposers[index].certificatePath = ""; // Clear the file path
    setProposers(updatedProposers);
  
    // Clear any file errors for this index
    const updatedErrors = [...fileErrors];
    updatedErrors[index] = "";
    setFileErrors(updatedErrors);
  };

  const handleInputChange = (index, field, value) => {
    const updatedProposers = [...proposers];
    updatedProposers[index][field] = value;
    setProposers(updatedProposers);
  };

  const handleFileChange = async (index, file) => {
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (file) {
      // File type validation
      if (!allowedTypes.includes(file.type)) {
        const updatedErrors = [...fileErrors];
        updatedErrors[index] = "Please upload PDF or Image files only (PDF, JPEG, PNG)";
        setFileErrors(updatedErrors);
        return;
      }

      // File size validation
      if (file.size > maxSize) {
        const updatedErrors = [...fileErrors];
        updatedErrors[index] = "File size should be less than 5MB";
        setFileErrors(updatedErrors);
        return;
      }

      // Prepare FormData for file upload
      const formData = new FormData();
      formData.append("file", file);

      try {
        // Send the file to the backend
        const response = await fetch("http://localhost:5000/api/upload/proposer-certificate", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload file.");
        }

        const result = await response.json();
        const filePath = result.filePath; // Get the file path from the backend

        // Update the proposer's state with the file path
        const updatedProposers = [...proposers];
        updatedProposers[index].certificateFile = file;
        updatedProposers[index].certificatePath = filePath;
        setProposers(updatedProposers);

        // Clear any previous errors
        const updatedErrors = [...fileErrors];
        updatedErrors[index] = "";
        setFileErrors(updatedErrors);
      } catch (error) {
        console.error("Error uploading file:", error.message);
        const updatedErrors = [...fileErrors];
        updatedErrors[index] = "Failed to upload file. Please try again.";
        setFileErrors(updatedErrors);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form data
    const errors = [];
    proposers.forEach((proposer, index) => {
      if (
        !proposer.nameWithInitials ||
        !proposer.classOfMembership ||
        !proposer.membershipNumber ||
        !proposer.certificatePath
      ) {
        errors[index] = "All fields are required.";
      }
    });
  
    if (errors.length > 0) {
      Swal.fire({
        icon: "error", // Use an error icon
        title: "Missing Fields", // Title of the alert
        text: "Please fill all fields and upload certificates.", // Message
        confirmButtonColor: "#1e3a8a", // Custom button color
        confirmButtonText: "OK", // Button text
      });
      return;
    }
  
    // Prepare data for API submission
    const data = {
      userId,
      proposers, // proposers is already an array of objects
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/register/proposers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify(data), // Send data as JSON
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit form data.");
      }
  
      const result = await response.json();
      console.log(result.message);
  
      // Navigate to the next step
      navigate("/register/register-acadamic/register-proposes/training", {
        state: { userId: userId },
      });
    } catch (error) {
      console.error("Error:", error.message);
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
            {/* Top Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div>
                <label className="block text-sm font-bold mb-1">
                  Class Of Membership : *
                </label>
                <select className="w-full border rounded p-2">
                  <option>Select</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-sm mb-1">
                  Engineering Discipline : *
                </label>
                <select className="w-full border rounded p-2">
                  <option>Select</option>
                </select>
              </div>

              {/* Picture Upload */}
              <div className="">
                <label className="block text-sm mb-1 font-bold">
                  Picture Upload : *
                </label>
                <input
                  type="file"
                  id="pictureInput"
                  className="hidden"
                  accept="image/*"
                />
                <button
                  onClick={() => document.getElementById("pictureInput").click()}
                  className="lg:w-[118px] w-full bg-[#2D387D] text-white rounded p-2 hover:bg-[#232d66] transition-colors"
                >
                  Browse...
                </button>
              </div>

              {/* Certificate Upload */}
              <div className="">
                <label className="block text-sm mb-1 font-bold">
                  Birth Certificate Upload : *
                </label>
                <input
                  type="file"
                  id="certificateInput"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <button
                  onClick={() => document.getElementById("certificateInput").click()}
                  className="lg:w-[118px] w-full bg-[#2D387D] text-white rounded p-2 hover:bg-[#232d66] transition-colors"
                >
                  Browse...
                </button>
              </div>
            </div>

            {/* Steps Navigation */}
            <div className="w-full max-w-7xl mx-auto px-0 sm:px-6 lg:px-0">
              <div className="relative">
                <div className="flex flex-row justify-between items-stretch gap-[1px] mb-0.5 overflow-x-auto scrollbar-hide">
                  {/* Step 1 */}
                  <div
                    className={`flex-1 p-3 sm:p-4 text-white ${
                      activeStep === 1 ? "bg-[#1e3a8a]" : "bg-[#2563eb]"
                    } flex flex-col justify-center min-h-[60px] sm:min-h-[80px] min-w-[150px] sm:min-w-[200px] cursor-pointer transition-colors duration-200 hover:bg-[#1e3a8a]`}
                    onClick={() => handleStepClick(1)}
                  >
                    <div className="text-sm sm:text-base font-medium whitespace-nowrap">
                      Step 1
                    </div>
                    <div className="text-xs sm:text-sm mt-1 whitespace-nowrap">
                      Personal Information
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div
                    className={`flex-1 p-3 sm:p-4 text-white ${
                      activeStep === 2 ? "bg-[#1e3a8a]" : "bg-[#2563eb]"
                    } flex flex-col justify-center min-h-[60px] sm:min-h-[80px] min-w-[150px] sm:min-w-[200px] cursor-pointer transition-colors duration-200 hover:bg-[#1e3a8a]`}
                    onClick={() => handleStepClick(2)}
                  >
                    <div className="text-sm sm:text-base font-medium whitespace-nowrap">
                      Step 2
                    </div>
                    <div className="text-xs sm:text-sm mt-1 whitespace-nowrap">
                      Academic Qualifications
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div
                    className={`flex-1 p-3 sm:p-4 text-white ${
                      activeStep === 3 ? "bg-[#1e3a8a]" : "bg-[#2563eb]"
                    } flex flex-col justify-center min-h-[60px] sm:min-h-[80px] min-w-[150px] sm:min-w-[200px] cursor-pointer transition-colors duration-200 hover:bg-[#1e3a8a]`}
                    onClick={() => handleStepClick(3)}
                  >
                    <div className="text-sm sm:text-base font-medium whitespace-nowrap">
                      Step 3
                    </div>
                    <div className="text-xs sm:text-sm mt-1 whitespace-nowrap">
                      Proposers
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div
                    className={`flex-1 p-3 sm:p-4 text-white ${
                      activeStep === 4 ? "bg-[#1e3a8a]" : "bg-[#2563eb]"
                    } flex flex-col justify-center min-h-[60px] sm:min-h-[80px] min-w-[150px] sm:min-w-[200px] cursor-pointer transition-colors duration-200 hover:bg-[#1e3a8a]`}
                  >
                    <div className="text-sm sm:text-base font-medium whitespace-nowrap">
                      Step 4
                    </div>
                    <div className="text-xs sm:text-sm mt-1 whitespace-nowrap">
                      Training & Experience
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div
                    className={`flex-1 p-3 sm:p-4 text-white ${
                      activeStep === 5 ? "bg-[#1e3a8a]" : "bg-[#2563eb]"
                    } flex flex-col justify-center min-h-[60px] sm:min-h-[80px] min-w-[150px] sm:min-w-[200px] cursor-pointer transition-colors duration-200 hover:bg-[#1e3a8a]`}
                  >
                    <div className="text-sm sm:text-base font-medium whitespace-nowrap">
                      Step 5
                    </div>
                    <div className="text-xs sm:text-sm mt-1 whitespace-nowrap">
                      Professional Memberships
                    </div>
                  </div>
                </div>

                {/* Arrow Indicator */}
                <div
                  className="absolute -bottom-5 transition-all duration-200 sm:block"
                  style={{
                    left: `${(activeStep - 1) * (100 / 5) + 100 / 10}%`,
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

            {/* Main Form */}
            <div className="max-w-7xl mx-auto bg-[#EDEDED] border-t-8 border-t-[#2D387D] border-b-8 border-b-[#2D387D] lg:shadow-md lg:p-6">
              <form onSubmit={handleSubmit}>
                {/* Search Section */}
                <div className="lg:bg-white rounded-lg lg:p-6 lg:shadow-sm">
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h2 className="font-bold mb-4 lg:mt-0 mt-10">Search by Name</h2>
                      <input
                        type="text"
                        placeholder="Type at least 3 Characters"
                        value={searchByName}
                        onChange={(e) => setSearchByName(e.target.value)}
                        className="w-full border border-gray-300 rounded p-2"
                      />
                    </div>
                    <div>
                      <h2 className="font-bold mb-4">Search by Membership Number</h2>
                      <input
                        type="text"
                        placeholder="Type at least 3 Characters"
                        value={searchByMembershipNumber}
                        onChange={(e) => setSearchByMembershipNumber(e.target.value)}
                        className="w-full border border-gray-300 rounded p-2"
                      />
                    </div>
                  </div>
                </div>

                {/* Proposers Section */}
                <div className="lg:bg-white rounded-lg lg:p-6 lg:shadow-sm">
                  {proposers.map((proposer, index) => (
                    <div key={index} className="relative">
                      <div className="grid md:grid-cols-4 gap-4 mb-6">
                        <div>
                          <label className="block font-bold mb-2">
                            Name With Initials : <span className="">*</span>
                          </label>
                          <input
                            type="text"
                            value={proposer.nameWithInitials}
                            onChange={(e) =>
                              handleInputChange(index, "nameWithInitials", e.target.value)
                            }
                            className="w-full border border-gray-300 rounded p-2"
                          />
                        </div>
                        <div>
                          <label className="block font-bold mb-2">
                            Class Of Membership : <span className="">*</span>
                          </label>
                          <input
                            type="text"
                            value={proposer.classOfMembership}
                            onChange={(e) =>
                              handleInputChange(index, "classOfMembership", e.target.value)
                            }
                            className="w-full border border-gray-300 rounded p-2"
                          />
                        </div>
                        <div>
                          <label className="block font-bold mb-2">
                            Membership Number : <span className="">*</span>
                          </label>
                          <input
                            type="text"
                            value={proposer.membershipNumber}
                            onChange={(e) =>
                              handleInputChange(index, "membershipNumber", e.target.value)
                            }
                            className="w-full border border-gray-300 rounded p-2"
                          />
                        </div>
                        <div>
  <label className="block mb-2">
    Upload Certification : <span className="">*</span>
  </label>
  <div className="flex flex-col sm:flex-row justify-between gap-4 -mt-4">
    <input
      type="file"
      id={`certificateInput-${index}`}
      className="hidden"
      accept=".pdf,.jpg,.jpeg,.png"
      onChange={(e) => handleFileChange(index, e.target.files[0])}
    />
    <button
      type="button" // Add this line to prevent form submission
      onClick={() =>
        document.getElementById(`certificateInput-${index}`).click()
      }
      className="bg-[#1e3a8a] text-white lg:w-[118px] w-full px-6 py-2 rounded hover:bg-[#1e3a8a]/90 transition-colors mt-4"
    >
      Browse...
    </button>
    {/* Display the uploaded file name and cross mark */}
    {proposers[index].certificateFile && (
      <div className="flex items-center gap-2 ml-2">
        <span className="text-sm text-gray-600">
          {proposers[index].certificateFile.name}
        </span>
        <button
          type="button"
          onClick={() => handleRemoveFile(index)}
          className="text-red-500 hover:text-red-700"
        >
          ❌
        </button>
      </div>
    )}
    {fileErrors[index] && (
      <div className="text-red-500 text-sm">{fileErrors[index]}</div>
    )}
  </div>
</div>
        
                      </div>
                      {index < proposers.length - 1 && (
                        <hr className="border-gray-200 my-6" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Navigation Buttons */}
                <div className="mb-6 mt-10 flex flex-col sm:flex-row gap-3 sm:gap-2">
                  <button
                    onClick={() => navigate("/register/register-acadamic")}
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

export default Proposes;