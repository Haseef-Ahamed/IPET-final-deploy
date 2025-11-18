import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import banner_bg from "../assets/Banner_bg.svg";
import banner_M_bg from "../assets/Banner_M_bg.svg";
import banner_bg2 from "../assets/city.jpg"; // Add your second background image
import banner_bg3 from "../assets/city-sunset.jpg"; // Add your third background image

const Banner = () => {
  const navigate = useNavigate();
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const backgrounds = [banner_bg, banner_bg2, banner_bg3]; // Desktop backgrounds
  const mobileBackgrounds = [banner_M_bg, banner_bg2, banner_bg3]; // Mobile backgrounds

  // Auto-rotate backgrounds every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => 
        prevIndex === backgrounds.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
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
      scale: 1.05,
      boxShadow: "0 4px 12px rgba(45, 56, 125, 0.3)",
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.98,
    },
  };

  const bgVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0 },
    },
  };

  return (
    <>
      {/* Desktop View */}
      <div className="relative h-[584px] hidden md:block overflow-hidden">
        {/* Background Carousel */}
        <motion.div
          className="absolute inset-0 z-0"
          initial="hidden"
          animate="visible"
          variants={bgVariants}
          key={currentBgIndex}
        >
          <img
            src={backgrounds[currentBgIndex]}
            alt="City Background"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-[#242D6485]" />
        </motion.div>

        {/* Carousel Controls */}


        {/* Indicators */}
        {/* <div className="absolute left-0 right-0 z-20 flex justify-center space-x-2 bottom-12">
          {backgrounds.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBgIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentBgIndex === index ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div> */}

        <motion.div
          className="relative z-10 flex flex-col items-center justify-center md:min-h-[584px] text-white text-center px-4 md:px-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="max-w-[1262px] mx-auto space-y-12">
            <motion.h1
              className="md:text-[30px] font-[600] leading-tight"
              variants={itemVariants}
            >
              Join the IPET and help us to Engineer a better world
            </motion.h1>

            <motion.p
              className="md:text-[20px] font-[600] mx-auto opacity-90 leading-relaxed"
              variants={itemVariants}
            >
              Whether you're just starting out as an engineer, or you're a
              senior engineer at the top of your game we're here to support you
              and make you a part of our thriving community.
            </motion.p>

            <motion.p
              className="md:text-[20px] font-[600] mx-auto opacity-90 leading-relaxed"
              variants={itemVariants}
            >
              Join the IPET today and you'll be part of more than just a
              membership organization and together, we'll archive great things.
            </motion.p>

            <motion.div
              className="flex flex-row items-center justify-center space-x-12 mt-8 text-[16px] font-[500]"
              variants={containerVariants}
            >
              <motion.button
                onClick={() => navigate("/membership-details")}
                className="md:px-8 md:py-3 bg-[#2D387D] hover:bg-blue-700 text-white rounded-[5px] transition-colors duration-300"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Join the iPET
              </motion.button>
              <motion.button
                onClick={() => navigate("/membership-details")}
                className="md:px-8 md:py-3 bg-[#2D387D] hover:bg-blue-700 text-white rounded-[5px] transition-colors duration-300"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Get Involved
              </motion.button>
              <motion.button
                onClick={() => navigate("/login")}
                className="md:px-8 md:py-3 bg-[#2D387D] hover:bg-blue-700 text-white rounded-[5px] transition-colors duration-300"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Manage Your Membership
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Mobile View */}
      <div className="relative h-[493px] md:hidden overflow-hidden">
        {/* Background Carousel */}
        <motion.div
          className="absolute inset-0 z-0"
          initial="hidden"
          animate="visible"
          variants={bgVariants}
          key={currentBgIndex}
        >
          <img
            src={mobileBackgrounds[currentBgIndex]}
            alt="City Background"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-[#242D6485]" />
        </motion.div>

        {/* Carousel Controls */}
    

        {/* Indicators */}
        {/* <div className="absolute left-0 right-0 z-20 flex justify-center space-x-1 bottom-2">
          {mobileBackgrounds.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBgIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentBgIndex === index ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div> */}

        <motion.div
          className="relative z-10 flex flex-col items-center justify-center h-[250px] text-white text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
          variants={containerVariants}
        >
         <div className="max-w-[359px] mx-auto mt-[230px] px-[20px]">
            <motion.div
              className="space-y-[26px] mb-7"
              variants={containerVariants}
            >
              <motion.h1
                className="text-[14px] font-[600] leading-tight -mr-4"
                variants={itemVariants}
              >
                Join the IPET and help us to Engineer a better
                <br /> world
              </motion.h1>

              <motion.p
                className="text-[12px] font-[600] opacity-90 leading-relaxed -mr-1"
                variants={itemVariants}
              >
                Whether you're just starting out as an engineer, or you're a
                senior engineer at the top of your game we're here to support
                you and make you a part of our thriving community.
              </motion.p>

              <motion.p
                className="text-[12px] font-[600] opacity-90 leading-relaxed -ml-1"
                variants={itemVariants}
              >
                Join the IPET today and you'll be part of more than just a
                membership organization and together, we'll archive <br /> great
                things.
              </motion.p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center justify-center space-y-[26px] text-[12px] font-[500] w-[356px] -ml-3"
              variants={containerVariants}
            >
              <motion.button
                onClick={() => navigate("/register")}
                className="w-[359px] h-[28px] px-[10px] py-[5px] bg-[#2D387D] hover:bg-blue-700 text-white rounded-[5px] transition-colors duration-300"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Join the iPET
              </motion.button>
              <motion.button
                onClick={() => navigate("/register")}
                className="w-[359px] h-[28px] px-[10px] py-[5px] bg-[#2D387D] hover:bg-blue-700 text-white rounded-[5px] transition-colors duration-300"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Get Involved
              </motion.button>
              <motion.button
                onClick={() => navigate("/myipet")}
                className="w-[359px] h-[28px] px-[10px] py-[5px] bg-[#2D387D] hover:bg-blue-700 text-white rounded-[5px] transition-colors duration-300"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Manage Your Membership
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Banner;

// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import banner_bg from "../assets/Banner_bg.svg";
// import banner_M_bg from "../assets/Banner_M_bg.svg";

// const Banner = () => {
//   const navigate = useNavigate();

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
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.8,
//         ease: "easeOut",
//       },
//     },
//   };

//   const buttonVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut",
//       },
//     },
//     hover: {
//       scale: 1.05,
//       boxShadow: "0 4px 12px rgba(45, 56, 125, 0.3)",
//       transition: { duration: 0.2 },
//     },
//     tap: {
//       scale: 0.98,
//     },
//   };

//   const bgVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { duration: 1 },
//     },
//   };

//   return (
//     <>
//       {/* Desktop View */}
//       <div className="relative h-[584px] hidden md:block">
//         <motion.div
//           className="absolute inset-0 z-0"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: false }}
//           variants={bgVariants}
//         >
//           <img
//             src={banner_bg}
//             alt="City Background"
//             className="object-cover w-full h-full"
//           />
//           <div className="absolute inset-0 bg-[#242D6485]" />
//         </motion.div>

//         <motion.div
//           className="relative z-10 flex flex-col items-center justify-center md:min-h-[584px] text-white text-center px-4 md:px-32"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: false, margin: "-100px" }}
//           variants={containerVariants}
//         >
//           <div className="max-w-[1262px] mx-auto space-y-12">
//             <motion.h1
//               className="md:text-[30px] font-[600] leading-tight"
//               variants={itemVariants}
//             >
//               Join the IPET and help us to Engineer a better world
//             </motion.h1>

//             <motion.p
//               className="md:text-[20px] font-[600] mx-auto opacity-90 leading-relaxed"
//               variants={itemVariants}
//             >
//               Whether you're just starting out as an engineer, or you're a
//               senior engineer at the top of your game we're here to support you
//               and make you a part of our thriving community.
//             </motion.p>

//             <motion.p
//               className="md:text-[20px] font-[600] mx-auto opacity-90 leading-relaxed"
//               variants={itemVariants}
//             >
//               Join the IPET today and you'll be part of more than just a
//               membership organization and together, we'll archive great things.
//             </motion.p>

//             <motion.div
//               className="flex flex-row items-center justify-center space-x-12 mt-8 text-[16px] font-[500]"
//               variants={containerVariants}
//             >
//               <motion.button
//                 onClick={() => navigate("/membership-details")}
//                 className="md:px-8 md:py-3 bg-[#2D387D] hover:bg-blue-700 text-white rounded-[5px] transition-colors duration-300"
//                 variants={buttonVariants}
//                 whileHover="hover"
//                 whileTap="tap"
//               >
//                 Join the iPET
//               </motion.button>
//               <motion.button
//                 onClick={() => navigate("/membership-details")}
//                 className="md:px-8 md:py-3 bg-[#2D387D] hover:bg-blue-700 text-white rounded-[5px] transition-colors duration-300"
//                 variants={buttonVariants}
//                 whileHover="hover"
//                 whileTap="tap"
//               >
//                 Get Involved
//               </motion.button>
//               <motion.button
//                 onClick={() => navigate("/login")}
//                 className="md:px-8 md:py-3 bg-[#2D387D] hover:bg-blue-700 text-white rounded-[5px] transition-colors duration-300"
//                 variants={buttonVariants}
//                 whileHover="hover"
//                 whileTap="tap"
//               >
//                 Manage Your Membership
//               </motion.button>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>

//       {/* Mobile View */}
//       <div className="relative h-[493px] md:hidden">
//         <motion.div
//           className="absolute inset-0 z-0"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: false }}
//           variants={bgVariants}
//         >
//           <img
//             src={banner_M_bg}
//             alt="City Background"
//             className="object-cover w-full h-full"
//           />
//           <div className="absolute inset-0 bg-[#242D6485]" />
//         </motion.div>

//         <motion.div
//           className="relative z-10 flex flex-col items-center justify-center h-[250px] text-white text-center"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: false, margin: "-50px" }}
//           variants={containerVariants}
//         >
//           <div className="max-w-[359px] mx-auto mt-[230px] px-[20px]">
//             <motion.div
//               className="space-y-[26px] mb-7"
//               variants={containerVariants}
//             >
//               <motion.h1
//                 className="text-[14px] font-[600] leading-tight -mr-4"
//                 variants={itemVariants}
//               >
//                 Join the IPET and help us to Engineer a better
//                 <br /> world
//               </motion.h1>

//               <motion.p
//                 className="text-[12px] font-[600] opacity-90 leading-relaxed -mr-1"
//                 variants={itemVariants}
//               >
//                 Whether you're just starting out as an engineer, or you're a
//                 senior engineer at the top of your game we're here to support
//                 you and make you a part of our thriving community.
//               </motion.p>

//               <motion.p
//                 className="text-[12px] font-[600] opacity-90 leading-relaxed -ml-1"
//                 variants={itemVariants}
//               >
//                 Join the IPET today and you'll be part of more than just a
//                 membership organization and together, we'll archive <br /> great
//                 things.
//               </motion.p>
//             </motion.div>
//             <motion.div
//               className="flex flex-col items-center justify-center space-y-[26px] text-[12px] font-[500] w-[356px] -ml-3"
//               variants={containerVariants}
//             >
//               <motion.button
//                 onClick={() => navigate("/register")}
//                 className="w-[359px] h-[28px] px-[10px] py-[5px] bg-[#2D387D] hover:bg-blue-700 text-white rounded-[5px] transition-colors duration-300"
//                 variants={buttonVariants}
//                 whileHover="hover"
//                 whileTap="tap"
//               >
//                 Join the iPET
//               </motion.button>
//               <motion.button
//                 onClick={() => navigate("/register")}
//                 className="w-[359px] h-[28px] px-[10px] py-[5px] bg-[#2D387D] hover:bg-blue-700 text-white rounded-[5px] transition-colors duration-300"
//                 variants={buttonVariants}
//                 whileHover="hover"
//                 whileTap="tap"
//               >
//                 Get Involved
//               </motion.button>
//               <motion.button
//                 onClick={() => navigate("/myipet")}
//                 className="w-[359px] h-[28px] px-[10px] py-[5px] bg-[#2D387D] hover:bg-blue-700 text-white rounded-[5px] transition-colors duration-300"
//                 variants={buttonVariants}
//                 whileHover="hover"
//                 whileTap="tap"
//               >
//                 Manage Your Membership
//               </motion.button>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>
//     </>
//   );
// };

// export default Banner;
