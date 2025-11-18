import { motion } from "framer-motion";
import about_bg from "../assets/Membeship_bg_n.svg";
import about_bg_m from "../assets/Membeship_bg_n.svg";
import { useNavigate } from "react-router-dom";

// Card Animation
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
  hover: { y: -8, transition: { duration: 0.3 } }
};

const ProgramCard = ({ title, logo, description }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover="hover"
      className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300"
    >
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
          <motion.img
            src={logo}
            alt={title}
            className="object-contain max-h-44"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Content Section */}
        <div className="p-6 text-center">
          <h3 className="text-2xl font-bold text-[#2543B1] mb-3">
            {title}
          </h3>
          <p className="text-sm text-[#2D387D] mb-6 leading-relaxed px-4">
            {description}
          </p>
          <motion.button
            onClick={() => navigate("/register")}
            className="px-8 py-3 bg-[#2D387D] text-white font-medium rounded-lg hover:bg-[#1e2655] transition shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Apply Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const Membership = () => {
  const programs = [
    {
      title: "Youth Club",
      description: "Elevate your engineering journey by joining our Youth Club! Connect with like-minded peers, gain valuable insights, and make a real difference in our community.",
      logo: "/robin.png",
    },
    {
      title: "FRIC",
      description: "Elevate your engineering journey by joining FRIC! Develop strategic solutions to real-world challenges and make a real difference in our community.",
      logo: "/flip2.png",
    },
    {
      title: "Tech Innovation",
      description: "Elevate your engineering journey by joining our Tech Innovation hub! Explore cutting-edge solutions and make a real difference in our community.",
      logo: "/feather.png",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <>
      {/* ==================== DESKTOP & TABLET VIEW ==================== */}
      <div className="hidden md:block">
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative h-[320px]"
        >
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img src={about_bg} alt="Membership" className="absolute inset-0 w-full h-full object-cover" />
          <div className="relative z-20 h-full max-w-7xl mx-auto px-8 flex items-center">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-6xl font-bold text-white"
            >
              Membership
            </motion.h1>
          </div>
        </motion.div>

        {/* Desktop Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50"
        >
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {programs.map((program, i) => (
                <ProgramCard key={i} {...program} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ==================== MOBILE VIEW – VERTICAL STACK + EXTRA BOTTOM MARGIN ON LAST CARD ==================== */}
      <div className="md:hidden">
        {/* Mobile Hero */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative h-64"
        >
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img src={about_bg_m} alt="Membership" className="absolute inset-0 w-full h-full object-cover" />
          <div className="relative z-20 h-full flex items-center px-6">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              className="text-4xl font-bold text-white"
            >
              Membership
            </motion.h1>
          </div>
        </motion.div>

        {/* Mobile Cards – Stacked Vertically */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-12 bg-gradient-to-br from-blue-50 to-indigo-50 px-6 mb-20"
        >
          <div className="space-y-10 max-w-md mx-auto">
            {programs.map((program, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                // Extra bottom margin only on the last card
                className={i === programs.length - 1 ? "mb-20 md:mb-24" : ""}
              >
                <ProgramCard {...program} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Membership;