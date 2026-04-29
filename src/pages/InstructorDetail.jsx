import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { URLS } from '../Url';
import Loader from '../components/Loader';
import './InstructorDetail.css';

const getImageUrl = (path) => {
  if (!path) return '';
  return path.startsWith('http') ? path : `${URLS.base_url}/${path}`;
};

const slugify = (text) => (text || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const decodeHTMLEntities = (text) => {
  if (!text) return '';
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
};

const InstructorDetail = () => {
  const { instructorSlug } = useParams();
  const location = useLocation();
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        let targetId = location.state?.instructorId;

        // Fallback: If no ID in state, find it from Home page data using slug
        if (!targetId && instructorSlug) {
          const homeResponse = await fetch(URLS.GetHomePage, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
          });
          if (homeResponse.ok) {
            const homeJson = await homeResponse.json();
            if (homeJson.success && homeJson.data?.instructors) {
              const found = homeJson.data.instructors.find(
                (inst) => slugify(inst.name) === instructorSlug
              );
              if (found) targetId = found._id;
            }
          }
        }

        if (!targetId) {
          setError('Instructor ID not found.');
          setLoading(false);
          return;
        }

        // Fetch instructor by ID using the new API
        const response = await fetch(URLS.getInstructorById, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: targetId })
        });

        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        const json = await response.json();

        if (json.success && json.data) {
          setInstructor(json.data);
        } else {
          setError('Failed to load instructor data.');
        }
      } catch (err) {
        console.error('Failed to fetch instructor:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructor();
    window.scrollTo(0, 0);
  }, [instructorSlug, location.state?.instructorId]);

  if (loading) {
    return <Loader fullPage text="Loading instructor profile..." />;
  }

  if (error || !instructor) {
    return (
      <div className="instructor-error-page">
        <div className="error-content">
          <h2>Oops!</h2>
          <p>{error || 'Instructor not found.'}</p>
          <Link to="/" className="btn-back">Return to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="instructor-detail-page">
      <div className="instructor-header-section">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="separator">/</span>
            <span className="current">{instructor.name}</span>
          </nav>
        </div>
      </div>

      <div className="container instructor-content-wrapper">
        <div className="instructor-sidebar">
          <div className="instructor-card-profile">
            <div className="instructor-image">
              <img src={getImageUrl(instructor.image) || '/placeholder-avatar.png'} alt={instructor.name} />
            </div>
            <h1 className="instructor-name">{instructor.name}</h1>
            <p className="instructor-title">{instructor.education || 'Instructor'}</p>
            
            <div className="instructor-contact">
              {instructor.email && (
                <div className="contact-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  <a href={`mailto:${instructor.email}`}>{instructor.email}</a>
                </div>
              )}
            </div>

            <div className="instructor-socials">
              {/* Placeholder for social links if added later */}
              <a href="#" className="social-icon" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"></path><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#" className="social-icon" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="instructor-main-content">
          <div className="instructor-about">
            <h2 className="section-title">About Me</h2>
            <div 
              className="instructor-description"
              dangerouslySetInnerHTML={{ __html: decodeHTMLEntities(instructor.description) || '<p>No description available.</p>' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDetail;
