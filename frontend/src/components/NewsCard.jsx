import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const EventCards = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const touchRef = useRef(null);

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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://72.60.42.161/api/events-courses/event");
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        console.log("Fetched events:", data); // Debug
        setEvents(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle touch events for swiping
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchEndX(null);
    // Prevent scrolling during swipe
    e.preventDefault();
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const deltaX = touchStartX - touchEndX;
      const swipeThreshold = 50; // Minimum pixels to consider a swipe
      if (deltaX > swipeThreshold) {
        // Swipe left: go to next
        setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
      } else if (deltaX < -swipeThreshold) {
        // Swipe right: go to previous
        setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading events...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">Error: {error}</div>;
  }

  if (events.length === 0) {
    return <div className="flex items-center justify-center min-h-screen text-gray-600">No events available.</div>;
  }

  return (
    <>
      {/* Desktop View */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px 0px -100px 0px" }}
        variants={containerVariants}
        className="hidden min-h-screen px-16 mb-20 -mb-10 bg-white py-28 sm:px-10 md:px-20 md:block"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {events.map((event) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="bg-[#E9ECF7] shadow-lg p-[35px] overflow-hidden cursor-pointer"
                  onClick={() => handleEventClick(event.id)}
                >
                  <motion.img
                    src={event.main_image_url}
                    alt={event.title}
                    className="w-full h-[304px] object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <h3 className="mt-4 font-semibold text-[#2543B1]">{event.title}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile View */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-50px 0px -50px 0px" }}
        variants={containerVariants}
        className="min-h-[255px] bg-gray-50 py-12 px-2 sm:px-10 md:px-20 md:hidden"
      >
        <div className="max-w-full mx-auto">
          <motion.div variants={itemVariants} className="mb-8 text-center">
            <h2 className="text-[14px] font-[400] text-[#000000]">Events</h2>
            <h1 className="text-[14px] font-[600] text-[#2543B1] mt-2">Latest Events</h1>
          </motion.div>

          <div className="max-w-full px-5 mx-auto mb-20">
            <motion.div variants={itemVariants} className="relative">
              <div
                className="overflow-hidden"
                ref={touchRef}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <motion.div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                  animate={{ x: `-${currentIndex * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center justify-between flex-shrink-0 w-full"
                    >
                      <div
                        className="bg-[#E9ECF7] shadow-lg p-[15px] w-full h-[250px] overflow-hidden"
                        onClick={() => handleEventClick(event.id)}
                      >
                        <img
                          src={event.main_image_url}
                          alt={event.title}
                          className="w-full h-[180px] object-cover"
                        />
                        <h3 className="mt-4 font-semibold text-[#2543B1] text-[14px]">{event.title}</h3>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              <motion.div variants={itemVariants} className="flex justify-center gap-2 mt-5">
                {events.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentIndex === index ? "bg-[#2D387D80] w-3" : "bg-[#2D387D33]"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default EventCards;