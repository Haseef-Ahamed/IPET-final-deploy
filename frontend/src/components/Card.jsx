/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Card = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0); // For mobile carousel
  const [currentPage, setCurrentPage] = useState(1); // For desktop pagination
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const touchRef = useRef(null);
  const itemsPerPage = 3; // Match the current limit of 3 events

  // UseInView for scroll animations
  const [headerRef, headerInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [cardsRef, cardsInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [buttonRef, buttonInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://72.60.42.161/api/events-courses/event");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        const sortedEvents = data.sort((a, b) => {
          return new Date(b.uploaded_date) - new Date(a.uploaded_date);
        });
        console.log("Fetched events:", sortedEvents); // Debug
        setEvents(sortedEvents);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Auto slide for mobile carousel
  useEffect(() => {
    if (events.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [events.length]);

  // Handle touch events for swiping
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchEndX(null);
    e.preventDefault(); // Prevent scrolling during swipe
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

  // Pagination logic for desktop
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEvents = events.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(events.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleCardClick = (event) => {
    const eventId = event._id || event.id;
    if (eventId) {
      navigate(`/events/${eventId}`);
    } else {
      console.error("Event ID is undefined:", event);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    hover: { scale: 1.05, boxShadow: "0px 5px 15px rgba(45, 56, 125, 0.3)" },
    tap: { scale: 0.98 },
  };

  const dotVariants = {
    inactive: { scale: 1, opacity: 0.5 },
    active: { scale: 1.5, opacity: 1, transition: { duration: 0.3 } },
    hover: { scale: 1.8, opacity: 0.8 },
    tap: { scale: 0.9 },
  };

  const loadingVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
  };

  const loadingCircleVariants = {
    animate: {
      rotate: 360,
      transition: { repeat: Infinity, duration: 1.5, ease: "linear" },
    },
  };

  return (
    <>
      {/* Desktop View */}
      <div className="hidden min-h-screen px-5 bg-gray-50 lg:block" style={{ backgroundColor: '#f9fafb' }}>
        <motion.div
          className="min-w-full mx-auto max-w-7xl py-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            className="mb-12 text-center"
            ref={headerRef}
            variants={containerVariants}
          >
            <motion.h2
              className="text-[20px] font-[400] text-black"
              variants={textVariants}
              style={{ color: '#2314acff' }}
            >
              News and Events
            </motion.h2>
            <motion.h1
              className="text-[30px] font-[600] text-black mt-2"
              variants={textVariants}
              style={{ color: '#0d064bff' }}
            >
              New Research and Innovation
            </motion.h1>
          </motion.div>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                className="flex flex-col items-center justify-center py-8 text-center"
                key="loading"
                variants={loadingVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <motion.div
                  className="w-16 h-16 border-4 border-t-[#2543B1] border-r-[#2543B1] border-b-transparent border-l-transparent rounded-full"
                  variants={loadingCircleVariants}
                  animate="animate"
                />
                <motion.p
                  className="mt-4 font-medium"
                  variants={textVariants}
                  style={{ color: '#2543B1' }}
                >
                  Loading events...
                </motion.p>
              </motion.div>
            ) : error ? (
              <motion.div
                className="py-8 text-center"
                key="error"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                style={{ color: '#dc2626' }}
              >
                <motion.div
                  className="mb-4 text-5xl"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  ⚠️
                </motion.div>
                {error}
              </motion.div>
            ) : (
              <motion.div
                className="max-w-[1360px] mx-auto grid grid-cols-3 gap-10 mb-12"
                ref={cardsRef}
                initial="hidden"
                animate={cardsInView ? "visible" : "hidden"}
                variants={containerVariants}
              >
                {currentEvents.map((event, index) => (
                  <motion.div
                    key={event._id || event.id}
                    className="bg-[#E9ECF7] shadow-lg p-[35px] w-[432px] h-[480px] overflow-hidden cursor-pointer rounded-lg"
                    onClick={() => handleCardClick(event)}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && handleCardClick(event)}
                  >
                    <motion.div
                      className="h-[304px] mb-4 overflow-hidden rounded-md"
                      variants={imageVariants}
                    >
                      <motion.img
                        src={event.main_image_url}
                        alt={event.title}
                        className="w-[362px] h-[304px] object-cover"
                        variants={imageVariants}
                        whileHover="hover"
                      />
                    </motion.div>
                    <motion.div className="pt-2" variants={textVariants}>
                      <motion.p
                        className="text-sm font-semibold mb-1"
                        variants={textVariants}
                        style={{ color: '#2543B1' }}
                      >
                        {formatDate(event.uploaded_date)}
                      </motion.p>
                      <motion.h3
                        className="text-[14px] font-semibold line-clamp-2 mb-2"
                        variants={textVariants}
                        style={{ color: '#2D387D' }}
                      >
                        {event.title}
                      </motion.h3>
                      <motion.button
                        onClick={() => handleCardClick(event)}
                        className="bg-[#0000FF] hover:bg-blue-500 text-white px-4 py-1 rounded-md text-[14px] font-[600] transition-colors"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        View
                      </motion.button>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="text-center mt-8 h-[44px]"
            ref={buttonRef}
            variants={containerVariants}
          >
            <motion.button
              onClick={() => navigate("/view-events")}
              className="bg-[#2D387D] text-white px-8 py-4 rounded-md text-[14px] font-[500] transition-colors"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              More Events
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile View */}
      <div className="min-h-[255px] bg-gray-50 px-2 lg:hidden" style={{ backgroundColor: '#f9fafb' }}>
        <motion.div
          className="max-w-full min-w-full mx-auto py-8"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div className="mb-8 text-center" ref={headerRef} variants={containerVariants}>
            <motion.h2 className="text-[14px] font-[400]" variants={textVariants} style={{ color: '#000000' }}>
              News and Events
            </motion.h2>
            <motion.h1 className="text-[14px] font-[600] mt-2" variants={textVariants} style={{ color: '#000000' }}>
              New Research and Innovation
            </motion.h1>
          </motion.div>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                className="flex items-center justify-center py-4 text-center"
                key="loading-mobile"
                variants={loadingVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <motion.div
                  className="w-10 h-10 border-3 border-t-[#2543B1] border-r-[#2543B1] border-b-transparent border-l-transparent rounded-full"
                  variants={loadingCircleVariants}
                  animate="animate"
                />
              </motion.div>
            ) : error ? (
              <motion.div
                className="py-4 text-center"
                key="error-mobile"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{ color: '#dc2626' }}
              >
                {error}
              </motion.div>
            ) : (
              <div
                className="relative overflow-hidden w-full"
                ref={touchRef}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <motion.div
                  className="flex w-full transition-transform duration-500 ease-in-out"
                  animate={{ x: `-${currentIndex * 100}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {events.map((event, index) => (
                    <motion.div
                      key={event._id || event.id}
                      className="flex-shrink-0 w-full px-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && handleCardClick(event)}
                    >
                      <motion.div
                        className="bg-[#E9ECF7] shadow-lg p-[15px] w-full rounded-lg overflow-hidden"
                        onClick={() => handleCardClick(event)}
                        variants={cardVariants}
                      >
                        <motion.div className="mb-2 overflow-hidden rounded-md" variants={imageVariants}>
                          <motion.img
                            src={event.main_image_url}
                            alt={event.title}
                            className="w-full h-[160px] object-cover"
                            variants={imageVariants}
                            whileHover="hover"
                          />
                        </motion.div>
                        <motion.div className="pt-2" variants={textVariants}>
                          <motion.p className="text-xs font-semibold mb-1" style={{ color: '#2543B1' }}>
                            {formatDate(event.uploaded_date)}
                          </motion.p>
                          <motion.h3 className="text-xs font-semibold line-clamp-2 mb-2" style={{ color: '#2D387D' }}>
                            {event.title}
                          </motion.h3>
                          <motion.button
                            onClick={() => handleCardClick(event)}
                            className="bg-[#0000FF] hover:bg-blue-500 text-white px-4 py-1 rounded-md text-xs font-[600] transition-colors w-full"
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                          >
                            View
                          </motion.button>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Dots */}
                <motion.div className="flex justify-center gap-2 mt-5">
                  {events.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentIndex === index ? "bg-[#2D387D80] w-3 h-3" : "bg-[#2D387D33]"
                      }`}
                      variants={dotVariants}
                      animate={currentIndex === index ? "active" : "inactive"}
                      whileHover="hover"
                      whileTap="tap"
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* More Events Button */}
          <motion.div
            className="text-center mt-8 h-[38px]"
            ref={buttonRef}
            initial="hidden"
            animate={buttonInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.button
              onClick={() => navigate("/view-events")}
              className="bg-[#2D387D] text-white w-full max-w-[380px] px-[6px] py-[15px] rounded-[5px] text-xs font-[500] transition-colors"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              More Events
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default Card;