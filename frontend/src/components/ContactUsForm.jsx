import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";
import phone from "../assets/Phone.svg";
import whatsapp from "../assets/Whatsapp.svg";

const ContactForm = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, when: "beforeChildren" },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const formItemVariants = {
    hidden: { x: 30, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: "success", message: data.message });
        setFormData({ inquiryType: "", name: "", email: "", phone: "", message: "" });
      } else {
        setSubmitStatus({ type: "error", message: data.message || "Failed to send message." });
      }
    } catch (error) {
      setSubmitStatus({ type: "error", message: "Network error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* ==================== DESKTOP VIEW (UNCHANGED - PERFECT) ==================== */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px" }}
        variants={containerVariants}
        className="min-h-screen bg-[#E9ECF7] py-8 md:py-24 px-2 md:px-16 hidden md:block"
      >
        <div className="max-w-[1500px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Left Column */}
          <motion.div variants={containerVariants} className="w-full space-y-6 lg:w-1/2">
            {/* Location */}
            <motion.div variants={itemVariants} className="flex items-start gap-5 p-6 bg-white rounded-xl shadow-sm">
              <div className="bg-[#2D387D] p-4 rounded-full">
                <FaMapMarkerAlt className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-[#2543B1] text-xl font-semibold mb-2">Location</h3>
                <p className="text-[#2D387D] text-base">No 60, Weediyawatta, Yakkala.</p>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div variants={itemVariants} className="flex items-start gap-5 p-6 bg-white rounded-xl shadow-sm">
              <div className="bg-[#2D387D] p-4 rounded-full">
                <img src={phone} alt="Phone" className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-[#2543B1] text-xl font-semibold mb-2">Phone Number</h3>
                <p className="text-[#2D387D] text-base">+94 771 170 441</p>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants} className="flex items-start gap-5 p-6 bg-white rounded-xl shadow-sm">
              <div className="bg-[#2D387D] p-4 rounded-full">
                <FaEnvelope className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-[#2543B1] text-xl font-semibold mb-2">Email Address</h3>
                <p className="text-[#2D387D] text-base">info@ipet.lk</p>
              </div>
            </motion.div>

            {/* WhatsApp */}
            <motion.div variants={itemVariants} className="flex items-start gap-5 p-6 bg-white rounded-xl shadow-sm">
              <div className="bg-[#2D387D] p-4 rounded-full">
                <img src={whatsapp} alt="WhatsApp" className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-[#2543B1] text-xl font-semibold mb-2">WhatsApp Number</h3>
                <p className="text-[#2D387D] text-base">+94 771 170 441</p>
              </div>
            </motion.div>

            {/* Social */}
            <motion.div variants={itemVariants} className="pt-8">
              <h3 className="text-[#2543B1] text-2xl font-semibold mb-6">Connect with Us on</h3>
              <div className="flex gap-5">
                <motion.a whileHover={{ scale: 1.1 }} href="https://www.facebook.com/share/15MH58JbuB/" className="border-2 border-[#2543B1] p-4 rounded-xl hover:bg-[#2D387D] transition group">
                  <FaFacebookF className="text-[#2D387D] text-2xl group-hover:text-white" />
                </motion.a>
                <motion.a whileHover={{ scale: 1.1 }} href="https://www.linkedin.com/company/institute-of-professional-engineers-and-technologist/" className="border-2 border-[#2543B1] p-4 rounded-xl hover:bg-[#2D387D] transition group">
                  <FaLinkedinIn className="text-[#2D387D] text-2xl group-hover:text-white" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div variants={containerVariants} className="w-full lg:w-1/2 bg-white p-8 rounded-2xl shadow-lg">
            <motion.h2 variants={formItemVariants} className="text-[#2543B1] text-3xl font-semibold mb-4">SEND US AN EMAIL</motion.h2>
            <motion.p variants={formItemVariants} className="text-[#2D387D] mb-8">Please reference our FAQs for more info.</motion.p>

            {submitStatus.message && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`mb-6 p-4 rounded-lg text-center ${submitStatus.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                {submitStatus.message}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.input variants={formItemVariants} type="text" name="inquiryType" placeholder="Type of Inquiry" required value={formData.inquiryType} onChange={handleChange} className="w-full p-4 border border-[#2543B1] rounded-lg focus:outline-none focus:border-[#2D387D]" />
              <motion.input variants={formItemVariants} type="text" name="name" placeholder="Name" required value={formData.name} onChange={handleChange} className="w-full p-4 border border-[#2543B1] rounded-lg focus:outline-none focus:border-[#2D387D]" />
              <motion.div variants={formItemVariants} className="grid grid-cols-2 gap-4">
                <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} className="p-4 border border-[#2543B1] rounded-lg focus:outline-none focus:border-[#2D387D]" />
                <input type="tel" name="phone" placeholder="Phone" required value={formData.phone} onChange={handleChange} className="p-4 border border-[#2543B1] rounded-lg focus:outline-none focus:border-[#2D387D]" />
              </motion.div>
              <motion.textarea variants={formItemVariants} name="message" placeholder="Message" rows="5" required value={formData.message} onChange={handleChange} className="w-full p-4 border border-[#2543B1] rounded-lg focus:outline-none focus:border-[#2D387D]" />
              <motion.div variants={formItemVariants} className="text-right pt-4">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" disabled={isLoading} className="bg-[#2D387D] text-white px-10 py-4 rounded-lg hover:bg-[#1e2655] transition font-medium">
                  {isLoading ? "Sending..." : "Submit"}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </motion.div>

      {/* ==================== MOBILE VIEW - NOW PERFECTLY LEFT-ALIGNED ==================== */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-50px" }}
        variants={containerVariants}
        className="bg-[#E9ECF7] py-12 px-6 md:hidden"
      >
        <div className="space-y-10">
          {/* Contact Info Cards */}
          <motion.div variants={containerVariants} className="space-y-6">
            {/* Location */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-md flex items-start gap-5">
              <div className="bg-[#2D387D] p-4 rounded-full flex-shrink-0">
                <FaMapMarkerAlt className="text-white text-xl" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-[#2543B1] text-lg font-bold mb-1">Location</h3>
                <p className="text-[#2D387D] text-sm leading-relaxed">No 60, Weediyawatta, Yakkala.</p>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-md flex items-start gap-5">
              <div className="bg-[#2D387D] p-4 rounded-full flex-shrink-0">
                <img src={phone} alt="Phone" className="w-6 h-6" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-[#2543B1] text-lg font-bold mb-1">Phone Number</h3>
                <p className="text-[#2D387D] text-sm">+94 771 170 441</p>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-md flex items-start gap-5">
              <div className="bg-[#2D387D] p-4 rounded-full flex-shrink-0">
                <FaEnvelope className="text-white text-xl" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-[#2543B1] text-lg font-bold mb-1">Email Address</h3>
                <p className="text-[#2D387D] text-sm">info@ipet.lk</p>
              </div>
            </motion.div>

            {/* WhatsApp */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-md flex items-start gap-5">
              <div className="bg-[#2D387D] p-4 rounded-full flex-shrink-0">
                <img src={whatsapp} alt="WhatsApp" className="w-6 h-6" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-[#2543B1] text-lg font-bold mb-1">WhatsApp</h3>
                <p className="text-[#2D387D] text-sm">+94 771 170 441</p>
              </div>
            </motion.div>

            {/* Social */}
            <motion.div variants={itemVariants} className="text-center pt-6">
              <h3 className="text-[#2543B1] text-xl font-bold mb-6">Connect with Us</h3>
              <div className="flex justify-center gap-8">
                <motion.a whileHover={{ scale: 1.2 }} href="https://www.facebook.com/share/15MH58JbuB/" className="bg-white p-4 rounded-full shadow-lg border-2 border-[#2543B1] hover:bg-[#2D387D] transition group">
                  <FaFacebookF className="text-[#2D387D] text-2xl group-hover:text-white" />
                </motion.a>
                <motion.a whileHover={{ scale: 1.2 }} href="https://www.linkedin.com/company/institute-of-professional-engineers-and-technologist/" className="bg-white p-4 rounded-full shadow-lg border-2 border-[#2543B1] hover:bg-[#2D387D] transition group">
                  <FaLinkedinIn className="text-[#2D387D] text-2xl group-hover:text-white" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={containerVariants} className="bg-white rounded-3xl p-8 shadow-xl">
            <motion.h2 variants={formItemVariants} className="text-[#2543B1] text-2xl font-bold text-center mb-4">SEND US AN EMAIL</motion.h2>
            <motion.p variants={formItemVariants} className="text-[#2D387D] text-center mb-8 text-sm">We'd love to hear from you!</motion.p>

            {submitStatus.message && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`mb-6 p-4 rounded-lg text-center text-sm ${submitStatus.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                {submitStatus.message}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.input variants={formItemVariants} type="text" name="inquiryType" placeholder="Type of Inquiry" required value={formData.inquiryType} onChange={handleChange} className="w-full p-4 rounded-xl border border-gray-300 focus:border-[#2D387D] focus:outline-none text-sm" />
              <motion.input variants={formItemVariants} type="text" name="name" placeholder="Your Name" required value={formData.name} onChange={handleChange} className="w-full p-4 rounded-xl border border-gray-300 focus:border-[#2D387D] focus:outline-none text-sm" />
              <motion.div variants={formItemVariants} className="grid grid-cols-2 gap-4">
                <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} className="p-4 rounded-xl border border-gray-300 focus:border-[#2D387D] focus:outline-none text-sm" />
                <input type="tel" name="phone" placeholder="Phone" required value={formData.phone} onChange={handleChange} className="p-4 rounded-xl border border-gray-300 focus:border-[#2D387D] focus:outline-none text-sm" />
              </motion.div>
              <motion.textarea variants={formItemVariants} name="message" placeholder="Your Message" rows="5" required value={formData.message} onChange={handleChange} className="w-full p-4 rounded-xl border border-gray-300 focus:border-[#2D387D] focus:outline-none text-sm" />
              <motion.div variants={formItemVariants} className="text-center pt-6">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" disabled={isLoading} className="bg-[#2D387D] text-white w-full max-w-md py-4 rounded-xl font-bold text-lg hover:bg-[#1e2655] transition">
                  {isLoading ? "Sending..." : "Send Message"}
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