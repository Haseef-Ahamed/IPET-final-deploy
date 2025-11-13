/* eslint-disable react/no-unescaped-entities */
// /* eslint-disable react/no-unescaped-entities */
// import mission from "../assets/Mission.svg";
// import Vision from "../assets/Vision.svg";

// const Mission = () => {
//   return (

//     <>
//       <div className="min-h-screen bg-[#E9ECF7] py-8 md:py-24 px-16 md:block hidden">
//         <div className="max-w-[1500px] mx-auto">
//           <div className="flex flex-col gap-8 lg:flex-row lg:gap-0">
//             {/* Mission Section */}
//             <div className="flex flex-col flex-1 gap-0 -mt-2">
//               <div className="w-full h-[300px] md:h-[400px] overflow-hidden shadow-lg">
//                 <img
//                   src={mission}
//                   alt="Mission"
//                   className="object-cover w-full h-full"
//                 />
//               </div>
//               <div className="p-6 bg-white shadow-lg md:p-8">
//                 <div className="max-w-xl h-[200px]">
//                   <h2 className="text-[#2543B1] text-2xl md:text-3xl font-semibold mb-8">
//                     Our Mission
//                   </h2>
//                   <p className="text-[#2543B1] text-sm md:text-base leading-relaxed">
//                     "To serve as the leading national organization for
//                     engineers, promoting excellence in professional practice and
//                     education through globally recognized standards. We are
//                     dedicated to advancing national development, empowering our
//                     members, and positively impacting society through innovation
//                     and collaboration."
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Vision Section */}
//             <div className="flex flex-col flex-1 gap-0 lg:mt-32">
//               <div className="p-6 bg-white shadow-lg md:p-8">
//                 <div className="max-w-xl h-[200px]">
//                   <h2 className="text-[#2543B1] text-2xl md:text-3xl font-semibold mb-8">
//                     Our Vision
//                   </h2>
//                   <p className="text-[#2543B1] text-sm md:text-base leading-relaxed">
//                     "To be recognized as a premier institution in engineering
//                     and technology, fostering innovation, excellence, and
//                     sustainable practices that empower professionals to shape
//                     the future of our global community."
//                   </p>
//                 </div>
//               </div>
//               <div className="w-full h-[300px] md:h-[400px] overflow-hidden shadow-lg">
//                 <img
//                   src={Vision}
//                   alt="Vision"
//                   className="object-cover w-full h-full"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* mobileView */}
//       <div className="min-h-screen bg-[#E9ECF7] py-8 md:py-24 px-4 md:hidden">
//         <div className="mx-auto max-w-7xl">
//           <div className="flex flex-col gap-8 lg:flex-row lg:gap-0">
           

//             {/* Vision Section */}
//             <div className="flex flex-col flex-1 gap-0 lg:mt-32">
//               <div className="p-6 bg-white shadow-lg md:p-8">
//                 <div className="max-w-xl h-[140px]">
//                   <h2 className="text-[#2543B1] text-[14px] md:text-3xl font-semibold mb-6">
//                     Our Vision
//                   </h2>
//                   <p className="text-[#2543B1] text-[12px] md:text-base leading-relaxed">
//                     "To be recognized as a premier institution in engineering
//                     and technology, fostering innovation, excellence, and
//                     sustainable practices that empower professionals to shape
//                     the future of our global community."
//                   </p>
//                 </div>
//               </div>
//               <div className="w-full h-[226px] md:h-[400px] overflow-hidden shadow-lg">
//                 <img
//                   src={Vision}
//                   alt="Vision"
//                   className="object-cover w-full h-full"
//                 />
//               </div>
//             </div>


//              {/* Mission Section */}
//              <div className="flex flex-col flex-1 gap-0 -mt-2">
//              <div className="p-6 bg-white shadow-lg md:p-8">
//                 <div className="max-w-xl h-[170px]">
//                   <h2 className="text-[#2543B1] text-[14px] md:text-3xl font-semibold mb-6">
//                     Our Mission
//                   </h2>
//                   <p className="text-[#2543B1] text-[12px] md:text-base leading-relaxed">
//                     "To serve as the leading national organization for
//                     engineers, promoting excellence in professional practice and
//                     education through globally recognized standards. We are
//                     dedicated to advancing national development, empowering our
//                     members, and positively impacting society through innovation
//                     and collaboration."
//                   </p>
//                 </div>
//               </div>
//               <div className="w-full h-[197px] md:h-[400px] overflow-hidden shadow-lg mb-24">
//                 <img
//                   src={mission}
//                   alt="Mission"
//                   className="object-cover w-full h-full"
//                 />
//               </div>
              
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Mission;

import React from 'react';
import { motion } from "framer-motion";
import mission from "../assets/Mission.svg";
import Vision from "../assets/Vision.svg";

const Mission = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      {/* Desktop View */}
      <motion.div 
        className="min-h-screen bg-[#E9ECF7] py-8 md:py-24 px-16 md:block hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="max-w-[1500px] mx-auto">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-0">
            {/* Mission Section */}
            <motion.div 
              className="flex flex-col flex-1 gap-0 -mt-2"
              variants={containerVariants}
            >
              <motion.div 
                className="w-full h-[300px] md:h-[400px] overflow-hidden shadow-lg"
                variants={imageVariants}
              >
                <img
                  src={mission}
                  alt="Mission"
                  className="object-cover w-full h-full"
                />
              </motion.div>
              <motion.div 
                className="p-6 bg-white shadow-lg md:p-8"
                variants={itemVariants}
              >
                <div className="max-w-xl h-[200px]">
                  <motion.h2 
                    className="text-[#2543B1] text-2xl md:text-3xl font-semibold mb-8"
                    variants={itemVariants}
                  >
                    Our Mission
                  </motion.h2>
                  <motion.p 
                    className="text-[#2543B1] text-sm md:text-base leading-relaxed"
                    variants={itemVariants}
                  >
                    "To serve as the leading national organization for
                    engineers, promoting excellence in professional practice and
                    education through globally recognized standards. We are
                    dedicated to advancing national development, empowering our
                    members, and positively impacting society through innovation
                    and collaboration."
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>

            {/* Vision Section */}
            <motion.div 
              className="flex flex-col flex-1 gap-0 lg:mt-32"
              variants={containerVariants}
            >
              <motion.div 
                className="p-6 bg-white shadow-lg md:p-8"
                variants={itemVariants}
              >
                <div className="max-w-xl h-[200px]">
                  <motion.h2 
                    className="text-[#2543B1] text-2xl md:text-3xl font-semibold mb-8"
                    variants={itemVariants}
                  >
                    Our Vision
                  </motion.h2>
                  <motion.p 
                    className="text-[#2543B1] text-sm md:text-base leading-relaxed"
                    variants={itemVariants}
                  >
                    "To be recognized as a premier institution in engineering
                    and technology, fostering innovation, excellence, and
                    sustainable practices that empower professionals to shape
                    the future of our global community."
                  </motion.p>
                </div>
              </motion.div>
              <motion.div 
                className="w-full h-[300px] md:h-[400px] overflow-hidden shadow-lg"
                variants={imageVariants}
              >
                <img
                  src={Vision}
                  alt="Vision"
                  className="object-cover w-full h-full"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Mobile View */}
      <motion.div 
        className="min-h-screen bg-[#E9ECF7] py-8 md:py-24 px-4 md:hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-50px" }}
        variants={containerVariants}
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-0">
            {/* Vision Section */}
            <motion.div 
              className="flex flex-col flex-1 gap-0 lg:mt-32"
              variants={containerVariants}
            >
              <motion.div 
                className="p-6 bg-white shadow-lg md:p-8"
                variants={itemVariants}
              >
                <div className="max-w-xl h-[140px]">
                  <motion.h2 
                    className="text-[#2543B1] text-[14px] md:text-3xl font-semibold mb-6"
                    variants={itemVariants}
                  >
                    Our Vision
                  </motion.h2>
                  <motion.p 
                    className="text-[#2543B1] text-[12px] md:text-base leading-relaxed"
                    variants={itemVariants}
                  >
                    "To be recognized as a premier institution in engineering
                    and technology, fostering innovation, excellence, and
                    sustainable practices that empower professionals to shape
                    the future of our global community."
                  </motion.p>
                </div>
              </motion.div>
              <motion.div 
                className="w-full h-[226px] md:h-[400px] overflow-hidden shadow-lg"
                variants={imageVariants}
              >
                <img
                  src={Vision}
                  alt="Vision"
                  className="object-cover w-full h-full"
                />
              </motion.div>
            </motion.div>

            {/* Mission Section */}
            <motion.div 
              className="flex flex-col flex-1 gap-0 -mt-2"
              variants={containerVariants}
            >
              <motion.div 
                className="p-6 bg-white shadow-lg md:p-8"
                variants={itemVariants}
              >
                <div className="max-w-xl h-[170px]">
                  <motion.h2 
                    className="text-[#2543B1] text-[14px] md:text-3xl font-semibold mb-6"
                    variants={itemVariants}
                  >
                    Our Mission
                  </motion.h2>
                  <motion.p 
                    className="text-[#2543B1] text-[12px] md:text-base leading-relaxed"
                    variants={itemVariants}
                  >
                    "To serve as the leading national organization for
                    engineers, promoting excellence in professional practice and
                    education through globally recognized standards. We are
                    dedicated to advancing national development, empowering our
                    members, and positively impacting society through innovation
                    and collaboration."
                  </motion.p>
                </div>
              </motion.div>
              <motion.div 
                className="w-full h-[197px] md:h-[400px] overflow-hidden shadow-lg mb-24"
                variants={imageVariants}
              >
                <img
                  src={mission}
                  alt="Mission"
                  className="object-cover w-full h-full"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Mission;
