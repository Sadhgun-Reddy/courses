import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CourseDetail.css';
import { URLS } from '../Url';

const courseData = {
  id: 3,
  title: 'Embedded Systems & IoT',
  instructor: 'Mr. Dhanunjay',
  instructorSlug: 'dhanunjay',
  instructorBio: 'VOLTEDZ\nSr. Embedded & IoT Expert\n\nSpecialist in Microcontrollers and IoT Cloud Integration with deep hands-on industrial knowledge. Expert in ESP32 via ESP-IDF, FreeRTOS, PCB Design, and end-to-end IoT system development.',
  instructorAvatar: '/instructors/Dhanunjay.jpeg',
  coInstructors: [],
  featuredImage: '/courses/Embedded Systems & IoT.png',
  price: 'paid',
  priceDisplay: '₹30,000',
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Courses', href: '/courses' },
    { label: 'Embedded & IoT', href: '/courses' },
    { label: 'Embedded Systems & IoT', href: null },
  ],
  objectives:
    'Master Embedded C programming, microcontroller design with Arduino, PIC, STM32 and ESP32, communication protocols, FreeRTOS, PCB design, and full IoT cloud integration with Firebase, Blynk IoT and AWS IoT — across four comprehensive learning Modules: Basic, Advanced, Firmware+IoT Cloud, and IoT System.',
  structure: {
    duration: '14 Weeks',
    level: 'All levels',
    lessons: '15+',
    quizzes: 4,
    students: '11k',
  },
  features: [
    'Four Modules: Basic, Advanced, Firmware + IoT Cloud, and IoT System',
    'Hands-on ESP32 programming using ESP-IDF with FreeRTOS real-time tasks',
    '3 months on-field support post-training and lifetime assistance',
  ],
  overview: `<h3>Overview</h3>
    <p>This course covers four comprehensive learning Modules designed to take you from embedded systems fundamentals to full-stack IoT product development. Starting with C and Embedded C programming and digital electronics basics, you progressively master microcontroller programming on Arduino, PIC, STM32, and ESP32 platforms with real hardware.</p>
    <p>The Basic and Advanced Modules build strong foundations in peripheral interfacing, sensor integration, communication protocols (UART, I2C, SPI, CAN, Ethernet), PCB design, debugging, and FreeRTOS. The Firmware + IoT Cloud Integration and Internet of Things System Modules take you into ESP-IDF framework programming, HTTP and MQTT internet protocols, and live cloud dashboard deployment using Firebase, Blynk IoT, and AWS IoT — all culminating in industry-oriented end-to-end embedded and IoT projects.</p>`,
  curriculum: [
    {
      id: 1,
      title: 'Module 1 – BASIC: Embedded Systems',
      count: 12,
      items: [
        { id: 101, type: 'lesson', title: 'C Programming Fundamentals', duration: '60 Minutes', preview: true },
        { id: 102, type: 'lesson', title: 'Embedded C Programming', locked: true },
        { id: 103, type: 'lesson', title: 'Basic & Digital Electronics for Embedded Systems', locked: true },
        { id: 104, type: 'lesson', title: 'Microcontroller Programming – Arduino, PIC & STM32', locked: true },
        { id: 105, type: 'lesson', title: 'Peripheral & Sensor Interfacing – ADC & PWM', locked: true },
        { id: 106, type: 'lesson', title: 'Peripheral & Sensor Interfacing – Timer & Counter', locked: true },
        { id: 107, type: 'lesson', title: 'Communication Protocols – UART, I2C, SPI, CAN, Ethernet TCP/IP', locked: true },
        { id: 108, type: 'lesson', title: 'Real-Time Operating System (FreeRTOS)', locked: true },
        { id: 109, type: 'lesson', title: 'PCB Design', locked: true },
        { id: 110, type: 'lesson', title: 'Embedded Debugging Techniques', locked: true },
        { id: 111, type: 'lesson', title: 'Industry-Oriented Embedded Projects', locked: true },
        { id: 112, type: 'quiz', title: 'Module 1 – Basic Embedded Systems Assessment Quiz', duration: '20 Minutes', questions: 15, locked: true },
      ],
    },
    {
      id: 2,
      title: 'Module 2 – ADVANCED: Embedded Systems',
      count: 10,
      items: [
        { id: 201, type: 'lesson', title: 'C Programming – Advanced Level', locked: true },
        { id: 202, type: 'lesson', title: 'Embedded C Programming – Advanced Level', locked: true },
        { id: 203, type: 'lesson', title: 'Basic & Digital Electronics for Embedded Systems (Advanced)', locked: true },
        { id: 204, type: 'lesson', title: 'Microcontroller Programming – Arduino & PIC (Advanced)', locked: true },
        { id: 205, type: 'lesson', title: 'Peripheral Interfacing – LEDs, Push Buttons, LCDs & Motors', locked: true },
        { id: 206, type: 'lesson', title: 'Peripheral Interfacing – ADC & PWM (Advanced)', locked: true },
        { id: 207, type: 'lesson', title: 'Sensor Interfacing', locked: true },
        { id: 208, type: 'lesson', title: 'Serial Communication Protocols – UART, I2C & SPI', locked: true },
        { id: 209, type: 'lesson', title: 'PCB Design (Advanced)', locked: true },
        { id: 210, type: 'lesson', title: 'Industry-Oriented Embedded Projects (Advanced)', locked: true },
        { id: 211, type: 'quiz', title: 'Module 2 – Advanced Embedded Systems Assessment Quiz', duration: '20 Minutes', questions: 15, locked: true },
      ],
    },
    {
      id: 3,
      title: 'Module 3 – Embedded Firmware + IoT Cloud Integration',
      count: 10,
      items: [
        { id: 301, type: 'lesson', title: 'C Programming for Embedded Firmware', locked: true },
        { id: 302, type: 'lesson', title: 'Embedded C Programming for Firmware Development', locked: true },
        { id: 303, type: 'lesson', title: 'Microcontroller Programming using ESP-IDF (ESP32)', locked: true },
        { id: 304, type: 'lesson', title: 'Peripheral & Sensor Interfacing – LEDs, Buttons, Timers, Counters, ADC, PWM & Sensors', locked: true },
        { id: 305, type: 'lesson', title: 'Communication Protocols – UART, I2C & SPI (ESP32)', locked: true },
        { id: 306, type: 'lesson', title: 'Internet Communication Protocols – HTTP & MQTT', locked: true },
        { id: 307, type: 'lesson', title: 'Cloud Platform Integration – Firebase & Real-time Database', locked: true },
        { id: 308, type: 'lesson', title: 'Cloud Platform Integration – Blynk IoT & AWS IoT', locked: true },
        { id: 309, type: 'lesson', title: 'Real-Time Operating System (FreeRTOS) for IoT Firmware', locked: true },
        { id: 310, type: 'lesson', title: 'Industry-Oriented IoT Project – Firmware + Cloud', locked: true },
        { id: 311, type: 'quiz', title: 'Module 3 – Firmware + IoT Cloud Assessment Quiz', duration: '20 Minutes', questions: 15, locked: true },
      ],
    },
    {
      id: 4,
      title: 'Module 4 – Internet of Things (IoT) System',
      count: 10,
      items: [
        { id: 401, type: 'lesson', title: 'C Programming for IoT System Design', locked: true },
        { id: 402, type: 'lesson', title: 'Embedded C Programming for IoT System Design', locked: true },
        { id: 403, type: 'lesson', title: 'ESP32 System Programming using ESP-IDF', locked: true },
        { id: 404, type: 'lesson', title: 'Peripheral & Sensor Interfacing – LEDs, Buttons, Timers, Counters, ADC, PWM & Sensors', locked: true },
        { id: 405, type: 'lesson', title: 'IoT Communication Protocols – UART, I2C & SPI', locked: true },
        { id: 406, type: 'lesson', title: 'Internet Communication – HTTP & MQTT Protocols', locked: true },
        { id: 407, type: 'lesson', title: 'IoT Cloud Platforms & Dashboards – Firebase, Blynk IoT & AWS IoT', locked: true },
        { id: 408, type: 'lesson', title: 'FreeRTOS in IoT System Architecture', locked: true },
        { id: 409, type: 'lesson', title: 'End-to-End Industry-Oriented IoT System Project', locked: true },
        { id: 410, type: 'quiz', title: 'Module 4 – IoT System Final Assessment Quiz', duration: '25 Minutes', questions: 20, locked: true },
      ],
    },
  ],
  students: [
    { name: 'Kiran T.', progress: 55, avatar: 'https://secure.gravatar.com/avatar/ee4ae5e45b778f6dd7303785b2f860bd42db7de37895934373d462a5445b0aae?s=250&d=mm&r=g' },
    { name: 'Sneha R.', progress: 100, avatar: 'https://secure.gravatar.com/avatar/8ee1f011bb5b9e464560e252b03aa580b722ade51dd178e8d8a149294d58a60f?s=250&d=mm&r=g' },
  ],
  rating: 5.0,
  ratingCount: 11,
  ratingBreakdown: [
    { star: 5, count: 10 },
    { star: 4, count: 1 },
    { star: 3, count: 0 },
    { star: 2, count: 0 },
    { star: 1, count: 0 },
  ],
  reviews: [
    {
      author: 'Kiran T.',
      avatar: 'https://secure.gravatar.com/avatar/ee4ae5e45b778f6dd7303785b2f860bd42db7de37895934373d462a5445b0aae?s=250&d=mm&r=g',
      rating: 5,
      date: 'March 18, 2026',
      title: 'Best Embedded + IoT Course I Have Taken',
      content: 'Starting from C basics and reaching full AWS IoT dashboard deployment in one course is incredible. The ESP32 ESP-IDF sessions and FreeRTOS labs were truly industry-level.',
    },
    {
      author: 'Sneha R.',
      avatar: 'https://secure.gravatar.com/avatar/8ee1f011bb5b9e464560e252b03aa580b722ade51dd178e8d8a149294d58a60f?s=250&d=mm&r=g',
      rating: 5,
      date: 'March 12, 2026',
      title: 'Four Modules Cover Every Skill Level',
      content: 'The four-Module structure is genius. I enrolled in the Advanced Module and the microcontroller programming with Arduino and PIC was exactly what my job role required. Well-structured content.',
    },
    {
      author: 'Harish G.',
      avatar: 'https://secure.gravatar.com/avatar/3a5b2c1d4e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2?s=250&d=mm&r=g',
      rating: 5,
      date: 'March 2, 2026',
      title: 'ESP32 + Firebase Integration Was Brilliant',
      content: 'The IoT Cloud Module with Firebase and Blynk IoT real-time dashboard was done with live hardware. I built my own sensor dashboard by the end of the session. Absolutely worth every rupee.',
    },
    {
      author: 'Pooja A.',
      avatar: 'https://secure.gravatar.com/avatar/6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7?s=250&d=mm&r=g',
      rating: 5,
      date: 'February 22, 2026',
      title: 'FreeRTOS Explained Like Never Before',
      content: 'I had tried learning FreeRTOS from YouTube but never understood it until this course. The hands-on tasks with ESP-IDF and task scheduling made everything click instantly.',
    },
    {
      author: 'Nagaraju D.',
      avatar: 'https://secure.gravatar.com/avatar/9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0?s=250&d=mm&r=g',
      rating: 5,
      date: 'February 14, 2026',
      title: 'PCB Design Was an Unexpected Highlight',
      content: 'Including PCB design in an embedded course is rare. We learned to design and verify actual boards. Combined with debugging techniques, this gave me the complete embedded engineering picture.',
    },
    {
      author: 'Ananya M.',
      avatar: 'https://secure.gravatar.com/avatar/d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e?s=250&d=mm&r=g',
      rating: 5,
      date: 'February 6, 2026',
      title: 'UART, I2C, SPI All Crystal Clear Now',
      content: 'The communication protocols module covered UART, I2C, and SPI with live oscilloscope demos. The difference between these protocols finally makes sense. Excellent teaching methodology.',
    },
    {
      author: 'Chandu B.',
      avatar: 'https://secure.gravatar.com/avatar/e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f?s=250&d=mm&r=g',
      rating: 5,
      date: 'January 28, 2026',
      title: 'AWS IoT Module Exceeded Expectations',
      content: 'I came for embedded basics but the AWS IoT integration and MQTT protocol module blew me away. Being able to monitor sensor data on the AWS dashboard live was truly impressive.',
    },
    {
      author: 'Ramya P.',
      avatar: 'https://secure.gravatar.com/avatar/f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a?s=250&d=mm&r=g',
      rating: 5,
      date: 'January 20, 2026',
      title: 'Peripheral Interfacing Was Very Hands-On',
      content: 'We interfaced LCDs, stepper motors, encoders, and sensors all in the lab. The ADC and PWM sessions with real hardware gave me confidence I had never felt from theory alone.',
    },
    {
      author: 'Venkat R.',
      avatar: 'https://secure.gravatar.com/avatar/a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b?s=250&d=mm&r=g',
      rating: 5,
      date: 'January 12, 2026',
      title: 'STM32 Programming Was a Great Addition',
      content: 'The Basic Module covering STM32 alongside Arduino and PIC is a major advantage. Most embedded courses stop at Arduino. VOLTEDZ clearly trains you for the real embedded job market.',
    },
    {
      author: 'Sravani N.',
      avatar: 'https://secure.gravatar.com/avatar/b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c?s=250&d=mm&r=g',
      rating: 5,
      date: 'January 4, 2026',
      title: 'Industry Project Made the Difference',
      content: 'The industry-oriented IoT project at the end tied everything together perfectly. Designing, coding, and deploying a real IoT product end-to-end was the best learning experience of my career.',
    },
    {
      author: 'Tarun K.',
      avatar: 'https://secure.gravatar.com/avatar/c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d?s=250&d=mm&r=g',
      rating: 4,
      date: 'December 26, 2025',
      title: 'Very Good Course – Suggest CAN Bus Practical',
      content: 'Excellent overall course content. The ESP-IDF and FreeRTOS sections are top-tier. My only suggestion is to include a hands-on CAN bus lab alongside the theory, which would make it perfect.',
    },
  ],
  featuredReview:
    'The four-Module structure is brilliant — I could choose my level and grow step by step. The cloud integration with Firebase and AWS IoT was hands-on and practical. This course genuinely prepares you for real embedded and IoT product development.',
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
  const navigate = useNavigate();

  const certBrands = ['ESP32', 'Arduino', 'PIC', 'STM32', 'FreeRTOS', 'AWS IoT', 'Firebase'];

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
            { icon: '📊', label: 'Level', value: course.structure.level },
            { icon: '📚', label: 'Modules', value: `${course.structure.lessons} Modules` },
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
              <li>Half Day: 9:00 AM – 1:00 PM</li>
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
          <a href="https://wa.me/919010016664?text=Hi%20VOLTEDZ%2C%20I%20am%20interested%20in%20the%20Embedded%20Systems%20%26%20IoT%20course." target="_blank" rel="noopener noreferrer" className="cd-cta-whatsapp">
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
            Most suited for freshers, ECE/EEE graduates, and working engineers. Designed for
            individuals who want to build a career in Embedded Systems, IoT Product Development,
            or Firmware Engineering with real hardware experience.
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
          <h5 className="cd-sidebar-heading">Platforms &amp; Technologies</h5>
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
  const navigate = useNavigate();
  const course = courseData;

  const handleEnrollClick = () => {
    navigate('/checkout', { state: { course } });
  };


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
          <button className="cd-enroll-btn" onClick={handleEnrollClick}>Enroll Now</button>
        </div>
      </div>

      {/* ── Course Header (full-width, outside cd-layout) ── */}
      <div className="cd-header-top">
        <h1 className="cd-title">{course.title}</h1>
        <h2 className="cd-tech-subtitle">
          Embedded C, Arduino, PIC, STM32, ESP32, FreeRTOS, PCB Design &amp; IoT Cloud Integration
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

          {/* ── Program intro with Module preview ── */}
          <section className="cd-program-section">
            <h2 className="cd-program-heading">
              {course.title}&nbsp;|&nbsp;Duration {course.structure.duration}
            </h2>
            <p className="cd-program-desc">
              The training program is structured into {course.curriculum.length} progressive
              learning Modules. Each Module is delivered by industry experts with hands-on lab
              sessions on real hardware. Our curriculum takes participants from core C and
              Embedded C foundations all the way to live cloud-connected IoT product deployments
              — making engineers fully industry-ready.
            </p>
            <p className="cd-modules-label">Learning Modules covered in this training:</p>
            <ul className="cd-modules-preview">
              {course.curriculum.map((Module) => (
                <li key={Module.id}>{Module.title}</li>
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
            <div className="cd-instructor-entry">
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