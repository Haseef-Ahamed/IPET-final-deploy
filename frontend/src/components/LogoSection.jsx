import { motion } from "framer-motion";
import IESL from "../assets/IESL.svg";
import ECSL from "../assets/ECSL.svg";
import IIESL from "../assets/IIESL.svg";

const LogoSection = () => {
  const logos = [
    { id: 1, src: IESL, alt: "IESL Logo", width: "104", link: "https://iesl.lk/index.php?lang=en" },
    { id: 2, src: ECSL, alt: "ECSL Logo", width: "240", link: "https://ecsl.gov.lk/" },
    { id: 3, src: IIESL, alt: "IIESL Logo", width: "112", link: "https://iiesl.lk/" },
  ];

  const mobileLogos = [
    { id: 1, src: IESL, alt: "IESL Logo", width: "55", link: "https://iesl.lk/index.php?lang=en" },
    { id: 2, src: ECSL, alt: "ECSL Logo", width: "150", link: "https://ecsl.gov.lk/" },
    { id: 3, src: IIESL, alt: "IIESL Logo", width: "55", link: "https://iiesl.lk/" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.2,
      },
    },
  };

  const logoVariants = {
    hidden: {
      opacity: 0,
      x: -200,
      y: 40,
      scale: 0.6,
      rotate: -10,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 90,
        duration: 1.1,
      },
    },
    hover: {
      scale: 1.15,
      rotate: 2,
      y: -8,
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      {/* DESKTOP */}
      <motion.section
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="hidden pt-12 pb-32 bg-white md:block"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6"
        >
          <div className="flex items-center justify-center gap-20 lg:gap-32">
            {logos.map((logo) => (
              <motion.a
                key={logo.id}
                href={logo.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={logoVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                className="block"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-auto object-contain transition-all duration-300 hover:brightness-110"
                  style={{ width: `${logo.width}px` }}
                />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* MOBILE */}
      <motion.section
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="pt-10 pb-40 bg-white md:hidden"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          <div className="flex items-center justify-center gap-8 px-8">
            {mobileLogos.map((logo) => (
              <motion.a
                key={logo.id}
                href={logo.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={logoVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                className="block"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-auto object-contain transition-all duration-300 hover:brightness-110"
                  style={{ width: `${logo.width}px` }}
                />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.section>
    </>
  );
};

export default LogoSection;
