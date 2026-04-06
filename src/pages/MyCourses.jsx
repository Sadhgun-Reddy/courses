import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { URLS, base_url } from '../Url';
import './MyCourses.css';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      setError("Please log in to view your courses.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(URLS.getMyCourses, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${storedToken}`
        }
        // No body required for getMyCourses based on curl example
      });
      const data = await response.json();
      
      if (data.success) {
        setCourses(data.data || []);
      } else {
        setError(data.message || 'Failed to fetch courses.');
      }
    } catch (err) {
      console.error("Error fetching my courses:", err);
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page-wrapper">
      <div className="courses-dashboard-section">
        <div className="dashboard-header">
          <h1>My Courses</h1>
          <p>Pick up where you left off and keep learning.</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#111FA2', fontWeight: 600 }}>Loading courses...</div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#ef4444', fontWeight: 600 }}>{error}</div>
        ) : courses.length === 0 ? (
          <div className="empty-courses-state">
            <div className="empty-courses-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
              </svg>
            </div>
            <h3>No Courses Yet</h3>
            <p>You haven't enrolled in any courses yet. Explore our catalog to find your next skill!</p>
            <Link to="/" className="btn-browse-courses">Browse Courses</Link>
          </div>
        ) : (
          <div className="my-courses-grid">
            {courses.map((course) => (
              <div className="my-course-card" key={course.courseId || course._id || Math.random()}>
                <div className="my-course-img-wrap">
                  {course.thumbnail ? (
                    <img src={base_url + course.thumbnail} alt={course.title} className="my-course-img" />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e2e8f0', color: '#a0aec0' }}>
                      No Thumbnail
                    </div>
                  )}
                </div>
                <div className="my-course-content">
                  <h4 className="my-course-title">{course.title}</h4>
                  <div className="my-course-price">₹{course.price}</div>
                  <div className="my-course-action">
                    <Link to={`/`} className="btn-continue-learning">
                      Continue Learning
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
