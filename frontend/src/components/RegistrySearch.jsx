// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const RegistrySearch = () => {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSearch = () => {
//     setIsLoading(true);
//     // navigate("/personal");
//     navigate("/ipetmis")
//     // Simulate search delay
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 1500);
//   };

//   return (
//     <>
//       <div className="min-h-[218px] w-full bg-gradient-to-r from-slate-100 to-slate-200 p-6 relative hidden md:block">
//         <div className="container flex flex-col items-center justify-between py-12 mx-auto md:flex-row sm:flex-col md:px-36 sm:px-8 md:space-x-0 sm:space-y-6">
//           {/* Left side text */}
//           <div className="text-[#2543B1] text-xl md:text-[30px] font-[400]">
//             {isLoading ? (
//               <div className="animate-pulse">Searching...</div>
//             ) : (
//               "Registry search results will appear here"
//             )}
//           </div>

//           {/* Right side button/badge */}
//           <button
//             onClick={handleSearch}
//             disabled={isLoading}
//             className={`bg-[#2A316B] text-white px-6 py-4 rounded-xl shadow-lg 
//             transition-all duration-300 hover:shadow-xl hover:scale-105 
//             ${isLoading ? "opacity-90 cursor-wait" : "cursor-pointer"}`}
//           >
//             <div className="text-center w-[350px] h-[69px] py-4">
//               <div className="text-[20px] md:text-[20px] sm:text-[18px] font-[700]">
//                 <span>Registered Engineers</span>
//                 <span className="mx-2 text-blue-300">/</span>
//                 <span>Technologists</span>
//               </div>
//             </div>
//           </button>
//         </div>
//       </div>

//       {/* mobile view */}
//       <div className="min-h-[139px] w-full bg-gradient-to-r from-slate-100 to-slate-200 p-6 relative  md:hidden">
//         <div className="container mx-auto flex flex-col md:flex-row sm:flex-col justify-between items-center px-0 md:px-36 sm:px-8 py-[31px] md:space-x-0 gap-[35px]">
//           {/* Left side text */}
//           <div className="text-[#2543B1] text-center text-[12px] md:text-[30px] font-[400] h-[18px] w-[392px]">
//             {isLoading ? (
//               <div className="animate-pulse">Searching...</div>
//             ) : (
//               "Registry search results will appear here"
//             )}
//           </div>

//           {/* Right side button/badge */}
//           <button
//             onClick={handleSearch}
//             disabled={isLoading}
//             className={`bg-[#2A316B] text-white  py-2 rounded-[5px] shadow-lg 
//             transition-all duration-300 hover:shadow-xl hover:scale-105 
//             ${isLoading ? "opacity-90 cursor-wait" : "cursor-pointer"}`}
//           >
//             <div className="text-center w-[380px] h-[38px] py-2">
//               <div className="text-[14px] md:text-[20px] sm:text-[6px] font-[700]">
//                 <span>Registered Engineers</span>
//                 <span className="mx-0.5 text-blue-300">/</span>
//                 <span>Technologists</span>
//               </div>
//             </div>
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default RegistrySearch;


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// const RegistrySearch = () => {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSearch = () => {
//     setIsLoading(true);
//     navigate("/ipetmis");
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 1500);
//   };

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.8,
//         ease: "easeOut"
//       }
//     }
//   };

//   const buttonVariants = {
//     hover: {
//       scale: 1.05,
//       boxShadow: "0 10px 20px rgba(42, 49, 107, 0.3)",
//       transition: {
//         duration: 0.3,
//         yoyo: 1
//       }
//     },
//     tap: {
//       scale: 0.98
//     },
//     loading: {
//       scale: 0.98,
//       opacity: 0.9
//     }
//   };

//   const textVariants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: {
//         delay: 0.3,
//         duration: 0.6
//       }
//     }
//   };

//   return (
//     <>
//       {/* Desktop View */}
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//         className="min-h-[218px] w-full bg-gradient-to-r from-slate-100 to-slate-200 p-6 relative hidden md:block"
//       >
//         <div className="container flex flex-col items-center justify-between py-12 mx-auto md:flex-row sm:flex-col md:px-36 sm:px-8 md:space-x-0 sm:space-y-6">
//           {/* Left side text */}
//           <motion.div 
//             variants={textVariants}
//             className="text-[#2543B1] text-xl md:text-[30px] font-[400]"
//           >
//             {isLoading ? (
//               <motion.div
//                 animate={{
//                   opacity: [0.6, 1, 0.6],
//                 }}
//                 transition={{
//                   duration: 1.5,
//                   repeat: Infinity
//                 }}
//               >
//                 Searching...
//               </motion.div>
//             ) : (
//               "Registry search results will appear here"
//             )}
//           </motion.div>

//           {/* Right side button/badge */}
//           <motion.button
//             onClick={handleSearch}
//             disabled={isLoading}
//             variants={buttonVariants}
//             whileHover={!isLoading ? "hover" : ""}
//             whileTap="tap"
//             animate={isLoading ? "loading" : "visible"}
//             className={`bg-[#2A316B] text-white px-6 py-4 rounded-xl shadow-lg ${
//               isLoading ? "cursor-wait" : "cursor-pointer"
//             }`}
//           >
//             <div className="text-center w-[350px] h-[69px] py-4">
//               <motion.div 
//                 className="text-[20px] md:text-[20px] sm:text-[18px] font-[700]"
//                 whileHover={{ scale: 1.02 }}
//               >
//                 <motion.span whileHover={{ scale: 1.05 }}>
//                   Registered Engineers
//                 </motion.span>
//                 <span className="mx-2 text-blue-300">/</span>
//                 <motion.span whileHover={{ scale: 1.05 }}>
//                   Technologists
//                 </motion.span>
//               </motion.div>
//             </div>
//           </motion.button>
//         </div>
//       </motion.div>

//       {/* Mobile View */}
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//         className="min-h-[139px] w-full bg-gradient-to-r from-slate-100 to-slate-200 p-6 relative md:hidden"
//       >
//         <div className="container mx-auto flex flex-col md:flex-row sm:flex-col justify-between items-center px-0 md:px-36 sm:px-8 py-[31px] md:space-x-0 gap-[35px]">
//           {/* Left side text */}
//           <motion.div 
//             variants={textVariants}
//             className="text-[#2543B1] text-center text-[12px] md:text-[30px] font-[400] h-[18px] w-[392px]"
//           >
//             {isLoading ? (
//               <motion.div
//                 animate={{
//                   opacity: [0.6, 1, 0.6],
//                 }}
//                 transition={{
//                   duration: 1.5,
//                   repeat: Infinity
//                 }}
//               >
//                 Searching...
//               </motion.div>
//             ) : (
//               "Registry search results will appear here"
//             )}
//           </motion.div>

//           {/* Right side button/badge */}
//           <motion.button
//             onClick={handleSearch}
//             disabled={isLoading}
//             variants={buttonVariants}
//             whileHover={!isLoading ? "hover" : ""}
//             whileTap="tap"
//             animate={isLoading ? "loading" : "visible"}
//             className={`bg-[#2A316B] text-white py-2 rounded-[5px] shadow-lg ${
//               isLoading ? "cursor-wait" : "cursor-pointer"
//             }`}
//           >
//             <div className="text-center w-[380px] h-[38px] py-2">
//               <motion.div 
//                 className="text-[14px] md:text-[20px] sm:text-[6px] font-[700]"
//                 whileHover={{ scale: 1.02 }}
//               >
//                 <motion.span whileHover={{ scale: 1.05 }}>
//                   Registered Engineers
//                 </motion.span>
//                 <span className="mx-0.5 text-blue-300">/</span>
//                 <motion.span whileHover={{ scale: 1.05 }}>
//                   Technologists
//                 </motion.span>
//               </motion.div>
//             </div>
//           </motion.button>
//         </div>
//       </motion.div>
//     </>
//   );
// };

// export default RegistrySearch;

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const RegistrySearch = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    navigate("/ipetmis");
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 20px rgba(42, 49, 107, 0.3)",
      transition: {
        duration: 0.3,
        yoyo: 1
      }
    },
    tap: {
      scale: 0.98
    },
    loading: {
      scale: 0.98,
      opacity: 0.9
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3,
        duration: 0.6
      }
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
        className="min-h-[218px] w-full bg-gradient-to-r from-slate-100 to-slate-200 p-6 relative hidden md:block"
      >
        <div className="container flex flex-col items-center justify-between py-12 mx-auto md:flex-row sm:flex-col md:px-36 sm:px-8 md:space-x-0 sm:space-y-6">
          {/* Left side text */}
          <motion.div 
            variants={textVariants}
            className="text-[#2543B1] text-xl md:text-[30px] font-[400]"
          >
            {isLoading ? (
              <motion.div
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity
                }}
              >
                Searching...
              </motion.div>
            ) : (
              "Registry search results will appear here"
            )}
          </motion.div>

          {/* Right side button/badge */}
          <motion.button
            onClick={handleSearch}
            disabled={isLoading}
            variants={buttonVariants}
            whileHover={!isLoading ? "hover" : ""}
            whileTap="tap"
            animate={isLoading ? "loading" : ""}
            className={`bg-[#2A316B] text-white px-6 py-4 rounded-xl shadow-lg ${
              isLoading ? "cursor-wait" : "cursor-pointer"
            }`}
          >
            <div className="text-center w-[350px] h-[69px] py-4">
              <motion.div 
                className="text-[20px] md:text-[20px] sm:text-[18px] font-[700]"
                whileHover={{ scale: 1.02 }}
              >
                <motion.span whileHover={{ scale: 1.05 }}>
                  Registered Engineers
                </motion.span>
                <span className="mx-2 text-blue-300">/</span>
                <motion.span whileHover={{ scale: 1.05 }}>
                  Technologists
                </motion.span>
              </motion.div>
            </div>
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile View */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-50px" }}
        variants={containerVariants}
        className="min-h-[139px] w-full bg-gradient-to-r from-slate-100 to-slate-200 p-6 relative md:hidden"
      >
        <div className="container mx-auto flex flex-col md:flex-row sm:flex-col justify-between items-center px-0 md:px-36 sm:px-8 py-[31px] md:space-x-0 gap-[35px]">
          {/* Left side text */}
          <motion.div 
            variants={textVariants}
            className="text-[#2543B1] text-center text-[12px] md:text-[30px] font-[400] h-[18px] w-[392px]"
          >
            {isLoading ? (
              <motion.div
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity
                }}
              >
                Searching...
              </motion.div>
            ) : (
              "Registry search results will appear here"
            )}
          </motion.div>

          {/* Right side button/badge */}
          <motion.button
            onClick={handleSearch}
            disabled={isLoading}
            variants={buttonVariants}
            whileHover={!isLoading ? "hover" : ""}
            whileTap="tap"
            animate={isLoading ? "loading" : ""}
            className={`bg-[#2A316B] text-white py-2 rounded-[5px] shadow-lg ${
              isLoading ? "cursor-wait" : "cursor-pointer"
            }`}
          >
            <div className="text-center w-[380px] h-[38px] py-2">
              <motion.div 
                className="text-[14px] md:text-[20px] sm:text-[6px] font-[700]"
                whileHover={{ scale: 1.02 }}
              >
                <motion.span whileHover={{ scale: 1.05 }}>
                  Registered Engineers
                </motion.span>
                <span className="mx-0.5 text-blue-300">/</span>
                <motion.span whileHover={{ scale: 1.05 }}>
                  Technologists
                </motion.span>
              </motion.div>
            </div>
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};

export default RegistrySearch;