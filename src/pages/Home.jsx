/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import TestimonialSection from '../components/TestimonialSection';
import './Home.css';
import { URLS } from '../Url';

 
// Helper to build full image URLs
const getImageUrl = (path) => {
  if (!path) return '';
  return path.startsWith('http') ? path : `${URLS.base_url}/${path}`;
};

// ----- Counter Hook -----
function useCountUp(target, duration = 2000, start = false, startFrom = 0) {
  const [count, setCount] = useState(startFrom);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const range = target - startFrom;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(startFrom + progress * range));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start, startFrom]);
  return count;
}

// ----- Helper to parse numeric values from strings like "12,000+" -----
const parseCountValue = (str) => {
  if (typeof str === 'number') return str;
  const num = parseInt(str?.replace(/[^0-9]/g, ''), 10);
  return isNaN(num) ? 0 : num;
};

// ----- Preset colors for instructor cards (cycle through) -----
const instructorColors = ['#D1F6DC', '#E9CFF7', '#D1E7F6', '#FFD2D2'];

// ----- Icons (kept as before) -----
const AutomationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07" />
  </svg>
);
const ITIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);
const BMSIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const IoTIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="2" x2="9" y2="4" /><line x1="15" y1="2" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="22" /><line x1="15" y1="20" x2="15" y2="22" />
    <line x1="2" y1="9" x2="4" y2="9" /><line x1="2" y1="15" x2="4" y2="15" />
    <line x1="20" y1="9" x2="22" y2="9" /><line x1="20" y1="15" x2="22" y2="15" />
  </svg>
);

const categoryButtons = [
  { label: 'Automation', link: '/course-category/automation', Icon: AutomationIcon },
  { label: 'IT Courses', link: '/course-category/it-courses', Icon: ITIcon },
  { label: 'BMS & CCTV', link: '/course-category/bms-cctv', Icon: BMSIcon },
  { label: 'Embedded & IoT', link: '/course-category/embedded-iot', Icon: IoTIcon },
];

// ----- Ticker items (static) -----
const tickerItems = [
  'Industrial Automation', 'Building Management Services (BMS)', 'Embedded Systems & IoT', 'Data Science & AI',
  'Corporate Training', 'Professional Development', 'CCTV', 'Internships',
];

// ----- Sub-components -----
const CourseCard = ({ course }) => (
  <div className="course-card">
    <div className="course-thumbnail">
      <Link to={course.link}><img src={course.img} alt={course.title} /></Link>
    </div>
    <div className="course-content">
      <div className="course-rating">
        {[...Array(5)].map((_, i) => (
          <svg key={i} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#FFCC00" stroke="#FFCC00" strokeWidth="1">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
        <span className="rating-score">{course.rating || '5.0'}</span>
        <span className="rating-count">({course.reviewCount || '1 Review'})</span>
      </div>
      <Link to={course.link}><h3 className="course-title">{course.title}</h3></Link>
      <p className="course-desc">{course.desc}</p>
      <div className="course-meta">
        <span>⏱ {course.duration}</span>
        <span>📖 {course.lessons}</span>
        {course.quizzes && <span>📝 {course.quizzes}</span>}
      </div>
      <div className="course-footer">
        <span className="course-price">
          {course.priceOld && <span className="course-price-origin">{course.priceOld}</span>}
          <span className="price">{course.price || 'Free'}</span>
        </span>
        <Link to={course.link} className="btn-enroll">Enroll now</Link>
      </div>
    </div>
  </div>
);

const InstructorCard = ({ instr }) => {
  const [touched, setTouched] = useState(false);
  return (
    <div 
      className={`instructor-card ${touched ? 'touch-active' : ''}`} 
      style={{ '--card-decor': instr.decorColor }}
      onClick={() => setTouched(t => !t)}
    >
      <div className="instr-photo-layer">
        <img src={instr.img} alt={instr.name} />
      </div>
      <div className="instr-name-bar">
        <h4 className="instr-name-title"><Link to={instr.link}>{instr.name}</Link></h4>
        <p className="instr-school-line">{instr.school}<br />Education: {instr.edu}</p>
      </div>
      <div className="instr-content-layer">
        <h4 className="instr-name-title hover-name"><Link to={instr.link}>{instr.name}</Link></h4>
        <div className="instr-school-block">
          <p>{instr.school}</p>
          <p>Education: {instr.edu}</p>
        </div>
        <p className="instr-bio-text">{instr.bio}</p>
        <Link to={instr.link} className="instr-more-link">More info</Link>
      </div>
    </div>
  );
};

/* ─────────────────── MAIN COMPONENT ─────────────────── */
const Home = () => {
  // State for API data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [homeData, setHomeData] = useState(null);

  // Derived state
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [popularTags, setPopularTags] = useState([]);
  const [howItWorksSteps, setHowItWorksSteps] = useState([]);
  const [featureItems, setFeatureItems] = useState([]);
  const [carouselImages, setCarouselImages] = useState([]);
  const [statsData, setStatsData] = useState({ activeLearners: 0, onlineCourses: 0, certifiedInstructors: 0, studentSatisfactionRate: 0 });
  const [homeStat, setHomeStat] = useState({ image: '/wp-content/uploads/2025/11/pretty-schoolgirl-1.png', description: '' });

  // Refs and local UI state
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [carIdx, setCarIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [courseIdx, setCourseIdx] = useState(0);
  const [instrIdx, setInstrIdx] = useState(0);
  const [instrSlidesVisible, setInstrSlidesVisible] = useState(
    window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 4
  );
  const [blogIdx, setBlogIdx] = useState(0);
  const [blogSlidesVisible, setBlogSlidesVisible] = useState(
    window.innerWidth <= 768 ? 1 : 2
  );

  // ----- Fetch API Data -----
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(URLS.GetHomePage, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        const json = await response.json();
        if (!json.success) throw new Error('API returned unsuccessful response');
        setHomeData(json.data);
      } catch (err) {
        console.error('Failed to fetch home data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  // ----- Process API data when available -----
  useEffect(() => {
    if (!homeData) return;

    // Courses
    const mappedCourses = (homeData.courses || []).map(c => ({
      id: c._id,
      img: getImageUrl(c.thumbnail),
      title: c.title,
      desc: c.shortDescription,
      duration: c.duration,
      lessons: `${c.totalLessons || 0} Modules`,
      quizzes: null, // Not provided
      rating: c.averageRating?.toFixed(1) || '5.0',
      reviewCount: '1 Review', // Placeholder
      link: `/courses/${c._id}` // Adjust as needed
    }));
    setCourses(mappedCourses);

    // Instructors
    const mappedInstructors = (homeData.instructors || []).map((inst, idx) => ({
      id: inst._id,
      img: getImageUrl(inst.image),
      decorColor: instructorColors[idx % instructorColors.length],
      name: inst.name,
      school: 'VOLTEDZ',
      edu: inst.education || 'Instructor',
      bio: inst.description || 'Expert instructor at VOLTEDZ.',
      link: `/instructors/${inst._id}` // Adjust as needed
    }));
    setInstructors(mappedInstructors);

    // Testimonials
    const mappedTestimonials = (homeData.testimonials || []).map(t => {
      const initials = t.name.split(' ').map(n => n[0]).join('').toUpperCase();
      return {
        id: t._id,
        img: getImageUrl(t.image),
        initials: initials || '?',
        name: t.name,
        role: t.role,
        batchYear: `Batch ${t.batch}`,
        quote: t.description,
        highlightedQuote: '' // Could extract a phrase if needed
      };
    });
    setTestimonials(mappedTestimonials);

    // Blogs
    const mappedBlogs = (homeData.blogs || []).map(b => ({
      id: b._id,
      img: getImageUrl(b.blogThumbnail || b.blogBanner) || '/wp-content/uploads/2025/10/blog-a10-768x512.jpg', // fallback
      category: b.category,
      title: b.title,
      author: 'VOLTEDZ Team',
      date: new Date(b.logCreatedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      link: `/blog/${b._id}`
    }));
    setBlogPosts(mappedBlogs);

    // Popular Tags
    const tags = homeData.popularTags?.keywords || [];
    setPopularTags(tags);

    // How It Works
    const steps = (homeData.howItWorks || []).map(s => ({
      title: s.title,
      desc: s.description,
      img: getImageUrl(s.image)
    }));
    setHowItWorksSteps(steps);

    // Why Choose Us -> featureItems and carouselImages
    const wcu = homeData.whyChooseUs || {};
    const features = [];
    const carouselImgs = [];
    for (let i = 1; i <= 4; i++) {
      const title = wcu[`title${i}`];
      const desc = wcu[`description${i}`];
      const img = wcu[`image${i}`];
      if (title) {
        const color = i === 1 ? '#9040EF' : i === 2 ? '#0088CC' : i === 3 ? '#00B109' : '#EA5A00';
        features.push({
          id: `feat-${i}`,
          color,
          title,
          desc
        });
      }
      if (img) {
        carouselImgs.push(getImageUrl(img));
      }
    }
    setFeatureItems(features);
    setCarouselImages(carouselImgs);

    // Counts / Stats
    const counts = homeData.counts || {};
    setStatsData({
      activeLearners: parseCountValue(counts.activeLearners),
      onlineCourses: parseCountValue(counts.onlineCourses),
      certifiedInstructors: parseCountValue(counts.certifiedInstructors),
      studentSatisfactionRate: parseCountValue(counts.studentSatisfactionRate)
    });

    // Home Stat (blob description and girl image)
    const homeStatItem = homeData.homeStats?.[0] || {};
    setHomeStat({
      image: getImageUrl(homeStatItem.image) || '/wp-content/uploads/2025/11/pretty-schoolgirl-1.png',
      description: homeStatItem.description || 'VOLTEDZ empowers individuals worldwide through flexible, high-quality training.'
    });

    // Banners are not used in the current UI; you can add them later if needed.
  }, [homeData]);

  // ----- UI Effects (carousel, resize, intersection) -----
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [loading]);

  // Carousel auto-advance (for feature images)
  useEffect(() => {
    if (!carouselImages.length) return;
    const interval = setInterval(() => {
      setProgress(p => {
        const newP = p + 2;
        if (newP >= 100) {
          setCarIdx(i => (i + 1) % carouselImages.length);
          return 0;
        }
        return newP;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  // Resize handlers for sliders
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) setInstrSlidesVisible(1);
      else if (window.innerWidth <= 1024) setInstrSlidesVisible(2);
      else setInstrSlidesVisible(4);
      setBlogSlidesVisible(window.innerWidth <= 768 ? 1 : 2);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Counter values
  const stat1 = useCountUp(statsData.activeLearners || 0, 2000, statsVisible, 0);
  const stat2 = useCountUp(statsData.onlineCourses || 0, 2000, statsVisible, 0);
  const stat3 = useCountUp(statsData.certifiedInstructors || 0, 2000, statsVisible, 0);
  const stat4 = useCountUp(statsData.studentSatisfactionRate || 0, 2000, statsVisible, 0);

  // Slider indices bounds
  const visibleCourses = 1;
  const maxCourseIdx = Math.max(0, courses.length - 1);
  const maxInstrIdx = Math.max(0, instructors.length - instrSlidesVisible);
  const maxBlogIdx = Math.max(0, blogPosts.length - blogSlidesVisible);

  // Show loading/error states
  if (loading) {
    return <div className="home-page-container"><div className="loading">Loading home content...</div></div>;
  }
  if (error) {
    return <div className="home-page-container"><div className="error">Error: {error}</div></div>;
  }

  // Fallback for empty arrays (show nothing but prevent crashes)
  const safeCourses = courses.length ? courses : [];
  const safeInstructors = instructors.length ? instructors : [];
  const safeTestimonials = testimonials.length ? testimonials : [];
  const safeBlogPosts = blogPosts.length ? blogPosts : [];
  const safeTags = popularTags.length ? popularTags : ['#IndustrialAutomation', '#PLC_SCADA', '#EmbeddedSystems'];
  const safeSteps = howItWorksSteps.length ? howItWorksSteps : [
    { title: 'Step 1 – Training Formats', desc: 'In-campus, Off-campus, Workshops, Seminars, and Corporate trainings.', img: '/how-it-works/step1.jpg' },
    { title: 'Step 2 – Practical Sessions', desc: 'Sessions by top project engineers & analysts with focus on clarity and practical application.', img: '/how-it-works/step2.jpg' },
    { title: 'Step 3 – Implementation Support', desc: '3 months on-field support post-training and lifetime assistance for continuous growth.', img: '/how-it-works/step3.jpg' },
  ];

  return (
    <div className="home-page-container">
      <div className="elementor elementor-35321">

        {/* HERO (static for now, can be made dynamic with banners if needed) */}
        <section className="hero-section elementor-element-d13dea6 e-flex e-parent">
          <div className="e-con-inner e-con-boxed e-con">
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', width: '100%' }}>
              <div className="elementor-element-29aab34 e-con-full e-flex e-con e-child">
                <div className="thim-ekits-heading thim-ekit__heading">
                  <h1 className="title">Empowering Individuals Through Quality Training.</h1>
                  <div className="desc"><p>Deliver innovative and practical training solutions that help individuals and businesses thrive in today's competitive environment.</p></div>
                </div>
                <div className="hero-cta-row">
                  <Link className="hero-btn-primary elementor-button" to="/courses">Apply for Admission</Link>
                  <Link className="hero-btn-outline elementor-button" to="/courses">Explore Programs</Link>
                </div>
              </div>
              <div className="elementor-element-6e900ac e-con-full e-flex e-con e-child">
                {/* Hero image can be added from banner data if desired */}
              </div>
            </div>
          </div>
        </section>

        {/* TICKER */}
        <div className="ticker-band">
          <div className="ticker-inner">
            <div className="ticker-track">
              {[...tickerItems, ...tickerItems].map((item, i) => (
                <span key={i} className="ticker-item">
                  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 512 512" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
                  </svg>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* FEATURES (Why Choose Us) */}
        <section className="features-section">
          <div className="features-inner e-con-boxed">
            <div className="features-heading-wrap">
              <p className="sub-heading">Featured Training</p>
              <h2 className="title">Why Choose VOLTEDZ</h2>
            </div>
            <div className="features-body">
              <div className="features-left-col">
                {featureItems.map((f, i) => (
                  <div key={f.id} className="feature-item">
                    <h3 className="feature-title" style={{ color: f.color }}>{f.title}</h3>
                    <p className="feature-desc">{f.desc}</p>
                    <div className="feature-progress-bar" style={{ width: carIdx === i ? `${progress}%` : '0%' }}></div>
                  </div>
                ))}
                <Link to="/courses" className="feature-discover-btn">Discover All Programs</Link>
              </div>
              <div className="features-right-col">
                <div className="features-carousel-rotating">
                  {carouselImages.map((img, i) => {
                    const isCurrent = i === carIdx;
                    const isPrev = i === (carIdx - 1 + carouselImages.length) % carouselImages.length;
                    return (
                      <img
                        key={i}
                        src={img}
                        alt={`Why VOLTEDZ ${i + 1}`}
                        className={`features-car-img ${isCurrent ? 'slide-in' : isPrev ? 'slide-out' : ''}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="how-it-works-section">
          <div className="how-inner e-con-boxed">
            <div className="how-heading section-heading-center">
              <p className="sub-heading how-sub">HOW IT WORKS</p>
              <h2 className="title">How Learning with VOLTEDZ Works</h2>
            </div>
            <div className="programs-grid">
              {safeSteps.map((p, i) => (
                <div key={i} className="program-step-card">
                  <div className="program-step-num">0{i + 1}</div>
                  <figure className="program-step-img">
                    <img loading="lazy" src={p.img} alt={p.title} />
                  </figure>
                  <h4 className="program-step-title">{p.title}</h4>
                  <p className="program-step-desc">{p.desc}</p>
                </div>
              ))}
            </div>
            <div className="programs-cta">
              <Link className="cta-gradient-btn" to="/courses">Start Your Learning Journey</Link>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section ref={statsRef} className="stats-section">
          <div className="stats-inner e-con-boxed">
            <div className="stats-counters-row">
              {[
                { icon: '/wp-content/uploads/2025/11/vec1.png', count: stat1.toLocaleString(), suffix: '+', label: 'Active Learners' },
                { icon: '/wp-content/uploads/2025/11/vec2.png', count: stat2.toLocaleString(), suffix: '+', label: 'Online Courses' },
                { icon: '/wp-content/uploads/2025/11/vec3.png', count: stat3, suffix: '+', label: 'Certified Instructors' },
                { icon: '/wp-content/uploads/2025/11/vec4.png', count: stat4, suffix: '%', label: 'Student Satisfaction Rate' },
              ].map((s, i) => (
                <div key={i} className="stat-counter-item">
                  <div className="stat-icon-wrap">
                    <img src={s.icon} alt={s.label} width={64} height={64} />
                  </div>
                  <div className="stat-number-wrap">
                    <span className="stat-big-number">{s.count}</span>
                    <span className="stat-big-suffix">{s.suffix}</span>
                  </div>
                  <p className="stat-label-text">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="stats-bottom-row">
              <div className="stats-girl-wrap">
                <img
                  src={homeStat.image}
                  alt="Student"
                  className="stats-girl-img"
                />
              </div>
              <div className="stats-blob-wrap">
                <div className="stats-blob">
                  <p className="stats-blob-text">{homeStat.description}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COURSES */}
        <section className="courses-section">
          <div className="e-con-boxed courses-inner">
            <div className="courses-heading-wrap">
              <p className="sub-heading">Featured Online Courses</p>
              <h2 className="title">Explore Top-Rated Courses</h2>
            </div>
            {safeCourses.length > 0 ? (
              <>
                <div className="courses-slider-nav-row">
                  <button className="slider-nav-btn" onClick={() => setCourseIdx(i => Math.max(0, i - 1))} disabled={courseIdx === 0} aria-label="Previous">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                  </button>
                  <button className="slider-nav-btn" onClick={() => setCourseIdx(i => Math.min(maxCourseIdx, i + 1))} disabled={courseIdx === maxCourseIdx} aria-label="Next">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                  </button>
                </div>
                <div className="courses-slider-viewport">
                  <div
                    className="courses-slider-track"
                    style={{ transform: `translateX(-${courseIdx * (100 / visibleCourses)}%)` }}
                  >
                    {safeCourses.map(c => (
                      <div key={c.id} className="courses-slide">
                        <CourseCard course={c} />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <p>No courses available at the moment.</p>
            )}
            <div className="courses-cta-row">
              <Link className="cta-dark-btn" to="/courses">Browse All Courses</Link>
            </div>
          </div>
        </section>

        {/* INSTRUCTORS */}
        <section className="instructors-section">
          <div className="e-con-boxed instructors-inner">
            <div className="instructors-header">
              <div>
                <p className="sub-heading">Study according to your progress</p>
                <h2 className="title">Meet Our World-Class Faculty</h2>
              </div>
            </div>
            {safeInstructors.length > 0 ? (
              <div className="instructors-slider-viewport">
                <div
                  className="instructors-track"
                  style={{ transform: `translateX(-${instrIdx * (100 / instrSlidesVisible)}%)` }}
                >
                  {safeInstructors.map(instr => (
                    <div key={instr.id} className="instructor-slide">
                      <InstructorCard instr={instr} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p>Instructor information coming soon.</p>
            )}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="testimonials-section-new-wrapper">
          <TestimonialSection testimonials={safeTestimonials} />
        </section>

        {/* BLOG */}
        <section className="blog-section">
          <div className="e-con-boxed blog-inner">
            <div className="blog-posts-col">
              <p className="sub-heading blog-sub">RESEARCH & ACADEMIC INSIGHTS</p>
              <h2 className="title blog-title-h2">Insights That Inspire Learning</h2>
              {safeBlogPosts.length > 0 ? (
                <>
                  <div className="blog-slider-nav-row">
                    <button className="blog-nav-btn" onClick={() => setBlogIdx(i => Math.max(0, i - 1))} disabled={blogIdx === 0} aria-label="Previous">
                      <svg viewBox="0 0 448 512" width="14" height="14"><path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z" fill="currentColor" /></svg>
                    </button>
                    <button className="blog-nav-btn" onClick={() => setBlogIdx(i => Math.min(maxBlogIdx, i + 1))} disabled={blogIdx === maxBlogIdx} aria-label="Next">
                      <svg viewBox="0 0 448 512" width="14" height="14"><path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" fill="currentColor" /></svg>
                    </button>
                  </div>
                  <div className="blog-slider-viewport">
                    <div className="blog-slider-track" style={{ transform: `translateX(-${blogIdx * (100 / blogSlidesVisible)}%)` }}>
                      {safeBlogPosts.map(post => (
                        <div key={post.id} className="blog-slide">
                          <div className="blog-card">
                            <div className="blog-card-thumb">
                              <Link to={post.link}><img src={post.img} alt={post.title} /></Link>
                            </div>
                            <div className="blog-card-body">
                              <span className="blog-cat-tag">{post.category}</span>
                              <h5 className="blog-post-title"><Link to={post.link}>{post.title}</Link></h5>
                              <div className="blog-post-meta">
                                <span>
                                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ position: 'relative', top: 2, marginRight: 4 }}>
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                                  </svg>
                                  {post.author}
                                </span>
                                <span>
                                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ position: 'relative', top: 2, marginRight: 4 }}>
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                                  </svg>
                                  {post.date}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <p>No blog posts available.</p>
              )}
              <div style={{ marginTop: '2rem' }}>
                <Link to="/blog" className="btn-white-outline-blog">Read More Insights</Link>
              </div>
            </div>
            <div className="blog-tags-col">
              <h5 className="tags-heading">Popular tags</h5>
              <div className="tagcloud">
                {safeTags.map((t, i) => (
                  <p className="tag-cloud-link" key={i}>{t}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;