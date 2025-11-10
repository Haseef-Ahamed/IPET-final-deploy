/* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from "react";
// import about_bg from "../assets/Abouthero_bg.svg";
// import about_bg_m from "../assets/Aboutus_m_bg.svg";
// import { useNavigate, useParams } from "react-router-dom";

// const EventDetails = () => {
//   const navigate = useNavigate();
//   const { eventId } = useParams();
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [eventData, setEventData] = useState(null);

//   useEffect(() => {
//     // Fetch event details from API
//     const fetchEventDetails = async () => {
//       try {
//         const response = await fetch(
//           `http://72.60.42.161/api/events-courses/event/${eventId}`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch event details");
//         }
//         const data = await response.json();

//         // Transform API data to match component structure but exclude main image from the slider
//         const formattedData = {
//           ...data,
//           // Only include sub_images in the slider, not the main image
//           images: [...data.sub_images],
//         };

//         setEventData(formattedData);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     if (eventId) {
//       fetchEventDetails();
//     }
//   }, [eventId]);

//   const nextSlide = () => {
//     setCurrentSlide((prev) =>
//       prev === (eventData?.images?.length || 0) - 1 ? 0 : prev + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) =>
//       prev === 0 ? (eventData?.images?.length || 0) - 1 : prev - 1
//     );
//   };

//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//   };

//   const renderFormattedDescription = (text) => {
//     if (!text) return null;
  
//     // Split the text by lines to handle headings separately
//     const lines = text.split('\n');
  
//     return (
//       <div className="formatted-description">
//         {lines.map((line, lineIndex) => {
//           // Handle heading lines (starting with #)
//           if (line.trim().startsWith('# ')) {
//             const headingText = line.trim().substring(2);
//             return (
//               <h1 key={lineIndex} className="text-2xl font-bold mt-4 mb-2 text-[#2D387D]">
//                 {headingText}
//               </h1>
//             );
//           }
//           // Handle subheading lines (starting with ##)
//           else if (line.trim().startsWith('## ')) {
//             const subheadingText = line.trim().substring(3);
//             return (
//               <h2 key={lineIndex} className="text-xl font-bold mt-3 mb-2 text-[#2D387D]">
//                 {subheadingText}
//               </h2>
//             );
//           }
//           // Handle bullet points (starting with -, *, or •)
//           else if (line.trim().match(/^[-*•]\s/)) {
//             const listItemContent = line.trim().substring(2); // Remove the bullet point marker
  
//             // Process bold text in list items
//             const parts = listItemContent.split(/(\*\*[^*]+\*\*)/g);
  
//             return (
//               <div key={lineIndex} className="flex mb-1">
//                 <div className="mr-2">•</div> {/* Use a bullet point */}
//                 <div>
//                   {parts.map((part, partIndex) => {
//                     if (part.startsWith('**') && part.endsWith('**')) {
//                       // Remove the ** markers and wrap content in a strong tag
//                       const content = part.slice(2, -2);
//                       return <strong key={partIndex} className="font-bold">{content}</strong>;
//                     }
//                     return <span key={partIndex}>{part}</span>;
//                   })}
//                 </div>
//               </div>
//             );
//           }
//           // Handle empty lines as spacing
//           else if (line.trim() === '') {
//             return <div key={lineIndex} className="h-4"></div>;
//           }
//           // Handle regular text with bold formatting
//           else {
//             // Replace markdown-style bold text (**text**) with HTML strong tags
//             const parts = line.split(/(\*\*[^*]+\*\*)/g);
  
//             return (
//               <p key={lineIndex} className="mb-2">
//                 {parts.map((part, partIndex) => {
//                   if (part.startsWith('**') && part.endsWith('**')) {
//                     // Remove the ** markers and wrap content in a strong tag
//                     const content = part.slice(2, -2);
//                     return <strong key={partIndex} className="font-bold">{content}</strong>;
//                   }
//                   return <span key={partIndex}>{part}</span>;
//                 })}
//               </p>
//             );
//           }
//         })}
//       </div>
//     );
//   };

//   // Add loading and error states
//   if (loading) {
//     return <div className="flex items-center justify-center w-full h-screen">Loading...</div>;
//   }

//   if (error) {
//     return <div className="flex items-center justify-center w-full h-screen text-red-500">Error: {error}</div>;
//   }

//   if (!eventData) {
//     return <div className="flex items-center justify-center w-full h-screen">No event data found</div>;
//   }

//   // Check if there are any sub-images to display in the slider
//   const hasSliderImages = eventData.images && eventData.images.length > 0;

//   return (
//     <>
//       {/* Desktop View */}
//       <div className="hidden w-full md:block" style={{marginBottom:'100px'}}>
//         <div className="relative md:w-full sm:w-[742px] h-[300px] md:h-[269px] sm:h-[269px]">
//           <div className="absolute inset-0">
//             <div className="absolute inset-0 bg-[#00000099] z-10" />
//             <img
//               src={about_bg}
//               alt="Events Hero"
//               className="md:w-full sm:w-[740px] md:h-full sm:h-full object-cover"
//             />
//           </div>

//           <div className="relative z-20 h-full max-w-7xl mx-auto sm:px-0 md:px-0 md:ml-[70px] sm:ml-[40px]">
//             <div className="flex items-center h-full">
//               <h1 className="text-[50px] md:text-5xl lg:text-6xl font-[600] text-white">
//                 Events
//               </h1>
//             </div>
//           </div>
//         </div>

//         {/* Content Container */}
//         <div className="max-w-4xl p-4 pt-20 mx-auto">
//           {/* Event and Date Section */}
//           <div className="flex items-start mb-6 space-x-4">
//             <div className="flex items-center space-x-5 mt-1.5">
//               <span className="font-semibold text-black">Event</span>
//               <span className="text-4xl font-light tracking-wider text-black">
//                 |
//               </span>
//             </div>

//             <div className="flex-1">
//               <div className="flex items-center justify-between mb-4">
//                 <span className="text-[#2D387D] text-sm font-semibold">
//                   {new Date(eventData.uploaded_date).toLocaleDateString("en-US", {
//                     year: "numeric",
//                     month: "long",
//                     day: "numeric",
//                   })}
//                 </span>
//                 <button
//                   className="text-sm font-semibold text-black-700 hover:underline"
//                   onClick={() => navigate("/view-events")}
//                 >
//                   ← Go Back
//                 </button>
//               </div>

//               <h2 className="text-2xl font-semibold text-[#2D387D] mb-4">
//                 {eventData.title}
//               </h2>
              
//               {/* Main Image between title and description with fixed height */}
//               <div className="mb-6">
//                 <img
//                   src={eventData.main_image_url}
//                   alt={eventData.title}
//                   className="object-cover w-full rounded-lg h-96"
//                 />
//               </div>

//               {/* Description with proper formatting */}
//               <div className="text-[#2D387D] leading-relaxed">
//                 {renderFormattedDescription(eventData.description)}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Only show slider section if there are sub-images */}
//         {hasSliderImages && (
//           <div className="w-full bg-[#E9ECF7]">
//             <div className="max-w-4xl pt-20 pb-40 mx-auto mt-10">
//               <div className="relative -mb-6 overflow-hidden">
//                 {/* Fixed height container for the slide image */}
//                 <div className="relative w-full h-[500px] mb-4">
//                   <img
//                     src={eventData.images[currentSlide]}
//                     alt={`Slide ${currentSlide + 1}`}
//                     className="w-full h-[500px] object-contain mx-auto"
//                   />

//                   {eventData.images.length > 1 && (
//                     <>
//                       <button
//                         onClick={prevSlide}
//                         className="absolute flex items-center justify-center w-20 h-20 transition-colors -translate-y-1/2 left-4 top-1/2"
//                       >
//                         <svg
//                           width="72"
//                           height="72"
//                           fill="none"
//                           stroke="white"
//                           strokeWidth="1"
//                           viewBox="0 0 24 24"
//                         >
//                           <path d="M15 18l-6-6 6-6" />
//                         </svg>
//                       </button>
//                       <button
//                         onClick={nextSlide}
//                         className="absolute flex items-center justify-center w-20 h-20 transition-colors -translate-y-1/2 right-4 top-1/2"
//                       >
//                         <svg
//                           width="72"
//                           height="72"
//                           fill="none"
//                           stroke="white"
//                           strokeWidth="1"
//                           viewBox="0 0 24 24"
//                         >
//                           <path d="M9 6l6 6-6 6" />
//                         </svg>
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Thumbnail Images - Only show if there are additional images */}
//               {eventData.images.length > 1 && (
//                 <div className="grid grid-cols-4 gap-4 mt-6">
//                   {eventData.images.map((image, index) => (
//                     <button
//                       key={index}
//                       onClick={() => goToSlide(index)}
//                       className={`relative overflow-hidden aspect-w-16 aspect-h-9 ${
//                         currentSlide === index ? "ring-2 ring-blue-500" : ""
//                       }`}
//                     >
//                       <img
//                         src={image}
//                         alt={`Thumbnail ${index + 1}`}
//                         className="object-cover w-full h-full"
//                       />
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Mobile View - UPDATED TO MATCH COURSEDETAILS MOBILE VIEW */}
//       <div className="w-full md:hidden" style={{marginBottom:'120px'}}>
//         <div className="relative w-full h-[169px]">
//           <div className="absolute inset-0">
//             <div className="absolute inset-0 bg-[#00000099] z-10" />
//             <img
//               src={about_bg_m}
//               alt="Events Hero"
//               className="object-cover w-full h-full"
//             />
//           </div>

//           <div className="relative z-20 h-full">
//             <div className="flex items-center justify-center h-full px-4">
//               <h1 className="text-[30px] font-[600] text-white">
//                 Events
//               </h1>
//             </div>
//           </div>
//         </div>

//         {/* Content Container */}
//         <div className="w-full">
//           {/* Event label - left aligned with proper spacing */}
//           <div className="flex items-center mt-4 ml-4 justify-left">
//             <span className="font-semibold text-black">Event</span>
//             <span className="ml-2 text-4xl font-light tracking-wider text-black">
//               |
//             </span>
//           </div>

//           {/* Content Area - centered layout */}
//           <div className="px-4 mt-6">
//             <div className="flex items-center justify-between mb-4">
//               <span className="text-[#2543B1] text-sm font-semibold">
//                 {new Date(eventData.uploaded_date).toLocaleDateString("en-US", {
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                 })}
//               </span>
//               <button
//                 className="text-sm font-semibold text-black-700 hover:underline"
//                 onClick={() => navigate("/view-events")}
//               >
//                 ← Go Back
//               </button>
//             </div>

//             {/* Centered title */}
//             <h2 className="text-[16px] font-semibold text-[#2543B1] mb-4 text-center">
//               {eventData.title}
//             </h2>
            
//             {/* Centered Main Image for mobile view */}
//             <div className="flex justify-center w-full mb-4">
//               <img
//                 src={eventData.main_image_url}
//                 alt={eventData.title}
//                 className="object-cover w-full h-64"
//               />
//             </div>

//             {/* Mobile formatted description */}
//             <div className="text-[#2D387D] text-[12px] leading-relaxed">
//               {renderFormattedDescription(eventData.description)}
//             </div>
//           </div>
//         </div>

//         {/* Only show slider section if there are sub-images */}
//         {hasSliderImages && (
//           <div className="w-full bg-[#E9ECF7] mt-10">
//             <div className="w-full py-8 mx-auto">
//               <div className="relative -mb-8 overflow-hidden">
//                 {/* Fixed height container for the slide image on mobile */}
//                 <div className="relative w-full h-[250px]">
//                   <img
//                     src={eventData.images[currentSlide]}
//                     alt={`Slide ${currentSlide + 1}`}
//                     className="w-full h-[250px] object-contain mx-auto"
//                   />

//                   {/* Enhanced navigation arrows for mobile view */}
//                   {eventData.images.length > 1 && (
//                     <>
//                       <button
//                         onClick={prevSlide}
//                         className="absolute flex items-center justify-center w-10 h-10 -translate-y-1/2 bg-black rounded-full left-2 top-1/2 bg-opacity-40"
//                       >
//                         <svg
//                           width="24"
//                           height="24"
//                           fill="none"
//                           stroke="white"
//                           strokeWidth="2"
//                           viewBox="0 0 24 24"
//                         >
//                           <path d="M15 18l-6-6 6-6" />
//                         </svg>
//                       </button>
//                       <button
//                         onClick={nextSlide}
//                         className="absolute flex items-center justify-center w-10 h-10 -translate-y-1/2 bg-black rounded-full right-2 top-1/2 bg-opacity-40"
//                       >
//                         <svg
//                           width="24"
//                           height="24"
//                           fill="none"
//                           stroke="white"
//                           strokeWidth="2"
//                           viewBox="0 0 24 24"
//                         >
//                           <path d="M9 6l6 6-6 6" />
//                         </svg>
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Dot Indicators - Only show if there are multiple images */}
//               {eventData.images.length > 1 && (
//                 <div className="flex justify-center gap-2 mt-6">
//                   {eventData.images.map((_, index) => (
//                     <button
//                       key={index}
//                       onClick={() => goToSlide(index)}
//                       className={`w-2 h-2 rounded-full transition-all ${
//                         currentSlide === index
//                           ? "bg-[#2D387D80] w-2"
//                           : "bg-[#2D387D33]"
//                       }`}
//                       aria-label={`Go to slide ${index + 1}`}
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default EventDetails;


import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import about_bg from "../assets/Abouthero_bg.svg";
import about_bg_m from "../assets/Aboutus_m_bg.svg";
import { useNavigate, useParams } from "react-router-dom";

const EventDetails = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eventData, setEventData] = useState(null);

  // Animation variants
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

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const slideVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(
          `http://72.60.42.161/api/events-courses/event/${eventId}`
        );
        if (!response.ok) throw new Error("Failed to fetch event details");
        const data = await response.json();
        setEventData({
          ...data,
          images: [...data.sub_images]
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (eventId) fetchEventDetails();
  }, [eventId]);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === (eventData?.images?.length || 0) - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? (eventData?.images?.length || 0) - 1 : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const renderFormattedDescription = (text) => {
    if (!text) return null;
    const lines = text.split('\n');
  
    return (
      <div className="formatted-description">
        {lines.map((line, lineIndex) => {
          if (line.trim().startsWith('# ')) {
            const headingText = line.trim().substring(2);
            return (
              <motion.h1 
                key={lineIndex} 
                className="text-2xl font-bold mt-4 mb-2 text-[#2D387D]"
                variants={itemVariants}
              >
                {headingText}
              </motion.h1>
            );
          }
          else if (line.trim().startsWith('## ')) {
            const subheadingText = line.trim().substring(3);
            return (
              <motion.h2 
                key={lineIndex} 
                className="text-xl font-bold mt-3 mb-2 text-[#2D387D]"
                variants={itemVariants}
              >
                {subheadingText}
              </motion.h2>
            );
          }
          else if (line.trim().match(/^[-*•]\s/)) {
            const listItemContent = line.trim().substring(2);
            const parts = listItemContent.split(/(\*\*[^*]+\*\*)/g);
  
            return (
              <motion.div 
                key={lineIndex} 
                className="flex mb-1"
                variants={itemVariants}
              >
                <div className="mr-2">•</div>
                <div>
                  {parts.map((part, partIndex) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                      const content = part.slice(2, -2);
                      return <strong key={partIndex} className="font-bold">{content}</strong>;
                    }
                    return <span key={partIndex}>{part}</span>;
                  })}
                </div>
              </motion.div>
            );
          }
          else if (line.trim() === '') {
            return <div key={lineIndex} className="h-4"></div>;
          }
          else {
            const parts = line.split(/(\*\*[^*]+\*\*)/g);
  
            return (
              <motion.p 
                key={lineIndex} 
                className="mb-2"
                variants={itemVariants}
              >
                {parts.map((part, partIndex) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    const content = part.slice(2, -2);
                    return <strong key={partIndex} className="font-bold">{content}</strong>;
                  }
                  return <span key={partIndex}>{part}</span>;
                })}
              </motion.p>
            );
          }
        })}
      </div>
    );
  };

  if (loading) {
    return <div className="flex items-center justify-center w-full h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center w-full h-screen text-red-500">Error: {error}</div>;
  }

  if (!eventData) {
    return <div className="flex items-center justify-center w-full h-screen">No event data found</div>;
  }

  const hasSliderImages = eventData.images && eventData.images.length > 0;

  return (
    <>
      {/* Desktop View */}
      <div className="hidden w-full md:block" style={{marginBottom:'100px'}}>
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative md:w-full h-[300px] md:h-[269px]"
        >
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[#00000099] z-10" />
            <img
              src={about_bg}
              alt="Events Hero"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="relative z-20 h-full max-w-7xl mx-auto md:ml-[70px]">
            <div className="flex items-center h-full">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-[50px] md:text-5xl lg:text-6xl font-[600] text-white"
              >
                Events
              </motion.h1>
            </div>
          </div>
        </motion.div>

        {/* Content Container */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-4xl p-4 pt-20 mx-auto"
        >
          {/* Event and Date Section */}
          <motion.div 
            variants={itemVariants}
            className="flex items-start mb-6 space-x-4"
          >
            <div className="flex items-center space-x-5 mt-1.5">
              <span className="font-semibold text-black">Event</span>
              <span className="text-4xl font-light tracking-wider text-black">|</span>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <motion.span variants={itemVariants} className="text-[#2D387D] text-sm font-semibold">
                  {new Date(eventData.uploaded_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </motion.span>
                <motion.button
                  variants={itemVariants}
                  className="text-sm font-semibold text-black-700 hover:underline"
                  onClick={() => navigate("/view-events")}
                >
                  ← Go Back
                </motion.button>
              </div>

              <motion.h2 variants={itemVariants} className="text-2xl font-semibold text-[#2D387D] mb-4">
                {eventData.title}
              </motion.h2>
              
              {/* Main Image */}
              <motion.div 
                variants={itemVariants}
                className="mb-6"
              >
                <motion.img
                  src={eventData.main_image_url}
                  alt={eventData.title}
                  className="object-cover w-full rounded-lg h-96"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Description */}
              <motion.div variants={containerVariants} className="text-[#2D387D] leading-relaxed">
                {renderFormattedDescription(eventData.description)}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Image Slider Section */}
        {hasSliderImages && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={containerVariants}
            className="w-full bg-[#E9ECF7]"
          >
            <div className="max-w-4xl pt-20 pb-40 mx-auto mt-10">
              <motion.div 
                variants={itemVariants}
                className="relative -mb-6 overflow-hidden"
              >
                <div className="relative w-full h-[500px] mb-4">
                  <motion.img
                    key={currentSlide}
                    src={eventData.images[currentSlide]}
                    alt={`Slide ${currentSlide + 1}`}
                    className="w-full h-[500px] object-contain mx-auto"
                    initial="hidden"
                    animate="visible"
                    variants={slideVariants}
                  />

                  {eventData.images.length > 1 && (
                    <>
                      <motion.button
                        variants={itemVariants}
                        onClick={prevSlide}
                        className="absolute flex items-center justify-center w-20 h-20 transition-colors -translate-y-1/2 left-4 top-1/2"
                        whileHover={{ scale: 1.1 }}
                      >
                        <svg width="72" height="72" fill="none" stroke="white" strokeWidth="1" viewBox="0 0 24 24">
                          <path d="M15 18l-6-6 6-6" />
                        </svg>
                      </motion.button>
                      <motion.button
                        variants={itemVariants}
                        onClick={nextSlide}
                        className="absolute flex items-center justify-center w-20 h-20 transition-colors -translate-y-1/2 right-4 top-1/2"
                        whileHover={{ scale: 1.1 }}
                      >
                        <svg width="72" height="72" fill="none" stroke="white" strokeWidth="1" viewBox="0 0 24 24">
                          <path d="M9 6l6 6-6 6" />
                        </svg>
                      </motion.button>
                    </>
                  )}
                </div>
              </motion.div>

              {/* Thumbnails */}
              {eventData.images.length > 1 && (
                <motion.div 
                  variants={containerVariants}
                  className="grid grid-cols-4 gap-4 mt-6"
                >
                  {eventData.images.map((image, index) => (
                    <motion.button
                      key={index}
                      variants={itemVariants}
                      onClick={() => goToSlide(index)}
                      className={`relative overflow-hidden aspect-w-16 aspect-h-9 ${
                        currentSlide === index ? "ring-2 ring-blue-500" : ""
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Mobile View */}
      <div className="w-full md:hidden" style={{marginBottom:'120px'}}>
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[169px]"
        >
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[#00000099] z-10" />
            <img
              src={about_bg_m}
              alt="Events Hero"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="relative z-20 h-full">
            <div className="flex items-center justify-center h-full px-4">
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-[30px] font-[600] text-white"
              >
                Events
              </motion.h1>
            </div>
          </div>
        </motion.div>

        {/* Content Container */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
          variants={containerVariants}
          className="w-full"
        >
          {/* Event label */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center mt-4 ml-4 justify-left"
          >
            <span className="font-semibold text-black">Event</span>
            <span className="ml-2 text-4xl font-light tracking-wider text-black">|</span>
          </motion.div>

          {/* Content Area */}
          <div className="px-4 mt-6">
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-between mb-4"
            >
              <span className="text-[#2543B1] text-sm font-semibold">
                {new Date(eventData.uploaded_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <button
                className="text-sm font-semibold text-black-700 hover:underline"
                onClick={() => navigate("/view-events")}
              >
                ← Go Back
              </button>
            </motion.div>

            <motion.h2 
              variants={itemVariants}
              className="text-[16px] font-semibold text-[#2543B1] mb-4 text-center"
            >
              {eventData.title}
            </motion.h2>
            
            <motion.div 
              variants={itemVariants}
              className="flex justify-center w-full mb-4"
            >
              <motion.img
                src={eventData.main_image_url}
                alt={eventData.title}
                className="object-cover w-full h-64"
                whileTap={{ scale: 0.98 }}
              />
            </motion.div>

            <motion.div 
              variants={containerVariants}
              className="text-[#2D387D] text-[12px] leading-relaxed"
            >
              {renderFormattedDescription(eventData.description)}
            </motion.div>
          </div>
        </motion.div>

        {/* Image Slider Section */}
        {hasSliderImages && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
            variants={containerVariants}
            className="w-full bg-[#E9ECF7] mt-10"
          >
            <div className="w-full py-8 mx-auto">
              <motion.div 
                variants={itemVariants}
                className="relative -mb-8 overflow-hidden"
              >
                <div className="relative w-full h-[250px]">
                  <motion.img
                    key={currentSlide}
                    src={eventData.images[currentSlide]}
                    alt={`Slide ${currentSlide + 1}`}
                    className="w-full h-[250px] object-contain mx-auto"
                    initial="hidden"
                    animate="visible"
                    variants={slideVariants}
                  />

                  {eventData.images.length > 1 && (
                    <>
                      <motion.button
                        variants={itemVariants}
                        onClick={prevSlide}
                        className="absolute flex items-center justify-center w-10 h-10 -translate-y-1/2 bg-black rounded-full left-2 top-1/2 bg-opacity-40"
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M15 18l-6-6 6-6" />
                        </svg>
                      </motion.button>
                      <motion.button
                        variants={itemVariants}
                        onClick={nextSlide}
                        className="absolute flex items-center justify-center w-10 h-10 -translate-y-1/2 bg-black rounded-full right-2 top-1/2 bg-opacity-40"
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M9 6l6 6-6 6" />
                        </svg>
                      </motion.button>
                    </>
                  )}
                </div>
              </motion.div>

              {/* Dot Indicators */}
              {eventData.images.length > 1 && (
                <motion.div 
                  variants={itemVariants}
                  className="flex justify-center gap-2 mt-6"
                >
                  {eventData.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentSlide === index
                          ? "bg-[#2D387D80] w-2"
                          : "bg-[#2D387D33]"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default EventDetails;