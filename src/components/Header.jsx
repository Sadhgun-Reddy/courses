/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

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
    if (window.innerWidth > 1024) setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 1024) setIsDropdownOpen(false);
  };

  const handleLinkClick = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="thim-ekit__header">
      <div className="thim-ekit__header__inner">
        <div className="header-container">

          {/* Logo — white floating card inside blue header */}
          <div className="header-logo">
            <Link to="/" className="site-logo">
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

          {/* Nav links — sit directly on blue background */}
          <div className={`nav-blue-block ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
            <nav className="main-navigation">
              <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                <li onClick={() => setIsMobileMenuOpen(false)}>
                  <Link to="/">Home</Link>
                </li>

                <li
                  className="has-dropdown mega-menu-wrapper"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to="/courses/industrial-automation"
                    onClick={handleDropdownToggle}
                    className="courses-link"
                  >
                    Courses
                    <span className="dropdown-arrow">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </Link>

                  {/* Mega menu — note: only "mega-menu" class, NOT "dropdown-menu" */}
                  <div className={`mega-menu ${isDropdownOpen ? 'open' : ''}`}>
                    <div className="mega-col">
                      <div className="mega-card">
                        <Link to="/courses/industrial-automation" onClick={handleLinkClick} className="mega-card-link-wrapper" style={{flexDirection:"column", paddingRight: "0px"}}>
                          <img src="/courses/Industrial Automation.png" alt="Industrial Automation" className="mega-img" onError={(e) => e.target.style.display = 'none'} />
                          <h6 className="mega-card-title">Industrial Automation</h6>
                          <span className="mega-link mt-1">View Course</span>
                        </Link>
                      </div>
                    </div>
                    <div className="mega-col">
                      <div className="mega-card">
                        <Link to="/courses/building-management-systems" onClick={handleLinkClick} className="mega-card-link-wrapper" style={{flexDirection:"column", paddingRight: "0px"}}>
                          <img src="/courses/Building Management Systems.png" alt="BMS" className="mega-img" onError={(e) => e.target.style.display = 'none'} />
                          <h6 className="mega-card-title">Building Management Systems (BMS)</h6>
                          <span className="mega-link mt-1">View Course</span>
                        </Link>
                      </div>
                    </div>
                    <div className="mega-col">
                      <div className="mega-card">
                        <Link to="/courses/embedded-systems" onClick={handleLinkClick} className="mega-card-link-wrapper" style={{flexDirection:"column", paddingRight: "0px"}}>
                          <img src="/courses/Embedded Systems & IoT.png" alt="Embedded Systems" className="mega-img" onError={(e) => e.target.style.display = 'none'} />
                          <h6 className="mega-card-title">Embedded Systems & IoT</h6>
                          <span className="mega-link mt-1">View Course</span>
                        </Link>
                      </div>
                    </div>
                    <div className="mega-col">
                      <div className="mega-card">
                        <Link to="/courses/data-science" onClick={handleLinkClick} className="mega-card-link-wrapper" style={{flexDirection:"column", paddingRight: "0px"}}>
                          <img src="/courses/Data Science & AI.png" alt="Data Science" className="mega-img" onError={(e) => e.target.style.display = 'none'} />
                          <h6 className="mega-card-title">Data Science & AI</h6>
                          <span className="mega-link mt-1">View Course</span>
                        </Link>
                      </div>
                    </div>
                    <div className="mega-col">
                      <div className="mega-card">
                        <Link to="/courses/cctv" onClick={handleLinkClick} className="mega-card-link-wrapper" style={{flexDirection:"column", paddingRight: "0px"}}>
                          <img src="/courses/CCTV.png" alt="CCTV" className="mega-img" onError={(e) => e.target.style.display = 'none'} />
                          <h6 className="mega-card-title">CCTV & Security Systems</h6>
                          <span className="mega-link mt-1">View Course</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>

                <li>
                  <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
                </li>
                <li onClick={() => setIsMobileMenuOpen(false)}>
                  <Link to="/contact">Contact Us</Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Mobile Toggle */}
          <div className="header-actions">
            <button
              className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
              aria-label="Toggle menu"
              onClick={handleMobileMenuToggle}
            >
              <span className="menu-icon"></span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Header;