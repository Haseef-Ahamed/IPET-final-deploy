/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
// /* eslint-disable react/no-unescaped-entities */
// /* eslint-disable react/no-unknown-property */
// /* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
// import React from "react";

// const CrownIcon = () => (
//   <svg 
//     xmlns="http://www.w3.org/2000/svg" 
//     viewBox="0 0 24 24" 
//     fill="currentColor" 
//     className="w-5 h-5 mr-1"
//   >
//     <path d="M11.645 20.91l-3.994-4.341A4.775 4.775 0 0 1 6 12.739V4.262a2.25 2.25 0 0 1 1.897-2.212l5.151-.916a2.252 2.252 0 0 1 1.904 1.639l1.693 5.958a3.852 3.852 0 0 0 2.174 2.456l.459.222a3.888 3.888 0 0 1 2.256 3.564V19.5a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-1.538c0-.836.223-1.666.633-2.395l.622-1.162a4.75 4.75 0 0 1 1.358-1.543l.419-.335z" />
//   </svg>
// );

// const TeamMember = ({ member, isChairman = false, isLarge = false }) => {
//   return (
//     <div className={`
//       bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 
//       transform hover:-translate-y-2 border border-blue-50 overflow-hidden 
//       group relative flex flex-col
//       ${isLarge ? 'w-full max-w-[500px] h-[700px]' : 'w-full max-w-[350px] h-[480px]'}
//       hover:border-blue-200
//     `}>
//       {isChairman && (
//         <div className="absolute z-10 top-4 right-4 animate-pulse">
//           <div className="flex items-center px-3 py-1 text-xs font-semibold text-white rounded-full shadow-md bg-gradient-to-r from-amber-500 to-amber-600">
//             Chairman
//           </div>
//         </div>
//       )}
      
//       <div className="relative flex self-center justify-center mt-5 mb-6">
//         <div className={`
//           rounded-full overflow-hidden border-4 border-blue-100 
//           group-hover:border-blue-300 transition-all duration-500
//           ${isLarge ? 'w-[280px] h-[400px]' : 'w-[230px] h-[280px]'}
//           shadow-inner
//         `}>
//           <img
//             src={member.image}
//             alt={member.name}
//             className="object-cover w-full h-full transition-transform duration-500 transform group-hover:scale-105"
//             loading="lazy"
//           />
//         </div>
//       </div>
      
//       <div className={`
//         p-6 bg-gradient-to-b from-[#F0F4FF] to-blue-50 text-center 
//         flex-grow flex flex-col justify-center space-y-3
//         group-hover:from-blue-50 group-hover:to-blue-100 transition-colors duration-500
//         ${isLarge ? 'space-y-4' : 'space-y-3'}
//       `}>
//         <h3 className={`
//           text-[#2543B1] font-bold group-hover:text-blue-900 
//           transition-colors duration-300 line-clamp-2
//           ${isLarge ? 'text-2xl' : 'text-xl'}
//         `}>
//           {member.name}
//         </h3>
//         <div className="w-20 h-px mx-auto transition-colors duration-300 bg-blue-200 group-hover:bg-blue-300"></div>
//         <p className={`
//           text-[#2D387D] font-semibold group-hover:text-blue-700 
//           transition-colors duration-300
//           ${isLarge ? 'text-lg' : 'text-base'}
//         `}>
//           {member.position}
//         </p>
//       </div>
//     </div>
//   );
// };

// const Team = () => {
//   const teamMembers = [
//     {
//       name: "MR. K M L SAMANCHANDRA",
//       position: "Chairman",
//       image: "/team_images/Samanchandra.jpg"
//     },
//     {
//       name: "MR. PRABAHERAN SOLOMON",
//       position: "Director Planning",
//       image: "/team_images/Prabaheran.jpg"
//     },
//     {
//       name: "MR. HESHAN",
//       position: "Director (Administration & HR)",
//       image: "/team_images/Heshan.jpg"
//     },
//     {
//       name: "MR. LAKITHA DILSHAN",
//       position: "Director of Membership and Accreditation",
//       image: "/team_images/Lakitha.jpg"
//     },
//     {
//       name: "MR. LAKMAL PERERA",
//       position: "Director of Quality",
//       image: "/team_images/Lakmal.jpg"
//     },
//     {
//       name: "MR. NALAKA PRABATH",
//       position: "Director (Finance and Operation)",
//       image: "/team_images/Nalaka.jpg"
//     },
//     {
//       name: "MR. D.L.D. MADUSHAN",
//       position: "Director of Training",
//       image: "/team_images/Madushan.jpg"
//     }
//   ];
  
//   const [ceoMember, ...otherMembers] = teamMembers;
//   const firstRowMembers = otherMembers.slice(0, 3);
//   const secondRowMembers = otherMembers.slice(3);
  
//   return (
//     <div className="min-h-screen px-4 py-16 mb-20 bg-white sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-7xl">
//         {/* Header Section */}
//         <div className="mb-16 text-center">
//           <h2 className="text-4xl font-bold text-[#2543B1] mb-4">
//             Meet Our Leadership Team
//           </h2>
//           <div className="w-24 h-1 mx-auto mb-6 bg-blue-300"></div>
//           <p className="text-lg text-[#2D387D] max-w-2xl mx-auto">
//             We are guided by visionary leaders dedicated to excellence and innovation in Sri Lanka's professional landscape.
//           </p>
//         </div>
        
//         {/* Main Team Grid */}
//         <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
//           {/* Chairman Column (Left Side - Full Height) */}
//           <div className="flex justify-center lg:col-span-1 lg:justify-end">
//             <div className="h-full animate-fadeIn">
//               <TeamMember 
//                 member={ceoMember} 
//                 isChairman={true} 
//                 isLarge={true} 
//               />
//             </div>
//           </div>
          
//           {/* Team Members Grid (Right Side) */}
//           <div className="lg:col-span-3">
//             <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
//               {/* First Row */}
//               {firstRowMembers.map((member, index) => (
//                 <div 
//                   key={index} 
//                   className="animate-fadeIn"
//                   style={{ animationDelay: `${index * 100}ms` }}
//                 >
//                   <TeamMember member={member} />
//                 </div>
//               ))}
              
//               {/* Second Row */}
//               {secondRowMembers.map((member, index) => (
//                 <div 
//                   key={index + 3} 
//                   className="animate-fadeIn"
//                   style={{ animationDelay: `${(index + 3) * 100}ms` }}
//                 >
//                   <TeamMember member={member} />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Animation Styles */}
//       <style jsx global>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.6s ease-out forwards;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Team;

import { motion } from "framer-motion";
import React from "react";

const CrownIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className="w-5 h-5 mr-1"
  >
    <path d="M11.645 20.91l-3.994-4.341A4.775 4.775 0 0 1 6 12.739V4.262a2.25 2.25 0 0 1 1.897-2.212l5.151-.916a2.252 2.252 0 0 1 1.904 1.639l1.693 5.958a3.852 3.852 0 0 0 2.174 2.456l.459.222a3.888 3.888 0 0 1 2.256 3.564V19.5a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-1.538c0-.836.223-1.666.633-2.395l.622-1.162a4.75 4.75 0 0 1 1.358-1.543l.419-.335z" />
  </svg>
);

const TeamMember = ({ member, isChairman = false, isLarge = false }) => {
  return (
    <motion.div
      className={`
        bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 
        transform hover:-translate-y-2 border border-blue-50 overflow-hidden 
        group relative flex flex-col
        ${isLarge ? 'w-full max-w-[500px] h-[700px]' : 'w-full max-w-[350px] h-[480px]'}
        hover:border-blue-200
      `}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {isChairman && (
        <div className="absolute z-10 top-4 right-4 animate-pulse">
          <div className="flex items-center px-3 py-1 text-xs font-semibold text-white rounded-full shadow-md bg-gradient-to-r from-amber-500 to-amber-600">
            Chairman
          </div>
        </div>
      )}
      
      <div className="relative flex self-center justify-center mt-5 mb-6">
        <div className={`
          rounded-full overflow-hidden border-4 border-blue-100 
          group-hover:border-blue-300 transition-all duration-500
          ${isLarge ? 'w-[280px] h-[400px]' : 'w-[230px] h-[280px]'}
          shadow-inner
        `}>
          <img
            src={member.image}
            alt={member.name}
            className="object-cover w-full h-full transition-transform duration-500 transform group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>
      
      <div className={`
        p-6 bg-gradient-to-b from-[#F0F4FF] to-blue-50 text-center 
        flex-grow flex flex-col justify-center space-y-3
        group-hover:from-blue-50 group-hover:to-blue-100 transition-colors duration-500
        ${isLarge ? 'space-y-4' : 'space-y-3'}
      `}>
        <h3 className={`
          text-[#2543B1] font-bold group-hover:text-blue-900 
          transition-colors duration-300 line-clamp-2
          ${isLarge ? 'text-2xl' : 'text-xl'}
        `}>
          {member.name}
        </h3>
        <div className="w-20 h-px mx-auto transition-colors duration-300 bg-blue-200 group-hover:bg-blue-300"></div>
        <p className={`
          text-[#2D387D] font-semibold group-hover:text-blue-700 
          transition-colors duration-300
          ${isLarge ? 'text-lg' : 'text-base'}
        `}>
          {member.position}
        </p>
      </div>
    </motion.div>
  );
};

const Team = () => {
  const teamMembers = [
    {
      name: "MR. K M L SAMANCHANDRA",
      position: "Chairman",
      image: "/team_images/Samanchandra.jpg"
    },
    {
      name: "MR. PRABAHERAN SOLOMON",
      position: "Director Planning",
      image: "/team_images/Prabaheran.jpg"
    },
    {
      name: "MR. HESHAN",
      position: "Director (Administration & HR)",
      image: "/team_images/Heshan.jpg"
    },
    {
      name: "MR. LAKITHA DILSHAN",
      position: "Director of Membership and Accreditation",
      image: "/team_images/Lakitha.jpg"
    },
    {
      name: "MR. LAKMAL PERERA",
      position: "Director of Quality",
      image: "/team_images/Lakmal.jpg"
    },
    {
      name: "MR. NALAKA PRABATH",
      position: "Director (Finance and Operation)",
      image: "/team_images/Nalaka.jpg"
    },
    {
      name: "MR. D.L.D. MADUSHAN",
      position: "Director of Training",
      image: "/team_images/Madushan.jpg"
    }
  ];
  
  const [ceoMember, ...otherMembers] = teamMembers;
  const firstRowMembers = otherMembers.slice(0, 3);
  const secondRowMembers = otherMembers.slice(3);

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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen px-4 py-16 mb-20 bg-white sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <motion.div 
          className="mb-16 text-center"
          variants={itemVariants}
        >
          <h2 className="text-4xl font-bold text-[#2543B1] mb-4">
            Meet Our Leadership Team
          </h2>
          <div className="w-24 h-1 mx-auto mb-6 bg-blue-300"></div>
          <p className="text-lg text-[#2D387D] max-w-2xl mx-auto">
            We are guided by visionary leaders dedicated to excellence and innovation in Sri Lanka's professional landscape.
          </p>
        </motion.div>
        
        {/* Main Team Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
          {/* Chairman Column (Left Side - Full Height) */}
          <motion.div 
            className="flex justify-center lg:col-span-1 lg:justify-end"
            variants={itemVariants}
          >
            <TeamMember 
              member={ceoMember} 
              isChairman={true} 
              isLarge={true} 
            />
          </motion.div>
          
          {/* Team Members Grid (Right Side) */}
          <motion.div 
            className="flex justify-center lg:justify-none lg:col-span-3"
            variants={containerVariants}
          >
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* First Row */}
              {firstRowMembers.map((member, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  custom={index}
                >
                  <TeamMember member={member} />
                </motion.div>
              ))}
              
              {/* Second Row */}
              {secondRowMembers.map((member, index) => (
                <motion.div 
                  key={index + 3} 
                  variants={itemVariants}
                  custom={index + 3}
                >
                  <TeamMember member={member} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Team;