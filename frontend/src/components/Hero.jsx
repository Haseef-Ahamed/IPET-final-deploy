/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// import React from "react";
// import bgHero from "../assets/bghero.svg";
// import bgHero1 from "../assets/Hero_m_bg.svg";
// import Typewriter from "typewriter-effect";
// import { useNavigate } from "react-router-dom";

// const Hero = () => {
//   const navigate = useNavigate();
//   // const [currentIndex, setCurrentIndex] = useState(0);
//   // const el = useRef(null);

//   // const goToSlide = (index) => {
//   //   setCurrentIndex(index);
//   // };

//   return (
//     <>
//       <div className="relative h-[693px]  hidden md:block">
//         <div className="absolute inset-0">
//           <img
//             src={bgHero}
//             alt="Engineers working"
//             className="md:w-full sm:w-[1400px] h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-[#242D6485] opacity-70"></div>
//         </div>

//         <div className="relative z-10 flex items-center h-full">
//           <div className="container mx-auto min-w-full md:px-16 sm:px-8 md:-mt-[130px] sm:-mt-[120px] mb:mb-[154px] sm:-mb-[120px]">
//             <div className="text-white text-[20px] font-[600] md:mb-7 sm:mb-7 ">
//               <div className="flex grid-cols-2 space-x-2">
//                 <span className="inline-block  h-8 w-2  bg-[#2D387D]"></span>
//                 <Typewriter
//                   onInit={(typewriter) => {
//                     typewriter
//                       .typeString("AN EMPOWER OUR ENGINEERS.")
//                       .pauseFor(2000)
//                       .start();
//                   }}
//                   options={{
//                     loop: true,
//                     autoStart: true,
//                     deleteSpeed: 50,
//                     delay: 50,
//                     stopOnDelete: true,
//                     strings: ["AN EMPOWER OUR ENGINEERS."],
//                     typeSpeed: 50,
//                     backSpeed: 50,
//                     smartBackspace: true,
//                   }}
//                 />
//               </div>
//             </div>

//             <div className="md:space-y-1 sm:space-y-6 md:mb-8 sm:mb-10">
//               <h1 className="text-white  md:text-[70px] sm:text-[36px] font-[600]">
//                 INSTITUTE OF
//               </h1>
//               {/* <br /> */}
//               <h1 className="text-white md:text-[70px] sm:text-[36px] font-[600] ">
//                 PROFFESIONAL ENGINEERS
//               </h1>
//               {/* <br /> */}
//               <h1 className="text-white md:text-[70px] sm:text-[36px] font-[600]">
//                 AND TECHNOLOGISTS
//               </h1>
//             </div>
//             <button
//               onClick={() => navigate("/aboutus")}
//               className="bg-[#2D387D] text-white px-8 py-2 rounded-lg text-[16px] h-[44px] w-[115px] font-[500] hover:bg-blue-900"
//             >
//               Explore
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* mobile view */}
//       <div className="relative h-[346px] md:hidden">
//         <div className="absolute inset-0">
//           <img
//             src={bgHero1}
//             alt="Engineers working"
//             className="object-cover w-full h-full"
//           />
//           <div className="absolute inset-0 bg-[#242D6485] opacity-90"></div>
//         </div>

//         <div className="relative z-10 flex items-center h-full">
//           <div className="container mx-auto min-w-full px-6 mt-[32px] mb-[24px]">
//             <div className="text-white text-[10px] font-[600] mb-6 ">
//               <div className="flex grid-cols-2 space-x-2">
//                 <span className="inline-block  h-4 w-[2px]  bg-[#2D387D]"></span>
//                 <Typewriter
//                   onInit={(typewriter) => {
//                     typewriter
//                       .typeString("AN EMPOWER OUR ENGINEERS.")
//                       .pauseFor(2000)
//                       .start();
//                   }}
//                   options={{
//                     loop: true,
//                     autoStart: true,
//                     deleteSpeed: 50,
//                     delay: 50,
//                     stopOnDelete: true,
//                     strings: ["AN EMPOWER OUR ENGINEERS."],
//                     typeSpeed: 50,
//                     backSpeed: 50,
//                     smartBackspace: true,
//                   }}
//                 />
//               </div>
//             </div>

//             <div className="mb-4 md:space-y-1 sm:space-y-6">
//               <h1 className="text-white  text-[30px] font-[600]">
//                 INSTITUTE OF
//               </h1>
//               {/* <br /> */}
//               <h1 className="text-white text-[30px] font-[600] ">
//                 PROFFESIONAL
//               </h1>
//               {/* <br /> */}
//               <h1 className="text-white text-[30px] font-[600]">
//                 ENGINEERS AND
//               </h1>

//               <h1 className="text-white text-[30px] font-[600]">
//                 TECHNOLOGISTS
//               </h1>
//             </div>
//             <button className="bg-[#2D387D] text-white px-[10px] py-[5px] rounded-[5px] text-[8px] h-[22px] w-[49px] font-[500] hover:bg-blue-900" >
//               Explore
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Hero;

// import React, { useEffect } from "react";
// import bgHero from "../assets/bghero.svg";
// import bgHero1 from "../assets/Hero_m_bg.svg";
// import Typewriter from "typewriter-effect";
// import { useNavigate } from "react-router-dom";
// import { motion, useAnimation, useInView } from "framer-motion";

// const Hero = () => {
//   const navigate = useNavigate();
//   const controls = useAnimation();
//   const ref = React.useRef(null);
//   const isInView = useInView(ref, {
//     once: false,
//     amount: 0.5, // Trigger when 50% of element is visible
//   });

//   useEffect(() => {
//     if (isInView) {
//       controls.start("visible");
//     } else {
//       controls.start("hidden");
//     }
//   }, [isInView, controls]);

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         when: "beforeChildren",
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut",
//       },
//     },
//   };

//   const buttonVariants = {
//     hidden: { opacity: 0, scale: 0.9 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: {
//         delay: 0.5,
//         type: "spring",
//         stiffness: 100,
//       },
//     },
//     hover: {
//       scale: 1.05,
//       boxShadow: "0px 5px 15px rgba(45, 56, 125, 0.3)",
//     },
//     tap: {
//       scale: 0.98,
//     },
//   };

//   const bgVariants = {
//     hidden: { scale: 1.1 },
//     visible: {
//       scale: 1,
//       transition: {
//         duration: 1.5,
//         ease: "easeOut",
//       },
//     },
//   };

//   return (
//     <>
//       {/* Desktop View */}
//       <div ref={ref} className="relative h-[693px] hidden md:block overflow-hidden">
//         <motion.div
//           className="absolute inset-0"
//           initial="hidden"
//           animate={controls}
//           variants={bgVariants}
//         >
//           <img
//             src={bgHero}
//             alt="Engineers working"
//             className="object-cover w-full h-full"
//           />
//           <div className="absolute inset-0 bg-[#242D6485] opacity-70"></div>
//         </motion.div>

//         <div className="relative z-10 flex items-center h-full">
//           <motion.div
//             className="container min-w-full mx-auto md:px-16 sm:px-8"
//             initial="hidden"
//             animate={controls}
//             variants={containerVariants}
//           >
//             {/* Content remains the same as before */}
//             <motion.div
//               className="text-white text-[20px] font-[600] md:mb-7"
//               variants={itemVariants}
//             >
//               <div className="flex items-center space-x-2">
//                 <motion.span
//                   className="inline-block h-8 w-2 bg-[#2D387D]"
//                   initial={{ scaleY: 0 }}
//                   animate={controls}
//                   variants={{
//                     hidden: { scaleY: 0 },
//                     visible: { scaleY: 1 },
//                   }}
//                   transition={{ duration: 0.5, delay: 0.2 }}
//                 />
//                 <Typewriter
//                   options={{
//                     strings: ["AN EMPOWER OUR ENGINEERS."],
//                     autoStart: true,
//                     loop: true,
//                   }}
//                 />
//               </div>
//             </motion.div>

//             <motion.div className="space-y-1 md:mb-8" variants={containerVariants}>
//               <motion.h1 className="text-white md:text-[70px] font-[600]" variants={itemVariants}>
//                 INSTITUTE OF
//               </motion.h1>
//               <motion.h1 className="text-white md:text-[70px] font-[600]" variants={itemVariants}>
//                 PROFESSIONAL ENGINEERS
//               </motion.h1>
//               <motion.h1 className="text-white md:text-[70px] font-[600]" variants={itemVariants}>
//                 AND TECHNOLOGISTS
//               </motion.h1>
//             </motion.div>

//             <motion.button
//               onClick={() => navigate("/aboutus")}
//               className="bg-[#2D387D] text-white px-8 py-2 rounded-lg text-[16px] font-[500] hover:bg-blue-900"
//               variants={buttonVariants}
//               whileHover="hover"
//               whileTap="tap"
//             >
//               Explore
//             </motion.button>
//           </motion.div>
//         </div>
//       </div>

//       {/* Mobile View - Similar structure with mobile-specific styles */}
//       <div ref={ref} className="relative h-[346px] md:hidden overflow-hidden">
//       <motion.div
//           className="absolute inset-0"
//           initial={{ scale: 1.1 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 1.5, ease: "easeOut" }}
//         >
//           <img
//             src={bgHero1}
//             alt="Engineers working"
//             className="object-cover w-full h-full"
//           />
//           <div className="absolute inset-0 bg-[#242D6485] opacity-90"></div>
//         </motion.div>

//         <div className="relative z-10 flex items-center h-full">
//           <motion.div
//             className="container mx-auto min-w-full px-6 mt-[32px] mb-[24px]"
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             <motion.div
//               className="text-white text-[10px] font-[600] mb-6"
//               variants={itemVariants}
//             >
//               <div className="flex grid-cols-2 space-x-2">
//                 <motion.span
//                   className="inline-block h-4 w-[2px] bg-[#2D387D]"
//                   initial={{ scaleY: 0 }}
//                   animate={{ scaleY: 1 }}
//                   transition={{ duration: 0.5, delay: 0.2 }}
//                 />
//                 <Typewriter
//                   onInit={(typewriter) => {
//                     typewriter
//                       .typeString("AN EMPOWER OUR ENGINEERS.")
//                       .pauseFor(2000)
//                       .start();
//                   }}
//                   options={{
//                     loop: true,
//                     autoStart: true,
//                     deleteSpeed: 50,
//                     delay: 50,
//                     stopOnDelete: true,
//                     strings: ["AN EMPOWER OUR ENGINEERS."],
//                     typeSpeed: 50,
//                     backSpeed: 50,
//                     smartBackspace: true,
//                   }}
//                 />
//               </div>
//             </motion.div>

//             <motion.div
//               className="mb-4 md:space-y-1 sm:space-y-6"
//               variants={containerVariants}
//             >
//               <motion.h1
//                 className="text-white text-[30px] font-[600]"
//                 variants={itemVariants}
//               >
//                 INSTITUTE OF
//               </motion.h1>
//               <motion.h1
//                 className="text-white text-[30px] font-[600]"
//                 variants={itemVariants}
//               >
//                 PROFESSIONAL
//               </motion.h1>
//               <motion.h1
//                 className="text-white text-[30px] font-[600]"
//                 variants={itemVariants}
//               >
//                 ENGINEERS AND
//               </motion.h1>
//               <motion.h1
//                 className="text-white text-[30px] font-[600]"
//                 variants={itemVariants}
//               >
//                 TECHNOLOGISTS
//               </motion.h1>
//             </motion.div>

//             <motion.button
//               onClick={() => navigate("/aboutus")}
//               className="bg-[#2D387D] text-white px-[10px] py-[5px] rounded-[5px] text-[8px] h-[22px] w-[49px] font-[500] hover:bg-blue-900"
//               variants={buttonVariants}
//               whileHover="hover"
//               whileTap="tap"
//             >
//               Explore
//             </motion.button>
//           </motion.div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Hero;

// import React from "react";
// import bgHero from "../assets/bghero.svg";
// import bgHero1 from "../assets/Hero_m_bg.svg";
// import Typewriter from "typewriter-effect";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// const Hero = () => {
//   const navigate = useNavigate();

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         delayChildren: 0.3
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//         ease: "easeOut"
//       }
//     }
//   };

//   const buttonVariants = {
//     hover: {
//       scale: 1.05,
//       transition: {
//         duration: 0.2,
//         yoyo: Infinity
//       }
//     },
//     tap: {
//       scale: 0.95
//     }
//   };

//   return (
//     <>
//       {/* Desktop View */}
//       <div className="relative h-[693px] hidden md:block overflow-hidden">
//         <motion.div
//           className="absolute inset-0"
//           initial={{ scale: 1.1 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 1.5, ease: "easeOut" }}
//         >
//           <img
//             src={bgHero}
//             alt="Engineers working"
//             className="md:w-full sm:w-[1400px] h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-[#242D6485] opacity-70"></div>
//         </motion.div>

//         <div className="relative z-10 flex items-center h-full">
//           <motion.div
//             className="container mx-auto min-w-full md:px-16 sm:px-8 md:-mt-[130px] sm:-mt-[120px] mb:mb-[154px] sm:-mb-[120px]"
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             <motion.div
//               className="text-white text-[20px] font-[600] md:mb-7 sm:mb-7"
//               variants={itemVariants}
//             >
//               <div className="flex grid-cols-2 space-x-2">
//                 <motion.span
//                   className="inline-block h-8 w-2 bg-[#2D387D]"
//                   initial={{ scaleY: 0 }}
//                   animate={{ scaleY: 1 }}
//                   transition={{ duration: 0.5, delay: 0.2 }}
//                 />
//                 <Typewriter
//                   onInit={(typewriter) => {
//                     typewriter
//                       .typeString("AN EMPOWER OUR ENGINEERS.")
//                       .pauseFor(2000)
//                       .start();
//                   }}
//                   options={{
//                     loop: true,
//                     autoStart: true,
//                     deleteSpeed: 50,
//                     delay: 50,
//                     stopOnDelete: true,
//                     strings: ["AN EMPOWER OUR ENGINEERS."],
//                     typeSpeed: 50,
//                     backSpeed: 50,
//                     smartBackspace: true,
//                   }}
//                 />
//               </div>
//             </motion.div>

//             <motion.div
//               className="md:space-y-1 sm:space-y-6 md:mb-8 sm:mb-10"
//               variants={containerVariants}
//             >
//               <motion.h1
//                 className="text-white md:text-[70px] sm:text-[36px] font-[600]"
//                 variants={itemVariants}
//               >
//                 INSTITUTE OF
//               </motion.h1>
//               <motion.h1
//                 className="text-white md:text-[70px] sm:text-[36px] font-[600]"
//                 variants={itemVariants}
//               >
//                 PROFESSIONAL ENGINEERS
//               </motion.h1>
//               <motion.h1
//                 className="text-white md:text-[70px] sm:text-[36px] font-[600]"
//                 variants={itemVariants}
//               >
//                 AND TECHNOLOGISTS
//               </motion.h1>
//             </motion.div>

//             <motion.button
//               onClick={() => navigate("/aboutus")}
//               className="bg-[#2D387D] text-white px-8 py-2 rounded-lg text-[16px] h-[44px] w-[115px] font-[500] hover:bg-blue-900"
//               variants={buttonVariants}
//               whileHover="hover"
//               whileTap="tap"
//             >
//               Explore
//             </motion.button>
//           </motion.div>
//         </div>
//       </div>

//       {/* Mobile View */}
//       <div className="relative h-[346px] md:hidden overflow-hidden">
//         <motion.div
//           className="absolute inset-0"
//           initial={{ scale: 1.1 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 1.5, ease: "easeOut" }}
//         >
//           <img
//             src={bgHero1}
//             alt="Engineers working"
//             className="object-cover w-full h-full"
//           />
//           <div className="absolute inset-0 bg-[#242D6485] opacity-90"></div>
//         </motion.div>

//         <div className="relative z-10 flex items-center h-full">
//           <motion.div
//             className="container mx-auto min-w-full px-6 mt-[32px] mb-[24px]"
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             <motion.div
//               className="text-white text-[10px] font-[600] mb-6"
//               variants={itemVariants}
//             >
//               <div className="flex grid-cols-2 space-x-2">
//                 <motion.span
//                   className="inline-block h-4 w-[2px] bg-[#2D387D]"
//                   initial={{ scaleY: 0 }}
//                   animate={{ scaleY: 1 }}
//                   transition={{ duration: 0.5, delay: 0.2 }}
//                 />
//                 <Typewriter
//                   onInit={(typewriter) => {
//                     typewriter
//                       .typeString("AN EMPOWER OUR ENGINEERS.")
//                       .pauseFor(2000)
//                       .start();
//                   }}
//                   options={{
//                     loop: true,
//                     autoStart: true,
//                     deleteSpeed: 50,
//                     delay: 50,
//                     stopOnDelete: true,
//                     strings: ["AN EMPOWER OUR ENGINEERS."],
//                     typeSpeed: 50,
//                     backSpeed: 50,
//                     smartBackspace: true,
//                   }}
//                 />
//               </div>
//             </motion.div>

//             <motion.div
//               className="mb-4 md:space-y-1 sm:space-y-6"
//               variants={containerVariants}
//             >
//               <motion.h1
//                 className="text-white text-[30px] font-[600]"
//                 variants={itemVariants}
//               >
//                 INSTITUTE OF
//               </motion.h1>
//               <motion.h1
//                 className="text-white text-[30px] font-[600]"
//                 variants={itemVariants}
//               >
//                 PROFESSIONAL
//               </motion.h1>
//               <motion.h1
//                 className="text-white text-[30px] font-[600]"
//                 variants={itemVariants}
//               >
//                 ENGINEERS AND
//               </motion.h1>
//               <motion.h1
//                 className="text-white text-[30px] font-[600]"
//                 variants={itemVariants}
//               >
//                 TECHNOLOGISTS
//               </motion.h1>
//             </motion.div>

//             <motion.button
//               onClick={() => navigate("/aboutus")}
//               className="bg-[#2D387D] text-white px-[10px] py-[5px] rounded-[5px] text-[8px] h-[22px] w-[49px] font-[500] hover:bg-blue-900"
//               variants={buttonVariants}
//               whileHover="hover"
//               whileTap="tap"
//             >
//               Explore
//             </motion.button>
//           </motion.div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Hero;

import React from "react";
import bgHero from "../assets/bghero.svg";
import bgHero1 from "../assets/Hero_m_bg.svg";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        yoyo: Infinity,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <>
      {/* Desktop View */}
      <div className="relative h-[693px] hidden md:block overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img
            src={bgHero}
            alt="Engineers working"
            className="md:w-full sm:w-[1400px] h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#242D6485] opacity-70"></div>
        </motion.div>

        <div className="relative z-10 flex items-center h-full">
          <motion.div
            className="container mx-auto min-w-full md:px-16 sm:px-8 md:-mt-[130px] sm:-mt-[120px] mb:mb-[154px] sm:-mb-[120px]"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
          >
            <motion.div
              className="text-white text-[20px] font-[600] md:mb-7 sm:mb-7"
              variants={itemVariants}
            >
              <div className="flex grid-cols-2 space-x-2">
                <motion.span
                  className="inline-block h-8 w-2 bg-[#2D387D]"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .typeString("AN EMPOWER OUR ENGINEERS.")
                      .pauseFor(2000)
                      .start();
                  }}
                  options={{
                    loop: true,
                    autoStart: true,
                    deleteSpeed: 50,
                    delay: 50,
                    stopOnDelete: true,
                    strings: ["AN EMPOWER OUR ENGINEERS."],
                    typeSpeed: 50,
                    backSpeed: 50,
                    smartBackspace: true,
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              className="md:space-y-1 sm:space-y-6 md:mb-8 sm:mb-10"
              variants={containerVariants}
            >
              <motion.h1
                className="text-white md:text-[70px] sm:text-[36px] font-[600]"
                variants={itemVariants}
              >
                INSTITUTE OF
              </motion.h1>
              <motion.h1
                className="text-white md:text-[70px] sm:text-[36px] font-[600]"
                variants={itemVariants}
              >
                PROFESSIONAL ENGINEERS
              </motion.h1>
              <motion.h1
                className="text-white md:text-[70px] sm:text-[36px] font-[600]"
                variants={itemVariants}
              >
                AND TECHNOLOGISTS
              </motion.h1>

              <motion.button
                onClick={() => navigate("/aboutus")}
                className="bg-[#2D387D] text-white px-8 py-2 rounded-lg text-[16px] h-[44px] w-[115px] font-[500] hover:bg-blue-900"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Explore
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="relative h-[346px] md:hidden overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img
            src={bgHero1}
            alt="Engineers working"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-[#242D6485] opacity-90"></div>
        </motion.div>

        <div className="relative z-10 flex items-center h-full">
          <motion.div
            className="container mx-auto min-w-full px-6 mt-[32px] mb-[24px]"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
          >
            <motion.div
              className="text-white text-[10px] font-[600] mb-6"
              variants={itemVariants}
            >
              <div className="flex grid-cols-2 space-x-2">
                <motion.span
                  className="inline-block h-4 w-[2px] bg-[#2D387D]"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .typeString("AN EMPOWER OUR ENGINEERS.")
                      .pauseFor(2000)
                      .start();
                  }}
                  options={{
                    loop: true,
                    autoStart: true,
                    deleteSpeed: 50,
                    delay: 50,
                    stopOnDelete: true,
                    strings: ["AN EMPOWER OUR ENGINEERS."],
                    typeSpeed: 50,
                    backSpeed: 50,
                    smartBackspace: true,
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              className="mb-4 md:space-y-1 sm:space-y-6"
              variants={containerVariants}
            >
              <motion.h1
                className="text-white text-[30px] font-[600]"
                variants={itemVariants}
              >
                INSTITUTE OF
              </motion.h1>
              <motion.h1
                className="text-white text-[30px] font-[600]"
                variants={itemVariants}
              >
                PROFESSIONAL
              </motion.h1>
              <motion.h1
                className="text-white text-[30px] font-[600]"
                variants={itemVariants}
              >
                ENGINEERS AND
              </motion.h1>
              <motion.h1
                className="text-white text-[30px] font-[600]"
                variants={itemVariants}
              >
                TECHNOLOGISTS
              </motion.h1>
            </motion.div>

            <motion.button
              onClick={() => navigate("/aboutus")}
              className="bg-[#2D387D] text-white px-[10px] py-[5px] rounded-[5px] text-[8px] h-[22px] w-[49px] font-[500] hover:bg-blue-900"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Explore
            </motion.button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Hero;

// import React, { useEffect } from "react";
// import bgHero from "../assets/bghero.svg";
// import bgHero1 from "../assets/Hero_m_bg.svg";
// import Typewriter from "typewriter-effect";
// import { useNavigate } from "react-router-dom";
// import { motion, useAnimation, useInView } from "framer-motion";

// const Hero = () => {
//   const navigate = useNavigate();
//   const controls = useAnimation();
//   const ref = React.useRef(null);
//   const isInView = useInView(ref, {
//     once: false,
//     amount: 0.3, // Trigger when 30% of element is visible
//   });

//   useEffect(() => {
//     if (isInView) {
//       controls.start("visible");
//     } else {
//       controls.start("hidden");
//     }
//   }, [isInView, controls]);

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         when: "beforeChildren",
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut",
//       },
//     },
//   };

//   const buttonVariants = {
//     hidden: { opacity: 0, scale: 0.9 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: {
//         delay: 0.5,
//         type: "spring",
//         stiffness: 100,
//       },
//     },
//     hover: {
//       scale: 1.05,
//       boxShadow: "0px 5px 15px rgba(45, 56, 125, 0.3)",
//     },
//     tap: {
//       scale: 0.98,
//     },
//   };

//   const bgVariants = {
//     hidden: { scale: 1.1 },
//     visible: {
//       scale: 1,
//       transition: {
//         duration: 1.5,
//         ease: "easeOut",
//       },
//     },
//   };

//   return (
//     <>
//       {/* Desktop View */}
//       <div
//         ref={ref}
//         className="relative h-[693px] hidden md:block overflow-hidden"
//       >
//         <motion.div
//           className="absolute inset-0"
//           initial="hidden"
//           animate={controls}
//           variants={bgVariants}
//         >
//           <img
//             src={bgHero}
//             alt="Engineers working"
//             className="object-cover w-full h-full"
//           />
//           <div className="absolute inset-0 bg-[#242D6485] opacity-70"></div>
//         </motion.div>

//         <div className="relative z-10 flex items-center h-full">
//           <motion.div
//             className="container min-w-full mx-auto md:px-16 sm:px-8"
//             initial="hidden"
//             animate={controls}
//             variants={containerVariants}
//           >
//             <motion.div
//               className="text-white text-[20px] font-[600] md:mb-7"
//               variants={itemVariants}
//             >
//               <div className="flex items-center space-x-2">
//                 <motion.span
//                   className="inline-block h-8 w-2 bg-[#2D387D]"
//                   initial={{ scaleY: 0 }}
//                   animate={controls}
//                   variants={{
//                     hidden: { scaleY: 0 },
//                     visible: { scaleY: 1 },
//                   }}
//                   transition={{ duration: 0.5, delay: 0.2 }}
//                 />
//                 <Typewriter
//                   options={{
//                     strings: ["AN EMPOWER OUR ENGINEERS."],
//                     autoStart: true,
//                     loop: true,
//                   }}
//                 />
//               </div>
//             </motion.div>

//             <motion.div
//               className="space-y-1 md:mb-8"
//               variants={containerVariants}
//             >
//               <motion.h1
//                 className="text-white md:text-[70px] font-[600]"
//                 variants={itemVariants}
//               >
//                 INSTITUTE OF
//               </motion.h1>
//               <motion.h1
//                 className="text-white md:text-[70px] font-[600]"
//                 variants={itemVariants}
//               >
//                 PROFESSIONAL ENGINEERS
//               </motion.h1>
//               <motion.h1
//                 className="text-white md:text-[70px] font-[600]"
//                 variants={itemVariants}
//               >
//                 AND TECHNOLOGISTS
//               </motion.h1>
//             </motion.div>

//             <motion.button
//               onClick={() => navigate("/aboutus")}
//               className="bg-[#2D387D] text-white px-8 py-2 rounded-lg text-[16px] font-[500] hover:bg-blue-900"
//               variants={buttonVariants}
//               whileHover="hover"
//               whileTap="tap"
//             >
//               Explore
//             </motion.button>
//           </motion.div>
//         </div>
//       </div>

//       {/* Mobile View */}
//       <div ref={ref} className="relative h-[346px] md:hidden overflow-hidden">
//         <motion.div
//           className="absolute inset-0"
//           initial="hidden"
//           animate={controls}
//           variants={bgVariants}
//         >
//           <img
//             src={bgHero1}
//             alt="Engineers working"
//             className="object-cover w-full h-full"
//           />
//           <div className="absolute inset-0 bg-[#242D6485] opacity-90"></div>
//         </motion.div>

//         <div className="relative z-10 flex items-center h-full">
//           <motion.div
//             className="container mx-auto min-w-full px-6 mt-[32px] mb-[24px]"
//             initial="hidden"
//             animate={controls}
//             variants={containerVariants}
//           >
//             <motion.div
//               className="text-white text-[10px] font-[600] mb-6"
//               variants={itemVariants}
//             >
//               <div className="flex items-center space-x-2">
//                 <motion.span
//                   className="inline-block h-4 w-[2px] bg-[#2D387D]"
//                   initial={{ scaleY: 0 }}
//                   animate={controls}
//                   variants={{
//                     hidden: { scaleY: 0 },
//                     visible: { scaleY: 1 },
//                   }}
//                   transition={{ duration: 0.5, delay: 0.2 }}
//                 />
//                 <Typewriter
//                   options={{
//                     strings: ["AN EMPOWER OUR ENGINEERS."],
//                     autoStart: true,
//                     loop: true,
//                   }}
//                 />
//               </div>
//             </motion.div>

//             <motion.div className="mb-4 space-y-1" variants={containerVariants}>
//               <motion.h1
//                 className="text-white text-[30px] font-[600]"
//                 variants={itemVariants}
//               >
//                 INSTITUTE OF
//               </motion.h1>
//               <motion.h1
//                 className="text-white text-[30px] font-[600]"
//                 variants={itemVariants}
//               >
//                 PROFESSIONAL
//               </motion.h1>
//               <motion.h1
//                 className="text-white text-[30px] font-[600]"
//                 variants={itemVariants}
//               >
//                 ENGINEERS AND
//               </motion.h1>
//               <motion.h1
//                 className="text-white text-[30px] font-[600]"
//                 variants={itemVariants}
//               >
//                 TECHNOLOGISTS
//               </motion.h1>
//             </motion.div>

//             <motion.button
//               onClick={() => navigate("/aboutus")}
//               className="bg-[#2D387D] text-white px-[10px] py-[5px] rounded-[5px] text-[8px] font-[500] hover:bg-blue-900"
//               variants={buttonVariants}
//               whileHover="hover"
//               whileTap="tap"
//             >
//               Explore
//             </motion.button>
//           </motion.div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Hero;
