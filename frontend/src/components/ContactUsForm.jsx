/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// import React, { useState } from "react";
// import {
//   FaMapMarkerAlt,
//   FaEnvelope,
//   FaFacebookF,
//   FaTwitter,
//   FaLinkedinIn,
//   FaYoutube,
// } from "react-icons/fa";

// import phone from "../assets/Phone.svg";
// import whatsapp from "../assets/Whatsapp.svg";

// const ContactForm = () => {
//   // Form state
//   const [formData, setFormData] = useState({
//     inquiryType: "",
//     name: "",
//     email: "",
//     phone: "",
//     message: ""
//   });

//   // Loading and success states
//   const [isLoading, setIsLoading] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setSubmitStatus({ type: "", message: "" });

//     try {
//       const response = await fetch('http://72.60.42.161/api/contact', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData)
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSubmitStatus({ type: "success", message: data.message });
//         // Reset form on success
//         setFormData({
//           inquiryType: "",
//           name: "",
//           email: "",
//           phone: "",
//           message: ""
//         });
//       } else {
//         setSubmitStatus({ type: "error", message: data.message || "Failed to send message. Please try again." });
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       setSubmitStatus({ type: "error", message: "An error occurred. Please try again later." });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//     <div className="min-h-screen bg-[#E9ECF7] py-8 md:py-24 px-2 md:px-16 hidden md:block">
//       <div className="md:px-0">
//       <div className="max-w-[1500px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16">
//         {/* Left Column - Contact Information */}
//         <div className="w-full space-y-4 lg:w-1/2">
//           {/* Location */}
//           <div className="flex items-start p-4 space-x-4 bg-white rounded-lg md:p-6">
//             <div className="bg-[#2D387D] p-3 rounded-full flex-shrink-0">
//               <FaMapMarkerAlt className="text-lg text-white md:text-xl" />
//             </div>
//             <div>
//               <h3 className="text-[#2543B1] text-lg md:text-xl font-semibold mb-2">
//                 Location
//               </h3>
//               <p className="text-[#2D387D] text-sm md:text-base">
//                 No 60, Weediyawatta, Yakkala.
//               </p>
//             </div>
//           </div>

//           {/* Phone Number */}
//           <div className="flex items-start p-4 space-x-4 bg-white rounded-lg md:p-6">
//             <div className="bg-[#2D387D] p-3 rounded-full flex-shrink-0">
//               <img src={phone} alt="Phone Icon" className="w-5 h-5" />
//             </div>
//             <div>
//               <h3 className="text-[#2543B1] text-lg md:text-xl font-semibold mb-2">
//                 Phone Number
//               </h3>
//               <p className="text-[#2D387D] text-sm md:text-base">
//                 +94 771 170 441
//               </p>
//             </div>
//           </div>

//           {/* Email Address */}
//           <div className="flex items-start p-4 space-x-4 bg-white rounded-lg md:p-6">
//             <div className="bg-[#2D387D] p-3 rounded-full flex-shrink-0">
//               <FaEnvelope className="text-lg text-white md:text-xl" />
//             </div>
//             <div>
//               <h3 className="text-[#2543B1] text-lg md:text-xl font-semibold mb-2">
//                 Email Address
//               </h3>
//               <p className="text-[#2D387D] text-sm md:text-base">
//                 info@ipet.lk
//               </p>
//             </div>
//           </div>

//           {/* WhatsApp */}
//           <div className="flex items-start p-4 space-x-4 bg-white rounded-lg md:p-6">
//             <div className="bg-[#2D387D] p-3 rounded-full flex-shrink-0">
//               <img src={whatsapp} alt="WhatsApp Icon" className="w-5 h-5" />
//             </div>
//             <div>
//               <h3 className="text-[#2543B1] text-lg md:text-xl font-semibold mb-2">
//                 WhatsApp Number
//               </h3>
//               <p className="text-[#2D387D] text-sm md:text-base">
//                 +94 771 170 441
//               </p>
//             </div>
//           </div>

//           {/* Social Media */}
//           <div className="pt-6">
//             <h3 className="text-[#2543B1] text-xl md:text-2xl font-semibold mb-4">
//               Connect with Us on
//             </h3>
//             <div className="flex space-x-4">
//               <a
//                 href="https://www.facebook.com/share/15MH58JbuB/"
//                 className="border border-[#2543B1] p-3 rounded hover:bg-[#39437A] transition-colors group"
//               >
//                 <FaFacebookF className="text-[#2D387D] w-5 h-5 md:w-6 md:h-6 group-hover:text-white" />
//               </a>
//               <a
//                 href="#"
//                 className="border border-[#2543B1] p-3 rounded hover:bg-[#39437A] transition-colors group"
//               >
//                 <FaTwitter className="text-[#2D387D] w-5 h-5 md:w-6 md:h-6 group-hover:text-white" />
//               </a>
//               <a
//                 href="#"
//                 className="border border-[#2543B1] p-3 rounded hover:bg-[#39437A] transition-colors group"
//               >
//                 <FaLinkedinIn className="text-[#2D387D] w-5 h-5 md:w-6 md:h-6 group-hover:text-white" />
//               </a>
//               <a
//                 href="#"
//                 className="border border-[#2543B1] p-3 rounded hover:bg-[#39437A] transition-colors group"
//               >
//                 <FaYoutube className="text-[#2D387D] w-5 h-5 md:w-6 md:h-6 group-hover:text-white" />
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Contact Form */}
//         <div className="w-full p-6 bg-white rounded-lg lg:w-1/2 md:p-8">
//           <h2 className="text-[#2543B1] text-2xl md:text-3xl font-medium mb-4">
//             SEND US AN EMAIL
//           </h2>
//           <p className="text-[#2D387D] mb-6 text-sm md:text-base">
//             Please reference our Frequently Asked Questions for more.
//           </p>

//           {/* Status message */}
//           {submitStatus.message && (
//             <div className={`mb-4 p-3 rounded ${submitStatus.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
//               {submitStatus.message}
//             </div>
//           )}

//           <form className="space-y-4" onSubmit={handleSubmit}>
//             <input
//               type="text"
//               name="inquiryType"
//               placeholder="Type of Inquiry"
//               className="w-full p-3 border border-[#2543B1] rounded focus:outline-none focus:border-[#2543B1]"
//               value={formData.inquiryType}
//               onChange={handleChange}
//               required
//             />

//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               className="w-full p-3 border border-[#2543B1] rounded focus:outline-none focus:border-[#2543B1]"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />

//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 className="w-full p-3 border border-[#2543B1] rounded focus:outline-none focus:border-[#2543B1]"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//               <input
//                 type="tel"
//                 name="phone"
//                 placeholder="Number"
//                 className="w-full p-3 border border-[#2543B1] rounded focus:outline-none focus:border-[#2543B1]"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <textarea
//               name="message"
//               placeholder="Message"
//               rows="4"
//               className="w-full p-3 border border-[#2543B1] rounded focus:outline-none focus:border-[#2543B1]"
//               value={formData.message}
//               onChange={handleChange}
//               required
//             ></textarea>

//             <div className="flex justify-end pt-6">
//               <button
//                 type="submit"
//                 className="bg-[#2D387D] text-white px-8 py-3 rounded hover:bg-[#2c325d] transition-colors disabled:opacity-70"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Submitting..." : "Submit"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//       </div>
//     </div>

//     {/* mobile view */}

//     <div className="min-h-screen bg-[#E9ECF7] py-8 md:py-24 px-6 md:px-4  md:hidden">
//       <div className="flex flex-col max-w-full gap-8 mx-auto lg:flex-row lg:gap-16">
//         {/* Left Column - Contact Information */}
//         <div className="w-full space-y-4 lg:w-1/2">
//           {/* Location */}
//           <div className="flex items-center px-2 py-2 space-x-4 bg-white rounded-lg md:p-6">
//             <div className="bg-[#2D387D] p-3 rounded-full flex-shrink-0">
//               <FaMapMarkerAlt className="text-white text-[10px] md:text-xl" />
//             </div>
//             <div className="flex flex-row items-center justify-between gap-10">
//               <h3 className="text-[#2543B1] text-[14px] md:text-xl font-semibold">
//                 Location
//               </h3>
//               <p className="text-[#2D387D] text-[12px] md:text-base">
//                 57, Ramakrishna Road, Colombo 06.
//               </p>
//             </div>
//           </div>

//           {/* Phone Number */}
//           <div className="flex items-center px-2 py-2 space-x-4 bg-white rounded-lg md:p-6">
//             <div className="bg-[#2D387D] p-3 rounded-full flex-shrink-0">
//               <img src={phone} alt="Phone Icon" className="w-[10px] h-[10px]" />
//             </div>
//             <div className="flex flex-row items-center justify-between gap-10">
//               <h3 className="text-[#2543B1] text-[14px] md:text-xl font-semibold ">
//                 Phone Number
//               </h3>
//               <p className="text-[#2D387D] text-[12px] md:text-base">
//                 +94 771 170 441
//               </p>
//             </div>
//           </div>

//           {/* Email Address */}
//           <div className="flex items-center px-2 py-2 space-x-4 bg-white rounded-lg md:p-6">
//             <div className="bg-[#2D387D] p-3 rounded-full flex-shrink-0">
//               <FaEnvelope className="text-white text-[10px] md:text-xl" />
//             </div>
//             <div className="flex flex-row items-center justify-between gap-10">
//               <h3 className="text-[#2543B1] text-[14px] md:text-xl font-semibold ">
//                 Email Address
//               </h3>
//               <p className="text-[#2D387D] text-[12px] md:text-base">
//                 info@ipet.lk
//               </p>
//             </div>
//           </div>

//           {/* WhatsApp */}
//           <div className="flex items-center px-2 py-2 space-x-4 bg-white rounded-lg md:p-6">
//             <div className="bg-[#2D387D] p-3 rounded-full flex-shrink-0">
//               <img src={whatsapp} alt="WhatsApp Icon" className="w-[10px] h-[10px]" />
//             </div>
//             <div className="flex flex-row items-center justify-between gap-10">
//               <h3 className="text-[#2543B1] text-[14px] md:text-xl font-semibold">
//                 WhatsApp Number
//               </h3>
//               <p className="text-[#2D387D] text-[12px] md:text-base">
//                 +94 771 170 441
//               </p>
//             </div>
//           </div>

//           {/* Social Media */}
//           <div className="pt-6">
//             <h3 className="text-[#2543B1] text-center text-[14px] md:text-2xl font-semibold mb-4">
//               Connect with Us on
//             </h3>
//             <div className="flex justify-center space-x-8">
//               <a
//                 href="https://www.facebook.com/share/15MH58JbuB/"
//                 className="border border-[#2543B1] p-2  hover:bg-[#39437A] transition-colors group"
//               >
//                 <FaFacebookF className="text-[#2D387D] w-[15px] h-[15px] md:w-6 md:h-6 group-hover:text-white" />
//               </a>
//               <a
//                 href="https://twitter.com"
//                 className="border border-[#2543B1] p-2  hover:bg-[#39437A] transition-colors group"
//               >
//                 <FaTwitter className="text-[#2D387D] w-[15px] h-[15px] md:w-6 md:h-6 group-hover:text-white" />
//               </a>
//               <a
//                 href="https://www.linkedin.com/company/ipet-institute-of-professional-engineering-technologists/"
//                 className="border border-[#2543B1] p-2  hover:bg-[#39437A] transition-colors group"
//               >
//                 <FaLinkedinIn className="text-[#2D387D] w-[15px] h-[15px] md:w-6 md:h-6 group-hover:text-white" />
//               </a>
//               <a
//                 href="https://www.youtube.com/@ipet2162/"
//                 className="border border-[#2543B1] p-2  hover:bg-[#39437A] transition-colors group"
//               >
//                 <FaYoutube className="text-[#2D387D] w-[15px] h-[15px] md:w-6 md:h-6 group-hover:text-white" />
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Contact Form */}
//         <div className="w-full p-6 bg-white rounded-lg lg:w-1/2 md:p-8">
//           <h2 className="text-[#2543B1] text-[14px] text-center md:text-3xl font-medium mb-4">
//             SEND US AN EMAIL
//           </h2>
//           <p className="text-[#2D387D] mb-6 text-[12px] text-center md:text-base">
//             Please reference our Frequently Asked Questions for more.
//           </p>

//           {/* Status message */}
//           {submitStatus.message && (
//             <div className={`mb-4 p-3 rounded text-[12px] text-center ${submitStatus.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
//               {submitStatus.message}
//             </div>
//           )}

//           <form className="space-y-4" onSubmit={handleSubmit}>
//             <input
//               type="text"
//               name="inquiryType"
//               placeholder="Type of Inquiry"
//               className="w-full p-2 border text-[12px] border-[#2543B1] rounded focus:outline-none focus:border-[#2543B1]"
//               value={formData.inquiryType}
//               onChange={handleChange}
//               required
//             />

//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               className="w-full p-2 border text-[12px] border-[#2543B1] rounded focus:outline-none focus:border-[#2543B1]"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />

//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 className="w-full p-2 text-[12px] border border-[#2543B1] rounded focus:outline-none focus:border-[#2543B1]"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//               <input
//                 type="tel"
//                 name="phone"
//                 placeholder="Number"
//                 className="w-full p-2 border text-[12px] border-[#2543B1] rounded focus:outline-none focus:border-[#2543B1]"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <textarea
//               name="message"
//               placeholder="Message"
//               rows="4"
//               className="w-full p-2 border text-[12px] border-[#2543B1] rounded focus:outline-none focus:border-[#2543B1]"
//               value={formData.message}
//               onChange={handleChange}
//               required
//             ></textarea>

//             <div className="flex justify-center pt-6">
//               <button
//                 type="submit"
//                 className="bg-[#2D387D] w-[340px] text-[14px] text-white px-8 py-3 rounded hover:bg-[#2c325d] transition-colors disabled:opacity-70"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Submitting..." : "Submit"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default ContactForm;
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import phone from "../assets/Phone.svg";
import whatsapp from "../assets/Whatsapp.svg";

const ContactForm = () => {
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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const formItemVariants = {
    hidden: { x: 30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Form state
  const [formData, setFormData] = useState({
    inquiryType: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      const response = await fetch(
        "http://72.60.42.161/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: "success", message: data.message });
        setFormData({
          inquiryType: "",
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.message || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setIsLoading(false);
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
        className="min-h-screen bg-[#E9ECF7] py-8 md:py-24 px-2 md:px-16 hidden md:block"
      >
        <div className="md:px-0">
          <div className="max-w-[1500px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Left Column - Contact Information */}
            <motion.div
              variants={containerVariants}
              className="w-full space-y-4 lg:w-1/2"
            >
              {/* Location */}
              <motion.div
                variants={itemVariants}
                className="flex items-start p-4 space-x-4 bg-white rounded-lg md:p-6"
              >
                <div className="bg-[#2D387D] p-3 rounded-full flex-shrink-0">
                  <FaMapMarkerAlt className="text-lg text-white md:text-xl" />
                </div>
                <div>
                  <h3 className="text-[#2543B1] text-lg md:text-xl font-semibold mb-2">
                    Location
                  </h3>
                  <p className="text-[#2D387D] text-sm md:text-base">
                    No 60, Weediyawatta, Yakkala.
                  </p>
                </div>
              </motion.div>

              {/* Phone Number */}
              <motion.div
                variants={itemVariants}
                className="flex items-start p-4 space-x-4 bg-white rounded-lg md:p-6"
              >
                <div className="bg-[#2D387D] p-3 rounded-full flex-shrink-0">
                  <img src={phone} alt="Phone Icon" className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[#2543B1] text-lg md:text-xl font-semibold mb-2">
                    Phone Number
                  </h3>
                  <p className="text-[#2D387D] text-sm md:text-base">
                    +94 771 170 441
                  </p>
                </div>
              </motion.div>

              {/* Email Address */}
              <motion.div
                variants={itemVariants}
                className="flex items-start p-4 space-x-4 bg-white rounded-lg md:p-6"
              >
                <div className="bg-[#2D387D] p-3 rounded-full flex-shrink-0">
                  <FaEnvelope className="text-lg text-white md:text-xl" />
                </div>
                <div>
                  <h3 className="text-[#2543B1] text-lg md:text-xl font-semibold mb-2">
                    Email Address
                  </h3>
                  <p className="text-[#2D387D] text-sm md:text-base">
                    info@ipet.lk
                  </p>
                </div>
              </motion.div>

              {/* WhatsApp */}
              <motion.div
                variants={itemVariants}
                className="flex items-start p-4 space-x-4 bg-white rounded-lg md:p-6"
              >
                <div className="bg-[#2D387D] p-3 rounded-full flex-shrink-0">
                  <img src={whatsapp} alt="WhatsApp Icon" className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[#2543B1] text-lg md:text-xl font-semibold mb-2">
                    WhatsApp Number
                  </h3>
                  <p className="text-[#2D387D] text-sm md:text-base">
                    +94 771 170 441
                  </p>
                </div>
              </motion.div>

              {/* Social Media */}
              <motion.div variants={itemVariants} className="pt-6">
                <h3 className="text-[#2543B1] text-xl md:text-2xl font-semibold mb-4">
                  Connect with Us on
                </h3>
                <div className="flex space-x-4">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="https://www.facebook.com/share/15MH58JbuB/"
                    className="border border-[#2543B1] p-3 rounded hover:bg-[#39437A] transition-colors group"
                  >
                    <FaFacebookF className="text-[#2D387D] w-5 h-5 md:w-6 md:h-6 group-hover:text-white" />
                  </motion.a>
                  {/* <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="https://twitter.com"
                    className="border border-[#2543B1] p-3 rounded hover:bg-[#39437A] transition-colors group"
                  >
                    <FaTwitter className="text-[#2D387D] w-5 h-5 md:w-6 md:h-6 group-hover:text-white" />
                  </motion.a> */}
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="https://www.linkedin.com/company/institute-of-professional-engineers-and-technologist/"
                    className="border border-[#2543B1] p-3 rounded hover:bg-[#39437A] transition-colors group"
                  >
                    <FaLinkedinIn className="text-[#2D387D] w-5 h-5 md:w-6 md:h-6 group-hover:text-white" />
                  </motion.a>
                  {/* <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="https://www.youtube.com/@ipet2162/"
                    className="border border-[#2543B1] p-3 rounded hover:bg-[#39437A] transition-colors group"
                  >
                    <FaYoutube className="text-[#2D387D] w-5 h-5 md:w-6 md:h-6 group-hover:text-white" />
                  </motion.a> */}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              variants={containerVariants}
              className="w-full p-6 bg-white rounded-lg lg:w-1/2 md:p-8"
            >
              <motion.h2
                variants={formItemVariants}
                className="text-[#2543B1] text-2xl md:text-3xl font-medium mb-4"
              >
                SEND US AN EMAIL
              </motion.h2>
              <motion.p
                variants={formItemVariants}
                className="text-[#2D387D] mb-6 text-sm md:text-base"
              >
                Please reference our Frequently Asked Questions for more.
              </motion.p>

              {submitStatus.message && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`mb-4 p-3 rounded ${
                    submitStatus.type === "success"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {submitStatus.message}
                </motion.div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <motion.div variants={formItemVariants}>
                  <input
                    type="text"
                    name="inquiryType"
                    placeholder="Type of Inquiry"
                    className="w-full p-3 border border-[#2543B1] rounded focus:outline-none focus:border-[#2543B1]"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    required
                  />
                </motion.div>

                <motion.div variants={formItemVariants}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full p-3 border border-[#2543B1] rounded focus:outline-none focus:border-[#2543B1]"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </motion.div>

                <motion.div
                  variants={formItemVariants}
                  className="grid grid-cols-1 gap-4 md:grid-cols-2"
                >
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-3 border border-[#2543B1] rounded focus:outline-none focus:border-[#2543B1]"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Number"
                    className="w-full p-3 border border-[#2543B1] rounded focus:outline-none focus:border-[#2543B1]"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </motion.div>

                <motion.div variants={formItemVariants}>
                  <textarea
                    name="message"
                    placeholder="Message"
                    rows="4"
                    className="w-full p-3 border border-[#2543B1] rounded focus:outline-none focus:border-[#2543B1]"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </motion.div>

                <motion.div
                  variants={formItemVariants}
                  className="flex justify-end pt-6"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="bg-[#2D387D] text-white px-8 py-3 rounded hover:bg-[#2c325d] transition-colors disabled:opacity-70"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit"}
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Mobile View */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-50px" }}
        variants={containerVariants}
        className="min-h-screen bg-[#E9ECF7] py-8 md:py-24 px-6 md:px-4 md:hidden"
      >
        <div className="flex flex-col max-w-full gap-8 mx-auto lg:flex-row lg:gap-16">
          {/* Left Column - Contact Information */}
          <motion.div
            variants={containerVariants}
            className="w-full space-y-4 lg:w-1/2"
          >
            {/* Location */}
            <motion.div
              variants={itemVariants}
              className="flex items-center px-2 py-2 space-x-4 bg-white rounded-lg md:p-6"
            >
              <div className="bg-[#2D387D] p-3 rounded-full flex-shrink-0">
                <FaMapMarkerAlt className="text-white text-[10px] md:text-xl" />
              </div>
              <div className="flex flex-row items-center justify-between gap-10">
                <h3 className="text-[#2543B1] text-[14px] md:text-xl font-semibold">
                  Location
                </h3>
                <p className="text-[#2D387D] text-[12px] md:text-base">
                  57, Ramakrishna Road, Colombo 06.
                </p>
              </div>
            </motion.div>

            {/* Phone Number */}
            <motion.div
              variants={itemVariants}
              className="flex items-center px-2 py-2 space-x-4 bg-white rounded-lg md:p-6"
            >
              <div className="bg-[#2D387D] p-3 rounded-full flex-shrink-0">
                <img
                  src={phone}
                  alt="Phone Icon"
                  className="w-[10px] h-[10px]"
                />
              </div>
              <div className="flex flex-row items-center justify-between gap-10">
                <h3 className="text-[#2543B1] text-[14px] md:text-xl font-semibold ">
                  Phone Number
                </h3>
                <p className="text-[#2D387D] text-[12px] md:text-base">
                  +94 771 170 441
                </p>
              </div>
            </motion.div>

            {/* Email Address */}
            <motion.div
              variants={itemVariants}
              className="flex items-center px-2 py-2 space-x-4 bg-white rounded-lg md:p-6"
            >
              <div className="bg-[#2D387D] p-3 rounded-full flex-shrink-0">
                <FaEnvelope className="text-white text-[10px] md:text-xl" />
              </div>
              <div className="flex flex-row items-center justify-between gap-10">
                <h3 className="text-[#2543B1] text-[14px] md:text-xl font-semibold ">
                  Email Address
                </h3>
                <p className="text-[#2D387D] text-[12px] md:text-base">
                  info@ipet.lk
                </p>
              </div>
            </motion.div>

            {/* WhatsApp */}
            <motion.div
              variants={itemVariants}
              className="flex items-center px-2 py-2 space-x-4 bg-white rounded-lg md:p-6"
            >
              <div className="bg-[#2D387D] p-3 rounded-full flex-shrink-0">
                <img
                  src={whatsapp}
                  alt="WhatsApp Icon"
                  className="w-[10px] h-[10px]"
                />
              </div>
              <div className="flex flex-row items-center justify-between gap-10">
                <h3 className="text-[#2543B1] text-[14px] md:text-xl font-semibold">
                  WhatsApp Number
                </h3>
                <p className="text-[#2D387D] text-[12px] md:text-base">
                  +94 771 170 441
                </p>
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div variants={itemVariants} className="pt-6">
              <h3 className="text-[#2543B1] text-center text-[14px] md:text-2xl font-semibold mb-4">
                Connect with Us on
              </h3>
              <div className="flex justify-center space-x-8">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="https://www.facebook.com/share/15MH58JbuB/"
                  className="border border-[#2543B1] p-2 hover:bg-[#39437A] transition-colors group"
                >
                  <FaFacebookF className="text-[#2D387D] w-[15px] h-[15px] md:w-6 md:h-6 group-hover:text-white" />
                </motion.a>
                {/* <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="https://twitter.com"
                  className="border border-[#2543B1] p-2 hover:bg-[#39437A] transition-colors group"
                >
                  <FaTwitter className="text-[#2D387D] w-[15px] h-[15px] md:w-6 md:h-6 group-hover:text-white" />
                </motion.a> */}
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="https://www.linkedin.com/company/institute-of-professional-engineers-and-technologist/"
                  className="border border-[#2543B1] p-2 hover:bg-[#39437A] transition-colors group"
                >
                  <FaLinkedinIn className="text-[#2D387D] w-[15px] h-[15px] md:w-6 md:h-6 group-hover:text-white" />
                </motion.a>
                {/* <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="https://www.youtube.com/@ipet2162/"
                  className="border border-[#2543B1] p-2 hover:bg-[#39437A] transition-colors group"
                >
                  <FaYoutube className="text-[#2D387D] w-[15px] h-[15px] md:w-6 md:h-6 group-hover:text-white" />
                </motion.a> */}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            variants={containerVariants}
            className="w-full p-6 bg-white rounded-lg lg:w-1/2 md:p-8"
          >
            <motion.h2
              variants={formItemVariants}
              className="text-[#2543B1] text-[14px] text-center md:text-3xl font-medium mb-4"
            >
              SEND US AN EMAIL
            </motion.h2>
            <motion.p
              variants={formItemVariants}
              className="text-[#2D387D] mb-6 text-[12px] text-center md:text-base"
            >
              Please reference our Frequently Asked Questions for more.
            </motion.p>

            {submitStatus.message && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`mb-4 p-3 rounded text-[12px] text-center ${
                  submitStatus.type === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {submitStatus.message}
              </motion.div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <motion.div variants={formItemVariants}>
                <input
                  type="text"
                  name="inquiryType"
                  placeholder="Type of Inquiry"
                  className="w-full p-2 border text-[12px] border-[#2543B1] rounded focus:outline-none focus:border-[#2543B1]"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  required
                />
              </motion.div>

              <motion.div variants={formItemVariants}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-full p-2 border text-[12px] border-[#2543B1] rounded focus:outline-none focus:border-[#2543B1]"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </motion.div>

              <motion.div
                variants={formItemVariants}
                className="grid grid-cols-1 gap-4 md:grid-cols-2"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full p-2 text-[12px] border border-[#2543B1] rounded focus:outline-none focus:border-[#2543B1]"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Number"
                  className="w-full p-2 border text-[12px] border-[#2543B1] rounded focus:outline-none focus:border-[#2543B1]"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </motion.div>

              <motion.div variants={formItemVariants}>
                <textarea
                  name="message"
                  placeholder="Message"
                  rows="4"
                  className="w-full p-2 border text-[12px] border-[#2543B1] rounded focus:outline-none focus:border-[#2543B1]"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </motion.div>

              <motion.div
                variants={formItemVariants}
                className="flex justify-center pt-6"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-[#2D387D] w-[340px] text-[14px] text-white px-8 py-3 rounded hover:bg-[#2c325d] transition-colors disabled:opacity-70"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default ContactForm;
