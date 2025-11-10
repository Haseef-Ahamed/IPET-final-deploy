// import about_bg from "../assets/Abouthero_bg.svg";
// import about_bg_m from "../assets/Aboutus_m_bg.svg";
// const AboutHero = () => {
//   return (
//     <>
//       <div className="relative md:w-full sm:w-[742px] h-[300px] md:h-[269px] sm:h-[269px] hidden md:block">
//         <div className="absolute inset-0">
//           <div className="absolute inset-0 bg-[#00000099] z-10" />
//           <img
//             src={about_bg}
//             alt="About Us Hero"
//             className="md:w-full sm:w-[740px] md:h-full sm:h-full object-cover"
//           />
//         </div>

//         <div className="relative z-20 h-full max-w-7xl mx-auto sm:px-0 md:px-0 md:ml-[70px] sm:ml-[40px]">
//           <div className="flex items-center h-full">
//             <h1 className="text-[50px] md:text-5xl lg:text-6xl font-[600] text-white">
//               About Us
//             </h1>
//           </div>
//         </div>
//       </div>

//       {/* mobile view */}
//       <div className="relative px-2 w-full md:w-full sm:w-[742px] h-[169px] md:h-[269px] sm:h-[269px]  md:hidden ">
//         <div className="absolute inset-0">
//           <div className="absolute inset-0 bg-[#00000099]  z-10" />
//           <img
//             src={about_bg_m}
//             alt="About Us Hero"
//             className="md:w-full sm:w-[740px] md:h-full sm:h-full w-full h-full object-cover"
//           />
//         </div>

//         <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-0 md:px-0 md:ml-[70px] sm:ml-[40px]">
//           <div className="flex items-center h-full">
//             <h1 className="text-[30px] md:text-5xl lg:text-6xl font-[600] text-white">
//               About Us
//             </h1>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AboutHero;

import { motion } from "framer-motion";
import about_bg from "../assets/Abouthero_bg.svg";
import about_bg_m from "../assets/Aboutus_m_bg.svg";

const AboutHero = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.3,
      },
    },
  };

  const bgVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      {/* Desktop View */}
      <motion.div
        className="relative md:w-full sm:w-[742px] h-[300px] md:h-[269px] sm:h-[269px] hidden md:block"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div className="absolute inset-0" variants={bgVariants}>
          <div className="absolute inset-0 bg-[#00000099] z-10" />
          <motion.img
            src={about_bg}
            alt="About Us Hero"
            className="md:w-full sm:w-[740px] md:h-full sm:h-full object-cover"
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </motion.div>

        <div className="relative z-20 h-full max-w-7xl mx-auto sm:px-0 md:px-0 md:ml-[70px] sm:ml-[40px]">
          <div className="flex items-center h-full">
            <motion.h1
              className="text-[50px] md:text-5xl lg:text-6xl font-[600] text-white"
              variants={textVariants}
            >
              About Us
            </motion.h1>
          </div>
        </div>
      </motion.div>

      {/* Mobile View */}
      <motion.div
        className="relative px-2 w-full md:w-full sm:w-[742px] h-[169px] md:h-[269px] sm:h-[269px] md:hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-50px" }}
        variants={containerVariants}
      >
        <motion.div className="absolute inset-0" variants={bgVariants}>
          <div className="absolute inset-0 bg-[#00000099] z-10" />
          <motion.img
            src={about_bg_m}
            alt="About Us Hero"
            className="md:w-full sm:w-[740px] md:h-full sm:h-full w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </motion.div>

        <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-0 md:px-0 md:ml-[70px] sm:ml-[40px]">
          <div className="flex items-center h-full">
            <motion.h1
              className="text-[30px] md:text-5xl lg:text-6xl font-[600] text-white"
              variants={textVariants}
            >
              About Us
            </motion.h1>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AboutHero;
