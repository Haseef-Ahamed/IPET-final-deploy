/* eslint-disable no-unused-vars */
 
 
// import { useState } from "react";
// import ethanImage from "../assets/Ethan.svg";
// import wmdImage from "../assets/wm-wedasinghe.jpg";  // Replace with actual image path
// import kamindaImage from "../assets/kaminda-manuraj.jpg";  // Replace with actual image path
// import janithImage from "../assets/janith-dissanayake.jpg";  // Replace with actual image path

// const Testimonial = () => {
//   const testimonials = [
//     {
//       id: 1,
//       text: "Marine engineering is about more than just ships – it's about creating sustainable and efficient marine transportation solutions. At IPET, we're constantly exploring new technologies to improve maritime operations and environmental performance.",
//       name: "Kaminda Manuraj",
//       role: "Marine Engineering Consultant",
//       image: kamindaImage,
//     },
//     {
//       id: 2,
//       text: "In the intersection of textile technology and engineering, we're revolutionizing how design meets technical innovation. Our approach combines creative design with cutting-edge engineering principles to develop advanced textile solutions.",
//       name: "Janith Dissanayake",
//       role: "Textile and Fashion Design Engineer",
//       image: janithImage,
//     },
//     {
//       id: 3,
//       text: "As a Marine Engineer at IPET, I've dedicated my career to developing innovative solutions in maritime engineering. Our team's expertise in naval architecture and marine system design allows us to push the boundaries of maritime technology.",
//       name: "WM Wedasinghe",
//       role: "Marine Engineering Specialist",
//       image: wmdImage,
//     },
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   const goToSlide = (index) => {
//     setCurrentIndex(index);
//   };

//   return (
//     <>
//     <div className="bg-[#E9ECF7] py-16 md:py-24 min-h-[573px] hidden md:block">
//       <div className="container mx-auto md:px-32 sm:px-16">
//         {/* Header */}
//         <div className="mb-16 text-center">
//           <p className="text-[#000000] md:text-[20px] font-[400] mb-2">
//             Testimonial
//           </p>
//           <h2 className="text-[#2543B1] md:text-[30px] font-[600]">
//             What our members say
//           </h2>
//         </div>

//         {/* Testimonials Slider */}
//         <div className="max-w-4xl mx-auto">
//           <div className="relative">
//             <div className="overflow-hidden">
//               <div
//                 className="flex transition-transform duration-500 ease-in-out"
//                 style={{
//                   transform: `translateX(-${currentIndex * 100}%)`,
//                 }}
//               >
//                 {testimonials.map((testimonial, index) => (
//                   <div
//                     key={testimonial.id}
//                     className="flex items-center justify-between flex-shrink-0 w-full gap-8 md:flex-row md:gap-16"
//                   >
//                     {/* Quote and Content */}
//                     <div className="flex-1">
//                       {/* Quote mark */}
//                       <div className="text-[#2D387D80] text-6xl md:text-8xl font-serif leading-none opacity-50 mb-5">
//                         <svg
//                           width="44"
//                           height="41"
//                           viewBox="0 0 44 41"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             d="M18.0551 0.102466C18.0662 1.02743 18.1427 1.8016 18.054 2.55108C18.0166 2.8699 17.68 3.21565 17.4027 3.41068C16.059 4.36529 14.5968 5.13298 13.3464 6.22481C9.30027 9.76057 6.93261 14.3796 6.87149 20.3443C6.85519 22.0364 7.43166 22.4545 8.72529 21.7771C12.4651 19.8286 16.5254 20.8965 18.7266 24.4071C21.1272 28.2386 20.8576 33.3824 18.0765 36.7862C14.526 41.1328 8.59707 41.3342 4.45793 37.2702C1.97939 34.8364 0.77701 31.6706 0.443193 28.0559C-0.675823 15.9497 4.77541 5.89295 14.8649 1.38267C15.8634 0.937273 16.8872 0.568241 18.0551 0.102466Z"
//                             fill="#2D387D"
//                             fillOpacity="0.5"
//                           />
//                           <path
//                             d="M41.5353 0.102466C41.5464 1.02743 41.623 1.8016 41.5342 2.55108C41.4968 2.8699 41.1602 3.21565 40.883 3.41068C39.5392 4.36529 38.0771 5.13298 36.8266 6.22481C32.7805 9.76057 30.4128 14.3796 30.3517 20.3443C30.3354 22.0364 30.9119 22.4545 32.2055 21.7771C35.9453 19.8286 40.0056 20.8965 42.2068 24.4071C44.6074 28.2386 44.3378 33.3824 41.5567 36.7862C38.0062 41.1328 32.0773 41.3342 27.9382 37.2702C25.4596 34.8364 24.2572 31.6706 23.9234 28.0559C22.8044 15.9497 28.2556 5.89295 38.3451 1.38267C39.3436 0.937273 40.3675 0.568241 41.5353 0.102466Z"
//                             fill="#2D387D"
//                             fillOpacity="0.5"
//                           />
//                         </svg>
//                       </div>

//                       {/* Testimonial Text */}
//                       <p className="mb-5 max-w-[784px] text-[#000000] md:text-[19px] font-[400] leading-relaxed">
//                         {testimonial.text}
//                       </p>

//                       {/* Author Info */}
//                       <div className="mb-16 space-y-1">
//                         <h4 className="text-[16px] font-[600] text-[#2D387D]">
//                           {testimonial.name}
//                         </h4>
//                         <p className="text-[16px] font-[300] text-[#2543B1]">
//                           {testimonial.role}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Profile Image */}
//                     <div className="w-48 h-48 overflow-hidden rounded-full md:w-64 md:h-64">
//                       <img
//                         src={testimonial.image}
//                         alt={testimonial.name}
//                         className="object-cover w-full h-full"
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Slider Dots */}
//             <div className="flex justify-start gap-2 mt-8">
//               {testimonials.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => goToSlide(index)}
//                   className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                     currentIndex === index
//                       ? "bg-[#2D387D80] w-2"
//                       : "bg-[#2D387D33]"
//                   }`}
//                   aria-label={`Go to slide ${index + 1}`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* Mobile View */}
//     <div className="bg-[#E9ECF7] py-14 md:py-24 min-h-[315px]  md:hidden">
//       <div className="container mx-auto md:px-28 sm:px-14">
//         {/* Header */}
//         <div className="mb-10 text-center">
//           <p className="text-[#000000] text-[10px] md:text-[20px] font-[400] mb-2">
//             Testimonial
//           </p>
//           <h2 className="text-[#2543B1] text-[15px] md:text-[30px] font-[600]">
//             What our members say
//           </h2>
//         </div>

//         {/* Testimonials Slider */}
//         <div className="max-w-[390px] mx-auto px-3">
//           <div className="relative">
//             <div className="overflow-hidden">
//               <div
//                 className="flex transition-transform duration-500 ease-in-out"
//                 style={{
//                   transform: `translateX(-${currentIndex * 100}%)`,
//                 }}
//               >
//                 {testimonials.map((testimonial, index) => (
//                   <div
//                     key={testimonial.id}
//                     className="flex items-center justify-between flex-shrink-0 w-full gap-8 md:flex-row md:gap-16"
//                   >
//                     {/* Quote and Content */}
//                     <div className="flex-1">
//                       {/* Quote mark */}
//                       <div className="text-[#2D387D80] text-6xl md:text-8xl font-serif leading-none opacity-50 mb-5">
//                         <svg
//                           width="21"
//                           height="20"
//                           viewBox="0 0 44 41"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             d="M18.0551 0.102466C18.0662 1.02743 18.1427 1.8016 18.054 2.55108C18.0166 2.8699 17.68 3.21565 17.4027 3.41068C16.059 4.36529 14.5968 5.13298 13.3464 6.22481C9.30027 9.76057 6.93261 14.3796 6.87149 20.3443C6.85519 22.0364 7.43166 22.4545 8.72529 21.7771C12.4651 19.8286 16.5254 20.8965 18.7266 24.4071C21.1272 28.2386 20.8576 33.3824 18.0765 36.7862C14.526 41.1328 8.59707 41.3342 4.45793 37.2702C1.97939 34.8364 0.77701 31.6706 0.443193 28.0559C-0.675823 15.9497 4.77541 5.89295 14.8649 1.38267C15.8634 0.937273 16.8872 0.568241 18.0551 0.102466Z"
//                             fill="#2D387D"
//                             fillOpacity="0.5"
//                           />
//                           <path
//                             d="M41.5353 0.102466C41.5464 1.02743 41.623 1.8016 41.5342 2.55108C41.4968 2.8699 41.1602 3.21565 40.883 3.41068C39.5392 4.36529 38.0771 5.13298 36.8266 6.22481C32.7805 9.76057 30.4128 14.3796 30.3517 20.3443C30.3354 22.0364 30.9119 22.4545 32.2055 21.7771C35.9453 19.8286 40.0056 20.8965 42.2068 24.4071C44.6074 28.2386 44.3378 33.3824 41.5567 36.7862C38.0062 41.1328 32.0773 41.3342 27.9382 37.2702C25.4596 34.8364 24.2572 31.6706 23.9234 28.0559C22.8044 15.9497 28.2556 5.89295 38.3451 1.38267C39.3436 0.937273 40.3675 0.568241 41.5353 0.102466Z"
//                             fill="#2D387D"
//                             fillOpacity="0.5"
//                           />
//                         </svg>
//                       </div>

//                       {/* Testimonial Text */}
//                       <p className="mb-5 max-w-[215px] text-[#000000] text-[10px] md:text-[19px] font-[400] leading-relaxed">
//                         {testimonial.text}
//                       </p>

//                       {/* Author Info */}
//                       <div className="mb-16 space-y-1">
//                         <h4 className="text-[9px] font-[600] text-[#2D387D]">
//                           {testimonial.name}
//                         </h4>
//                         <p className="text-[9px] font-[300] text-[#2543B1]">
//                           {testimonial.role}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Profile Image */}
//                     <div className="w-[102px] h-[102.02px] md:w-64 md:h-64 rounded-full overflow-hidden mb-14">
//                       <img
//                         src={testimonial.image}
//                         alt={testimonial.name}
//                         className="object-cover w-full h-full"
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Slider Dots */}
//             <div className="flex justify-start gap-2 -mt-1">
//               {testimonials.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => goToSlide(index)}
//                   className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                     currentIndex === index
//                       ? "bg-[#2D387D80] w-2"
//                       : "bg-[#2D387D33]"
//                   }`}
//                   aria-label={`Go to slide ${index + 1}`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default Testimonial;

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import ethanImage from "../assets/Ethan.svg";
// import wmdImage from "../assets/wm-wedasinghe.jpg";
// import kamindaImage from "../assets/kaminda-manuraj.jpg";
// import janithImage from "../assets/janith-dissanayake.jpg";

// const Testimonial = () => {
//   const testimonials = [
//     {
//       id: 1,
//       text: "Marine engineering is about more than just ships – it's about creating sustainable and efficient marine transportation solutions. At IPET, we're constantly exploring new technologies to improve maritime operations and environmental performance.",
//       name: "Kaminda Manuraj",
//       role: "Marine Engineering Consultant",
//       image: kamindaImage,
//     },
//     {
//       id: 2,
//       text: "In the intersection of textile technology and engineering, we're revolutionizing how design meets technical innovation. Our approach combines creative design with cutting-edge engineering principles to develop advanced textile solutions.",
//       name: "Janith Dissanayake",
//       role: "Textile and Fashion Design Engineer",
//       image: janithImage,
//     },
//     {
//       id: 3,
//       text: "As a Marine Engineer at IPET, I've dedicated my career to developing innovative solutions in maritime engineering. Our team's expertise in naval architecture and marine system design allows us to push the boundaries of maritime technology.",
//       name: "WM Wedasinghe",
//       role: "Marine Engineering Specialist",
//       image: wmdImage,
//     },
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         when: "beforeChildren"
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut"
//       }
//     }
//   };

//   const slideVariants = {
//     enter: (direction, number) => ({
//       x: direction > 0 ? 1000 : -1000,
//       opacity: 0
//     }),
//     center: {
//       x: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//         ease: [0.33, 1, 0.68, 1]
//       }
//     },
//     exit: (direction, number) => ({
//       x: direction > 0 ? -1000 : 1000,
//       opacity: 0,
//       transition: {
//         duration: 0.5,
//         ease: [0.33, 1, 0.68, 1]
//       }
//     })
//   };

//   const goToSlide = (index, number) => {
//     setCurrentIndex(index);
//   };

//   return (
//     <>
//       {/* Desktop View */}
//       <div className="bg-[#E9ECF7] py-16 md:py-24 min-h-[573px] hidden md:block">
//         <motion.div 
//           className="container mx-auto md:px-32 sm:px-16"
//           initial="hidden"
//           animate="visible"
//           variants={containerVariants}
//         >
//           {/* Header */}
//           <motion.div className="mb-16 text-center" variants={itemVariants}>
//             <p className="text-[#000000] md:text-[20px] font-[400] mb-2">
//               Testimonial
//             </p>
//             <h2 className="text-[#2543B1] md:text-[30px] font-[600]">
//               What our members say
//             </h2>
//           </motion.div>

//           {/* Testimonials Slider */}
//           <div className="max-w-4xl mx-auto">
//             <div className="relative h-[400px]">
//               <AnimatePresence custom={currentIndex}>
//                 {testimonials.map((testimonial, index) => (
//                   currentIndex === index && (
//                     <motion.div
//                       key={testimonial.id}
//                       custom={currentIndex}
//                       variants={slideVariants}
//                       initial="enter"
//                       animate="center"
//                       exit="exit"
//                       className="absolute flex items-center justify-between flex-shrink-0 w-full gap-8 md:flex-row md:gap-16"
//                     >
//                       {/* Quote and Content */}
//                       <div className="flex-1">
//                         {/* Quote mark */}
//                         <motion.div 
//                           className="text-[#2D387D80] text-6xl md:text-8xl font-serif leading-none opacity-50 mb-5"
//                           initial={{ scale: 0.8, opacity: 0 }}
//                           animate={{ scale: 1, opacity: 0.5 }}
//                           transition={{ delay: 0.2, duration: 0.5 }}
//                         >
//                           <svg
//                             width="44"
//                             height="41"
//                             viewBox="0 0 44 41"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path
//                               d="M18.0551 0.102466C18.0662 1.02743 18.1427 1.8016 18.054 2.55108C18.0166 2.8699 17.68 3.21565 17.4027 3.41068C16.059 4.36529 14.5968 5.13298 13.3464 6.22481C9.30027 9.76057 6.93261 14.3796 6.87149 20.3443C6.85519 22.0364 7.43166 22.4545 8.72529 21.7771C12.4651 19.8286 16.5254 20.8965 18.7266 24.4071C21.1272 28.2386 20.8576 33.3824 18.0765 36.7862C14.526 41.1328 8.59707 41.3342 4.45793 37.2702C1.97939 34.8364 0.77701 31.6706 0.443193 28.0559C-0.675823 15.9497 4.77541 5.89295 14.8649 1.38267C15.8634 0.937273 16.8872 0.568241 18.0551 0.102466Z"
//                               fill="#2D387D"
//                               fillOpacity="0.5"
//                             />
//                             <path
//                               d="M41.5353 0.102466C41.5464 1.02743 41.623 1.8016 41.5342 2.55108C41.4968 2.8699 41.1602 3.21565 40.883 3.41068C39.5392 4.36529 38.0771 5.13298 36.8266 6.22481C32.7805 9.76057 30.4128 14.3796 30.3517 20.3443C30.3354 22.0364 30.9119 22.4545 32.2055 21.7771C35.9453 19.8286 40.0056 20.8965 42.2068 24.4071C44.6074 28.2386 44.3378 33.3824 41.5567 36.7862C38.0062 41.1328 32.0773 41.3342 27.9382 37.2702C25.4596 34.8364 24.2572 31.6706 23.9234 28.0559C22.8044 15.9497 28.2556 5.89295 38.3451 1.38267C39.3436 0.937273 40.3675 0.568241 41.5353 0.102466Z"
//                               fill="#2D387D"
//                               fillOpacity="0.5"
//                             />
//                           </svg>
//                         </motion.div>

//                         {/* Testimonial Text */}
//                         <motion.p 
//                           className="mb-5 max-w-[784px] text-[#000000] md:text-[19px] font-[400] leading-relaxed"
//                           variants={itemVariants}
//                         >
//                           {testimonial.text}
//                         </motion.p>

//                         {/* Author Info */}
//                         <motion.div 
//                           className="mb-16 space-y-1"
//                           variants={itemVariants}
//                         >
//                           <h4 className="text-[16px] font-[600] text-[#2D387D]">
//                             {testimonial.name}
//                           </h4>
//                           <p className="text-[16px] font-[300] text-[#2543B1]">
//                             {testimonial.role}
//                           </p>
//                         </motion.div>
//                       </div>

//                       {/* Profile Image */}
//                       <motion.div 
//                         className="w-48 h-48 overflow-hidden rounded-full md:w-64 md:h-64"
//                         initial={{ scale: 0.9, opacity: 0 }}
//                         animate={{ scale: 1, opacity: 1 }}
//                         transition={{ delay: 0.3, duration: 0.6 }}
//                         whileHover={{ scale: 1.05 }}
//                       >
//                         <img
//                           src={testimonial.image}
//                           alt={testimonial.name}
//                           className="object-cover w-full h-full"
//                         />
//                       </motion.div>
//                     </motion.div>
//                   )
//                 ))}
//               </AnimatePresence>
//             </div>

//             {/* Slider Dots */}
//             <motion.div 
//               className="flex justify-start gap-2 mt-8"
//               variants={itemVariants}
//             >
//               {testimonials.map((_, index) => (
//                 <motion.button
//                   key={index}
//                   onClick={() => goToSlide(index)}
//                   className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                     currentIndex === index
//                       ? "bg-[#2D387D80] w-2"
//                       : "bg-[#2D387D33]"
//                   }`}
//                   aria-label={`Go to slide ${index + 1}`}
//                   whileHover={{ scale: 1.5 }}
//                   whileTap={{ scale: 0.8 }}
//                 />
//               ))}
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>

//       {/* Mobile View */}
//       <div className="bg-[#E9ECF7] py-14 md:py-24 min-h-[315px] md:hidden">
//         <motion.div 
//           className="container mx-auto md:px-28 sm:px-14"
//           initial="hidden"
//           animate="visible"
//           variants={containerVariants}
//         >
//           {/* Header */}
//           <motion.div className="mb-10 text-center" variants={itemVariants}>
//             <p className="text-[#000000] text-[10px] md:text-[20px] font-[400] mb-2">
//               Testimonial
//             </p>
//             <h2 className="text-[#2543B1] text-[15px] md:text-[30px] font-[600]">
//               What our members say
//             </h2>
//           </motion.div>

//           {/* Testimonials Slider */}
//           <div className="max-w-[390px] mx-auto px-3">
//             <div className="relative h-[350px]">
//               <AnimatePresence custom={currentIndex}>
//                 {testimonials.map((testimonial, index) => (
//                   currentIndex === index && (
//                     <motion.div
//                       key={testimonial.id}
//                       custom={currentIndex}
//                       variants={slideVariants}
//                       initial="enter"
//                       animate="center"
//                       exit="exit"
//                       className="absolute flex flex-col items-center flex-shrink-0 w-full"
//                     >
//                       {/* Quote mark */}
//                       <motion.div 
//                         className="text-[#2D387D80] text-6xl md:text-8xl font-serif leading-none opacity-50 mb-3"
//                         initial={{ scale: 0.8, opacity: 0 }}
//                         animate={{ scale: 1, opacity: 0.5 }}
//                         transition={{ delay: 0.2, duration: 0.5 }}
//                       >
//                         <svg
//                           width="21"
//                           height="20"
//                           viewBox="0 0 44 41"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             d="M18.0551 0.102466C18.0662 1.02743 18.1427 1.8016 18.054 2.55108C18.0166 2.8699 17.68 3.21565 17.4027 3.41068C16.059 4.36529 14.5968 5.13298 13.3464 6.22481C9.30027 9.76057 6.93261 14.3796 6.87149 20.3443C6.85519 22.0364 7.43166 22.4545 8.72529 21.7771C12.4651 19.8286 16.5254 20.8965 18.7266 24.4071C21.1272 28.2386 20.8576 33.3824 18.0765 36.7862C14.526 41.1328 8.59707 41.3342 4.45793 37.2702C1.97939 34.8364 0.77701 31.6706 0.443193 28.0559C-0.675823 15.9497 4.77541 5.89295 14.8649 1.38267C15.8634 0.937273 16.8872 0.568241 18.0551 0.102466Z"
//                             fill="#2D387D"
//                             fillOpacity="0.5"
//                           />
//                           <path
//                             d="M41.5353 0.102466C41.5464 1.02743 41.623 1.8016 41.5342 2.55108C41.4968 2.8699 41.1602 3.21565 40.883 3.41068C39.5392 4.36529 38.0771 5.13298 36.8266 6.22481C32.7805 9.76057 30.4128 14.3796 30.3517 20.3443C30.3354 22.0364 30.9119 22.4545 32.2055 21.7771C35.9453 19.8286 40.0056 20.8965 42.2068 24.4071C44.6074 28.2386 44.3378 33.3824 41.5567 36.7862C38.0062 41.1328 32.0773 41.3342 27.9382 37.2702C25.4596 34.8364 24.2572 31.6706 23.9234 28.0559C22.8044 15.9497 28.2556 5.89295 38.3451 1.38267C39.3436 0.937273 40.3675 0.568241 41.5353 0.102466Z"
//                             fill="#2D387D"
//                             fillOpacity="0.5"
//                           />
//                         </svg>
//                       </motion.div>

//                       {/* Testimonial Text */}
//                       <motion.p 
//                         className="mb-5 max-w-[215px] text-[#000000] text-[10px] md:text-[19px] font-[400] leading-relaxed text-center"
//                         variants={itemVariants}
//                       >
//                         {testimonial.text}
//                       </motion.p>

//                       {/* Profile Image */}
//                       <motion.div 
//                         className="w-[102px] h-[102px] md:w-64 md:h-64 rounded-full overflow-hidden mb-4"
//                         initial={{ scale: 0.9, opacity: 0 }}
//                         animate={{ scale: 1, opacity: 1 }}
//                         transition={{ delay: 0.3, duration: 0.6 }}
//                       >
//                         <img
//                           src={testimonial.image}
//                           alt={testimonial.name}
//                           className="object-cover w-full h-full"
//                         />
//                       </motion.div>

//                       {/* Author Info */}
//                       <motion.div 
//                         className="space-y-1 text-center"
//                         variants={itemVariants}
//                       >
//                         <h4 className="text-[9px] font-[600] text-[#2D387D]">
//                           {testimonial.name}
//                         </h4>
//                         <p className="text-[9px] font-[300] text-[#2543B1]">
//                           {testimonial.role}
//                         </p>
//                       </motion.div>
//                     </motion.div>
//                   )
//                 ))}
//               </AnimatePresence>
//             </div>

//             {/* Slider Dots */}
//             <motion.div 
//               className="flex justify-center gap-2 -mt-1"
//               variants={itemVariants}
//             >
//               {testimonials.map((_, index) => (
//                 <motion.button
//                   key={index}
//                   onClick={() => goToSlide(index)}
//                   className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                     currentIndex === index
//                       ? "bg-[#2D387D80] w-2"
//                       : "bg-[#2D387D33]"
//                   }`}
//                   aria-label={`Go to slide ${index + 1}`}
//                   whileHover={{ scale: 1.5 }}
//                   whileTap={{ scale: 0.8 }}
//                 />
//               ))}
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>
//     </>
//   );
// };

// export default Testimonial;

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ethanImage from "../assets/Ethan.svg";
import wmdImage from "../assets/wm-wedasinghe.jpg";
import kamindaImage from "../assets/kaminda-manuraj.jpg";
import janithImage from "../assets/janith-dissanayake.jpg";

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

  // Animation variants
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1]
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1]
      }
    })
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
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
            <p className="text-[#000000] md:text-[20px] font-[400] mb-2">
              Testimonial
            </p>
            <h2 className="text-[#2543B1] md:text-[30px] font-[600]">
              What our members say
            </h2>
          </motion.div>

          {/* Testimonials Slider */}
          <div className="max-w-4xl mx-auto">
            <div className="relative h-[400px]">
              <AnimatePresence custom={currentIndex}>
                {testimonials.map((testimonial, index) => (
                  currentIndex === index && (
                    <motion.div
                      key={testimonial.id}
                      custom={index > currentIndex ? 1 : -1}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="absolute flex items-center justify-between flex-shrink-0 w-full gap-8 md:flex-row md:gap-16"
                    >
                      {/* Quote and Content */}
                      <div className="flex-1">
                        {/* Quote mark */}
                        <motion.div 
                          className="text-[#2D387D80] text-6xl md:text-8xl font-serif leading-none opacity-50 mb-5"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 0.5 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                        >
                          <svg
                            width="44"
                            height="41"
                            viewBox="0 0 44 41"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
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
                        </motion.div>

                        {/* Testimonial Text */}
                        <motion.p 
                          className="mb-5 max-w-[784px] text-[#000000] md:text-[19px] font-[400] leading-relaxed"
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: false, margin: "-50px" }}
                          variants={itemVariants}
                        >
                          {testimonial.text}
                        </motion.p>

                        {/* Author Info */}
                        <motion.div 
                          className="mb-16 space-y-1"
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: false, margin: "-50px" }}
                          variants={itemVariants}
                        >
                          <h4 className="text-[16px] font-[600] text-[#2D387D]">
                            {testimonial.name}
                          </h4>
                          <p className="text-[16px] font-[300] text-[#2543B1]">
                            {testimonial.role}
                          </p>
                        </motion.div>
                      </div>

                      {/* Profile Image */}
                      <motion.div 
                        className="w-48 h-48 overflow-hidden rounded-full md:w-64 md:h-64"
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: false, margin: "-50px" }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="object-cover w-full h-full"
                        />
                      </motion.div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>

            {/* Slider Dots */}
            <motion.div 
              className="flex justify-start gap-2 mt-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-50px" }}
              variants={itemVariants}
            >
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? "bg-[#2D387D80] w-2"
                      : "bg-[#2D387D33]"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  whileHover={{ scale: 1.5 }}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Mobile View */}
      <div className="bg-[#E9ECF7] py-14 md:py-24 min-h-[315px] md:hidden">
        <motion.div 
          className="container mx-auto md:px-28 sm:px-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div className="mb-10 text-center" variants={itemVariants}>
            <p className="text-[#000000] text-[10px] md:text-[20px] font-[400] mb-2">
              Testimonial
            </p>
            <h2 className="text-[#2543B1] text-[15px] md:text-[30px] font-[600]">
              What our members say
            </h2>
          </motion.div>

          {/* Testimonials Slider */}
          <div className="max-w-[390px] mx-auto px-3">
            <div className="relative h-[350px]">
              <AnimatePresence custom={currentIndex}>
                {testimonials.map((testimonial, index) => (
                  currentIndex === index && (
                    <motion.div
                      key={testimonial.id}
                      custom={index > currentIndex ? 1 : -1}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="absolute flex flex-col items-center flex-shrink-0 w-full"
                    >
                      {/* Quote mark */}
                      <motion.div 
                        className="text-[#2D387D80] text-6xl md:text-8xl font-serif leading-none opacity-50 mb-3"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 0.5 }}
                        viewport={{ once: false, margin: "-50px" }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        <svg
                          width="21"
                          height="20"
                          viewBox="0 0 44 41"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
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
                      </motion.div>

                      {/* Testimonial Text */}
                      <motion.p 
                        className="mb-5 max-w-[215px] text-[#000000] text-[10px] md:text-[19px] font-[400] leading-relaxed text-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, margin: "-50px" }}
                        variants={itemVariants}
                      >
                        {testimonial.text}
                      </motion.p>

                      {/* Profile Image */}
                      <motion.div 
                        className="w-[102px] h-[102px] md:w-64 md:h-64 rounded-full overflow-hidden mb-4"
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: false, margin: "-50px" }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                      >
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="object-cover w-full h-full"
                        />
                      </motion.div>

                      {/* Author Info */}
                      <motion.div 
                        className="space-y-1 text-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, margin: "-50px" }}
                        variants={itemVariants}
                      >
                        <h4 className="text-[9px] font-[600] text-[#2D387D]">
                          {testimonial.name}
                        </h4>
                        <p className="text-[9px] font-[300] text-[#2543B1]">
                          {testimonial.role}
                        </p>
                      </motion.div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>

            {/* Slider Dots */}
            <motion.div 
              className="flex justify-center gap-4 -mt-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-50px" }}
              variants={itemVariants}
            >
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === index
                      ? "bg-[#2D387D80] w-2"
                      : "bg-[#2D387D33]"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  whileHover={{ scale: 1.5 }}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Testimonial;

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import ethanImage from "../assets/Ethan.svg";
// import wmdImage from "../assets/wm-wedasinghe.jpg";
// import kamindaImage from "../assets/kaminda-manuraj.jpg";
// import janithImage from "../assets/janith-dissanayake.jpg";

// const Testimonial = () => {
//   const testimonials = [
//     {
//       id: 1,
//       text: "Marine engineering is about more than just ships – it's about creating sustainable and efficient marine transportation solutions. At IPET, we're constantly exploring new technologies to improve maritime operations and environmental performance.",
//       name: "Kaminda Manuraj",
//       role: "Marine Engineering Consultant",
//       image: kamindaImage,
//     },
//     {
//       id: 2,
//       text: "In the intersection of textile technology and engineering, we're revolutionizing how design meets technical innovation. Our approach combines creative design with cutting-edge engineering principles to develop advanced textile solutions.",
//       name: "Janith Dissanayake",
//       role: "Textile and Fashion Design Engineer",
//       image: janithImage,
//     },
//     {
//       id: 3,
//       text: "As a Marine Engineer at IPET, I've dedicated my career to developing innovative solutions in maritime engineering. Our team's expertise in naval architecture and marine system design allows us to push the boundaries of maritime technology.",
//       name: "WM Wedasinghe",
//       role: "Marine Engineering Specialist",
//       image: wmdImage,
//     },
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         when: "beforeChildren"
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut"
//       }
//     }
//   };

//   const slideVariants = {
//     enter: (direction, number) => ({
//       x: direction > 0 ? 1000 : -1000,
//       opacity: 0
//     }),
//     center: {
//       x: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//         ease: [0.33, 1, 0.68, 1]
//       }
//     },
//     exit: (direction, number) => ({
//       x: direction > 0 ? -1000 : 1000,
//       opacity: 0,
//       transition: {
//         duration: 0.5,
//         ease: [0.33, 1, 0.68, 1]
//       }
//     })
//   };

//   const goToSlide = (index, number) => {
//     setCurrentIndex(index);
//   };

//   return (
//     <>
//       {/* Desktop View */}
//       <div className="bg-[#E9ECF7] py-16 md:py-24 min-h-[573px] hidden md:block">
//         <motion.div 
//           className="container mx-auto md:px-32 sm:px-16"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: false, margin: "-100px" }}
//           variants={containerVariants}
//         >
//           {/* Header */}
//           <motion.div className="mb-16 text-center" variants={itemVariants}>
//             <p className="text-[#000000] md:text-[20px] font-[400] mb-2">
//               Testimonial
//             </p>
//             <h2 className="text-[#2543B1] md:text-[30px] font-[600]">
//               What our members say
//             </h2>
//           </motion.div>

//           {/* Testimonials Slider */}
//           <div className="max-w-4xl mx-auto">
//             <div className="relative h-[400px]">
//               <AnimatePresence custom={currentIndex}>
//                 {testimonials.map((testimonial, index) => (
//                   currentIndex === index && (
//                     <motion.div
//                       key={testimonial.id}
//                       custom={currentIndex}
//                       variants={slideVariants}
//                       initial="enter"
//                       animate="center"
//                       exit="exit"
//                       className="absolute flex items-center justify-between flex-shrink-0 w-full gap-8 md:flex-row md:gap-16"
//                     >
//                       {/* Quote and Content */}
//                       <div className="flex-1">
//                         {/* Quote mark */}
//                         <motion.div 
//                           className="text-[#2D387D80] text-6xl md:text-8xl font-serif leading-none opacity-50 mb-5"
//                           initial={{ scale: 0.8, opacity: 0 }}
//                           animate={{ scale: 1, opacity: 0.5 }}
//                           transition={{ delay: 0.2, duration: 0.5 }}
//                         >
//                           <svg
//                             width="44"
//                             height="41"
//                             viewBox="0 0 44 41"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path
//                               d="M18.0551 0.102466C18.0662 1.02743 18.1427 1.8016 18.054 2.55108C18.0166 2.8699 17.68 3.21565 17.4027 3.41068C16.059 4.36529 14.5968 5.13298 13.3464 6.22481C9.30027 9.76057 6.93261 14.3796 6.87149 20.3443C6.85519 22.0364 7.43166 22.4545 8.72529 21.7771C12.4651 19.8286 16.5254 20.8965 18.7266 24.4071C21.1272 28.2386 20.8576 33.3824 18.0765 36.7862C14.526 41.1328 8.59707 41.3342 4.45793 37.2702C1.97939 34.8364 0.77701 31.6706 0.443193 28.0559C-0.675823 15.9497 4.77541 5.89295 14.8649 1.38267C15.8634 0.937273 16.8872 0.568241 18.0551 0.102466Z"
//                               fill="#2D387D"
//                               fillOpacity="0.5"
//                             />
//                             <path
//                               d="M41.5353 0.102466C41.5464 1.02743 41.623 1.8016 41.5342 2.55108C41.4968 2.8699 41.1602 3.21565 40.883 3.41068C39.5392 4.36529 38.0771 5.13298 36.8266 6.22481C32.7805 9.76057 30.4128 14.3796 30.3517 20.3443C30.3354 22.0364 30.9119 22.4545 32.2055 21.7771C35.9453 19.8286 40.0056 20.8965 42.2068 24.4071C44.6074 28.2386 44.3378 33.3824 41.5567 36.7862C38.0062 41.1328 32.0773 41.3342 27.9382 37.2702C25.4596 34.8364 24.2572 31.6706 23.9234 28.0559C22.8044 15.9497 28.2556 5.89295 38.3451 1.38267C39.3436 0.937273 40.3675 0.568241 41.5353 0.102466Z"
//                               fill="#2D387D"
//                               fillOpacity="0.5"
//                             />
//                           </svg>
//                         </motion.div>

//                         {/* Testimonial Text */}
//                         <motion.p 
//                           className="mb-5 max-w-[784px] text-[#000000] md:text-[19px] font-[400] leading-relaxed"
//                           variants={itemVariants}
//                         >
//                           {testimonial.text}
//                         </motion.p>

//                         {/* Author Info */}
//                         <motion.div 
//                           className="mb-16 space-y-1"
//                           variants={itemVariants}
//                         >
//                           <h4 className="text-[16px] font-[600] text-[#2D387D]">
//                             {testimonial.name}
//                           </h4>
//                           <p className="text-[16px] font-[300] text-[#2543B1]">
//                             {testimonial.role}
//                           </p>
//                         </motion.div>
//                       </div>

//                       {/* Profile Image */}
//                       <motion.div 
//                         className="w-48 h-48 overflow-hidden rounded-full md:w-64 md:h-64"
//                         initial={{ scale: 0.9, opacity: 0 }}
//                         animate={{ scale: 1, opacity: 1 }}
//                         transition={{ delay: 0.3, duration: 0.6 }}
//                         whileHover={{ scale: 1.05 }}
//                       >
//                         <img
//                           src={testimonial.image}
//                           alt={testimonial.name}
//                           className="object-cover w-full h-full"
//                         />
//                       </motion.div>
//                     </motion.div>
//                   )
//                 ))}
//               </AnimatePresence>
//             </div>

//             {/* Slider Dots */}
//             <motion.div 
//               className="flex justify-start gap-2 mt-8"
//               variants={itemVariants}
//             >
//               {testimonials.map((_, index) => (
//                 <motion.button
//                   key={index}
//                   onClick={() => goToSlide(index)}
//                   className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                     currentIndex === index
//                       ? "bg-[#2D387D80] w-2"
//                       : "bg-[#2D387D33]"
//                   }`}
//                   aria-label={`Go to slide ${index + 1}`}
//                   whileHover={{ scale: 1.5 }}
//                   whileTap={{ scale: 0.8 }}
//                 />
//               ))}
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>

//       {/* Mobile View */}
//       <div className="bg-[#E9ECF7] py-14 md:py-24 min-h-[315px] md:hidden">
//         <motion.div 
//           className="container mx-auto md:px-28 sm:px-14"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: false, margin: "-50px" }}
//           variants={containerVariants}
//         >
//           {/* Header */}
//           <motion.div className="mb-10 text-center" variants={itemVariants}>
//             <p className="text-[#000000] text-[10px] md:text-[20px] font-[400] mb-2">
//               Testimonial
//             </p>
//             <h2 className="text-[#2543B1] text-[15px] md:text-[30px] font-[600]">
//               What our members say
//             </h2>
//           </motion.div>

//           {/* Testimonials Slider */}
//           <div className="max-w-[390px] mx-auto px-3">
//             <div className="relative h-[350px]">
//               <AnimatePresence custom={currentIndex}>
//                 {testimonials.map((testimonial, index) => (
//                   currentIndex === index && (
//                     <motion.div
//                       key={testimonial.id}
//                       custom={currentIndex}
//                       variants={slideVariants}
//                       initial="enter"
//                       animate="center"
//                       exit="exit"
//                       className="absolute flex flex-col items-center flex-shrink-0 w-full"
//                     >
//                       {/* Quote mark */}
//                       <motion.div 
//                         className="text-[#2D387D80] text-6xl md:text-8xl font-serif leading-none opacity-50 mb-3"
//                         initial={{ scale: 0.8, opacity: 0 }}
//                         animate={{ scale: 1, opacity: 0.5 }}
//                         transition={{ delay: 0.2, duration: 0.5 }}
//                       >
//                         <svg
//                           width="21"
//                           height="20"
//                           viewBox="0 0 44 41"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             d="M18.0551 0.102466C18.0662 1.02743 18.1427 1.8016 18.054 2.55108C18.0166 2.8699 17.68 3.21565 17.4027 3.41068C16.059 4.36529 14.5968 5.13298 13.3464 6.22481C9.30027 9.76057 6.93261 14.3796 6.87149 20.3443C6.85519 22.0364 7.43166 22.4545 8.72529 21.7771C12.4651 19.8286 16.5254 20.8965 18.7266 24.4071C21.1272 28.2386 20.8576 33.3824 18.0765 36.7862C14.526 41.1328 8.59707 41.3342 4.45793 37.2702C1.97939 34.8364 0.77701 31.6706 0.443193 28.0559C-0.675823 15.9497 4.77541 5.89295 14.8649 1.38267C15.8634 0.937273 16.8872 0.568241 18.0551 0.102466Z"
//                             fill="#2D387D"
//                             fillOpacity="0.5"
//                           />
//                           <path
//                             d="M41.5353 0.102466C41.5464 1.02743 41.623 1.8016 41.5342 2.55108C41.4968 2.8699 41.1602 3.21565 40.883 3.41068C39.5392 4.36529 38.0771 5.13298 36.8266 6.22481C32.7805 9.76057 30.4128 14.3796 30.3517 20.3443C30.3354 22.0364 30.9119 22.4545 32.2055 21.7771C35.9453 19.8286 40.0056 20.8965 42.2068 24.4071C44.6074 28.2386 44.3378 33.3824 41.5567 36.7862C38.0062 41.1328 32.0773 41.3342 27.9382 37.2702C25.4596 34.8364 24.2572 31.6706 23.9234 28.0559C22.8044 15.9497 28.2556 5.89295 38.3451 1.38267C39.3436 0.937273 40.3675 0.568241 41.5353 0.102466Z"
//                             fill="#2D387D"
//                             fillOpacity="0.5"
//                           />
//                         </svg>
//                       </motion.div>

//                       {/* Testimonial Text */}
//                       <motion.p 
//                         className="mb-5 max-w-[215px] text-[#000000] text-[10px] md:text-[19px] font-[400] leading-relaxed text-center"
//                         variants={itemVariants}
//                       >
//                         {testimonial.text}
//                       </motion.p>

//                       {/* Profile Image */}
//                       <motion.div 
//                         className="w-[102px] h-[102px] md:w-64 md:h-64 rounded-full overflow-hidden mb-4"
//                         initial={{ scale: 0.9, opacity: 0 }}
//                         animate={{ scale: 1, opacity: 1 }}
//                         transition={{ delay: 0.3, duration: 0.6 }}
//                       >
//                         <img
//                           src={testimonial.image}
//                           alt={testimonial.name}
//                           className="object-cover w-full h-full"
//                         />
//                       </motion.div>

//                       {/* Author Info */}
//                       <motion.div 
//                         className="space-y-1 text-center"
//                         variants={itemVariants}
//                       >
//                         <h4 className="text-[9px] font-[600] text-[#2D387D]">
//                           {testimonial.name}
//                         </h4>
//                         <p className="text-[9px] font-[300] text-[#2543B1]">
//                           {testimonial.role}
//                         </p>
//                       </motion.div>
//                     </motion.div>
//                   )
//                 ))}
//               </AnimatePresence>
//             </div>

//             {/* Slider Dots */}
//             <motion.div 
//               className="flex justify-center gap-2 -mt-1"
//               variants={itemVariants}
//             >
//               {testimonials.map((_, index) => (
//                 <motion.button
//                   key={index}
//                   onClick={() => goToSlide(index)}
//                   className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                     currentIndex === index
//                       ? "bg-[#2D387D80] w-2"
//                       : "bg-[#2D387D33]"
//                   }`}
//                   aria-label={`Go to slide ${index + 1}`}
//                   whileHover={{ scale: 1.5 }}
//                   whileTap={{ scale: 0.8 }}
//                 />
//               ))}
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>
//     </>
//   );
// };

// export default Testimonial;