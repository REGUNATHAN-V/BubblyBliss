import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import '../css/Herosection.css';
 
const HeroSection = () => {
  const name = useSelector((state) => state.user.name);

  return (
    <div className="hero-container">
      {/* <video autoPlay muted loop playsInline className="bg-video">
        <source src="https://videos.pexels.com/video-files/4622774/4622774-uhd_1440_2560_30fps.mp4" type="video/mp4" />
      </video> */}

      <div className="gradient-overlay"></div>

     <div className="hero-content layout-split">
  {/* LEFT COLUMN */}
  <div className="hero-left">
    <motion.h1
      className="hero-heading"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      Welcome {name || 'Guest'}
    </motion.h1>

    <motion.p
      className="hero-subtext"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.8 }}
    >
      Elevate your skincare routine with our handcrafted natural soaps.
    </motion.p>

    <motion.div
      className="hero-buttons"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.8 }}
    >
      <a href="/shop" className="hero-button">Shop Now</a>
      <a href="/about" className="hero-button secondary">Why Us</a>
    </motion.div>
    <motion.div
  className="hero-mission"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1, duration: 1 }}
>
  Every soap you buy supports local artisans and a cleaner planet.
</motion.div>
  </div>

  {/* RIGHT COLUMN */}
  <div className="hero-right">
    <motion.div className="feature-box" whileHover={{ scale: 1.05 }}>
      <img src="soapleaf.png" alt="soapimg" className="soapleaf"/>
    </motion.div>
    {/* <motion.div className="feature-box" whileHover={{ scale: 1.05 }}>
      🧼 Skin-Safe Formula
    </motion.div>
    <motion.div className="feature-box" whileHover={{ scale: 1.05 }}>
      🌍 Plastic-Free Packaging
    </motion.div> */}
  </div>
</div>

{/* BOTTOM MISSION */}

</div>
  );
};

export default HeroSection;
