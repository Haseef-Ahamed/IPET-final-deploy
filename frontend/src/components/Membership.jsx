import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import about_bg from "../assets/Membeship_bg_n.svg";
import about_bg_m from "../assets/Membeship_bg_n.svg";
import { useNavigate } from "react-router-dom";

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
  hover: {
    y: -10,
    transition: { duration: 0.3 }
  }
};

const ProgramCard = ({ title, logo, description }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="relative bg-white cursor-pointer rounded-xl shadow-lg overflow-hidden"
    >
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
          <motion.img
            src={logo}
            alt={title}
            className="object-contain max-h-40"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        {/* Content Section */}
        <div className="p-6 text-center">
          <motion.h3 
            className="text-xl font-semibold text-[#2543B1] mb-3"
            whileHover={{ color: "#2D387D" }}
          >
            {title}
          </motion.h3>
          <p className="text-sm text-[#2543B1] mb-4 line-clamp-3">
            {description}
          </p>
          <motion.button
            className="px-6 py-2 text-sm text-white bg-[#2D387D] rounded-md hover:bg-blue-700"
            onClick={() => navigate("/register")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Apply Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const Membership = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const programs = [
    {
      title: "Youth Club",
      description: "Elevate your engineering journey by joining our Youth Club! Connect with like-minded peers, gain valuable insights, and make a real difference in our community.",
      logo: "/robin.png",
    },
    {
      title: "FRIC",
      description: "Elevate your engineering journey by joining FRIC! Develop strategic solutions to real-world challenges and make a real difference in our community.",
      logo: "/flip2.png",
    },
    {
      title: "Tech Innovation",
      description: "Elevate your engineering journey by joining our Tech Innovation hub! Explore cutting-edge solutions and make a real difference in our community.",
      logo: "/feather.png",
    },
  ];

  // Animation variants for container
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

  return (
    <>
      {/* Desktop & Tablet View */}
      <div className="hidden w-full md:block mb-24"> {/* Added mb-24 */}
        {/* Banner Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="relative w-full h-[300px]"
        >
          <div className="absolute inset-0 bg-[#13111199] z-10" />
          <motion.img
            src={about_bg}
            alt="Membership Hero"
            className="absolute inset-0 w-full h-full object-cover object-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          
          <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex items-center">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl font-bold text-white"
            >
              Membership
            </motion.h1>
          </div>
        </motion.div>

        {/* Cards Grid Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50"
        >
          <div className="max-w-6xl mx-auto px-6">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {programs.map((program, index) => (
                <ProgramCard
                  key={index}
                  title={program.title}
                  description={program.description}
                  logo={program.logo}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Mobile View */}
      <div className="w-full md:hidden mb-16"> {/* Added mb-16 */}
        {/* Banner Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="relative w-full h-[200px]"
        >
          <div className="absolute inset-0 bg-[#00000099] z-10" />
          <motion.img
            src={about_bg_m}
            alt="Membership Hero"
            className="absolute inset-0 w-full h-full object-cover object-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          
          <div className="relative z-20 h-full flex items-center px-6">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl font-bold text-white"
            >
              Membership
            </motion.h1>
          </div>
        </motion.div>

        {/* Cards Carousel Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="py-12 bg-gradient-to-br from-blue-50 to-indigo-50"
        >
          <div className="max-w-md mx-auto px-4">
            <div className="relative overflow-hidden">
              {/* Cards */}
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {programs.map((program, index) => (
                  <div key={index} className="flex-shrink-0 w-full px-2">
                    <ProgramCard
                      title={program.title}
                      description={program.description}
                      logo={program.logo}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {programs.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentIndex === index ? "bg-[#2D387D]" : "bg-[#2D387D33]"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Membership;