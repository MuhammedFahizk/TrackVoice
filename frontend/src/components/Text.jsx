import React from 'react';
import { motion } from 'framer-motion';

const Text = ({ className, children, style }) => {
  return (
    <motion.div
      className={`text-white text-lg font-mono  ${className}`} // Default text color and size
      style={style}
      initial={{ y: 20, opacity: 0 }} // Initial state for animation
      animate={{ y: 0, opacity: 1 }} // End state for animation
      transition={{ duration: 0.5 }} // Animation duration
    >
      {children}
    </motion.div>
  );
};

export default Text;
