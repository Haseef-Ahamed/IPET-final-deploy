import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const UpdateCourse = () => {
  const { courseId } = useParams(); // Get course ID from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "course", // Default to course
    uploadedDate: new Date().toISOString().split("T")[0],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [previewMainImage, setPreviewMainImage] = useState(null);
  const descriptionRef = useRef(null);

  // Store actual file objects
  const [mainImageFile, setMainImageFile] = useState(null);
  const [newSubImageFiles, setNewSubImageFiles] = useState([]);
  
  // Store existing image URLs
  const [existingMainImage, setExistingMainImage] = useState(null);
  const [existingSubImages, setExistingSubImages] = useState([]);
  
  // Track removed sub-images
  const [removedSubImages, setRemovedSubImages] = useState([]);

  // API URL - replace with your actual backend URL
  const API_URL = `http://72.60.42.161/api/events-courses/course/${courseId}`;

  // Fetch course data by ID
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${API_URL}`);
        const course = response.data;

        setFormData({
          title: course.title,
          description: course.description,
          type: course.type,
          uploadedDate: course.uploaded_date.split("T")[0], // Ensure it's in YYYY-MM-DD format
        });

        // Set existing images
        setExistingMainImage(course.main_image_url);
        
        // Properly handle sub_images whether it's a string or array
        if (course.sub_images) {
          const subImagesArray = typeof course.sub_images === "string"
            ? JSON.parse(course.sub_images)
            : course.sub_images;
          
          setExistingSubImages(Array.isArray(subImagesArray) ? subImagesArray : []);
        }
      } catch (error) {
        console.error("Error fetching course:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to fetch course details. Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    fetchCourse();
  }, [courseId, API_URL]);

  // Text formatting options for the description
  const formatText = (formatType) => {
    const textarea = descriptionRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.description.substring(start, end);
    let formattedText = "";

    switch (formatType) {
      case "bold":
        formattedText = `**${selectedText}**`;
        break;
      case "italic":
        formattedText = `*${selectedText}*`;
        break;
      default:
        formattedText = selectedText;
    }

    const newDescription =
      formData.description.substring(0, start) +
      formattedText +
      formData.description.substring(end);

    setFormData({ ...formData, description: newDescription });

    // Set focus back to textarea
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + formattedText.length,
        start + formattedText.length
      );
    }, 0);
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  // Handle main image upload
  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImageFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewMainImage(reader.result);
      };
      reader.readAsDataURL(file);

      // Clear error for this field if it exists
      if (formErrors.mainImage) {
        setFormErrors({
          ...formErrors,
          mainImage: "",
        });
      }
    }
  };

  // Handle main image removal
  const handleRemoveMainImage = () => {
    setMainImageFile(null);
    setPreviewMainImage(null);
    setExistingMainImage(null);
  };

  // Handle sub images upload
  const handleSubImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // Create new preview objects that contain both the file and preview URL
      const processFiles = async () => {
        const newImages = await Promise.all(
          files.map(async (file) => {
            return new Promise((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                resolve({
                  file: file,
                  preview: reader.result
                });
              };
              reader.readAsDataURL(file);
            });
          })
        );
        
        // Add new images without replacing existing ones
        setNewSubImageFiles((prev) => [...prev, ...newImages]);
      };
      
      processFiles();
    }
  };

  // Remove a new sub image
  const removeNewSubImage = (index) => {
    setNewSubImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Remove an existing sub image
  const removeExistingSubImage = (index) => {
    // Get the image URL that's being removed
    const removedImage = existingSubImages[index];
    
    // Add it to the removedSubImages array
    setRemovedSubImages(prev => [...prev, removedImage]);
    
    // Remove it from the existingSubImages array
    setExistingSubImages(prev => prev.filter((_, i) => i !== index));
  };

  // Clear all sub images
  const clearAllSubImages = () => {
    // Add all existing sub images to removed list
    setRemovedSubImages(prev => [...prev, ...existingSubImages]);
    // Clear existing and new sub images
    setExistingSubImages([]);
    setNewSubImageFiles([]);
  };

  // Validate form
  const validateForm = () => {
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }

    if (!mainImageFile && !existingMainImage) {
      errors.mainImage = "Main image is required";
    }

    if (!formData.type) {
      errors.type = "Please select a type";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      try {
        setIsSubmitting(true);
  
        // Create form data for file upload
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("type", formData.type);
        formDataToSend.append("uploadedDate", formData.uploadedDate);

        // Append main image if updated
        if (mainImageFile) {
          formDataToSend.append("mainImage", mainImageFile);
        } else if (existingMainImage) {
          // If using existing main image, send the URL
          formDataToSend.append("existingMainImage", existingMainImage);
        }
        
        // Append new sub images
        newSubImageFiles.forEach(imageObj => {
          formDataToSend.append("subImages", imageObj.file);
        });
        
        // Append existing sub images that weren't removed
        formDataToSend.append("existingSubImages", JSON.stringify(existingSubImages));
        
        // Append removed sub images
        formDataToSend.append("removedSubImages", JSON.stringify(removedSubImages));
  
        // For debugging, log the FormData entries
        for (let pair of formDataToSend.entries()) {
          console.log(pair[0], pair[1]);
        }

        // Send data to API
        const response = await axios.put(
          `http://72.60.42.161/api/events-courses/${courseId}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        // Show success message
        Swal.fire({
          title: "Success!",
          text: `Your ${formData.type} has been successfully updated.`,
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#2D387D",
        }).then(() => {
          navigate("/view-courses-table"); // Redirect to view courses page
        });
      } catch (error) {
        console.error("Error updating course:", error.response?.data || error.message);
  
        Swal.fire({
          title: "Error",
          text: error.response?.data?.error || "Failed to update course. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#2D387D",
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.log("Form validation failed");
    }
  };

  // Check if form is valid for enabling/disabling submit button
  const isFormValid = () => {
    return (
      formData.title.trim() !== "" &&
      formData.description.trim() !== "" &&
      (mainImageFile !== null || existingMainImage !== null) &&
      formData.type !== ""
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#2543B1] mt-2">Update {formData.type === "course" ? "Course" : "Event"}</h2>
          </div>

          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 md:p-8">
            {/* Type Selection */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="course">Course</option>
                <option value="event">Event</option>
              </select>
              {formErrors.type && (
                <p className="text-red-500 text-xs mt-1">{formErrors.type}</p>
              )}
            </div>

            {/* Title */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Enter ${formData.type} title`}
              />
              {formErrors.title && (
                <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>
              )}
            </div>

            {/* Main Image */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Main Image
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  {previewMainImage || existingMainImage ? (
                    <div className="relative w-full h-full">
                      <img
                        src={previewMainImage || existingMainImage}
                        alt="Main preview"
                        className="w-full h-full object-contain p-2"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveMainImage}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-7">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <p className="pt-1 text-sm text-gray-400">
                        Click to upload main image
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleMainImageUpload}
                  />
                </label>
              </div>
              {formErrors.mainImage && (
                <p className="text-red-500 text-xs mt-1">{formErrors.mainImage}</p>
              )}
            </div>

            {/* Sub Images (Optional) */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-gray-700 text-sm font-medium">
                  Sub Images (Optional)
                </label>
              </div>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex flex-col items-center justify-center pt-7">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <p className="pt-1 text-sm text-gray-400">
                      Click to upload additional sub images
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleSubImagesUpload}
                  />
                </label>
              </div>

              {/* Display sub images */}
              {(newSubImageFiles.length > 0 || existingSubImages.length > 0) && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Current Images</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {/* Existing sub images */}
                    {existingSubImages.map((imageUrl, index) => (
                      <div key={`existing-${index}`} className="relative">
                        <img
                          src={imageUrl}
                          alt={`Existing sub image ${index + 1}`}
                          className="w-full h-24 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeExistingSubImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    
                    {/* New sub images */}
                    {newSubImageFiles.map((imageObj, index) => (
                      <div key={`new-${index}`} className="relative">
                        <img
                          src={imageObj.preview}
                          alt={`New sub image ${index + 1}`}
                          className="w-full h-24 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeNewSubImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Description with Formatting */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Description
              </label>
              <div className="border border-gray-300 rounded-md overflow-hidden">
                <div className="bg-gray-100 p-2 border-b border-gray-300 flex space-x-2">
                  <button
                    type="button"
                    onClick={() => formatText("bold")}
                    className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
                    title="Bold"
                  >
                    <strong>B</strong>
                  </button>
                  <button
                    type="button"
                    onClick={() => formatText("italic")}
                    className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
                    title="Italic"
                  >
                    <em>I</em>
                  </button>
                </div>
                <textarea
                  ref={descriptionRef}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="8"
                  className="w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                  placeholder={`Enter ${formData.type} description (use ** for bold and * for italic text)`}
                ></textarea>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                <p>Formatting tips:</p>
                <ul className="list-disc ml-5">
                  <li>Use ** for <strong>bold text</strong> (e.g., **bold text**)</li>
                  <li>Use * for <em>italic text</em> (e.g., *italic text*)</li>
                  <li>Use blank lines between paragraphs for spacing</li>
                </ul>
              </div>
              {formErrors.description && (
                <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>
              )}
            </div>

            {/* Upload Date */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                {formData.type === "course" ? "Upload Date" : "Event Date"}
              </label>
              <input
                type="date"
                name="uploadedDate"
                value={formData.uploadedDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center mt-8">
              <button
                type="submit"
                disabled={!isFormValid() || isSubmitting}
                className={`bg-[#2D387D] text-white px-8 py-3 rounded-md transition-colors duration-300 text-base font-medium w-full sm:w-auto ${
                  !isFormValid() || isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-900"
                }`}
              >
                {isSubmitting ? "Updating..." : `Update ${formData.type === "course" ? "Course" : "Event"}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateCourse;