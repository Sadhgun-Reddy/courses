import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CourseDetail.css';
import { URLS, base_url } from '../Url';

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
  const navigate = useNavigate();

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
        setSubmitMessage('Enquiry submitted successfully! We will get back to you soon.');
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

  const formatDays = (days) => {
    if (!days || days.length === 0) return '';
    if (days.length === 5 && days.includes('Monday') && days.includes('Friday')) return 'Mon – Fri';
    if (days.length === 2 && days.includes('Saturday') && days.includes('Sunday')) return 'Sat & Sun';
    return days.join(', ');
  };

  return (
    <aside className="cd-sidebar">
      <div className="cd-sidebar-inner">
        <div className="cd-sidebar-meta">
          {[
            { icon: '⏱', label: 'Duration', value: course.duration || 'N/A' },
            { icon: '📊', label: 'Level', value: course.courseLevel || 'All levels' },
            { icon: '📚', label: 'Modules', value: `${course.sections?.length || 0} Modules` },
            { icon: '👥', label: 'Students', value: `12K+ Enrolled` },
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

        <div className="cd-sidebar-section">
          <h5 className="cd-sidebar-heading">Batches &amp; Timing</h5>
          {course.batchDetails && course.batchDetails.length > 0 ? (
            course.batchDetails.map((batch, idx) => (
              <div className="cd-batch-group" key={idx}>
                <p className="cd-batch-label">
                  {batch.batchName || (batch.type?.charAt(0).toUpperCase() + batch.type?.slice(1))} Batches: {formatDays(batch.days)}
                </p>
                <ul className="cd-batch-list">
                  {batch.slots.map((slot, sIdx) => (
                    <li key={sIdx}>{slot.startTime} – {slot.endTime}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p className="cd-sidebar-text">No active batches found.</p>
          )}
        </div>

        <div className="cd-sidebar-ctas">
          <a href={`https://wa.me/919010716664?text=Hi%20VOLTEDZ%2C%20I%20am%20interested%20in%20the%20${course.title}%20course.`} target="_blank" rel="noopener noreferrer" className="cd-cta-whatsapp">
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

        <div className="cd-sidebar-section">
          <h5 className="cd-sidebar-heading">Who Should Enroll?</h5>
          <p className="cd-sidebar-text">
            {course.whoShouldEnroll || 'This course is suited for individuals looking for practical training and industrial expertise.'}
          </p>
        </div>

        <div className="cd-sidebar-section">
          <h5 className="cd-sidebar-heading">Course Highlights</h5>
          <ul className="cd-features-list">
            {(course.courseHighlights || '').split('\r\n').map((f, i) => f && <li key={i}>{f}</li>)}
          </ul>
        </div>

        <div className="cd-sidebar-section">
          <h5 className="cd-sidebar-heading">Offered Certifications</h5>
          <div className="cd-cert-badges">
            {(course.offeredCertificates || []).map((b) => (
              <span key={b} className="cd-cert-badge">{b}</span>
            ))}
          </div>
        </div>

        <div className="cd-sidebar-section" id="enroll-now">
          <h5 className="cd-sidebar-heading">Enquire about {course.title}</h5>
          
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
                placeholder="Message (Optional)"
                rows={3}
                maxLength={300}
                value={formData.description}
                onChange={handleInputChange}
              />
              <span className="cd-char-count">{charCount} / 300</span>
            </div>
            <button type="submit" className="cd-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Send Enquiry'}
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
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleEnrollClick = () => {
    // Check if user is logged in
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      // Redirect to login page (adjust path as needed)
      navigate('/login', { state: { from: `/course/${course?._id}` } });
      return;
    }
    
    if (course) {
      navigate('/checkout', { state: { course } });
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(URLS.getFullCourseDetails, {
          method: 'POST',
          headers: {
            'Authorization': token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            courseId: '69d5ed042d485add7ce88026'
          })
        });
        const data = await response.json();
        if (data.success) {
          setCourse(data.data);
        } else {
          setError(data.message || 'Failed to fetch course details');
        }
      } catch (err) {
        console.error('Error fetching course details:', err);
        setError('An error occurred while fetching course details');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  if (loading) {
    return (
      <div className="cd-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <p style={{ color: '#f5a623', fontSize: '18px', fontWeight: '600' }}>Loading course details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cd-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <p style={{ color: '#ff6b7a', fontSize: '18px', fontWeight: '600' }}>{error}</p>
      </div>
    );
  }

  if (!course) return null;

  const instructor = course.instructorDetails && course.instructorDetails[0];

  return (
    <div className="cd-page">
      <div className="cd-banner">
        <div className="cd-banner-inner">
          <ul className="cd-breadcrumbs">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><span>{course.title}</span></li>
          </ul>
        </div>
      </div>

      <div className="cd-header-top">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <h1 className="cd-title">{course.title}</h1>
            <h2 className="cd-tech-subtitle">
              {course.keyTopics || 'PLC, SCADA, HMI, VFD & Control Wiring Training'}
            </h2>
            {instructor && (
              <p className="cd-instructor-line">
                INSTRUCTOR:{' '}
                <Link to={`/instructors/${instructor._id}`} className="cd-instructor-name">
                  {instructor.name}
                </Link>
              </p>
            )}
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ marginBottom: '8px' }}>
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a' }}>
                ₹{course.discountedPrice || course.price}
              </span>
              {course.hasDiscount && (
                <span style={{ textDecoration: 'line-through', color: '#666', marginLeft: '10px', fontSize: '16px' }}>
                  ₹{course.price}
                </span>
              )}
            </div>
            <button className="cd-enroll-btn" onClick={handleEnrollClick}>Enroll Now</button>
          </div>
        </div>

        <div className="cd-featured-img-wrap">
          <img src={`${base_url}${course.thumbnail}`} alt={course.title} className="cd-featured-img" />
        </div>
      </div>

      <div className="cd-layout">
        <div className="cd-main">
          <section className="cd-overview-section">
            <h3 className="cd-section-title">Overview</h3>
            <div
              className="cd-overview-text"
              dangerouslySetInnerHTML={{
                __html: course.description || course.shortDescription,
              }}
            />
          </section>

          <section className="cd-program-section">
            <h2 className="cd-program-heading">
              {course.title}&nbsp;|&nbsp;Duration {course.duration}
            </h2>
            <div className="cd-program-desc" dangerouslySetInnerHTML={{ __html: course.description }} />
            <p className="cd-modules-label">Major modules covered in this training:</p>
            <ul className="cd-modules-preview">
              {course.sections && course.sections.map((mod) => (
                <li key={mod._id}>{mod.title}</li>
              ))}
            </ul>
          </section>

          <section className="cd-curriculum-section">
            {course.sections && course.sections.map((section) => (
              <div key={section._id} className="cd-module-block">
                <h3 className="cd-module-heading">{section.title}</h3>
                <ul className="cd-module-topics">
                  {section.lessons && section.lessons.map((lesson) => (
                    <li key={lesson._id}>{lesson.title}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {instructor && (
            <section className="cd-instructor-section">
              <h3 className="cd-section-title">About the Instructor</h3>
              <div className="cd-instructor-entry">
                <img
                  src={`${base_url}${instructor.image}`}
                  alt={instructor.name}
                  className="cd-instructor-avatar"
                  onError={(e) => e.target.src = '/instructors/default-avatar.jpeg'}
                />
                <div className="cd-instructor-details">
                  <h4 className="cd-instructor-title">
                    <Link to={`/instructors/${instructor._id}`}>{instructor.name}</Link>
                  </h4>
                  <p className="cd-instructor-bio">Industry expert with extensive hands-on experience in {course.title}.</p>
                </div>
              </div>
            </section>
          )}

          <section className="cd-reviews-section">
            <h3 className="cd-section-title">Student Reviews</h3>
            <div className="cd-rating-summary">
              <div className="cd-rating-score">
                <div className="cd-rating-value">4.5</div>
                <StarRating rating={4.5} size={20} />
                <div className="cd-rating-count">{course.reviews?.length || 0} reviews</div>
              </div>
            </div>
            {course.reviews && course.reviews.length > 0 && (
              <ul className="cd-reviews-list">
                {course.reviews.map((r, i) => (
                  <li key={i} className="cd-review">
                    <div className="cd-review-body">
                      <div className="cd-review-meta">
                        <StarRating rating={r.rating} size={14} />
                        <span className="cd-review-author">{r.name}</span>
                      </div>
                      <h5 className="cd-review-title">{r.title}</h5>
                      <p className="cd-review-content">{r.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <CourseSidebar course={course} />
      </div>
    </div>
  );
}