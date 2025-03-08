// src/components/StatsCounter.jsx
import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { 
    id: 1, 
    value: 15, 
    label: 'Years in Business', 
    symbol: '+',
    color: 'from-blue-500 to-blue-600', 
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  { 
    id: 2, 
    value: 20, 
    label: 'Countries Served', 
    symbol: '+',
    color: 'from-green-500 to-green-600',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  { 
    id: 3, 
    value: 500, 
    label: 'Shipments Completed', 
    symbol: '+',
    color: 'from-purple-500 to-purple-600',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    )
  },
  { 
    id: 4, 
    value: 100, 
    label: 'Satisfied Clients', 
    symbol: '+',
    color: 'from-pink-500 to-pink-600',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
      </svg>
    )
  },
];

const Counter = ({ value, label, symbol, color, icon, index }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (isInView) {
      let startTime;
      const duration = 2000; // 2 seconds duration
      
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const currentCount = Math.floor(progress * value);
        
        setCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isInView, value]);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="relative"
    >
      <div className="bg-white rounded-2xl shadow-card p-8 text-center relative overflow-hidden card-hover">
        {/* Top accent line */}
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${color}`}></div>
        
        <div className="flex justify-center mb-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white bg-gradient-to-r ${color}`}>
            {icon}
          </div>
        </div>
        
        <div className="text-4xl md:text-5xl font-bold font-display mb-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">{count}{symbol}</span>
        </div>
        <div className="text-lg text-secondary-600">{label}</div>
      </div>
    </motion.div>
  );
};

const StatsCounter = () => {
  return (
    <section className="py-20 bg-secondary-50 relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary-200 opacity-20"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-accent-200 opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary-100 text-primary-700 font-medium mb-3">
            Our Achievements
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 mb-4 font-display">
            Growing <span className="text-primary-600">Together</span>
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Counter
              key={stat.id}
              value={stat.value}
              label={stat.label}
              symbol={stat.symbol}
              color={stat.color}
              icon={stat.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;