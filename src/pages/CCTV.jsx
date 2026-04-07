import { useState } from 'react';
import { Link } from 'react-router-dom';
import './CourseDetail.css';
import { URLS } from '../Url';

const courseData = {
  id: 2,
  title: 'CCTV & Security Systems',
  instructor: 'Mr. Dhanunjay',
  instructorSlug: 'dhanunjay',
  instructorBio: 'VOLTEDZ\nSr. BMS & CCTV Expert\n\nSpecialist in Building Management Systems, CCTV, Fire Alarms, and Access Control with extensive hands-on industrial knowledge and on-site implementation experience.',
  instructorAvatar: '/instructors/Dhanunjay.jpeg',
  coInstructors: [],
  featuredImage: '/courses/CCTV.png',
  price: 'paid',
  priceDisplay: '₹20,000',
  breadcrumbs: [
    { label: 'Home',       href: '/' },
    { label: 'Courses',    href: '/courses' },
    { label: 'BMS & CCTV', href: '/courses' },
    { label: 'CCTV & Security Systems', href: null },
  ],
  objectives:
    'Master CCTV surveillance systems, biometric access control, fire alarm panels, video door phones, and industrial networking protocols — building a career in security system installation and smart facility management.',
  structure: {
    duration: '8 Weeks',
    level: 'All levels',
    lessons: '15+',
    quizzes: 6,
    students: 95,
  },
  features: [
    'Hands-on training with real CCTV cameras, DVR/NVR/IPC and security panels',
    'CCTV installation, WiFi camera setup, and live remote monitoring configuration',
    '3 months on-field support post-training and lifetime assistance',
  ],
  overview: `<h3>Overview</h3>
    <p>This focused CCTV & Security Systems course takes you from fundamentals to job-ready security technician. You will learn the core design principles of building surveillance, how to select and install CCTV cameras, configure DVR, NVR, and IPC systems, set up biometric access control, and wire fire alarm panels.</p>
    <p>The course also covers video door phone installation, critical networking concepts including LAN/WAN, TCP/IP, Modbus, Profibus, and CANBus protocols — all grounded in real-world industry standards and hands-on lab sessions with actual equipment.</p>`,
  curriculum: [
    {
      id: 1,
      title: 'Module 1: Fundamentals of CCTV & Security Systems',
      count: 5,
      items: [
        { id: 101, type: 'lesson', title: 'Basic Design Criteria of Security Systems', duration: '45 Minutes', preview: true },
        { id: 102, type: 'lesson', title: 'Components Used in BMS & Security Systems', locked: true },
        { id: 103, type: 'lesson', title: 'Concept of Smart Design', locked: true },
        { id: 104, type: 'lesson', title: 'Energy Management Systems', locked: true },
        { id: 105, type: 'quiz', title: 'Module 1 Fundamentals Assessment Quiz', duration: '15 Minutes', questions: 10, locked: true },
      ],
    },
    {
      id: 2,
      title: 'Module 2: CCTV Systems',
      count: 8,
      items: [
        { id: 201, type: 'lesson', title: 'Selection of Camera', locked: true },
        { id: 202, type: 'lesson', title: 'Cabling and Termination – Coaxial Cable & CAT Cable', locked: true },
        { id: 203, type: 'lesson', title: 'Different Types of Cameras', locked: true },
        { id: 204, type: 'lesson', title: 'Night Vision Systems', locked: true },
        { id: 205, type: 'lesson', title: 'DVR, NVR & IPC Configuration', locked: true },
        { id: 206, type: 'lesson', title: 'WiFi Camera Setup & Configuration', locked: true },
        { id: 207, type: 'lesson', title: 'Remote Monitoring Through Phone and Internet', locked: true },
        { id: 208, type: 'quiz', title: 'Module 2 CCTV Assessment Quiz', duration: '15 Minutes', questions: 10, locked: true },
      ],
    },
    {
      id: 3,
      title: 'Module 3: Biometric Access Control',
      count: 7,
      items: [
        { id: 301, type: 'lesson', title: 'RFID Cards – Setup & Configuration', locked: true },
        { id: 302, type: 'lesson', title: 'Fingerprint Access Control Systems', locked: true },
        { id: 303, type: 'lesson', title: 'Joinee Preparation & Enrollment', locked: true },
        { id: 304, type: 'lesson', title: 'Magnetic Lock – Installation & Wiring', locked: true },
        { id: 305, type: 'lesson', title: 'Add Manual Punch', locked: true },
        { id: 306, type: 'lesson', title: 'Software – Leave & Time Tracker', locked: true },
        { id: 307, type: 'quiz', title: 'Module 3 Biometric Access Control Assessment Quiz', duration: '15 Minutes', questions: 10, locked: true },
      ],
    },
    {
      id: 4,
      title: 'Module 4: Fire Alarms & Panels',
      count: 7,
      items: [
        { id: 401, type: 'lesson', title: 'Sensors – Heat, Smoke & Manual Call Point (MCP)', locked: true },
        { id: 402, type: 'lesson', title: 'Conventional Fire Alarm Panels', locked: true },
        { id: 403, type: 'lesson', title: 'Addressable Fire Alarm Panels', locked: true },
        { id: 404, type: 'lesson', title: 'Cabling for Fire Alarm Systems', locked: true },
        { id: 405, type: 'lesson', title: 'Safety Standards & Compliance', locked: true },
        { id: 406, type: 'lesson', title: 'Alarm Configuration & Testing', locked: true },
        { id: 407, type: 'quiz', title: 'Module 4 Fire Alarms Assessment Quiz', duration: '15 Minutes', questions: 10, locked: true },
      ],
    },
    {
      id: 5,
      title: 'Module 5: Video Door Phones',
      count: 4,
      items: [
        { id: 501, type: 'lesson', title: 'Outdoor Unit – Installation & Wiring', locked: true },
        { id: 502, type: 'lesson', title: 'Indoor Unit – Installation & Wiring', locked: true },
        { id: 503, type: 'lesson', title: 'Configurations & Functions', locked: true },
        { id: 504, type: 'quiz', title: 'Module 5 Video Door Phones Assessment Quiz', duration: '10 Minutes', questions: 8, locked: true },
      ],
    },
    {
      id: 6,
      title: 'Module 6: Networking',
      count: 5,
      items: [
        { id: 601, type: 'lesson', title: 'Concept of LAN & WAN', locked: true },
        { id: 602, type: 'lesson', title: 'Sharing of Files, Printers & Scanners', locked: true },
        { id: 603, type: 'lesson', title: 'Implementing Networks', locked: true },
        { id: 604, type: 'lesson', title: 'Network Protocols – TCP/IP, Ethernet, Modbus, CANBus, Profibus', locked: true },
        { id: 605, type: 'quiz', title: 'Module 6 Networking Assessment Quiz', duration: '15 Minutes', questions: 10, locked: true },
      ],
    },
  ],
  students: [
    { name: 'Suresh K.', progress: 60, avatar: 'https://secure.gravatar.com/avatar/ee4ae5e45b778f6dd7303785b2f860bd42db7de37895934373d462a5445b0aae?s=250&d=mm&r=g' },
    { name: 'Divya P.',  progress: 100, avatar: 'https://secure.gravatar.com/avatar/8ee1f011bb5b9e464560e252b03aa580b722ade51dd178e8d8a149294d58a60f?s=250&d=mm&r=g' },
  ],
  rating: 5.0,
  ratingCount: 9,
  ratingBreakdown: [
    { star: 5, count: 8 },
    { star: 4, count: 1 },
    { star: 3, count: 0 },
    { star: 2, count: 0 },
    { star: 1, count: 0 },
  ],
  reviews: [
    {
      author: 'Suresh K.',
      avatar: 'https://secure.gravatar.com/avatar/ee4ae5e45b778f6dd7303785b2f860bd42db7de37895934373d462a5445b0aae?s=250&d=mm&r=g',
      rating: 5,
      date: 'March 10, 2026',
      title: 'Best CCTV & Security Course in Hyderabad',
      content:
        'The CCTV and fire alarm practical sessions were excellent. The trainer explained everything from wiring to software configuration very clearly. Highly recommended!',
    },
  ],
  featuredReview:
    'An outstanding course covering every aspect of security systems — from CCTV and biometric access control to fire alarms, networking, and video door phones. The hands-on sessions and real hardware practice made all the difference!',
};


/* ─────────────────── STAR RATING ─────────────────── */
function StarRating({ rating, size = 16 }) {
  return (
    <div className="cd-stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={`cd-star ${s <= rating ? 'filled' : ''}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={s <= rating ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </span>
      ))}
    </div>
  );
}


/* ─────────────────── SIDEBAR ─────────────────── */
function CourseSidebar({ course }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
  });
  const [charCount, setCharCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const certBrands = ['Hikvision', 'Dahua', 'CP Plus', 'Honeywell', 'Bosch', 'ZKTeco', 'Axis'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'description') {
      setCharCount(value.length);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch(URLS.ContactByCourse, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          course: course.title,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitMessage('Enquiry submitted successfully!');
        setFormData({ name: '', email: '', phone: '', description: '' });
        setCharCount(0);
      } else {
        setSubmitMessage(data.message || 'Failed to submit enquiry. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      setSubmitMessage('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <aside className="cd-sidebar">
      <div className="cd-sidebar-inner">

        {/* Meta card */}
        <div className="cd-sidebar-meta">
          {[
            { icon: '⏱', label: 'Duration', value: course.structure.duration },
            { icon: '📊', label: 'Level',    value: course.structure.level },
            { icon: '📚', label: 'Modules',  value: `${course.structure.lessons} Modules` },
            { icon: '👥', label: 'Students', value: `${course.structure.students}+ Enrolled` },
          ].map(({ icon, label, value }) => (
            <div className="cd-meta-row" key={label}>
              <span className="cd-meta-icon">{icon}</span>
              <div className="cd-meta-text">
                <span className="cd-meta-label">{label}</span>
                <span className="cd-meta-value">{value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Batch timings */}
        <div className="cd-sidebar-section">
          <h5 className="cd-sidebar-heading">Batches &amp; Timing</h5>
          <div className="cd-batch-group">
            <p className="cd-batch-label">Regular Batches: Mon – Fri</p>
            <ul className="cd-batch-list">
              <li>9:00 AM – 11:00 AM</li>
              <li>11:00 AM – 01:00 PM</li>
              <li>02:00 PM – 04:00 PM</li>
              <li>04:00 PM – 06:00 PM</li>
            </ul>
          </div>
          <div className="cd-batch-group">
            <p className="cd-batch-label">Weekend Batches: Sat &amp; Sun</p>
            <ul className="cd-batch-list">
              <li>9:00 AM – 1:00 PM</li>
            </ul>
          </div>
          <div className="cd-batch-group">
            <p className="cd-batch-label">Online Timings</p>
            <ul className="cd-batch-list">
              <li>6:00 PM – 7:00 PM</li>
            </ul>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="cd-sidebar-ctas">
          <a href="https://wa.me/919010716664?text=Hi%20VOLTEDZ%2C%20I%20am%20interested%20in%20the%20CCTV%20%26%20Security%20Systems%20course." target="_blank" rel="noopener noreferrer" className="cd-cta-whatsapp">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp Enquiry
          </a>
          <a href="tel:+919010716664" className="cd-cta-phone">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.62-.62a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            Phone Enquiry
          </a>
        </div>

        {/* Who should enroll */}
        <div className="cd-sidebar-section">
          <h5 className="cd-sidebar-heading">Who Should Enroll?</h5>
          <p className="cd-sidebar-text">
            Most suited for freshers and job seekers. Specially designed for individuals looking
            to start a career in security system installation, CCTV surveillance, or smart
            facility management with real-world practical training.
          </p>
        </div>

        {/* Course highlights */}
        <div className="cd-sidebar-section">
          <h5 className="cd-sidebar-heading">Course Highlights</h5>
          <ul className="cd-features-list">
            {course.features.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>

        {/* Certifications */}
        <div className="cd-sidebar-section">
          <h5 className="cd-sidebar-heading">Offered Certifications</h5>
          <div className="cd-cert-badges">
            {certBrands.map((b) => (
              <span key={b} className="cd-cert-badge">{b}</span>
            ))}
          </div>
        </div>

        {/* Quick contact form */}
        <div className="cd-sidebar-section" id="enroll-now">
          <h5 className="cd-sidebar-heading">Quick Contact</h5>
          <form className="cd-contact-form" onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="name"
              placeholder="Name *" 
              value={formData.name}
              onChange={handleInputChange}
              required 
            />
            <input 
              type="email" 
              name="email"
              placeholder="Email *" 
              value={formData.email}
              onChange={handleInputChange}
              required 
            />
            <input 
              type="tel" 
              name="phone"
              placeholder="Phone *" 
              value={formData.phone}
              onChange={handleInputChange}
              required 
            />
            <div className="cd-textarea-wrap">
              <textarea
                name="description"
                placeholder="Message"
                rows={3}
                maxLength={300}
                value={formData.description}
                onChange={handleInputChange}
              />
              <span className="cd-char-count">{charCount} / 300</span>
            </div>
            <button type="submit" className="cd-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
            </button>
            {submitMessage && (
              <p 
                className={`cd-submit-message ${submitMessage.includes('success') ? 'success' : 'error'}`} 
                style={{
                  fontSize: '13px', 
                  marginTop: '10px', 
                  color: submitMessage.includes('success') ? '#25D366' : '#d32f2f'
                }}
              >
                {submitMessage}
              </p>
            )}
          </form>
        </div>

      </div>
    </aside>
  );
}


/* ─────────────────── MAIN COMPONENT ─────────────────── */
export default function CourseDetail() {
  const course = courseData;

  return (
    <div className="cd-page">

      {/* Breadcrumb banner */}
      <div className="cd-banner">
        <div className="cd-banner-inner">
          <ul className="cd-breadcrumbs">
            {course.breadcrumbs.map((b, i) => (
              <li key={i}>
                {b.href ? <Link to={b.href}>{b.label}</Link> : <span>{b.label}</span>}
              </li>
            ))}
          </ul>
          <a href="#enroll-now" className="cd-enroll-btn">Enroll Now</a>
        </div>
      </div>

      {/* ── Course Header (full-width, outside cd-layout) ── */}
      <div className="cd-header-top">
        <h1 className="cd-title">{course.title}</h1>
        <h2 className="cd-tech-subtitle">
          Security Fundamentals, CCTV, Biometric Access Control, Fire Alarms, Video Door Phones &amp; Networking
        </h2>
        <p className="cd-instructor-line">
          INSTRUCTOR:{' '}
          <Link to={`/instructors/${course.instructorSlug}`} className="cd-instructor-name">
            {course.instructor}
          </Link>
        </p>
        <div className="cd-featured-img-wrap">
          <img src={course.featuredImage} alt={course.title} className="cd-featured-img" />
        </div>
      </div>

      {/* Page body */}
      <div className="cd-layout">
        <div className="cd-main">

          {/* ── Overview ── */}
          <section className="cd-overview-section">
            <h3 className="cd-section-title">Overview</h3>
            <div
              className="cd-overview-text"
              dangerouslySetInnerHTML={{
                __html: course.overview.replace('<h3>Overview</h3>', ''),
              }}
            />
          </section>

          {/* ── Program intro with module preview ── */}
          <section className="cd-program-section">
            <h2 className="cd-program-heading">
              {course.title}&nbsp;|&nbsp;Duration {course.structure.duration}
            </h2>
            <p className="cd-program-desc">
              The training program is broadly divided into {course.curriculum.length} modules.
              Each module is delivered by industry experts with hands-on practical sessions on
              real equipment. Our curriculum is designed to equip participants from security
              system fundamentals to full installation and configuration skills — making
              technicians industry-ready.
            </p>
            <p className="cd-modules-label">Major modules covered in this training:</p>
            <ul className="cd-modules-preview">
              {course.curriculum.map((mod) => (
                <li key={mod.id}>{mod.title}</li>
              ))}
            </ul>
          </section>

          {/* ── Curriculum — flat expanded ── */}
          <section className="cd-curriculum-section">
            {course.curriculum.map((section) => (
              <div key={section.id} className="cd-module-block">
                <h3 className="cd-module-heading">{section.title}</h3>
                <ul className="cd-module-topics">
                  {section.items
                    .filter((item) => item.type === 'lesson')
                    .map((item) => (
                      <li key={item.id}>{item.title}</li>
                    ))}
                </ul>
              </div>
            ))}
          </section>

          {/* ── Instructor ── */}
          <section className="cd-instructor-section">
            <h3 className="cd-section-title">About the Instructor</h3>
            <div className="cd-instructor-card">
              <img
                src={course.instructorAvatar}
                alt={course.instructor}
                className="cd-instructor-avatar"
              />
              <div className="cd-instructor-details">
                <h4 className="cd-instructor-title">
                  <Link to={`/instructors/${course.instructorSlug}`}>{course.instructor}</Link>
                </h4>
                <div className="cd-instructor-bio">
                  {course.instructorBio.split('\n').map((line, i) =>
                    line ? <p key={i}>{line}</p> : <br key={i} />
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* ── Reviews ── */}
          <section className="cd-reviews-section">
            <h3 className="cd-section-title">Student Reviews</h3>
            <div className="cd-rating-summary">
              <div className="cd-rating-score">
                <div className="cd-rating-value">{course.rating.toFixed(1)}</div>
                <StarRating rating={course.rating} size={20} />
                <div className="cd-rating-count">{course.ratingCount} ratings</div>
              </div>
              <div className="cd-rating-bars">
                {course.ratingBreakdown.map((r) => (
                  <div key={r.star} className="cd-rating-row">
                    <span className="cd-rating-star-num">{r.star}</span>
                    <span className="cd-rating-star-icon">★</span>
                    <div className="cd-rating-bar-bg">
                      <div
                        className="cd-rating-bar-fill"
                        style={{
                          width:
                            course.ratingCount > 0
                              ? `${(r.count / course.ratingCount) * 100}%`
                              : '0%',
                        }}
                      />
                    </div>
                    <span className="cd-rating-bar-count">{r.count}</span>
                  </div>
                ))}
              </div>
            </div>
            <ul className="cd-reviews-list">
              {course.reviews.map((r, i) => (
                <li key={i} className="cd-review">
                  <img src={r.avatar} alt={r.author} className="cd-review-avatar" />
                  <div className="cd-review-body">
                    <div className="cd-review-meta">
                      <StarRating rating={r.rating} size={14} />
                      <span className="cd-review-author">{r.author}</span>
                      <span className="cd-review-date">{r.date}</span>
                    </div>
                    <h5 className="cd-review-title">{r.title}</h5>
                    <p className="cd-review-content">{r.content}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

        </div>

        <CourseSidebar course={course} />
      </div>
    </div>
  );
}