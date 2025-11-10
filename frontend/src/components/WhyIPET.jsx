/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// // eslint-disable-next-line no-unused-vars
// import React from "react";
// import { Link } from "react-router-dom"; // Import Link from React Router

// const WhyIPET = ({ onClick, isLoading = false }) => {
//   return (
//     <>
//       {/* Desktop View */}
//       <div className="container mx-auto px-4 md:h-[480px] sm:h-[500px] sm:px-6 md:px-20 py-16 hidden md:block">
//         <div className="max-w-[1168px] items-start space-y-8">
//           <h2 className="text-[#2543B1] text-3xl md:text-[30px] sm:text-4xl font-[600]">
//             Why IPET
//           </h2>

//           <p className="text-[#000000] md:text-[20px] sm:text-[18px] font-[400] leading-relaxed">
//             We are committed to shaping the next generation of innovators and
//             problem solvers. With a legacy of excellence in education, our
//             institution provides a world-class learning environment that fosters
//             creativity, technical skills, and critical thinking. Equipped with
//             state-of-the-art labs, experienced faculty, and a focus on hands-on
//             learning.
//           </p>

//           <p className="text-[#000000] md:text-[20px] sm:text-lg font-[400] mb-8 leading-relaxed">
//             Join us in building a better future through innovation, technology,
//             and leadership.
//           </p>

//           {/* Read More Button with Link */}
//           <Link to="/aboutus">
//             <button
//               className="bg-[#2D387D] text-white text-[16px] font-[600] px-6 py-3 rounded-md hover:bg-[#1a2359] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
//               onClick={onClick}
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <span className="flex items-center gap-2">
//                   <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     />
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
//                     />
//                   </svg>
//                   Loading...
//                 </span>
//               ) : (
//                 "Read More"
//               )}
//             </button>
//           </Link>
//         </div>
//       </div>

//       {/* Mobile View */}
//       <div className="container mx-auto px-6 h-[250px] md:h-[480px] sm:h-[500px] sm:px-6 md:px-20 py-10 md:hidden mb-12">
//         <div className="max-w-full text-center space-y-[20px] h-[162px]">
//           <h2 className="text-[#2543B1] text-[14px] md:text-[30px] sm:text-4xl font-[600]">
//             Why IPET
//           </h2>

//           <p className="text-[#000000] text-center text-[13px] md:text-[20px] sm:text-[18px] font-[400] leading-4">
//             We are committed to shaping the next generation of innovators and
//             problem solvers. With a legacy of excellence in education, our
//             institution provides a world-class learning environment that fosters
//             creativity, technical skills, and critical thinking. Equipped with
//             state-of-the-art labs, experienced faculty, and a focus on hands-on
//             learning.
//           </p>

//           <p className="text-[#000000] text-center text-[13px] md:text-[20px] sm:text-lg font-[400] mb-8 leading-4">
//             Join us in building a better future through innovation, technology,
//             and leadership.
//           </p>

//           {/* Read More Button with Link */}
//           <Link to="/aboutus">
//             <button className="bg-[#2D387D] h-[28px] w-[380px] text-white text-[12px] font-[600] px-[8px] py-[5px] rounded-md hover:bg-[#1a2359] transition-colors duration-300 mt-6">
//               Read More
//             </button>
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// };

// export default WhyIPET;



// import React from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// const WhyIPET = ({ onClick, isLoading = false }) => {
//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.8,
//         ease: "easeOut",
//         when: "beforeChildren",
//         staggerChildren: 0.2
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut"
//       }
//     }
//   };

//   const buttonVariants = {
//     hidden: { opacity: 0, scale: 0.9 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: {
//         delay: 0.4,
//         duration: 0.5,
//         type: "spring",
//         stiffness: 100
//       }
//     },
//     hover: {
//       scale: 1.05,
//       boxShadow: "0px 5px 15px rgba(45, 56, 125, 0.3)"
//     },
//     tap: {
//       scale: 0.98
//     }
//   };

//   return (
//     <>
//       {/* Desktop View */}
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//         className="container mx-auto px-4 md:h-[480px] sm:h-[500px] sm:px-6 md:px-20 py-16 hidden md:block"
//       >
//         <div className="max-w-[1168px] items-start space-y-8">
//           <motion.h2 
//             variants={itemVariants}
//             className="text-[#2543B1] text-3xl md:text-[30px] sm:text-4xl font-[600]"
//           >
//             Why IPET
//           </motion.h2>

//           <motion.p 
//             variants={itemVariants}
//             className="text-[#000000] md:text-[20px] sm:text-[18px] font-[400] leading-relaxed"
//           >
//             We are committed to shaping the next generation of innovators and
//             problem solvers. With a legacy of excellence in education, our
//             institution provides a world-class learning environment that fosters
//             creativity, technical skills, and critical thinking. Equipped with
//             state-of-the-art labs, experienced faculty, and a focus on hands-on
//             learning.
//           </motion.p>

//           <motion.p 
//             variants={itemVariants}
//             className="text-[#000000] md:text-[20px] sm:text-lg font-[400] mb-8 leading-relaxed"
//           >
//             Join us in building a better future through innovation, technology,
//             and leadership.
//           </motion.p>

//           {/* Read More Button with Link */}
//           <Link to="/aboutus">
//             <motion.button
//               variants={buttonVariants}
//               whileHover="hover"
//               whileTap="tap"
//               className="bg-[#2D387D] text-white text-[16px] font-[600] px-6 py-3 rounded-md hover:bg-[#1a2359] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
//               onClick={onClick}
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <motion.span 
//                   className="flex items-center gap-2"
//                   animate={{ opacity: [0.6, 1, 0.6] }}
//                   transition={{ duration: 1.5, repeat: Infinity }}
//                 >
//                   <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     />
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
//                     />
//                   </svg>
//                   Loading...
//                 </motion.span>
//               ) : (
//                 "Read More"
//               )}
//             </motion.button>
//           </Link>
//         </div>
//       </motion.div>

//       {/* Mobile View */}
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//         className="container mx-auto px-6 h-[250px] md:h-[480px] sm:h-[500px] sm:px-6 md:px-20 py-10 md:hidden mb-12"
//       >
//         <div className="max-w-full text-center space-y-[20px] h-[162px]">
//           <motion.h2 
//             variants={itemVariants}
//             className="text-[#2543B1] text-[14px] md:text-[30px] sm:text-4xl font-[600]"
//           >
//             Why IPET
//           </motion.h2>

//           <motion.p 
//             variants={itemVariants}
//             className="text-[#000000] text-center text-[13px] md:text-[20px] sm:text-[18px] font-[400] leading-4"
//           >
//             We are committed to shaping the next generation of innovators and
//             problem solvers. With a legacy of excellence in education, our
//             institution provides a world-class learning environment that fosters
//             creativity, technical skills, and critical thinking. Equipped with
//             state-of-the-art labs, experienced faculty, and a focus on hands-on
//             learning.
//           </motion.p>

//           <motion.p 
//             variants={itemVariants}
//             className="text-[#000000] text-center text-[13px] md:text-[20px] sm:text-lg font-[400] mb-8 leading-4"
//           >
//             Join us in building a better future through innovation, technology,
//             and leadership.
//           </motion.p>

//           {/* Read More Button with Link */}
//           <Link to="/aboutus">
//             <motion.button
//               variants={buttonVariants}
//               whileHover="hover"
//               whileTap="tap"
//               className="bg-[#2D387D] h-[28px] w-[380px] text-white text-[12px] font-[600] px-[8px] py-[5px] rounded-md hover:bg-[#1a2359] transition-colors duration-300 mt-6"
//             >
//               Read More
//             </motion.button>
//           </Link>
//         </div>
//       </motion.div>
//     </>
//   );
// };

// export default WhyIPET;

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const WhyIPET = ({ onClick, isLoading = false }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.4,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(45, 56, 125, 0.3)"
    },
    tap: {
      scale: 0.98
    }
  };

  return (
    <>
      {/* Desktop View */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px" }}
        variants={containerVariants}
        className="container mx-auto px-4 md:h-[480px] sm:h-[500px] sm:px-6 md:px-20 py-16 hidden md:block"
      >
        <div className="max-w-[1168px] items-start space-y-8">
          <motion.h2 
            variants={itemVariants}
            className="text-[#2543B1] text-3xl md:text-[30px] sm:text-4xl font-[600]"
          >
            Why IPET
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="text-[#000000] md:text-[20px] sm:text-[18px] font-[400] leading-relaxed"
          >
            We are committed to shaping the next generation of innovators and
            problem solvers. With a legacy of excellence in education, our
            institution provides a world-class learning environment that fosters
            creativity, technical skills, and critical thinking. Equipped with
            state-of-the-art labs, experienced faculty, and a focus on hands-on
            learning.
          </motion.p>

          <motion.p 
            variants={itemVariants}
            className="text-[#000000] md:text-[20px] sm:text-lg font-[400] mb-8 leading-relaxed"
          >
            Join us in building a better future through innovation, technology,
            and leadership.
          </motion.p>

          {/* Read More Button with Link */}
          <Link to="/aboutus">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="bg-[#2D387D] text-white text-[16px] font-[600] px-6 py-3 rounded-md hover:bg-[#1a2359] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              onClick={onClick}
              disabled={isLoading}
            >
              {isLoading ? (
                <motion.span 
                  className="flex items-center gap-2"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Loading...
                </motion.span>
              ) : (
                "Read More"
              )}
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Mobile View */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-50px" }}
        variants={containerVariants}
        className="container mx-auto px-6 h-[250px] md:h-[480px] sm:h-[500px] sm:px-6 md:px-20 py-10 md:hidden mb-12"
      >
        <div className="max-w-full text-center space-y-[20px] h-[162px]">
          <motion.h2 
            variants={itemVariants}
            className="text-[#2543B1] text-[14px] md:text-[30px] sm:text-4xl font-[600]"
          >
            Why IPET
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="text-[#000000] text-center text-[13px] md:text-[20px] sm:text-[18px] font-[400] leading-4"
          >
            We are committed to shaping the next generation of innovators and
            problem solvers. With a legacy of excellence in education, our
            institution provides a world-class learning environment that fosters
            creativity, technical skills, and critical thinking. Equipped with
            state-of-the-art labs, experienced faculty, and a focus on hands-on
            learning.
          </motion.p>

          <motion.p 
            variants={itemVariants}
            className="text-[#000000] text-center text-[13px] md:text-[20px] sm:text-lg font-[400] mb-8 leading-4"
          >
            Join us in building a better future through innovation, technology,
            and leadership.
          </motion.p>

          {/* Read More Button with Link */}
          <Link to="/aboutus">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="bg-[#2D387D] h-[28px] w-[380px] text-white text-[12px] font-[600] px-[8px] py-[5px] rounded-md hover:bg-[#1a2359] transition-colors duration-300 mt-6"
            >
              Read More
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default WhyIPET;