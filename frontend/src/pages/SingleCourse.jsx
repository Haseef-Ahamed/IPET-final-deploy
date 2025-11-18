import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import about_bg from "../assets/CPD_courses_n.svg";
import about_bg_m from "../assets/Aboutus_m_bg.svg";

const CourseDetails = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseData, setCourseData] = useState(null);

  // Animation variants
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

  const slideVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/events-courses/course/${courseId}`);
        if (!response.ok) throw new Error("Failed to fetch course details");
        const data = await response.json();
        setCourseData({
          ...data,
          images: [...data.sub_images], // Only sub-images for slider
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    if (courseId) fetchCourseDetails();
  }, [courseId]);

  const nextSlide = () => {
    setCurrentSlide(prev => prev === (courseData?.images?.length || 0) - 1 ? 0 : prev + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => prev === 0 ? (courseData?.images?.length || 0) - 1 : prev - 1);
  };

  const goToSlide = index => setCurrentSlide(index);

  const renderFormattedDescription = (text) => {
    if (!text) return null;

    // Check if the text contains HTML tags (from ReactQuill)
    const hasHTMLTags = /<[^>]+>/.test(text);

    if (hasHTMLTags) {
      // Decode HTML entities and render HTML content from ReactQuill
      const decodeHtmlEntities = (html) => {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = html;
        return textarea.value;
      };

      const decodedText = decodeHtmlEntities(text);

      return (
        <div 
          className="text-[#2D387D] leading-relaxed formatted-content"
          dangerouslySetInnerHTML={{ __html: decodedText }}
        />
      );
    }

    // Fallback: Handle markdown-style formatting (for old entries)
    const paragraphs = text.split(/\n\s*\n/);

    return (
      <div className="text-[#2D387D] leading-relaxed">
        {paragraphs.map((para, idx) => {
          // Replace **bold** with <strong>
          const parts = para.split(/(\*\*[^*]+\*\*)/g);
          return (
            <p key={idx} className="mb-4">
              {parts.map((part, partIndex) => {
                if (part.startsWith("**") && part.endsWith("**")) {
                  return (
                    <strong key={partIndex} className="font-bold">
                      {part.slice(2, -2)}
                    </strong>
                  );
                }
                return <span key={partIndex}>{part}</span>;
              })}
            </p>
          );
        })}
      </div>
    );
  };

  if (loading) return <div className="flex items-center justify-center w-full h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center w-full h-screen text-red-500">Error: {error}</div>;
  if (!courseData) return <div className="flex items-center justify-center w-full h-screen">No course data found</div>;

  const hasSliderImages = courseData.images && courseData.images.length > 0;

  return (
    <>
      {/* Add inline styles for formatted content */}
      <style>{`
        .formatted-content p {
          margin-bottom: 1rem;
        }
        .formatted-content strong {
          font-weight: 700;
        }
        .formatted-content em {
          font-style: italic;
        }
        .formatted-content u {
          text-decoration: underline;
        }
        .formatted-content ul {
          list-style-type: disc;
          margin-left: 1.5rem;
          margin-bottom: 1rem;
          padding-left: 0.5rem;
        }
        .formatted-content ol {
          list-style-type: decimal;
          margin-left: 1.5rem;
          margin-bottom: 1rem;
          padding-left: 0.5rem;
        }
        .formatted-content li {
          margin-bottom: 0.5rem;
          padding-left: 0.25rem;
        }
        .formatted-content ul ul,
        .formatted-content ol ol,
        .formatted-content ul ol,
        .formatted-content ol ul {
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
        /* Text alignment support */
        .formatted-content .ql-align-left {
          text-align: left;
        }
        .formatted-content .ql-align-center {
          text-align: center;
        }
        .formatted-content .ql-align-right {
          text-align: right;
        }
        .formatted-content .ql-align-justify {
          text-align: justify;
        }
        .formatted-content p[style*="text-align: left"],
        .formatted-content p[style*="text-align:left"] {
          text-align: left !important;
        }
        .formatted-content p[style*="text-align: center"],
        .formatted-content p[style*="text-align:center"] {
          text-align: center !important;
        }
        .formatted-content p[style*="text-align: right"],
        .formatted-content p[style*="text-align:right"] {
          text-align: right !important;
        }
        .formatted-content p[style*="text-align: justify"],
        .formatted-content p[style*="text-align:justify"] {
          text-align: justify !important;
        }
      `}</style>
      
      {/* Desktop */}
      <div className="hidden md:block mb-24">
        {/* Hero */}
        <motion.div className="relative w-full h-[300px] md:h-[269px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[#1b1a1a99] z-10" />
            <img src={about_bg} alt="Courses Hero" className="object-cover w-full h-full object-[-0%,16%]" />
          </div>
          <div className="relative z-20 h-full max-w-7xl mx-auto md:ml-[70px] flex items-center">
            <motion.h1 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="text-[50px] md:text-5xl lg:text-6xl font-semibold text-white">
              Courses
            </motion.h1>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div className="max-w-4xl p-4 pt-20 mx-auto" initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div className="flex items-start mb-6 space-x-4" variants={itemVariants}>
            <div className="flex items-center space-x-5 mt-1.5">
              <span className="font-semibold text-black">Course</span>
              <span className="text-4xl font-light tracking-wider text-black">|</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <motion.span variants={itemVariants} className="text-[#2D387D] text-sm font-semibold">
                  {new Date(courseData.uploaded_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </motion.span>
                <motion.button variants={itemVariants} className="text-sm font-semibold text-black-700 hover:underline" onClick={() => navigate("/view-courses")}>
                  ← Go Back
                </motion.button>
              </div>
              <motion.h2 variants={itemVariants} className="text-2xl font-semibold text-[#2D387D] mb-4">{courseData.title}</motion.h2>
              <motion.div variants={itemVariants} className="mb-6">
                <motion.img src={courseData.main_image_url} alt={courseData.title} className="object-cover w-full rounded-lg h-96" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} />
              </motion.div>
              <motion.div variants={containerVariants} className="text-[#2D387D] leading-relaxed">
                {renderFormattedDescription(courseData.description)}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Slider */}
        {hasSliderImages && (
          <motion.div className="w-full bg-[#E9ECF7]" initial="hidden" animate="visible" variants={containerVariants}>
            <div className="max-w-4xl pt-20 pb-40 mx-auto mt-10">
              <motion.div className="relative -mb-6 overflow-hidden" variants={itemVariants}>
                <div className="relative w-full h-[500px] mb-4">
                  <motion.img key={currentSlide} src={courseData.images[currentSlide]} alt={`Slide ${currentSlide + 1}`} className="w-full h-[500px] object-contain mx-auto" initial="hidden" animate="visible" variants={slideVariants} />
                  {courseData.images.length > 1 && (
                    <>
                      <motion.button onClick={prevSlide} className="absolute flex items-center justify-center w-20 h-20 -translate-y-1/2 left-4 top-1/2" whileHover={{ scale: 1.1 }}>
                        <svg width="72" height="72" fill="none" stroke="white" strokeWidth="1" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
                      </motion.button>
                      <motion.button onClick={nextSlide} className="absolute flex items-center justify-center w-20 h-20 -translate-y-1/2 right-4 top-1/2" whileHover={{ scale: 1.1 }}>
                        <svg width="72" height="72" fill="none" stroke="white" strokeWidth="1" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" /></svg>
                      </motion.button>
                    </>
                  )}
                </div>
              </motion.div>
              {courseData.images.length > 1 && (
                <motion.div className="grid grid-cols-4 gap-4 mt-6" variants={containerVariants}>
                  {courseData.images.map((image, index) => (
                    <motion.button key={index} onClick={() => goToSlide(index)} className={`relative overflow-hidden aspect-w-16 aspect-h-9 ${currentSlide === index ? "ring-2 ring-blue-500" : ""}`} whileHover={{ scale: 1.05 }}>
                      <img src={image} alt={`Thumbnail ${index + 1}`} className="object-cover w-full h-full" />
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Mobile */}
      <div className="w-full md:hidden mb-32">
        {/* Hero */}
        <motion.div className="relative w-full h-[169px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[#1b1a1a99] z-10" />
            <img src={about_bg} alt="Courses Hero" className="object-cover w-full h-full object-[-0%,16%]" />
          </div>
          <div className="relative z-20 h-full flex items-center justify-center">
            <motion.h1 initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="text-[30px] font-[600] text-white">Courses</motion.h1>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="w-full px-4 mt-6">
          <motion.div className="flex items-center mb-4" variants={itemVariants}>
            <span className="font-semibold text-black">Course</span>
            <span className="ml-2 text-4xl font-light tracking-wider text-black">|</span>
          </motion.div>
          <motion.div className="flex items-center justify-between mb-4" variants={itemVariants}>
            <span className="text-[#2543B1] text-sm font-semibold">{new Date(courseData.uploaded_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            <button className="text-sm font-semibold text-black-700 hover:underline" onClick={() => navigate("/view-courses")}>← Go Back</button>
          </motion.div>
          <motion.h2 className="text-[16px] font-semibold text-[#2543B1] mb-4 text-center" variants={itemVariants}>{courseData.title}</motion.h2>
          <motion.div className="flex justify-center mb-4" variants={itemVariants}>
            <motion.img src={courseData.main_image_url} alt={courseData.title} className="object-cover w-full h-64 rounded-lg" whileTap={{ scale: 0.98 }} />
          </motion.div>
          <motion.div className="text-[#2D387D] text-[12px] leading-relaxed" variants={containerVariants}>
            {renderFormattedDescription(courseData.description)}
          </motion.div>

          {/* Slider */}
          {hasSliderImages && (
            <motion.div className="w-full bg-[#E9ECF7] mt-10" variants={containerVariants}>
              <div className="w-full py-8">
                <div className="relative w-full h-[250px] mb-4">
                  <motion.img key={currentSlide} src={courseData.images[currentSlide]} alt={`Slide ${currentSlide + 1}`} className="w-full h-[250px] object-contain mx-auto" initial="hidden" animate="visible" variants={slideVariants} />
                  {courseData.images.length > 1 && (
                    <>
                      <motion.button onClick={prevSlide} className="absolute w-10 h-10 -translate-y-1/2 left-2 top-1/2 bg-black/40 rounded-full flex items-center justify-center" whileTap={{ scale: 0.9 }}>
                        <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
                      </motion.button>
                      <motion.button onClick={nextSlide} className="absolute w-10 h-10 -translate-y-1/2 right-2 top-1/2 bg-black/40 rounded-full flex items-center justify-center" whileTap={{ scale: 0.9 }}>
                        <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" /></svg>
                      </motion.button>
                    </>
                  )}
                </div>
                {courseData.images.length > 1 && (
                  <div className="flex justify-center gap-2 mt-6">
                    {courseData.images.map((_, index) => (
                      <button key={index} onClick={() => goToSlide(index)} className={`w-2 h-2 rounded-full ${currentSlide === index ? "bg-[#2D387D80]" : "bg-[#2D387D33]"}`} aria-label={`Go to slide ${index + 1}`} />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default CourseDetails;