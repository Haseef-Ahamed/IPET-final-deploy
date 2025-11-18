/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewCourses = ({ coursesToShow }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(!coursesToShow);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const COURSES_PER_PAGE = 6;

  /* ------------------- Animation variants ------------------- */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, when: "beforeChildren" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 },
    },
  };

  /* ------------------- Fetch courses ------------------- */
  useEffect(() => {
    if (coursesToShow && coursesToShow.length > 0) {
      setCourses(coursesToShow);
      setLoading(false);
      return;
    }

    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/events-courses/course"
        );
        setCourses(response.data || []);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to fetch courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [coursesToShow]);

  /* ------------------- Pagination Logic ------------------- */
  const paginatedCourses = useMemo(() => {
    const start = (currentPage - 1) * COURSES_PER_PAGE;
    const end = start + COURSES_PER_PAGE;
    return courses.slice(start, end);
  }, [courses, currentPage]);

  const totalPages = Math.ceil(courses.length / COURSES_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCardClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <motion.div
      className="px-4 py-12 mb-20 bg-gray-50 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="mx-auto max-w-7xl">
        {/* Page Title */}
        <motion.h1
          className="text-3xl font-bold text-[#2543B1] text-center mb-8"
          variants={itemVariants}
        >
          IPET Courses
        </motion.h1>

        {/* Loading State */}
        {loading && (
          <motion.div className="text-center" variants={itemVariants}>
            <p className="text-[#2D387D]">Loading courses...</p>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div className="text-center text-red-500" variants={itemVariants}>
            {error}
          </motion.div>
        )}

        {/* Courses Grid – 6 per page */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 px-4 sm:px-0"
          variants={containerVariants}
        >
          {paginatedCourses.map((course, index) => (
            <motion.div
              key={course.id}
              variants={itemVariants}
              whileHover="hover"
              onClick={() => handleCardClick(course.id)}
              className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md cursor-pointer flex flex-col min-h-[380px]"
              custom={index}
            >
              <motion.div
                className="w-full h-64 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={course.main_image_url}
                  alt={course.title}
                  className="object-cover w-full h-full"
                />
              </motion.div>

              <div className="p-5 flex-1 flex items-center justify-center">
                <h2 className="text-lg font-semibold text-[#2D387D] text-center line-clamp-3">
                  {course.title}
                </h2>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No courses message */}
        {!loading && !error && courses.length === 0 && (
          <motion.div className="text-center py-10" variants={itemVariants}>
            <p className="text-gray-500">No courses available at the moment.</p>
          </motion.div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <motion.div
            className="flex justify-center items-center gap-2 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#2D387D] text-white hover:bg-[#1e2655]"
              }`}
            >
              Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${
                  currentPage === page
                    ? "bg-[#2D387D] text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#2D387D] text-white hover:bg-[#1e2655]"
              }`}
            >
              Next
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ViewCourses;