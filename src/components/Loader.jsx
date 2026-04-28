import React from 'react';
import './Loader.css';

const Loader = ({ fullPage = true, text = "Loading..." }) => {
  return (
    <div className={`loader-container ${fullPage ? 'full-page' : ''}`}>
      <div className="loader-content">
        <div className="loader-spinner">
          <div className="loader-ring"></div>
          <div className="loader-ring"></div>
          <div className="loader-ring"></div>
          <div className="loader-logo-circle">
             <div className="loader-inner-dot"></div>
          </div>
        </div>
        {text && <p className="loader-text">{text}</p>}
      </div>
    </div>
  );
};

export default Loader;
