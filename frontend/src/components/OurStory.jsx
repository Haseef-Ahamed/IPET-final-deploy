/* eslint-disable no-unused-vars */
// import React from "react";
// const OurStory = () => {
//   return (
//     <>
//     <div className="hidden w-full py-10 bg-white md:py-20 md:block">
//       <div className="max-w-[1255px] mx-auto px-4 md:px-6 lg:px-8">
//         <div className="mb-8 text-center md:mb-14">
//           <h2 className="text-[#2543B1] text-[30px] md:text-[30px] font-[600] mb-3 md:mb-4">
//             Our Story
//           </h2>
//           <p className="text-[#2D387D] text-[14px] md:text-[16px] font-[400] mb-10 md:mb-14">
//             Our journey started with a simple vision to create meaningful,
//             innovative solutions.
//           </p>
//         </div>

//         <div className="px-4 md:px-[12px] flex flex-col gap-6 md:gap-8">
//           <p className="text-[#000000] text-[14px] md:text-[20px] font-[300] text-center  max-w-[1367px]">
//             IPET is the Professional Engineers and Technologists Institute in
//             Sri Lanka. Over the years we have developed our identity while
//             proving to be a leader in management training and education. We have
//             empowered thousands to carve better futures for themselves.
//           </p>

//           <p className="text-[#000000] text-[14px] md:text-[20px] leading-[24px] md:leading-[30px] font-[300] text-center max-w-[1367px]">
//             IPET is the Professional Engineers and Technologists Institute in
//             Sri Lanka. Over the years we have developed our identity while
//             proving to be a leader in management training and education. We have
//             empowered thousands to carve better futures for themselves. We keep
//             abreast of global trends and constantly upgrade our products. IPET
//             is the Professional Engineers and Technologists Institute in Sri
//             Lanka.
//           </p>
//         </div>
//       </div>
//     </div>

//     {/* mobile view */}

//     <div className="w-full bg-white py-10 md:py-20 h-[480px]   md:hidden">
//       <div className="max-w-full mx-auto px-[12px] md:px-6 lg:px-8">
//         <div className="mb-6 text-center md:mb-14">
//           <h2 className="text-[#2543B1] text-[18px] md:text-[30px] font-[600] mb-3 md:mb-4">
//             Our Story
//           </h2>
//           <p className="text-[#2D387D] text-[14px] text-center md:text-[16px] font-[400] mb-10 md:mb-14">
//             Our journey started with a simple vision to create<br/> meaningful,
//             innovative solutions.
//           </p>
//         </div>

//         <div className="px-6 md:px-[12px] flex flex-col gap-6 md:gap-8">
//           <p className="text-[#000000] text-[13px] md:text-[20px] font-[300] text-center max-w-full">
//             IPET is the Professional Engineers and Technologists Institute in
//             Sri Lanka. Over the years we have developed our identity while
//             proving to be a leader in management training and education. We have
//             empowered thousands to carve better futures for themselves.
//           </p>

//           <p className="text-[#000000] text-[13px] md:text-[20px]  font-[300] text-center max-w-full">
//             IPET is the Professional Engineers and Technologists Institute in
//             Sri Lanka. Over the years we have developed our identity while
//             proving to be a leader in management training and education. We have
//             empowered thousands to carve better futures for themselves. We keep
//             abreast of global trends and constantly upgrade our products. IPET
//             is the Professional Engineers and Technologists Institute in Sri
//             Lanka.
//           </p>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default OurStory;

import React from 'react';
import { motion } from "framer-motion";

const OurStory = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
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

  return (
    <>
      {/* Desktop View */}
      <motion.div 
        className="hidden w-full py-10 bg-white md:py-20 md:block"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="max-w-[1255px] mx-auto px-4 md:px-6 lg:px-8">
          <motion.div 
            className="mb-8 text-center md:mb-14"
            variants={containerVariants}
          >
            <motion.h2 
              className="text-[#2543B1] text-[30px] md:text-[30px] font-[600] mb-3 md:mb-4"
              variants={itemVariants}
            >
              Our Story
            </motion.h2>
            <motion.p 
              className="text-[#2D387D] text-[14px] md:text-[16px] font-[400] mb-10 md:mb-14"
              variants={itemVariants}
            >
              Our journey started with a simple vision to create meaningful,
              innovative solutions.
            </motion.p>
          </motion.div>

          <motion.div 
            className="px-4 md:px-[12px] flex flex-col gap-6 md:gap-8"
            variants={containerVariants}
          >
            <motion.p 
              className="text-[#000000] text-[14px] md:text-[20px] font-[300] text-center max-w-[1367px]"
              variants={itemVariants}
            >
              IPET is the Professional Engineers and Technologists Institute in
              Sri Lanka. Over the years we have developed our identity while
              proving to be a leader in management training and education. We have
              empowered thousands to carve better futures for themselves.
            </motion.p>

            <motion.p 
              className="text-[#000000] text-[14px] md:text-[20px] leading-[24px] md:leading-[30px] font-[300] text-center max-w-[1367px]"
              variants={itemVariants}
            >
              IPET is the Professional Engineers and Technologists Institute in
              Sri Lanka. Over the years we have developed our identity while
              proving to be a leader in management training and education. We have
              empowered thousands to carve better futures for themselves. We keep
              abreast of global trends and constantly upgrade our products. IPET
              is the Professional Engineers and Technologists Institute in Sri
              Lanka.
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile View */}
      <motion.div 
        className="w-full bg-white py-10 md:py-20 h-[480px] md:hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-50px" }}
        variants={containerVariants}
      >
        <div className="max-w-full mx-auto px-[12px] md:px-6 lg:px-8">
          <motion.div 
            className="mb-6 text-center md:mb-14"
            variants={containerVariants}
          >
            <motion.h2 
              className="text-[#2543B1] text-[18px] md:text-[30px] font-[600] mb-3 md:mb-4"
              variants={itemVariants}
            >
              Our Story
            </motion.h2>
            <motion.p 
              className="text-[#2D387D] text-[14px] text-center md:text-[16px] font-[400] mb-10 md:mb-14"
              variants={itemVariants}
            >
              Our journey started with a simple vision to create<br/> meaningful,
              innovative solutions.
            </motion.p>
          </motion.div>

          <motion.div 
            className="px-6 md:px-[12px] flex flex-col gap-6 md:gap-8"
            variants={containerVariants}
          >
            <motion.p 
              className="text-[#000000] text-[13px] md:text-[20px] font-[300] text-center max-w-full"
              variants={itemVariants}
            >
              IPET is the Professional Engineers and Technologists Institute in
              Sri Lanka. Over the years we have developed our identity while
              proving to be a leader in management training and education. We have
              empowered thousands to carve better futures for themselves.
            </motion.p>

            <motion.p 
              className="text-[#000000] text-[13px] md:text-[20px] font-[300] text-center max-w-full"
              variants={itemVariants}
            >
              IPET is the Professional Engineers and Technologists Institute in
              Sri Lanka. Over the years we have developed our identity while
              proving to be a leader in management training and education. We have
              empowered thousands to carve better futures for themselves. We keep
              abreast of global trends and constantly upgrade our products. IPET
              is the Professional Engineers and Technologists Institute in Sri
              Lanka.
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default OurStory;