/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Card = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mobile carousel
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(null);

  // Desktop pagination (6 per page)
  const [currentPage, setCurrentPage] = useState(1);
  const EVENTS_PER_PAGE = 6;

  // Intersection observers
  const [headerRef, headerInView] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [gridRef, gridInView] = useInView({ triggerOnce: false, threshold: 0.1 });

  /* ==================== Fetch Events ==================== */
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/events-courses/event");
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();

        const sorted = data.sort(
          (a, b) => new Date(b.uploaded_date) - new Date(a.uploaded_date)
        );
        setEvents(sorted);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  /* ==================== Mobile Auto-slide ==================== */
  useEffect(() => {
    if (events.length > 1) {
      const id = setInterval(() => {
        setCurrentIndex((i) => (i + 1) % events.length);
      }, 5000);
      return () => clearInterval(id);
    }
  }, [events.length]);

  /* ==================== Touch Swipe (Mobile) ==================== */
  const handleTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    const threshold = 50;
    if (Math.abs(delta) > threshold) {
      setCurrentIndex((i) =>
        delta > 0
          ? (i + 1) % events.length
          : (i - 1 + events.length) % events.length
      );
    }
    touchStartX.current = null;
  };

  /* ==================== Pagination (Desktop) ==================== */
  const paginatedEvents = useMemo(() => {
    const start = (currentPage - 1) * EVENTS_PER_PAGE;
    return events.slice(start, start + EVENTS_PER_PAGE);
  }, [events, currentPage]);

  const totalPages = Math.ceil(events.length / EVENTS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEventClick = (eventId) => navigate(`/events/${eventId}`);

  /* ==================== Animation Variants ==================== */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <>
      {/* ====================== DESKTOP ====================== */}
      <div className="hidden lg:block min-h-screen bg-gray-50 py-12" style={{ backgroundColor: "#f9fafb" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-light" style={{ color: "#2314acff" }}>
              News and Events
            </h2>
            <h1 className="text-4xl font-semibold mt-2" style={{ color: "#0d064bff" }}>
              New Research and Innovation
            </h1>
          </motion.div>

          {/* Loading / Error / Content */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="load"
                className="flex flex-col items-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="w-16 h-16 border-4 border-t-[#2543B1] border-r-[#2543B1] border-b-transparent border-l-transparent rounded-full animate-spin" />
                <p className="mt-4 text-[#2543B1] font-medium">Loading events...</p>
              </motion.div>
            ) : error ? (
              <motion.p key="err" className="text-center text-red-600 py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {error}
              </motion.p>
            ) : (
              <>
                {/* Grid – 6 per page OR centered cards for 1-2 */}
                <motion.div
                  ref={gridRef}
                  variants={containerVariants}
                  initial="hidden"
                  animate={gridInView ? "visible" : "hidden"}
                  className={
                    paginatedEvents.length === 1 
                      ? "flex justify-center" 
                      : paginatedEvents.length === 2
                      ? "flex justify-center gap-8"
                      : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
                  }
                >
                  {paginatedEvents.map((event) => (
                    <motion.div
                      key={event._id || event.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.03, boxShadow: "0 10px 30px rgba(0,0,0,0.12)" }}
                      onClick={() => handleEventClick(event._id || event.id)}
                      className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer flex flex-col ${
                        paginatedEvents.length === 1 
                          ? "w-full max-w-md" 
                          : paginatedEvents.length === 2
                          ? "w-full max-w-sm"
                          : ""
                      }`}
                    >
                      <div className="h-64 overflow-hidden">
                        <motion.img
                          src={event.main_image_url}
                          alt={event.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.08 }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>

                      <div className="p-6 flex-1 flex flex-col items-center justify-center text-center gap-4">
                        <h3 className="text-lg font-semibold text-[#2D387D] line-clamp-3">
                          {event.title}
                        </h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEventClick(event._id || event.id);
                          }}
                          className="px-5 py-2 bg-[#0000FF] hover:bg-[#0000CC] text-white rounded-md text-sm font-medium transition-colors"
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
                    className="flex justify-center items-center gap-3 mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded ${
                        currentPage === 1
                          ? "bg-gray-200 text-gray-400"
                          : "bg-[#2D387D] text-white hover:bg-[#1e2655]"
                      }`}
                    >
                      Previous
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`w-10 h-10 rounded-full ${
                          currentPage === i + 1
                            ? "bg-[#2D387D] text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded ${
                        currentPage === totalPages
                          ? "bg-gray-200 text-gray-400"
                          : "bg-[#2D387D] text-white hover:bg-[#1e2655]"
                      }`}
                    >
                      Next
                    </button>
                  </motion.div>
                )}

                {/* More Events Button */}
                <div className="text-center mt-12">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/view-events")}
                    className="px-10 py-4 bg-[#2D387D] text-white rounded-md font-medium"
                  >
                    More Events
                  </motion.button>
                </div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ====================== MOBILE ====================== */}
      <div className="lg:hidden bg-gray-50" style={{ backgroundColor: "#f9fafb" }}>
        <div className="px-4 py-8">
          {/* Mobile Header */}
          <motion.div className="text-center mb-8">
            <h2 className="text-lg font-light" style={{ color: "#2314acff" }}>
              News and Events
            </h2>
            <h1 className="text-xl font-semibold mt-1" style={{ color: "#0d064bff" }}>
              New Research and Innovation
            </h1>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-t-[#2543B1] border-r-[#2543B1] border-b-transparent border-l-transparent rounded-full animate-spin" />
            </div>
          ) : error ? (
            <p className="text-center text-red-600 py-20">{error}</p>
          ) : (
            <div
              className="overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* === 1 CARD: PERFECTLY CENTERED === */}
              {events.length === 1 ? (
                <div className="flex justify-center px-2">
                  <div className="w-full max-w-sm mx-auto">
                    <EventCard event={events[0]} onClick={handleEventClick} />
                  </div>
                </div>
              ) : events.length === 2 ? (
                /* === 2 CARDS: CENTERED + BALANCED === */
                <div className="flex justify-center gap-4 px-2">
                  {events.map((event) => (
                    <div key={event._id} className="w-full max-w-[45%]">
                      <EventCard event={event} onClick={handleEventClick} />
                    </div>
                  ))}
                </div>
              ) : (
                /* === 3+ CARDS: SWIPE CAROUSEL === */
                <>
                  <motion.div
                    className="flex transition-transform duration-500 ease-in-out"
                    animate={{ x: `-${currentIndex * 100}%` }}
                  >
                    {events.map((event) => (
                      <div key={event._id || event.id} className="w-full flex-shrink-0 px-2">
                        <EventCard event={event} onClick={handleEventClick} />
                      </div>
                    ))}
                  </motion.div>

                  {/* Dots Indicator */}
                  <div className="flex justify-center gap-2 mt-6">
                    {events.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`transition-all duration-300 ${
                          currentIndex === i
                            ? "bg-[#2D387D] w-8 h-2 rounded-full"
                            : "bg-gray-400 w-2 h-2 rounded-full"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* More Events Button - Mobile */}
          <div className="text-center mt-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/view-events")}
              className="w-full max-w-sm mx-auto py-4 bg-[#2D387D] text-white rounded-md font-medium"
            >
              More Events
            </motion.button>
          </div>
        </div>
      </div>
    </>
  );
};

/* ==================== REUSABLE CARD COMPONENT ==================== */
const EventCard = ({ event, onClick }) => {
  const handleEventClick = () => onClick(event._id || event.id);

  return (
    <motion.div
      onClick={handleEventClick}
      className="bg-white rounded-xl shadow-md overflow-hidden"
      whileTap={{ scale: 0.98 }}
    >
      <div className="h-52">
        <img src={event.main_image_url} alt={event.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-5 text-center">
        <h3 className="text-base font-semibold text-[#2D387D] line-clamp-3 mb-4">
          {event.title}
        </h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEventClick();
          }}
          className="w-full py-2 bg-[#0000FF] hover:bg-[#0000CC] text-white rounded-md text-sm font-medium"
        >
          View More
        </button>
      </div>
    </motion.div>
  );
};

export default Card;