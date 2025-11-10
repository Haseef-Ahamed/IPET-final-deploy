/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// import React from "react";
// import { useNavigate } from "react-router-dom";

// const LegalPolicy = () => {
//   const navigate = useNavigate();

//   return (
//     <div
//       style={{
//         backgroundImage: 'url("https://www.ipet.lk/assets/skyscrapers-sunset-CK4hRmNk.jpg")',
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         display: "flex",
//         justifyContent: "center",
//         paddingTop: "2rem",
//         paddingBottom: "8rem",
//       }}
//     >
//       {/* Desktop view */}
//       <div className="hidden md:block">
//         <div className="w-[800px] max-w-4xl p-12 space-y-8 bg-[#E9ECF7] rounded-lg shadow-md">
//           <div className="space-y-4 text-center">
//             <h1 className="text-3xl font-semibold text-[#2543B1]">
//               iPET Legal Policy
//             </h1>
//           </div>

//           <div className="space-y-6 text-[#2D387D]">
//             <section>
//               <h2 className="text-xl font-semibold text-[#2543B1] mb-2">Terms of Service</h2>
//               <p>By accessing and using the iPET website and services, you agree to comply with and be bound by these terms. If you do not agree with any part of these terms, you must not use our services.</p>
//             </section>

//             <section>
//               <h2 className="text-xl font-semibold text-[#2543B1] mb-2">User Responsibilities</h2>
//               <p>Users are responsible for:</p>
//               <ul className="pl-6 mt-2 list-disc">
//                 <li>Providing accurate and complete information</li>
//                 <li>Maintaining the confidentiality of account credentials</li>
//                 <li>Using services in compliance with all applicable laws</li>
//                 <li>Not engaging in fraudulent or harmful activities</li>
//               </ul>
//             </section>

//             <section>
//               <h2 className="text-xl font-semibold text-[#2543B1] mb-2">Intellectual Property</h2>
//               <p>All content, trademarks, logos, and software on this website are the property of iPET or its licensors and are protected by intellectual property laws. Unauthorized use is prohibited.</p>
//             </section>

//             <section>
//               <h2 className="text-xl font-semibold text-[#2543B1] mb-2">Limitation of Liability</h2>
//               <p>iPET shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our services, even if advised of the possibility of such damages.</p>
//             </section>

//             <section>
//               <h2 className="text-xl font-semibold text-[#2543B1] mb-2">Service Modifications</h2>
//               <p>We reserve the right to modify, suspend, or discontinue any part of our services at any time without prior notice. We are not liable for any such changes.</p>
//             </section>

//             <section>
//               <h2 className="text-xl font-semibold text-[#2543B1] mb-2">Governing Law</h2>
//               <p>These terms shall be governed by and construed in accordance with the laws of Sri Lanka. Any disputes shall be subject to the exclusive jurisdiction of the courts in Colombo.</p>
//             </section>

//             <section>
//               <h2 className="text-xl font-semibold text-[#2543B1] mb-2">Termination</h2>
//               <p>We may terminate or suspend access to our services immediately, without prior notice, for any breach of these terms.</p>
//             </section>

//             <section>
//               <h2 className="text-xl font-semibold text-[#2543B1] mb-2">Changes to Terms</h2>
//               <p>We may update these terms periodically. Continued use of our services after changes constitutes acceptance of the new terms.</p>
//             </section>

//             <section>
//               <h2 className="text-xl font-semibold text-[#2543B1] mb-2">Contact Information</h2>
//               <p>For any legal inquiries, please contact us at legal@ipet.lk.</p>
//             </section>

//             <p className="pt-4 text-sm text-gray-600">Last updated: March 23, 2025</p>

//             <div className="pt-4 text-center">
//               <button
//                 type="button"
//                 onClick={() => navigate("/")}
//                 className="bg-[#2D387D] text-white py-3 px-6 rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//               >
//                 Return to Home
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile view */}
//       <div className="md:hidden">
//         <div className="w-[380px] max-w-3xl p-8 space-y-6 bg-[#E9ECF7] rounded-lg shadow-md">
//           <div className="space-y-4 text-center">
//             <h1 className="text-xl font-semibold text-[#2543B1]">
//               iPET Legal Policy
//             </h1>
//           </div>

//           <div className="space-y-4 text-[#2D387D] text-sm">
//             <section>
//               <h2 className="text-lg font-semibold text-[#2543B1] mb-1">Terms of Service</h2>
//               <p>By using iPET services, you agree to comply with our terms. If you disagree, you must not use our services.</p>
//             </section>

//             <section>
//               <h2 className="text-lg font-semibold text-[#2543B1] mb-1">User Responsibilities</h2>
//               <ul className="pl-5 mt-1 text-xs list-disc">
//                 <li>Provide accurate information</li>
//                 <li>Keep account details secure</li>
//                 <li>Comply with all laws</li>
//                 <li>Avoid fraudulent activities</li>
//               </ul>
//             </section>

//             <section>
//               <h2 className="text-lg font-semibold text-[#2543B1] mb-1">Intellectual Property</h2>
//               <p>All content and trademarks belong to iPET and are protected by law.</p>
//             </section>

//             <section>
//               <h2 className="text-lg font-semibold text-[#2543B1] mb-1">Limitation of Liability</h2>
//               <p>iPET is not liable for indirect or consequential damages from service use.</p>
//             </section>

//             <section>
//               <h2 className="text-lg font-semibold text-[#2543B1] mb-1">Governing Law</h2>
//               <p>These terms are governed by Sri Lankan law, with disputes settled in Colombo courts.</p>
//             </section>

//             <section>
//               <h2 className="text-lg font-semibold text-[#2543B1] mb-1">Contact Us</h2>
//               <p>For legal inquiries, contact legal@ipet.lk.</p>
//             </section>

//             <p className="pt-2 text-xs text-gray-600">Last updated: March 23, 2025</p>

//             <div className="pt-2 text-center">
//               <button
//                 type="button"
//                 onClick={() => navigate("/")}
//                 className="bg-[#2D387D] text-white py-2 px-4 text-sm rounded-md hover:bg-blue-900 focus:outline-none"
//               >
//                 Return to Home
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LegalPolicy;

import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import bg from "../assets/skyscrapers-sunset-CK4hRmNk.jpg"

const LegalPolicy = () => {
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const sectionVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        // backgroundImage: 'url("https://www.ipet.lk/assets/skyscrapers-sunset-CK4hRmNk.jpg")',
        backgroundImage: `url("${bg}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        paddingTop: "2rem",
        paddingBottom: "8rem",
        minHeight: "100vh"
      }}
    >
      {/* Desktop view */}
      <div className="hidden md:block">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
          variants={containerVariants}
          className="w-[800px] max-w-4xl p-12 space-y-8 bg-[#E9ECF7] rounded-lg shadow-md"
        >
          <motion.div variants={itemVariants} className="space-y-4 text-center">
            <h1 className="text-3xl font-semibold text-[#2543B1]">
              iPET Legal Policy
            </h1>
          </motion.div>

          <motion.div variants={containerVariants} className="space-y-6 text-[#2D387D]">
            <motion.section variants={sectionVariants}>
              <h2 className="text-xl font-semibold text-[#2543B1] mb-2">Terms of Service</h2>
              <p>By accessing and using the iPET website and services, you agree to comply with and be bound by these terms. If you do not agree with any part of these terms, you must not use our services.</p>
            </motion.section>

            <motion.section variants={sectionVariants}>
              <h2 className="text-xl font-semibold text-[#2543B1] mb-2">User Responsibilities</h2>
              <p>Users are responsible for:</p>
              <motion.ul 
                variants={containerVariants}
                className="pl-6 mt-2 list-disc"
              >
                <motion.li variants={itemVariants}>Providing accurate and complete information</motion.li>
                <motion.li variants={itemVariants}>Maintaining the confidentiality of account credentials</motion.li>
                <motion.li variants={itemVariants}>Using services in compliance with all applicable laws</motion.li>
                <motion.li variants={itemVariants}>Not engaging in fraudulent or harmful activities</motion.li>
              </motion.ul>
            </motion.section>

            <motion.section variants={sectionVariants}>
              <h2 className="text-xl font-semibold text-[#2543B1] mb-2">Intellectual Property</h2>
              <p>All content, trademarks, logos, and software on this website are the property of iPET or its licensors and are protected by intellectual property laws. Unauthorized use is prohibited.</p>
            </motion.section>

            <motion.section variants={sectionVariants}>
              <h2 className="text-xl font-semibold text-[#2543B1] mb-2">Limitation of Liability</h2>
              <p>iPET shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our services, even if advised of the possibility of such damages.</p>
            </motion.section>

            <motion.section variants={sectionVariants}>
              <h2 className="text-xl font-semibold text-[#2543B1] mb-2">Service Modifications</h2>
              <p>We reserve the right to modify, suspend, or discontinue any part of our services at any time without prior notice. We are not liable for any such changes.</p>
            </motion.section>

            <motion.section variants={sectionVariants}>
              <h2 className="text-xl font-semibold text-[#2543B1] mb-2">Governing Law</h2>
              <p>These terms shall be governed by and construed in accordance with the laws of Sri Lanka. Any disputes shall be subject to the exclusive jurisdiction of the courts in Colombo.</p>
            </motion.section>

            <motion.section variants={sectionVariants}>
              <h2 className="text-xl font-semibold text-[#2543B1] mb-2">Termination</h2>
              <p>We may terminate or suspend access to our services immediately, without prior notice, for any breach of these terms.</p>
            </motion.section>

            <motion.section variants={sectionVariants}>
              <h2 className="text-xl font-semibold text-[#2543B1] mb-2">Changes to Terms</h2>
              <p>We may update these terms periodically. Continued use of our services after changes constitutes acceptance of the new terms.</p>
            </motion.section>

            <motion.section variants={sectionVariants}>
              <h2 className="text-xl font-semibold text-[#2543B1] mb-2">Contact Information</h2>
              <p>For any legal inquiries, please contact us at legal@ipet.lk.</p>
            </motion.section>

            <motion.p 
              variants={itemVariants}
              className="pt-4 text-sm text-gray-600"
            >
              Last updated: March 23, 2025
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="pt-4 text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => navigate("/")}
                className="bg-[#2D387D] text-white py-3 px-6 rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Return to Home
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile view */}
      <div className="md:hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-20px" }}
          variants={containerVariants}
          className="w-[380px] max-w-3xl p-6 space-y-4 bg-[#E9ECF7] rounded-lg shadow-md mx-4"
        >
          <motion.div variants={itemVariants} className="space-y-2 text-center">
            <h1 className="text-xl font-semibold text-[#2543B1]">
              iPET Legal Policy
            </h1>
          </motion.div>

          <motion.div variants={containerVariants} className="space-y-4 text-[#2D387D] text-sm">
            <motion.section variants={sectionVariants}>
              <h2 className="text-lg font-semibold text-[#2543B1] mb-1">Terms of Service</h2>
              <p>By using iPET services, you agree to comply with our terms. If you disagree, you must not use our services.</p>
            </motion.section>

            <motion.section variants={sectionVariants}>
              <h2 className="text-lg font-semibold text-[#2543B1] mb-1">User Responsibilities</h2>
              <motion.ul 
                variants={containerVariants}
                className="pl-5 mt-1 text-xs list-disc"
              >
                <motion.li variants={itemVariants}>Provide accurate information</motion.li>
                <motion.li variants={itemVariants}>Keep account details secure</motion.li>
                <motion.li variants={itemVariants}>Comply with all laws</motion.li>
                <motion.li variants={itemVariants}>Avoid fraudulent activities</motion.li>
              </motion.ul>
            </motion.section>

            <motion.section variants={sectionVariants}>
              <h2 className="text-lg font-semibold text-[#2543B1] mb-1">Intellectual Property</h2>
              <p>All content and trademarks belong to iPET and are protected by law.</p>
            </motion.section>

            <motion.section variants={sectionVariants}>
              <h2 className="text-lg font-semibold text-[#2543B1] mb-1">Limitation of Liability</h2>
              <p>iPET is not liable for indirect or consequential damages from service use.</p>
            </motion.section>

            <motion.section variants={sectionVariants}>
              <h2 className="text-lg font-semibold text-[#2543B1] mb-1">Governing Law</h2>
              <p>These terms are governed by Sri Lankan law, with disputes settled in Colombo courts.</p>
            </motion.section>

            <motion.section variants={sectionVariants}>
              <h2 className="text-lg font-semibold text-[#2543B1] mb-1">Contact Us</h2>
              <p>For legal inquiries, contact legal@ipet.lk.</p>
            </motion.section>

            <motion.p 
              variants={itemVariants}
              className="pt-2 text-xs text-gray-600"
            >
              Last updated: March 23, 2025
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="pt-2 text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => navigate("/")}
                className="bg-[#2D387D] text-white py-2 px-4 text-sm rounded-md hover:bg-blue-900 focus:outline-none"
              >
                Return to Home
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LegalPolicy;