import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer className="site-footer">
    <div className="footer-top">
      <div className="footer-top-inner e-con-boxed">

        {/* Brand column */}
        <div className="footer-col footer-brand">
          <div className="footer-logo">
            <img src="/logo.jpg" alt="VOLTEDZ"
              onError={e => { e.target.style.display='none'; }} />
          </div>
          <ul className="footer-contact-list">
            <li>
              <svg viewBox="0 0 384 512" width="14" height="14" fill="currentColor"><path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"/></svg>
              201, 2nd Floor, Star Meena Nivas, Near Asian Satyam Mall, Gurudwara Road, Ameerpet 500016.
            </li>
            <li>
              <svg viewBox="0 0 512 512" width="14" height="14" fill="currentColor"><path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"/></svg>
              +91 9010016664
            </li>
            <li>
              <svg viewBox="0 0 512 512" width="14" height="14" fill="currentColor"><path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"/></svg>
              +91 9010016664
            </li>
            <li>
              <svg viewBox="0 0 512 512" width="14" height="14" fill="currentColor"><path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"/></svg>
              Voltedge.edu.in@gmail.com
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-col">
          <h4 className="footer-col-title">Courses</h4>
          <ul className="footer-links">
            <li><Link to="/courses/industrial-automation">Industrial Automation</Link></li>
            <li><Link to="/courses/building-management-systems">Building Management Systems (BMS)</Link></li>
            <li><Link to="/courses/embedded-systems">Embedded Systems & IoT</Link></li>
            <li><Link to="/courses/data-science">Data Science & AI</Link></li>
            <li><Link to="/courses/cctv">CCTV</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div className="footer-col">
          <h4 className="footer-col-title">Resources</h4>
          <ul className="footer-links">
            <li><Link to="/instructors">Instructors</Link></li>
            <li><Link to="/blog">Our Blog</Link></li>
            <li><Link to="/events">Recent Events</Link></li>
            <li><Link to="/resources">Learning Resources</Link></li>
          </ul>
        </div>

        {/* App download */}
        <div className="footer-col footer-app">
          <h4 className="footer-col-title">Get Started</h4>
          <p className="footer-app-desc">
            Download the VOLTEDZ app to access lessons, track progress, and connect with educators — anytime, anywhere.
          </p>
          {/* <div className="footer-app-badges">
            <a href="#" className="badge-link">
              <img src="/wp-content/uploads/2025/11/app-store-badge.png" alt="Download on the App Store"
                onError={e => { e.target.outerHTML = '<span class="badge-fallback">🍎 App Store</span>'; }} />
            </a>
            <a href="#" className="badge-link">
              <img src="/wp-content/uploads/2025/11/google-play-badge.png" alt="Get it on Google Play"
                onError={e => { e.target.outerHTML = '<span class="badge-fallback">▶ Google Play</span>'; }} />
            </a>
          </div> */}
        </div>

      </div>
    </div>

    {/* Bottom bar */}
    <div className="footer-bottom">
      <div className="footer-bottom-inner e-con-boxed">
        <nav className="footer-bottom-nav" aria-label="Footer navigation">
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </nav>
        <p className="footer-copy">Designed and Developed by <a style={{color:"#fff"}} href="https://moironix.com/" target="_blank" rel="noopener noreferrer">Moironix</a> © 2026 VOLTEDZ. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;