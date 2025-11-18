import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const UpdateEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "event",
    uploadedDate: new Date().toISOString().split("T")[0],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewMainImage, setPreviewMainImage] = useState(null);
  const [previewSubImages, setPreviewSubImages] = useState([]);
  const descriptionRef = useRef(null);

  const [mainImageFile, setMainImageFile] = useState(null);
  const [subImageFiles, setSubImageFiles] = useState([]);

  const [existingMainImage, setExistingMainImage] = useState(null);
  const [existingSubImages, setExistingSubImages] = useState([]);

  const API_URL = `http://localhost:5000/api/events-courses/event/${eventId}`;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${API_URL}`);
        const event = response.data;

        setFormData({
          title: event.title,
          description: event.description,
          type: event.type,
          uploadedDate: event.uploaded_date.split("T")[0],
        });

        setExistingMainImage(event.main_image_url);

        setExistingSubImages(
          typeof event.sub_images === "string"
            ? JSON.parse(event.sub_images || "[]")
            : event.sub_images || []
        );
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Failed to fetch event details.",
          icon: "error",
        });
      }
    };

    fetchEvent();
  }, [eventId]);

  // LIMIT INPUT WHILE TYPING
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Limit title to 50 chars
    if (name === "title" && value.length > 50) return;

    setFormData({ ...formData, [name]: value });
  };

  // DESCRIPTION (React Quill)
  const handleDescriptionChange = (value) => {
    const plainText = value.replace(/<[^>]+>/g, "");
    if (plainText.length > 1500) return;

    setFormData({ ...formData, description: value });
  };

  // MAIN IMAGE UPLOAD
  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewMainImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // SUB IMAGES - MAX 4
  const handleSubImagesUpload = (e) => {
    const files = Array.from(e.target.files);

    const totalImages =
      existingSubImages.length + previewSubImages.length + files.length;

    if (totalImages > 4) {
      const allowedCount = 4 - (existingSubImages.length + previewSubImages.length);
      files.splice(allowedCount);
    }

    if (files.length > 0) {
      setSubImageFiles([...subImageFiles, ...files]);

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

  const removeSubImage = (index) => {
    const newSubFiles = [...subImageFiles];
    newSubFiles.splice(index, 1);

    const newPreviews = [...previewSubImages];
    newPreviews.splice(index, 1);

    setSubImageFiles(newSubFiles);
    setPreviewSubImages(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("type", formData.type);
      formDataToSend.append("uploadedDate", formData.uploadedDate);

      if (mainImageFile) {
        formDataToSend.append("mainImage", mainImageFile);
      }

      // Keep old sub-images
      for (const imageUrl of existingSubImages) {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], `existing-${Date.now()}.jpg`, {
          type: blob.type,
        });
        formDataToSend.append("subImages", file);
      }

      // Add new sub-images
      subImageFiles.forEach((file) => {
        formDataToSend.append("subImages", file);
      });

      await axios.put(
        `http://localhost:5000/api/events-courses/${eventId}`,
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      Swal.fire({
        title: "Success!",
        text: `Your ${formData.type} has been updated.`,
        icon: "success",
      }).then(() => navigate("/view-events-table"));
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to update event.",
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // BUTTON DISABLE LOGIC
  const isFormValid = () => {
    return (
      formData.title.trim() !== "" &&
      formData.description.replace(/<[^>]+>/g, "").trim() !== "" &&
      formData.title.length <= 50 &&
      formData.description.replace(/<[^>]+>/g, "").length <= 1500 &&
      (mainImageFile || existingMainImage) &&
      formData.type !== ""
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mb-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#2543B1] mt-2">
            Update {formData.type === "event" ? "Event" : "Course"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 md:p-8">
          {/* TITLE */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Title (max 50 characters)
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              maxLength="50"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <p className="text-right text-gray-500 text-sm">{formData.title.length}/50</p>
          </div>

          {/* MAIN IMAGE */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Main Image (Max 5 MB)
            </label>

            <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              {previewMainImage || existingMainImage ? (
                <div className="relative w-full h-full">
                  <img
                    src={previewMainImage || existingMainImage}
                    className="w-full h-full object-contain p-2"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setMainImageFile(null);
                      setPreviewMainImage(null);
                      setExistingMainImage(null);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <p className="pt-10 text-sm text-gray-400 text-center">
                  Click to upload main image
                </p>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleMainImageUpload} />
            </label>
          </div>

          {/* SUB IMAGES */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Sub Images (maximum 4 images, each ≤ 5MB)
            </label>

            <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <p className="pt-10 text-sm text-gray-400 text-center">
                {existingSubImages.length + previewSubImages.length >= 4
                  ? "Max 4 images reached"
                  : "Click to upload sub images"}
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleSubImagesUpload}
                disabled={existingSubImages.length + previewSubImages.length >= 4}
              />
            </label>

            {(existingSubImages.length > 0 || previewSubImages.length > 0) && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {existingSubImages.map((img, idx) => (
                  <div key={idx} className="relative">
                    <img src={img} className="w-full h-24 object-cover rounded" />
                    <button
                      type="button"
                      onClick={() =>
                        setExistingSubImages(existingSubImages.filter((_, i) => i !== idx))
                      }
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {previewSubImages.map((img, idx) => (
                  <div key={idx} className="relative">
                    <img src={img} className="w-full h-24 object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => removeSubImage(idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <p className="text-right text-gray-500 text-sm mt-2">
              {existingSubImages.length + previewSubImages.length}/4 images
            </p>
          </div>

          {/* DESCRIPTION */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Description (max 1500 characters)
            </label>

            <ReactQuill
              theme="snow"
              value={formData.description}
              onChange={handleDescriptionChange}
              modules={{
                toolbar: [
                  ["bold", "italic", "underline", "strike"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  [{ indent: "-1" }, { indent: "+1" }],
                  [{ align: [] }],
                  ["clean"],
                ],
              }}
              formats={[
                "bold",
                "italic",
                "underline",
                "strike",
                "list",
                "bullet",
                "indent",
                "align",
              ]}
              className="bg-white border rounded-md"
            />

            <p className="text-right text-gray-500 text-sm mt-1">
              {formData.description.replace(/<[^>]+>/g, "").length}/1500
            </p>
          </div>

          {/* DATE */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              {formData.type === "event" ? "Event Date" : "Upload Date"}
            </label>

            <input
              type="date"
              name="uploadedDate"
              value={formData.uploadedDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <div className="text-center mt-8">
            <button
              type="submit"
              disabled={!isFormValid()}
              className={`bg-[#2D387D] text-white px-8 py-3 rounded-md w-full sm:w-auto ${
                !isFormValid() ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-900"
              }`}
            >
              Update {formData.type}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEvent;
