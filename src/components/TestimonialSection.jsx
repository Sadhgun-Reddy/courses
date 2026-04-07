import React, { useState, useEffect, useCallback, useRef } from 'react';
import './TestimonialSection.css';

const DURATION = 5000; // 5 seconds per testimonial
const UPDATE_INTERVAL = 50; // Update progress every 50ms

const QuoteIcon = () => (
  <svg className="quote-icon-large" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 82 120" fill="currentColor">
    <path d="M57.1172 120C52.9701 120 48.2575 116.62 42.9793 109.859L42.9793 108.169L48.069 77.7465L48.069 69.2958L42.9793 13.5211C45.9954 4.50705 52.0276 5.00912e-06 61.0759 5.80015e-06C75.0253 7.01965e-06 82 24.7887 82 74.3662C82 104.789 73.7057 120 57.1172 120ZM16.4 113.239C5.46667 111.737 1.18205e-06 106.479 1.97009e-06 97.4648C6.03219 77.1831 9.04828 60.6573 9.04829 47.8873L3.95863 19.1549C3.95864 14.6479 9.42529 10.5164 20.3586 6.76056C35.4391 9.76525 42.9793 24.6009 42.9793 51.2676C38.4552 92.5822 30.9149 113.239 20.3586 113.239L16.4 113.239Z" />
  </svg>
);

const TestimonialSection = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const total = testimonials.length;
  const progressRef = useRef(0);

  const goToNext = useCallback(() => {
    progressRef.current = 0;
    setProgress(0);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
      setIsAnimating(false);
    }, 300); // 300ms fade out duration
  }, [total]);

  const goToPrev = useCallback(() => {
    progressRef.current = 0;
    setProgress(0);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + total) % total);
      setIsAnimating(false);
    }, 300);
  }, [total]);

  const jumpTo = useCallback((index) => {
    if (index === currentIndex) return;
    progressRef.current = 0;
    setProgress(0);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 300);
  }, [currentIndex]);

  // Handle auto-rotation and progress bar
  useEffect(() => {
    if (isHovered) return; // Pause if hovered

    const tick = (UPDATE_INTERVAL / DURATION) * 100;
    
    const interval = setInterval(() => {
      progressRef.current += tick;
      
      if (progressRef.current >= 100) {
        goToNext();
      } else {
        setProgress(progressRef.current);
      }
    }, UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [isHovered, goToNext]);

  // Render highlighted quote safely
  const renderQuote = (quoteStr, highlightedStr) => {
    if (!highlightedStr) return quoteStr;
    const parts = quoteStr.split(highlightedStr);
    if (parts.length < 2) return quoteStr;
    
    return (
      <>
        {parts[0]}
        <strong>{highlightedStr}</strong>
        {parts[1]}
      </>
    );
  };

  // Calculate the next 3 indices for the mini cards
  const getNextCards = () => {
    const cards = [];
    for (let i = 1; i <= 3; i++) {
       // Make sure we handle if there are less than 4 testimonials total by wrapping around nicely
       cards.push((currentIndex + i) % total);
    }
    return cards;
  };

  if (!testimonials || testimonials.length === 0) return null;

  const currentT = testimonials[currentIndex];
  const nextIndices = getNextCards();

  return (
    <div 
      className="testimonial-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="testimonial-header-row">
        <div className="testimonial-heading-wrap">
          <p className="sub-heading">Student Success Stories</p>
          <h2 className="title">Recognized by Global Institutions</h2>
        </div>
        <div className="testimonial-counter">
          {currentIndex + 1} / {total}
        </div>
      </div>

      {/* Featured Card */}
      <div className={`featured-card ${isAnimating ? 'fade-out' : 'fade-in'}`}>
        <div className="featured-left">
          <div className="featured-avatar-wrapper">
            {currentT.img ? (
              <img src={currentT.img} alt={currentT.name} className="featured-avatar" />
            ) : (
               <div className="featured-initials">{currentT.initials}</div>
            )}
          </div>
          <h3 className="featured-name">{currentT.name} (<a className="featured-role">{currentT.role}</a>)</h3>
          <div className="featured-batch">{currentT.batchYear}</div>
        </div>
        
        <div className="featured-right">
          <QuoteIcon />
          <div className="featured-quote">
            {renderQuote(currentT.quote, currentT.highlightedQuote)}
          </div>
        </div>

        {/* Controls Overlay */}
        <div className="testimonial-controls">
          <button className="control-btn" onClick={goToPrev} aria-label="Previous testimonial">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <button className="control-btn" onClick={goToNext} aria-label="Next testimonial">
             <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>

        {/* Progress Bar inside bottom of featured card */}
        {/* <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div> */}
      </div>

      {/* Mini Cards Row */}
      <div className="mini-cards-row">
        {nextIndices.map((idx, pos) => {
          const t = testimonials[idx];
          // We use key uniquely combining the index so React remounts/animates correctly
          // but if we want the staggered animation on manual shift, we can use a key that changes on index shift.
          return (
            <div 
              key={`${currentIndex}-${idx}`} 
              className={`mini-card animating`} 
              style={{ animationDelay: `${pos * 0.1}s` }}
              onClick={() => jumpTo(idx)}
            >
              {pos === 0 && <span className="next-up-badge">Next Up</span>}
              <div className="mini-card-header">
                {t.img ? (
                  <img src={t.img} alt={t.name} className="mini-avatar" />
                ) : (
                  <div className="mini-initials">{t.initials}</div>
                )}
                <div className="mini-info">
                  <span className="mini-name">{t.name}</span>
                  <span className="mini-role">{t.role}</span>
                </div>
              </div>
              <p className="mini-quote-preview">"{t.quote}"</p>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default TestimonialSection;
