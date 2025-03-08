import { useState, useEffect } from 'react';

const VideoBackground = ({ videoSrc, overlayOpacity = 0.5 }) => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute w-full h-full object-cover"
        style={{ objectPosition: 'center' }}
      >
        <source src={videoSrc} type="video/webm" />
        Your browser does not support the video tag.
      </video>
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70"
        style={{ opacity: overlayOpacity }}
      ></div>
    </div>
  );
};

export default VideoBackground;