import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ComingSoon.css';

const ComingSoon = ({ title = 'Our Expert Instructors' }) => {
  const navigate = useNavigate();

  return (
    <div className="cs-root">
      {/* Ambient background orbs */}
      <div className="cs-orb cs-orb--1" />
      <div className="cs-orb cs-orb--2" />

      {/* Subtle grid overlay */}
      <div className="cs-grid" />

      <main className="cs-card">
        {/* Pill badge */}
        <div className="cs-badge">
          <span className="cs-badge__dot" />
          Coming Soon
        </div>

        {/* Headline */}
        <h1 className="cs-title">
          {title}
          <br />
          <em className="cs-title__em">is almost here</em>
        </h1>

        {/* Divider line */}
        <div className="cs-rule" />

        {/* Description */}
        <p className="cs-desc">
          We're crafting something exceptional. This section is currently
          under development and will be ready for you very soon.
        </p>

        {/* Animated orbital graphic */}
        <div className="cs-visual" aria-hidden="true">
          <div className="cs-ring cs-ring--outer" />
          <div className="cs-ring cs-ring--mid" />
          <div className="cs-ring cs-ring--inner" />
          <div className="cs-dot" />
        </div>

        {/* CTA */}
        <button className="cs-btn" onClick={() => navigate('/')}>
          <span>Return to Homepage</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </main>

      {/* Footer note */}
      <p className="cs-footer-note">VOLTEDZ · Technology Meets Tomorrow</p>
    </div>
  );
};

export default ComingSoon;