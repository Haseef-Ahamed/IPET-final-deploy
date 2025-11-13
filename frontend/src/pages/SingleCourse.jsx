 
 
// import React, { useState, useEffect } from "react";
// import about_bg from "../assets/Abouthero_bg.svg";
// import about_bg_m from "../assets/Aboutus_m_bg.svg";
// import { useNavigate, useParams } from "react-router-dom";

// const CourseDetails = () => {
//   const navigate = useNavigate();
//   const { courseId } = useParams();
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [courseData, setCourseData] = useState(null);

//   useEffect(() => {
//     // Fetch course details from API
//     const fetchCourseDetails = async () => {
//       try {
//         const response = await fetch(
//           `http://72.60.42.161/api/events-courses/course/${courseId}`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch course details");
//         }
//         const data = await response.json();

//         // Transform API data to match component structure but exclude main image from the slider
//         const formattedData = {
//           ...data,
//           // Only include sub_images in the slider, not the main image
//           images: [...data.sub_images],
//         };

//         setCourseData(formattedData);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     if (courseId) {
//       fetchCourseDetails();
//     }
//   }, [courseId]);

//   const nextSlide = () => {
//     if (!courseData || !courseData.images) return;
//     setCurrentSlide((prev) =>
//       prev === courseData.images.length - 1 ? 0 : prev + 1
//     );
//   };

//   const prevSlide = () => {
//     if (!courseData || !courseData.images) return;
//     setCurrentSlide((prev) =>
//       prev === 0 ? courseData.images.length - 1 : prev - 1
//     );
//   };

//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//   };

//   // Enhanced function to render formatted description with headings, bold text, lists, and preserved spacing
//   const renderFormattedDescription = (text) => {
//     if (!text) return null;

//     // Split the text into paragraphs first (preserving line breaks)
//     const paragraphs = text.split('\n');

//     // Track if we're inside a list
//     let inNumberedList = false;
//     let inBulletList = false;
//     let listItems = [];
//     const result = [];

//     // Process each paragraph
//     for (let i = 0; i < paragraphs.length; i++) {
//       const paragraph = paragraphs[i];
//       const trimmedParagraph = paragraph.trim();

//       // Check if the line is a numbered list item (starts with a number followed by a period or dot)
//       const isNumberedListItem = /^\d+\.\s.+/.test(trimmedParagraph);

//       // Check if the line is a bullet list item (starts with - or •)
//       const isBulletListItem = /^[-•]\s.+/.test(trimmedParagraph);

//       // Handle headings
//       if (trimmedParagraph.startsWith('# ')) {
//         // If we were in a list, end it
//         if (inNumberedList || inBulletList) {
//           if (inNumberedList) {
//             result.push(
//               <ol key={`list-${result.length}`} className="mb-4 ml-5 list-decimal">
//                 {listItems}
//               </ol>
//             );
//           } else {
//             result.push(
//               <ul key={`list-${result.length}`} className="mb-4 ml-5 list-disc">
//                 {listItems}
//               </ul>
//             );
//           }
//           inNumberedList = false;
//           inBulletList = false;
//           listItems = [];
//         }

//         const headingText = trimmedParagraph.substring(2);
//         result.push(
//           <h1 key={`heading-${result.length}`} className="text-2xl font-bold text-[#2D387D] mt-4 mb-2">
//             {formatBoldText(headingText)}
//           </h1>
//         );
//       }
//       // Handle secondary headings
//       else if (trimmedParagraph.startsWith('## ')) {
//         // If we were in a list, end it
//         if (inNumberedList || inBulletList) {
//           if (inNumberedList) {
//             result.push(
//               <ol key={`list-${result.length}`} className="mb-4 ml-5 list-decimal">
//                 {listItems}
//               </ol>
//             );
//           } else {
//             result.push(
//               <ul key={`list-${result.length}`} className="mb-4 ml-5 list-disc">
//                 {listItems}
//               </ul>
//             );
//           }
//           inNumberedList = false;
//           inBulletList = false;
//           listItems = [];
//         }

//         const headingText = trimmedParagraph.substring(3);
//         result.push(
//           <h2 key={`heading-${result.length}`} className="text-xl font-bold text-[#2D387D] mt-4 mb-2">
//             {formatBoldText(headingText)}
//           </h2>
//         );
//       }
//       // Handle numbered list items
//       else if (isNumberedListItem) {
//         // If we're transitioning from a bullet list to a numbered list, end the bullet list
//         if (inBulletList) {
//           result.push(
//             <ul key={`list-${result.length}`} className="mb-4 ml-5 list-disc">
//               {listItems}
//             </ul>
//           );
//           listItems = [];
//           inBulletList = false;
//         }

//         inNumberedList = true;
//         // Extract the list item content (remove the number and dot)
//         const listItemContent = trimmedParagraph.replace(/^\d+\.\s/, '');
//         listItems.push(
//           <li key={`li-${listItems.length}`}>{formatBoldText(listItemContent)}</li>
//         );

//         // If this is the last paragraph or the next paragraph is not a list item, end the list
//         if (i === paragraphs.length - 1 ||
//            !((/^\d+\.\s.+/.test(paragraphs[i+1]?.trim() || ''))) ) {
//           result.push(
//             <ol key={`list-${result.length}`} className="mb-4 ml-5 list-decimal">
//               {listItems}
//             </ol>
//           );
//           inNumberedList = false;
//           listItems = [];
//         }
//       }
//       // Handle bullet list items
//       else if (isBulletListItem) {
//         // If we're transitioning from a numbered list to a bullet list, end the numbered list
//         if (inNumberedList) {
//           result.push(
//             <ol key={`list-${result.length}`} className="mb-4 ml-5 list-decimal">
//               {listItems}
//             </ol>
//           );
//           listItems = [];
//           inNumberedList = false;
//         }

//         inBulletList = true;
//         // Extract the list item content (remove the bullet)
//         const listItemContent = trimmedParagraph.replace(/^[-•]\s/, '');
//         listItems.push(
//           <li key={`li-${listItems.length}`}>{formatBoldText(listItemContent)}</li>
//         );

//         // If this is the last paragraph or the next paragraph is not a list item, end the list
//         if (i === paragraphs.length - 1 ||
//            !((/^[-•]\s.+/.test(paragraphs[i+1]?.trim() || ''))) ) {
//           result.push(
//             <ul key={`list-${result.length}`} className="mb-4 ml-5 list-disc">
//               {listItems}
//             </ul>
//           );
//           inBulletList = false;
//           listItems = [];
//         }
//       }
//       // Handle empty lines
//       else if (trimmedParagraph === '') {
//         // Only add spacer if we're not in a list
//         if (!inNumberedList && !inBulletList) {
//           result.push(<div key={`spacer-${result.length}`} className="h-4"></div>);
//         }
//       }
//       // Handle normal paragraphs
//       else {
//         // If we were in a list, end it
//         if (inNumberedList) {
//           result.push(
//             <ol key={`list-${result.length}`} className="mb-4 ml-5 list-decimal">
//               {listItems}
//             </ol>
//           );
//           inNumberedList = false;
//           listItems = [];
//         } else if (inBulletList) {
//           result.push(
//             <ul key={`list-${result.length}`} className="mb-4 ml-5 list-disc">
//               {listItems}
//             </ul>
//           );
//           inBulletList = false;
//           listItems = [];
//         }

//         result.push(
//           <p key={`p-${result.length}`} className="mb-2">
//             {formatBoldText(trimmedParagraph)}
//           </p>
//         );
//       }
//     }

//     return result;
//   };

//   // Helper function to format bold text
//   const formatBoldText = (text) => {
//     if (!text) return null;

//     // Process bold text within content
//     const parts = text.split(/(\*\*[^*]+\*\*)/g);

//     return parts.map((part, index) => {
//       if (part.startsWith("**") && part.endsWith("**")) {
//         // Remove the ** markers and wrap content in a strong tag
//         const content = part.slice(2, -2);
//         return <strong key={index} className="font-bold">{content}</strong>;
//       }
//       return <span key={index}>{part}</span>;
//     });
//   };

//   // Show loading state while data is being fetched
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-xl">Loading course details...</p>
//       </div>
//     );
//   }

//   // Show error state if there was an error fetching data
//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen">
//         <p className="text-xl text-red-500">Error: {error}</p>
//         <button
//           className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
//           onClick={() => navigate("/view-courses")}
//         >
//           Go Back to Courses
//         </button>
//       </div>
//     );
//   }

//   // If courseData is null after loading is complete, show an error
//   if (!courseData) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen">
//         <p className="text-xl text-red-500">Course not found</p>
//         <button
//           className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
//           onClick={() => navigate("/view-courses")}
//         >
//           Go Back to Courses
//         </button>
//       </div>
//     );
//   }

//   // Check if there are any sub-images to display in the slider
//   const hasSliderImages = courseData.images && courseData.images.length > 0;

//   return (
//     <>
//       {/* Desktop View */}
//       <div className="hidden w-full mb-20 md:block">
//         <div className="relative md:w-full sm:w-[742px] h-[300px] md:h-[269px] sm:h-[269px]">
//           <div className="absolute inset-0">
//             <div className="absolute inset-0 bg-[#00000099] z-10" />
//             <img
//               src={about_bg}
//               alt="Courses Hero"
//               className="md:w-full sm:w-[740px] md:h-full sm:h-full object-cover"
//             />
//           </div>

//           <div className="relative z-20 h-full max-w-7xl mx-auto sm:px-0 md:px-0 md:ml-[70px] sm:ml-[40px]">
//             <div className="flex items-center h-full">
//               <h1 className="text-[50px] md:text-5xl lg:text-6xl font-[600] text-white">
//                 Courses
//               </h1>
//             </div>
//           </div>
//         </div>

//         {/* Content Container */}
//         <div className="max-w-4xl p-4 pt-20 mx-auto">
//           {/* Course and Date Section */}
//           <div className="flex items-start mb-6 space-x-4">
//             <div className="flex items-center space-x-5 mt-1.5">
//               <span className="font-semibold text-black">Course</span>
//               <span className="text-4xl font-light tracking-wider text-black">
//                 |
//               </span>
//             </div>

//             <div className="flex-1">
//               <div className="flex items-center justify-between mb-4">
//                 <span className="text-[#2D387D] text-sm font-semibold">
//                   {new Date(courseData.uploaded_date).toLocaleDateString("en-US", {
//                     year: "numeric",
//                     month: "long",
//                     day: "numeric",
//                   })}
//                 </span>
//                 <button
//                   className="text-sm font-semibold text-black-700 hover:underline"
//                   onClick={() => navigate("/view-courses")}
//                 >
//                   ← Go Back
//                 </button>
//               </div>

//               <h2 className="text-2xl font-semibold text-[#2D387D] mb-4">
//                 {courseData.title}
//               </h2>

//               {/* Main Image between title and description with fixed height */}
//               <div className="mb-6">
//                 <img
//                   src={courseData.main_image_url}
//                   alt={courseData.title}
//                   className="object-cover w-full rounded-lg h-96"
//                 />
//               </div>

//               {/* Course description with enhanced markdown support */}
//               <div className="text-[#2D387D] leading-relaxed">
//                 {renderFormattedDescription(courseData.description)}
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
//                     src={courseData.images[currentSlide]}
//                     alt={`Slide ${currentSlide + 1}`}
//                     className="w-full h-[500px] object-contain mx-auto"
//                   />

//                   {courseData.images.length > 1 && (
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
//               {courseData.sub_images && courseData.sub_images.length > 1 && (
//                 <div className="grid grid-cols-4 gap-4 mt-6">
//                   {courseData.sub_images.map((image, index) => (
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

//       {/* Mobile View - UPDATED WITH ENHANCED MARKDOWN FORMATTING */}
//       <div className="w-full md:hidden" style={{marginBottom:'120px'}}>
//         <div className="relative w-full h-[169px]">
//           <div className="absolute inset-0">
//             <div className="absolute inset-0 bg-[#00000099] z-10" />
//             <img
//               src={about_bg_m}
//               alt="Courses Hero"
//               className="object-cover w-full h-full"
//             />
//           </div>

//           <div className="relative z-20 h-full">
//             <div className="flex items-center justify-center h-full px-4">
//               <h1 className="text-[30px] font-[600] text-white">
//                 Courses
//               </h1>
//             </div>
//           </div>
//         </div>

//         {/* Content Container */}
//         <div className="w-full">
//           {/* Course label - centered */}
//           <div className="flex items-center mt-4 ml-4 justify-left">
//             <span className="font-semibold text-black">Course</span>
//             <span className="ml-2 text-4xl font-light tracking-wider text-black">
//               |
//             </span>
//           </div>

//           {/* Content Area - centered layout */}
//           <div className="px-4 mt-6">
//             <div className="flex items-center justify-between mb-4">
//               <span className="text-[#2543B1] text-sm font-semibold">
//                 {new Date(courseData.uploaded_date).toLocaleDateString("en-US", {
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                 })}
//               </span>
//               <button
//                 className="text-sm font-semibold text-black-700 hover:underline"
//                 onClick={() => navigate("/view-courses")}
//               >
//                 ← Go Back
//               </button>
//             </div>

//             {/* Centered title */}
//             <h2 className="text-[16px] font-semibold text-[#2543B1] mb-4 text-center">
//               {courseData.title}
//             </h2>

//             {/* Centered Main Image for mobile view */}
//             <div className="flex justify-center w-full mb-4">
//               <img
//                 src={courseData.main_image_url}
//                 alt={courseData.title}
//                 className="object-cover w-full h-64"
//               />
//             </div>

//             {/* Updated: Course description with enhanced markdown support */}
//             <div className="text-[#2D387D] text-[12px] leading-relaxed">
//               {renderFormattedDescription(courseData.description)}
//             </div>
//           </div>
//         </div>

//         {/* Only show slider section if there are sub-images */}
//         {hasSliderImages && (
//           <div className="w-full bg-[#E9ECF7] mb-44 mt-10">
//             <div className="w-full py-8 mx-auto">
//               <div className="relative -mb-8 overflow-hidden">
//                 {/* Fixed height container for the slide image on mobile */}
//                 <div className="relative w-full h-[250px]">
//                   <img
//                     src={courseData.images[currentSlide]}
//                     alt={`Slide ${currentSlide + 1}`}
//                     className="w-full h-[250px] object-contain mx-auto"
//                   />

//                   {/* Add navigation arrows for mobile view */}
//                   {courseData.images.length > 1 && (
//                     <>
//                       <button
//                         onClick={prevSlide}
//                         className="absolute left-0 flex items-center justify-center w-10 h-10 transition-colors -translate-y-1/2 top-1/2"
//                       >
//                         <svg
//                           width="24"
//                           height="24"
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
//                         className="absolute right-0 flex items-center justify-center w-10 h-10 transition-colors -translate-y-1/2 top-1/2"
//                       >
//                         <svg
//                           width="24"
//                           height="24"
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

//               {/* Dot Indicators - Only show if there are multiple images */}
//               {courseData.images.length > 1 && (
//                 <div className="flex justify-center gap-2 mt-6">
//                   {courseData.images.map((_, index) => (
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

// export default CourseDetails;

/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import about_bg from "../assets/CPD_courses_n.svg";
import about_bg_m from "../assets/Aboutus_m_bg.svg";
// import about_bg from "../assets/Abouthero_bg.svg";
// import about_bg_m from "../assets/Aboutus_m_bg.svg";
import { useNavigate, useParams } from "react-router-dom";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const CourseDetails = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    // Fetch course details from API
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(
          `http://72.60.42.161/api/events-courses/course/${courseId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch course details");
        }
        const data = await response.json();

        // Transform API data to match component structure but exclude main image from the slider
        const formattedData = {
          ...data,
          // Only include sub_images in the slider, not the main image
          images: [...data.sub_images],
        };

        setCourseData(formattedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);

  const nextSlide = () => {
    if (!courseData || !courseData.images) return;
    setCurrentSlide((prev) =>
      prev === courseData.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    if (!courseData || !courseData.images) return;
    setCurrentSlide((prev) =>
      prev === 0 ? courseData.images.length - 1 : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Enhanced function to render formatted description with headings, bold text, lists, and preserved spacing
  const renderFormattedDescription = (text) => {
    if (!text) return null;

    // Split the text into paragraphs first (preserving line breaks)
    const paragraphs = text.split("\n");

    // Track if we're inside a list
    let inNumberedList = false;
    let inBulletList = false;
    let listItems = [];
    const result = [];

    // Process each paragraph
    for (let i = 0; i < paragraphs.length; i++) {
      const paragraph = paragraphs[i];
      const trimmedParagraph = paragraph.trim();

      // Check if the line is a numbered list item (starts with a number followed by a period or dot)
      const isNumberedListItem = /^\d+\.\s.+/.test(trimmedParagraph);

      // Check if the line is a bullet list item (starts with - or •)
      const isBulletListItem = /^[-•]\s.+/.test(trimmedParagraph);

      // Handle headings
      if (trimmedParagraph.startsWith("# ")) {
        // If we were in a list, end it
        if (inNumberedList || inBulletList) {
          if (inNumberedList) {
            result.push(
              <ol
                key={`list-${result.length}`}
                className="mb-4 ml-5 list-decimal"
              >
                {listItems}
              </ol>
            );
          } else {
            result.push(
              <ul key={`list-${result.length}`} className="mb-4 ml-5 list-disc">
                {listItems}
              </ul>
            );
          }
          inNumberedList = false;
          inBulletList = false;
          listItems = [];
        }

        const headingText = trimmedParagraph.substring(2);
        result.push(
          <h1
            key={`heading-${result.length}`}
            className="text-2xl font-bold text-[#2D387D] mt-4 mb-2"
          >
            {formatBoldText(headingText)}
          </h1>
        );
      }
      // Handle secondary headings
      else if (trimmedParagraph.startsWith("## ")) {
        // If we were in a list, end it
        if (inNumberedList || inBulletList) {
          if (inNumberedList) {
            result.push(
              <ol
                key={`list-${result.length}`}
                className="mb-4 ml-5 list-decimal"
              >
                {listItems}
              </ol>
            );
          } else {
            result.push(
              <ul key={`list-${result.length}`} className="mb-4 ml-5 list-disc">
                {listItems}
              </ul>
            );
          }
          inNumberedList = false;
          inBulletList = false;
          listItems = [];
        }

        const headingText = trimmedParagraph.substring(3);
        result.push(
          <h2
            key={`heading-${result.length}`}
            className="text-xl font-bold text-[#2D387D] mt-4 mb-2"
          >
            {formatBoldText(headingText)}
          </h2>
        );
      }
      // Handle numbered list items
      else if (isNumberedListItem) {
        // If we're transitioning from a bullet list to a numbered list, end the bullet list
        if (inBulletList) {
          result.push(
            <ul key={`list-${result.length}`} className="mb-4 ml-5 list-disc">
              {listItems}
            </ul>
          );
          listItems = [];
          inBulletList = false;
        }

        inNumberedList = true;
        // Extract the list item content (remove the number and dot)
        const listItemContent = trimmedParagraph.replace(/^\d+\.\s/, "");
        listItems.push(
          <li key={`li-${listItems.length}`}>
            {formatBoldText(listItemContent)}
          </li>
        );

        // If this is the last paragraph or the next paragraph is not a list item, end the list
        if (
          i === paragraphs.length - 1 ||
          !/^\d+\.\s.+/.test(paragraphs[i + 1]?.trim() || "")
        ) {
          result.push(
            <ol
              key={`list-${result.length}`}
              className="mb-4 ml-5 list-decimal"
            >
              {listItems}
            </ol>
          );
          inNumberedList = false;
          listItems = [];
        }
      }
      // Handle bullet list items
      else if (isBulletListItem) {
        // If we're transitioning from a numbered list to a bullet list, end the numbered list
        if (inNumberedList) {
          result.push(
            <ol
              key={`list-${result.length}`}
              className="mb-4 ml-5 list-decimal"
            >
              {listItems}
            </ol>
          );
          listItems = [];
          inNumberedList = false;
        }

        inBulletList = true;
        // Extract the list item content (remove the bullet)
        const listItemContent = trimmedParagraph.replace(/^[-•]\s/, "");
        listItems.push(
          <li key={`li-${listItems.length}`}>
            {formatBoldText(listItemContent)}
          </li>
        );

        // If this is the last paragraph or the next paragraph is not a list item, end the list
        if (
          i === paragraphs.length - 1 ||
          !/^[-•]\s.+/.test(paragraphs[i + 1]?.trim() || "")
        ) {
          result.push(
            <ul key={`list-${result.length}`} className="mb-4 ml-5 list-disc">
              {listItems}
            </ul>
          );
          inBulletList = false;
          listItems = [];
        }
      }
      // Handle empty lines
      else if (trimmedParagraph === "") {
        // Only add spacer if we're not in a list
        if (!inNumberedList && !inBulletList) {
          result.push(
            <div key={`spacer-${result.length}`} className="h-4"></div>
          );
        }
      }
      // Handle normal paragraphs
      else {
        // If we were in a list, end it
        if (inNumberedList) {
          result.push(
            <ol
              key={`list-${result.length}`}
              className="mb-4 ml-5 list-decimal"
            >
              {listItems}
            </ol>
          );
          inNumberedList = false;
          listItems = [];
        } else if (inBulletList) {
          result.push(
            <ul key={`list-${result.length}`} className="mb-4 ml-5 list-disc">
              {listItems}
            </ul>
          );
          inBulletList = false;
          listItems = [];
        }

        result.push(
          <p key={`p-${result.length}`} className="mb-2">
            {formatBoldText(trimmedParagraph)}
          </p>
        );
      }
    }

    return result;
  };

  // Helper function to format bold text
  const formatBoldText = (text) => {
    if (!text) return null;

    // Process bold text within content
    const parts = text.split(/(\*\*[^*]+\*\*)/g);

    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        // Remove the ** markers and wrap content in a strong tag
        const content = part.slice(2, -2);
        return (
          <strong key={index} className="font-bold">
            {content}
          </strong>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  // Show loading state while data is being fetched
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">Loading course details...</p>
      </div>
    );
  }

  // Show error state if there was an error fetching data
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl text-red-500">Error: {error}</p>
        <button
          className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
          onClick={() => navigate("/view-courses")}
        >
          Go Back to Courses
        </button>
      </div>
    );
  }

  // If courseData is null after loading is complete, show an error
  if (!courseData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl text-red-500">Course not found</p>
        <button
          className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
          onClick={() => navigate("/view-courses")}
        >
          Go Back to Courses
        </button>
      </div>
    );
  }

  // Check if there are any sub-images to display in the slider
  const hasSliderImages = courseData.images && courseData.images.length > 0;

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
      <div className="hidden w-full mb-20 md:block">
        <motion.div
          // initial={{ opacity: 0 }}
          // animate={{ opacity: 1 }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={containerVariants}
          className="relative md:w-full sm:w-[742px] h-[300px] md:h-[269px] sm:h-[269px]"
        >
          {/* Hero Section */}
          <motion.div className="absolute inset-0" variants={bgVariants}>
            <div className="absolute inset-0 bg-[#1b1a1a99] z-10" />
            <motion.img
              src={about_bg}
              alt="Courses Hero"
              className="md:w-full sm:w-[740px] md:h-full sm:h-full object-cover object-[-0%,16%]"
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </motion.div>

          <div className="relative z-20 h-full max-w-7xl mx-auto sm:px-0 md:px-0 md:ml-[70px] sm:ml-[40px]">
            <div className="flex items-center h-full">
              <motion.h1
                // initial="hidden"
                // animate="visible"
                // variants={fadeInUp}
                variants={textVariants}
                className="text-[50px] md:text-5xl lg:text-6xl font-[600] text-white"
              >
                Courses
              </motion.h1>
            </div>
          </div>
        </motion.div>

        {/* Content Container */}
        <div className="max-w-4xl p-4 pt-20 mx-auto">
          <div className="flex items-start mb-6 space-x-4">
            <div className="flex items-center space-x-5 mt-1.5">
              <span className="font-semibold text-black">Course</span>
              <span className="text-4xl font-light tracking-wider text-black">
                |
              </span>
            </div>

            <div className="flex-1">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-100px" }}
                variants={fadeInUp}
                className="flex items-center justify-between mb-4"
              >
                {/* Date and Back Button */}
                <span className="text-[#2543B1] text-sm font-semibold">
                  {new Date(courseData.uploaded_date).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </span>
                <button
                  className="text-sm font-semibold text-black-700 hover:underline"
                  onClick={() => navigate("/view-courses")}
                >
                  ← Go Back
                </button>
              </motion.div>

              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                variants={fadeInUp}
                className="text-2xl font-semibold text-[#2D387D] mb-4"
              >
                {courseData.title}
              </motion.h2>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                variants={scaleUp}
                className="mb-6"
              >
                <img
                  src={courseData.main_image_url}
                  alt={courseData.title}
                  className="object-cover w-full rounded-lg h-96"
                />
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                variants={fadeInUp}
                className="text-[#2D387D] leading-relaxed"
              >
                {renderFormattedDescription(courseData.description)}
              </motion.div>
            </div>
          </div>
        </div>

        {hasSliderImages && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={fadeInUp}
            className="w-full bg-[#E9ECF7]"
          >
            {/* Slider Content */}
            <div className="max-w-4xl pt-20 pb-40 mx-auto mt-10">
              <div className="relative -mb-6 overflow-hidden">
                {/* Fixed height container for the slide image */}
                <div className="relative w-full h-[500px] mb-4">
                  <img
                    src={courseData.images[currentSlide]}
                    alt={`Slide ${currentSlide + 1}`}
                    className="w-full h-[500px] object-contain mx-auto"
                  />

                  {courseData.images.length > 1 && (
                    <>
                      <button
                        onClick={prevSlide}
                        className="absolute flex items-center justify-center w-20 h-20 transition-colors -translate-y-1/2 left-4 top-1/2"
                      >
                        <svg
                          width="72"
                          height="72"
                          fill="none"
                          stroke="white"
                          strokeWidth="1"
                          viewBox="0 0 24 24"
                        >
                          <path d="M15 18l-6-6 6-6" />
                        </svg>
                      </button>
                      <button
                        onClick={nextSlide}
                        className="absolute flex items-center justify-center w-20 h-20 transition-colors -translate-y-1/2 right-4 top-1/2"
                      >
                        <svg
                          width="72"
                          height="72"
                          fill="none"
                          stroke="white"
                          strokeWidth="1"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 6l6 6-6 6" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Thumbnail Images - Only show if there are additional images */}
              {courseData.sub_images && courseData.sub_images.length > 1 && (
                <div className="grid grid-cols-4 gap-4 mt-6">
                  {courseData.sub_images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`relative overflow-hidden aspect-w-16 aspect-h-9 ${
                        currentSlide === index ? "ring-2 ring-blue-500" : ""
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Mobile View */}
      <div className="w-full md:hidden" style={{ marginBottom: "120px" }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative w-full h-[169px]"
        >
          {/* Mobile Hero Section */}

          <motion.div className="absolute inset-0" variants={bgVariants}>
            <div className="absolute inset-0 bg-[#1b1a1a99] z-10" />
            <motion.img
              src={about_bg}
              alt="Courses Hero"
              className="md:w-full sm:w-[740px] md:h-full sm:h-full object-cover object-[-0%,16%]"
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </motion.div>

          <div className="relative z-20 h-full max-w-7xl mx-auto sm:px-0 md:px-0 md:ml-[70px] sm:ml-[40px]">
            <div className="flex items-center h-full">
              <motion.h1
                // initial="hidden"
                // animate="visible"
                // variants={fadeInUp}
                variants={textVariants}
                className="text-[50px] md:text-5xl lg:text-6xl font-[600] text-white"
              >
                Courses
              </motion.h1>
            </div>
          </div>
        </motion.div>

        <div className="w-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={fadeInUp}
            className="flex items-center mt-4 ml-4 justify-left"
          >
            {/* Course Label */}
            <span className="font-semibold text-black">Course</span>
            <span className="text-4xl font-light tracking-wider text-black">
              |
            </span>
          </motion.div>

          <div className="px-4 mt-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              variants={fadeInUp}
              className="flex items-center justify-between mb-4"
            >
              {/* Date and Back Button */}
              <span className="text-[#2543B1] text-sm font-semibold">
                {new Date(courseData.uploaded_date).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </span>
              <button
                className="text-sm font-semibold text-black-700 hover:underline"
                onClick={() => navigate("/view-courses")}
              >
                ← Go Back
              </button>
            </motion.div>

            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              variants={fadeInUp}
              className="text-[16px] font-semibold text-[#2543B1] mb-4 text-center"
            >
              {courseData.title}
            </motion.h2>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              variants={scaleUp}
              className="flex justify-center w-full mb-4"
            >
              {/* Mobile Image */}
              <img
                src={courseData.main_image_url}
                alt={courseData.title}
                className="object-cover w-full rounded-lg h-96"
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              variants={fadeInUp}
              className="text-[#2D387D] text-[12px] leading-relaxed"
            >
              {renderFormattedDescription(courseData.description)}
            </motion.div>
          </div>
        </div>

        {hasSliderImages && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={fadeInUp}
            className="w-full bg-[#E9ECF7] mb-44 mt-10"
          >
            {/* Mobile Slider */}
            <div className="w-full py-8 mx-auto">
              <div className="relative -mb-8 overflow-hidden">
                {/* Fixed height container for the slide image on mobile */}
                <div className="relative w-full h-[250px]">
                  <img
                    src={courseData.images[currentSlide]}
                    alt={`Slide ${currentSlide + 1}`}
                    className="w-full h-[250px] object-contain mx-auto"
                  />

                  {/* Add navigation arrows for mobile view */}
                  {courseData.images.length > 1 && (
                    <>
                      <button
                        onClick={prevSlide}
                        className="absolute left-0 flex items-center justify-center w-10 h-10 transition-colors -translate-y-1/2 top-1/2"
                      >
                        <svg
                          width="24"
                          height="24"
                          fill="none"
                          stroke="white"
                          strokeWidth="1"
                          viewBox="0 0 24 24"
                        >
                          <path d="M15 18l-6-6 6-6" />
                        </svg>
                      </button>
                      <button
                        onClick={nextSlide}
                        className="absolute right-0 flex items-center justify-center w-10 h-10 transition-colors -translate-y-1/2 top-1/2"
                      >
                        <svg
                          width="24"
                          height="24"
                          fill="none"
                          stroke="white"
                          strokeWidth="1"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 6l6 6-6 6" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Dot Indicators - Only show if there are multiple images */}
              {courseData.images.length > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  {courseData.images.map((_, index) => (
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
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default CourseDetails;
