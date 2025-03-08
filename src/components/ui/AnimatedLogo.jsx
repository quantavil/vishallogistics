import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AnimatedLogo = () => {
  return (
    <motion.div 
      className="flex items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo Container */}
      <div className="flex items-center">
        {/* Icon/Symbol */}
        <motion.div 
          className="relative mr-2 flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-400 rounded-lg shadow-lg"
          whileHover={{ 
            scale: 1.05,
            rotate: 5,
            transition: { duration: 0.2 }
          }}
        >
          {/* Animated truck icon */}
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ 
              delay: 0.2,
              duration: 0.5,
              type: "spring",
              stiffness: 100
            }}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" 
            />
          </motion.svg>
        </motion.div>
        
        {/* Text Part */}
        <div className="flex flex-col">
          {/* Company Name */}
          <motion.div 
            className="flex"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span 
              className="text-2xl font-bold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              V
            </motion.span>
            <motion.span 
              className="text-2xl font-bold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              i
            </motion.span>
            <motion.span 
              className="text-2xl font-bold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              s
            </motion.span>
            <motion.span 
              className="text-2xl font-bold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.4 }}
            >
              h
            </motion.span>
            <motion.span 
              className="text-2xl font-bold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              a
            </motion.span>
            <motion.span 
              className="text-2xl font-bold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.4 }}
            >
              l
            </motion.span>
          </motion.div>
          
          {/* Tagline */}
          <motion.p 
            className="text-xs text-primary-300"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
          >
            Logistics Solutions
          </motion.p>
        </div>
      </div>
      
      {/* Animated Underline */}
      <motion.div 
        className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary-500 to-transparent"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ delay: 0.8, duration: 0.5 }}
      />
    </motion.div>
  );
};

export default AnimatedLogo;