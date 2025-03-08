import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ServicesCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef(null);

  // Services data with background images
  const services = [
    {
      id: 1,
      title: 'Customs Clearance',
      description: 'Expert handling of import/export documentation with regulatory compliance.',
      bgImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&q=80&w=2000',
      color: '#4361EE',
    },
    {
      id: 2,
      title: 'Ocean Freight',
      description: 'Reliable container shipping solutions with competitive rates for global logistics.',
      bgImage: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&q=80&w=2000',
      color: '#3A86FF',
    },
    {
      id: 3,
      title: 'Air Freight',
      description: 'Premium air cargo services for time-sensitive shipments worldwide.',
      bgImage: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&q=80&w=2000',
      color: '#7209B7',
    },
    {
      id: 4,
      title: 'Road Transport',
      description: 'Extensive ground transportation network offering reliable delivery services.',
      bgImage: 'https://images.unsplash.com/photo-1730189695336-9976f883421c?q=80&w=2070',
      color: '#F77F00',
    },
    {
      id: 5,
      title: 'Express Delivery',
      description: 'Ultra-fast shipping with guaranteed delivery windows for priority cargo.',
      bgImage: 'https://images.unsplash.com/photo-1687349699649-0bd5208f588d?q=80&w=2070',
      color: '#D90429',
    },
    {
      id: 6,
      title: 'Warehousing',
      description: 'Strategic storage facilities with advanced inventory management systems.',
      bgImage: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&q=80&w=2000',
      color: '#2A9D8F',
    },
  ];

  // Autoplay effect
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 3000);
    return () => clearTimeout(timeoutRef.current);
  }, [activeIndex, services.length]);

  // Navigation functions
  const goToSlide = (index) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveIndex(index);
  };

  const getPrevIndex = () => (activeIndex - 1 + services.length) % services.length;
  const getNextIndex = () => (activeIndex + 1) % services.length;

  // Determine each card's role based on activeIndex
  const getCardRole = (cardIndex, activeIndex, totalCards) => {
    const diff = (cardIndex - activeIndex + totalCards) % totalCards;
    if (diff === 0) return 'center';
    if (diff === 1) return 'right';
    if (diff === totalCards - 1) return 'left';
    return diff < totalCards / 2 ? 'hiddenRight' : 'hiddenLeft';
  };

  // Position and style variants for desktop cards
  const desktopPositions = {
    hiddenLeft: { left: -280, opacity: 0, scale: 0.8 },
    left: { left: 0, opacity: 0.85, scale: 0.92 },
    center: { left: 300, opacity: 1, scale: 1 },
    right: { left: 720, opacity: 0.85, scale: 0.92 },
    hiddenRight: { left: 1000, opacity: 0, scale: 0.8 },
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-medium tracking-wide uppercase mb-2">
              Logistics Excellence
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              Our Premium Services
            </h2>
            <div className="w-16 h-0.5 bg-blue-500 mx-auto"></div>
          </motion.div>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={services[activeIndex].id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="relative mx-auto overflow-hidden rounded-lg shadow-lg"
              style={{ width: '280px', height: '280px' }}
            >
              <div className="absolute inset-0">
                <img
                  src={services[activeIndex].bgImage}
                  alt=""
                  className="h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${services[activeIndex].color}90 0%, rgba(0,0,0,0.6) 100%)`,
                  }}
                ></div>
              </div>
              <div className="absolute inset-0 flex flex-col justify-between p-6">
                <div>
                  <div
                    className="w-12 h-1 mb-4"
                    style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}
                  ></div>
                  <h3 className="text-xl font-bold text-white mb-2 drop-shadow-sm">
                    {services[activeIndex].title}
                  </h3>
                </div>
                <div>
                  <p className="text-white/90 text-sm mb-5 drop-shadow-sm line-clamp-3">
                    {services[activeIndex].description}
                  </p>
                  <div
                    className="inline-flex items-center px-3 py-1.5 rounded-sm text-xs font-medium text-white"
                    style={{ backgroundColor: services[activeIndex].color }}
                  >
                    View Details
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center space-x-1.5 mt-5">
            {services.map((service, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className="focus:outline-none"
              >
                <div
                  style={{
                    backgroundColor: idx === activeIndex ? service.color : '#e5e7eb',
                    width: idx === activeIndex ? '20px' : '10px',
                  }}
                  className="h-2 rounded-full transition-all duration-300"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Carousel */}
        <div className="hidden md:block max-w-6xl mx-auto">
          <div className="relative">
            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -left-10 transform -translate-y-1/2 z-20">
              <button
                onClick={() => goToSlide(getPrevIndex())}
                className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all text-gray-800 hover:text-blue-600 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>
            <div className="absolute top-1/2 -right-10 transform -translate-y-1/2 z-20">
              <button
                onClick={() => goToSlide(getNextIndex())}
                className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all text-gray-800 hover:text-blue-600 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Cards Container */}
            <div
              className="relative h-[320px] mx-auto"
              style={{ width: '1000px' }}
              onMouseEnter={() => clearTimeout(timeoutRef.current)}
              onMouseLeave={() => {
                timeoutRef.current = setTimeout(() => {
                  setActiveIndex((prev) => (prev + 1) % services.length);
                }, 3000);
              }}
            >
              {services.map((service, index) => {
                const role = getCardRole(index, activeIndex, services.length);
                const isCenter = role === 'center';

                return (
                  <motion.div
                    key={service.id}
                    animate={desktopPositions[role]}
                    transition={{
                      duration: 0.8,
                      ease: 'easeInOut',
                      opacity: { duration: 0.5 },
                      scale: { type: 'spring', stiffness: 80, damping: 25 },
                      left: { type: 'spring', stiffness: 50, damping: 20 },
                    }}
                    className={`absolute top-0 overflow-hidden rounded-lg shadow-lg cursor-pointer group`}
                    style={{
                      width: isCenter ? '400px' : '280px',
                      height: isCenter ? '300px' : '280px',
                      zIndex: isCenter ? 10 : role === 'left' || role === 'right' ? 5 : 1,
                    }}
                    onClick={() => !isCenter && goToSlide(index)}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <motion.img
                        src={service.bgImage}
                        alt=""
                        className="h-full w-full object-cover"
                        initial={{ scale: 1 }}
                        animate={{ scale: isCenter ? 1.07 : 1 }}
                        transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse' }}
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: isCenter
                            ? `linear-gradient(135deg, ${service.color}90 0%, rgba(0,0,0,0.65) 100%)`
                            : `linear-gradient(135deg, ${service.color}80 0%, rgba(0,0,0,0.7) 100%)`,
                        }}
                      ></div>
                    </div>

                    {/* Decorative Elements */}
                    {isCenter && (
                      <>
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-bl-full"></div>
                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-tr-full"></div>
                      </>
                    )}

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-between p-7">
                      <div>
                        <div
                          className={`w-10 h-1 mb-4 transition-all duration-300 group-hover:w-16`}
                          style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}
                        ></div>
                        <h3
                          className={`text-xl font-bold text-white mb-2 drop-shadow-sm transition-all duration-300 ${
                            isCenter ? 'group-hover:translate-x-1' : ''
                          }`}
                        >
                          {service.title}
                        </h3>
                      </div>
                      <div>
                        <p
                          className={`text-white/90 text-sm mb-6 drop-shadow-sm ${
                            isCenter ? 'line-clamp-3' : 'line-clamp-2'
                          }`}
                        >
                          {service.description}
                        </p>
                        {isCenter ? (
                          <button
                            className="px-4 py-2 rounded-sm text-xs font-medium text-white transition-all duration-300 hover:shadow-lg"
                            style={{
                              backgroundColor: service.color,
                              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            }}
                          >
                            Explore Service
                          </button>
                        ) : (
                          <div className="flex items-center text-xs font-medium text-white/80">
                            <span>Click to view</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3.5 w-3.5 ml-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center space-x-2 mt-4">
              {services.map((service, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className="group focus:outline-none"
                >
                  <div
                    style={{
                      backgroundColor: idx === activeIndex ? service.color : '#e5e7eb',
                      width: idx === activeIndex ? '24px' : '12px',
                      opacity: idx === activeIndex ? 1 : 0.6,
                    }}
                    className="h-2 rounded-full transition-all duration-300 group-hover:opacity-100"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesCarousel;