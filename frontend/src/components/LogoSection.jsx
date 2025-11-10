// import IESL from "../assets/IESL.svg";
// import ECSL from "../assets/ECSL.svg";
// import IIESL from "../assets/IIESL.svg";

// const LogoSection = () => {
//   const logos = [
//     {
//       id: 1,
//       src: IESL,
//       alt: "IESL Logo",
//       width: "104",
//     },
//     {
//       id: 2,
//       src: ECSL,
//       alt: "ECSL Logo",
//       tagline: "Ethics Excellence Education",
//       width: "240",
//     },
//     {
//       id: 3,
//       src: IIESL,
//       alt: "IIESL Logo",
//       width: "112",
//     },
//   ];

//   const logo = [
//     {
//       id: 1,
//       src: IESL,
//       alt: "IESL Logo",
//       width: "52.29",
//     },
//     {
//       id: 2,
//       src: ECSL,
//       alt: "ECSL Logo",
//       tagline: "Ethics Excellence Education",
//       width: "120.25",
//     },
//     {
//       id: 3,
//       src: IIESL,
//       alt: "IIESL Logo",
//       width: "56.09",
//     },
//   ];

//   return (
//     <>
//       <div className="hidden py-12 bg-white md:py-20 md:block">
//         <div className="container px-4 mx-auto">
//           <div className="w-full mb-10"></div>

//           <div className="flex sm:flex-row md:flex-row items-center justify-around  md:space-x-4 md:max-w-[850px] mx-auto">
//             {/* {logos.map((logo) => (
//               <div
//                 key={logo.id}
//                 className="flex flex-col items-center transition-transform duration-300 transform hover:scale-105"
//               >
//                 <div className="relative group">
//                   <img
//                     src={logo.src}
//                     alt={logo.alt}
//                     className="h-auto w-full max-w-[250px] object-contain filter transition-all duration-300 group-hover:brightness-110"
//                     style={{ width: `${logo.width}px` }}
//                   />

//                   <div className="absolute inset-0 transition-opacity duration-300 rounded-lg opacity-0 bg-blue-50 group-hover:opacity-10"></div>
//                 </div>
//               </div>
//             ))} */}

//             <div className="flex flex-row items-center justify-between gap-[150px] ">
//               <div className="relative group">
//                 <a
//                   href="https://iesl.lk/index.php?lang=en"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="cursor-pointer"
//                 >
//                   <img
//                     src={IESL}
//                     alt={logos.alt}
//                     className="h-auto w-full max-w-[250px] object-contain filter transition-all duration-300 group-hover:brightness-110"
//                   />

//                   <div className="absolute inset-0 transition-opacity duration-300 rounded-lg opacity-0 bg-blue-50 group-hover:opacity-10"></div>
//                 </a>
//               </div>
//               <div className="relative group">
//                 <a
//                   href="https://ecsl.gov.lk/"
//                   target="https://ecsl.gov.lk/"
//                   rel="noopener noreferrer"
//                   className="cursor-pointer"
//                 >
//                   <img
//                     src={ECSL}
//                     alt={logos.alt}
//                     className="h-auto w-full max-w-[250px] object-contain filter transition-all duration-300 group-hover:brightness-110"
//                   />

//                   <div className="absolute inset-0 transition-opacity duration-300 rounded-lg opacity-0 bg-blue-50 group-hover:opacity-10"></div>
//                 </a>
//               </div>
//               <div className="relative group">
//                 <a
//                   href="https://iiesl.lk/"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="cursor-pointer"
//                 >
//                   <img
//                     src={IIESL}
//                     alt={logos.alt}
//                     className="h-auto w-full max-w-[250px] object-contain filter transition-all duration-300 group-hover:brightness-110"
//                   />

//                   <div className="absolute inset-0 transition-opacity duration-300 rounded-lg opacity-0 bg-blue-50 group-hover:opacity-10"></div>
//                 </a>
//               </div>
//             </div>
//           </div>

//           <div className="w-full mt-24"></div>
//         </div>
//       </div>

//       {/*  mobile view */}
//       <div className="py-6 bg-white md:py-20 md:hidden">
//         <div className="container mx-auto px-[28px]">
//           <div className="w-full mb-10"></div>

//           <div className="flex flex-row sm:flex-row md:flex-row items-center justify-around gap-[75px]  md:space-x-4 max-w-[378px] md:max-w-[850px] mx-auto">
//             {logo.map((logo) => (
//               <div
//                 key={logo.id}
//                 className="flex flex-col items-center transition-transform duration-300 transform hover:scale-105"
//               >
//                 <div className="relative group">
//                   <img
//                     src={logo.src}
//                     alt={logo.alt}
//                     className="h-auto w-full max-w-[130px] object-contain filter transition-all duration-300 group-hover:brightness-110"
//                     style={{ width: `${logo.width}px` }}
//                   />

//                   <div className="absolute inset-0 transition-opacity duration-300 rounded-lg opacity-0 bg-blue-50 group-hover:opacity-10"></div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="w-full mt-32"></div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default LogoSection;

// import { motion } from "framer-motion";
// import IESL from "../assets/IESL.svg";
// import ECSL from "../assets/ECSL.svg";
// import IIESL from "../assets/IIESL.svg";

// const LogoSection = () => {
//   const logos = [
//     {
//       id: 1,
//       src: IESL,
//       alt: "IESL Logo",
//       width: "104",
//       link: "https://iesl.lk/index.php?lang=en"
//     },
//     {
//       id: 2,
//       src: ECSL,
//       alt: "ECSL Logo",
//       width: "240",
//       link: "https://ecsl.gov.lk/"
//     },
//     {
//       id: 3,
//       src: IIESL,
//       alt: "IIESL Logo",
//       width: "112",
//       link: "https://iiesl.lk/"
//     }
//   ];

//   const mobileLogos = [
//     {
//       id: 1,
//       src: IESL,
//       alt: "IESL Logo",
//       width: "52.29",
//       link: "https://iesl.lk/index.php?lang=en"
//     },
//     {
//       id: 2,
//       src: ECSL,
//       alt: "ECSL Logo",
//       width: "120.25",
//       link: "https://ecsl.gov.lk/"
//     },
//     {
//       id: 3,
//       src: IIESL,
//       alt: "IIESL Logo",
//       width: "56.09",
//       link: "https://iiesl.lk/"
//     }
//   ];

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         when: "beforeChildren"
//       }
//     }
//   };

//   const logoVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut"
//       }
//     },
//     hover: {
//       scale: 1.05,
//       transition: { duration: 0.3 }
//     }
//   };

//   const bgVariants = {
//     hover: {
//       opacity: 0.1,
//       transition: { duration: 0.3 }
//     }
//   };

//   return (
//     <>
//       {/* Desktop View */}
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//         className="hidden py-12 bg-white md:py-20 md:block"
//       >
//         <div className="container px-4 mx-auto">
//           <div className="w-full mb-10"></div>

//           <motion.div
//             className="flex flex-row items-center justify-between gap-[150px]"
//             variants={containerVariants}
//           >
//             {logos.map((logo) => (
//               <motion.div
//                 key={logo.id}
//                 variants={logoVariants}
//                 whileHover="hover"
//                 className="relative group"
//               >
//                 <a
//                   href={logo.link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="cursor-pointer"
//                 >
//                   <img
//                     src={logo.src}
//                     alt={logo.alt}
//                     className="h-auto w-full max-w-[250px] object-contain filter transition-all duration-300 group-hover:brightness-110"
//                     style={{ width: `${logo.width}px` }}
//                   />
//                   <motion.div
//                     className="absolute inset-0 rounded-lg bg-blue-50"
//                     variants={bgVariants}
//                     initial={{ opacity: 0 }}
//                   />
//                 </a>
//               </motion.div>
//             ))}
//           </motion.div>

//           <div className="w-full mt-24"></div>
//         </div>
//       </motion.div>

//       {/* Mobile View */}
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//         className="py-6 bg-white md:py-20 md:hidden"
//       >
//         <div className="container mx-auto px-[28px]">
//           <div className="w-full mb-10"></div>

//           <motion.div
//             className="flex flex-row items-center justify-around gap-[75px] max-w-[378px] mx-auto"
//             variants={containerVariants}
//           >
//             {mobileLogos.map((logo) => (
//               <motion.div
//                 key={logo.id}
//                 variants={logoVariants}
//                 whileHover="hover"
//                 className="relative group"
//               >
//                 <a
//                   href={logo.link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="cursor-pointer"
//                 >
//                   <img
//                     src={logo.src}
//                     alt={logo.alt}
//                     className="h-auto w-full max-w-[130px] object-contain filter transition-all duration-300 group-hover:brightness-110"
//                     style={{ width: `${logo.width}px` }}
//                   />
//                   <motion.div
//                     className="absolute inset-0 rounded-lg bg-blue-50"
//                     variants={bgVariants}
//                     initial={{ opacity: 0 }}
//                   />
//                 </a>
//               </motion.div>
//             ))}
//           </motion.div>

//           <div className="w-full mt-32"></div>
//         </div>
//       </motion.div>
//     </>
//   );
// };

// export default LogoSection;

import { motion } from "framer-motion";
import IESL from "../assets/IESL.svg";
import ECSL from "../assets/ECSL.svg";
import IIESL from "../assets/IIESL.svg";

const LogoSection = () => {
  const logos = [
    {
      id: 1,
      src: IESL,
      alt: "IESL Logo",
      width: "104",
      link: "https://iesl.lk/index.php?lang=en",
    },
    {
      id: 2,
      src: ECSL,
      alt: "ECSL Logo",
      width: "240",
      link: "https://ecsl.gov.lk/",
    },
    {
      id: 3,
      src: IIESL,
      alt: "IIESL Logo",
      width: "112",
      link: "https://iiesl.lk/",
    },
  ];

  const mobileLogos = [
    {
      id: 1,
      src: IESL,
      alt: "IESL Logo",
      width: "52.29",
      link: "https://iesl.lk/index.php?lang=en",
    },
    {
      id: 2,
      src: ECSL,
      alt: "ECSL Logo",
      width: "120.25",
      link: "https://ecsl.gov.lk/",
    },
    {
      id: 3,
      src: IIESL,
      alt: "IIESL Logo",
      width: "56.09",
      link: "https://iiesl.lk/",
    },
  ];

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

  const logoVariants = {
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
      transition: { duration: 0.3 },
    },
  };

  const bgVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0 },
    hover: {
      opacity: 0.1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      {/* Desktop View */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px" }}
        variants={containerVariants}
        className="hidden py-12 bg-white md:py-20 md:block"
      >
        <div className="container px-4 mx-auto">
          <div className="w-full mb-10"></div>

          <motion.div
            className="flex flex-row items-center justify-between gap-[150px]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
            variants={containerVariants}
          >
            {logos.map((logo) => (
              <motion.div
                key={logo.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-20px" }}
                variants={logoVariants}
                whileHover="hover"
                className="relative group"
              >
                <a
                  href={logo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-auto w-full max-w-[250px] object-contain filter transition-all duration-300 group-hover:brightness-110"
                    style={{ width: `${logo.width}px` }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-blue-50"
                    initial="hidden"
                    whileInView="visible"
                    variants={bgVariants}
                    whileHover="hover"
                  />
                </a>
              </motion.div>
            ))}
          </motion.div>

          <div className="w-full mt-24"></div>
        </div>
      </motion.div>

      {/* Mobile View */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-50px" }}
        variants={containerVariants}
        className="py-6 bg-white md:py-20 md:hidden"
      >
        <div className="container mx-auto px-[28px]">
          <div className="w-full mb-10"></div>

          <motion.div
            className="flex flex-row items-center justify-around gap-[75px] max-w-[378px] mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-30px" }}
            variants={containerVariants}
          >
            {mobileLogos.map((logo) => (
              <motion.div
                key={logo.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-10px" }}
                variants={logoVariants}
                whileHover="hover"
                className="relative group"
              >
                <a
                  href={logo.link}
                  // target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-auto w-full max-w-[130px] object-contain filter transition-all duration-300 group-hover:brightness-110"
                    style={{ width: `${logo.width}px` }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-blue-50"
                    initial="hidden"
                    whileInView="visible"
                    variants={bgVariants}
                    whileHover="hover"
                  />
                </a>
              </motion.div>
            ))}
          </motion.div>

          <div className="w-full mt-32"></div>
        </div>
      </motion.div>
    </>
  );
};

export default LogoSection;

// import { motion } from "framer-motion";
// import IESL from "../assets/IESL.svg";
// import ECSL from "../assets/ECSL.svg";
// import IIESL from "../assets/IIESL.svg";

// const LogoSection = () => {
//   const logos = [
//     {
//       id: 1,
//       src: IESL,
//       alt: "IESL Logo",
//       width: "104",
//       link: "https://iesl.lk/index.php?lang=en"
//     },
//     {
//       id: 2,
//       src: ECSL,
//       alt: "ECSL Logo",
//       width: "240",
//       link: "https://ecsl.gov.lk/"
//     },
//     {
//       id: 3,
//       src: IIESL,
//       alt: "IIESL Logo",
//       width: "112",
//       link: "https://iiesl.lk/"
//     }
//   ];

//   const mobileLogos = [
//     {
//       id: 1,
//       src: IESL,
//       alt: "IESL Logo",
//       width: "52.29",
//       link: "https://iesl.lk/index.php?lang=en"
//     },
//     {
//       id: 2,
//       src: ECSL,
//       alt: "ECSL Logo",
//       width: "120.25",
//       link: "https://ecsl.gov.lk/"
//     },
//     {
//       id: 3,
//       src: IIESL,
//       alt: "IIESL Logo",
//       width: "56.09",
//       link: "https://iiesl.lk/"
//     }
//   ];

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         when: "beforeChildren"
//       }
//     }
//   };

//   const logoVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut"
//       }
//     },
//     hover: {
//       scale: 1.05,
//       transition: { duration: 0.3 }
//     }
//   };

//   const bgVariants = {
//     hover: {
//       opacity: 0.1,
//       transition: { duration: 0.3 }
//     }
//   };

//   return (
//     <>
//       {/* Desktop View */}
//       <motion.div
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: false, margin: "-100px" }}
//         variants={containerVariants}
//         className="hidden py-12 bg-white md:py-20 md:block"
//       >
//         <div className="container px-4 mx-auto">
//           <div className="w-full mb-10"></div>

//           <motion.div
//             className="flex flex-row items-center justify-between gap-[150px]"
//             variants={containerVariants}
//           >
//             {logos.map((logo) => (
//               <motion.div
//                 key={logo.id}
//                 variants={logoVariants}
//                 whileHover="hover"
//                 className="relative group"
//               >
//                 <a
//                   href={logo.link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="cursor-pointer"
//                 >
//                   <img
//                     src={logo.src}
//                     alt={logo.alt}
//                     className="h-auto w-full max-w-[250px] object-contain filter transition-all duration-300 group-hover:brightness-110"
//                     style={{ width: `${logo.width}px` }}
//                   />
//                   <motion.div
//                     className="absolute inset-0 rounded-lg bg-blue-50"
//                     variants={bgVariants}
//                     initial={{ opacity: 0 }}
//                   />
//                 </a>
//               </motion.div>
//             ))}
//           </motion.div>

//           <div className="w-full mt-24"></div>
//         </div>
//       </motion.div>

//       {/* Mobile View */}
//       <motion.div
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: false, margin: "-50px" }}
//         variants={containerVariants}
//         className="py-6 bg-white md:py-20 md:hidden"
//       >
//         <div className="container mx-auto px-[28px]">
//           <div className="w-full mb-10"></div>

//           <motion.div
//             className="flex flex-row items-center justify-around gap-[75px] max-w-[378px] mx-auto"
//             variants={containerVariants}
//           >
//             {mobileLogos.map((logo) => (
//               <motion.div
//                 key={logo.id}
//                 variants={logoVariants}
//                 whileHover="hover"
//                 className="relative group"
//               >
//                 <a
//                   href={logo.link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="cursor-pointer"
//                 >
//                   <img
//                     src={logo.src}
//                     alt={logo.alt}
//                     className="h-auto w-full max-w-[130px] object-contain filter transition-all duration-300 group-hover:brightness-110"
//                     style={{ width: `${logo.width}px` }}
//                   />
//                   <motion.div
//                     className="absolute inset-0 rounded-lg bg-blue-50"
//                     variants={bgVariants}
//                     initial={{ opacity: 0 }}
//                   />
//                 </a>
//               </motion.div>
//             ))}
//           </motion.div>

//           <div className="w-full mt-32"></div>
//         </div>
//       </motion.div>
//     </>
//   );
// };

// export default LogoSection;
