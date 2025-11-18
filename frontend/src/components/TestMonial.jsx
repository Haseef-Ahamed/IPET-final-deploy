import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import kamindaImage from "../assets/kaminda-manuraj.jpg";
import janithImage from "../assets/janith-dissanayake.jpg";
import wmdImage from "../assets/wm-wedasinghe.jpg";

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      text: "Marine engineering is about more than just ships – it's about creating sustainable and efficient marine transportation solutions. At IPET, we're constantly exploring new technologies to improve maritime operations and environmental performance.",
      name: "Kaminda Manuraj",
      role: "Marine Engineering Consultant",
      image: kamindaImage,
    },
    {
      id: 2,
      text: "In the intersection of textile technology and engineering, we're revolutionizing how design meets technical innovation. Our approach combines creative design with cutting-edge engineering principles to develop advanced textile solutions.",
      name: "Janith Dissanayake",
      role: "Textile and Fashion Design Engineer",
      image: janithImage,
    },
    {
      id: 3,
      text: "As a Marine Engineer at IPET, I've dedicated my career to developing innovative solutions in maritime engineering. Our team's expertise in naval architecture and marine system design allows us to push the boundaries of maritime technology.",
      name: "WM Wedasinghe",
      role: "Marine Engineering Specialist",
      image: wmdImage,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef(null);
  const isHovered = useRef(false);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const startInterval = () => {
      intervalRef.current = setInterval(() => {
        if (!isHovered.current) {
          setDirection(1);
          setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }
      }, 5000);
    };

    const clearIntervalSafe = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };

    startInterval();

    return () => clearIntervalSafe();
  }, [testimonials.length]);

  // Fixed: Removed TypeScript syntax
  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Animation variants
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
    },
    exit: (dir) => ({
      x: dir > 0 ? -1000 : 1000,
      opacity: 0,
      transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <>
      {/* Desktop View */}
      <div className="bg-[#E9ECF7] py-16 md:py-24 min-h-[573px] hidden md:block">
        <motion.div
          className="container mx-auto md:px-32 sm:px-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div className="mb-16 text-center" variants={itemVariants}>
            <p className="text-[#000000] md:text-[20px] font-[400] mb-2">Testimonial</p>
            <h2 className="text-[#2543B1] md:text-[30px] font-[600]">What our members say</h2>
          </motion.div>

          {/* Slider */}
          <div
            className="max-w-4xl mx-auto"
            onMouseEnter={() => (isHovered.current = true)}
            onMouseLeave={() => (isHovered.current = false)}
          >
            <div className="relative h-[400px] overflow-hidden">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 flex items-center justify-between gap-8 md:gap-16"
                >
                  {/* Content */}
                  <div className="flex-1">
                    <motion.div
                      className="text-[#2D387D80] text-6xl md:text-8xl font-serif leading-none opacity-50 mb-5"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.5 }}
                      transition={{ delay: 0.2 }}
                    >
                      <QuoteIcon />
                    </motion.div>

                    <motion.p
                      className="mb-5 max-w-[784px] text-[#000000] md:text-[19px] font-[400] leading-relaxed"
                      variants={itemVariants}
                    >
                      {testimonials[currentIndex].text}
                    </motion.p>

                    <motion.div className="space-y-1" variants={itemVariants}>
                      <h4 className="text-[16px] font-[600] text-[#2D387D]">{testimonials[currentIndex].name}</h4>
                      <p className="text-[16px] font-[300] text-[#2543B1]">{testimonials[currentIndex].role}</p>
                    </motion.div>
                  </div>

                  {/* Image */}
                  <motion.div
                    className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots */}
            <div className="flex justify-start gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    currentIndex === index
                      ? "bg-[#2D387D80] w-8 h-2"
                      : "bg-[#2D387D33] w-2 h-2"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile View */}
      <div className="bg-[#E9ECF7] py-14 md:hidden">
        <motion.div
          className="container mx-auto px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div className="mb-10 text-center" variants={itemVariants}>
            <p className="text-[#000000] text-[10px] font-[400] mb-2">Testimonial</p>
            <h2 className="text-[#2543B1] text-[15px] font-[600]">What our members say</h2>
          </motion.div>

          {/* Slider */}
          <div
            className="max-w-[390px] mx-auto"
            onMouseEnter={() => (isHovered.current = true)}
            onMouseLeave={() => (isHovered.current = false)}
            onTouchStart={() => (isHovered.current = true)}
            onTouchEnd={() => (isHovered.current = false)}
          >
            <div className="relative h-[350px] overflow-hidden">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 flex flex-col items-center text-center"
                >
                  <motion.div
                    className="text-[#2D387D80] text-6xl opacity-50 mb-3"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.5 }}
                    transition={{ delay: 0.2 }}
                  >
                    <QuoteIcon width={21} height={20} />
                  </motion.div>

                  <motion.p
                    className="mb-5 max-w-[215px] text-[#000000] text-[10px] font-[400] leading-relaxed"
                    variants={itemVariants}
                  >
                    {testimonials[currentIndex].text}
                  </motion.p>

                  <motion.div
                    className="w-[102px] h-[102px] rounded-full overflow-hidden mb-4"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  <motion.div className="space-y-1" variants={itemVariants}>
                    <h4 className="text-[9px] font-[600] text-[#2D387D]">{testimonials[currentIndex].name}</h4>
                    <p className="text-[9px] font-[300] text-[#2543B1]">{testimonials[currentIndex].role}</p>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-3 mt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    currentIndex === index
                      ? "bg-[#2D387D80] w-6 h-1.5"
                      : "bg-[#2D387D33] w-1.5 h-1.5"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

// Reusable Quote Icon
const QuoteIcon = ({ width = 44, height = 41 }) => (
  <svg width={width} height={height} viewBox="0 0 44 41" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M18.0551 0.102466C18.0662 1.02743 18.1427 1.8016 18.054 2.55108C18.0166 2.8699 17.68 3.21565 17.4027 3.41068C16.059 4.36529 14.5968 5.13298 13.3464 6.22481C9.30027 9.76057 6.93261 14.3796 6.87149 20.3443C6.85519 22.0364 7.43166 22.4545 8.72529 21.7771C12.4651 19.8286 16.5254 20.8965 18.7266 24.4071C21.1272 28.2386 20.8576 33.3824 18.0765 36.7862C14.526 41.1328 8.59707 41.3342 4.45793 37.2702C1.97939 34.8364 0.77701 31.6706 0.443193 28.0559C-0.675823 15.9497 4.77541 5.89295 14.8649 1.38267C15.8634 0.937273 16.8872 0.568241 18.0551 0.102466Z"
      fill="#2D387D"
      fillOpacity="0.5"
    />
    <path
      d="M41.5353 0.102466C41.5464 1.02743 41.623 1.8016 41.5342 2.55108C41.4968 2.8699 41.1602 3.21565 40.883 3.41068C39.5392 4.36529 38.0771 5.13298 36.8266 6.22481C32.7805 9.76057 30.4128 14.3796 30.3517 20.3443C30.3354 22.0364 30.9119 22.4545 32.2055 21.7771C35.9453 19.8286 40.0056 20.8965 42.2068 24.4071C44.6074 28.2386 44.3378 33.3824 41.5567 36.7862C38.0062 41.1328 32.0773 41.3342 27.9382 37.2702C25.4596 34.8364 24.2572 31.6706 23.9234 28.0559C22.8044 15.9497 28.2556 5.89295 38.3451 1.38267C39.3436 0.937273 40.3675 0.568241 41.5353 0.102466Z"
      fill="#2D387D"
      fillOpacity="0.5"
    />
  </svg>
);

export default Testimonial;