import React from 'react';
import { motion } from 'framer-motion';

const Div = ({ className, style, animateProps, children }) => {
  // Default animation settings (bottom to top)
  const defaultAnimation = {
    initial: { opacity: 0, y: 50 },  // Start 50px from bottom
    animate: { opacity: 1, y: 0 },   // Move to normal position (y = 0)
    exit: { opacity: 0, y: 50 },     // Optional exit animation (move down again)
    transition: { duration: 0.5 },   // Default duration for the animation
  };

  return (
    <motion.div
      className={className}        // Dynamic class name
      style={style}                // Inline style support
      initial={animateProps?.initial || defaultAnimation.initial}    // Override initial if provided
      animate={animateProps?.animate || defaultAnimation.animate}    // Override animate if provided
      exit={animateProps?.exit || defaultAnimation.exit}             // Override exit if provided
      transition={animateProps?.transition || defaultAnimation.transition} // Transition settings
    >
      {children}
    </motion.div>
  );
};

export default Div;
