/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; // Import useNavigate

// const ViewEvents = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate(); // Initialize useNavigate

//   // Fetch events from the backend
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await axios.get(
//           "http://72.60.42.161/api/events-courses/event"
//         );

//         if (response.data) {
//           setEvents(response.data);
//         } else {
//           setError("No events found.");
//         }
//       } catch (err) {
//         console.error("Error fetching events:", err);
//         setError("Failed to fetch events. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   // Handle card click to navigate to event details
//   const handleCardClick = (eventId) => {
//     navigate(`/events/${eventId}`); // Navigate to the event details page
//   };

//   return (
//     <div className="px-4 py-12 mb-20 bg-gray-50 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-7xl">
//         {/* Page Title */}
//         <h1 className="text-3xl font-bold text-[#2543B1] text-center mb-8">
//           IPET Events
//         </h1>

//         {/* Events Grid */}
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {events.map((event) => (
//             <div
//               key={event.id}
//               className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg" // Add cursor-pointer
//               onClick={() => handleCardClick(event.id)} // Add onClick handler
//             >
//               {/* Event Image */}
//               <div className="w-full h-48 overflow-hidden">
//                 <img
//                   src={event.main_image_url}
//                   alt={event.title}
//                   className="object-cover w-full h-full"
//                 />
//               </div>

//               {/* Event Title */}
//               <div className="p-4">
//                 <h2 className="text-lg font-semibold text-[#2D387D]">
//                   {event.title}
//                 </h2>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewEvents;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// const ViewEvents = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

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

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { duration: 0.5, ease: "easeOut" }
//     }
//   };

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await axios.get(
//           "http://72.60.42.161/api/events-courses/event"
//         );

//         if (response.data) {
//           setEvents(response.data);
//         } else {
//           setError("No events found.");
//         }
//       } catch (err) {
//         console.error("Error fetching events:", err);
//         setError("Failed to fetch events. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   const handleCardClick = (eventId) => {
//     navigate(`/events/${eventId}`);
//   };

//   if (loading) {
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="flex items-center justify-center min-h-screen"
//       >
//         Loading events...
//       </motion.div>
//     );
//   }

//   if (error) {
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="flex items-center justify-center min-h-screen text-red-500"
//       >
//         {error}
//       </motion.div>
//     );
//   }

//   return (
//     <motion.div
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//       className="px-4 py-12 mb-20 bg-gray-50 sm:px-6 lg:px-8"
//     >
//       <div className="mx-auto max-w-7xl">
//         {/* Page Title */}
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-3xl font-bold text-[#2543B1] text-center mb-8"
//         >
//           IPET Events
//         </motion.h1>

//         {/* Events Grid */}
//         <motion.div
//           variants={containerVariants}
//           className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
//         >
//           {events.map((event) => (
//             <motion.div
//               key={event.id}
//               variants={itemVariants}
//               whileHover={{ 
//                 scale: 1.05,
//                 boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
//               }}
//               transition={{ duration: 0.3 }}
//               className="overflow-hidden bg-white rounded-lg shadow-md cursor-pointer"
//               onClick={() => handleCardClick(event.id)}
//             >
//               {/* Event Image */}
//               <motion.div
//                 className="w-full h-48 overflow-hidden"
//                 whileHover={{ scale: 1.1 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <img
//                   src={event.main_image_url}
//                   alt={event.title}
//                   className="object-cover w-full h-full"
//                 />
//               </motion.div>

//               {/* Event Title */}
//               <div className="p-4">
//                 <h2 className="text-lg font-semibold text-[#2D387D]">
//                   {event.title}
//                 </h2>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default ViewEvents;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ViewEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://72.60.42.161/api/events-courses/event"
        );

        if (response.data) {
          setEvents(response.data);
        } else {
          setError("No events found.");
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to fetch events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleCardClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading events...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="px-4 py-12 mb-20 bg-gray-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold text-[#2543B1] text-center mb-8"
        >
          IPET Events
        </motion.h1>

        {/* Events Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden bg-white rounded-lg shadow-md cursor-pointer"
              onClick={() => handleCardClick(event.id)}
            >
              {/* Event Image */}
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={event.main_image_url}
                  alt={event.title}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Event Title */}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-[#2D387D]">
                  {event.title}
                </h2>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ViewEvents;