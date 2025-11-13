 
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";

const AnnouncementBanner = () => {
  const [mostRecentEvent, setMostRecentEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMostRecentEvent = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://72.60.42.161/api/events-courses/event"
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        
        const data = await response.json();
        
        // Sort events by uploaded_date in descending order
        const sortedEvents = data.sort((a, b) => {
          return new Date(b.uploaded_date) - new Date(a.uploaded_date);
        });
        
        // Take the most recent event
        const recentEvent = sortedEvents[0];
        setMostRecentEvent(recentEvent);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMostRecentEvent();
  }, []);

  // Function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Render loading or error states
  if (loading) return null;
  if (error) return null;
  if (!mostRecentEvent) return null;

  const announcementText = `${mostRecentEvent.title} is held on ${formatDate(mostRecentEvent.uploaded_date)}`;

  return (
    <>
    <div className="hidden md:block">
      <div className="relative flex overflow-hidden bg-black ">
        <div className="py-2 animate-marquee whitespace-nowrap">
          {[...Array(8)].map((_, index) => (
            <span key={index} className="mx-16 text-sm font-medium text-white">
              {announcementText}
            </span>
          ))}
        </div>
      </div>
      <div className="relative flex overflow-hidden h-[29px] bg-black md:hidden">
        <div className="py-0 animate-marquee whitespace-nowrap">
          {[...Array(8)].map((_, index) => (
            <span key={index} className="mx-4 text-white text-[7px] font-medium">
              {announcementText}
            </span>
          ))}
        </div>
      </div>
      </div>
    </>
  );
};

export default AnnouncementBanner;

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const AnnouncementBanner = () => {
//   const [mostRecentEvent, setMostRecentEvent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isVisible, setIsVisible] = useState(true);

//   useEffect(() => {
//     const fetchMostRecentEvent = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(
//           "http://72.60.42.161/api/events-courses/event"
//         );
        
//         if (!response.ok) {
//           throw new Error("Failed to fetch events");
//         }
        
//         const data = await response.json();
        
//         const sortedEvents = data.sort((a, b) => {
//           return new Date(b.uploaded_date) - new Date(a.uploaded_date);
//         });
        
//         const recentEvent = sortedEvents[0];
//         setMostRecentEvent(recentEvent);
//         setLoading(false);
//       } catch (err) {
//         console.error("Fetch error:", err);
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchMostRecentEvent();
//   }, []);

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   // Animation variants
//   const bannerVariants = {
//     hidden: { opacity: 0, y: -20 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { duration: 0.5, ease: "easeOut" }
//     },
//     exit: { 
//       opacity: 0, 
//       y: -20,
//       transition: { duration: 0.3, ease: "easeIn" }
//     }
//   };

//   const marqueeItemVariants = {
//     hidden: { opacity: 0, x: 20 },
//     visible: (i) => ({
//       opacity: 1,
//       x: 0,
//       transition: {
//         delay: i * 0.1,
//         duration: 0.5
//       }
//     })
//   };

//   if (loading) return null;
//   if (error) return null;
//   if (!mostRecentEvent) return null;

//   const announcementText = `${mostRecentEvent.title} is held on ${formatDate(mostRecentEvent.uploaded_date)}`;

//   return (
//     <AnimatePresence>
//       {isVisible && (
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           exit="exit"
//           variants={bannerVariants}
//           className="relative"
//         >
//           {/* Desktop View */}
//           <div className="hidden md:block">
//             <motion.div 
//               className="relative flex overflow-hidden bg-black"
//               whileHover={{ scale: 1.01 }}
//               transition={{ duration: 0.2 }}
//             >
//               <motion.div 
//                 className="py-2 animate-marquee whitespace-nowrap"
//                 initial="hidden"
//                 animate="visible"
//               >
//                 {[...Array(8)].map((_, index) => (
//                   <motion.span 
//                     key={index}
//                     custom={index}
//                     variants={marqueeItemVariants}
//                     className="mx-16 text-sm font-medium text-white"
//                   >
//                     {announcementText}
//                   </motion.span>
//                 ))}
//               </motion.div>
//             </motion.div>
//           </div>

//           {/* Mobile View */}
//           <div className="hidden">
//             <motion.div 
//               className="relative flex overflow-hidden h-[29px] bg-black"
//               whileTap={{ scale: 0.98 }}
//             >
//               <motion.div 
//                 className="py-0 animate-marquee whitespace-nowrap"
//                 initial="hidden"
//                 animate="visible"
//               >
//                 {[...Array(8)].map((_, index) => (
//                   <motion.span 
//                     key={index}
//                     custom={index}
//                     variants={marqueeItemVariants}
//                     className="mx-4 text-white text-[7px] font-medium"
//                   >
//                     {announcementText}
//                   </motion.span>
//                 ))}
//               </motion.div>
//             </motion.div>
//           </div>

//           {/* Close Button */}
//           <motion.button
//             onClick={() => setIsVisible(false)}
//             className="absolute p-1 text-xs text-white -translate-y-1/2 right-2 top-1/2"
//             whileHover={{ scale: 1.2 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             ×
//           </motion.button>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default AnnouncementBanner;