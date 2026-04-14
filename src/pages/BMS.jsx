import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CourseDetail.css';
import { URLS } from '../Url';


const courseData = {
  id: "",
  title: 'Building Management Systems (BMS)',
  instructor: 'Mr. Dhanunjay',
  instructorSlug: 'dhanunjay',
  instructorBio: 'VOLTEDZ\nSr. BMS & CCTV Expert\n\nSpecialist in Building Management Systems, CCTV, Fire Alarms, and Access Control with extensive hands-on industrial knowledge and on-site implementation experience.',
  instructorAvatar: '/instructors/Dhanunjay.jpeg',
  coInstructors: [
    {
      name: 'Mr. Amit Rao Perka (L&D)',
      slug: 'amit-rao-perka',
      bio: 'VOLTEDZ\nNational Technical Head\n\nLeading the technical direction and ensuring top-level engineering training standards.',
      avatar: '/instructors/Amit Rao Perka.jpeg',
    },
  ],
  featuredImage: '/courses/Building Management Systems.png',
  price: 'paid',
  priceDisplay: '₹20,000',
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Courses', href: '/courses' },
    { label: 'BMS & CCTV', href: '/courses' },
    { label: 'Building Management Systems (BMS)', href: null },
  ],
  objectives:
    'Master BMS fundamentals, CCTV systems, biometric access control, fire alarm panels, video door phones, networking, and microcontroller programming to build a career in building automation and smart facility management.',
  structure: {
    duration: '10 Weeks',
    level: 'All levels',
    lessons: '15+',
    quizzes: 8,
    students: 9500,
  },
  features: [
    'Hands-on training with real BMS hardware, panels, and software',
    'CCTV installation, DVR/NVR/IPC configuration, and remote monitoring',
    '3 months on-field support post-training and lifetime assistance',
  ],
  overview: `<h3>Overview</h3>
    <p>This comprehensive Building Management Systems (BMS) course takes you from beginner to job-ready BMS technician. You will learn the core design principles of BMS, how to install and configure CCTV surveillance systems, biometric access control, fire alarm panels, and video door phones.</p>
    <p>The course also covers critical networking concepts including LAN/WAN, TCP/IP, Modbus, Profibus, and CANBus protocols, followed by microcontroller programming and peripheral device interfacing. The final module covers full BMS configuration including HVAC, solar panels, UPS, surge protection, lighting controls, automatic gates, and field instruments — all grounded in real-world industry standards.</p>`,
  curriculum: [
    {
      id: 1,
      title: 'Module 1: Fundamentals of Building Management System',
      count: 5,
      items: [
        { id: 101, type: 'lesson', title: 'Basic Design Criteria of BMS', duration: '45 Minutes', preview: true },
        { id: 102, type: 'lesson', title: 'Components Used in BMS', locked: true },
        { id: 103, type: 'lesson', title: 'Concept of Smart Design', locked: true },
        { id: 104, type: 'lesson', title: 'Energy Management Systems', locked: true },
        { id: 105, type: 'quiz', title: 'Module 1 BMS Fundamentals Assessment Quiz', duration: '15 Minutes', questions: 10, locked: true },
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
    {
      id: 7,
      title: 'Module 7: Basic Micro Controllers',
      count: 5,
      items: [
        { id: 701, type: 'lesson', title: 'Programming Basics of Microcontrollers', locked: true },
        { id: 702, type: 'lesson', title: 'Interfacing Peripheral Devices – LCD, Keyboard, Seven Segment Display, Encoder & Stepper Motor', locked: true },
        { id: 703, type: 'lesson', title: 'Stand Alone Device Design', locked: true },
        { id: 704, type: 'lesson', title: 'Testing & Implementation of Small Process in Microcontroller', locked: true },
        { id: 705, type: 'quiz', title: 'Module 7 Microcontrollers Assessment Quiz', duration: '15 Minutes', questions: 10, locked: true },
      ],
    },
        {
      id: 8,
      title: 'Module 8: Intruder Alarm System',
      count: 10,
      items: [
        { id: 801, type: 'lesson', title: 'Introduction: Basics, purpose, applications', locked: true },
        { id: 802, type: 'lesson', title: 'Types of Systems -Wired, Wireless, Hybrid', locked: true },
        { id: 803, type: 'lesson', title: 'Components- Control panel, sensors (PIR, magnetic), siren', locked: true },
        { id: 804, type: 'lesson', title: 'Working Principle: Detection → Signal → Alarm', locked: true },
        { id: 805, type: 'lesson', title: 'Installation: Sensor placement, wiring', locked: true },
        { id: 806, type: 'lesson', title: 'Programming: Zones, user codes, delay settings', locked: true },
        { id: 807, type: 'lesson', title: 'Practical: Installation & real-time practice', locked: true }, 
      ],
    },
    {
      id: 9,
      title: 'Module 9: BMS Configuration (Theory)',
      count: 12,
      items: [
        { id: 901, type: 'lesson', title: 'Basic Parameters of BMS Configuration', locked: true },
        { id: 902, type: 'lesson', title: 'Energy Measurement', locked: true },
        { id: 903, type: 'lesson', title: 'Transmission Techniques', locked: true },
        { id: 904, type: 'lesson', title: 'Network Protocols – Modbus, Profibus & CANBus (Theory)', locked: true },
        { id: 905, type: 'lesson', title: 'Lighting Controls (Theory)', locked: true },
        { id: 906, type: 'lesson', title: 'Solar Panels (Theory)', locked: true },
        { id: 907, type: 'lesson', title: 'UPS and Generators (Theory)', locked: true },
        { id: 908, type: 'lesson', title: 'Surge & Lightning Protection Systems', locked: true },
        { id: 909, type: 'lesson', title: 'HVAC Systems (Theory)', locked: true },
        { id: 910, type: 'lesson', title: 'Automatic Gates & Barriers (Theory)', locked: true },
        { id: 911, type: 'lesson', title: 'Field Instruments (Theory)', locked: true },
        { id: 912, type: 'quiz', title: 'Module 8 BMS Configuration Final Assessment Quiz', duration: '20 Minutes', questions: 15, locked: true },
      ],
    },

  ],
  students: [
    { name: 'Suresh K.', progress: 60, avatar: 'https://secure.gravatar.com/avatar/ee4ae5e45b778f6dd7303785b2f860bd42db7de37895934373d462a5445b0aae?s=250&d=mm&r=g' },
    { name: 'Divya P.', progress: 100, avatar: 'https://secure.gravatar.com/avatar/8ee1f011bb5b9e464560e252b03aa580b722ade51dd178e8d8a149294d58a60f?s=250&d=mm&r=g' },
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
      title: 'Best BMS Course in Hyderabad',
      content: 'The CCTV and fire alarm practical sessions were excellent. The trainer explained everything from wiring to software configuration very clearly. Highly recommended!',
    },
    {
      author: 'Divya P.',
      avatar: 'https://secure.gravatar.com/avatar/8ee1f011bb5b9e464560e252b03aa580b722ade51dd178e8d8a149294d58a60f?s=250&d=mm&r=g',
      rating: 5,
      date: 'March 4, 2026',
      title: 'Incredible Coverage of BMS Topics',
      content: 'I especially loved the biometric access control and magnetic lock wiring modules. The leave and time tracker software configuration was something I never expected to find in a BMS course.',
    },
    {
      author: 'Raju B.',
      avatar: 'https://secure.gravatar.com/avatar/3a5b2c1d4e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2?s=250&d=mm&r=g',
      rating: 5,
      date: 'February 24, 2026',
      title: 'DVR/NVR/IPC Configuration Was Spot On',
      content: 'The CCTV section covering DVR, NVR, and IPC configuration was detailed and hands-on. Remote monitoring through phone was demonstrated live and it worked perfectly. Great course.',
    },
    {
      author: 'Kavitha S.',
      avatar: 'https://secure.gravatar.com/avatar/6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7?s=250&d=mm&r=g',
      rating: 5,
      date: 'February 16, 2026',
      title: 'Fire Alarm Panel Training Was Excellent',
      content: 'The conventional vs addressable fire alarm panel comparison with actual panels was fantastic. Safety standards and MCP sensor wiring were covered thoroughly and practically.',
    },
    {
      author: 'Mohammed F.',
      avatar: 'https://secure.gravatar.com/avatar/9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0?s=250&d=mm&r=g',
      rating: 5,
      date: 'February 8, 2026',
      title: 'Networking Module Was Very Useful',
      content: 'The LAN/WAN, TCP/IP, Modbus, and Profibus networking section bridged a huge gap in my knowledge. Now I understand how all BMS subsystems communicate. Excellent teaching.',
    },
    {
      author: 'Nisha V.',
      avatar: 'https://secure.gravatar.com/avatar/d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e?s=250&d=mm&r=g',
      rating: 5,
      date: 'January 30, 2026',
      title: 'Microcontroller Section Was a Bonus',
      content: 'I did not expect the microcontroller programming module inside a BMS course. It added so much depth — stepper motor interfacing and stand-alone device design were real eye-openers.',
    },
    {
      author: 'Prasad L.',
      avatar: 'https://secure.gravatar.com/avatar/e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f?s=250&d=mm&r=g',
      rating: 5,
      date: 'January 22, 2026',
      title: 'HVAC Theory Was Well Explained',
      content: 'Even the theory-only modules like HVAC, solar panels, and UPS were explained with excellent visual references. The VOLTEDZ team clearly knows industry requirements inside out.',
    },
    {
      author: 'Rekha J.',
      avatar: 'https://secure.gravatar.com/avatar/f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a?s=250&d=mm&r=g',
      rating: 4,
      date: 'January 15, 2026',
      title: 'Very Informative – Minor Suggestions',
      content: 'A very well-rounded BMS course. My only suggestion is to add more live demos for video door phone outdoor installation. Everything else was excellent, especially the RFID and fingerprint modules.',
    },
  ],
  featuredReview:
    'An outstanding course covering every aspect of BMS — from CCTV and biometric systems to fire alarms, networking, and microcontrollers. The hands-on sessions and real hardware practice made all the difference!',
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


/* ─────────────────── INSTRUCTOR ENTRY (reusable row) ─────────────────── */
function InstructorEntry({ avatar, name, slug, bio }) {
  return (
    <div className="cd-instructor-entry">
      <img src={avatar} alt={name} className="cd-instructor-avatar" />
      <div className="cd-instructor-details">
        <h4 className="cd-instructor-title">
          <Link to={`/instructors/${slug}`}>{name}</Link>
        </h4>
        <div className="cd-instructor-bio">
          {bio.split('\n').map((line, i) =>
            line ? <p key={i}>{line}</p> : <br key={i} />
          )}
        </div>
      </div>
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
  const navigate = useNavigate();

  const certBrands = ['Honeywell', 'Siemens', 'Johnson Controls', 'Schneider', 'Bosch', 'Hikvision', 'CP Plus'];

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, course: course.title }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitMessage('Enquiry submitted successfully! Redirecting to checkout...');
        setTimeout(() => {
          navigate('/checkout', { state: { course, formData } });
        }, 1500);
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
          <a
            href="https://wa.me/919010016664?text=Hi%20VOLTEDZ%2C%20I%20am%20interested%20in%20the%20Building%20Management%20Systems%20course."
            target="_blank"
            rel="noopener noreferrer"
            className="cd-cta-whatsapp"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp Enquiry
          </a>
          <a href="tel:+919010016664" className="cd-cta-phone">
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
            to get their first job in Building Automation, Smart Facilities, and Security Systems.
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

        {/* Payment & Contact Section */}
        <div className="cd-sidebar-section" id="enroll-now">
          <h5 className="cd-sidebar-heading">Enroll in {course.title}</h5>
          
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
              {isSubmitting ? 'Processing...' : 'Enroll & Pay'}
            </button>
            {submitMessage && (
              <p
                className={`cd-submit-message ${submitMessage.includes('success') ? 'success' : 'error'}`}
                style={{
                  fontSize: '13px',
                  marginTop: '10px',
                  color: submitMessage.includes('success') ? '#25D366' : '#d32f2f',
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
  const navigate = useNavigate();
  const course = courseData;

  const handleEnrollClick = () => {
    navigate('/checkout', { state: { course } });
  };


  // Combine main instructor + co-instructors into one flat list
  const allInstructors = [
    {
      name: course.instructor,
      slug: course.instructorSlug,
      bio: course.instructorBio,
      avatar: course.instructorAvatar,
    },
    ...course.coInstructors,
  ];

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
          
        </div>
      </div>

      {/* ── Course Header ── */}
      <div className="cd-header-top">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:'20px' }}>
          <div >
            <h1 className="cd-title">{course.title}</h1>
            <h2 className="cd-tech-subtitle">
              PLC, SCADA, HMI , VFD , Control Wiring, CCTV
            </h2>

            {/* ↓ UPDATED: dynamically lists all instructor names from allInstructors */}
            <p className="cd-instructor-line">
              {allInstructors.length > 1 ? 'INSTRUCTORS' : 'INSTRUCTOR'}:{' '}
              {allInstructors.map((instructor, index) => (
                <span key={instructor.slug}>
                  {index > 0 && <span className="cd-instructor-separator">,&nbsp;</span>}
                  <Link to={`/instructors/${instructor.slug}`} className="cd-instructor-name">
                    {instructor.name}
                  </Link>
                </span>
              ))}
            </p>
          </div>
          {/* <div>
            <button className="cd-enroll-btn" onClick={handleEnrollClick}>Enroll Now</button>
            <p style={{color:'black',fontSize:'16px',fontWeight:'bold',marginTop:'10px' }}>Price: ₹25,000</p>
          </div> */}

          
        </div>
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
              Each module is delivered by industry experts with hands-on practical sessions.
              Our curriculum is designed to equip participants from foundational BMS concepts to
              advanced system configuration and commissioning — making participants fully industry-ready.
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

          {/* ── Instructors (both in one card) ── */}
          <section className="cd-instructor-section">
            <h3 className="cd-section-title">About the Instructors</h3>
            <div className="cd-instructor-card">
              {allInstructors.map((instructor, index) => (
                <div key={instructor.slug}>
                  {index > 0 && <hr className="cd-instructor-divider" />}
                  <InstructorEntry
                    avatar={instructor.avatar}
                    name={instructor.name}
                    slug={instructor.slug}
                    bio={instructor.bio}
                  />
                </div>
              ))}
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