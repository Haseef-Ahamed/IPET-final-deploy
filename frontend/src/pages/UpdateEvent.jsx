import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const UpdateEvent = () => {
  const { eventId } = useParams(); // Get event ID from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "event",
    uploadedDate: new Date().toISOString().split("T")[0],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [previewMainImage, setPreviewMainImage] = useState(null);
  const [previewSubImages, setPreviewSubImages] = useState([]);
  const descriptionRef = useRef(null);

  // Store actual file objects
  const [mainImageFile, setMainImageFile] = useState(null);
  const [subImageFiles, setSubImageFiles] = useState([]);

  // Store existing image URLs
  const [existingMainImage, setExistingMainImage] = useState(null);
  const [existingSubImages, setExistingSubImages] = useState([]);

  // API URL - replace with your actual backend URL
  const API_URL = `http://72.60.42.161/api/events-courses/event/${eventId}`;
  console.log(API_URL);

  // Fetch event data by ID
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${API_URL}`);
        console.log("Raw API Response:", response); // Log the entire response
        const event = response.data;
    
        setFormData({
          title: event.title,
          description: event.description,
          type: event.type,
          uploadedDate: event.uploaded_date.split("T")[0], // Ensure it's in YYYY-MM-DD format
        });
    
        // Set existing images
        setExistingMainImage(event.main_image_url);
        setExistingSubImages(
          typeof event.sub_images === "string"
            ? JSON.parse(event.sub_images || "[]")
            : event.sub_images || []
        );
      } catch (error) {
        console.error("Error fetching event:", error);
        console.error("Error response data:", error.response?.data); // Log the error response
        Swal.fire({
          title: "Error",
          text: "Failed to fetch event details. Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    fetchEvent();
  }, [eventId]);

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

  // Handle sub images upload
  const handleSubImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setSubImageFiles([...subImageFiles, ...files]);

      // Create preview URLs
      const newPreviews = [];
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result);
          if (newPreviews.length === files.length) {
            setPreviewSubImages([...previewSubImages, ...newPreviews]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Remove a sub image
  const removeSubImage = (index) => {
    const newSubImageFiles = [...subImageFiles];
    newSubImageFiles.splice(index, 1);

    const newPreviews = [...previewSubImages];
    newPreviews.splice(index, 1);

    setSubImageFiles(newSubImageFiles);
    setPreviewSubImages(newPreviews);
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
        }
  
        // Convert existing sub-image URLs to files and append them
        for (const imageUrl of existingSubImages) {
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          const file = new File([blob], `existing-sub-image-${Date.now()}.jpg`, { type: blob.type });
          formDataToSend.append("subImages", file);
        }
  
        // Append new sub-images
        subImageFiles.forEach((file) => {
          formDataToSend.append("subImages", file);
        });
  
        // Send data to API
        const response = await axios.put(
          `http://72.60.42.161/api/events-courses/${eventId}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        console.log("API Response:", response.data);
  
        // Show success message
        Swal.fire({
          title: "Success!",
          text: `Your ${formData.type} has been successfully updated.`,
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#2D387D",
        }).then(() => {
          navigate("/view-events-table"); // Redirect to view events page
        });
      } catch (error) {
        console.error("Error updating event:", error.response?.data || error.message);
  
        Swal.fire({
          title: "Error",
          text: error.response?.data?.error || "Failed to update event. Please try again.",
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
            <h2 className="text-2xl md:text-3xl font-semibold text-[#2543B1] mt-2">Update {formData.type === "event" ? "Event" : "Course"}</h2>
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
                <option value="event">Event</option>
                <option value="course">Course</option>
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
                        onClick={() => {
                          setMainImageFile(null);
                          setPreviewMainImage(null);
                        }}
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
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Sub Images (Optional)
              </label>
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
                      Click to upload sub images
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

              {/* Preview sub images */}
              {(previewSubImages.length > 0 || existingSubImages.length > 0) && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {existingSubImages.map((image, index) => (
                    <div key={`existing-${index}`} className="relative">
                      <img
                        src={image}
                        alt={`Existing sub image ${index + 1}`}
                        className="w-full h-24 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updatedSubImages = existingSubImages.filter((_, i) => i !== index);
                          setExistingSubImages(updatedSubImages);
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {previewSubImages.map((preview, index) => (
                    <div key={`new-${index}`} className="relative">
                      <img
                        src={preview}
                        alt={`New sub image ${index + 1}`}
                        className="w-full h-24 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeSubImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  ))}
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
                {formData.type === "event" ? "Event Date" : "Upload Date"}
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
                disabled={!isFormValid()}
                className={`bg-[#2D387D] text-white px-8 py-3 rounded-md transition-colors duration-300 text-base font-medium w-full sm:w-auto ${
                  !isFormValid()
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-900"
                }`}
              >
                Update {formData.type === "event" ? "Event" : "Course"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateEvent;