// src/components/WhyChooseUs.jsx
import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

const benefits = [
  {
    id: 1,
    title: 'Global Network',
    description: 'Connected to over 20 countries with strategic partnerships worldwide, ensuring your cargo reaches any destination.',
    icon: (
      <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    animation: {
      initial: { opacity: 0, scale: 0.8, rotate: -10 },
      animate: { opacity: 1, scale: 1, rotate: 0 },
      transition: { duration: 0.8, delay: 0.1 }
    },
    perk: '120+ Countries'
  },
  {
    id: 2,
    title: '24/7 Support',
    description: 'Round-the-clock customer service team ready to assist you with any inquiries or urgent situations, anytime, anywhere.',
    icon: (
      <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    animation: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.8, delay: 0.3 }
    },
    perk: 'Always Available'
  },
  {
    id: 3,
    title: 'Competitive Rates',
    description: 'Cost-effective solutions without compromising on quality, offering you the best value for your logistics investment.',
    icon: (
      <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    animation: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.8, delay: 0.5 }
    },
    perk: 'Best Value'
  }
];

// Custom component for animated globe
const AnimatedGlobe = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  useEffect(() => {
    if (isInView) {
      controls.start({
        rotate: [0, 360],
        transition: { 
          repeat: Infinity, 
          duration: 60, 
          ease: "linear" 
        }
      });
    }
  }, [isInView, controls]);
  
  return (
    <motion.div 
      ref={ref}
      animate={controls}
      className="absolute -z-10 opacity-5 w-full h-full"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-primary-700">
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
        <path d="M12 4C7.589 4 4 7.589 4 12s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm-5 8c0-2.757 2.243-5 5-5 .104 0 .205.01.31.015C13.02 5.587 14 5 15 5c1.654 0 3 1.346 3 3s-1.346 3-3 3c-.353 0-.686-.076-1-.18V12c0 1.103-.897 2-2 2s-2-.897-2-2h-1c0 1.654 1.346 3 3 3 .795 0 1.551-.313 2.114-.876.563.563 1.319.876 2.114.876C17.654 16 19 14.654 19 13s-1.346-3-3-3c-.795 0-1.551.313-2.114.876-.563-.563-1.319-.876-2.114-.876-.262 0-.517.036-.76.1-.019-.033-.046-.062-.065-.094.013-.211.039-.417.039-.633C11 8.244 10.756 8 10.5 8h-1C9.224 8 9 7.776 9 7.5S9.224 7 9.5 7h1c.078 0 .25.012.25-.047-.186-.68-.4-1.343-.663-1.987C8.53 5.358 7.73 6.5 7.5 7c-.121.262-.093.552.071.745.115.136.206.29.284.452C7.625 8.322 7.442 8.5 7.2 8.5h-.4c-.444 0-.844.338-.9.78C7.313 8.95 7 9.433 7 10c0 .552.448 1 1 1v1z"></path>
      </svg>
    </motion.div>
  );
};

const WhyChooseUs = () => {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white to-primary-50 relative overflow-hidden">
      <AnimatedGlobe />
      
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary-100 text-primary-700 font-medium mb-3">
            Our Advantages
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-800 mb-4 font-display">
            Why Choose <span className="text-primary-600">Us?</span>
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Experience excellence in logistics with Vishal Logistics Solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.id}
              initial={benefit.animation.initial}
              whileInView={benefit.animation.animate}
              viewport={{ once: true }}
              transition={benefit.animation.transition}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white rounded-2xl shadow-card p-8 text-center hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
            >
              {/* Accent color */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-primary-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              
              {/* Feature perk tag */}
              <div className="absolute top-4 right-4 bg-primary-50 text-primary-700 text-xs font-bold px-2 py-1 rounded-full">
                {benefit.perk}
              </div>
              
              <div className="flex justify-center mb-6">
                <motion.div 
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    duration: 2,
                    delay: benefit.id * 0.5
                  }}
                  className="p-4 rounded-full bg-primary-50"
                >
                  {benefit.icon}
                </motion.div>
              </div>
              <h3 className="text-xl font-bold text-secondary-800 mb-3 font-display">{benefit.title}</h3>
              <p className="text-secondary-600">{benefit.description}</p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 + benefit.id * 0.2 }}
                className="mt-6"
              >
                <a href="#contact" className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 group">
                  Learn more
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;