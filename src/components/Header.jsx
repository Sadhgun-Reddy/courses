/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close dropdown and mobile menu when route changes
  useEffect(() => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDropdownToggle = (e) => {
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMouseEnter = () => {
    if (window.innerWidth > 1024) {
      setIsDropdownOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 1024) {
      setIsDropdownOpen(false);
    }
  };

  const handleLinkClick = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="thim-ekit__header">
      <div className="thim-ekit__header__inner">
        <div className="header-container">
          {/* Logo Section */}
          <div className="header-logo">
            <Link  to="/" className="site-logo">
              <img 
                src="/logo.jpg" 
                alt="VOLTEDZ Logo" 
                width={308} 
                height={50}
                className="logo-img"
                loading="lazy"
              />
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className={`main-navigation ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
            <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}> 
              <li onClick={() => setIsMobileMenuOpen(false)}><Link to="/">Home</Link></li>
              <li 
                className="has-dropdown mega-menu-wrapper"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link to="/courses/industrial-automation" onClick={handleDropdownToggle} className="courses-link">
                  Courses 
                  <span className="dropdown-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </span>
                </Link>
                <div className={`dropdown-menu mega-menu ${isDropdownOpen ? 'open' : ''}`}> 
                  <div className="mega-col">
                    <div className="mega-card">
                      <Link to="/courses/industrial-automation" onClick={handleLinkClick} className="mega-card-link-wrapper">
                        <img src="/courses/Industrial Automation.png" alt="Industrial Automation" className="mega-img" onError={(e) => e.target.style.display = 'none'} />
                        <h6 className="mega-card-title">Industrial Automation</h6>
                        <span className="mega-link mt-1">View Course</span>
                      </Link>
                    </div>
                  </div>
                  <div className="mega-col">
                    <div className="mega-card">
                      <Link to="/courses/building-management-systems" onClick={handleLinkClick} className="mega-card-link-wrapper">
                        <img src="/courses/Building Management Systems.png" alt="BMS & CCTV" className="mega-img" onError={(e) => e.target.style.display = 'none'} />
                        <h6 className="mega-card-title">Building Management Systems (BMS)</h6>
                        <span className="mega-link mt-1">View Course</span>
                      </Link>
                    </div>
                  </div>
                  <div className="mega-col">
                    <div className="mega-card">
                      <Link to="/courses/embedded-systems" onClick={handleLinkClick} className="mega-card-link-wrapper">
                        <img src="/courses/Embedded Systems & IoT.png" alt="Embedded Systems" className="mega-img" onError={(e) => e.target.style.display = 'none'} />
                        <h6 className="mega-card-title">Embedded Systems & IoT</h6>
                        <span className="mega-link mt-1">View Course</span>
                      </Link>
                    </div>
                  </div>
                  <div className="mega-col">
                    <div className="mega-card">
                      <Link to="/courses/data-science" onClick={handleLinkClick} className="mega-card-link-wrapper">
                        <img src="/courses/Data Science & AI.png" alt="Data Science" className="mega-img" onError={(e) => e.target.style.display = 'none'} />
                        <h6 className="mega-card-title">Data Science & AI</h6>
                        <span className="mega-link mt-1">View Course</span>
                      </Link>
                    </div>
                  </div>
                  <div className="mega-col">
                    <div className="mega-card">
                      <Link to="/courses/cctv" onClick={handleLinkClick} className="mega-card-link-wrapper">
                        <img src="/courses/CCTV.png" alt="CCTV" className="mega-img" onError={(e) => e.target.style.display = 'none'} />
                        <h6 className="mega-card-title">CCTV & Security Systems</h6>
                        <span className="mega-link mt-1" >View Course</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About Us </Link>
                {/* <div className="dropdown-menu mega-menu">
                  <div className="mega-col">
                    <h5 className="mega-title">About VOLTEDZ</h5>
                    <div className="mega-card">
                      <img src="/wp-content/uploads/2024/12/p-teamwork-768x512.jpg" alt="About Us" className="mega-img" onError={(e) => e.target.style.display = 'none'} />
                      <p className="mega-card-desc">VOLTEDZ is an advanced technological training institute committed to providing practical, hands-on engineering education.</p>
                      <Link  to="/about" className="mega-link mt-1">Read More</Link>
                    </div>
                  </div>
                  <div className="mega-col border-left">
                    <h5 className="mega-title">Our Team</h5>
                    <div className="mega-icon-item compact">
                      <div className="mega-item-icon small-icon">T</div>
                      <div className="mega-item-content">
                        <h6 className="no-margin">Instructors</h6>
                        <p>Meet our expert industry professionals and technical leadership.</p>
                        <Link  to="/about" className="mega-link">View Profiles</Link>
                      </div>
                    </div>
                    <div className="mega-icon-item compact">
                      <div className="mega-item-icon small-icon">S</div>
                      <div className="mega-item-content">
                        <h6 className="no-margin">Student Success</h6>
                        <p>Discover real-world outcomes and career growth from our alumni.</p>
                      </div>
                    </div>
                  </div>
                </div> */}
              </li>
              <li onClick={() => setIsMobileMenuOpen(false)}><Link to="/contact">Contact Us</Link></li>
            </ul>
          </nav>

          {/* User Actions */}
          <div className="header-actions">
            <button 
              className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`} 
              aria-label="Toggle menu"
              onClick={handleMobileMenuToggle}
            >
              <span className="menu-icon"></span>
            </button>
            
            {/* <div className="auth-buttons">
              <Link  to="/courses" className="search-icon" aria-label="Search">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M21 21L16.65 16.65" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </Link>
              <Link  to="/login" className="btn btn-login">Login</Link>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
