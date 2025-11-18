import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddEventCourseForm = () => {
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
  const [mainImageFile, setMainImageFile] = useState(null);
  const [subImageFiles, setSubImageFiles] = useState([]);

  const API_URL = "http://localhost:5000/api/events-courses";

  // LIMITS
  const TITLE_LIMIT = 50;
  const DESCRIPTION_LIMIT = 1500;
  const MAX_SUB_IMAGES = 4;

  // HANDLE INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title" && value.length > TITLE_LIMIT) return;

    setFormData({ ...formData, [name]: value });
  };

  // DESCRIPTION CHANGE (ReactQuill)
  const handleDescriptionChange = (value) => {
    const plainText = value.replace(/<[^>]+>/g, "");
    if (plainText.length > DESCRIPTION_LIMIT) return;

    setFormData({ ...formData, description: value });
  };

  // MAIN IMAGE
  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewMainImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // SUB IMAGES
  const handleSubImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    const totalImages = subImageFiles.length + files.length;

    if (totalImages > MAX_SUB_IMAGES) {
      const allowedCount = MAX_SUB_IMAGES - subImageFiles.length;
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
    setSubImageFiles(subImageFiles.filter((_, i) => i !== index));
    setPreviewSubImages(previewSubImages.filter((_, i) => i !== index));
  };

  // VALIDATE
  const isFormValid = () => {
    return (
      formData.title.trim() !== "" &&
      formData.description.replace(/<[^>]+>/g, "").trim() !== "" &&
      formData.title.length <= TITLE_LIMIT &&
      formData.description.replace(/<[^>]+>/g, "").length <= DESCRIPTION_LIMIT &&
      mainImageFile &&
      formData.type !== ""
    );
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    try {
      setIsSubmitting(true);

      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("type", formData.type);
      formDataToSend.append("uploadedDate", formData.uploadedDate);
      formDataToSend.append("mainImage", mainImageFile);

      subImageFiles.forEach((file) => {
        formDataToSend.append("subImages", file);
      });

      await axios.post(API_URL, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        title: "Success!",
        text: `Your ${formData.type} has been added.`,
        icon: "success",
        confirmButtonColor: "#2D387D",
      });

      // Reset
      setFormData({
        title: "",
        description: "",
        type: "event",
        uploadedDate: new Date().toISOString().split("T")[0],
      });
      setMainImageFile(null);
      setSubImageFiles([]);
      setPreviewMainImage(null);
      setPreviewSubImages([]);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to add. Try again.",
        icon: "error",
        confirmButtonColor: "#2D387D",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mb-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#2543B1] mt-2">
            Add New {formData.type === "event" ? "Event" : "Course"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 md:p-8">

          {/* TYPE */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="event">Event</option>
              <option value="course">Course</option>
            </select>
          </div>

          {/* TITLE */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Title (max {TITLE_LIMIT} characters)
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              maxLength={TITLE_LIMIT}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <p className="text-right text-gray-500 text-sm">{formData.title.length}/{TITLE_LIMIT}</p>
          </div>

          {/* MAIN IMAGE */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">Main Image (Max 5 MB)</label>
            <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              {previewMainImage ? (
                <div className="relative w-full h-full">
                  <img src={previewMainImage} className="w-full h-full object-contain p-2" />
                  <button
                    type="button"
                    onClick={() => { setMainImageFile(null); setPreviewMainImage(null); }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >×</button>
                </div>
              ) : (
                <p className="pt-10 text-sm text-gray-400 text-center">Click to upload main image</p>
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
                {previewSubImages.length >= MAX_SUB_IMAGES ? "Max images reached" : "Click to upload sub images"}
              </p>
              <input type="file" accept="image/*" multiple className="hidden"
                onChange={handleSubImagesUpload}
                disabled={previewSubImages.length >= MAX_SUB_IMAGES}
              />
            </label>
            {previewSubImages.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {previewSubImages.map((img, idx) => (
                  <div key={idx} className="relative">
                    <img src={img} className="w-full h-24 object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => removeSubImage(idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >×</button>
                  </div>
                ))}
              </div>
            )}
            <p className="text-right text-gray-500 text-sm mt-2">{previewSubImages.length}/{MAX_SUB_IMAGES} images</p>
          </div>

          {/* DESCRIPTION */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Description (max {DESCRIPTION_LIMIT} characters)
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
                "bold","italic","underline","strike","list","bullet","indent","align",
              ]}
              className="bg-white border rounded-md"
            />
            <p className="text-right text-gray-500 text-sm mt-1">
              {formData.description.replace(/<[^>]+>/g, "").length}/{DESCRIPTION_LIMIT}
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
              disabled={!isFormValid() || isSubmitting}
              className={`bg-[#2D387D] text-white px-8 py-3 rounded-md w-full sm:w-auto ${
                !isFormValid() || isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-900"
              }`}
            >
              {isSubmitting ? "Adding..." : `Add ${formData.type === "event" ? "Event" : "Course"}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventCourseForm;
