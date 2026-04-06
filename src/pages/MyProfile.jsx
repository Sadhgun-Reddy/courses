import React, { useState, useEffect, useRef } from 'react';
import { URLS, base_url } from '../Url';
import './MyProfile.css';

const MyProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) return;

    try {
      const response = await fetch(URLS.getStudentProfile, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`
        }
      });
      const data = await response.json();
      if (data.success && data.profile) {
        setProfile({
          name: data.profile.name || '',
          email: data.profile.email || '',
          phone: data.profile.phone || '',
          address: data.profile.address || '',
          image: data.profile.image || ''
        });

        // Update local storage user just in case
        const user = JSON.parse(localStorage.getItem('user')) || {};
        localStorage.setItem('user', JSON.stringify({ ...user, ...data.profile }));
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    const storedToken = localStorage.getItem('token');
    try {
      const response = await fetch(URLS.updateStudentProfile, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`
        },
        body: JSON.stringify({
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          address: profile.address
        })
      });

      const data = await response.json();
      if (data.success) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        if (data.data) {
          const user = JSON.parse(localStorage.getItem('user')) || {};
          localStorage.setItem('user', JSON.stringify({ ...user, ...data.data }));
        }
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to update profile.' });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Something went wrong.' });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storedToken = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(URLS.updateStudentProfileImg, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${storedToken}`
        },
        body: formData
      });
      const data = await response.json();

      if (data.success && data.data) {
        setProfile(prev => ({ ...prev, image: data.data.image }));
        const user = JSON.parse(localStorage.getItem('user')) || {};
        localStorage.setItem('user', JSON.stringify({ ...user, ...data.data }));
        // Dispatch an event so Header knows to update
        window.dispatchEvent(new Event('storage'));
      } else {
        console.error("Failed to update image", data.message);
      }
    } catch (err) {
      console.error("Error uploading image", err);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="dashboard-page-wrapper">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>My Profile</h1>
          <p>Manage your account settings and personal information.</p>
        </div>

        <div className="profile-grid">
          {/* Left Column: Avatar */}
          <div className="profile-avatar-card">
            <div className="avatar-wrapper">
              {profile.image ? (
                <img src={base_url + profile.image} alt="Profile" className="avatar-img" />
              ) : (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              )}
              <div className="avatar-badge" onClick={triggerFileInput}>
                Change Photo
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="upload-input-hidden"
              />
            </div>
            <div className="avatar-info">
              <h2>{profile.name || 'Student Name'}</h2>
              <p>Student Account</p>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="profile-details-card">
            <h3>Personal Details</h3>

            <form className="profile-form" onSubmit={handleProfileSubmit}>
              {message.text && (
                <div className={`profile-message ${message.type}`}>
                  {message.text}
                </div>
              )}

              <div className="profile-form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="profile-form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="profile-form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div className="profile-form-group full-width">
                <label>Address</label>
                <textarea
                  name="address"
                  value={profile.address}
                  onChange={handleInputChange}
                  placeholder="Enter your complete address"
                ></textarea>
              </div>

              <div className="profile-form-actions">
                <button type="submit" className="btn-profile-save" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
