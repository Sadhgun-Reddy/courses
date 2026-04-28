/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css';
import Loader from '../components/Loader';
import { URLS } from '../Url';

// Helper to build full image URLs
const getImageUrl = (path) => {
  if (!path) return '';
  return path.startsWith('http') ? path : `${URLS.base_url}/${path}`;
};

// Helper to parse numeric values from strings like "12,000+"
const parseCountValue = (str) => {
  if (typeof str === 'number') return str;
  const num = parseInt(str?.replace(/[^0-9]/g, ''), 10);
  return isNaN(num) ? 0 : num;
};

/* ── Animated Counter (unchanged) ────────────────────────────────────────── */
const CounterItem = ({ icon, prefix = '', target, suffix = '', label }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

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

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [aboutData, setAboutData] = useState(null);

  // Derived state
  const [bannerImage, setBannerImage] = useState('');
  const [features, setFeatures] = useState([]);
  const [mission, setMission] = useState({ title: '', description: '', image: '' });
  const [ourStory, setOurStory] = useState({ description: '', image: '' });
  const [stats, setStats] = useState({
    activeLearners: 0,
    onlineCourses: 0,
    certifiedInstructors: 0,
    studentSatisfactionRate: 0
  });

  // ----- Fetch API Data -----
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(URLS.GetAboutUsPage, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        const json = await response.json();
        if (!json.success) throw new Error('API returned unsuccessful response');
        setAboutData(json.data);
      } catch (err) {
        console.error('Failed to fetch about us data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAboutData();
  }, []);

  // ----- Process API data when available -----
  useEffect(() => {
    if (!aboutData) return;

    // Banner
    if (aboutData.banner?.bannerImage) {
      setBannerImage(getImageUrl(aboutData.banner.bannerImage));
    }

    // Features (How It Works)
    const howItWorks = aboutData.howItWorks || [];
    setFeatures(howItWorks.map(item => ({
      title: item.title,
      desc: item.description
    })));

    // Mission (first item in array)
    const missionData = aboutData.mission?.[0] || {};
    setMission({
      title: missionData.title || '',
      description: missionData.description || '',
      image: getImageUrl(missionData.image)
    });

    // Our Story
    const story = aboutData.ourStory || {};
    setOurStory({
      description: story.description || '',
      image: getImageUrl(story.image)
    });

    // Counts
    const counts = aboutData.counts || {};
    setStats({
      activeLearners: parseCountValue(counts.activeLearners),
      onlineCourses: parseCountValue(counts.onlineCourses),
      certifiedInstructors: parseCountValue(counts.certifiedInstructors),
      studentSatisfactionRate: parseCountValue(counts.studentSatisfactionRate)
    });
  }, [aboutData]);

  // Fallback for features if empty
  const displayFeatures = features.length ? features : [
    {
      title: 'Breakthrough learning experience',
      desc: 'Innovating teaching methods, bringing an easy and interesting learning experience for every academy.',
    },
    {
      title: 'Dynamic learning community',
      desc: 'An active community powered by interactive mobile learning and AI recommendations.',
    },
    {
      title: 'International standard knowledge',
      desc: 'A comprehensive curriculum aligned with global standards.',
    },
  ];

  // Loading / Error states
  if (loading) {
    return <Loader fullPage text="Loading about us content..." />;
  }
  if (error) {
    return <div className="about-page"><div className="error">Error: {error}</div></div>;
  }

  return (
    <main className="about-page">

      {/* ── 1. HERO (with dynamic banner image) ───────────────────── */}
      <section 
        className="about-hero"
        style={bannerImage ? { background: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${bannerImage}) center / cover no-repeat` } : {}}
      >
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

      {/* ── 2. HOW IT WORKS (dynamic features) ───────────────────── */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="sub-label">HOW IT WORKS</span>
            <h2>How Learning with VOLTEDZ Works</h2>
          </div>

          <div className="how-it-works-grid">
            {displayFeatures.map((f, i) => (
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

      {/* ── 3. MISSION (dynamic) ────────────────────────────────── */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-two-col">

            {/* Left – text */}
            <div className="mission-text">
              <span className="sub-label">The mission</span>
              <h2>{mission.title}</h2>
              {/* Render description as HTML (since it contains <p> and <ul>) */}
              <div dangerouslySetInnerHTML={{ __html: mission.description }} />
            </div>

            {/* Right – image */}
            <div className="mission-image-wrap">
              <img
                src={mission.image || "../wp-content/uploads/2025/12/mission-right-img.png"}
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

      {/* ── 4. STORY + STATS (dynamic) ──────────────────────────── */}
      <section className="story-section">
        <div className="container">
          <div className="story-content">

            {/* Left – images */}
            <div className="story-image">
              <div className="story-image-inner">
                <img
                  src={ourStory.image || "../wp-content/uploads/2025/12/our-story.png"}
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
              {/* <span className="sub-label">The Story</span> */}
              <h2>Our Journey</h2>
              {/* Render description as plain text (preserve line breaks) */}
              <p style={{ whiteSpace: 'pre-line' }}>{ourStory.description}</p>
            </div>

          </div>

          {/* Stats row */}
          <div className="stats-grid">
            <CounterItem
              icon="../wp-content/uploads/2025/12/vec5.png"
              target={stats.activeLearners}
              suffix="+"
              label="Active Learners"
            />
            <CounterItem
              icon="../wp-content/uploads/2025/12/vector8.png"
              target={stats.onlineCourses}
              suffix="+"
              label="Online Courses"
            />
            <CounterItem
              icon="../wp-content/uploads/2025/12/vec6.png"
              target={stats.certifiedInstructors}
              suffix="+"
              label="Certified Instructors"
            />
            <CounterItem
              icon="../wp-content/uploads/2025/12/vec7.png"
              target={stats.studentSatisfactionRate}
              suffix="%"
              label="Student Satisfaction Rate"
            />
          </div>

        </div>
      </section>

      {/* ── 6. QUICK LINKS (static) ────────────────────────────── */}
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
              <Link to="/contact" className="read-link">Contact →</Link>
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

    </main>
  );
}