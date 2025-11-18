/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { motion } from "framer-motion";

const MapSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, when: "beforeChildren" }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const mapVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <>
      {/* ==================== DESKTOP VIEW ==================== */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "0px" }}
        variants={containerVariants}
        className="max-w-[1500px] mx-auto px-16 py-24 mb-20 hidden md:block"
      >
        <motion.div variants={itemVariants} className="mb-12 text-center">
          <h2 className="text-[#2543B1] text-3xl font-semibold mb-4">
            Find Us On Google Maps
          </h2>
          <p className="text-[#2D387D] max-w-[716px] mx-auto text-lg font-light leading-relaxed">
            We'd love to connect with you! Visit us in person or get directions directly on Google Maps.
          </p>
        </motion.div>

        <motion.div variants={mapVariants} className="relative w-full h-[509px] overflow-hidden rounded-2xl shadow-2xl">
          <iframe
            title="IPET Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.346447068363!2d80.036287614775!3d7.097129992837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMDUnN49.OCIgTiA4MMKwMDInMTkuNSJF!5e0!3m2!1sen!2slk!4v1698000000000!5m2!1sen!2slk"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
          ></iframe>

          {/* Optional: Clean overlay label */}
          <div className="absolute bottom-5 left-5 z-10">
            <div className="bg-white/95 backdrop-blur-sm px-6 py-4 rounded-xl shadow-xl flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="font-semibold text-gray-800">IPET</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ==================== MOBILE VIEW ==================== */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px" }}
        variants={containerVariants}
        className="px-8 pt-16 pb-32 md:hidden bg-white"
      >
        <motion.div variants={itemVariants} className="mb-12 text-center">
          <h2 className="text-[#2543B1] text-xl font-bold mb-4">
            Find Us On Google Maps
          </h2>
          <p className="text-[#2D387D] text-sm font-light leading-relaxed max-w-xs mx-auto">
            Tap the map below to get directions
          </p>
        </motion.div>

        <motion.div
          variants={mapVariants}
          className="relative w-full h-80 overflow-hidden rounded-3xl shadow-2xl"
        >
          <iframe
            title="IPET Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.346447068363!2d80.036287614775!3d7.097129992837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMDUnN49.OCIgTiA4MMKwMDInMTkuNSJF!5e0!3m2!1sen!2slk!4v1698000000000!5m2!1sen!2slk"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
          ></iframe>

          {/* Clean mobile label */}
          <div className="absolute bottom-4 left-4 z-10">
            <div className="bg-white/95 backdrop-blur-sm px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></div>
              <span className="font-bold text-gray-800 text-sm">IPET</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default MapSection;