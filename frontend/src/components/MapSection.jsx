/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
// /* eslint-disable no-unused-vars */
// /* eslint-disable react/no-unescaped-entities */
// import React from "react";
// import kurunegala from "../assets/kurunegala.png";
// import Washinton_m from "../assets/Washinton_M.svg";

// const MapSection = () => {
//   return (


//     <>
//       <div className="max-w-[1500px] mx-auto px-16 py-24 mb-20 md:block hidden">
//         {/* Header Section */}
//         <div className="mb-12 text-center">
//           <h2 className="text-[#2543B1] text-3xl font-semibold mb-4">
//             Find Us On Google Maps
//           </h2>
//           <p className="text-[#2D387D] max-w-[716px] mx-auto text-lg font-light leading-relaxed">
//             We'd love to connect with you! Visit us in person or explore our
//             location on Google Maps for easy directions.
//           </p>
//         </div>

//         {/* Map Container */}
//         <div className="relative w-full h-[509px] md:h-[509px] overflow-hidden shadow-lg bg-gray-50">
//           {/* Map Controls */}
//           <div className="absolute z-10 flex gap-2 top-5 left-5">
//             <button className="px-4 py-2 transition-colors bg-white shadow-md hover:bg-gray-50">
//               Map
//             </button>
//             <button className="px-4 py-2 transition-colors bg-white shadow-md hover:bg-gray-50">
//               Satellite
//             </button>
//           </div>

//           {/* Location Dropdown */}
//           <div className="absolute z-10 bottom-5 left-5">
//             <button className="bg-white px-5 py-5 shadow-md w-[300px] md:w-[399px] flex items-center justify-between">
//               <span className="text-[15px] font-normal">IPET Kurunegala</span>
//               <svg
//                 className="w-4 h-4"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </button>
//           </div>

//           {/* Fullscreen Button */}
//           <div className="absolute z-10 top-5 right-5">
//             <button className="bg-white p-2 shadow-md hover:bg-gray-50 transition-colors w-[47px] h-[40px] flex items-center justify-center">
//               <svg
//                 width="17"
//                 height="18"
//                 viewBox="0 0 17 18"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M2.45866 11.3458H0.0419922V17.3875H6.08366V14.9708H2.45866V11.3458ZM0.0419922 6.51249H2.45866V2.88749H6.08366V0.470825H0.0419922V6.51249ZM14.542 14.9708H10.917V17.3875H16.9587V11.3458H14.542V14.9708ZM10.917 0.470825V2.88749H14.542V6.51249H16.9587V0.470825H10.917Z"
//                   fill="black"
//                 />
//               </svg>
//             </button>
//           </div>

//           {/* Map Image */}
//           <div className="w-full h-full bg-gray-100">
//             {/* Replace this div with your actual map image */}
//             <img
//               src={kurunegala}
//               alt="Map location of IPET Kurunegala"
//               className="object-cover w-full h-full"
//             />
//           </div>
//         </div>
//       </div>

//       {/* mobile view */}
//       <div className="max-w-full px-0 mx-auto mb-0 py-14 md:hidden">
//         {/* Header Section */}
//         <div className="mb-8 text-center">
//           <h2 className="text-[#2543B1] text-[16px] font-semibold mb-4">
//             Find Us On Google Maps
//           </h2>
//           <p className="text-[#2D387D] text-[12px] max-w-[390px] mx-auto font-light leading-relaxed">
//             We'd love to connect with you! Visit us in person or explore our
//             <br /> location on Google Maps for easy directions.
//           </p>
//         </div>

//         {/* Map Container */}
//         <div className="relative w-full h-full md:h-[509px] overflow-hidden shadow-lg bg-gray-50 mb-24">
//           {/* Map Controls */}
//           <div className="absolute z-10 flex gap-1 top-5 left-5">
//             <button className="bg-white text-[10px] px-2 py-1 shadow-md hover:bg-gray-50 transition-colors">
//               Map
//             </button>
//             <button className="bg-white text-[10px]  px-2 py-1 shadow-md hover:bg-gray-50 transition-colors">
//               Satellite
//             </button>
//           </div>

//           {/* Location Dropdown */}
//           <div className="absolute z-10 bottom-6 left-5">
//             <button className="bg-white px-4 py-2 shadow-md w-[160px] h-[21px] md:w-[399px] flex items-center justify-between">
//               <span className="text-[10px] font-normal">IPET Kurunegala</span>
//               <svg
//                 className="w-4 h-4"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </button>
//           </div>

//           {/* Fullscreen Button */}
//           <div className="absolute z-10 top-5 right-5">
//             <button className="bg-white p-2 shadow-md hover:bg-gray-50 transition-colors w-[25px] h-[25px] flex items-center justify-center">
//               <svg
//                 width="15"
//                 height="15"
//                 viewBox="0 0 17 18"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M2.45866 11.3458H0.0419922V17.3875H6.08366V14.9708H2.45866V11.3458ZM0.0419922 6.51249H2.45866V2.88749H6.08366V0.470825H0.0419922V6.51249ZM14.542 14.9708H10.917V17.3875H16.9587V11.3458H14.542V14.9708ZM10.917 0.470825V2.88749H14.542V6.51249H16.9587V0.470825H10.917Z"
//                   fill="black"
//                 />
//               </svg>
//             </button>
//           </div>

//           {/* Map Image */}
//           <div className="w-full h-full bg-white">
//             {/* Replace this div with your actual map image */}
//             <img
//               src={Washinton_m}
//               alt="Map location of IPET Kurunegala"
//               className="object-cover w-full h-full"
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MapSection;

import React from "react";
import { motion } from "framer-motion";
import kurunegala from "../assets/kurunegala.png";
import Washinton_m from "../assets/Washinton_M.svg";

const MapSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const mapVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <>
      {/* Desktop View */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "0px" }}
        variants={containerVariants}
        className="max-w-[1500px] mx-auto px-16 py-24 mb-20 md:block hidden"
      >
        {/* Header Section */}
        <motion.div 
          variants={itemVariants}
          className="mb-12 text-center"
        >
          <h2 className="text-[#2543B1] text-3xl font-semibold mb-4">
            Find Us On Google Maps
          </h2>
          <p className="text-[#2D387D] max-w-[716px] mx-auto text-lg font-light leading-relaxed">
            We'd love to connect with you! Visit us in person or explore our
            location on Google Maps for easy directions.
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div 
          variants={mapVariants}
          className="relative w-full h-[509px] md:h-[509px] overflow-hidden shadow-lg bg-gray-50"
        >
          {/* Map Controls */}
          <motion.div 
            variants={itemVariants}
            className="absolute z-10 flex gap-2 top-5 left-5"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 transition-colors bg-white shadow-md hover:bg-gray-50"
            >
              Map
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 transition-colors bg-white shadow-md hover:bg-gray-50"
            >
              Satellite
            </motion.button>
          </motion.div>

          {/* Location Dropdown */}
          <motion.div 
            variants={itemVariants}
            className="absolute z-10 bottom-5 left-5"
          >
            <motion.button 
              whileHover={{ scale: 1.02 }}
              className="bg-white px-5 py-5 shadow-md w-[300px] md:w-[399px] flex items-center justify-between"
            >
              <span className="text-[15px] font-normal">IPET Kurunegala</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.button>
          </motion.div>

          {/* Fullscreen Button */}
          <motion.div 
            variants={itemVariants}
            className="absolute z-10 top-5 right-5"
          >
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-white p-2 shadow-md hover:bg-gray-50 transition-colors w-[47px] h-[40px] flex items-center justify-center"
            >
              <svg
                width="17"
                height="18"
                viewBox="0 0 17 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.45866 11.3458H0.0419922V17.3875H6.08366V14.9708H2.45866V11.3458ZM0.0419922 6.51249H2.45866V2.88749H6.08366V0.470825H0.0419922V6.51249ZM14.542 14.9708H10.917V17.3875H16.9587V11.3458H14.542V14.9708ZM10.917 0.470825V2.88749H14.542V6.51249H16.9587V0.470825H10.917Z"
                  fill="black"
                />
              </svg>
            </motion.button>
          </motion.div>

          {/* Map Image */}
          <div 
            // initial={{ opacity: 0 }}
            // whileInView={{ opacity: 1 }}
            // transition={{ duration: 1 }}
            className="w-full h-full bg-gray-100"
          >
            <img
              src={kurunegala}
              alt="Map location of IPET Kurunegala"
              className="object-cover w-full h-full"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Mobile View */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-50px" }}
        variants={containerVariants}
        className="max-w-full px-0 mx-auto mb-0 py-14 md:hidden"
      >
        {/* Header Section */}
        <motion.div 
          variants={itemVariants}
          className="mb-8 text-center"
        >
          <h2 className="text-[#2543B1] text-[16px] font-semibold mb-4">
            Find Us On Google Maps
          </h2>
          <p className="text-[#2D387D] text-[12px] max-w-[390px] mx-auto font-light leading-relaxed">
            We'd love to connect with you! Visit us in person or explore our
            <br /> location on Google Maps for easy directions.
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div 
          variants={mapVariants}
          className="relative w-full h-full md:h-[509px] overflow-hidden shadow-lg bg-gray-50 mb-24"
        >
          {/* Map Controls */}
          <motion.div 
            variants={itemVariants}
            className="absolute z-10 flex gap-1 top-5 left-5"
          >
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className="bg-white text-[10px] px-2 py-1 shadow-md hover:bg-gray-50 transition-colors"
            >
              Map
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className="bg-white text-[10px] px-2 py-1 shadow-md hover:bg-gray-50 transition-colors"
            >
              Satellite
            </motion.button>
          </motion.div>

          {/* Location Dropdown */}
          <motion.div 
            variants={itemVariants}
            className="absolute z-10 bottom-6 left-5"
          >
            <motion.button 
              whileTap={{ scale: 0.95 }}
              className="bg-white px-4 py-2 shadow-md w-[160px] h-[21px] md:w-[399px] flex items-center justify-between"
            >
              <span className="text-[10px] font-normal">IPET Kurunegala</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.button>
          </motion.div>

          {/* Fullscreen Button */}
          <motion.div 
            variants={itemVariants}
            className="absolute z-10 top-5 right-5"
          >
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className="bg-white p-2 shadow-md hover:bg-gray-50 transition-colors w-[25px] h-[25px] flex items-center justify-center"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 17 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.45866 11.3458H0.0419922V17.3875H6.08366V14.9708H2.45866V11.3458ZM0.0419922 6.51249H2.45866V2.88749H6.08366V0.470825H0.0419922V6.51249ZM14.542 14.9708H10.917V17.3875H16.9587V11.3458H14.542V14.9708ZM10.917 0.470825V2.88749H14.542V6.51249H16.9587V0.470825H10.917Z"
                  fill="black"
                />
              </svg>
            </motion.button>
          </motion.div>

          {/* Map Image */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full h-full bg-white"
          >
            <img
              src={Washinton_m}
              alt="Map location of IPET Kurunegala"
              className="object-cover w-full h-full"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default MapSection;
