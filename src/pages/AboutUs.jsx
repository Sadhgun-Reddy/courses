/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css';

/* ── Animated Counter ────────────────────────────────────────── */
const CounterItem = ({ icon, prefix = '', target, suffix = '', label }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  // Intersection observer – start counting when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Count-up animation
  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * target));
      if (progress >= 1) {
        setCount(target);
        clearInterval(timer);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <div className="stat-item" ref={ref}>
      {icon && (
        <div className="stat-icon">
          <img src={icon} alt="" loading="lazy" />
        </div>
      )}
      <h3>
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </h3>
      <p>{label}</p>
    </div>
  );
};

/* ── Page Component ──────────────────────────────────────────── */
export default function AboutUs() {
  const offices = [
    { title: 'New York Office',      address: 'Salesforce Tower, 415 Mission Street, San Francisco, CA 94105, USA' },
    { title: 'San Francisco Office', address: 'Salesforce Tower, 415 Mission Street, San Francisco, CA 94105, USA' },
    { title: 'New Jersey Office',    address: 'Salesforce Tower, 415 Mission Street, San Francisco, CA 94105, USA' },
    { title: 'New York Office',      address: 'Salesforce Tower, 415 Mission Street, San Francisco, CA 94105, USA' },
    { title: 'San Francisco Office', address: 'Salesforce Tower, 415 Mission Street, San Francisco, CA 94105, USA' },
    { title: 'New Jersey Office',    address: 'Salesforce Tower, 415 Mission Street, San Francisco, CA 94105, USA' },
    { title: 'New York Office',      address: 'Salesforce Tower, 415 Mission Street, San Francisco, CA 94105, USA' },
    { title: 'San Francisco Office', address: 'Salesforce Tower, 415 Mission Street, San Francisco, CA 94105, USA' },
    { title: 'New Jersey Office',    address: 'Salesforce Tower, 415 Mission Street, San Francisco, CA 94105, USA' },
  ];

  const features = [
    {
      title: 'Breakthrough learning experience',
      desc: 'Innovating teaching methods, bringing an easy and interesting learning experience for every academy.',
    },
    {
      title: 'International standard knowledge',
      desc: 'A comprehensive curriculum aligned with global standards, supported by AI-driven learning assistance to help students understand faster and deeper.',
    },
    {
      title: 'Dynamic learning community',
      desc: 'An active community powered by interactive mobile learning and AI recommendations that connect students with the right content, peers, and mentors.',
    },
  ];

  return (
    <main className="about-page">

      {/* ── 1. HERO ──────────────────────────────────────────── */}
      <section className="about-hero">
        <div className="container">
          <h1 className="hero-title">Knowledge of knowledge, raising the future</h1>
          <p className="hero-subtitle">
            Learning designed for the digital era — accessible anywhere, personalized for everyone.
          </p>
          <Link to="/contact-us" className="btn btn-outline-white">
            Contact us
          </Link>
        </div>
      </section>

      {/* ── 2. HOW IT WORKS ──────────────────────────────────── */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="sub-label">HOW IT WORKS</span>
            <h2>How Learning with VOLTEDZWorks</h2>
          </div>

          <div className="how-it-works-grid">
            {features.map((f, i) => (
              <div className="feature-card" key={i}>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-3">
            <Link to="/courses" className="btn btn-primary-dark">
              Start Your Learning Journey
            </Link>
          </div>
        </div>
      </section>

      {/* ── 3. MISSION ───────────────────────────────────────── */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-two-col">

            {/* Left – text */}
            <div className="mission-text">
              <span className="sub-label">The mission of Voltedz</span>
              <h2>
                Bringing an advanced, flexible, and technology-powered learning
                environment
              </h2>
              <p>
                We are committed to expanding flexible learning solutions through
                mobile learning, enabling students to access knowledge anywhere,
                and AI-powered learning, helping them personalize their learning
                pathway for maximum efficiency.
              </p>
              <p>Our platform supports continuous learning by:</p>
              <ul className="check-list">
                <li>Delivering lessons on mobile devices for on-the-go learning</li>
                <li>Offering AI study companions that answer questions instantly</li>
                <li>Providing personalized recommendations based on individual progress</li>
                <li>Helping students improve consistently through smart learning analytics</li>
              </ul>
              <p>
                VOLTEDZis where technology and education meet to empower students
                to explore, master knowledge, and unlock new opportunities for the
                future.
              </p>
            </div>

            {/* Right – image */}
            <div className="mission-image-wrap">
              <img
                src="../wp-content/uploads/2025/12/mission-right-img.png"
                alt="Mission"
                className="mission-img"
                loading="lazy"
              />
              <div className="mission-info-float">
                <img
                  src="../wp-content/uploads/2025/12/info.png"
                  alt="Info badge"
                  loading="lazy"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. STORY + STATS ─────────────────────────────────── */}
      <section className="story-section">
        <div className="container">
          <div className="story-content">

            {/* Left – images */}
            <div className="story-image">
              <div className="story-image-inner">
                <img
                  src="../wp-content/uploads/2025/12/our-story.png"
                  alt="Our Story"
                  className="story-img"
                  loading="lazy"
                />
                <img
                  src="../wp-content/uploads/2025/12/circle-dot.png"
                  alt=""
                  className="circle-dot-decor"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right – text */}
            <div className="story-text">
              <span className="sub-label">The Story of Voltedz</span>
              <h2>Our story</h2>
              <p>
                VOLTEDZwas founded in 2023 with a vision to bring high-quality,
                flexible, and accessible education to students across Vietnam. We
                recognize that traditional learning is no longer enough — so we
                built a hybrid system combining offline classrooms, online courses,
                mobile learning, and AI support.
              </p>
              <p>
                With a team of experienced educators and leading technology experts,
                Viectademy creates a modern learning platform where:
              </p>
              <ul className="check-list">
                <li>Knowledge is available anytime, anywhere via mobile devices</li>
                <li>Students receive AI-powered assistance for faster understanding</li>
                <li>Learning paths are tailored to each individual's pace</li>
                <li>Progress is tracked and optimized continuously</li>
              </ul>
              <p>
                We are proud to help students nationwide develop the skills they
                need to thrive in a fast-changing world.
              </p>
            </div>

          </div>

          {/* Stats row */}
          <div className="stats-grid">
            <CounterItem
              icon="../wp-content/uploads/2025/12/vec5.png"
              prefix="1"
              target={2000}
              suffix="+"
              label="Active Learners"
            />
            <CounterItem
              icon="../wp-content/uploads/2025/12/vector8.png"
              prefix="9"
              target={80}
              suffix="+"
              label="Online Courses"
            />
            <CounterItem
              icon="../wp-content/uploads/2025/12/vec6.png"
              target={85}
              suffix="+"
              label="Certified Instructors"
            />
            <CounterItem
              icon="../wp-content/uploads/2025/12/vec7.png"
              target={98}
              suffix="%"
              label="Student Satisfaction Rate"
            />
          </div>

        </div>
      </section>

      {/* ── 5. INFRASTRUCTURE ────────────────────────────────── */}
      {/* <section className="infrastructure-section">
        <div className="container">
          <div className="section-header">
            <h2>VOLTEDZeducational infrastructure</h2>
            <p>
              VOLTEDZis proud of two facilities in New York and San Francisco,
              giving students the country the opportunity to access high quality
              courses flexibly and conveniently.
            </p>
          </div>

          <div className="infrastructure-grid">
            {offices.map((office, i) => (
              <div className="office-card" key={i}>
                <h4>{office.title}</h4>
                <p>Address: {office.address}</p>
                <a href="#" className="map-link">View Google Map</a>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── 6. QUICK LINKS ───────────────────────────────────── */}
      <section className="quick-links-section">
        <div className="container">
          <div className="quick-links-grid">
            <div className="quick-link-card">
              <h4>Study with us</h4>
              <p>
                Join a modern learning ecosystem equipped with mobile learning and
                AI-powered tools to help you learn smarter every day.
              </p>
              <Link to="/courses" className="read-link">Study now →</Link>
            </div>
            <div className="quick-link-card">
              <h4>Contact us</h4>
              <p>
                Our team is ready to assist you with course information, admissions,
                and learning pathways tailored to your goals.
              </p>
              <Link to="/contact-us" className="read-link">Contact →</Link>
            </div>
            <div className="quick-link-card">
              <h4>Read our news</h4>
              <p>
                Explore insights on education, mobile learning trends, and how AI
                is reshaping the future of studying.
              </p>
              <Link to="/blog" className="read-link">Read now →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. APP DOWNLOAD CTA ──────────────────────────────── */}
      {/* <section className="cta-section">
        <div className="container">
          <h2>VOLTEDZ– Study with experts, learn with AI, grow every day.</h2>
          <p>Download VOLTEDZmobile app to learn anywhere, anytime.</p>
          <a href="#" className="btn btn-cta-white">
            Download VOLTEDZnow
          </a>
        </div>
      </section> */}

    </main>
  );
}