import { useState } from 'react';
import { Link } from 'react-router-dom';
import './CourseDetail.css';
import { URLS } from '../Url';

const courseData = {
  id: 1,
  title: 'Industrial Automation',
  instructor: 'Mr. Amit Rao Perka (L&D)',
  instructorSlug: 'amit-rao-perka',
  instructorBio: 'VOLTEDZ\nNational Technical Head\n\nLeading the technical direction and ensuring top-level engineering training standards.',
  instructorAvatar: '/instructors/Amit Rao Perka.jpeg',
  coInstructors: [],
  featuredImage: '/courses/Industrial Automation.png',
  price: 'paid',
  priceDisplay: '₹25,000',
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Courses', href: '/courses' },
    { label: 'Automation', href: '/courses' },
    { label: 'Industrial Automation', href: null },
  ],
  objectives: 'Master PLC, SCADA, HMI, and VFDs to build a career in industrial automation with real-world practical sessions.',
  structure: { duration: '12 Weeks', level: 'All levels', modules: '30+', quizzes: 7, students: '12K' },
  features: [
    'Industry-standard PLC programming (Siemens, Allen Bradley, Mitsubishi)',
    'SCADA system design and implementation',
    '3 months on-field support post-training and lifetime assistance',
  ],
  overview: `<h3>Overview</h3><p>This comprehensive Industrial Automation course is designed to take you from a beginner to an industry-ready automation engineer. You will learn the core concepts of Programmable Logic Controllers (PLCs), Supervisory Control and Data Acquisition (SCADA), and Human-Machine Interfaces (HMIs).</p><p>Through detailed theoretical modules and extensive hands-on practical sessions, you will understand how to design, program, and troubleshoot automated systems used in modern manufacturing and process industries.</p>`,
  curriculum: [
    {
      id: 1,
      title: 'Module 1: Introduction to Automation & PLC Programming',
      count: 10,
      items: [
        { id: 101, type: 'lesson', title: 'Brief Explanation About Automation', duration: '45 Minutes', preview: true },
        { id: 102, type: 'lesson', title: 'Scope of Automation & Automation Tools', locked: true },
        { id: 103, type: 'lesson', title: 'Applications of Automation', locked: true },
        { id: 104, type: 'lesson', title: 'Basics of Wiring', locked: true },
        { id: 105, type: 'lesson', title: 'PLC Introduction', locked: true },
        { id: 106, type: 'lesson', title: 'PLC Features, Architecture & Classification', locked: true },
        { id: 107, type: 'lesson', title: 'Scan Cycle, Programming Languages & Ladder Logic', locked: true },
        { id: 108, type: 'lesson', title: 'Relay Working – Explanation & Principles', locked: true },
        { id: 109, type: 'lesson', title: 'Logic Gates: AND, OR, NAND, NOR & XNOR', locked: true },
        { id: 110, type: 'quiz', title: 'Module 1 Assessment Quiz', duration: '15 Minutes', questions: 10, locked: true },
      ],
    },
    {
      id: 2,
      title: 'Module 2: PLC Hardware & Programming',
      count: 20,
      items: [
        { id: 201, type: 'lesson', title: 'AB MicroLogix 1400 – Hardware Overview', locked: true },
        { id: 202, type: 'lesson', title: 'Siemens S7-300 – Hardware Overview', locked: true },
        { id: 203, type: 'lesson', title: 'Delta DVP 12SE – Hardware Overview', locked: true },
        { id: 204, type: 'lesson', title: 'Omron CP1E – Hardware Overview', locked: true },
        { id: 205, type: 'lesson', title: 'Mitsubishi FX3G – Hardware Overview', locked: true },
        { id: 206, type: 'lesson', title: 'Schneider PLC – Hardware Overview', locked: true },
        { id: 207, type: 'lesson', title: 'Hardware Explanation, I/O Addressing & Memory', locked: true },
        { id: 208, type: 'lesson', title: 'Bit Logic, Upload & Download & Programming Software', locked: true },
        { id: 209, type: 'lesson', title: 'TON & TOF Timers (TT Bit Using DN Bit)', locked: true },
        { id: 210, type: 'lesson', title: 'RTO & RES Instructions', locked: true },
        { id: 211, type: 'lesson', title: 'Latch, Unlatch & OSR', locked: true },
        { id: 212, type: 'lesson', title: 'Counters: CTU & CTD', locked: true },
        { id: 213, type: 'lesson', title: 'Compare Instructions: LIM, EQU, NEQ, LES, LEQ, GRT, GEQ', locked: true },
        { id: 214, type: 'lesson', title: 'Compute / Math Instructions: ADD, SUB, MUL, DIV, SQR', locked: true },
        { id: 215, type: 'lesson', title: 'MOVE Logic', locked: true },
        { id: 216, type: 'lesson', title: 'Program Control Instructions: JMP, LBL, JSR, RET', locked: true },
        { id: 217, type: 'lesson', title: 'Analog I/O – Delta, Mitsubishi, S7-300, AB & S7-1200', locked: true },
        { id: 218, type: 'lesson', title: 'PID Concepts & Block Execution (Siemens S7-300)', locked: true },
        { id: 219, type: 'lesson', title: 'Heating Problem Using Analog I/Os', locked: true },
        { id: 220, type: 'quiz', title: 'Module 2 PLC Programming Quiz', duration: '20 Minutes', questions: 15, locked: true },
      ],
    },
    {
      id: 3,
      title: 'Module 3: Introduction to SCADA',
      count: 20,
      items: [
        { id: 301, type: 'lesson', title: 'InTouch SCADA – Platform Overview', locked: true },
        { id: 302, type: 'lesson', title: 'WinCC SCADA – Platform Overview', locked: true },
        { id: 303, type: 'lesson', title: 'FactoryTalk View Studio – Platform Overview', locked: true },
        { id: 304, type: 'lesson', title: 'Introduction to SCADA', locked: true },
        { id: 305, type: 'lesson', title: 'Creating a New Project', locked: true },
        { id: 306, type: 'lesson', title: 'Basic Drawing Tools & Color Changing Features', locked: true },
        { id: 307, type: 'lesson', title: 'Using Wizards', locked: true },
        { id: 308, type: 'lesson', title: 'Single Switch and Light with Same Tag', locked: true },
        { id: 309, type: 'lesson', title: 'Linking Different Tags Using Scripts', locked: true },
        { id: 310, type: 'lesson', title: 'On Show & While Showing Scripts', locked: true },
        { id: 311, type: 'lesson', title: 'Animation Properties', locked: true },
        { id: 312, type: 'lesson', title: 'Trends – Real-Time and Historical', locked: true },
        { id: 313, type: 'lesson', title: 'Key Scripts (InTouch SCADA Only)', locked: true },
        { id: 314, type: 'lesson', title: 'Alarms – Analog and Discrete', locked: true },
        { id: 315, type: 'lesson', title: 'Defining Alarm Limits', locked: true },
        { id: 316, type: 'lesson', title: 'Window Scripts', locked: true },
        { id: 317, type: 'lesson', title: 'Recipe Management (InTouch SCADA Only)', locked: true },
        { id: 318, type: 'lesson', title: 'Security in SCADA', locked: true },
        { id: 319, type: 'lesson', title: 'PLC–SCADA Interfacing', locked: true },
        { id: 320, type: 'quiz', title: 'Module 3 SCADA Assessment Quiz', duration: '20 Minutes', questions: 15, locked: true },
      ],
    },
    {
      id: 4,
      title: 'Module 4: Introduction to HMI',
      count: 9,
      items: [
        { id: 401, type: 'lesson', title: 'HMI Basics – Schneider & Delta', locked: true },
        { id: 402, type: 'lesson', title: 'PLC–HMI Interfacing – Analog and Discrete Tags', locked: true },
        { id: 403, type: 'lesson', title: 'IP Settings & Communication Network Configuration', locked: true },
        { id: 404, type: 'lesson', title: 'Communication with PLC', locked: true },
        { id: 405, type: 'lesson', title: 'Alarm Configuration & Monitoring', locked: true },
        { id: 406, type: 'lesson', title: 'Trend Display & Data Monitoring', locked: true },
        { id: 407, type: 'lesson', title: 'Security Configuration in HMI', locked: true },
        { id: 408, type: 'lesson', title: 'Recipe Configuration', locked: true },
        { id: 409, type: 'quiz', title: 'Module 4 HMI Assessment Quiz', duration: '15 Minutes', questions: 10, locked: true },
      ],
    },
    {
      id: 5,
      title: 'Module 5: Variable Frequency Drives (VFD)',
      count: 13,
      items: [
        { id: 501, type: 'lesson', title: 'AB VFD – Overview & Specifications', locked: true },
        { id: 502, type: 'lesson', title: 'ABB VFD – Overview & Specifications', locked: true },
        { id: 503, type: 'lesson', title: 'Schneider VFD – Overview & Specifications', locked: true },
        { id: 504, type: 'lesson', title: 'Introduction to VFD', locked: true },
        { id: 505, type: 'lesson', title: 'VFD Parameter Configuration', locked: true },
        { id: 506, type: 'lesson', title: 'Present Frequency Monitoring', locked: true },
        { id: 507, type: 'lesson', title: '2-Wire and 3-Wire Control Concept', locked: true },
        { id: 508, type: 'lesson', title: 'PLC Interfacing with VFD', locked: true },
        { id: 509, type: 'lesson', title: 'Analog Speed Control', locked: true },
        { id: 510, type: 'lesson', title: 'Modbus Communication', locked: true },
        { id: 511, type: 'lesson', title: 'Ethernet Communication', locked: true },
        { id: 512, type: 'lesson', title: 'Practical Motor Control Using VFD', locked: true },
        { id: 513, type: 'quiz', title: 'Module 5 VFD Assessment Quiz', duration: '15 Minutes', questions: 10, locked: true },
      ],
    },
    {
      id: 6,
      title: 'Module 6: PLC Wiring',
      count: 11,
      items: [
        { id: 601, type: 'lesson', title: 'Basics of Industrial Electrical Systems', locked: true },
        { id: 602, type: 'lesson', title: 'Electrical Components', locked: true },
        { id: 603, type: 'lesson', title: 'Control Wiring Basics', locked: true },
        { id: 604, type: 'lesson', title: 'Motor Control Wiring', locked: true },
        { id: 605, type: 'lesson', title: 'PLC Basics', locked: true },
        { id: 606, type: 'lesson', title: 'PLC Input and Output Wiring', locked: true },
        { id: 607, type: 'lesson', title: 'Sensors and Field Devices', locked: true },
        { id: 608, type: 'lesson', title: 'Industrial Communication', locked: true },
        { id: 609, type: 'lesson', title: 'PLC Applications', locked: true },
        { id: 610, type: 'lesson', title: 'Troubleshooting PLC Systems', locked: true },
        { id: 611, type: 'quiz', title: 'Module 6 PLC Wiring Quiz', duration: '15 Minutes', questions: 10, locked: true },
      ],
    },
    {
      id: 7,
      title: 'Module 7: Control Wiring',
      count: 6,
      items: [
        { id: 701, type: 'lesson', title: 'Contactors & Relays', locked: true },
        { id: 702, type: 'lesson', title: 'Star-Delta Starter', locked: true },
        { id: 703, type: 'lesson', title: 'DOL Starter', locked: true },
        { id: 704, type: 'lesson', title: 'Direction Control', locked: true },
        { id: 705, type: 'lesson', title: 'Symbols & Control Diagrams', locked: true },
        { id: 706, type: 'quiz', title: 'Module 7 Final Assessment Quiz', duration: '20 Minutes', questions: 15, locked: true },
      ],
    },
  ],
  students: [
    { name: 'Rahul S.', progress: 45, avatar: 'https://secure.gravatar.com/avatar/ee4ae5e45b778f6dd7303785b2f860bd42db7de37895934373d462a5445b0aae?s=250&d=mm&r=g' },
    { name: 'Priya M.', progress: 100, avatar: 'https://secure.gravatar.com/avatar/8ee1f011bb5b9e464560e252b03aa580b722ade51dd178e8d8a149294d58a60f?s=250&d=mm&r=g' },
  ],
  rating: 5.0,
  ratingCount: 12,
  ratingBreakdown: [
    { star: 5, count: 10 },
    { star: 4, count: 2 },
    { star: 3, count: 0 },
    { star: 2, count: 0 },
    { star: 1, count: 0 },
  ],
  reviews: [
    {
      author: 'Rahul S.',
      avatar: 'https://secure.gravatar.com/avatar/ee4ae5e45b778f6dd7303785b2f860bd42db7de37895934373d462a5445b0aae?s=250&d=mm&r=g',
      rating: 5,
      date: 'March 15, 2026',
      title: 'Excellent Hands-on PLC Training',
      content: 'The practical sessions on real PLCs made all the difference. Amit sir explains complex concepts very clearly. The Siemens S7-300 and Allen Bradley modules were outstanding.',
    },
    {
      author: 'Priya M.',
      avatar: 'https://secure.gravatar.com/avatar/8ee1f011bb5b9e464560e252b03aa580b722ade51dd178e8d8a149294d58a60f?s=250&d=mm&r=g',
      rating: 5,
      date: 'March 10, 2026',
      title: 'From Zero to Automation Engineer',
      content: 'I had no prior background in automation. After this course, I landed a job as a PLC technician within two months. The SCADA integration module was the highlight for me.',
    },
    {
      author: 'Vikram N.',
      avatar: 'https://secure.gravatar.com/avatar/3a5b2c1d4e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2?s=250&d=mm&r=g',
      rating: 5,
      date: 'February 28, 2026',
      title: 'Best Automation Course in Hyderabad',
      content: 'The VFD and HMI modules were incredibly detailed. We got to work with actual Mitsubishi and Delta hardware. Lifetime assistance is a massive bonus.',
    },
    {
      author: 'Santhosh K.',
      avatar: 'https://secure.gravatar.com/avatar/6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7?s=250&d=mm&r=g',
      rating: 5,
      date: 'February 20, 2026',
      title: 'Real Industrial Equipment Practice',
      content: 'Unlike other institutes that only show simulations, here we programmed actual PLCs. The control wiring sessions with star-delta starters were extremely practical.',
    },
    {
      author: 'Lakshmi R.',
      avatar: 'https://secure.gravatar.com/avatar/9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0?s=250&d=mm&r=g',
      rating: 5,
      date: 'February 12, 2026',
      title: 'Structured and Comprehensive',
      content: 'The course is perfectly structured from basics to advanced. PID control and analog I/O sections were things I struggled to find elsewhere. Highly recommended for EEE graduates.',
    },
    {
      author: 'Anil T.',
      avatar: 'https://secure.gravatar.com/avatar/d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e?s=250&d=mm&r=g',
      rating: 4,
      date: 'February 5, 2026',
      title: 'Very Good – Great Faculty',
      content: 'The course content is thorough and the faculty is highly experienced. A small request would be to add more topics in the future. Overall a very satisfying experience.',
    },
    {
      author: 'Deepa C.',
      avatar: 'https://secure.gravatar.com/avatar/e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f?s=250&d=mm&r=g',
      rating: 4,
      date: 'January 29, 2026',
      title: 'Good Value for Money',
      content: 'For the price, this course delivers excellent content. The Modbus and Ethernet communication sections were new to me and very well taught. Would love more quizzes.',
    },
  ],
  featuredReview: 'The best automation training I have attended. The course covers everything from basic relays to advanced SCADA integration. Highly recommended for fresh engineers!',
};


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

  const certBrands = ['Siemens', 'Allen-Bradley', 'ABB', 'Omron', 'Delta', 'Mitsubishi', 'Schneider'];

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
        method: 'PUT',
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
            { icon: '📊', label: 'Level', value: course.structure.level },
            { icon: '📚', label: 'Modules', value: `${course.structure.modules} Modules` },
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
          <a href="https://wa.me/919010716664?text=Hi%20VOLTEDZ%2C%20I%20am%20interested%20in%20the%20Industrial%20Automation%20course." target="_blank" rel="noopener noreferrer" className="cd-cta-whatsapp">
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
            to get their first job in Industrial Automation with real-world practical training.
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
        <div className="cd-sidebar-section">
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
                {b.href ? <Link  to={b.href}>{b.label}</Link> : <span>{b.label}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Course Header ── */}
      <div className="cd-header-top">
        <h1 className="cd-title">{course.title}</h1>
        <h2 className="cd-tech-subtitle">
          PLC, SCADA, HMI, VFD &amp; Control Wiring Training
        </h2>
        <p className="cd-instructor-line">
          INSTRUCTOR:{' '}
          <Link  to={`/instructors/${course.instructorSlug}`} className="cd-instructor-name">
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
              Each module is delivered by industry experts with hands-on practical sessions.
              Our curriculum is designed to equip participants from basic foundations to
              advanced industrial automation skills — making engineers industry-ready.
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
                  <Link  to={`/instructors/${course.instructorSlug}`}>{course.instructor}</Link>
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