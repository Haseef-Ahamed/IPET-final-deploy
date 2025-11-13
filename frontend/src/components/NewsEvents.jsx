 
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import about_bg from "../assets/NewsAndEvents_bg_n.svg";
import about_bg_m from "../assets/Aboutus_m_bg.svg";
// import about_bg from "../assets/Abouthero_bg.svg";
// import about_bg_m from "../assets/Aboutus_m_bg.svg";
import { useNavigate, useParams } from "react-router-dom";
import { newsItems } from "../components/NewsData";

const NewsEvents = () => {
  const navigate = useNavigate();
  const { newsId } = useParams();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newsData, setNewsData] = useState(null);

  useEffect(() => {
    // Set the news data based on the URL parameter
    const currentNews = newsItems[newsId];
    if (currentNews) {
      setNewsData(currentNews);
    }
  }, [newsId]);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === (newsData?.images.length || 0) - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? (newsData?.images.length || 0) - 1 : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (!newsData) return null;

  return (
    <>
      <div className="hidden w-full md:block ">
        <div className="relative md:w-full sm:w-[742px] h-[300px] md:h-[269px] sm:h-[269px]">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[#00000099] z-10" />
            <img
              src={about_bg}
              alt="About Us Hero"
              className="md:w-full sm:w-[740px] md:h-full sm:h-full object-cover"
            />
          </div>

          <div className="relative z-20 h-full max-w-7xl mx-auto sm:px-0 md:px-0 md:ml-[70px] sm:ml-[40px]">
            <div className="flex items-center h-full">
              <h1 className="text-[50px] md:text-5xl lg:text-6xl font-[600] text-white">
                News & Events
              </h1>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="max-w-4xl p-4 pt-20 mx-auto">
          {/* News and Date Section */}
          <div className="flex items-start mb-6 space-x-4">
            <div className="flex items-center space-x-5 mt-1.5">
              <span className="font-semibold text-black">News</span>
              <span className="text-4xl font-light tracking-wider text-black">
                |
              </span>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[#2D387D] text-sm font-semibold">
                  {newsData.date}
                </span>
                <button
                  className="text-sm font-semibold text-black-700 hover:underline"
                  onClick={() => navigate("/newsevents")}
                >
                  ← Go Back
                </button>
              </div>

              <h2 className="text-2xl font-semibold text-[#2D387D] mb-4">
                {newsData.title}
              </h2>

              <h3 className="text-[#2D387D] mb-4">{newsData.subtitle}</h3>

              <p className="text-[#2D387D] leading-relaxed">
                {newsData.content}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full bg-[#E9ECF7]">
          <div className="max-w-4xl pt-20 pb-40 mx-auto mt-10">
            <div className="relative -mb-6 overflow-hidden">
              <div className="relative w-full h-[600px]">
                <img
                  src={newsData.images[currentSlide]}
                  alt={`Slide ${currentSlide + 1}`}
                  className="w-[1224px] h-full object-contain"
                  style={{}}
                />

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
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {newsData.images.slice(1).map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index + 1)}
                  className={`relative overflow-hidden aspect-w-16 aspect-h-9 ${
                    currentSlide === index + 1 ? "ring-2 ring-blue-500" : ""
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
          </div>
        </div>
      </div>

      {/* mobile view */}

      <div className="w-full md:hidden">
        {/* <div className="relative md:w-full px-2 sm:w-[742px] h-[169px] md:h-[269px] sm:h-[269px]">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[#00000099] z-10 h-[169px] w-[430px]" />
            <img
              src={about_bg_m}
              alt="About Us Hero"
              className="h-[169px] w-[430px] md:w-full sm:w-[740px] md:h-full sm:h-full object-cover"
            />
          </div>

          <div className="relative px-4 z-20 h-full max-w-7xl mx-auto sm:px-0 md:px-0 md:ml-[70px] sm:ml-[40px]">
            <div className="flex items-center h-full">
              <h1 className="text-[30px] md:text-5xl lg:text-6xl font-[600] text-white">
                News & Events
              </h1>
            </div>
          </div>
        </div> */}
        <div className="relative px-2 w-full md:w-full sm:w-[742px] h-[169px] md:h-[269px] sm:h-[269px]  md:hidden ">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[#00000099]  z-10" />
            <img
              src={about_bg_m}
              alt="About Us Hero"
              className="md:w-full sm:w-[740px] md:h-full sm:h-full w-full h-full object-cover"
            />
          </div>

          <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-0 md:px-0 md:ml-[70px] sm:ml-[40px]">
            <div className="flex items-center h-full">
              <h1 className="text-[30px] md:text-5xl lg:text-6xl font-[600] text-white">
                News & Events
              </h1>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="max-w-4xl p-4 pt-2 mx-auto">
          {/* News and Date Section */}
          <div className="flex items-start mb-0 space-x-4">
            <div className="flex items-center space-x-5 mt-1.5 ">
              <span className="font-semibold text-black">News</span>
              <span className="text-4xl font-light tracking-wider text-black">
                |
              </span>
            </div>

            <div className="flex-1 mt-20">
              <div className="flex items-center justify-between mb-5 -ml-20">
                <span className="text-[#2543B1] text-sm font-semibold">
                  {newsData.date}
                </span>
                <button
                  className="text-sm font-semibold text-black-700 hover:underline"
                  onClick={() => navigate("/newsevents")}
                >
                  ← Go Back
                </button>
              </div>

              <h2 className="text-[16px] -ml-11  font-semibold text-[#2543B1] mb-4">
                {newsData.title}
              </h2>

              <h3 className="text-[#2D387D] text-[12px] -ml-16 text-center mb-4">
                {newsData.subtitle}
              </h3>

              <p className="text-[#2D387D] text-[12px] -ml-20 text-center leading-relaxed">
                {newsData.content}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full bg-[#E9ECF7] h-[266px] mb-44">
          <div className="max-w-full px-6 py-8 mx-auto mt-10">
            <div className="relative -mb-4 overflow-hidden">
              <div className="relative w-full h-[206px]">
                <img
                  src={newsData.images[currentSlide]}
                  alt={`Slide ${currentSlide + 1}`}
                  className="object-contain w-full h-full"
                  style={{}}
                />
              </div>
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-2 mt-16">
              {newsData.images.map((_, index) => (
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
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsEvents;
