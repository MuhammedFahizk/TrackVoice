import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause } from 'react-icons/fa';

export const PlayButton = ({ onClick, isPlaying,className }) => {
  return (
    <motion.div
      className={`play-button w-20 h-8 p-1 rounded-full ${className}`}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}   // Scale the button on hover
      whileTap={{ scale: 0.9 }}     // Shrink the button slightly on click
      onClick={onClick}
      style={{
        backgroundColor: '#6B0000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.1 }}
      >
        {isPlaying ? (
          <FaPause className='text-xl text-white' /> // Show pause icon if playing
        ) : (
          <FaPlay className='text-xl text-white' /> // Show play icon if not playing
        )}
      </motion.div>
    </motion.div>
  );
};
