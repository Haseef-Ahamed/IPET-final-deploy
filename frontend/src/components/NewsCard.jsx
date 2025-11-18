import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const EventCards = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const EVENTS_PER_PAGE = 6;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, when: "beforeChildren" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 },
    },
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/events-courses/event");
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  /* ------------------- Pagination Logic ------------------- */
  const paginatedEvents = useMemo(() => {
    const start = (currentPage - 1) * EVENTS_PER_PAGE;
    const end = start + EVENTS_PER_PAGE;
    return events.slice(start, end);
  }, [events, currentPage]);

  const totalPages = Math.ceil(events.length / EVENTS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen text-[#2D387D]">Loading events...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-500">Error: {error}</div>;
  if (events.length === 0) return <div className="flex items-center justify-center min-h-screen text-gray-600">No events available.</div>;

  return (
    <motion.div
      className="py-12 mb-20 bg-gray-50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Events Grid – 6 per page */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 px-4 sm:px-0"
          variants={containerVariants}
        >
          {paginatedEvents.map((event, index) => (
            <motion.div
              key={event.id}
              variants={itemVariants}
              whileHover="hover"
              onClick={() => handleEventClick(event.id)}
              className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md cursor-pointer flex flex-col min-h-[380px]"
              custom={index}
            >
              {/* Image */}
              <motion.div
                className="w-full h-64 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={event.main_image_url}
                  alt={event.title}
                  className="object-cover w-full h-full"
                />
              </motion.div>

              {/* Title + Button */}
              <div className="p-5 flex-1 flex flex-col items-center justify-center gap-3">
                <h2 className="text-lg font-semibold text-[#2D387D] text-center line-clamp-3">
                  {event.title}
                </h2>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEventClick(event.id);
                  }}
                  className="px-4 py-1.5 text-sm font-medium text-white bg-[#0000FF] rounded hover:bg-[#0000CC] transition-colors"
                >
                  View More
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            className="flex justify-center items-center gap-2 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#2D387D] text-white hover:bg-[#1e2655]"
              }`}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${
                  currentPage === page
                    ? "bg-[#2D387D] text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#2D387D] text-white hover:bg-[#1e2655]"
              }`}
            >
              Next
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default EventCards;