/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

/**
 * UpdateCourse.jsx
 * - ReactQuill rich text description (1500 char plain-text limit)
 * - Title limit 50 chars
 * - Main image + up to 4 sub images (existing + new)
 * - Each image <= 5MB (client-side check)
 * - existingSubImages sent as JSON string field "existingSubImages"
 */

const MAX_TITLE = 50;
const MAX_DESC = 1500; // plain text characters
const MAX_SUB_IMAGES = 4;
const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB

const UpdateCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "", // HTML from ReactQuill
    type: "course",
    uploadedDate: new Date().toISOString().split("T")[0],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // previews and file holders
  const [previewMainImage, setPreviewMainImage] = useState(null);
  const [mainImageFile, setMainImageFile] = useState(null);

  const [existingMainImage, setExistingMainImage] = useState(null);

  // existingSubImages: array of URLs (already on server)
  const [existingSubImages, setExistingSubImages] = useState([]);
  // new sub image files and previews: { file, preview }
  const [newSubImageFiles, setNewSubImageFiles] = useState([]);
  // previews only (derived)
  const [previewSubImages, setPreviewSubImages] = useState([]);

  const [plainTextLength, setPlainTextLength] = useState(0);

  const descriptionRef = useRef(null);

  const API_URL = `http://localhost:5000/api/events-courses/course/${courseId}`;

  // Fetch course details
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(API_URL);
        const course = response.data;

        // title fallback: some endpoints may use different field names
        const title = course.title ?? course.course_name ?? "";

        // uploaded date fallback and format
        let uploadedDate = new Date().toISOString().split("T")[0];
        if (course.uploaded_date) {
          try {
            uploadedDate = course.uploaded_date.split("T")[0];
          } catch (e) {
            uploadedDate = course.uploaded_date;
          }
        }

        // Parse sub_images robustly:
        let parsedSubImages = [];
        if (course.sub_images) {
          if (Array.isArray(course.sub_images)) {
            parsedSubImages = course.sub_images;
          } else if (typeof course.sub_images === "string") {
            const trimmed = course.sub_images.trim();
            // if looks like JSON array, parse it
            if (trimmed.startsWith("[")) {
              try {
                parsedSubImages = JSON.parse(trimmed);
                if (!Array.isArray(parsedSubImages)) parsedSubImages = [];
              } catch (err) {
                // fallback: treat as single URL string
                parsedSubImages = [trimmed];
              }
            } else {
              // treat as single url string (not JSON)
              parsedSubImages = [trimmed];
            }
          }
        }

        setFormData({
          title,
          description: course.description ?? "",
          type: course.type ?? "course",
          uploadedDate,
        });

        setExistingMainImage(course.main_image_url ?? null);
        setExistingSubImages(parsedSubImages);
      } catch (error) {
        console.error("Failed to fetch course:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to load course details. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    fetchCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  // Keep previewSubImages in sync with newSubImageFiles
  useEffect(() => {
    setPreviewSubImages(newSubImageFiles.map((i) => i.preview));
  }, [newSubImageFiles]);

  // Update plain text length whenever description HTML changes
  useEffect(() => {
    const plain = formData.description.replace(/<[^>]+>/g, "").replace(/\u00A0/g, ""); // remove NBSP
    const len = plain.trim().length;
    setPlainTextLength(len);
  }, [formData.description]);

  // Text change handlers with limits
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      if (value.length > MAX_TITLE) return; // silently block extra characters
      setFormData((p) => ({ ...p, title: value }));
    } else if (name === "uploadedDate") {
      setFormData((p) => ({ ...p, uploadedDate: value }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  const handleDescriptionChange = (value /* HTML from Quill */) => {
    const plain = value.replace(/<[^>]+>/g, "").replace(/\u00A0/g, "");
    if (plain.length > MAX_DESC) {
      // do not accept additional input if plain text limit reached
      return;
    }
    setFormData((p) => ({ ...p, description: value }));
  };

  // Main image upload (preview + file)
  const handleMainImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (file.size > MAX_IMAGE_BYTES) {
      Swal.fire({
        title: "File too large",
        text: "Main image must be 5MB or smaller.",
        icon: "warning",
      });
      return;
    }

    setMainImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewMainImage(reader.result);
    reader.readAsDataURL(file);
  };

  const removeMainImage = () => {
    setMainImageFile(null);
    setPreviewMainImage(null);
    setExistingMainImage(null);
  };

  // Sub images upload (max total = MAX_SUB_IMAGES)
  const handleSubImagesUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    // Check size per file and filter out oversized ones (and alert)
    const allowedFiles = [];
    const oversized = [];
    for (const f of files) {
      if (f.size > MAX_IMAGE_BYTES) oversized.push(f.name);
      else allowedFiles.push(f);
    }
    if (oversized.length > 0) {
      Swal.fire({
        title: "Some files skipped",
        html: `The following files exceed the 5MB limit and were ignored:<br/><strong>${oversized.join(
          ", "
        )}</strong>`,
        icon: "warning",
      });
    }

    // Count current total
    const currentTotal = existingSubImages.length + newSubImageFiles.length;
    const availableSlots = Math.max(0, MAX_SUB_IMAGES - currentTotal);
    const filesToAdd = allowedFiles.slice(0, availableSlots);

    if (filesToAdd.length === 0) {
      if (currentTotal >= MAX_SUB_IMAGES) {
        Swal.fire({
          title: "Limit reached",
          text: `You can upload a maximum of ${MAX_SUB_IMAGES} sub images (existing + new).`,
          icon: "info",
        });
      }
      return;
    }

    // Create preview objects
    const readers = filesToAdd.map(
      (file) =>
        new Promise((resolve) => {
          const r = new FileReader();
          r.onloadend = () => resolve({ file, preview: r.result });
          r.readAsDataURL(file);
        })
    );

    Promise.all(readers).then((newImages) => {
      setNewSubImageFiles((prev) => [...prev, ...newImages]);
    });
  };

  // Remove a new sub image by index
  const removeNewSubImage = (index) => {
    setNewSubImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Remove an existing sub image (by index)
  const removeExistingSubImage = (index) => {
    setExistingSubImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit (PUT) - sends existingSubImages as JSON string
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (formData.title.trim() === "") {
      Swal.fire({ title: "Validation", text: "Title is required.", icon: "info" });
      return;
    }
    if (plainTextLength === 0) {
      Swal.fire({ title: "Validation", text: "Description is required.", icon: "info" });
      return;
    }
    if (!mainImageFile && !existingMainImage) {
      Swal.fire({ title: "Validation", text: "Main image is required.", icon: "info" });
      return;
    }

    if (plainTextLength > MAX_DESC) {
      Swal.fire({
        title: "Too long",
        text: `Description must be ${MAX_DESC} characters or fewer.`,
        icon: "warning",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("description", formData.description); // HTML
      fd.append("type", formData.type);
      fd.append("uploadedDate", formData.uploadedDate);

      // Main image: new file or keep existingMainImage
      if (mainImageFile) {
        fd.append("mainImage", mainImageFile);
      } else if (existingMainImage) {
        // send as field so backend can decide to keep it
        fd.append("existingMainImage", existingMainImage);
      }

      // existingSubImages should be sent as JSON string (backend uses JSON.parse)
      fd.append("existingSubImages", JSON.stringify(existingSubImages || []));

      // append new sub image files
      newSubImageFiles.forEach((imgObj) => {
        fd.append("subImages", imgObj.file);
      });

      // Optional: if you need a flag when all sub images removed
      if (existingSubImages.length === 0 && newSubImageFiles.length === 0) {
        fd.append("allSubImagesRemoved", "true");
      }

      // PUT to your endpoint
      await axios.put(`http://localhost:5000/api/events-courses/${courseId}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        title: "Success",
        text: "Course updated successfully.",
        icon: "success",
      }).then(() => navigate("/view-courses-table"));
    } catch (err) {
      console.error("Update error:", err?.response?.data || err.message || err);
      Swal.fire({
        title: "Error",
        text: err?.response?.data?.error || "Failed to update course. Check console for details.",
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.title.trim() !== "" &&
      formData.title.length <= MAX_TITLE &&
      plainTextLength > 0 &&
      plainTextLength <= MAX_DESC &&
      (mainImageFile || existingMainImage)
    );
  };

  // ReactQuill modules and formats (same toolbar as UpdateEvent)
  const quillModules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["clean"],
    ],
  };
  const quillFormats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "indent",
    "align",
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mb-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#2543B1] mt-2">
            Update Course
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 md:p-8">
          {/* TITLE */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Title (max {MAX_TITLE} characters)
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              maxLength={MAX_TITLE}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Course title"
            />
            <p className="text-right text-gray-500 text-sm">{formData.title.length}/{MAX_TITLE}</p>
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
                    alt="Main preview"
                    className="w-full h-full object-contain p-2"
                  />
                  <button
                    type="button"
                    onClick={removeMainImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    title="Remove main image"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-7">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="pt-1 text-sm text-gray-400">Click to upload main image</p>
                </div>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleMainImageUpload} />
            </label>
          </div>

          {/* SUB IMAGES */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Sub Images (maximum {MAX_SUB_IMAGES} images, each ≤ 5MB)
            </label>

            <label
              className={`flex flex-col w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 ${
                existingSubImages.length + newSubImageFiles.length >= MAX_SUB_IMAGES ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              <div className="flex flex-col items-center justify-center pt-7">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="pt-1 text-sm text-gray-400">
                  {existingSubImages.length + newSubImageFiles.length >= MAX_SUB_IMAGES ? `Max ${MAX_SUB_IMAGES} images reached` : "Click to upload sub images"}
                </p>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleSubImagesUpload}
                disabled={existingSubImages.length + newSubImageFiles.length >= MAX_SUB_IMAGES}
              />
            </label>

            {(existingSubImages.length > 0 || newSubImageFiles.length > 0) && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {existingSubImages.map((imgUrl, idx) => (
                  <div key={`existing-${idx}`} className="relative">
                    <img src={imgUrl} alt={`sub-${idx}`} className="w-full h-24 object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => removeExistingSubImage(idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6"
                      title="Remove"
                    >
                      ×
                    </button>
                  </div>
                ))}

                {newSubImageFiles.map((imgObj, idx) => (
                  <div key={`new-${idx}`} className="relative">
                    <img src={imgObj.preview} alt={`new-sub-${idx}`} className="w-full h-24 object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => removeNewSubImage(idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6"
                      title="Remove"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <p className="text-right text-gray-500 text-sm mt-2">
              {existingSubImages.length + newSubImageFiles.length}/{MAX_SUB_IMAGES} images
            </p>
          </div>

          {/* DESCRIPTION */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Description (max {MAX_DESC} characters)
            </label>

            <ReactQuill
              theme="snow"
              value={formData.description}
              onChange={handleDescriptionChange}
              modules={quillModules}
              formats={quillFormats}
              className="bg-white border rounded-md"
            />

            <p className="text-right text-gray-500 text-sm mt-1">{plainTextLength}/{MAX_DESC}</p>
          </div>

          {/* DATE */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">Upload Date</label>
            <input type="date" name="uploadedDate" value={formData.uploadedDate} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
          </div>

          {/* SUBMIT */}
          <div className="text-center mt-8">
            <button
              type="submit"
              disabled={!isFormValid() || isSubmitting}
              className={`bg-[#2D387D] text-white px-8 py-3 rounded-md w-full sm:w-auto ${
                !isFormValid() || isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-900"
              }`}
            >
              {isSubmitting ? "Updating..." : "Update Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCourse;
