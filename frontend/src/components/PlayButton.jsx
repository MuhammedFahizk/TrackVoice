import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause } from 'react-icons/fa';

export const PlayButton = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      className="play-button w-20 h-10 p-1  rounded-full"
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}   // Scale the button on hover
      whileTap={{ scale: 0.9 }}     // Shrink the button slightly on click
      onClick={handlePlayPause}
      style={{
        backgroundColor: '#1db954', // Spotify green color
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
        <FaPlay className='text-xl text-white'/>
      </motion.div>
    </motion.div>
  );
};
