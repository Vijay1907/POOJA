// src/components/Loader/Loader.jsx

import React from 'react';

const Loader = () => {
  const loaderOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Increased opacity for overlay
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  const loaderStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#3498db',
    animation: 'pulse 1.5s infinite ease-in-out',
  };

  const contentOverlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // Slight opacity for background content
    zIndex: 999,
  };

  const keyframesStyle = `
    @keyframes pulse {
      0% {
        transform: scale(1);
        opacity: 0.9;
      }
      50% {
        transform: scale(1.3);
        opacity: 0.7;
      }
      100% {
        transform: scale(1);
        opacity: 0.9;
      }
    }
  `;

  return (
    <div style={loaderOverlayStyle}>
      <style>{keyframesStyle}</style>
      <div style={contentOverlayStyle}></div> {/* Adds a translucent effect to the background */}
      <div style={loaderStyle}></div>
    </div>
  );
};

export default Loader;
