/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; // Import useNavigate

// const ViewCourses = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate(); // Initialize useNavigate

//   // Fetch courses from the backend
//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await axios.get(
//           "http://72.60.42.161/api/events-courses/course"
//         );

//         if (response.data) {
//           setCourses(response.data);
//         } else {
//           setError("No courses found.");
//         }
//       } catch (err) {
//         console.error("Error fetching courses:", err);
//         setError("Failed to fetch courses. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   // Handle card click to navigate to course details
//   const handleCardClick = (courseId) => {
//     navigate(`/courses/${courseId}`); // Navigate to the course details page
//   };

//   return (
//     <div className="px-4 py-12 mb-20 bg-gray-50 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-7xl">
//         {/* Page Title */}
//         <h1 className="text-3xl font-bold text-[#2543B1] text-center mb-8">
//           IPET Courses
//         </h1>

//         {/* Courses Grid */}
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {courses.map((course) => (
//             <div
//               key={course.id}
//               className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg" // Add cursor-pointer
//               onClick={() => handleCardClick(course.id)} // Add onClick handler
//             >
//               {/* Course Image */}
//               <div className="w-full h-48 overflow-hidden">
//                 <img
//                   src={course.main_image_url}
//                   alt={course.title}
//                   className="object-cover w-full h-full"
//                 />
//               </div>

//               {/* Course Title */}
//               <div className="p-4">
//                 <h2 className="text-lg font-semibold text-[#2D387D]">
//                   {course.title}
//                 </h2>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewCourses;

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewCourses = ({ coursesToShow }) => {
  const [courses, setCourses] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [loading, setLoading] = useState(!coursesToShow);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 },
    },
  };

  // Fetch courses from the backend
  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://72.60.42.161/api/events-courses/course"
  //       );

  //       if (response.data) {
  //         setCourses(response.data);
  //       } else {
  //         setError("No courses found.");
  //       }
  //     } catch (err) {
  //       console.error("Error fetching courses:", err);
  //       setError("Failed to fetch courses. Please try again later.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCourses();
  // }, []);
  // useEffect(() => {
  //   if (coursesToShow && coursesToShow.length > 0) {
  //     setCourses(coursesToShow);
  //     setLoading(false);
  //     return;
  //   }

  //   // Otherwise fetch all courses
  //   const fetchCourses = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://72.60.42.161/api/events-courses/course"
  //       );

  //       if (response.data) {
  //         setCourses(response.data);
  //       } else {
  //         setError("No courses found.");
  //       }
  //     } catch (err) {
  //       console.error("Error fetching courses:", err);
  //       setError("Failed to fetch courses. Please try again later.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCourses();
  // }, [coursesToShow]);

  useEffect(() => {
    if (coursesToShow && coursesToShow.length > 0) {
      setCourses(coursesToShow);
      setLoading(false);
      return;
    }

    // Only fetch if no courses were passed
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://72.60.42.161/api/events-courses/course"
        );
        setCourses(response.data || []);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [coursesToShow]);

  // Handle card click to navigate to course details
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

        {/* Loading and Error States */}
        {loading && (
          <motion.div className="text-center" variants={itemVariants}>
            <p className="text-[#2D387D]">Loading courses...</p>
          </motion.div>
        )}

        {error && (
          <motion.div
            className="text-center text-red-500"
            variants={itemVariants}
          >
            {error}
          </motion.div>
        )}

        {/* Courses Grid */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          variants={containerVariants}
        >
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              variants={itemVariants}
              whileHover="hover"
              onClick={() => handleCardClick(course.id)}
              className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md cursor-pointer"
              custom={index}
            >
              {/* Course Image */}
              <motion.div
                className="w-full h-48 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={course.main_image_url}
                  alt={course.title}
                  className="object-cover w-full h-full"
                />
              </motion.div>

              {/* Course Title */}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-[#2D387D]">
                  {course.title}
                </h2>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ViewCourses;
