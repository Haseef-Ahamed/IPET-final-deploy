/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
// /* eslint-disable react/no-unescaped-entities */
// /* eslint-disable no-unused-vars */
// import React from "react";
// import { useNavigate } from "react-router-dom";

// const PrivacyPolicy = () => {
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
//               iPET Privacy Policy
//             </h1>
//           </div>

//           <div className="space-y-6 text-[#2D387D]">
//             <section>
//               <h2 className="text-xl font-semibold text-[#2543B1] mb-2">Introduction</h2>
//               <p>Welcome to iPET. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website or use our services.</p>
//             </section>

//             <section>
//               <h2 className="text-xl font-semibold text-[#2543B1] mb-2">Information We Collect</h2>
//               <p>We may collect personal information such as your name, email address, phone number, membership number, and pet information when you register on our site, place an order, subscribe to our newsletter, or fill out a form.</p>
//             </section>

//             <section>
//               <h2 className="text-xl font-semibold text-[#2543B1] mb-2">How We Use Your Information</h2>
//               <p>We use the information we collect to:</p>
//               <ul className="pl-6 mt-2 list-disc">
//                 <li>Process transactions and provide requested services</li>
//                 <li>Personalize your experience on our site</li>
//                 <li>Improve our website and services</li>
//                 <li>Send periodic emails regarding your orders or other products and services</li>
//                 <li>Communicate with you about your pet's needs</li>
//               </ul>
//             </section>

//             <section>
//               <h2 className="text-xl font-semibold text-[#2543B1] mb-2">Information Security</h2>
//               <p>We implement appropriate security measures to protect your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights.</p>
//             </section>

//             <section>
//               <h2 className="text-xl font-semibold text-[#2543B1] mb-2">Cookies</h2>
//               <p>We use cookies to enhance your experience on our site. Cookies are small files that a site transfers to your computer's hard drive through your web browser that enables our systems to recognize your browser and capture certain information.</p>
//             </section>

//             <section>
//               <h2 className="text-xl font-semibold text-[#2543B1] mb-2">Third-Party Disclosure</h2>
//               <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties unless we provide users with advance notice or when required by law.</p>
//             </section>

//             <section>
//               <h2 className="text-xl font-semibold text-[#2543B1] mb-2">Children's Information</h2>
//               <p>Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.</p>
//             </section>

//             <section>
//               <h2 className="text-xl font-semibold text-[#2543B1] mb-2">Changes to Privacy Policy</h2>
//               <p>We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.</p>
//             </section>

//             <section>
//               <h2 className="text-xl font-semibold text-[#2543B1] mb-2">Contact Us</h2>
//               <p>If you have any questions about this privacy policy, please contact us at support@ipet.lk.</p>
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
//               iPET Privacy Policy
//             </h1>
//           </div>

//           <div className="space-y-4 text-[#2D387D] text-sm">
//             <section>
//               <h2 className="text-lg font-semibold text-[#2543B1] mb-1">Introduction</h2>
//               <p>Welcome to iPET. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information.</p>
//             </section>

//             <section>
//               <h2 className="text-lg font-semibold text-[#2543B1] mb-1">Information We Collect</h2>
//               <p>We may collect personal information such as your name, email address, phone number, membership number, and pet information when you use our services.</p>
//             </section>

//             <section>
//               <h2 className="text-lg font-semibold text-[#2543B1] mb-1">How We Use Your Information</h2>
//               <ul className="pl-5 mt-1 text-xs list-disc">
//                 <li>Process transactions and provide services</li>
//                 <li>Personalize your experience</li>
//                 <li>Improve our website and services</li>
//                 <li>Send periodic emails</li>
//                 <li>Communicate about your pet's needs</li>
//               </ul>
//             </section>

//             <section>
//               <h2 className="text-lg font-semibold text-[#2543B1] mb-1">Information Security</h2>
//               <p>We implement appropriate security measures to protect your personal information.</p>
//             </section>

//             <section>
//               <h2 className="text-lg font-semibold text-[#2543B1] mb-1">Cookies</h2>
//               <p>We use cookies to enhance your experience on our site.</p>
//             </section>

//             <section>
//               <h2 className="text-lg font-semibold text-[#2543B1] mb-1">Third-Party Disclosure</h2>
//               <p>We do not sell or trade your personally identifiable information.</p>
//             </section>

//             <section>
//               <h2 className="text-lg font-semibold text-[#2543B1] mb-1">Contact Us</h2>
//               <p>For questions about this policy, contact support@ipet.lk.</p>
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

// export default PrivacyPolicy;

import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import bg from "../assets/skyscrapers-sunset-CK4hRmNk.jpg";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const sectionVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
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
        minHeight: "100vh",
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
              iPET Privacy Policy
            </h1>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="space-y-6 text-[#2D387D]"
          >
            <motion.section variants={sectionVariants}>
              <h2 className="text-xl font-semibold text-[#2543B1] mb-2">
                Introduction
              </h2>
              <p>
                Welcome to iPET. We respect your privacy and are committed to
                protecting your personal data. This privacy policy explains how
                we collect, use, and safeguard your information when you visit
                our website or use our services.
              </p>
            </motion.section>

            <motion.section variants={sectionVariants}>
              <h2 className="text-xl font-semibold text-[#2543B1] mb-2">
                Information We Collect
              </h2>
              <p>
                We may collect personal information such as your name, email
                address, phone number, membership number, and pet information
                when you register on our site, place an order, subscribe to our
                newsletter, or fill out a form.
              </p>
            </motion.section>

            <motion.section variants={sectionVariants}>
              <h2 className="text-xl font-semibold text-[#2543B1] mb-2">
                How We Use Your Information
              </h2>
              <p>We use the information we collect to:</p>
              <motion.ul
                variants={containerVariants}
                className="pl-6 mt-2 list-disc"
              >
                <motion.li variants={itemVariants}>
                  Process transactions and provide requested services
                </motion.li>
                <motion.li variants={itemVariants}>
                  Personalize your experience on our site
                </motion.li>
                <motion.li variants={itemVariants}>
                  Improve our website and services
                </motion.li>
                <motion.li variants={itemVariants}>
                  Send periodic emails regarding your orders or other products
                  and services
                </motion.li>
                <motion.li variants={itemVariants}>
                  Communicate with you about your pet's needs
                </motion.li>
              </motion.ul>
            </motion.section>

            {/* Other sections with same pattern */}
            <motion.section variants={sectionVariants}>
              <h2 className="text-xl font-semibold text-[#2543B1] mb-2">
                Information Security
              </h2>
              <p>
                We implement appropriate security measures to protect your
                personal information. Your personal information is contained
                behind secured networks and is only accessible by a limited
                number of persons who have special access rights.
              </p>
            </motion.section>

            <motion.section variants={sectionVariants}>
              <h2 className="text-xl font-semibold text-[#2543B1] mb-2">
                Cookies
              </h2>
              <p>
                We use cookies to enhance your experience on our site. Cookies
                are small files that a site transfers to your computer's hard
                drive through your web browser that enables our systems to
                recognize your browser and capture certain information.
              </p>
            </motion.section>

            <motion.section variants={sectionVariants}>
              <h2 className="text-xl font-semibold text-[#2543B1] mb-2">
                Third-Party Disclosure
              </h2>
              <p>
                We do not sell, trade, or otherwise transfer your personally
                identifiable information to outside parties unless we provide
                users with advance notice or when required by law.
              </p>
            </motion.section>

            <motion.section variants={sectionVariants}>
              <h2 className="text-xl font-semibold text-[#2543B1] mb-2">
                Children's Information
              </h2>
              <p>
                Our website is not intended for children under 13 years of age.
                We do not knowingly collect personal information from children
                under 13.
              </p>
            </motion.section>

            <motion.section variants={sectionVariants}>
              <h2 className="text-xl font-semibold text-[#2543B1] mb-2">
                Changes to Privacy Policy
              </h2>
              <p>
                We may update our privacy policy from time to time. We will
                notify you of any changes by posting the new privacy policy on
                this page.
              </p>
            </motion.section>

            <motion.section variants={sectionVariants}>
              <h2 className="text-xl font-semibold text-[#2543B1] mb-2">
                Contact Us
              </h2>
              <p>
                If you have any questions about this privacy policy, please
                contact us at support@ipet.lk.
              </p>
            </motion.section>

            <motion.p
              variants={itemVariants}
              className="pt-4 text-sm text-gray-600"
            >
              Last updated: March 23, 2025
            </motion.p>

            <motion.div variants={itemVariants} className="pt-4 text-center">
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
              iPET Privacy Policy
            </h1>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="space-y-4 text-[#2D387D] text-sm"
          >
            <motion.section variants={sectionVariants}>
              <h2 className="text-lg font-semibold text-[#2543B1] mb-1">
                Introduction
              </h2>
              <p>
                Welcome to iPET. We respect your privacy and are committed to
                protecting your personal data. This privacy policy explains how
                we collect, use, and safeguard your information.
              </p>
            </motion.section>

            {/* Other mobile sections with same pattern */}
            <motion.section variants={sectionVariants}>
              <h2 className="text-lg font-semibold text-[#2543B1] mb-1">
                Information We Collect
              </h2>
              <p>
                We may collect personal information such as your name, email
                address, phone number, membership number, and pet information
                when you use our services.
              </p>
            </motion.section>

            <motion.section variants={sectionVariants}>
              <h2 className="text-lg font-semibold text-[#2543B1] mb-1">
                How We Use Your Information
              </h2>
              <motion.ul
                variants={containerVariants}
                className="pl-5 mt-1 text-xs list-disc"
              >
                <motion.li variants={itemVariants}>
                  Process transactions and provide services
                </motion.li>
                <motion.li variants={itemVariants}>
                  Personalize your experience
                </motion.li>
                <motion.li variants={itemVariants}>
                  Improve our website and services
                </motion.li>
                <motion.li variants={itemVariants}>
                  Send periodic emails
                </motion.li>
                <motion.li variants={itemVariants}>
                  Communicate about your pet's needs
                </motion.li>
              </motion.ul>
            </motion.section>

            <motion.section variants={sectionVariants}>
              <h2 className="text-lg font-semibold text-[#2543B1] mb-1">
                Information Security
              </h2>
              <p>
                We implement appropriate security measures to protect your
                personal information.
              </p>
            </motion.section>

            <motion.section variants={sectionVariants}>
              <h2 className="text-lg font-semibold text-[#2543B1] mb-1">
                Cookies
              </h2>
              <p>We use cookies to enhance your experience on our site.</p>
            </motion.section>

            <motion.section variants={sectionVariants}>
              <h2 className="text-lg font-semibold text-[#2543B1] mb-1">
                Third-Party Disclosure
              </h2>
              <p>
                We do not sell or trade your personally identifiable
                information.
              </p>
            </motion.section>

            <motion.section variants={sectionVariants}>
              <h2 className="text-lg font-semibold text-[#2543B1] mb-1">
                Contact Us
              </h2>
              <p>For questions about this policy, contact support@ipet.lk.</p>
            </motion.section>

            <motion.p
              variants={itemVariants}
              className="pt-2 text-xs text-gray-600"
            >
              Last updated: March 23, 2025
            </motion.p>

            <motion.div variants={itemVariants} className="pt-2 text-center">
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

export default PrivacyPolicy;
