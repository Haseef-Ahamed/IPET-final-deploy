/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import React, { useState, useEffect, useRef } from 'react';

// const AnimatedNumber = ({ value, shouldAnimate }) => {
//   const [count, setCount] = useState(0);
//   const finalValue = parseInt(value);

//   useEffect(() => {
//     if (!shouldAnimate) return;
    
//     const duration = 3000; // 2 seconds
//     const steps = 50;
//     const stepValue = finalValue / steps;
//     let current = 0;

//     const timer = setInterval(() => {
//       current += stepValue;
//       if (current >= finalValue) {
//         setCount(finalValue);
//         clearInterval(timer);
//       } else {
//         setCount(Math.floor(current));
//       }
//     }, duration / steps);

//     return () => clearInterval(timer);
//   }, [finalValue, shouldAnimate]);

//   return <span>{count.toLocaleString()}+</span>;
// };

// const StatisticsSection = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const sectionRef = useRef(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (!sectionRef.current) return;

//       const rect = sectionRef.current.getBoundingClientRect();
//       const windowHeight = window.innerHeight || document.documentElement.clientHeight;
//       const windowWidth = window.innerWidth || document.documentElement.clientWidth;

//       // Check if the section is in the viewport
//       const isInView = 
//         rect.top >= 0 &&
//         rect.left >= 0 &&
//         rect.bottom <= windowHeight &&
//         rect.right <= windowWidth;

//       // Trigger animation when section is more than 30% visible
//       if (isInView && rect.height * 0.3 <= windowHeight - rect.top) {
//         setIsVisible(true);
//       }
//     };

//     // Add scroll event listener
//     window.addEventListener('scroll', handleScroll);

//     // Initial check
//     handleScroll();

//     // Cleanup
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   const stats = [
//     {
//       icon: (
//         <svg 
//           width="35" 
//           height="31" 
//           viewBox="0 0 35 31" 
//           fill="none" 
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M27.4999 20.5H24.1666V23.8333H27.4999M27.4999 13.8333H24.1666V17.1667H27.4999M30.8333 27.1667H17.4999V23.8333H20.8333V20.5H17.4999V17.1667H20.8333V13.8333H17.4999V10.5H30.8333M14.1666 7.16667H10.8333V3.83333H14.1666M14.1666 13.8333H10.8333V10.5H14.1666M14.1666 20.5H10.8333V17.1667H14.1666M14.1666 27.1667H10.8333V23.8333H14.1666M7.49992 7.16667H4.16659V3.83333H7.49992M7.49992 13.8333H4.16659V10.5H7.49992M7.49992 20.5H4.16659V17.1667H7.49992M7.49992 27.1667H4.16659V23.8333H7.49992M17.4999 7.16667V0.5H0.833252V30.5H34.1666V7.16667H17.4999Z"
//             fill="white"
//           />
//         </svg>
//       ),
//       title: "Number of Universities",
//       value: "10"
//     },
//     {
//       icon: (
//         <svg 
//           width="51" 
//           height="50" 
//           viewBox="0 0 51 50" 
//           fill="none" 
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M27.7292 21.6875C28.9947 19.9193 29.6752 17.7994 29.6752 15.625C29.6752 13.4506 28.9947 11.3307 27.7292 9.5625C28.9142 8.75527 30.3163 8.32666 31.7501 8.33333C33.684 8.33333 35.5386 9.10156 36.9061 10.469C38.2735 11.8365 39.0417 13.6911 39.0417 15.625C39.0417 17.5589 38.2735 19.4135 36.9061 20.781C35.5386 22.1484 33.684 22.9167 31.7501 22.9167C30.3163 22.9233 28.9142 22.4947 27.7292 21.6875ZM11.9584 15.625C11.9584 14.1828 12.3861 12.7731 13.1873 11.574C13.9885 10.3749 15.1273 9.44026 16.4597 8.88837C17.7921 8.33649 19.2582 8.19209 20.6726 8.47344C22.0871 8.75479 23.3863 8.44925 24.4061 9.469C25.4258 10.4888 26.1203 11.788 26.4016 13.2025C26.683 14.6169 26.5386 16.083 25.9867 17.4154C25.4348 18.7478 24.5002 19.8866 23.3011 20.6878C22.102 21.489 20.6922 21.9167 19.2501 21.9167C17.3162 21.9167 15.4615 21.1484 14.0941 19.781C12.7266 18.4135 11.9584 16.5589 11.9584 15.625ZM16.1251 15.625C16.1251 16.2431 16.3084 16.8472 16.6517 17.3612C16.9951 17.8751 17.4832 18.2756 18.0542 18.5121C18.6252 18.7486 19.2535 18.8105 19.8597 18.6899C20.4659 18.5694 21.0228 18.2717 21.4598 17.8347C21.8968 17.3977 22.1945 16.8408 22.315 16.2347C22.4356 15.6285 22.3737 15.0001 22.1372 14.4291C21.9007 13.8581 21.5001 13.37 20.9862 13.0267C20.4723 12.6833 19.8681 12.5 19.2501 12.5C18.4213 12.5 17.6264 12.8292 17.0404 13.4153C16.4543 14.0013 16.1251 14.7962 16.1251 15.625ZM33.8334 35.4167V39.5833H4.66675V35.4167C4.66675 35.4167 4.66675 27.0833 19.2501 27.0833C33.8334 27.0833 33.8334 35.4167 33.8334 35.4167ZM29.6667 35.4167C29.3751 33.7917 26.8959 31.25 19.2501 31.25C11.6042 31.25 8.97925 33.9792 8.83341 35.4167M33.7292 27.0833C35.0061 28.0765 36.0501 29.3372 36.788 30.7768C37.5258 32.2164 37.9395 33.8001 38.0001 35.4167V39.5833H46.3334V35.4167C46.3334 35.4167 46.3334 27.8542 33.7084 27.0833H33.7292Z"
//             fill="white"
//           />
//         </svg>
//       ),
//       title: "Number of Engineers",
//       value: "5000"
//     },
//     {
//       icon: (
//         <svg 
//           width="34" 
//           height="34" 
//           viewBox="0 0 34 34" 
//           fill="none" 
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M26.8333 25.9832C26.3999 24.6499 25.1499 23.6666 23.6666 23.6666H21.9999V18.6666C21.9999 18.2246 21.8243 17.8006 21.5118 17.4881C21.1992 17.1755 20.7753 16.9999 20.3333 16.9999H10.3333V13.6666H13.6666C14.1086 13.6666 14.5325 13.491 14.8451 13.1784C15.1577 12.8659 15.3333 12.4419 15.3333 11.9999V8.66658H18.6666C19.5506 8.66658 20.3985 8.3154 21.0236 7.69027C21.6487 7.06515 21.9999 6.21731 21.9999 5.33325V4.64992C23.994 5.45386 25.7637 6.72904 27.1573 8.36631C28.5509 10.0036 29.5271 11.9542 30.0022 14.0511C30.4772 16.148 30.4371 18.3289 29.8852 20.4069C29.3334 22.485 28.2862 24.3983 26.8333 25.9832ZM15.3333 30.2166C8.74992 29.3999 3.66659 23.7999 3.66659 16.9999C3.66659 15.9666 3.79992 14.9666 4.01659 14.0166L11.9999 21.9999V23.6666C11.9999 24.5506 12.3511 25.3985 12.9762 26.0236C13.6014 26.6487 14.4492 26.9999 15.3333 26.9999M16.9999 0.333252C14.8112 0.333252 12.644 0.764348 10.6219 1.60193C8.59977 2.4395 6.76245 3.66716 5.21481 5.21481C2.0892 8.34041 0.333252 12.5796 0.333252 16.9999C0.333252 21.4202 2.0892 25.6594 5.21481 28.785C6.76245 30.3327 8.59977 31.5603 10.6219 32.3979C12.644 33.2355 14.8112 33.6666 16.9999 33.6666C21.4202 33.6666 25.6594 31.9106 28.785 28.785C31.9106 25.6594 33.6666 21.4202 33.6666 16.9999C33.6666 14.8112 33.2355 12.644 32.3979 10.6219C31.5603 8.59977 30.3327 6.76245 28.785 5.21481C27.2374 3.66716 25.4001 2.4395 23.378 1.60193C21.3559 0.764348 19.1886 0.333252 16.9999 0.333252Z"
//             fill="white"
//           />
//         </svg>
//       ),
//       title: "Number of Countries",
//       value: "10"
//     }
//   ];

//   return (
//     <div 
//       ref={sectionRef} 
//       className="bg-[#2D387D] py-16 text-white"
//     >
//       <div className="container px-4 mx-auto">
//         <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//           {stats.map((stat, index) => (
//             <div 
//               key={index} 
//               className={`flex flex-col items-center text-center transform transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
//               style={{ transitionDelay: `${index * 100}ms` }}
//             >
//               <div className="mb-4">{stat.icon}</div>
//               <h3 className="mb-2 text-lg font-semibold opacity-90">{stat.title}</h3>
//               <p className="text-4xl font-bold">
//                 <AnimatedNumber value={stat.value} shouldAnimate={isVisible} />
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StatisticsSection;


import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const AnimatedNumber = ({ value, shouldAnimate }) => {
  const [count, setCount] = useState(0);
  const finalValue = parseInt(value);

  useEffect(() => {
    if (!shouldAnimate) return;
    
    const duration = 2000; // 2 seconds
    const steps = 50;
    const stepValue = finalValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= finalValue) {
        setCount(finalValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [finalValue, shouldAnimate]);

  return <motion.span>{count.toLocaleString()}+</motion.span>;
};

const StatisticsSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 0.77, 0.47, 0.97]
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 }
    }
  };

  const stats = [
    {
      icon: (
        <svg 
          width="35" 
          height="31" 
          viewBox="0 0 35 31" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27.4999 20.5H24.1666V23.8333H27.4999M27.4999 13.8333H24.1666V17.1667H27.4999M30.8333 27.1667H17.4999V23.8333H20.8333V20.5H17.4999V17.1667H20.8333V13.8333H17.4999V10.5H30.8333M14.1666 7.16667H10.8333V3.83333H14.1666M14.1666 13.8333H10.8333V10.5H14.1666M14.1666 20.5H10.8333V17.1667H14.1666M14.1666 27.1667H10.8333V23.8333H14.1666M7.49992 7.16667H4.16659V3.83333H7.49992M7.49992 13.8333H4.16659V10.5H7.49992M7.49992 20.5H4.16659V17.1667H7.49992M7.49992 27.1667H4.16659V23.8333H7.49992M17.4999 7.16667V0.5H0.833252V30.5H34.1666V7.16667H17.4999Z"
            fill="white"
          />
        </svg>
      ),
      title: "Number of Universities",
      value: "10"
    },
    {
      icon: (
        <svg 
          width="51" 
          height="50" 
          viewBox="0 0 51 50" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27.7292 21.6875C28.9947 19.9193 29.6752 17.7994 29.6752 15.625C29.6752 13.4506 28.9947 11.3307 27.7292 9.5625C28.9142 8.75527 30.3163 8.32666 31.7501 8.33333C33.684 8.33333 35.5386 9.10156 36.9061 10.469C38.2735 11.8365 39.0417 13.6911 39.0417 15.625C39.0417 17.5589 38.2735 19.4135 36.9061 20.781C35.5386 22.1484 33.684 22.9167 31.7501 22.9167C30.3163 22.9233 28.9142 22.4947 27.7292 21.6875ZM11.9584 15.625C11.9584 14.1828 12.3861 12.7731 13.1873 11.574C13.9885 10.3749 15.1273 9.44026 16.4597 8.88837C17.7921 8.33649 19.2582 8.19209 20.6726 8.47344C22.0871 8.75479 23.3863 8.44925 24.4061 9.469C25.4258 10.4888 26.1203 11.788 26.4016 13.2025C26.683 14.6169 26.5386 16.083 25.9867 17.4154C25.4348 18.7478 24.5002 19.8866 23.3011 20.6878C22.102 21.489 20.6922 21.9167 19.2501 21.9167C17.3162 21.9167 15.4615 21.1484 14.0941 19.781C12.7266 18.4135 11.9584 16.5589 11.9584 15.625ZM16.1251 15.625C16.1251 16.2431 16.3084 16.8472 16.6517 17.3612C16.9951 17.8751 17.4832 18.2756 18.0542 18.5121C18.6252 18.7486 19.2535 18.8105 19.8597 18.6899C20.4659 18.5694 21.0228 18.2717 21.4598 17.8347C21.8968 17.3977 22.1945 16.8408 22.315 16.2347C22.4356 15.6285 22.3737 15.0001 22.1372 14.4291C21.9007 13.8581 21.5001 13.37 20.9862 13.0267C20.4723 12.6833 19.8681 12.5 19.2501 12.5C18.4213 12.5 17.6264 12.8292 17.0404 13.4153C16.4543 14.0013 16.1251 14.7962 16.1251 15.625ZM33.8334 35.4167V39.5833H4.66675V35.4167C4.66675 35.4167 4.66675 27.0833 19.2501 27.0833C33.8334 27.0833 33.8334 35.4167 33.8334 35.4167ZM29.6667 35.4167C29.3751 33.7917 26.8959 31.25 19.2501 31.25C11.6042 31.25 8.97925 33.9792 8.83341 35.4167M33.7292 27.0833C35.0061 28.0765 36.0501 29.3372 36.788 30.7768C37.5258 32.2164 37.9395 33.8001 38.0001 35.4167V39.5833H46.3334V35.4167C46.3334 35.4167 46.3334 27.8542 33.7084 27.0833H33.7292Z"
            fill="white"
          />
        </svg>
      ),
      title: "Number of Engineers",
      value: "5000"
    },
    {
      icon: (
        <svg 
          width="34" 
          height="34" 
          viewBox="0 0 34 34" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M26.8333 25.9832C26.3999 24.6499 25.1499 23.6666 23.6666 23.6666H21.9999V18.6666C21.9999 18.2246 21.8243 17.8006 21.5118 17.4881C21.1992 17.1755 20.7753 16.9999 20.3333 16.9999H10.3333V13.6666H13.6666C14.1086 13.6666 14.5325 13.491 14.8451 13.1784C15.1577 12.8659 15.3333 12.4419 15.3333 11.9999V8.66658H18.6666C19.5506 8.66658 20.3985 8.3154 21.0236 7.69027C21.6487 7.06515 21.9999 6.21731 21.9999 5.33325V4.64992C23.994 5.45386 25.7637 6.72904 27.1573 8.36631C28.5509 10.0036 29.5271 11.9542 30.0022 14.0511C30.4772 16.148 30.4371 18.3289 29.8852 20.4069C29.3334 22.485 28.2862 24.3983 26.8333 25.9832ZM15.3333 30.2166C8.74992 29.3999 3.66659 23.7999 3.66659 16.9999C3.66659 15.9666 3.79992 14.9666 4.01659 14.0166L11.9999 21.9999V23.6666C11.9999 24.5506 12.3511 25.3985 12.9762 26.0236C13.6014 26.6487 14.4492 26.9999 15.3333 26.9999M16.9999 0.333252C14.8112 0.333252 12.644 0.764348 10.6219 1.60193C8.59977 2.4395 6.76245 3.66716 5.21481 5.21481C2.0892 8.34041 0.333252 12.5796 0.333252 16.9999C0.333252 21.4202 2.0892 25.6594 5.21481 28.785C6.76245 30.3327 8.59977 31.5603 10.6219 32.3979C12.644 33.2355 14.8112 33.6666 16.9999 33.6666C21.4202 33.6666 25.6594 31.9106 28.785 28.785C31.9106 25.6594 33.6666 21.4202 33.6666 16.9999C33.6666 14.8112 33.2355 12.644 32.3979 10.6219C31.5603 8.59977 30.3327 6.76245 28.785 5.21481C27.2374 3.66716 25.4001 2.4395 23.378 1.60193C21.3559 0.764348 19.1886 0.333252 16.9999 0.333252Z"
            fill="white"
          />
        </svg>
      ),
      title: "Number of Countries",
      value: "10"
    }
  ];

  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="bg-[#2D387D] py-16 text-white"
    >
      <div className="container px-4 mx-auto">
        <motion.div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center text-center"
            >
              <motion.div 
                variants={iconVariants}
                whileHover="hover"
                className="mb-4"
              >
                {stat.icon}
              </motion.div>
              <motion.h3 
                className="mb-2 text-lg font-semibold opacity-90"
                variants={itemVariants}
              >
                {stat.title}
              </motion.h3>
              <motion.p 
                className="text-4xl font-bold"
                variants={itemVariants}
              >
                <AnimatedNumber value={stat.value} shouldAnimate={isInView} />
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StatisticsSection;