import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { URLS, base_url } from '../Url';
import './Header.css';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);

  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        
        if (storedToken) {
          fetch(URLS.getStudentProfile, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${storedToken}`
            }
          })
          .then(res => res.json())
          .then(data => {
            if (data.success && data.profile) {
              setUser(prev => ({ ...prev, ...data.profile }));
              if (data.profile.image) {
                setProfileImage(base_url + data.profile.image);
              }
            }
          })
          .catch(err => console.error("Error fetching profile:", err));
        }
      } catch(e) {
        setUser(null);
      }
    } else {
      setUser(null);
      setProfileImage(null);
    }
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setIsProfileMenuOpen(false);
    navigate('/');
  };

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
          <div style={{marginRight : "7px", backgroundColor: "#fff"  , borderRadius: "20px"
           }}
    
>

          
            <div className="header-logo">
              <Link to="/" className="site-logo">
                <img
                  src="/logo2.png"
                  alt="VOLTEDZ Logo"
                  width={308}
                  height={50}
                  className="logo-img"
                  loading="lazy"
                />
              </Link>
            </div>
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
                          <img src="/courses/Banners/Banner%20IA.png" alt="Industrial Automation" className="mega-img" onError={(e) => e.target.style.display = 'none'} />
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

          {/* Auth Buttons & Mobile Toggle */}
          <div className="header-actions">
            {user ? (
              <div className="header-profile-wrap" ref={profileMenuRef}>
                <div 
                  className="profile-bubble-btn" 
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                >
                  <div className="profile-img-placeholder">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                      </svg>
                    )}
                  </div>
                  <svg className="bubble-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>

                <div className={`profile-dropdown-card ${isProfileMenuOpen ? 'open' : ''}`}>
                  <div className="profile-card-header">
                    <div className="profile-avatar-large">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                      ) : (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                      )}
                    </div>
                    <div className="profile-user-info">
                      <h4 className="profile-name">{user.name || "User"}</h4>
                      <span className="profile-role">Student</span>
                    </div>
                  </div>
                  
                  <ul className="profile-menu-list">
                    <li>
                      <Link to="/my-courses" onClick={() => setIsProfileMenuOpen(false)}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
                        My Courses
                      </Link>
                    </li>
                    <li>
                      <Link to="/profile" onClick={() => setIsProfileMenuOpen(false)}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/support" onClick={() => setIsProfileMenuOpen(false)}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                        Message
                      </Link>
                    </li>
                    <li>
                      <Link to="/purchase-history" onClick={() => setIsProfileMenuOpen(false)}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        Purchase History
                      </Link>
                    </li>
                    <li className="logout-li">
                      <button type="button" className="logout-btn" onClick={handleLogout}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        Log Out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn-login">Login</Link>
                <Link to="/login" className="btn-signup">Sign Up</Link>
              </div>
            )}
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